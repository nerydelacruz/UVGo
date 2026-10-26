import styled from "@emotion/styled"
import { Link } from "react-router-dom"

// Vidrio difuminado sobre el degradado verde-crema del Layout (mismo tratamiento que tenía el TopNavbar)
export const Rail = styled.nav`
  /* encima del contenido para que el menú de cuenta no quede tapado por las tarjetas */
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xl};
  min-height: 0;
  padding: ${(p) => p.theme.space.lg} 0;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.sm};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);

  @media (max-width: 640px) {
    display: none;
  }
`

export const Brand = styled(Link)`
  display: grid;
  place-items: center;
  width: 5.2rem;
  padding-bottom: ${(p) => p.theme.space.lg};
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);

  img {
    width: 100%;
    height: auto;
  }
`

export const NavGroup = styled.div<{ bottom?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => (p.bottom ? "auto" : 0)};
`

export const NavButton = styled.button<{ active: boolean }>`
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.active ? p.theme.color.textStrong : "transparent")};
  color: ${(p) => (p.active ? "white" : p.theme.color.textFaint)};
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    background: ${(p) => (p.active ? p.theme.color.textStrong : "rgba(82, 82, 82, 0.08)")};
    color: ${(p) => (p.active ? "white" : p.theme.color.text)};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`
