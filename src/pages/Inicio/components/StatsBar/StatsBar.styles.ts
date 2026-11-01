import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: ${(p) => p.theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`

// Toda la tarjeta es un enlace: se eleva un poco al pasar el cursor
export const Card = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
  color: inherit;
  text-decoration: none;
  transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 12px 24px -14px rgb(16 24 16 / 0.35);
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.4);
    outline-offset: 2px;
  }
`

export const Info = styled.div`
  min-width: 0;
`

export const Value = styled.p`
  font-size: ${(p) => p.theme.font.size.xxl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-style: italic;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.color.textStrong};
`

export const Label = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

// Detalle bajo la cifra; coral cuando pide una acción al estudiante
export const Delta = styled.p<{ warn?: boolean }>`
  margin-top: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.warn ? p.theme.color.accent : p.theme.color.addAction)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Icon = styled.div<{ tone: "warning" | "primary" | "accent" }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 4.6rem;
  width: 4.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) =>
    p.tone === "warning" ? p.theme.color.warning : p.tone === "primary" ? p.theme.color.primary : p.theme.color.accent};
  background: ${(p) =>
    p.tone === "warning"
      ? "rgba(251, 191, 36, 0.18)"
      : p.tone === "primary"
        ? "rgba(14, 165, 233, 0.15)"
        : "rgba(224, 122, 95, 0.18)"};
`
