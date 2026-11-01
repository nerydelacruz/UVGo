import { useTheme } from "@emotion/react"
import { FiPackage } from "react-icons/fi"
import { ESTADOS, type PedidoDetalle } from "@/models/pedido.model"
import type { Order } from "@/pages/SeguimientoPedidos/data"
import { Badge } from "@/styles/shared.styles"
import { formatPrecio } from "@/utilities/currency"
import { diasEntre, formatDiaNumerico, hoyISO } from "@/utilities/date"
import { tonoEstado } from "@/utilities/estadoPedido"
import { ETAPAS, etapaDe } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { verdeClaro } from "../DashboardCard/DashboardCard.styles"
import { Anillo, Etapa, Etapas, Mosaico, Mosaicos, Plazo, Portada } from "./PedidoSeleccionado.styles"

interface PedidoSeleccionadoProps {
  pedido: PedidoDetalle | undefined
  order: Order | undefined
  estado: EstadoCarga
}

const RADIO = 16
const CIRCUNFERENCIA = 2 * Math.PI * RADIO
// El anillo se vacía a lo largo de dos semanas antes de la fecha límite
const VENTANA_DIAS = 14

const textoPlazo = (dias: number) => {
  if (dias < 0) return `Venció hace ${-dias} ${dias === -1 ? "día" : "días"}`
  if (dias === 0) return "Vence hoy"
  return `Quedan ${dias} ${dias === 1 ? "día" : "días"}`
}

const Contenido = ({ pedido, order }: { pedido: PedidoDetalle; order: Order }) => {
  const theme = useTheme()
  const dias = diasEntre(hoyISO(), pedido.fechaLimite)
  const restante = Math.min(Math.max(dias, 0), VENTANA_DIAS) / VENTANA_DIAS
  const etapa = etapaDe(pedido.estado)
  const catalogo = pedido.productos.filter((i) => i.tipo === "CATALOGO").length

  return (
    <>
      <Portada>
        <strong>{pedido.curso}</strong>
        <span>#{order.number}</span>
        <span>{pedido.nombreCatedratico}</span>
        <FiPackage size={72} aria-hidden />
      </Portada>

      <Plazo>
        <div>
          <strong>{textoPlazo(dias)}</strong>
          <span>Fecha límite: {formatDiaNumerico(pedido.fechaLimite)}</span>
        </div>
        <Anillo role="img" aria-label={textoPlazo(dias)}>
          <svg viewBox="0 0 40 40" aria-hidden>
            <circle cx="20" cy="20" r={RADIO} fill="none" stroke={verdeClaro} strokeWidth="4" />
            {restante > 0 && (
              <circle
                cx="20"
                cy="20"
                r={RADIO}
                fill="none"
                stroke={dias <= 1 ? theme.color.accent : theme.color.addAction}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${restante * CIRCUNFERENCIA} ${CIRCUNFERENCIA}`}
              />
            )}
          </svg>
          <b aria-hidden>{Math.max(dias, 0)} d</b>
        </Anillo>
      </Plazo>

      <Mosaicos>
        <Mosaico>
          <span>Total</span>
          <strong>{pedido.total !== null ? formatPrecio(pedido.total, pedido.monedaCotizacion) : "—"}</strong>
          <small>
            {pedido.productos.length} {pedido.productos.length === 1 ? "producto" : "productos"} · {catalogo} del catálogo
          </small>
        </Mosaico>
        <Mosaico horizontal>
          <Etapas role="img" aria-label={`Etapa ${etapa + 1} de ${ETAPAS.length}: ${ESTADOS[pedido.estado]}`}>
            {ETAPAS.map((e, i) => (
              <Etapa key={e.label} llena={i <= etapa} />
            ))}
          </Etapas>
          <Badge tone={tonoEstado(pedido.estado)}>{ESTADOS[pedido.estado]}</Badge>
        </Mosaico>
      </Mosaicos>
    </>
  )
}

// Resumen del pedido elegido en la lista: cuánto falta para la fecha límite, en qué etapa va y cuánto suma
const PedidoSeleccionado = ({ pedido, order, estado }: PedidoSeleccionadoProps) => (
  <DashboardCard
    titulo="Pedido seleccionado"
    estado={estado}
    esqueleto={["11.2rem", "8rem", "10rem"]}
    vacio={pedido && order ? null : { titulo: "Ningún pedido", texto: "Elige un pedido de la lista para ver su resumen." }}
  >
    {pedido && order && <Contenido pedido={pedido} order={order} />}
  </DashboardCard>
)

export default PedidoSeleccionado
