import { api } from './api'
import type { LoginRequest, Perfil, RegistroRequest, TokenResponse } from '@/models/auth.model'

export const login = async (datos: LoginRequest): Promise<TokenResponse> => {
  const { data } = await api.post<TokenResponse>('/api/v1/auth/login', datos)
  return data
}

// El registro solo crea la cuenta de estudiante (no devuelve token)
export const registrar = async (datos: RegistroRequest): Promise<Perfil> => {
  const { data } = await api.post<Perfil>('/api/v1/auth/registro', datos)
  return data
}

// Revoca la sesión en el backend; el token deja de servir aunque no haya vencido
export const logout = async (): Promise<void> => {
  await api.post('/api/v1/auth/logout')
}
