import { useQuery } from '@tanstack/react-query'
import { getKitsPersonalizados } from '@/services/kit.service'

export const useKitsPersonalizados = () =>
  useQuery({
    queryKey: ['kits', 'personalizados'],
    queryFn: getKitsPersonalizados,
  })
