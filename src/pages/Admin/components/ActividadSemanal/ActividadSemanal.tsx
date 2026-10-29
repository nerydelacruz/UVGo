import { useTheme } from "@emotion/react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatDiaNumerico } from "@/utilities/date"
import type { ResumenPedidos } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Cambio, Globo, Grafica, Resumen } from "./ActividadSemanal.styles"

interface ActividadSemanalProps {
  porDia: ResumenPedidos["porDia"] | undefined
  estado: EstadoCarga
}

interface Punto {
  fecha: string
  dia: string
  solicitudes: number
}

const inicial = new Intl.DateTimeFormat("es-GT", { weekday: "narrow" })

// "2026-10-26" → "L"
const etiqueta = (fecha: string) => {
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return inicial.format(new Date(anio, mes - 1, dia)).toUpperCase()
}

// Solicitudes por día de los últimos 7 días, comparadas con los 7 anteriores
const ActividadSemanal = ({ porDia = [], estado }: ActividadSemanalProps) => {
  const theme = useTheme()
  const semana: Punto[] = porDia.slice(-7).map((d) => ({ ...d, dia: etiqueta(d.fecha) }))
  const actual = semana.reduce((s, d) => s + d.solicitudes, 0)
  const anterior = porDia.slice(-14, -7).reduce((s, d) => s + d.solicitudes, 0)
  // Sin solicitudes la semana anterior no hay base para un porcentaje
  const delta = anterior > 0 ? Math.round(((actual - anterior) / anterior) * 100) : null

  return (
    <DashboardCard titulo="Actividad" extra="Últimos 7 días" grow estado={estado} esqueleto={["6.4rem", "16rem"]}>
      <Resumen>
        <div>
          <strong>{actual}</strong>
          <span>{actual === 1 ? "solicitud" : "solicitudes"} esta semana</span>
        </div>
        <div>
          <span>Semana anterior: {anterior}</span>
          {delta !== null && (
            <Cambio sube={delta >= 0}>
              {delta > 0 ? "+" : ""}
              {delta} %
            </Cambio>
          )}
        </div>
      </Resumen>

      <Grafica role="img" aria-label={semana.map((d) => `${formatDiaNumerico(d.fecha)}: ${d.solicitudes}`).join(", ")}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={semana} margin={{ top: 12, right: 8, left: -28, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(82, 82, 82, 0.08)" />
            <XAxis dataKey="dia" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: 11, fill: theme.color.textFaint }} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.color.textFaint }} />
            <Tooltip
              cursor={{ stroke: "rgba(82, 82, 82, 0.2)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const punto = payload[0].payload as Punto
                return (
                  <Globo>
                    {formatDiaNumerico(punto.fecha)} · {punto.solicitudes} {punto.solicitudes === 1 ? "solicitud" : "solicitudes"}
                  </Globo>
                )
              }}
            />
            <Line
              type="monotone"
              dataKey="solicitudes"
              stroke={theme.color.addAction}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: theme.color.addAction, stroke: "white", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grafica>
    </DashboardCard>
  )
}

export default ActividadSemanal
