import { useState } from "react"
import { FiCalendar, FiDownload, FiFileText } from "react-icons/fi"
import { obtenerComprobante } from "@/services/pedido.service"
import { formatQ, paymentLabel, type Order } from "../../data"
import { StatusBadge, type BadgeTone } from "../../SeguimientoPedidos.styles"
import {
  DateGrid,
  InvoiceBody,
  InvoiceCard,
  InvoiceHead,
  InvoiceRows,
  PaymentCard,
  PaymentTop,
  Progress,
  Stack,
  Total,
} from "./PaymentPanel.styles"

const badgeTone: Record<Order["paymentStatus"], BadgeTone> = {
  pagado: "success",
  pendiente: "accent",
  vencido: "danger",
}

const PaymentPanel = ({ order }: { order: Order }) => {
  const balance = order.total - order.paid
  const paidPercent = order.total > 0 ? Math.round((order.paid / order.total) * 100) : 0
  const [descargando, setDescargando] = useState(false)

  // Descarga el comprobante de pago que subió el estudiante (se pide con el token, como Blob)
  const descargar = async () => {
    setDescargando(true)
    try {
      const blob = await obtenerComprobante(order.id)
      const url = URL.createObjectURL(blob)
      const enlace = document.createElement("a")
      enlace.href = url
      enlace.download = `comprobante-${order.number}`
      enlace.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      // Sin comprobante o sin conexión: el botón se vuelve a habilitar para reintentar
    } finally {
      setDescargando(false)
    }
  }

  return (
    <Stack>
      <InvoiceCard aria-label="Comprobante">
        <InvoiceHead>
          <div>
            <span>Comprobante</span>
            <strong>#{order.number}</strong>
          </div>
          <button
            type="button"
            aria-label="Descargar comprobante de pago"
            title={order.tieneComprobante ? "Descargar comprobante de pago" : "Aún no hay comprobante de pago"}
            disabled={!order.tieneComprobante || descargando}
            onClick={descargar}
          >
            <FiDownload size={16} />
          </button>
        </InvoiceHead>
        <InvoiceBody>
          <InvoiceRows>
            <dt>Pedido</dt><dd>{order.kitName}</dd>
            <dt>Cliente</dt><dd>{order.cliente}</dd>
            <dt>Entrega</dt><dd>{order.destination}, Campus Central UVG</dd>
            <dt>Monto</dt><dd>{formatQ(order.total)}</dd>
          </InvoiceRows>
        </InvoiceBody>
      </InvoiceCard>

      <PaymentCard aria-label="Estado de pago">
        <PaymentTop>
          <div>
            <span><FiFileText size={13} /> Estado de pago</span>
            <strong>#{order.number}</strong>
          </div>
          <StatusBadge tone={badgeTone[order.paymentStatus]} dot>{paymentLabel[order.paymentStatus]}</StatusBadge>
        </PaymentTop>

        <Total>
          <span>Monto total</span>
          <strong>{formatQ(order.total)}</strong>
          <small>
            {balance <= 0
              ? "Pagado en su totalidad"
              : order.tieneComprobante
                ? "Comprobante enviado · en revisión"
                : `Saldo ${formatQ(balance)} · falta subir el comprobante`}
          </small>
        </Total>

        <Progress aria-label={`${paidPercent} por ciento pagado`}>
          <span style={{ width: `${paidPercent}%` }} />
        </Progress>

        <DateGrid>
          <div><span><FiCalendar size={12} /> Cotizado</span><strong>{order.issuedAt}</strong></div>
          <div><span><FiCalendar size={12} /> Fecha límite</span><strong>{order.dueAt}</strong></div>
        </DateGrid>
      </PaymentCard>
    </Stack>
  )
}

export default PaymentPanel
