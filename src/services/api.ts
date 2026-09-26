import axios from 'axios'

// Fallback al path estándar del backend: así el proyecto funciona sin necesidad
// de un .env local (útil en compus nuevas que aún no lo configuraron).
const DEFAULT_API_URL = '/uvgo/api'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
})
