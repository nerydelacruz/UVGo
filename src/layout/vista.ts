import type { Rol } from "@/models/auth.model"

// Vista de la app según el rol: la URL decide cuál está activa (/admin/... = admin),
// así se conserva al recargar sin guardar nada en el navegador.
export type Vista = "usuario" | "admin"

export const VISTAS: Record<Vista, { label: string; home: string }> = {
  usuario: { label: "Vista usuario", home: "/dashboard" },
  admin: { label: "Vista admin", home: "/admin" },
}

export const getVista = (pathname: string): Vista =>
  pathname === "/admin" || pathname.startsWith("/admin/") ? "admin" : "usuario"

// Pantalla de inicio después del login, según el rol
export const homePorRol = (rol: Rol | undefined) => (rol === "ADMINISTRADOR" ? VISTAS.admin.home : VISTAS.usuario.home)
