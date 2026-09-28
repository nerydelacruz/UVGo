import { FiCalendar, FiDownload, FiFileText } from "react-icons/fi"
import { customer, formatQ, paymentLabel, type Order } from "../../data"
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
  const paidPercent = Math.round((order.paid / order.total) * 100)

  return (
    <Stack>
      <InvoiceCard aria-label="Comprobante">
        <InvoiceHead>
          <div>
            <span>Comprobante</span>
            <strong>#{order.number}</strong>
          </div>
          <button type="button" aria-label="Descargar comprobante" title="Descargar comprobante">
            <FiDownload size={16} />
          </button>
        </InvoiceHead>
        <InvoiceBody>
          <InvoiceRows>
            <dt>Kit</dt><dd>{order.kitName}</dd>
            <dt>Cliente</dt><dd>{customer.name} · {customer.carnet}</dd>
            <dt>Dirección</dt><dd>{order.destination}, Campus Central UVG</dd>
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
          <small>{balance > 0 ? `Saldo ${formatQ(balance)} · ${paidPercent}% pagado` : "Pagado en su totalidad"}</small>
        </Total>

        <Progress aria-label={`${paidPercent} por ciento pagado`}>
          <span style={{ width: `${paidPercent}%` }} />
        </Progress>

        <DateGrid>
          <div><span><FiCalendar size={12} /> Emisión</span><strong>{order.issuedAt}</strong></div>
          <div><span><FiCalendar size={12} /> Vence saldo</span><strong>{order.dueAt}</strong></div>
        </DateGrid>
      </PaymentCard>
    </Stack>
  )
}

export default PaymentPanel
