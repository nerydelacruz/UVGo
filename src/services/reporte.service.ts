import type { PeriodoReporte, Reporte } from '@/models/reporte.model'
import { api } from './api'

// Solo administradores. Ambas fechas incluidas; el backend limita el periodo a 366 días.
export const obtenerReporte = async ({ desde, hasta }: PeriodoReporte): Promise<Reporte> => {
  const { data } = await api.get<Reporte>('/api/v1/reportes', { params: { desde, hasta } })
  return data
}
