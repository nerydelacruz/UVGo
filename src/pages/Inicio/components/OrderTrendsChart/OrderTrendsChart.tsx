import { useTheme } from "@emotion/react"
import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Card, ChartWrapper, Header, HeaderText, PeriodSelect, Subtitle, Title, TooltipBubble } from "./OrderTrendsChart.styles"

type Period = "mensual" | "semanal"

interface DataPoint {
  label: string
  total: number
}

const monthly: DataPoint[] = [
  { label: "Ene", total: 1 },
  { label: "Feb", total: 2 },
  { label: "Mar", total: 0 },
  { label: "Abr", total: 3 },
  { label: "May", total: 1 },
  { label: "Jun", total: 4 },
  { label: "Jul", total: 2 },
  { label: "Ago", total: 1 },
  { label: "Sep", total: 3 },
  { label: "Oct", total: 2 },
  { label: "Nov", total: 1 },
  { label: "Dic", total: 0 },
]

const weekly: DataPoint[] = [
  { label: "S1", total: 1 },
  { label: "S2", total: 2 },
  { label: "S3", total: 0 },
  { label: "S4", total: 3 },
  { label: "S5", total: 1 },
  { label: "S6", total: 2 },
]

interface BarShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  index?: number
}

interface CustomBarProps extends BarShapeProps {
  activeIndex: number
  activeColor: string
  inactiveColor: string
  radius: number
}

const CustomBar = ({ x = 0, y = 0, width = 0, height = 0, index, activeIndex, activeColor, inactiveColor, radius }: CustomBarProps) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    rx={radius}
    ry={radius}
    fill={index === activeIndex ? activeColor : inactiveColor}
  />
)

interface TickProps {
  x?: number | string
  y?: number | string
  index?: number
  payload?: { value: string }
}

interface CustomTickProps extends TickProps {
  activeIndex: number
  activeColor: string
  inactiveColor: string
  fontSize: string
  activeWeight: number
  inactiveWeight: number
}

const CustomTick = ({ x = 0, y = 0, index, payload, activeIndex, activeColor, inactiveColor, fontSize, activeWeight, inactiveWeight }: CustomTickProps) => {
  const isActive = index === activeIndex

  return (
    <text x={Number(x)} y={Number(y) + 12} textAnchor="middle" fontSize={fontSize} fontWeight={isActive ? activeWeight : inactiveWeight} fill={isActive ? activeColor : inactiveColor}>
      {payload?.value}
    </text>
  )
}

const OrderTrendsChart = () => {
  const theme = useTheme()
  const [period, setPeriod] = useState<Period>("mensual")
  const [hovered, setHovered] = useState<number | null>(null)

  const data = period === "mensual" ? monthly : weekly
  const maxTotal = Math.max(...data.map((d) => d.total), 1)
  const peakIndex = data.findIndex((d) => d.total === maxTotal)
  const activeIndex = hovered ?? peakIndex
  const totalSum = data.reduce((sum, point) => sum + point.total, 0)
  const periodLabel = period === "mensual" ? "este año" : "en estas 6 semanas"

  return (
    <Card>
      <Header>
        <HeaderText>
          <Title>Mis Pedidos</Title>
          <Subtitle>
            {totalSum} pedidos {periodLabel}
          </Subtitle>
        </HeaderText>
        <PeriodSelect value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
          <option value="mensual">Mensual</option>
          <option value="semanal">Semanal</option>
        </PeriodSelect>
      </Header>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, left: 0, right: 0, bottom: 0 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={(props) => (
                <CustomTick
                  {...props}
                  activeIndex={activeIndex}
                  activeColor={theme.color.textStrong}
                  inactiveColor={theme.color.textFaint}
                  fontSize={theme.font.size.xs}
                  activeWeight={theme.font.weight.semibold}
                  inactiveWeight={theme.font.weight.medium}
                />
              )}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const point = payload[0].payload as DataPoint
                return (
                  <TooltipBubble>
                    {point.label} · <strong>{point.total}</strong> {point.total === 1 ? "pedido" : "pedidos"}
                  </TooltipBubble>
                )
              }}
            />
            <Bar
              dataKey="total"
              maxBarSize={18}
              onMouseEnter={(_, index) => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              shape={(props) => (
                <CustomBar
                  {...props}
                  activeIndex={activeIndex}
                  activeColor={theme.color.accent}
                  inactiveColor={theme.color.border}
                  radius={6}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Card>
  )
}

export default OrderTrendsChart
