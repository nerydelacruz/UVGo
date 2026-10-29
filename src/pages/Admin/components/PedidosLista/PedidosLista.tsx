import { FiMapPin, FiPackage, FiPlay } from "react-icons/fi"
import type { PedidoDetalle } from "@/models/pedido.model"
import type { Order } from "@/pages/SeguimientoPedidos/data"
import { Badge } from "@/styles/shared.styles"
import { formatFechaHora } from "@/utilities/date"
import { estadoPago } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Estado, Fecha, Fila, Icono, Lista, Texto } from "./PedidosLista.styles"

export interface PedidoEnMapa {
  pedido: PedidoDetalle
  order: Order
}

interface PedidosListaProps {
  pedidos: PedidoEnMapa[]
  selectedId: string | undefined
  onSelect: (id: string) => void
  estado: EstadoCarga
}

const FILAS = 5

// Los 5 pedidos más recientes (cotización aceptada). El que se elige aparece en el mapa y en el detalle.
const PedidosLista = ({ pedidos, selectedId, onSelect, estado }: PedidosListaProps) => (
  <DashboardCard
    titulo={`Pedidos (${pedidos.length})`}
    estado={estado}
    esqueleto={["5.6rem", "5.6rem", "5.6rem", "5.6rem", "5.6rem"]}
    vacio={pedidos.length === 0 ? { titulo: "Aún no hay pedidos", texto: "Aparecen cuando un estudiante acepta una cotización." } : null}
  >
    <Lista>
      {pedidos.slice(0, FILAS).map(({ pedido, order }) => {
        const activa = pedido.id === selectedId
        const pago = estadoPago(pedido)
        return (
          <li key={pedido.id}>
            <Fila type="button" activa={activa} aria-pressed={activa} onClick={() => onSelect(pedido.id)}>
              <Icono activa={activa}>
                <FiPackage size={18} aria-hidden />
              </Icono>
              <Texto>
                <strong>#{order.number}</strong>
                <small>
                  {pedido.curso} · {order.destination}
                </small>
              </Texto>
              <Badge tone={pago.tone}>{pago.label}</Badge>
              <Fecha dateTime={pedido.fechaConfirmacion ?? pedido.fechaSolicitud}>
                {formatFechaHora(pedido.fechaConfirmacion ?? pedido.fechaSolicitud)}
              </Fecha>
              <Estado activa={activa}>
                {activa ? <FiMapPin size={13} aria-hidden /> : <FiPlay size={13} aria-hidden />}
                {activa ? "En mapa" : "Ver ruta"}
              </Estado>
            </Fila>
          </li>
        )
      })}
    </Lista>
  </DashboardCard>
)

export default PedidosLista
