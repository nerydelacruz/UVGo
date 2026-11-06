import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { asignarPiloto, listarPilotos, quitarPiloto } from '@/services/pedido.service'

export const usePilotos = () => useQuery({ queryKey: ['pilotos'], queryFn: listarPilotos })

export const useAsignarPiloto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pedidoId, version, pilotoId }: { pedidoId: string; version: number; pilotoId: string }) =>
      asignarPiloto(pedidoId, version, pilotoId),
    // También si falla: un 409 significa que el pedido cambió y hay que traer la versión nueva
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}

export const useQuitarPiloto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pedidoId, version }: { pedidoId: string; version: number }) => quitarPiloto(pedidoId, version),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}
