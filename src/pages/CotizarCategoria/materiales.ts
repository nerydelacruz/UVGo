import type { ProductoExtraido } from "@/services/extraccion.service"

// Productos importados desde un PDF y revisados por el estudiante. El backend no tiene un tipo de
// producto sin url, así que la lista viaja como texto en las observaciones de la solicitud.
export type MaterialImportado = ProductoExtraido

const enUnaLinea = (texto: string) => texto.replace(/\s+/g, " ").trim()

export const materialesATexto = (materiales: MaterialImportado[]) =>
  materiales.length === 0
    ? ""
    : ["Materiales importados desde PDF:", ...materiales.map((m) => `- ${enUnaLinea(m.nombre)} × ${m.cantidad}`)].join("\n")
