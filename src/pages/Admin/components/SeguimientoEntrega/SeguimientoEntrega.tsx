import { ESTADOS, type PedidoDetalle } from "@/models/pedido.model"
import { warehouse, type Order } from "@/pages/SeguimientoPedidos/data"
import { Badge } from "@/styles/shared.styles"
import { formatDiaNumerico, formatFechaHora } from "@/utilities/date"
import { tonoEstado } from "@/utilities/estadoPedido"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Encabezado, Linea, Nota, Numero, Paso } from "./SeguimientoEntrega.styles"

interface SeguimientoEntregaProps {
  pedido: PedidoDetalle | undefined
  order: Order | undefined
  estado: EstadoCarga
}

// Recorrido del pedido seleccionado: de la bodega al punto de entrega, con las observaciones del estudiante
const SeguimientoEntrega = ({ pedido, order, estado }: SeguimientoEntregaProps) => (
  <DashboardCard
    titulo="Seguimiento de entrega"
    grow
    estado={estado}
    esqueleto={["6.4rem", "16rem"]}
    vacio={pedido && order ? null : { titulo: "Ningún pedido", texto: "Elige un pedido de la lista para ver su entrega." }}
  >
    {pedido && order && (
      <>
        <Encabezado>
          <small>Pedido</small>
          <Numero>
            <strong>#{order.number}</strong>
            <Badge tone={tonoEstado(pedido.estado)}>{ESTADOS[pedido.estado]}</Badge>
          </Numero>
        </Encabezado>

        <Linea>
          <Paso hecho>
            <small>Solicitud</small>
            <strong>{pedido.curso}</strong>
            <Badge tone="neutral">{formatFechaHora(pedido.fechaSolicitud)}</Badge>
          </Paso>
          <Paso hecho={pedido.fechaConfirmacion !== null}>
            <small>Sale de</small>
            <strong>{warehouse.name}</strong>
            <Badge tone="neutral">
              {pedido.fechaConfirmacion ? `Confirmado ${formatFechaHora(pedido.fechaConfirmacion)}` : "Sin confirmar"}
            </Badge>
          </Paso>
          <Paso hecho={pedido.estado === "ENTREGADO"}>
            <small>Punto de entrega</small>
            <strong>{order.destination}</strong>
            <Badge tone={pedido.estado === "ENTREGADO" ? "success" : "accent"}>Para el {formatDiaNumerico(pedido.fechaLimite)}</Badge>
          </Paso>
        </Linea>

        {pedido.observaciones && <Nota>“{pedido.observaciones}”</Nota>}
      </>
    )}
  </DashboardCard>
)

export default SeguimientoEntrega
