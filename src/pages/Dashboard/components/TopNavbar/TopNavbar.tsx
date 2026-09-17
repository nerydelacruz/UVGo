import { useTheme } from "@emotion/react"
import { motion } from "motion/react"
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi"
import logo from "../../../../assets/logo.png"
import { ActionButton, Actions, Avatar, Brand, Dot, Link, Links, Nav } from "./TopNavbar.styles"

const links = [
  { label: "Services", dropdown: true },
  { label: "Help", dropdown: false },
  { label: "Pricing", dropdown: true },
  { label: "Recyclers", dropdown: false },
  { label: "Track Order", dropdown: false },
]

const arrowVariants = {
  rest: { rotate: 0 },
  hover: { rotate: 180 },
}

const TopNavbar = () => {
  const theme = useTheme()

  return (
    <Nav>
      <Brand>
        <img src={logo} alt="UVGo" className="imgBrand"/>
      </Brand>

      <Links>
        {links.map((link) => (
          <Link key={link.label} href="#" initial="rest" whileHover="hover">
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
