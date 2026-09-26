import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editarKit, personalizarKit } from '@/services/kit.service'
import type { KitWithArticulos, UpdateKitRequest } from '@/models/kit.model'

// kit.kitBaseId !== null: ya es una copia personalizada -> se edita en el lugar (PUT /kits/{kitId}).
// kit.kitBaseId === null: es un kit base -> guardar crea una copia personalizada nueva (PUT /kits).
export const useSaveKit = (kit: KitWithArticulos) => {
  const queryClient = useQueryClient()
  const yaEsPersonalizado = kit.kitBaseId !== null

  return useMutation({
    mutationFn: (payload: UpdateKitRequest) =>
      yaEsPersonalizado ? editarKit(kit.kitId, payload) : personalizarKit(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['kits'] }),
  })
}
