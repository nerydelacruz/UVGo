// Categorías que se pueden cotizar; la llave es el segmento de la URL (/cotizar/:categoria)
export const CATEGORIAS = {
  electronica: "Electrónica",
  mecatronica: "Mecatrónica",
  quimica: "Química",
  mecanica: "Mecánica",
} as const

export type Categoria = keyof typeof CATEGORIAS

export const isCategoria = (value?: string): value is Categoria =>
  !!value && Object.hasOwn(CATEGORIAS, value)
