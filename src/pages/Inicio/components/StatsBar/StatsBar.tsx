import type { ReactNode } from "react"
import { FiCheckCircle, FiPackage, FiTag } from "react-icons/fi"
import { formatQ, type Resumen } from "../../resumen"
import { Card, Delta, Icon, Info, Label, Row, Value } from "./StatsBar.styles"

interface StatItem {
  label: string
  value: number
  detail: string
  // El detalle pide una acción al estudiante (se pinta en coral)
  warn: boolean
  tone: "warning" | "primary" | "accent"
  icon: ReactNode
  to: string
}

interface StatsBarProps {
  resumen: Resumen
  cargando: boolean
}

// Tres cifras del estudiante; cada tarjeta lleva a donde se actúa sobre esos pedidos
const StatsBar = ({ resumen, cargando }: StatsBarProps) => {
  const porAceptar = resumen.enCotizacion.filter((p) => p.estado === "COTIZADO").length
  const porPagar = resumen.enPreparacion.filter((p) => p.estado === "CONFIRMADO" && !p.comprobante).length

  const stats: StatItem[] = [
    {
      label: "En cotización",
      value: resumen.enCotizacion.length,
      detail: porAceptar > 0 ? `${porAceptar} ${porAceptar === 1 ? "lista" : "listas"} para aceptar` : "Esperando precio",
      warn: porAceptar > 0,
      tone: "warning",
      icon: <FiTag size={22} />,
      to: "/mis-solicitudes",
    },
    {
      label: "En preparación",
      value: resumen.enPreparacion.length,
      detail: porPagar > 0 ? `${porPagar} por pagar` : "Pagos al día",
      warn: porPagar > 0,
      tone: "primary",
      icon: <FiPackage size={22} />,
      to: "/seguimiento-pedidos",
    },
    {
      label: "Entregados",
      value: resumen.entregados.length,
      detail: `${formatQ(resumen.semestre.gastado)} este semestre`,
      warn: false,
      tone: "accent",
      icon: <FiCheckCircle size={22} />,
      to: "/seguimiento-pedidos",
    },
  ]

  return (
    <Row>
      {stats.map((stat) => (
        <Card key={stat.label} to={stat.to}>
          <Info>
            <Value>{cargando ? "—" : stat.value}</Value>
            <Label>{stat.label}</Label>
            <Delta warn={!cargando && stat.warn}>{cargando ? "Cargando…" : stat.detail}</Delta>
          </Info>
          <Icon tone={stat.tone}>{stat.icon}</Icon>
        </Card>
      ))}
    </Row>
  )
}

export default StatsBar
