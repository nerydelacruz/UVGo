import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Header = styled.h2`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.sm};
  flex: 1;
`

// Mosaico blanco con ícono, título y descripción; la flecha se mueve al pasar el cursor
export const Tile = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.space.md};
  background: ${(p) => p.theme.color.surface};
  color: inherit;
  text-decoration: none;
  transition: box-shadow 150ms ease, transform 150ms ease;

  i {
    display: grid;
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    margin-bottom: 0.6rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: rgba(224, 122, 95, 0.14);
    color: ${(p) => p.theme.color.accent};
  }

  strong {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  em {
    display: grid;
    place-items: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => p.theme.color.accent};
    font-size: 1.1rem;
    font-style: normal;
    color: white;
  }

  span {
    overflow: hidden;
    font-size: 1.15rem;
    color: ${(p) => p.theme.color.textFaint};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > svg {
    position: absolute;
    top: ${(p) => p.theme.space.md};
    right: ${(p) => p.theme.space.md};
    color: ${(p) => p.theme.color.textDisabled};
    transition: transform 150ms ease, color 150ms ease;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px -14px rgb(16 24 16 / 0.35);
  }

  &:hover > svg {
    transform: translate(2px, -2px);
    color: ${(p) => p.theme.color.accent};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.4);
    outline-offset: 2px;
  }
`
