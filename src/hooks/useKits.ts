import { useQuery } from '@tanstack/react-query'
import { getKitsPredeterminados } from '@/services/kit.service'

export const useKits = () =>
  useQuery({
    queryKey: ['kits'],
    queryFn: getKitsPredeterminados,
  })
