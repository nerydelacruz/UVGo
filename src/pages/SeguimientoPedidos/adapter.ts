import type { EstadoPedido, PedidoDetalle } from "@/models/pedido.model"
import { formatDia, formatDiaInstante, formatFecha } from "@/utilities/date"
import { centroCampus, formatQ, puntosCampus, warehouse, type LngLat, type Order, type OrderStatus, type TimelineEntry } from "./data"

// Una solicitud se vuelve pedido cuando el estudiante acepta la cotización (CONFIRMADO en adelante).
// Las anteriores (por cotizar, cotizadas) y las canceladas se ven en "Mis solicitudes".
const ESTADOS_PEDIDO: EstadoPedido[] = ["CONFIRMADO", "PAGADO", "EN_COMPRA", "LISTO", "ENTREGADO"]
export const esPedido = (pedido: PedidoDetalle) => ESTADOS_PEDIDO.includes(pedido.estado)

// El backend todavía no registra la ruta (en ruta / repartidor): hasta entregado, el pedido está "confirmado"
const fase = (estado: EstadoPedido): OrderStatus => (estado === "ENTREGADO" ? "entregado" : "confirmado")

const destinoCoords = (destino: string): LngLat => puntosCampus[destino.trim().toLowerCase()] ?? centroCampus

// Distancia en línea recta × 1.3 (las calles no van rectas); el mapa la reemplaza por la real si hay token de Mapbox
const distanciaKm = ([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) => {
  const rad = (g: number) => (g * Math.PI) / 180
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.3
}
// Moto en el campus, ~15 km/h, más unos minutos para entregar
const minutosEstimados = (km: number) => Math.max(5, Math.round((km / 15) * 60) + 3)

// Semestres UVG: enero–junio y julio–diciembre
const semestre = (fecha: Date) => `${fecha.getFullYear()}-${fecha.getMonth() < 6 ? 1 : 2}`

const hora = (iso: string | null) => (iso ? formatFecha(iso) : "—")

const lineaDeTiempo = (p: PedidoDetalle): TimelineEntry[] => {
  const entradas: TimelineEntry[] = [
    {
      phase: "solicitado",
      time: hora(p.fechaSolicitud),
      location: "Portal UVGo",
      action: "Solicitud creada",
      detail: `${p.productos.length} ${p.productos.length === 1 ? "producto" : "productos"}`,
    },
  ]
  if (p.fechaCotizacion)
    entradas.push({
      phase: "cotizado",
      time: hora(p.fechaCotizacion),
      location: "—",
      action: "Cotización enviada",
      detail: p.total !== null ? formatQ(p.total) : "—",
    })
  if (p.fechaConfirmacion)
    entradas.push({
      phase: "confirmado",
      time: hora(p.fechaConfirmacion),
      location: warehouse.name,
      action: p.fechaPago ? "Pago validado" : "Cotización aceptada",
      detail: p.fechaPago
        ? `Pagado el ${formatFecha(p.fechaPago)}`
        : p.comprobante
          ? "Comprobante en revisión"
          : "Falta el comprobante",
    })
  return entradas
}

export const pedidoToOrder = (p: PedidoDetalle, cliente: string, masReciente: boolean): Order => {
  const destino = p.puntoEntregaPreferido?.trim() || "Por definir"
  const coords = destinoCoords(destino)
  const km = distanciaKm(warehouse.coords, coords)
  const total = p.total ?? 0
  const pagado = p.fechaPago !== null

  return {
    id: p.id,
    number: `UVG-${p.id.slice(0, 8).toUpperCase()}`,
    kitName: p.curso,
    course: `${p.productos.length} ${p.productos.length === 1 ? "producto" : "productos"}`,
    cliente,
    tieneComprobante: p.comprobante !== null,
    status: fase(p.estado),
    recommended: masReciente && p.estado !== "ENTREGADO",
    thisSemester: semestre(new Date(p.fechaSolicitud)) === semestre(new Date()),
    origin: warehouse.name,
    destination: destino,
    destinationCoords: coords,
    requestedAt: formatFecha(p.fechaSolicitud),
    deliveryAt: `Para el ${formatDia(p.fechaLimite)}`,
    distanceKm: km,
    etaMin: minutosEstimados(km),
    shipping: p.cargoServicio ?? 0,
    total,
    paid: pagado ? total : 0,
    paymentStatus: pagado ? "pagado" : "pendiente",
    issuedAt: p.fechaCotizacion ? formatDiaInstante(p.fechaCotizacion) : "—",
    dueAt: formatDia(p.fechaLimite),
    timeline: lineaDeTiempo(p),
    items: p.productos.map((item) => ({ id: item.id, descripcion: item.descripcion, cantidad: item.cantidad, subtotal: item.subtotal })),
    dueDate: p.fechaLimite,
    comprobanteEnviado: p.comprobante ? formatFecha(p.comprobante.fecha) : null,
    pagadoEl: p.fechaPago ? formatFecha(p.fechaPago) : null,
  }
}
