import type { LngLat } from '@/pages/SeguimientoPedidos/data'

export interface AvanceRuta {
  totalKm: number
  recorridoKm: number
  restanteKm: number
  // 0–1
  fraccion: number
  // Qué tan lejos de la ruta está el punto, en metros
  desvioM: number
}

// Metros por grado a la latitud dada. A escala de una ciudad basta proyectar en un plano local.
const escala = (lat: number) => ({ x: 111_320 * Math.cos((lat * Math.PI) / 180), y: 110_540 })

/**
 * Proyecta la posición del repartidor sobre la ruta (lista de [lng, lat]) y devuelve cuánto lleva y cuánto le falta.
 * Toma el punto de la ruta más cercano: si el piloto se desvía, el avance es el del tramo más próximo.
 */
export const calcularAvance = (ruta: LngLat[], [lng, lat]: LngLat): AvanceRuta | null => {
  if (ruta.length < 2) return null
  const { x: mx, y: my } = escala(lat)
  // Todo en metros respecto al repartidor
  const puntos = ruta.map(([l, a]) => ({ x: (l - lng) * mx, y: (a - lat) * my }))

  let total = 0
  let mejor = { distancia: Infinity, recorrido: 0 }
  for (let i = 0; i < puntos.length - 1; i++) {
    const a = puntos[i]
    const b = puntos[i + 1]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const largo = Math.hypot(dx, dy)
    // t: dónde cae la proyección del repartidor (el origen) dentro del tramo, recortada a sus extremos
    const t = largo > 0 ? Math.min(1, Math.max(0, -(a.x * dx + a.y * dy) / (largo * largo))) : 0
    const distancia = Math.hypot(a.x + dx * t, a.y + dy * t)
    if (distancia < mejor.distancia) mejor = { distancia, recorrido: total + largo * t }
    total += largo
  }

  const fraccion = total > 0 ? mejor.recorrido / total : 0
  return {
    totalKm: total / 1000,
    recorridoKm: mejor.recorrido / 1000,
    restanteKm: (total - mejor.recorrido) / 1000,
    fraccion,
    desvioM: mejor.distancia,
  }
}
