// Datos de ejemplo del seguimiento de pedidos — reemplazar por la API cuando esté lista.

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
  kitName: string
  course: string
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

export const customer = {
  name: "María Fernanda Castillo",
  carnet: "23145",
  email: "cas23145@uvg.edu.gt",
}

export const courier = { name: "José López", initials: "JL", vehicle: "Moto · P-482 KLM" }

export const routeAlerts: Array<{ label: string; tone: AlertTone; icon: "rain" | "traffic" | "works" }> = [
  { label: "Llovizna", tone: "info", icon: "rain" },
  { label: "Tráfico puente", tone: "warning", icon: "traffic" },
  { label: "Obra 18 av.", tone: "accent", icon: "works" },
]

export const orders: Order[] = [
  {
    id: "02486",
    number: "UVG-02486",
    kitName: "Kit de Laboratorio de Química",
    course: "Química I",
    status: "en-ruta",
    recommended: true,
    thisSemester: true,
    origin: warehouse.name,
    destination: "Edificio A",
    destinationCoords: [-90.4905, 14.601],
    requestedAt: "Ayer, 5:50 pm",
    deliveryAt: "Hoy, 10:55 am",
    distanceKm: 1.1,
    etaMin: 6,
    shipping: 15,
    total: 1500,
    paid: 750,
    paymentStatus: "pendiente",
    issuedAt: "25 sep 2026",
    dueAt: "26 sep 2026",
    timeline: [
      { phase: "solicitado", time: "Ayer 5:50 pm", location: "Portal UVGO", action: "Pedido creado", detail: "12 artículos" },
      { phase: "cotizado", time: "Ayer 6:20 pm", location: "—", action: "Cotización enviada", detail: "Q 1,500.00" },
      { phase: "confirmado", time: "9:15 am", location: "Bodega UVGO", action: "Pedido armado", detail: "Anticipo 50 %" },
      { phase: "en-ruta", time: "10:42 am", location: "Cruzando el puente", action: "Camino a Edificio A", detail: "José López · moto" },
      { phase: "entregado", time: "—", location: "Edificio A", action: "Pendiente", detail: "Est. 10:55 am" },
    ],
  },
  {
    id: "02491",
    number: "UVG-02491",
    kitName: "Kit de Robótica Básica",
    course: "Ingeniería",
    status: "cotizado",
    recommended: true,
    thisSemester: true,
    origin: warehouse.name,
    destination: "Edificio C",
    destinationCoords: [-90.493, 14.6045],
    requestedAt: "24 sep, 3:10 pm",
    deliveryAt: "29 sep, 9:00 am",
    distanceKm: 1.4,
    etaMin: 7,
    shipping: 15,
    total: 2150,
    paid: 0,
    paymentStatus: "pendiente",
    issuedAt: "25 sep 2026",
    dueAt: "28 sep 2026",
    timeline: [
      { phase: "solicitado", time: "24 sep 3:10 pm", location: "Portal UVGO", action: "Pedido creado", detail: "8 artículos" },
      { phase: "cotizado", time: "25 sep 11:05 am", location: "—", action: "Cotización enviada", detail: "Q 2,150.00" },
      { phase: "confirmado", time: "—", location: "Bodega UVGO", action: "Esperando confirmación", detail: "Requiere anticipo" },
      { phase: "en-ruta", time: "—", location: "—", action: "—", detail: "—" },
      { phase: "entregado", time: "—", location: "Edificio C", action: "—", detail: "Est. 29 sep" },
    ],
  },
  {
    id: "02503",
    number: "UVG-02503",
    kitName: "Kit de Dibujo Técnico",
    course: "Arquitectura",
    status: "solicitado",
    recommended: false,
    thisSemester: true,
    origin: warehouse.name,
    destination: "Edificio F",
    destinationCoords: [-90.485, 14.602],
    requestedAt: "Hoy, 8:30 am",
    deliveryAt: "Por definir",
    distanceKm: 1.0,
    etaMin: 5,
    shipping: 15,
    total: 640,
    paid: 0,
    paymentStatus: "pendiente",
    issuedAt: "26 sep 2026",
    dueAt: "30 sep 2026",
    timeline: [
      { phase: "solicitado", time: "Hoy 8:30 am", location: "Portal UVGO", action: "Pedido creado", detail: "6 artículos" },
      { phase: "cotizado", time: "—", location: "—", action: "En revisión", detail: "Resp. < 24 h" },
      { phase: "confirmado", time: "—", location: "—", action: "—", detail: "—" },
      { phase: "en-ruta", time: "—", location: "—", action: "—", detail: "—" },
      { phase: "entregado", time: "—", location: "Edificio F", action: "—", detail: "—" },
    ],
  },
  {
    id: "02455",
    number: "UVG-02455",
    kitName: "Kit de Electrónica",
    course: "Física II",
    status: "entregado",
    recommended: false,
    thisSemester: true,
    origin: warehouse.name,
    destination: "Edificio K",
    destinationCoords: [-90.486, 14.605],
    requestedAt: "12 sep, 4:00 pm",
    deliveryAt: "15 sep, 10:20 am",
    distanceKm: 0.6,
    etaMin: 3,
    shipping: 15,
    total: 980,
    paid: 980,
    paymentStatus: "pagado",
    issuedAt: "13 sep 2026",
    dueAt: "15 sep 2026",
    timeline: [
      { phase: "solicitado", time: "12 sep 4:00 pm", location: "Portal UVGO", action: "Pedido creado", detail: "10 artículos" },
      { phase: "cotizado", time: "12 sep 5:15 pm", location: "—", action: "Cotización enviada", detail: "Q 980.00" },
      { phase: "confirmado", time: "13 sep 9:40 am", location: "Bodega UVGO", action: "Pedido armado", detail: "Pago completo" },
      { phase: "en-ruta", time: "15 sep 10:08 am", location: "Bodega UVGO", action: "Salida a ruta", detail: "José López · moto" },
      { phase: "entregado", time: "15 sep 10:20 am", location: "Edificio K", action: "Entregado", detail: "Recibió M. Castillo" },
    ],
  },
  {
    id: "02310",
    number: "UVG-02310",
    kitName: "Kit de Biología Celular",
    course: "Biología",
    status: "entregado",
    recommended: false,
    thisSemester: false,
    origin: warehouse.name,
    destination: "Edificio J",
    destinationCoords: [-90.4893, 14.604],
    requestedAt: "10 jun, 2:30 pm",
    deliveryAt: "13 jun, 11:00 am",
    distanceKm: 0.9,
    etaMin: 4,
    shipping: 15,
    total: 720,
    paid: 720,
    paymentStatus: "pagado",
    issuedAt: "11 jun 2026",
    dueAt: "13 jun 2026",
    timeline: [
      { phase: "solicitado", time: "10 jun 2:30 pm", location: "Portal UVGO", action: "Pedido creado", detail: "7 artículos" },
      { phase: "cotizado", time: "10 jun 4:00 pm", location: "—", action: "Cotización enviada", detail: "Q 720.00" },
      { phase: "confirmado", time: "11 jun 8:50 am", location: "Bodega UVGO", action: "Pedido armado", detail: "Pago completo" },
      { phase: "en-ruta", time: "13 jun 10:45 am", location: "Bodega UVGO", action: "Salida a ruta", detail: "José López · moto" },
      { phase: "entregado", time: "13 jun 11:00 am", location: "Edificio J", action: "Entregado", detail: "Recibió M. Castillo" },
    ],
  },
]

export const phaseIndex = (status: OrderStatus) => phases.findIndex((phase) => phase.id === status)

/** Fracción de la ruta recorrida según la fase del pedido */
export const routeProgress = (status: OrderStatus) => (status === "entregado" ? 1 : status === "en-ruta" ? 0.62 : 0)

export const formatQ = (value: number) => `Q ${value.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`

/** Acción principal de la tarjeta de pedido */
export const orderAction = (status: OrderStatus) =>
  status === "cotizado" ? "Confirmar" : status === "en-ruta" ? "Ver ruta" : status === "entregado" ? "Ver detalle" : "Ver pedido"
