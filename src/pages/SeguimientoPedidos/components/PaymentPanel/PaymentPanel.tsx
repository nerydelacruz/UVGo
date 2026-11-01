import { FiArrowRight, FiCalendar, FiCheck, FiCheckCircle, FiClock, FiFileText, FiInfo, FiUpload } from "react-icons/fi"
import { hoyISO } from "@/utilities/date"
import { formatQ, paymentLabel, type Order } from "../../data"
import { CardTitle, StatusBadge, type BadgeTone } from "../../SeguimientoPedidos.styles"
import { Amount, Countdown, Dates, NextStep, PaymentCard, PaymentTop, Step, Steps, type StepState } from "./PaymentPanel.styles"

const badgeTone: Record<Order["paymentStatus"], BadgeTone> = {
  pagado: "success",
  pendiente: "accent",
  vencido: "danger",
}

// Días de hoy a la fecha límite (yyyy-mm-dd), contados en hora local
const diasHasta = (fecha: string) => {
  const dia = (iso: string) => {
    const [anio, mes, d] = iso.split("-").map(Number)
    return new Date(anio, mes - 1, d).getTime()
  }
  return Math.round((dia(fecha) - dia(hoyISO())) / 86_400_000)
}

const cuentaRegresiva = (dias: number) =>
  dias > 1 ? `Faltan ${dias} días` : dias === 1 ? "Mañana" : dias === 0 ? "Hoy" : `Venció hace ${-dias} ${dias === -1 ? "día" : "días"}`

interface PaymentPanelProps {
  order: Order
  // Lleva a "Mis solicitudes", donde se sube el comprobante
  onPagar: (id: string) => void
}

const PaymentPanel = ({ order, onPagar }: PaymentPanelProps) => {
  const pagado = order.paymentStatus === "pagado"
  const entregado = order.status === "entregado"
  const balance = order.total - order.paid
  const dias = diasHasta(order.dueDate)
  const conDestino = order.destination !== "Por definir"

  // Los tres pasos del pago; el primero sin completar es el actual
  const pasos: Array<{ titulo: string; detalle: string; hecho: boolean }> = [
    {
      titulo: "Cotización aceptada",
      detalle: order.timeline.find((entry) => entry.phase === "confirmado")?.time ?? "—",
      hecho: true,
    },
    { titulo: "Comprobante enviado", detalle: order.comprobanteEnviado ?? "Pendiente", hecho: order.tieneComprobante },
    { titulo: "Pago validado", detalle: order.pagadoEl ?? (order.tieneComprobante ? "En revisión" : "Pendiente"), hecho: pagado },
  ]
  const actual = pasos.findIndex((paso) => !paso.hecho)
  const estadoPaso = (i: number): StepState => (pasos[i].hecho ? "done" : i === actual ? "current" : "pending")

  const siguiente = entregado
    ? { icono: FiCheckCircle, texto: "Pedido entregado. ¡Gracias por usar UVGo!" }
    : pagado
      ? {
          icono: FiCheckCircle,
          texto: conDestino
            ? `Pago confirmado. Estamos preparando tu pedido para entregarlo en ${order.destination}.`
            : "Pago confirmado. Estamos preparando tu pedido; te contactaremos para acordar el punto de entrega.",
        }
      : order.tieneComprobante
        ? { icono: FiClock, texto: "Estamos revisando tu comprobante. Te avisaremos por correo cuando se valide." }
        : { icono: FiInfo, texto: "Sube tu comprobante de pago para que empecemos a preparar tu pedido." }
  const Icono = siguiente.icono

  return (
    <PaymentCard aria-label="Estado de pago">
      <PaymentTop>
        <CardTitle><FiFileText size={16} aria-hidden /> Estado de pago</CardTitle>
        <StatusBadge tone={badgeTone[order.paymentStatus]} dot>{paymentLabel[order.paymentStatus]}</StatusBadge>
      </PaymentTop>

      <Amount>
        <strong>{formatQ(order.total)}</strong>
        <span>
          {balance <= 0
            ? "Pagado en su totalidad"
            : order.tieneComprobante
              ? "Comprobante enviado · en revisión"
              : `Saldo pendiente ${formatQ(balance)}`}
        </span>
      </Amount>

      <Steps aria-label="Pasos del pago">
        {pasos.map((paso, i) => {
          const estado = estadoPaso(i)
          return (
            <Step key={paso.titulo} state={estado} aria-current={estado === "current" ? "step" : undefined}>
              <i aria-hidden>{estado === "done" ? <FiCheck size={12} /> : estado === "current" ? <FiClock size={12} /> : i + 1}</i>
              <strong>{paso.titulo}</strong>
              <small>{paso.detalle}</small>
            </Step>
          )
        })}
      </Steps>

      <NextStep done={pagado}>
        <Icono size={16} aria-hidden />
        <p>{siguiente.texto}</p>
        {!order.tieneComprobante && !pagado && (
          <button type="button" onClick={() => onPagar(order.id)}>
            <FiUpload size={14} aria-hidden /> Subir comprobante <FiArrowRight size={14} aria-hidden />
          </button>
        )}
      </NextStep>

      <Dates>
        <div>
          <span><FiCalendar size={12} aria-hidden /> Cotizado</span>
          <strong>{order.issuedAt}</strong>
        </div>
        <div>
          <span><FiCalendar size={12} aria-hidden /> Fecha límite</span>
          <strong>
            {order.dueAt}
            {!entregado && <Countdown urgent={dias <= 1}>{cuentaRegresiva(dias)}</Countdown>}
          </strong>
        </div>
      </Dates>
    </PaymentCard>
  )
}

export default PaymentPanel
