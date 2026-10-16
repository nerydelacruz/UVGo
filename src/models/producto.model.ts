// Artículo del catálogo de UVGo (GET /articulos). Muchos vienen importados de Bright Data,
// por eso varios campos pueden venir vacíos.
export interface Producto {
  id: number
  nombre: string
  descripcion: string
  categoria: string | null
  imagen: string | null
  precio: number | null
  moneda: string | null
  tienda: string | null
  url: string | null
  idExterno: string | null
}

// Resultado de la búsqueda externa (GET /busqueda-externa, Google Shopping). Sirve como referencia
// de lo que el usuario necesita; UVGo se encarga de conseguirlo. url es la ficha del producto.
export interface ProductoExterno {
  titulo: string
  imagen: string | null
  descripcion: string
  url: string | null
  tienda: string | null
  precio: number | null // solo de referencia, no se muestra al usuario
  moneda: string | null
}

// La url identifica cada resultado; sin ella (caso raro) se usa título + imagen
export const claveExterno = (producto: ProductoExterno) => producto.url ?? `${producto.titulo}|${producto.imagen ?? ""}`
