import { api } from './api'
import type { CotizacionRequest, EstadoPedido, Pagina, PedidoDetalle, SolicitudRequest } from '@/models/pedido.model'

// El estudiante pide una cotización; el backend guarda una copia de cada producto
export const crearSolicitud = async (solicitud: SolicitudRequest): Promise<PedidoDetalle> => {
  const { data } = await api.post<PedidoDetalle>('/api/v1/pedidos', solicitud)
  return data
}

// El admin ve todas las solicitudes; el estudiante, solo las suyas
export const listarPedidos = async (params: { estado?: EstadoPedido; pagina?: number; tamanio?: number }) => {
  const { data } = await api.get<Pagina<PedidoDetalle>>('/api/v1/pedidos', { params })
  return data
}

export const cotizarPedido = async (pedidoId: string, cotizacion: CotizacionRequest): Promise<PedidoDetalle> => {
  const { data } = await api.post<PedidoDetalle>(`/api/v1/pedidos/${pedidoId}/cotizacion`, cotizacion)
  return data
}

// El backend avisa al estudiante por correo
export const cancelarPedido = async (pedidoId: string, version: number): Promise<PedidoDetalle> => {
  const { data } = await api.post<PedidoDetalle>(`/api/v1/pedidos/${pedidoId}/cancelacion`, { version })
  return data
}

// Sube o reemplaza el comprobante (PDF, PNG o JPG, máx. 5 MB). Solo con el pedido CONFIRMADO.
export const subirComprobante = async (pedidoId: string, version: number, archivo: File): Promise<PedidoDetalle> => {
  const form = new FormData()
  form.append('version', String(version))
  form.append('archivo', archivo)
  const { data } = await api.put<PedidoDetalle>(`/api/v1/pedidos/${pedidoId}/comprobante`, form)
  return data
}

// El archivo del comprobante (lo ven el estudiante dueño y el admin). Requiere el token,
// por eso se descarga como Blob en vez de usar la URL directo en un <img>.
export const obtenerComprobante = async (pedidoId: string): Promise<Blob> => {
  const { data } = await api.get<Blob>(`/api/v1/pedidos/${pedidoId}/comprobante`, { responseType: 'blob' })
  return data
}

// El admin revisó el comprobante: el pedido pasa a PAGADO y el estudiante recibe un correo
export const registrarPago = async (pedidoId: string, version: number): Promise<PedidoDetalle> => {
  const { data } = await api.post<PedidoDetalle>(`/api/v1/pedidos/${pedidoId}/pago`, { version })
  return data
}

// El estudiante acepta la cotización: la solicitud pasa a CONFIRMADO (ya es un pedido)
export const aceptarPedido = async (pedidoId: string, version: number): Promise<PedidoDetalle> => {
  const { data } = await api.post<PedidoDetalle>(`/api/v1/pedidos/${pedidoId}/aceptacion`, { version })
  return data
}
