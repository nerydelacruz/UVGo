import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import type { Rol } from "@/models/auth.model"
import { isSesionVigente, useAuthStore } from "@/store/auth.store"
import { homePorRol } from "./vista"

interface RequireAuthProps {
  children: ReactNode
  // Si se indica, además de tener sesión el usuario debe tener este rol
  rol?: Rol
}

// Sin sesión vigente manda al login (y recuerda a dónde quería ir);
// con sesión pero sin el rol pedido, manda al inicio de su propio rol.
const RequireAuth = ({ children, rol }: RequireAuthProps) => {
  const { token, expiresAt, usuario } = useAuthStore()
  const location = useLocation()

  if (!isSesionVigente(token, expiresAt)) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (rol && usuario?.rol !== rol) {
    return <Navigate to={homePorRol(usuario?.rol)} replace />
  }
  return children
}

export default RequireAuth
