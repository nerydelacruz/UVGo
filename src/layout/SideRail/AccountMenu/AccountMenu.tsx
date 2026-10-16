import { useEffect, useRef, useState } from "react"
import type { IconType } from "react-icons"
import { FiCheck, FiLogOut, FiShield, FiUser } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import { useLogout } from "@/hooks/useAuth"
import { VISTAS, getVista, type Vista } from "@/layout/vista"
import { useAuthStore } from "@/store/auth.store"
import { AvatarButton, Divider, Header, Item, Popover, Wrapper } from "./AccountMenu.styles"

const iconos: Record<Vista, IconType> = { usuario: FiUser, admin: FiShield }
const ROLES = { ESTUDIANTE: "Estudiante", ADMINISTRADOR: "Administrador" } as const

const AccountMenu = () => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const vista = getVista(useLocation().pathname)
  const usuario = useAuthStore((s) => s.usuario)
  const logout = useLogout()

  const nombre = usuario?.nombre ?? "Usuario"
  const initials = nombre.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase()
  // Solo el administrador puede alternar entre su vista y la del usuario
  const puedeCambiarVista = usuario?.rol === "ADMINISTRADOR"

  // Cierra al hacer clic fuera del menú o al presionar Escape
  useEffect(() => {
    if (!open) return
    const handlePointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener("pointerdown", handlePointer)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("pointerdown", handlePointer)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  const selectVista = (next: Vista) => {
    setOpen(false)
    if (next !== vista) navigate(VISTAS[next].home)
  }

  // Al limpiar la sesión, las rutas protegidas mandan al login
  const cerrarSesion = () => logout.mutate(undefined, { onSettled: () => navigate("/login", { replace: true }) })

  return (
    <Wrapper ref={wrapperRef}>
      <AvatarButton
        ref={buttonRef}
        type="button"
        open={open}
        aria-label={`Cuenta de ${nombre}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {initials}
      </AvatarButton>

      {open && (
        <Popover role="menu" aria-label="Cuenta">
          <Header>
            <strong>{nombre}</strong>
            <span>{usuario ? `${usuario.correo} · ${ROLES[usuario.rol]}` : ""}</span>
          </Header>

          {puedeCambiarVista &&
            (Object.keys(VISTAS) as Vista[]).map((key) => {
              const Icon = iconos[key]
              const active = key === vista
              return (
                <Item
                  key={key}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  active={active}
                  autoFocus={active}
                  onClick={() => selectVista(key)}
                >
                  <Icon size={16} aria-hidden />
                  <span>{VISTAS[key].label}</span>
                  {active && <FiCheck className="check" size={16} aria-hidden />}
                </Item>
              )
            })}

          {puedeCambiarVista && <Divider />}

          <Item
            type="button"
            role="menuitem"
            active={false}
            autoFocus={!puedeCambiarVista}
            disabled={logout.isPending}
            onClick={cerrarSesion}
          >
            <FiLogOut size={16} aria-hidden />
            <span>{logout.isPending ? "Cerrando sesión…" : "Cerrar sesión"}</span>
          </Item>
        </Popover>
      )}
    </Wrapper>
  )
}

export default AccountMenu
