import { FiAlertCircle, FiInbox } from "react-icons/fi"
import { ESTADOS, type PedidoDetalle } from "@/models/pedido.model"
import { formatDia, formatFecha } from "@/utilities/date"
import { tonoEstado } from "@/utilities/estadoPedido"
import {
  Badge,
  Count,
  EmptyState,
  ErrorText,
  GhostButton,
  IconBadge,
  Panel,
  PanelHeader,
  PanelHint,
  PanelTitle,
  ScrollArea,
  SkeletonRow,
} from "@/styles/shared.styles"
import { Badges, Item, Meta, Name, Top } from "./SolicitudList.styles"

interface SolicitudListProps {
  titulo: string
  // Texto cuando no hay solicitudes (distinto para el admin y para el estudiante)
  vacio: string
  solicitudes: PedidoDetalle[]
  total: number
  selectedId: string | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  onSelect: (id: string) => void
}

const SolicitudList = ({ titulo, vacio, solicitudes, total, selectedId, isLoading, isError, onRetry, onSelect }: SolicitudListProps) => (
  <Panel aria-labelledby="solicitudes-title">
    <PanelHeader>
      <div>
        <PanelTitle id="solicitudes-title">
          <IconBadge>
            <FiInbox size={16} />
          </IconBadge>
          {titulo}
        </PanelTitle>
        <PanelHint>Más recientes primero</PanelHint>
      </div>
      {!isLoading && !isError && <Count>{total}</Count>}
    </PanelHeader>

    {isError && (
      <ErrorText role="alert">
        <FiAlertCircle size={14} aria-hidden />
        No pudimos cargar las solicitudes.
        <GhostButton type="button" onClick={onRetry}>
          Reintentar
        </GhostButton>
      </ErrorText>
    )}

    <ScrollArea>
      {isLoading && [0, 1, 2].map((i) => <SkeletonRow key={i} aria-hidden />)}

      {!isLoading && !isError && solicitudes.length === 0 && (
        <EmptyState>
          <strong>Sin solicitudes</strong>
          <p>{vacio}</p>
        </EmptyState>
      )}

      {solicitudes.map((solicitud) => {
        const web = solicitud.productos.filter((p) => p.tipo === "WEB").length
        const catalogo = solicitud.productos.length - web
        const selected = solicitud.id === selectedId
        return (
          <Item
            key={solicitud.id}
            type="button"
            selected={selected}
            aria-current={selected ? "true" : undefined}
            onClick={() => onSelect(solicitud.id)}
          >
            <Top>
              <Name title={solicitud.curso}>{solicitud.curso}</Name>
              <Meta>{formatFecha(solicitud.fechaSolicitud)}</Meta>
            </Top>
            <Meta>
              {solicitud.nombreCatedratico} · Para el {formatDia(solicitud.fechaLimite)}
            </Meta>
            <Badges>
              <Badge tone={tonoEstado(solicitud.estado)}>{ESTADOS[solicitud.estado]}</Badge>
              {solicitud.estado === "CONFIRMADO" &&
                (solicitud.comprobante ? (
                  <Badge tone="accent">Comprobante por validar</Badge>
                ) : (
                  <Badge tone="neutral">Esperando comprobante</Badge>
                ))}
              {catalogo > 0 && <Badge tone="neutral">{catalogo} del catálogo</Badge>}
              {web > 0 && <Badge tone="neutral">{web} de la web</Badge>}
            </Badges>
          </Item>
        )
      })}
    </ScrollArea>
  </Panel>
)

export default SolicitudList
