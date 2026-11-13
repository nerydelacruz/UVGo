import { diaISO } from "@/utilities/date"

const entero = new Intl.NumberFormat("es-GT", { maximumFractionDigits: 0 })
const decimal = new Intl.NumberFormat("es-GT", { maximumFractionDigits: 1 })
const diaMes = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "short" })
const diaMesAnio = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "short", year: "numeric" })

// "2026-11-12" se arma en hora local: new Date("2026-11-12") lo tomaría en UTC y mostraría el día anterior
const aFecha = (iso: string) => {
  const [anio, mes, dia] = iso.split("-").map(Number)
  return new Date(anio, mes - 1, dia)
}

export const formatEntero = (n: number) => entero.format(n)

// 1234.567 → "1,234.6 km"
export const formatKm = (km: number) => `${decimal.format(km)} km`

// Horas promedio: menos de 48 h en horas, más en días ("3.5 h", "4.2 d")
export const formatHoras = (horas: number | null) => {
  if (horas === null) return "Sin datos"
  return horas < 48 ? `${decimal.format(horas)} h` : `${decimal.format(horas / 24)} d`
}

export const formatPorcentaje = (parte: number, total: number) => (total > 0 ? `${Math.round((parte / total) * 100)} %` : "0 %")

export const formatDiaCorto = (iso: string) => diaMes.format(aFecha(iso))
export const formatDiaLargo = (iso: string) => diaMesAnio.format(aFecha(iso))

// Fecha "yyyy-mm-dd" corrida n días (negativo = hacia atrás)
export const moverDias = (iso: string, n: number) => {
  const fecha = aFecha(iso)
  fecha.setDate(fecha.getDate() + n)
  return diaISO(fecha)
}
