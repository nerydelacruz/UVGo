// Tipos y utilidades del seguimiento de pedidos. Los pedidos vienen de la API (ver adapter.ts).

export type OrderStatus = "solicitado" | "cotizado" | "confirmado" | "en-ruta" | "entregado"
export type PaymentStatus = "pagado" | "pendiente" | "vencido"
export type AlertTone = "info" | "warning" | "accent"
export type LngLat = [number, number]

export interface TimelineEntry {
  phase: OrderStatus
  time: string
  location: string
  action: string
  detail: string
}

export interface Order {
  id: string
  number: string
  kitName: string // título del pedido (el curso de la solicitud)
  course: string // etiqueta corta (cantidad de productos)
  cliente: string
  tieneComprobante: boolean
  status: OrderStatus
  recommended: boolean
  thisSemester: boolean
  origin: string
  destination: string
  destinationCoords: LngLat
  requestedAt: string
  deliveryAt: string
  distanceKm: number
  etaMin: number
  shipping: number
  total: number
  paid: number
  paymentStatus: PaymentStatus
  issuedAt: string
  dueAt: string
  timeline: TimelineEntry[]
  items: OrderItem[]
  dueDate: string // yyyy-mm-dd, para la cuenta regresiva
  comprobanteEnviado: string | null // cuándo subió el estudiante el comprobante
  pagadoEl: string | null // cuándo validó el pago el administrador
}

export interface OrderItem {
  id: string
  descripcion: string
  cantidad: number
  subtotal: number | null
}

export const phases: Array<{ id: OrderStatus; label: string }> = [
  { id: "solicitado", label: "Solicitado" },
  { id: "cotizado", label: "Cotizado" },
  { id: "confirmado", label: "Confirmado" },
  { id: "en-ruta", label: "En ruta" },
  { id: "entregado", label: "Entregado" },
]

export const statusLabel: Record<OrderStatus, string> = Object.fromEntries(
  phases.map((phase) => [phase.id, phase.label]),
) as Record<OrderStatus, string>

export const paymentLabel: Record<PaymentStatus, string> = {
  pagado: "Pagado",
  pendiente: "Pendiente",
  vencido: "Vencido",
}

export const warehouse = { name: "Bodega UVGO", coords: [-90.488, 14.6075] as LngLat }

// Puntos de entrega conocidos del campus (para dibujar la ruta). Si el estudiante escribe otro,
// se usa el centro del campus.
export const puntosCampus: Record<string, LngLat> = {
  "edificio a": [-90.4905, 14.601],
  "edificio c": [-90.493, 14.6045],
  "edificio f": [-90.485, 14.602],
  "edificio j": [-90.4893, 14.604],
  "edificio k": [-90.486, 14.605],
}
export const centroCampus: LngLat = [-90.4893, 14.604]

/** Fracción de la ruta recorrida según la fase del pedido */
export const phaseIndex = (status: OrderStatus) => phases.findIndex((phase) => phase.id === status)

export const routeProgress = (status: OrderStatus) => (status === "entregado" ? 1 : status === "en-ruta" ? 0.62 : 0)

export const formatQ = (value: number) => `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`

/** Acción principal de la tarjeta de pedido */
export const orderAction = (order: Order) =>
  order.paymentStatus === "pendiente" && order.status === "confirmado"
    ? "Pagar"
    : order.status === "entregado"
        ? "Ver detalle"
        : "Ver pedido"
