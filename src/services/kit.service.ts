import { api } from './api'
import type { Kit, KitWithArticulos, UpdateKitRequest } from '@/models/kit.model'

export const getKits = async (): Promise<Kit[]> => {
  const { data } = await api.get<Kit[]>('/kits')
  return data
}

export const getKitById = async (kitId: number): Promise<KitWithArticulos> => {
  const { data } = await api.get<KitWithArticulos>(`/kits/${kitId}`)
  return data
}

// Crea un kit personalizado a partir de un kit base (kit.kitId = id del kit base)
export const personalizarKit = async (kit: UpdateKitRequest): Promise<KitWithArticulos> => {
  const { data } = await api.put<KitWithArticulos>('/kits', kit)
  return data
}

// Actualiza en el lugar un kit que ya existe (base o personalizado)
export const editarKit = async (kitId: number, kit: UpdateKitRequest): Promise<KitWithArticulos> => {
  const { data } = await api.put<KitWithArticulos>(`/kits/${kitId}`, kit)
  return data
}

export const getKitsPersonalizados = async (): Promise<KitWithArticulos[]> => {
  const { data } = await api.get<KitWithArticulos[]>('/kits/personalizados')
  if (!Array.isArray(data)) {
    throw new Error('La respuesta de GET /kits/personalizados no es un arreglo')
  }
  return data
}

export const getKitsPredeterminados = async (): Promise<Kit[]> => {
  const { data } = await api.get<Kit[]>('/kits/base')
  return data
}
