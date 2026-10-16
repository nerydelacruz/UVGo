import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { Perfil, TokenResponse } from "@/models/auth.model"

interface AuthState {
  token: string | null
  expiresAt: string | null
  usuario: Perfil | null
  setSession: (respuesta: TokenResponse) => void
  clearSession: () => void
}

// La sesión se guarda en localStorage para sobrevivir a recargas.
// Si el navegador no permite guardar (modo privado estricto), funciona solo en memoria.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      expiresAt: null,
      usuario: null,
      setSession: ({ accessToken, expiresAt, usuario }) => set({ token: accessToken, expiresAt, usuario }),
      clearSession: () => set({ token: null, expiresAt: null, usuario: null }),
    }),
    {
      name: "uvgo-sesion",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, expiresAt, usuario }) => ({ token, expiresAt, usuario }),
    },
  ),
)

export const isSesionVigente = (token: string | null, expiresAt: string | null) =>
  !!token && !!expiresAt && Date.parse(expiresAt) > Date.now()
