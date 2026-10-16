// 145, "GTQ" → "Q145.00"; si la moneda no es válida se usa quetzales
export const formatPrecio = (value: number, moneda?: string | null) => {
  try {
    return new Intl.NumberFormat("es-GT", { style: "currency", currency: moneda || "GTQ" }).format(value)
  } catch {
    return new Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ" }).format(value)
  }
}
