import type { EstadoPedido } from "@/models/pedido.model"

// Color del badge de cada estado: lo que espera acción del admin resalta en coral
export const tonoEstado = (estado: EstadoPedido): "neutral" | "accent" | "success" | "danger" => {
  if (estado === "SOLICITADO") return "accent"
  if (estado === "CANCELADO") return "danger"
  if (estado === "COTIZADO") return "neutral"
  return "success"
}

// Filtros de la lista; undefined = todas
export const FILTROS: Array<{ label: string; estado?: EstadoPedido }> = [
  { label: "Por cotizar", estado: "SOLICITADO" },
  { label: "Cotizadas", estado: "COTIZADO" },
  { label: "Por validar pago", estado: "CONFIRMADO" },
  { label: "Pagadas", estado: "PAGADO" },
  { label: "Todas" },
]
