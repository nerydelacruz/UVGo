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
  const { data } = await api.post('/api/v1/extracciones/materiales', form, { timeout: 90000 })
  return resultadoSchema.parse(data)
}

// Producto que Claude encontró en el PDF (mismo contrato que ProductosExtraidos del backend)
export interface ProductoExtraido {
  nombre: string
  cantidad: number
  // Claude los sugiere para encontrar el producto en el stock; pueden venir vacíos
  codigo?: string
  termino?: string
}

// El backend saca el texto del PDF y se lo pasa a Claude; puede tardar, por eso el timeout largo
export const extraerProductos = async (archivo: File): Promise<ProductoExtraido[]> => {
  const form = new FormData()
  form.append('archivo', archivo)
  const { data } = await api.post<{ productos: ProductoExtraido[] }>('/api/v1/extracciones/productos', form, {
    timeout: 90000,
  })
  return data.productos
}
