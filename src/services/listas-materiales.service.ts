import { api } from './api'
import type { PedidoDetalle, SolicitudRequest } from '@/models/pedido.model'

export interface MaterialLista {
  nombre: string
  descripcion: string
  cantidad: number
  unidad: string
  observaciones: string | null
  referencia: string | null
}
export interface ResumenLista { id: string; nombre: string; creada: string }
export interface ListaMateriales extends ResumenLista { materiales: MaterialLista[]; solicitudId: string | null }
export type SolicitudListaRequest = Omit<SolicitudRequest, 'productos'>
const ruta = '/api/v1/listas-materiales'

export async function guardarLista(nombre: string, materiales: MaterialLista[]) {
  const { data } = await api.post<ListaMateriales>(ruta, { nombre, materiales, revisada: true })
  return data
}
export async function obtenerListas(pagina: number) {
  const { data } = await api.get<{ listas: ResumenLista[]; hayMas: boolean }>(ruta, { params: { pagina } })
  return data
}
export async function obtenerLista(id: string) {
  const { data } = await api.get<ListaMateriales>(`${ruta}/${id}`)
  return data
}

export async function solicitarCotizacionLista(id: string, solicitud: SolicitudListaRequest) {
  const { data } = await api.post<PedidoDetalle>(`${ruta}/${id}/solicitud`, solicitud)
  return data
}
