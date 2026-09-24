import { useQuery } from '@tanstack/react-query'
import { getKits } from '@/services/kit.service'

export const useKits = () =>
  useQuery({
    queryKey: ['kits'],
    queryFn: getKits,
  })
