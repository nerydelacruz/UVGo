export interface Articulo {
  id: number
  kitId: number
  nombre: string
  descripcion: string
  cantidad: number
  categoria: string
  fechaCreacion: string
  observacionesCotizacion: string
}

// Artículo que se agrega desde el front: el backend asigna id, kitId y fechaCreacion
export type NuevoArticulo = Omit<Articulo, 'id' | 'kitId' | 'fechaCreacion'>
