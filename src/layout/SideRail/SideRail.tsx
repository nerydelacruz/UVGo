import type { IconType } from "react-icons"
import { FiBarChart2, FiCreditCard, FiFileText, FiHome, FiInbox, FiNavigation, FiSettings, FiUser } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { VISTAS, getVista, type Vista } from "@/layout/vista"
import AccountMenu from "./AccountMenu/AccountMenu"
import { Brand, NavButton, NavGroup, Rail } from "./SideRail.styles"

// match: prefijo de ruta que marca el botón como activo cuando difiere de "to"
// end: solo se marca activo en la ruta exacta (no en sus subrutas)
type NavItem = { label: string; icon: IconType; to?: string; match?: string; end?: boolean }

// Cada vista tiene su propio menú; la de admin está casi vacía mientras se construye
const items: Record<Vista, NavItem[]> = {
  usuario: [
    { label: "Inicio", icon: FiHome, to: "/dashboard" },
    { label: "Cotizar", icon: FiFileText, to: "/cotizar/electronica", match: "/cotizar" },
    { label: "Mis solicitudes", icon: FiInbox, to: "/mis-solicitudes" },
    { label: "Seguimiento de pedidos", icon: FiNavigation, to: "/seguimiento-pedidos" },
    { label: "Perfil", icon: FiUser },
    { label: "Pagos", icon: FiCreditCard },
    { label: "Analítica", icon: FiBarChart2 },
  ],
  admin: [
    { label: "Inicio", icon: FiHome, to: "/admin", end: true },
    { label: "Solicitudes", icon: FiInbox, to: "/admin/solicitudes" },
  ],
}

// "/" y "/dashboard" muestran la misma pantalla; las subrutas cuentan como parte de su sección
const isItemActive = (pathname: string, to?: string, end = false) => {
  if (!to) return false
  if (to === "/dashboard") return pathname === "/" || pathname.startsWith("/dashboard")
  return pathname === to || (!end && pathname.startsWith(`${to}/`))
}


const SideRail = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const vista = getVista(pathname)

  const renderItem = ({ label, icon: Icon, to, match, end }: NavItem) => {
    const active = isItemActive(pathname, match ?? to, end)
    return (
      <NavButton
        key={label}
        type="button"
        active={active}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        title={label}
        onClick={() => to && navigate(to)}
      >
        <Icon size={19} />
      </NavButton>
    )
  }

  return (
    <Rail aria-label="Navegación principal">
      <Brand to={VISTAS[vista].home} aria-label="UVGo, ir al inicio">
        <img src={logo} alt="UVGo" />
      </Brand>

      <NavGroup>{items[vista].map(renderItem)}</NavGroup>

      <NavGroup bottom>
        {renderItem({ label: "Configuración", icon: FiSettings })}
        <AccountMenu />
      </NavGroup>
    </Rail>
  )
}

export default SideRail
