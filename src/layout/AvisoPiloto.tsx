import { useLogout } from "@/hooks/useAuth"
import { EmptyState, Page, PrimaryButton } from "@/styles/shared.styles"
import { useAuthStore } from "@/store/auth.store"

// Lo que ve un conductor si entra a la web: su trabajo (pedidos asignados y ubicación) está en la app móvil
const AvisoPiloto = () => {
  const usuario = useAuthStore((s) => s.usuario)
  const logout = useLogout()

  return (
    <Page style={{ minHeight: "100dvh" }}>
      <EmptyState>
        <strong>Hola{usuario ? `, ${usuario.nombre}` : ""}</strong>
        <p>Tu cuenta es de conductor. Inicia sesión en la app móvil de UVGo para ver tus pedidos y compartir tu ubicación.</p>
        <PrimaryButton type="button" onClick={() => logout.mutate()} disabled={logout.isPending}>
          {logout.isPending ? "Cerrando sesión…" : "Cerrar sesión"}
        </PrimaryButton>
      </EmptyState>
    </Page>
  )
}

export default AvisoPiloto
