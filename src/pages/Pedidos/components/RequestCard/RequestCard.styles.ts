import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import type { Tono } from "@/pages/Inicio/resumen"
import type { Theme } from "@/styles/theme"

const tono = (t: Tono, theme: Theme) =>
  ({
    accent: { fg: theme.color.accent, bg: "rgba(224, 122, 95, 0.14)" },
    warning: { fg: "#b45309", bg: "rgba(251, 191, 36, 0.18)" },
    primary: { fg: "#0369a1", bg: "rgba(14, 165, 233, 0.13)" },
    success: { fg: theme.color.addAction, bg: "rgba(29, 65, 27, 0.1)" },
    neutral: { fg: theme.color.textMuted, bg: theme.color.bg },
  })[t]

// Las que esperan algo del estudiante llevan un borde coral a la izquierda
export const Card = styled.article<{ urgent: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => (p.urgent ? `inset 3px 0 0 ${p.theme.color.accent}` : "none")}, ${(p) => p.theme.shadow.sm};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
`

export const Photo = styled.img`
  flex-shrink: 0;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.bg};
  object-fit: cover;
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const Name = styled.p`
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Meta = styled.p`
  margin-top: 0.2rem;
  font-size: 1.1rem;
  color: ${(p) => p.theme.color.textFaint};
`

export const Badge = styled.span<{ tone: Tono }>`
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.3rem 0.8rem;
  background: ${(p) => tono(p.tone, p.theme).bg};
  font-size: 1.05rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  white-space: nowrap;
  color: ${(p) => tono(p.tone, p.theme).fg};
`

// Avance en 5 fases, como la barra del carrusel de pedidos
export const Steps = styled.div`
  display: flex;
  gap: 0.4rem;

  span {
    flex: 1;
    height: 0.4rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => p.theme.color.border};
  }

  span[data-filled] {
    background: ${(p) => p.theme.color.accent};
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  > div {
    min-width: 0;
  }

  strong {
    display: block;
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
    white-space: nowrap;
  }
`

// Botón oscuro con texto si espera al estudiante; si no, solo una flecha circular
export const Action = styled(Link, { shouldForwardProp: (prop) => prop !== "primary" })<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  min-width: 3.2rem;
  height: 3.2rem;
  border: 1px solid ${(p) => (p.primary ? p.theme.color.textStrong : p.theme.color.border)};
  border-radius: ${(p) => p.theme.radius.full};
  padding: ${(p) => (p.primary ? "0 1.2rem" : "0")};
  background: ${(p) => (p.primary ? p.theme.color.textStrong : p.theme.color.surface)};
  font-size: 1.15rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.primary ? "white" : p.theme.color.textMuted)};
  text-decoration: none;
  white-space: nowrap;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover {
    border-color: ${(p) => p.theme.color.textStrong};
    background: ${(p) => (p.primary ? p.theme.color.neutralDarker : p.theme.color.textStrong)};
    color: white;
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.4);
    outline-offset: 2px;
  }
`
