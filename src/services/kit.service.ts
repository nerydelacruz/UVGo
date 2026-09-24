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

export const updateKit = async (kit: UpdateKitRequest): Promise<KitWithArticulos> => {
  const { data } = await api.put<KitWithArticulos>('/kits', kit)
  return data
}
