import axios from "axios"

// El backend responde errores como ProblemDetail: { status, detail }.
// Devuelve un mensaje para mostrar junto a la acción que falló.
export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo."
    const detail = (error.response.data as { detail?: unknown } | undefined)?.detail
    if (typeof detail === "string" && detail.trim()) return detail
  }
  return fallback
}
