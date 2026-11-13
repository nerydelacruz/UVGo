import type { ResumenReporte } from "@/models/reporte.model"
import { formatPrecio } from "@/utilities/currency"
import { formatEntero, formatHoras, formatKm, formatPorcentaje } from "../../formato"
import { Cifra, Cuadricula, Detalle, Etiqueta, Mosaico } from "./Indicadores.styles"

interface IndicadoresProps {
  resumen: ResumenReporte | undefined
  cargando: boolean
}

interface Indicador {
  etiqueta: string
  cifra: string
  detalle: string
}

const indicadores = (s: ResumenReporte): Indicador[] => [
  {
    etiqueta: "Total vendido",
    cifra: formatPrecio(s.totalVendido),
    detalle: `${formatPrecio(s.montoProductos)} en productos`,
  },
  {
    etiqueta: "Cobrado",
    cifra: formatPrecio(s.totalCobrado),
    detalle: `Por cobrar: ${formatPrecio(s.porCobrar)}`,
  },
  {
    etiqueta: "Cargos de envío",
    cifra: formatPrecio(s.cargosEnvio),
    detalle: s.costoEnvioPorKm === null ? "Sin recorridos registrados" : `${formatPrecio(s.costoEnvioPorKm)} por km`,
  },
  {
    etiqueta: "Kilometraje",
    cifra: formatKm(s.kilometros),
    detalle: s.velocidadPromedio === null ? "Recorrido de los pilotos" : `A ${s.velocidadPromedio} km/h en promedio`,
  },
  {
    etiqueta: "Pedidos",
    cifra: formatEntero(s.pedidos),
    detalle: `${formatPorcentaje(s.pedidos, s.solicitudes)} de ${formatEntero(s.solicitudes)} solicitudes`,
  },
  {
    etiqueta: "Ticket promedio",
    cifra: formatPrecio(s.ticketPromedio),
    detalle: "Por pedido, envío incluido",
  },
  {
    etiqueta: "Cancelación",
    cifra: formatPorcentaje(s.cancelados, s.solicitudes),
    detalle: `${formatEntero(s.cancelados)} ${s.cancelados === 1 ? "solicitud cancelada" : "solicitudes canceladas"}`,
  },
  {
    etiqueta: "Tiempo de respuesta",
    cifra: formatHoras(s.horasCotizacion),
    detalle: `Hasta cotizar · pago en ${formatHoras(s.horasPago).toLowerCase()}`,
  },
]

// Las cifras que más pregunta el administrador, una por mosaico
const Indicadores = ({ resumen, cargando }: IndicadoresProps) => {
  if (!resumen) {
    return (
      <Cuadricula aria-busy={cargando || undefined}>
        {Array.from({ length: 8 }, (_, i) => (
          <Mosaico key={i} aria-hidden vacio />
        ))}
      </Cuadricula>
    )
  }

  return (
    <Cuadricula>
      {indicadores(resumen).map((i) => (
        <Mosaico key={i.etiqueta}>
          <Etiqueta>{i.etiqueta}</Etiqueta>
          <Cifra>{i.cifra}</Cifra>
          <Detalle>{i.detalle}</Detalle>
        </Mosaico>
      ))}
    </Cuadricula>
  )
}

export default Indicadores
