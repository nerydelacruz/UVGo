import type { ReactNode } from "react"
import { FiCheckCircle, FiPackage, FiTruck } from "react-icons/fi"
import { Card, Delta, Icon, Info, Label, Row, Value } from "./StatsBar.styles"

interface StatItem {
  label: string
  value: number
  delta: string
  tone: "warning" | "primary" | "accent"
  icon: ReactNode
}

const stats: StatItem[] = [
  { label: "En Preparación", value: 8, delta: "+12.5%", tone: "warning", icon: <FiPackage size={22} /> },
  { label: "En Camino", value: 12, delta: "+8.2%", tone: "primary", icon: <FiTruck size={22} /> },
  { label: "Entregados", value: 28, delta: "+38.1%", tone: "accent", icon: <FiCheckCircle size={22} /> },
]

const StatsBar = () => (
  <Row>
    {stats.map((stat) => (
      <Card key={stat.label}>
        <Info>
          <Value>{stat.value}</Value>
          <Label>{stat.label}</Label>
          <Delta>{stat.delta}</Delta>
        </Info>
        <Icon tone={stat.tone}>{stat.icon}</Icon>
      </Card>
    ))}
  </Row>
)

export default StatsBar
