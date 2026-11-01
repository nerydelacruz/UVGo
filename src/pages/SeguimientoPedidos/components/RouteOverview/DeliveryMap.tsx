import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react"
import { createPortal } from "react-dom"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { FiFlag, FiHome } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import type { LngLat } from "../../data"
import { createMotoMarker3d } from "./motoMarker3d"
import { SIMULAR_REPARTIDOR } from "./simulacion"
import { MapContainer, MapFallback, MapPin, Moto3dPin, MotoPin, TimeLabel } from "./RouteOverview.styles"

export type MapStyle = "light" | "streets"

export interface DeliveryMapHandle {
  zoomIn: () => void
  zoomOut: () => void
  showRoute: () => void
  showMoto: () => void
  resize: () => void
}

export interface RouteInfo {
  distanceKm: number
  durationMin: number
}

interface DeliveryMapProps {
  origin: LngLat
  destination: LngLat
  /** Fracción de la ruta recorrida por el repartidor (0–1) */
  progress: number
  remainingLabel?: string
  arrivalLabel: string
  mapStyle: MapStyle
  /** Vista inclinada con relieve y edificios en 3D */
  is3d: boolean
  /** Espacio a la derecha que tapa el panel flotante, en px */
  rightInset: number
  /** Espacio abajo que tapa una barra flotante, en px */
  bottomInset?: number
  onRoute?: (info: RouteInfo) => void
  onUserMove?: () => void
  ref?: Ref<DeliveryMapHandle>
}

const token = import.meta.env.VITE_MAPBOX_TOKEN
const ACCENT = "#e07a5f"
const ANIMATION_MS = 2600
const PITCH_3D = 60
const DEM_SOURCE = "mapbox-dem"
const BUILDINGS_LAYER = "buildings-3d"
const styleUrl: Record<MapStyle, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  streets: "mapbox://styles/mapbox/streets-v12",
}

const SIMULACION_MS = 30000
const SIMULACION_PAUSA_MS = 2000

// Desplazamiento del marcador 3D para que las ruedas (no el centro del canvas) queden sobre la ruta
const MOTO_3D_OFFSET: [number, number] = [0, -9]

const supportsWebGL = () => {
  try {
    return !!document.createElement("canvas").getContext("webgl2")
  } catch {
    return false
  }
}

const distance = ([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) => Math.hypot(lng2 - lng1, lat2 - lat1)

/** Rumbo de brújula (grados) de `from` hacia `to`; a escala de una ciudad basta la aproximación plana. */
const bearing = ([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) => {
  const dx = (lng2 - lng1) * Math.cos((lat1 * Math.PI) / 180)
  return (Math.atan2(dx, lat2 - lat1) * 180) / Math.PI
}

/** Rumbo del último tramo recorrido; al arrancar, el del primer tramo de la ruta. */
const headingOf = (traveled: LngLat[], line: LngLat[]) => {
  const point = traveled[traveled.length - 1]
  for (let i = traveled.length - 2; i >= 0; i--) {
    if (distance(traveled[i], point) > 1e-9) return bearing(traveled[i], point)
  }
  return line.length > 1 ? bearing(line[0], line[1]) : 0
}

/** Devuelve el punto a una fracción de la línea y el tramo ya recorrido. */
const splitLine = (line: LngLat[], fraction: number) => {
  const lengths = line.slice(1).map((point, i) => distance(line[i], point))
  let target = lengths.reduce((a, b) => a + b, 0) * fraction
  for (let i = 0; i < lengths.length; i++) {
    if (target <= lengths[i]) {
      const t = lengths[i] ? target / lengths[i] : 0
      const [a, b] = [line[i], line[i + 1]]
      const point: LngLat = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
      return { point, traveled: [...line.slice(0, i + 1), point] }
    }
    target -= lengths[i]
  }
  return { point: line[line.length - 1], traveled: line }
}

const lineFeature = (coordinates: LngLat[]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates },
})

const fetchRoute = async (origin: LngLat, destination: LngLat): Promise<{ line: LngLat[]; info?: RouteInfo }> => {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.join(",")};${destination.join(",")}?geometries=geojson&overview=full&access_token=${token}`
    const data = await (await fetch(url)).json()
    const route = data.routes?.[0]
    if (route?.geometry?.coordinates?.length) {
      return {
        line: route.geometry.coordinates,
        info: { distanceKm: route.distance / 1000, durationMin: route.duration / 60 },
      }
    }
  } catch {
    // sin conexión o sin ruta: se usa una línea directa
  }
  return { line: [origin, destination] }
}

const DeliveryMap = ({
  origin,
  destination,
  progress,
  remainingLabel,
  arrivalLabel,
  mapStyle,
  is3d,
  rightInset,
  bottomInset = 0,
  onRoute,
  onUserMove,
  ref,
}: DeliveryMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const lineRef = useRef<LngLat[]>([origin, destination])
  const traveledRef = useRef<LngLat[]>([origin])
  const motoRef = useRef<LngLat>(origin)
  const styleRef = useRef(mapStyle)
  const is3dRef = useRef(is3d)
  const insetRef = useRef(rightInset)
  const bottomInsetRef = useRef(bottomInset)
  const callbacks = useRef({ onRoute, onUserMove })
  const [elements] = useState(() => ({
    origin: document.createElement("div"),
    destination: document.createElement("div"),
    moto: document.createElement("div"),
    remaining: document.createElement("div"),
    arrival: document.createElement("div"),
  }))
  const [moto3d] = useState(supportsWebGL)
  const motoHostRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    callbacks.current = { onRoute, onUserMove }
    insetRef.current = rightInset
    bottomInsetRef.current = bottomInset
  })

  const showMotoMarker = SIMULAR_REPARTIDOR || (progress > 0 && progress < 1)

  const fitRoute = (duration = 700) => {
    const map = mapRef.current
    const line = lineRef.current
    if (!map) return
    const bounds = line.reduce((b, point) => b.extend(point), new mapboxgl.LngLatBounds(line[0], line[0]))
    const { clientWidth, clientHeight } = map.getContainer()
    const right = clientWidth > 640 ? insetRef.current + 40 : 40
    const bottom = 60 + bottomInsetRef.current
    map.fitBounds(bounds, {
      padding: { top: 70, bottom: Math.min(bottom, clientHeight - 140), left: 60, right: Math.min(right, clientWidth - 120) },
      duration,
      maxZoom: 16.5,
      pitch: is3dRef.current ? PITCH_3D : 0,
    })
  }

  useImperativeHandle(ref, () => ({
    zoomIn: () => mapRef.current?.zoomIn(),
    zoomOut: () => mapRef.current?.zoomOut(),
    showRoute: () => fitRoute(),
    showMoto: () => mapRef.current?.flyTo({ center: motoRef.current, zoom: 17, duration: 900, pitch: is3dRef.current ? PITCH_3D : 0 }),
    resize: () => mapRef.current?.resize(),
  }))

  // Crea el mapa y dibuja la ruta del pedido
  useEffect(() => {
    if (!token || !containerRef.current) return

    mapboxgl.accessToken = token
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl[styleRef.current],
      center: origin,
      zoom: 15,
      pitch: is3dRef.current ? PITCH_3D : 0,
      attributionControl: false,
    })
    mapRef.current = map
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left")

    lineRef.current = [origin, destination]
    traveledRef.current = [origin]
    motoRef.current = origin

    new mapboxgl.Marker({ element: elements.origin }).setLngLat(origin).addTo(map)
    new mapboxgl.Marker({ element: elements.destination, anchor: "bottom" }).setLngLat(destination).addTo(map)
    new mapboxgl.Marker({ element: elements.arrival, anchor: "bottom", offset: [0, -42] }).setLngLat(destination).addTo(map)
    const moto = new mapboxgl.Marker({ element: elements.moto, offset: moto3d ? MOTO_3D_OFFSET : undefined })
    // La moto 3D gira con la ruta y con la cámara del mapa (rotación e inclinación)
    const motoModel = moto3d && motoHostRef.current ? createMotoMarker3d(motoHostRef.current) : null
    const syncMotoView = () => motoModel?.setView(map.getBearing(), map.getPitch())
    syncMotoView()
    map.on("rotate", syncMotoView)
    map.on("pitch", syncMotoView)
    const remaining = new mapboxgl.Marker({ element: elements.remaining, anchor: "bottom", offset: [0, -10] })

    // Relieve (DEM) y edificios extruidos; se activan o apagan según is3dRef
    const apply3d = (target: mapboxgl.Map) => {
      if (!target.getSource(DEM_SOURCE)) {
        target.addSource(DEM_SOURCE, { type: "raster-dem", url: "mapbox://mapbox.mapbox-terrain-dem-v1", tileSize: 512, maxzoom: 14 })
      }
      if (!target.getLayer(BUILDINGS_LAYER) && target.getSource("composite")) {
        // Debajo de las etiquetas para que los nombres de calles sigan legibles
        const labelId = target.getStyle()?.layers.find((l) => l.type === "symbol" && l.layout?.["text-field"])?.id
        target.addLayer(
          {
            id: BUILDINGS_LAYER,
            type: "fill-extrusion",
            source: "composite",
            "source-layer": "building",
            filter: ["==", ["get", "extrude"], "true"],
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#d9d4cb",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.85,
            },
          },
          labelId,
        )
      }
      if (target.getLayer(BUILDINGS_LAYER)) target.setLayoutProperty(BUILDINGS_LAYER, "visibility", is3dRef.current ? "visible" : "none")
      target.setTerrain(is3dRef.current ? { source: DEM_SOURCE, exaggeration: 1.2 } : null)
    }

    // Las capas se vuelven a agregar cada vez que cambia el estilo del mapa
    const addRouteLayers = () => {
      if (map.getSource("route")) return
      apply3d(map)
      map.addSource("route", { type: "geojson", data: lineFeature(lineRef.current) })
      map.addSource("traveled", { type: "geojson", data: lineFeature(traveledRef.current) })
      const layout = { "line-cap": "round", "line-join": "round" } as const
      map.addLayer({ id: "route-casing", type: "line", source: "route", layout, paint: { "line-color": "#ffffff", "line-width": 10 } })
      map.addLayer({ id: "route-remaining", type: "line", source: "route", layout, paint: { "line-color": ACCENT, "line-width": 5, "line-opacity": 0.35 } })
      map.addLayer({ id: "route-traveled", type: "line", source: "traveled", layout, paint: { "line-color": ACCENT, "line-width": 5 } })
    }
    map.on("style.load", addRouteLayers)
    map.on("dragstart", () => callbacks.current.onUserMove?.())

    let frame = 0
    let cancelled = false

    map.once("load", async () => {
      const { line, info } = await fetchRoute(origin, destination)
      if (cancelled) return
      lineRef.current = line
      if (info) callbacks.current.onRoute?.(info)
      ;(map.getSource("route") as mapboxgl.GeoJSONSource | undefined)?.setData(lineFeature(line))
      fitRoute(0)

      if (remainingLabel && showMotoMarker && !SIMULAR_REPARTIDOR) {
        remaining.setLngLat(splitLine(line, progress + (1 - progress) / 2).point).addTo(map)
      }
      if (showMotoMarker) moto.setLngLat(origin).addTo(map)

      const start = performance.now()
      const step = (now: number) => {
        let t: number
        let fraction: number
        if (SIMULAR_REPARTIDOR) {
          // Velocidad constante del origen al destino; al llegar espera un momento y vuelve a salir
          t = 0
          fraction = Math.min(((now - start) % (SIMULACION_MS + SIMULACION_PAUSA_MS)) / SIMULACION_MS, 1)
        } else {
          t = progress > 0 && progress < 1 ? Math.min((now - start) / ANIMATION_MS, 1) : 1
          fraction = progress * (1 - Math.pow(1 - t, 3))
        }
        const { point, traveled } = splitLine(line, fraction)
        motoRef.current = point
        traveledRef.current = traveled
        moto.setLngLat(point)
        motoModel?.setHeading(headingOf(traveled, line))
        ;(map.getSource("traveled") as mapboxgl.GeoJSONSource | undefined)?.setData(lineFeature(traveled))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      motoModel?.dispose()
      mapRef.current = null
      map.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- el mapa se recrea solo cuando cambia el pedido
  }, [origin, destination, progress, remainingLabel, elements])

  // No se usa map.isStyleLoaded(): es false mientras alguna fuente carga, y la línea recorrida
  // se actualiza en cada cuadro de la animación, así que los botones nunca harían nada.
  useEffect(() => {
    const map = mapRef.current
    if (!map || styleRef.current === mapStyle) return
    styleRef.current = mapStyle
    // Sin diff: el estilo se recarga entero y "style.load" vuelve a agregar ruta, relieve y edificios.
    // (Los tipos exigen las fuentes locales, pero Mapbox usa las del mapa si faltan.)
    map.setStyle(styleUrl[mapStyle], { diff: false } as Parameters<mapboxgl.Map["setStyle"]>[1])
  }, [mapStyle])

  // Alterna 2D/3D sin recrear el mapa; si el estilo aún carga, apply3d lo aplica al terminar
  useEffect(() => {
    is3dRef.current = is3d
    const map = mapRef.current
    if (!map) return
    if (map.getLayer(BUILDINGS_LAYER)) map.setLayoutProperty(BUILDINGS_LAYER, "visibility", is3d ? "visible" : "none")
    if (map.getSource(DEM_SOURCE)) map.setTerrain(is3d ? { source: DEM_SOURCE, exaggeration: 1.2 } : null)
    map.easeTo({ pitch: is3d ? PITCH_3D : 0, duration: 800 })
  }, [is3d])

  if (!token) {
    return <MapFallback>Configura VITE_MAPBOX_TOKEN en .env.local para ver el mapa.</MapFallback>
  }

  return (
    <>
      <MapContainer ref={containerRef} />
      {createPortal(<MapPin><FiHome size={14} /></MapPin>, elements.origin)}
      {createPortal(<MapPin destination><FiFlag size={14} /></MapPin>, elements.destination)}
      {createPortal(
        moto3d ? <Moto3dPin ref={motoHostRef} aria-label="Repartidor" /> : <MotoPin><MdDeliveryDining size={20} /></MotoPin>,
        elements.moto,
      )}
      {createPortal(<TimeLabel>{remainingLabel}</TimeLabel>, elements.remaining)}
      {createPortal(<TimeLabel dark>{arrivalLabel}</TimeLabel>, elements.arrival)}
    </>
  )
}

export default DeliveryMap
