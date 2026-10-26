import { api } from './api'

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
