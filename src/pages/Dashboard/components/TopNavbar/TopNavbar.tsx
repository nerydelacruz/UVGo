import { useTheme } from "@emotion/react"
import { motion } from "motion/react"
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../../../../assets/logo.png"
import { ActionButton, Actions, Avatar, Brand, Dot, Link, Links, Nav } from "./TopNavbar.styles"

const links = [
  { label: "Dashboard", dropdown: true, to: "/dashboard" },
  { label: "Kits", dropdown: false, to: "/kits" },
  { label: "Pricing", dropdown: true },
  { label: "Recyclers", dropdown: false },
  { label: "Track Order", dropdown: false },
]

// "/" y "/dashboard" muestran la misma pantalla; "/kits/:id" cuenta como parte de "/kits"
const isLinkActive = (pathname: string, to?: string) => {
  if (!to) return false
  if (to === "/dashboard") return pathname === "/" || pathname.startsWith("/dashboard")
  return pathname === to || pathname.startsWith(`${to}/`)
}

const arrowVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 180 },
}

const TopNavbar = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Nav>
      <Brand>
        <img src={logo} alt="UVGo" className="imgBrand"/>
      </Brand>

      <Links>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.to ?? "#"}
            active={isLinkActive(location.pathname, link.to)}
            initial="rest"
            whileHover="hover"
            onClick={(e) => {
              if (!link.to) return
              e.preventDefault()
              navigate(link.to)
            }}
          >
            {link.label}
            {link.dropdown && (
              <motion.span variants={arrowVariants} style={{ display: "flex" }}>
                <FiChevronDown size={16} color={theme.color.textDisabled} />
              </motion.span>
            )}
          </Link>
        ))}
      </Links>

      <Actions>
        <ActionButton>
          <FiSearch size={20} />
        </ActionButton>
        <ActionButton>
          <FiBell size={20} />
          <Dot />
        </ActionButton>
        <Avatar />
      </Actions>
    </Nav>
  )
}

export default TopNavbar
