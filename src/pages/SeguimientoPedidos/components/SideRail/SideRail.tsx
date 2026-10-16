import type { IconType } from "react-icons"
import { FiBarChart2, FiCreditCard, FiHome, FiNavigation, FiPackage, FiSettings, FiUser } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { customer } from "../../data"
import { Avatar, Brand, NavButton, NavGroup, Rail } from "./SideRail.styles"

const items: Array<{ label: string; icon: IconType; to?: string }> = [
  { label: "Inicio", icon: FiHome, to: "/dashboard" },
  { label: "Pedidos", icon: FiPackage, to: "/kits" },
  { label: "Perfil", icon: FiUser },
  { label: "Entregas", icon: FiNavigation, to: "/seguimiento-pedidos" },
  { label: "Pagos", icon: FiCreditCard },
  { label: "Analítica", icon: FiBarChart2 },
]

const SideRail = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const renderItem = ({ label, icon: Icon, to }: (typeof items)[number]) => {
    const active = to === pathname
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
      <Brand to="/dashboard" aria-label="UVGo, ir al inicio">
        <img src={logo} alt="UVGo" />
      </Brand>

      <NavGroup>{items.map(renderItem)}</NavGroup>

      <NavGroup bottom>
        {renderItem({ label: "Configuración", icon: FiSettings })}
        <Avatar title={customer.name}>
          {customer.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
        </Avatar>
      </NavGroup>
    </Rail>
  )
}

export default SideRail
