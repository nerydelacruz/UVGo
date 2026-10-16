import { useEffect, useRef, useState } from "react"
import { FiCloudDrizzle, FiCrosshair, FiInfo, FiLayers, FiMap, FiMaximize2, FiMinimize2, FiMinus, FiPlus, FiTool, FiX } from "react-icons/fi"
import { MdDeliveryDining, MdOutlineTraffic } from "react-icons/md"
import { courier, routeAlerts, routeProgress, statusLabel, warehouse, type AlertTone, type Order } from "../../data"
import { CardTitle, Muted, SquareButton } from "../../SeguimientoPedidos.styles"
import DeliveryMap, { type DeliveryMapHandle, type MapStyle, type RouteInfo } from "./DeliveryMap"
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

const alertIcon = { rain: FiCloudDrizzle, traffic: MdOutlineTraffic, works: FiTool }

type View = "route" | "moto" | "free"

const RouteOverview = ({ order }: { order: Order }) => {
  const mapRef = useRef<DeliveryMapHandle>(null)
  const [mapStyle, setMapStyle] = useState<MapStyle>("streets")
  // la vista vuelve a "ruta completa" al cambiar de pedido
  const [viewState, setViewState] = useState<{ id: string; view: View }>({ id: order.id, view: "route" })
  const [expanded, setExpanded] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [routeInfo, setRouteInfo] = useState<{ id: string; info: RouteInfo } | null>(null)

  const isLive = order.status === "en-ruta"
  const info = routeInfo?.id === order.id ? routeInfo.info : null
  const distanceKm = info?.distanceKm ?? order.distanceKm
  const view = viewState.id === order.id ? viewState.view : "route"
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

  const arrivalLabel = isLive ? `Llega ${order.deliveryAt.replace(/^Hoy, /, "")}` : order.status === "entregado" ? "Entregado" : "Destino"

  return (
    <MapCard expanded={expanded} aria-label="Ruta de entrega">
      <MapHeader>
        <div>
          <CardTitle>Ruta de entrega</CardTitle>
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
          <SquareButton type="button" active={view === "route"} title="Ver ruta completa" aria-label="Ver ruta completa" onClick={() => goTo("route")}>
            <FiMap size={17} />
          </SquareButton>
          <SquareButton
            type="button"
            active={view === "moto"}
            title="Ubicación del repartidor"
            aria-label="Centrar en el repartidor"
            onClick={() => goTo("moto")}
            disabled={!isLive}
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
          remainingLabel={isLive ? `${order.etaMin} min restantes` : undefined}
          arrivalLabel={arrivalLabel}
          mapStyle={mapStyle}
          rightInset={panelOpen ? PANEL_WIDTH : 0}
          onRoute={(next) => setRouteInfo({ id: order.id, info: next })}
          onUserMove={() => setView("free")}
        />

        <LiveBadge live={isLive}>
          <LiveDot live={isLive} /> {isLive ? "En vivo · hace 1 min" : statusLabel[order.status]}
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
              <dt>Tiempo estimado</dt><dd>{isLive ? `${order.etaMin} min` : order.status === "entregado" ? "Completado" : `~${Math.max(order.etaMin, Math.round(info?.durationMin ?? 0))} min`}</dd>
              <dt>Repartidor</dt><dd>{isLive || order.status === "entregado" ? courier.name : "Por asignar"}</dd>
            </DetailList>

            {isLive ? (
              <AlertRow>
                {routeAlerts.map((alert) => {
                  const Icon = alertIcon[alert.icon]
                  return (
                    <AlertChip key={alert.label} tone={alert.tone as AlertTone}>
                      <Icon size={13} /> {alert.label}
                    </AlertChip>
                  )
                })}
              </AlertRow>
            ) : (
              <AlertRow>
                <AlertChip tone="neutral"><FiInfo size={13} /> Sin alertas activas</AlertChip>
              </AlertRow>
            )}
          </DetailPanel>
        ) : (
          <ReopenButton type="button" onClick={() => setPanelOpen(true)}>
            <FiInfo size={14} /> Detalle de la ruta
          </ReopenButton>
        )}

        <ZoomControls aria-label="Zoom del mapa">
          <button type="button" aria-label="Acercar" onClick={() => mapRef.current?.zoomIn()}><FiPlus size={16} /></button>
          <button type="button" aria-label="Alejar" onClick={() => mapRef.current?.zoomOut()}><FiMinus size={16} /></button>
        </ZoomControls>
      </MapStage>
    </MapCard>
  )
}

export default RouteOverview
