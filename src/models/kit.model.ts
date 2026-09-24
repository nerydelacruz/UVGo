import type { Articulo, NuevoArticulo } from './articulo.model'

export interface Kit {
  kitId: number
  name: string
  description: string
  course: string
  price: number
  active: boolean
}

// Respuesta de GET /kits/{kitId}: el kit con sus artículos
export interface KitWithArticulos extends Kit {
  articulos: Articulo[]
  estado: string
  kitBaseId: number | null
}

// Body de PUT /kits: el kit con la lista completa de artículos (existentes + nuevos)
export interface UpdateKitRequest extends Pick<Kit, 'kitId' | 'name' | 'description' | 'course' | 'price'> {
  articulos: NuevoArticulo[]
}
