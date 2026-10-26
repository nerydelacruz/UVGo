export type Rol = "ESTUDIANTE" | "ADMINISTRADOR"

// Perfil del usuario autenticado (GET /api/v1/usuarios/me y respuesta del login)
export interface Perfil {
  id: string
  nombre: string
  correo: string
  telefono: string
  correoContacto: string | null
  rol: Rol
  carne: string | null
  carrera: string | null
  correoVerificado: boolean
}

export interface LoginRequest {
  correo: string
  contrasena: string
}

export interface RegistroRequest {
  nombre: string
  correo: string
  telefono: string
  carne: string
  contrasena: string
  carrera?: string
}

export interface TokenResponse {
  accessToken: string
  tokenType: string
  expiresAt: string // ISO
  usuario: Perfil
}
