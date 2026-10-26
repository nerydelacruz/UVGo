import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CotizacionRequest, EstadoPedido, PedidoDetalle, SolicitudRequest } from '@/models/pedido.model'
import {
  aceptarPedido,
  cancelarPedido,
  cotizarPedido,
  crearSolicitud,
  listarPedidos,
  obtenerComprobante,
  registrarPago,
  subirComprobante,
} from '@/services/pedido.service'

// Máximo que acepta el backend por página
const TAMANIO = 100

export const usePedidos = (estado?: EstadoPedido) =>
  useQuery({
    queryKey: ['pedidos', estado ?? 'todos'],
    queryFn: () => listarPedidos({ estado, tamanio: TAMANIO }),
    // Mientras alguna solicitud se compara con el stock se consulta cada 3 s hasta que termine
    refetchInterval: (query) => (query.state.data?.contenido.some((p) => p.verificandoStock) ? 3000 : false),
  })

export const useCrearSolicitud = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (solicitud: SolicitudRequest) => crearSolicitud(solicitud),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}

export const useCotizarPedido = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pedidoId, cotizacion }: { pedidoId: string; cotizacion: CotizacionRequest }) =>
      cotizarPedido(pedidoId, cotizacion),
    // También si falla: un 409 significa que la solicitud cambió y hay que traer la versión nueva
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}

export const useCancelarPedido = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pedidoId, version }: { pedidoId: string; version: number }) => cancelarPedido(pedidoId, version),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}

// Error al pagar que recuerda si la cotización alcanzó a aceptarse (para explicarle al estudiante qué pasó)
export class PagoError extends Error {
  aceptada: boolean
  cause: unknown
  constructor(aceptada: boolean, cause: unknown) {
    super('No se pudo completar el pago')
    this.aceptada = aceptada
    this.cause = cause
  }
}

// Pagar = aceptar la cotización (si aún está COTIZADO) y subir el comprobante con la versión nueva.
// El backend solo recibe comprobantes de pedidos CONFIRMADO; si la subida falla después de aceptar,
// el pedido queda confirmado y el estudiante puede reintentar la subida (o reemplazar el archivo).
export const usePagarPedido = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ pedido, archivo }: { pedido: PedidoDetalle; archivo: File }) => {
      let actual = pedido
      if (pedido.estado === 'COTIZADO') {
        try {
          actual = await aceptarPedido(pedido.id, pedido.version)
        } catch (error) {
          throw new PagoError(false, error)
        }
      }
      try {
        return await subirComprobante(actual.id, actual.version, archivo)
      } catch (error) {
        throw new PagoError(actual.estado === 'CONFIRMADO', error)
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}

// Archivo del comprobante como Blob. La fecha del comprobante va en la clave: si se reemplaza, se vuelve a pedir.
export const useComprobante = (pedido: PedidoDetalle) =>
  useQuery({
    queryKey: ['comprobante', pedido.id, pedido.comprobante?.fecha],
    queryFn: () => obtenerComprobante(pedido.id),
    enabled: pedido.comprobante !== null,
    staleTime: Infinity,
  })

export const useRegistrarPago = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ pedidoId, version }: { pedidoId: string; version: number }) => registrarPago(pedidoId, version),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  })
}
