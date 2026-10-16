import { api } from './api'
import { z } from 'zod'

const materialSchema = z.object({
  nombre: z.string().min(1).max(120),
  descripcion: z.string().max(400).nullable(),
  cantidad: z.number().nullable(),
  unidad: z.string().max(60).nullable(),
  observaciones: z.string().max(1200).nullable(),
  referencia: z.string().max(500),
  advertencias: z.array(z.string()),
})
const resultadoSchema = z.object({ materiales: z.array(materialSchema).max(50), mensaje: z.string() })
export type MaterialExtraido = z.infer<typeof materialSchema>

export async function extraerMateriales(archivo: File) {
  const form = new FormData()
  form.append('archivo', archivo)
  // Una sola llamada por acción. El navegador genera el delimitador multipart.
  const { data } = await api.post('/extracciones/materiales', form, { timeout: 90000 })
  return resultadoSchema.parse(data)
}
