import { useTheme } from "@emotion/react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { DiaReporte } from "@/models/reporte.model"
import DashboardCard, { type EstadoCarga } from "../../../components/DashboardCard/DashboardCard"
import { Globo } from "../../../components/ActividadSemanal/ActividadSemanal.styles"
import { formatDiaCorto, formatDiaLargo } from "../../formato"
import { Grafica, Total } from "./SerieDiaria.styles"

interface SerieDiariaProps {
  titulo: string
  dias: DiaReporte[] | undefined
  valor: "vendido" | "kilometros"
  formato: (n: number) => string
  // Texto bajo el total (p. ej. "vendido en el periodo")
  leyendaTotal: string
  estado: EstadoCarga
}

// Con pocos días se leen mejor barras; con muchos, una línea (las barras quedarían de 1 px)
const MAXIMO_BARRAS = 45

const compacto = new Intl.NumberFormat("es-GT", { notation: "compact", maximumFractionDigits: 1 })

// Una sola medida por día: el título nombra la serie, así que no lleva leyenda
const SerieDiaria = ({ titulo, dias = [], valor, formato, leyendaTotal, estado }: SerieDiariaProps) => {
  const theme = useTheme()
  const puntos = dias.map((d) => ({ fecha: d.fecha, valor: d[valor] }))
  const total = puntos.reduce((s, p) => s + p.valor, 0)
  const conBarras = puntos.length <= MAXIMO_BARRAS
  const vacio = !estado.isLoading && !estado.isError && total === 0

  const ejes = (
    <>
      <CartesianGrid vertical={false} stroke="rgba(82, 82, 82, 0.08)" />
      <XAxis
        dataKey="fecha"
        tickFormatter={formatDiaCorto}
        axisLine={false}
        tickLine={false}
        minTickGap={24}
        tick={{ fontSize: 11, fill: theme.color.textFaint }}
      />
      <YAxis
        tickFormatter={(n: number) => compacto.format(n)}
        axisLine={false}
        tickLine={false}
        width={44}
        tick={{ fontSize: 11, fill: theme.color.textFaint }}
      />
      <Tooltip
        cursor={conBarras ? { fill: "rgba(82, 82, 82, 0.06)" } : { stroke: "rgba(82, 82, 82, 0.2)" }}
        content={({ active, payload }) => {
          if (!active || !payload?.length) return null
          const punto = payload[0].payload as (typeof puntos)[number]
          return (
            <Globo>
              {formatDiaLargo(punto.fecha)} · {formato(punto.valor)}
            </Globo>
          )
        }}
      />
    </>
  )

  return (
    <DashboardCard
      titulo={titulo}
      to={null}
      estado={estado}
      esqueleto={["4.8rem", "22rem"]}
      vacio={vacio ? { titulo: "Sin movimiento", texto: "No hay datos para este periodo." } : null}
    >
      <Total>
        <strong>{formato(total)}</strong>
        <span>{leyendaTotal}</span>
      </Total>
      <Grafica role="img" aria-label={`${titulo}: ${formato(total)} en total. El detalle por día está en el CSV.`}>
        <ResponsiveContainer width="100%" height="100%">
          {conBarras ? (
            <BarChart data={puntos} margin={{ top: 12, right: 8, left: 0, bottom: 0 }} barCategoryGap={2}>
              {ejes}
              <Bar dataKey="valor" fill={theme.color.addAction} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          ) : (
            <LineChart data={puntos} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
              {ejes}
              <Line
                type="monotone"
                dataKey="valor"
                stroke={theme.color.addAction}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: theme.color.addAction, stroke: "white", strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </Grafica>
    </DashboardCard>
  )
}

export default SerieDiaria
