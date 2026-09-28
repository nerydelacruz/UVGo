import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { Card } from "../../SeguimientoPedidos.styles"

export const Rail = styled(Card.withComponent("nav"))`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xl};
  padding: ${(p) => p.theme.space.lg} 0;

  @media (max-width: 1180px) {
    position: sticky;
    top: ${(p) => p.theme.space.lg};
    height: calc(100vh - 3.2rem);
  }

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

export const Avatar = styled.span`
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  margin-top: ${(p) => p.theme.space.sm};
  border: 2px solid white;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.gradient.avatarWarm};
  box-shadow: 0 0 0 1px rgba(82, 82, 82, 0.12);
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`
