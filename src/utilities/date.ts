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
