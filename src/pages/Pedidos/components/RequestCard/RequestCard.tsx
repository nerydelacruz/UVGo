import { FiArrowRight, FiCalendar } from "react-icons/fi"
import cajaUVGo from "@/assets/caja_uvgo.png"
import type { PedidoDetalle } from "@/models/pedido.model"
import { formatDia } from "@/utilities/date"
import { PASOS_TOTALES, etapa, formatQ, hace, ultimaActividad } from "@/pages/Inicio/resumen"
import { Action, Badge, Card, Footer, Info, Meta, Name, Photo, Steps, Top } from "./RequestCard.styles"

// Tarjeta compacta de una solicitud: estado, avance en 5 fases, total y la acción que corresponde
const RequestCard = ({ pedido }: { pedido: PedidoDetalle }) => {
  const e = etapa(pedido)
  const unidades = pedido.productos.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <Card urgent={e.pendienteDelEstudiante}>
      <Top>
        <Photo src={cajaUVGo} alt="" />
        <Info>
          <Name title={pedido.curso}>{pedido.curso}</Name>
          <Meta>
            {pedido.productos.length} {pedido.productos.length === 1 ? "producto" : "productos"} · {unidades}{" "}
            {unidades === 1 ? "unidad" : "unidades"}
          </Meta>
        </Info>
        <Badge tone={e.tono}>{e.tag}</Badge>
      </Top>

      <Steps aria-label={`Fase ${e.avance} de ${PASOS_TOTALES}`}>
        {Array.from({ length: PASOS_TOTALES }, (_, i) => (
          <span key={i} data-filled={i < e.avance || undefined} />
        ))}
      </Steps>

      <Footer>
        <div>
          <strong>{pedido.total !== null ? formatQ(pedido.total) : "Por cotizar"}</strong>
          <span>
            <FiCalendar size={11} aria-hidden /> {formatDia(pedido.fechaLimite)} · {hace(ultimaActividad(pedido))}
          </span>
        </div>
        <Action to={e.accion.to} primary={e.pendienteDelEstudiante} aria-label={`${e.accion.label}: ${pedido.curso}`}>
          {e.pendienteDelEstudiante ? e.accion.label : null}
          <FiArrowRight size={14} aria-hidden />
        </Action>
      </Footer>
    </Card>
  )
}

export default RequestCard
