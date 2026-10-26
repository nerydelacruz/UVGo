import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginRequest, RegistroRequest } from '@/models/auth.model'
import { login, logout, registrar } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation({
    mutationFn: (datos: LoginRequest) => login(datos),
    onSuccess: setSession,
  })
}

// Crea la cuenta y entra de una vez con las mismas credenciales
export const useRegistro = () => {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation({
    mutationFn: async (datos: RegistroRequest) => {
      await registrar(datos)
      return login({ correo: datos.correo, contrasena: datos.contrasena })
    },
    onSuccess: setSession,
  })
}

// Revoca la sesión en el backend; aunque falle (sin red, token vencido) se cierra localmente
export const useLogout = () => {
  const clearSession = useAuthStore((s) => s.clearSession)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearSession()
      queryClient.clear()
    },
  })
}
