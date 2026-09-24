import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateKit } from '@/services/kit.service'

export const useUpdateKit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateKit,
    // invalida la lista y los detalles para que se vean los artículos guardados
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kits'] }),
  })
}
