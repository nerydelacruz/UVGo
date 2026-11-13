import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PeriodoReporte } from '@/models/reporte.model'
import { obtenerReporte } from '@/services/reporte.service'

// Al cambiar de periodo se mantiene el reporte anterior en pantalla hasta que llega el nuevo
export const useReporte = (periodo: PeriodoReporte) =>
  useQuery({
    queryKey: ['reporte', periodo.desde, periodo.hasta],
    queryFn: () => obtenerReporte(periodo),
    placeholderData: keepPreviousData,
  })
