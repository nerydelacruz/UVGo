import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { api } from '@/services/api'
import { obtenerUbicacion } from '@/services/pedido.service'
import { useAuthStore } from '@/store/auth.store'
import type { Ubicacion } from '@/models/ubicacion.model'

// ws://host/uvgo/api/ws; sale de VITE_WS_URL o, si falta, de la misma base que usa axios (relativa o absoluta)
const wsUrl = () => {
  if (import.meta.env.VITE_WS_URL) return import.meta.env.VITE_WS_URL
  const url = new URL(`${api.defaults.baseURL ?? ''}/ws`, window.location.href)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  return url.toString()
}

const RECONEXION_MS = 3000

interface Estado {
  pedidoId: string
  ubicacion: Ubicacion | null
  conectado: boolean
}

/**
 * Posición en vivo del repartidor de un pedido (solo admin). Pide la última posición conocida por REST
 * y se suscribe por STOMP a /topic/pedidos/{id}/ubicacion; si se cae la conexión, reintenta sola.
 */
export const useUbicacionRepartidor = (pedidoId: string, activo = true) => {
  const token = useAuthStore((s) => s.token)
  const [estado, setEstado] = useState<Estado>({ pedidoId, ubicacion: null, conectado: false })

  useEffect(() => {
    if (!activo || !token) return

    const actualizar = (cambios: Partial<Omit<Estado, 'pedidoId'>>) =>
      setEstado((anterior) => ({ ...(anterior.pedidoId === pedidoId ? anterior : { pedidoId, ubicacion: null, conectado: false }), ...cambios }))

    let cerrado = false
    obtenerUbicacion(pedidoId)
      .then((ubicacion) => {
        // Si ya llegó una más reciente por el WebSocket, esa gana
        if (!cerrado && ubicacion) setEstado((anterior) => (anterior.pedidoId === pedidoId && anterior.ubicacion ? anterior : { pedidoId, ubicacion, conectado: anterior.conectado }))
      })
      .catch(() => {})

    const client = new Client({
      brokerURL: wsUrl(),
      reconnectDelay: RECONEXION_MS,
      // El navegador no deja poner Authorization al abrir un WebSocket: el JWT viaja en el frame CONNECT.
      // Se lee en cada intento para usar el token vigente tras una reconexión.
      beforeConnect: (c) => {
        c.connectHeaders = { Authorization: `Bearer ${useAuthStore.getState().token ?? ''}` }
      },
      onConnect: () => {
        actualizar({ conectado: true })
        client.subscribe(`/topic/pedidos/${pedidoId}/ubicacion`, (mensaje) => actualizar({ ubicacion: JSON.parse(mensaje.body) as Ubicacion }))
      },
      onWebSocketClose: () => actualizar({ conectado: false }),
    })
    client.activate()

    return () => {
      cerrado = true
      void client.deactivate()
    }
  }, [pedidoId, activo, token])

  // Al cambiar de pedido, lo guardado del anterior no se muestra
  return estado.pedidoId === pedidoId ? { ubicacion: estado.ubicacion, conectado: estado.conectado } : { ubicacion: null, conectado: false }
}
