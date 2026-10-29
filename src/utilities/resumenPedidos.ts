import type { EstadoPedido, PedidoDetalle } from "@/models/pedido.model"
import { diaISO } from "./date"

// Métricas del panel de administración, calculadas a partir de las solicitudes que ya devuelve
// GET /api/v1/pedidos (el admin las ve todas, más recientes primero). Funciones puras: sin fetch ni estado.

const DIAS_ACTIVIDAD = 14 // 7 de la semana actual + 7 de la anterior para comparar
const DIAS_HORARIO = 28 // el mapa de calor mira las últimas 4 semanas
const DIAS_COBROS = 7

// Franjas del mapa de calor (hora local de la solicitud); la última incluye la madrugada
export const FRANJAS = ["06–10", "10–14", "14–18", "18–06"] as const
const franjaDe = (hora: number) => (hora >= 6 && hora < 10 ? 0 : hora >= 10 && hora < 14 ? 1 : hora >= 14 && hora < 18 ? 2 : 3)

// Etapas de un pedido para medir su avance (cancelado queda fuera)
export const ETAPAS: Array<{ estados: EstadoPedido[]; label: string }> = [
  { estados: ["SOLICITADO"], label: "Solicitado" },
  { estados: ["COTIZADO"], label: "Cotizado" },
  { estados: ["CONFIRMADO", "EN_COMPRA", "LISTO"], label: "Confirmado" },
  { estados: ["PAGADO"], label: "Pagado" },
  { estados: ["ENTREGADO"], label: "Entregado" },
]
export const etapaDe = (estado: EstadoPedido) => ETAPAS.findIndex((e) => e.estados.includes(estado))

export interface ResumenPedidos {
  porDia: Array<{ fecha: string; solicitudes: number }> // el último es hoy
  // horario[día][franja], lunes primero
  horario: number[][]
  pico: { dia: number; franja: number; solicitudes: number } | null
  cobrosPorDia: Array<{ fecha: string; monto: number }> // GTQ por fecha de pago, el último es hoy
  cobrado: number // GTQ, solicitudes pagadas
  porCobrar: number // GTQ, confirmadas sin pago registrado
  porCotizar: number
  masAntiguaPorCotizar: PedidoDetalle | null
  pagosPorValidar: number
  porEntregar: number // aceptados que aún no se entregan
}

// El estudiante subió el comprobante y falta que el admin registre el pago
export const pagoPorValidar = (p: PedidoDetalle) => p.estado === "CONFIRMADO" && p.comprobante !== null

// Pill de pago de un pedido (ya aceptado)
export const estadoPago = (p: PedidoDetalle): { label: string; tone: "success" | "accent" | "neutral" } => {
  if (p.estado === "PAGADO" || p.estado === "ENTREGADO" || p.fechaPago) return { label: "Pagado", tone: "success" }
  if (p.comprobante) return { label: "Por validar", tone: "accent" }
  return { label: "Sin pagar", tone: "neutral" }
}

const suma = (pedidos: PedidoDetalle[]) => pedidos.reduce((total, p) => total + (p.total ?? 0), 0)

// Los últimos n días como "yyyy-mm-dd", el último es hoy
const ultimosDias = (ahora: Date, n: number) =>
  Array.from({ length: n }, (_, i) => diaISO(new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - (n - 1 - i))))

export const resumirPedidos = (pedidos: PedidoDetalle[], ahora = new Date()): ResumenPedidos => {
  const porFecha = new Map<string, number>()
  for (const p of pedidos) {
    const dia = diaISO(new Date(p.fechaSolicitud))
    porFecha.set(dia, (porFecha.get(dia) ?? 0) + 1)
  }

  const desdeHorario = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - (DIAS_HORARIO - 1))
  const horario = Array.from({ length: 7 }, () => FRANJAS.map(() => 0))
  for (const p of pedidos) {
    const fecha = new Date(p.fechaSolicitud)
    if (fecha < desdeHorario) continue
    horario[(fecha.getDay() + 6) % 7][franjaDe(fecha.getHours())]++
  }
  let pico: ResumenPedidos["pico"] = null
  horario.forEach((franjas, dia) =>
    franjas.forEach((solicitudes, franja) => {
      if (solicitudes > (pico?.solicitudes ?? 0)) pico = { dia, franja, solicitudes }
    }),
  )

  const cobros = new Map<string, number>()
  for (const p of pedidos) {
    if (!p.fechaPago || p.total === null) continue
    const dia = diaISO(new Date(p.fechaPago))
    cobros.set(dia, (cobros.get(dia) ?? 0) + p.total)
  }

  const porCotizar = pedidos.filter((p) => p.estado === "SOLICITADO")

  return {
    porDia: ultimosDias(ahora, DIAS_ACTIVIDAD).map((fecha) => ({ fecha, solicitudes: porFecha.get(fecha) ?? 0 })),
    horario,
    pico,
    cobrosPorDia: ultimosDias(ahora, DIAS_COBROS).map((fecha) => ({ fecha, monto: cobros.get(fecha) ?? 0 })),
    cobrado: suma(pedidos.filter((p) => p.estado === "PAGADO" || p.estado === "ENTREGADO")),
    porCobrar: suma(pedidos.filter((p) => p.estado === "CONFIRMADO")),
    porCotizar: porCotizar.length,
    // La lista viene de más reciente a más antigua: la última es la que lleva más tiempo esperando
    masAntiguaPorCotizar: porCotizar.at(-1) ?? null,
    pagosPorValidar: pedidos.filter(pagoPorValidar).length,
    porEntregar: pedidos.filter((p) => ["CONFIRMADO", "EN_COMPRA", "LISTO", "PAGADO"].includes(p.estado)).length,
  }
}
