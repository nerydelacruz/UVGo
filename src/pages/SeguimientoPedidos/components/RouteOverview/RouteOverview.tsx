import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { FiAlertTriangle, FiBox, FiCrosshair, FiInfo, FiLayers, FiMap, FiMaximize2, FiMinimize2, FiMinus, FiPlus, FiX } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { routeProgress, statusLabel, warehouse, type Order } from "../../data"
import { CardTitle, Muted, SquareButton } from "../../SeguimientoPedidos.styles"
import DeliveryMap, { type DeliveryMapHandle, type MapStyle, type RouteInfo } from "./DeliveryMap"
import { SIMULAR_REPARTIDOR } from "./simulacion"
import { useSeguimientoVivo, type SeguimientoVivo } from "./useSeguimientoVivo"
import { useUbicacionRepartidor } from "@/hooks/useUbicacionRepartidor"
import {
  AlertChip,
  AlertRow,
  CloseButton,
  DetailList,
  DetailPanel,
  Illustration,
  LiveBadge,
  LiveDot,
  MapCard,
  MapHeader,
  MapStage,
  ReopenButton,
  Toolbar,
  ZoomControls,
} from "./RouteOverview.styles"

const PANEL_WIDTH = 300

type View = "route" | "moto" | "free"

export interface RouteSummary {
  distanceKm: number
  etaMin: number
  /** Avance real del repartidor; null mientras no publique su posición */
  vivo: SeguimientoVivo | null
}

const hora = new Intl.DateTimeFormat("es-GT", { hour: "numeric", minute: "2-digit" })
const km = (n: number) => `${n.toLocaleString("es-GT", { maximumFractionDigits: 1 })} km`

interface RouteOverviewProps {
  order: Order
  className?: string
  /** Dato corto junto al título (p. ej. el número del pedido en el panel admin) */
  titleExtra?: ReactNode
  /** Barra flotante al pie del mapa; recibe la distancia y el tiempo ya calculados por Mapbox */
  footer?: (summary: RouteSummary) => ReactNode
}

// Alto aproximado de la barra del pie, para que la ruta no quede debajo al encuadrarla
const FOOTER_HEIGHT = 96

const RouteOverview = ({ order, className, titleExtra, footer }: RouteOverviewProps) => {
  const mapRef = useRef<DeliveryMapHandle>(null)
  const [mapStyle, setMapStyle] = useState<MapStyle>("streets")
  const [is3d, setIs3d] = useState(false)
  // la vista vuelve a "ruta completa" al cambiar de pedido
  const [viewState, setViewState] = useState<{ id: string; view: View }>({ id: order.id, view: "route" })
  const [expanded, setExpanded] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [routeInfo, setRouteInfo] = useState<{ id: string; info: RouteInfo } | null>(null)

  // Posición real del repartidor por WebSocket (este mapa es solo del panel admin)
  const { ubicacion } = useUbicacionRepartidor(order.id)
  const livePosition = useMemo(
    () => (ubicacion ? { lng: ubicacion.longitud, lat: ubicacion.latitud, heading: ubicacion.rumbo } : null),
    [ubicacion],
  )

  const isLive = order.status === "en-ruta"
  const enVivo = isLive || !!ubicacion
  // Solo hay repartidor que centrar si va en ruta, si hay posición en vivo (o si la moto está en simulación)
  const motoVisible = enVivo || SIMULAR_REPARTIDOR
  const info = routeInfo?.id === order.id ? routeInfo.info : null
  const distanceKm = info?.distanceKm ?? order.distanceKm
  const etaMin = Math.max(order.etaMin, Math.round(info?.durationMin ?? 0))
  const view = viewState.id === order.id ? viewState.view : "route"

  // Avance sobre la ruta de Mapbox; si aún no llega (o falló), sobre la línea directa bodega → destino
  const ruta = useMemo(() => info?.line ?? [warehouse.coords, order.destinationCoords], [info, order.destinationCoords])
  const vivo = useSeguimientoVivo(ubicacion, ruta)
  const setView = (next: View) => setViewState({ id: order.id, view: next })

  // El mapa necesita recalcular su tamaño al entrar o salir de pantalla completa
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      mapRef.current?.resize()
      mapRef.current?.showRoute()
    })
    if (!expanded) return () => cancelAnimationFrame(frame)

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false)
    window.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  const goTo = (next: View) => {
    setView(next)
    if (next === "route") mapRef.current?.showRoute()
    if (next === "moto") mapRef.current?.showMoto()
  }

  const arrivalLabel = vivo
    ? `Llega ~${hora.format(vivo.llegada)}`
    : isLive
      ? `Llega ${order.deliveryAt.replace(/^Hoy, /, "")}`
      : order.status === "entregado"
        ? "Entregado"
        : "Destino"

  return (
    <MapCard className={className} expanded={expanded} aria-label="Ruta de entrega">
      <MapHeader>
        <div>
          <CardTitle>
            Ruta de entrega
            {titleExtra && <Muted>{titleExtra}</Muted>}
          </CardTitle>
          <Muted>
            Distancia: {distanceKm.toFixed(1)} km · {order.origin} → {order.destination}
          </Muted>
        </div>

        <Toolbar role="toolbar" aria-label="Herramientas del mapa">
          <SquareButton
            type="button"
            active={mapStyle === "light"}
            aria-pressed={mapStyle === "light"}
            title={mapStyle === "light" ? "Capa: minimalista" : "Capa: calles"}
            aria-label="Cambiar capa del mapa"
            onClick={() => setMapStyle((s) => (s === "streets" ? "light" : "streets"))}
          >
            <FiLayers size={17} />
          </SquareButton>
          <SquareButton
            type="button"
            active={is3d}
            aria-pressed={is3d}
            title={is3d ? "Vista 3D activada" : "Vista 3D"}
            aria-label="Alternar vista 3D"
            onClick={() => setIs3d((value) => !value)}
          >
            <FiBox size={17} />
          </SquareButton>
          <SquareButton type="button" active={view === "route"} title="Ver ruta completa" aria-label="Ver ruta completa" onClick={() => goTo("route")}>
            <FiMap size={17} />
          </SquareButton>
          <SquareButton
            type="button"
            active={view === "moto"}
            title="Ubicación del repartidor"
            aria-label="Centrar en el repartidor"
            onClick={() => goTo("moto")}
            disabled={!motoVisible}
          >
            <FiCrosshair size={17} />
          </SquareButton>
          <SquareButton
            type="button"
            active={expanded}
            title={expanded ? "Salir de pantalla completa" : "Pantalla completa"}
            aria-label={expanded ? "Salir de pantalla completa" : "Pantalla completa"}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? <FiMinimize2 size={17} /> : <FiMaximize2 size={17} />}
          </SquareButton>
        </Toolbar>
      </MapHeader>

      <MapStage>
        <DeliveryMap
          key={order.id}
          ref={mapRef}
          origin={warehouse.coords}
          destination={order.destinationCoords}
          progress={routeProgress(order.status)}
          livePosition={livePosition}
          remainingLabel={vivo ? `${vivo.minutosRestantes} min restantes` : isLive ? `${order.etaMin} min restantes` : undefined}
          arrivalLabel={arrivalLabel}
          mapStyle={mapStyle}
          is3d={is3d}
          rightInset={panelOpen ? PANEL_WIDTH : 0}
          bottomInset={footer ? FOOTER_HEIGHT : 0}
          onRoute={(next) => setRouteInfo({ id: order.id, info: next })}
          onUserMove={() => setView("free")}
        />

        <LiveBadge live={enVivo}>
          <LiveDot live={enVivo} />{" "}
          {vivo?.velocidad != null
            ? `En vivo · ${Math.round(vivo.velocidad)} km/h`
            : ubicacion
              ? "En vivo"
              : isLive
                ? "En vivo · hace 1 min"
                : statusLabel[order.status]}
        </LiveBadge>

        {panelOpen ? (
          <DetailPanel style={{ width: PANEL_WIDTH }} aria-label="Detalle de la ruta">
            <CloseButton type="button" aria-label="Cerrar detalle" onClick={() => setPanelOpen(false)}>
              <FiX size={15} />
            </CloseButton>

            <Illustration aria-hidden="true">
              <svg viewBox="0 0 260 84" preserveAspectRatio="none">
                <path d="M-10 70 C 60 40, 120 78, 190 46 S 270 30, 270 30" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
                <path d="M-10 70 C 60 40, 120 78, 190 46 S 270 30, 270 30" fill="none" stroke="rgba(224,122,95,.55)" strokeWidth="2" strokeDasharray="6 7" />
              </svg>
              <span><MdDeliveryDining size={28} /></span>
            </Illustration>

            <strong>Detalle de la ruta</strong>

            <DetailList>
              <dt>Salida</dt><dd>{order.origin}</dd>
              <dt>Destino</dt><dd>{order.destination}</dd>
              <dt>Distancia total</dt><dd>{distanceKm.toFixed(1)} km</dd>
              {vivo ? (
                <>
                  <dt>Velocidad</dt><dd>{vivo.velocidad === null ? "Sin medir" : `${Math.round(vivo.velocidad)} km/h`}</dd>
                  <dt>Avance</dt><dd>{Math.round(vivo.avance.fraccion * 100)} % · {km(vivo.avance.recorridoKm)} de {km(vivo.avance.totalKm)}</dd>
                  <dt>Falta</dt><dd>{km(vivo.avance.restanteKm)} · ~{vivo.minutosRestantes} min</dd>
                  <dt>Llegada estimada</dt><dd>{hora.format(vivo.llegada)}</dd>
                </>
              ) : (
                <>
                  <dt>Tiempo estimado</dt><dd>{isLive ? `${order.etaMin} min` : order.status === "entregado" ? "Completado" : `~${etaMin} min`}</dd>
                </>
              )}
              <dt>Repartidor</dt><dd>{order.conductor ?? (order.status === "entregado" ? "Equipo UVGo" : "Por asignar")}</dd>
            </DetailList>

            {/* Avisos del recorrido en vivo: señal perdida, piloto detenido o fuera de la ruta */}
            <AlertRow>
              {vivo?.alerta ? (
                <AlertChip tone={vivo.alerta.tono} role="status"><FiAlertTriangle size={13} /> {vivo.alerta.texto}</AlertChip>
              ) : (
                <AlertChip tone="neutral"><FiInfo size={13} /> Sin alertas activas</AlertChip>
              )}
            </AlertRow>
          </DetailPanel>
        ) : (
          <ReopenButton type="button" onClick={() => setPanelOpen(true)}>
            <FiInfo size={14} /> Detalle de la ruta
          </ReopenButton>
        )}

        {footer?.({ distanceKm, etaMin, vivo })}

        <ZoomControls aria-label="Zoom del mapa">
          <button type="button" aria-label="Acercar" onClick={() => mapRef.current?.zoomIn()}><FiPlus size={16} /></button>
          <button type="button" aria-label="Alejar" onClick={() => mapRef.current?.zoomOut()}><FiMinus size={16} /></button>
        </ZoomControls>
      </MapStage>
    </MapCard>
  )
}

export default RouteOverview
