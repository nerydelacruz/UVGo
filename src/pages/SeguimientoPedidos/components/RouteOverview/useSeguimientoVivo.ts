import { useEffect, useMemo, useState } from "react"
import type { Ubicacion } from "@/models/ubicacion.model"
import { calcularAvance, type AvanceRuta } from "@/utilities/avanceRuta"
import type { AlertTone, LngLat } from "../../data"

// Con menos de esto (semáforo, arranque) la velocidad del momento no sirve para estimar la llegada:
// se usa la típica de una moto en la ciudad
const VELOCIDAD_MINIMA_ETA = 8
const VELOCIDAD_TIPICA = 20
// Sin posiciones nuevas por más de esto, la señal se considera perdida
const SIN_SENAL_MS = 60_000
// Detenido por más de esto se avisa (un semáforo largo no cuenta)
const DETENIDO_AVISO_MS = 2 * 60_000
// Lejos de la ruta por más de esto se avisa (el GPS en ciudad se desvía unos 20–50 m)
const DESVIO_AVISO_M = 200
// Cada cuánto se recalculan "hace X min" y la hora de llegada aunque no lleguen posiciones
const TICK_MS = 15_000

export interface AlertaRuta {
  tono: AlertTone
  texto: string
}

export interface SeguimientoVivo {
  avance: AvanceRuta
  velocidad: number | null
  minutosRestantes: number
  llegada: Date
  alerta: AlertaRuta | null
}

const minutosDesde = (iso: string, ahora: number) => Math.max(1, Math.round((ahora - Date.parse(iso)) / 60_000))

/**
 * Avance del repartidor sobre la ruta: kilómetros recorridos y restantes, velocidad, hora estimada de llegada
 * y un aviso si perdió la señal, lleva rato detenido o se salió de la ruta. null mientras no haya posición.
 */
export const useSeguimientoVivo = (ubicacion: Ubicacion | null, ruta: LngLat[]): SeguimientoVivo | null => {
  const [ahora, setAhora] = useState(() => Date.now())

  useEffect(() => {
    if (!ubicacion) return
    const id = window.setInterval(() => setAhora(Date.now()), TICK_MS)
    return () => window.clearInterval(id)
  }, [ubicacion])

  const avance = useMemo(
    () => (ubicacion ? calcularAvance(ruta, [ubicacion.longitud, ubicacion.latitud]) : null),
    [ruta, ubicacion],
  )

  if (!ubicacion || !avance) return null

  // Una posición recién llegada es "ahora" aunque el reloj del tick vaya atrasado
  const momento = Math.max(ahora, Date.parse(ubicacion.marca))
  const sinSenal = momento - Date.parse(ubicacion.marca) > SIN_SENAL_MS
  const velocidad = sinSenal ? null : ubicacion.velocidad
  const ritmo = velocidad !== null && velocidad >= VELOCIDAD_MINIMA_ETA ? velocidad : VELOCIDAD_TIPICA
  const minutosRestantes = Math.max(0, Math.round((avance.restanteKm / ritmo) * 60))

  let alerta: AlertaRuta | null = null
  if (sinSenal) alerta = { tono: "warning", texto: `Sin señal hace ${minutosDesde(ubicacion.marca, momento)} min` }
  else if (ubicacion.detenidoDesde && momento - Date.parse(ubicacion.detenidoDesde) > DETENIDO_AVISO_MS)
    alerta = { tono: "warning", texto: `Detenido hace ${minutosDesde(ubicacion.detenidoDesde, momento)} min` }
  else if (avance.desvioM > DESVIO_AVISO_M) alerta = { tono: "accent", texto: `Fuera de la ruta (${Math.round(avance.desvioM)} m)` }

  return { avance, velocidad, minutosRestantes, llegada: new Date(momento + minutosRestantes * 60_000), alerta }
}
