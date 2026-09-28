import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react"
import { createPortal } from "react-dom"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { FiFlag, FiHome } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import type { LngLat } from "../../data"
import { MapContainer, MapFallback, MapPin, MotoPin, TimeLabel } from "./RouteOverview.styles"

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
  /** Espacio a la derecha que tapa el panel flotante, en px */
  rightInset: number
  onRoute?: (info: RouteInfo) => void
  onUserMove?: () => void
  ref?: Ref<DeliveryMapHandle>
}

const token = import.meta.env.VITE_MAPBOX_TOKEN
const ACCENT = "#e07a5f"
const ANIMATION_MS = 2600
const styleUrl: Record<MapStyle, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  streets: "mapbox://styles/mapbox/streets-v12",
}

const distance = ([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) => Math.hypot(lng2 - lng1, lat2 - lat1)

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
  rightInset,
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
  const insetRef = useRef(rightInset)
  const callbacks = useRef({ onRoute, onUserMove })
  const [elements] = useState(() => ({
    origin: document.createElement("div"),
    destination: document.createElement("div"),
    moto: document.createElement("div"),
    remaining: document.createElement("div"),
    arrival: document.createElement("div"),
  }))

  useEffect(() => {
    callbacks.current = { onRoute, onUserMove }
    insetRef.current = rightInset
  })

  const showMotoMarker = progress > 0 && progress < 1

  const fitRoute = (duration = 700) => {
    const map = mapRef.current
    const line = lineRef.current
    if (!map) return
    const bounds = line.reduce((b, point) => b.extend(point), new mapboxgl.LngLatBounds(line[0], line[0]))
    const { clientWidth } = map.getContainer()
    const right = clientWidth > 640 ? insetRef.current + 40 : 40
    map.fitBounds(bounds, {
      padding: { top: 70, bottom: 60, left: 60, right: Math.min(right, clientWidth - 120) },
      duration,
      maxZoom: 16.5,
    })
  }

  useImperativeHandle(ref, () => ({
    zoomIn: () => mapRef.current?.zoomIn(),
    zoomOut: () => mapRef.current?.zoomOut(),
    showRoute: () => fitRoute(),
    showMoto: () => mapRef.current?.flyTo({ center: motoRef.current, zoom: 17, duration: 900 }),
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
    const moto = new mapboxgl.Marker({ element: elements.moto })
    const remaining = new mapboxgl.Marker({ element: elements.remaining, anchor: "bottom", offset: [0, -10] })

    // Las capas se vuelven a agregar cada vez que cambia el estilo del mapa
    const addRouteLayers = () => {
      if (map.getSource("route")) return
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

      if (remainingLabel && showMotoMarker) {
        remaining.setLngLat(splitLine(line, progress + (1 - progress) / 2).point).addTo(map)
      }
      if (showMotoMarker) moto.setLngLat(origin).addTo(map)

      const start = performance.now()
      const step = (now: number) => {
        const t = progress > 0 && progress < 1 ? Math.min((now - start) / ANIMATION_MS, 1) : 1
        const eased = 1 - Math.pow(1 - t, 3)
        const { point, traveled } = splitLine(line, progress * eased)
        motoRef.current = point
        traveledRef.current = traveled
        moto.setLngLat(point)
        ;(map.getSource("traveled") as mapboxgl.GeoJSONSource | undefined)?.setData(lineFeature(traveled))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      mapRef.current = null
      map.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- el mapa se recrea solo cuando cambia el pedido
  }, [origin, destination, progress, remainingLabel, elements])

  useEffect(() => {
    styleRef.current = mapStyle
    const map = mapRef.current
    if (map && map.isStyleLoaded()) map.setStyle(styleUrl[mapStyle])
  }, [mapStyle])

  if (!token) {
    return <MapFallback>Configura VITE_MAPBOX_TOKEN en .env.local para ver el mapa.</MapFallback>
  }

  return (
    <>
      <MapContainer ref={containerRef} />
      {createPortal(<MapPin><FiHome size={14} /></MapPin>, elements.origin)}
      {createPortal(<MapPin destination><FiFlag size={14} /></MapPin>, elements.destination)}
      {createPortal(<MotoPin><MdDeliveryDining size={20} /></MotoPin>, elements.moto)}
      {createPortal(<TimeLabel>{remainingLabel}</TimeLabel>, elements.remaining)}
      {createPortal(<TimeLabel dark>{arrivalLabel}</TimeLabel>, elements.arrival)}
    </>
  )
}

export default DeliveryMap
