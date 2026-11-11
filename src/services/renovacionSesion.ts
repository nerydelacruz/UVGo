import { isSesionVigente, useAuthStore } from '@/store/auth.store'
import { renovar } from './auth.service'

// El token dura 30 minutos. Mientras la pestaña esté abierta se cambia por uno nuevo
// cuando le quedan menos de 10, para que la sesión no se cierre a media tarea.
const MARGEN_MS = 10 * 60 * 1000
const REVISION_MS = 60 * 1000

let enCurso = false

const renovarSiHaceFalta = async () => {
  const { token, expiresAt, setSession } = useAuthStore.getState()
  if (enCurso || !isSesionVigente(token, expiresAt)) return
  if (Date.parse(expiresAt!) - Date.now() > MARGEN_MS) return
  enCurso = true
  try {
    const respuesta = await renovar()
    // Si mientras tanto se cerró sesión o entró otra cuenta, no se pisa
    if (useAuthStore.getState().token === token) setSession(respuesta)
  } catch {
    // Sin red o backend caído: se reintenta en la próxima revisión.
    // Un 401 ya lo maneja el interceptor de `api` cerrando la sesión.
  } finally {
    enCurso = false
  }
}

// Se llama una sola vez al arrancar la app
export const iniciarRenovacionSesion = () => {
  void renovarSiHaceFalta()
  window.setInterval(() => void renovarSiHaceFalta(), REVISION_MS)
  // Al volver a la pestaña (el navegador frena los temporizadores en segundo plano)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void renovarSiHaceFalta()
  })
}
