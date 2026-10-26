// Solicitudes de cotización / pedidos (/api/v1/pedidos). Mismo contrato que PedidoDtos del backend.

export type EstadoPedido =
  | "SOLICITADO"
  | "COTIZADO"
  | "CONFIRMADO"
  | "EN_COMPRA"
  | "LISTO"
  | "ENTREGADO"
  | "PAGADO"
  | "CANCELADO"

// Producto encontrado en la web; precio y moneda son solo de referencia
export interface ProductoWeb {
  titulo: string
  url: string
  imagen: string | null
  tienda: string | null
  precio: number | null
  moneda: string | null
}

// Cada producto viene del catálogo (articuloId) o de la web (web), nunca de ambos
export type ProductoSolicitud = { articuloId: number; cantidad: number } | { web: ProductoWeb; cantidad: number }

export interface SolicitudRequest {
  curso: string
  nombreCatedratico: string
  fechaLimite: string // yyyy-mm-dd, hoy o después
  observaciones?: string
  puntoEntregaPreferido?: string
  productos: ProductoSolicitud[]
}

export interface ItemPedido {
  id: string
  tipo: "CATALOGO" | "WEB"
  articuloId: number | null
  descripcion: string
  cantidad: number
  url: string | null
  imagen: string | null
  tienda: string | null
  precioReferencia: number | null
  monedaReferencia: string | null
  precioUnitario: number | null
  subtotal: number | null
}

// Comprobante de pago guardado en Azure Blob Storage (el archivo se pide aparte: GET /{id}/comprobante)
export interface Comprobante {
  nombre: string
  tipo: string // mime: image/png, image/jpeg o application/pdf
  tamano: number
  fecha: string
}

// Los campos de cotización son null mientras la solicitud no se haya cotizado
export interface PedidoDetalle {
  id: string
  version: number
  estudianteId: string
  curso: string
  nombreCatedratico: string
  fechaLimite: string
  fechaSolicitud: string
  estado: EstadoPedido
  observaciones: string | null
  puntoEntregaPreferido: string | null
  productos: ItemPedido[]
  monedaCotizacion: string | null
  cargoServicio: number | null
  total: number | null
  notasCotizacion: string | null
  fechaCotizacion: string | null
  fechaConfirmacion: string | null
  comprobante: Comprobante | null
  fechaPago: string | null
}

// Límites del backend
export const CANTIDAD_MIN = 1
export const CANTIDAD_MAX = 999
export const PRODUCTOS_MAX = 100

export interface Pagina<T> {
  contenido: T[]
  pagina: number
  tamanio: number
  totalElementos: number
  totalPaginas: number
}

// El admin pone precio a cada producto (en GTQ), más un cargo por servicio
export interface CotizacionRequest {
  version: number
  precios: Array<{ itemId: string; precioUnitario: number }>
  cargoServicio: number
  notas?: string
}

export const ESTADOS: Record<EstadoPedido, string> = {
  SOLICITADO: "Por cotizar",
  COTIZADO: "Cotizada",
  CONFIRMADO: "Confirmada",
  EN_COMPRA: "En compra",
  LISTO: "Lista",
  ENTREGADO: "Entregada",
  PAGADO: "Pagada",
  CANCELADO: "Cancelada",
}

// Confirmado y sin pago validado: el estudiante puede subir o reemplazar el comprobante
export const esperaComprobante = (pedido: PedidoDetalle) => pedido.estado === "CONFIRMADO"

// Mientras el estudiante no acepte, el admin puede cotizar o corregir la cotización
export const esCotizable = (estado: EstadoPedido) => estado === "SOLICITADO" || estado === "COTIZADO"
