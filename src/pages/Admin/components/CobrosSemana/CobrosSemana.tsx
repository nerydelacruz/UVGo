import { Badge } from "@/styles/shared.styles"
import { formatPrecio } from "@/utilities/currency"
import { formatDiaNumerico } from "@/utilities/date"
import type { ResumenPedidos } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Barra, Barras, Contenido, Fila, Total } from "./CobrosSemana.styles"

interface CobrosSemanaProps {
  resumen: ResumenPedidos | undefined
  estado: EstadoCarga
}

const inicial = new Intl.DateTimeFormat("es-GT", { weekday: "narrow" })
const etiqueta = (fecha: string) => {
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return inicial.format(new Date(anio, mes - 1, dia)).toUpperCase()
}

// Dinero: qué parte de lo aceptado ya se cobró y cuánto entró cada día de esta semana (por fecha de pago)
const CobrosSemana = ({ resumen, estado }: CobrosSemanaProps) => {
  const dias = resumen?.cobrosPorDia ?? []
  const semana = dias.reduce((total, d) => total + d.monto, 0)
  const max = Math.max(1, ...dias.map((d) => d.monto))
  const aceptado = (resumen?.cobrado ?? 0) + (resumen?.porCobrar ?? 0)
  const porcentaje = aceptado > 0 ? Math.round(((resumen?.cobrado ?? 0) / aceptado) * 100) : 0

  return (
    <DashboardCard titulo="Cobros" estado={estado} esqueleto={["12rem"]}>
      {resumen && (
        <Contenido>
          <Fila>
            <Badge tone={porcentaje === 100 ? "success" : "neutral"}>{porcentaje} % cobrado</Badge>
            <span>Por cobrar: {formatPrecio(resumen.porCobrar)}</span>
          </Fila>
          <Total>
            <div>
              <strong>{formatPrecio(semana)}</strong>
              <small>Cobrado en 7 días</small>
            </div>
            <Barras role="img" aria-label={dias.map((d) => `${formatDiaNumerico(d.fecha)}: ${formatPrecio(d.monto)}`).join(", ")}>
              {dias.map((d, i) => (
                <Barra key={d.fecha} alto={d.monto / max} hoy={i === dias.length - 1} title={`${formatDiaNumerico(d.fecha)}: ${formatPrecio(d.monto)}`}>
                  {etiqueta(d.fecha)}
                </Barra>
              ))}
            </Barras>
          </Total>
        </Contenido>
      )}
    </DashboardCard>
  )
}

export default CobrosSemana
