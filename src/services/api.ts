import axios from 'axios'
import { useAuthStore } from '@/store/auth.store'

// Fallback al path estándar del backend: así el proyecto funciona sin necesidad
// de un .env local (útil en compus nuevas que aún no lo configuraron).
const DEFAULT_API_URL = '/uvgo/api'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
})

// Adjunta el token de la sesión a cada petición
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Si el backend rechaza un token (vencido o revocado), se cierra la sesión local
// y las rutas protegidas mandan al login. Un 401 del propio login no trae token, así que no aplica.
api.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error) && error.response?.status === 401 && error.config?.headers?.Authorization) {
    useAuthStore.getState().clearSession()
  }
  return Promise.reject(error)
})
