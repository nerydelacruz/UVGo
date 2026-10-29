const fechaCorta = new Intl.DateTimeFormat("es-GT", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
})

// "2026-10-16T09:12:00-06:00" → "16 oct, 9:12 a. m."
export const formatFecha = (iso: string) => fechaCorta.format(new Date(iso))

// Fecha local de hoy como "yyyy-mm-dd" (para <input type="date"> y LocalDate del backend)
export const hoyISO = () => {
  const hoy = new Date()
  const mm = String(hoy.getMonth() + 1).padStart(2, "0")
  const dd = String(hoy.getDate()).padStart(2, "0")
  return `${hoy.getFullYear()}-${mm}-${dd}`
}

const diaCorto = new Intl.DateTimeFormat("es-GT", { day: "numeric", month: "short", year: "numeric" })

// Fecha sin hora del backend (LocalDate "2026-10-30") → "30 oct 2026".
// Se arma en hora local: new Date("2026-10-30") la tomaría en UTC y mostraría el día anterior.
export const formatDia = (fecha: string) => {
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return diaCorto.format(new Date(anio, mes - 1, dia))
}

// Instante del backend ("2026-10-16T16:00:00Z") → día en hora local, "16 oct 2026"
export const formatDiaInstante = (iso: string) => diaCorto.format(new Date(iso))

// Formato numérico del panel de administración: dd/mm/aaaa y hora de 24 h
const diaNumerico = new Intl.DateTimeFormat("es-GT", { day: "2-digit", month: "2-digit", year: "numeric" })
const fechaHora24 = new Intl.DateTimeFormat("es-GT", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

// Fecha sin hora del backend ("2026-10-30") → "30/10/2026", en hora local como formatDia
export const formatDiaNumerico = (fecha: string) => {
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return diaNumerico.format(new Date(anio, mes - 1, dia))
}

// Instante del backend → "16/10/2026, 14:05"
export const formatFechaHora = (iso: string) => fechaHora24.format(new Date(iso))

// Día local de una fecha como "yyyy-mm-dd" (misma forma que LocalDate del backend)
export const diaISO = (fecha: Date) => {
  const mm = String(fecha.getMonth() + 1).padStart(2, "0")
  const dd = String(fecha.getDate()).padStart(2, "0")
  return `${fecha.getFullYear()}-${mm}-${dd}`
}

// Días de "desde" a "hasta", ambas "yyyy-mm-dd" (0 = mismo día, negativo = ya pasó)
export const diasEntre = (desde: string, hasta: string) => {
  const [a1, m1, d1] = desde.split("-").map(Number)
  const [a2, m2, d2] = hasta.split("-").map(Number)
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86_400_000)
}

// Tiempo transcurrido desde un instante, compacto: "2 d 4 h", "3 h 12 min", "8 min"
export const tiempoDesde = (iso: string, ahora = new Date()) => {
  const minutos = Math.max(0, Math.floor((ahora.getTime() - new Date(iso).getTime()) / 60_000))
  const dias = Math.floor(minutos / 1440)
  const horas = Math.floor((minutos % 1440) / 60)
  if (dias > 0) return `${dias} d ${horas} h`
  if (horas > 0) return `${horas} h ${minutos % 60} min`
  return `${minutos} min`
}
