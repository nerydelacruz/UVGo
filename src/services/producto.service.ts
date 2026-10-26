import { api } from './api'
import type { Producto, ProductoExterno } from '@/models/producto.model'

export const getProductos = async (params: { q?: string; tamano?: number }): Promise<Producto[]> => {
  const { data } = await api.get<Producto[]>('/articulos', { params })
  return data
}

// El backend consulta Google Shopping (SerpApi); la API key vive en el backend
export const buscarProductosExternos = async (q: string): Promise<ProductoExterno[]> => {
  const { data } = await api.get<ProductoExterno[]>('/busqueda-externa', { params: { q } })
  return data
}

// Agrega un artículo al catálogo; el backend asigna el id
export type NuevoProducto = Omit<Producto, 'id'>

export const crearProducto = async (producto: NuevoProducto): Promise<Producto> => {
  const { data } = await api.post<Producto>('/articulos', producto)
  return data
}
