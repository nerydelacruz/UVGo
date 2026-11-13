// Ubicación del repartidor. Mismo contrato que UbicacionDtos.Ubicacion del backend.
export interface Ubicacion {
  latitud: number
  longitud: number
  // Grados de brújula (0 = norte, 90 = este); puede faltar
  rumbo: number | null
  // Hora (ISO) en que el servidor recibió la posición
  marca: string
  // km/h promedio de los últimos segundos (lo calcula el servidor); null al arrancar o tras perder señal
  velocidad: number | null
  // Desde cuándo (ISO) el piloto no se mueve; null si va en movimiento
  detenidoDesde: string | null
}
