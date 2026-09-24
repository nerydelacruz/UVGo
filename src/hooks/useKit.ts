import { useQuery } from '@tanstack/react-query'
import { getKitById } from '@/services/kit.service'

export const useKit = (kitId: number) =>
  useQuery({
    queryKey: ['kits', kitId],
    queryFn: () => getKitById(kitId),
    enabled: !Number.isNaN(kitId),
  })
