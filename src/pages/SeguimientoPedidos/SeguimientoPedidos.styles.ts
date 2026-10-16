import styled from "@emotion/styled"

// Tokens propios de esta vista: fondo gris muy claro con el matiz verde del proyecto
export const tracking = {
  pageBg: "#f2f4f0",
  cardRadius: "1.8rem",
  cardShadow: "0 1px 2px rgb(16 24 16 / 0.04), 0 8px 24px -12px rgb(16 24 16 / 0.12)",
  hairline: "rgba(82, 82, 82, 0.1)",
  accentWash: "rgba(224, 122, 95, 0.12)",
  accentInk: "#a34f3a",
} as const

export const Shell = styled.div`
  display: grid;
  grid-template-columns: 7.2rem minmax(30rem, 34rem) minmax(0, 1fr);
  height: 100vh;
  gap: ${(p) => p.theme.space.lg};
  padding: ${(p) => p.theme.space.lg};
  overflow: hidden;
  background: ${tracking.pageBg};
  color: ${(p) => p.theme.color.text};

  @media (max-width: 1180px) {
    grid-template-columns: 7.2rem minmax(0, 1fr);
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: ${(p) => p.theme.space.md};
  }
`

export const Main = styled.main`
  display: grid;
  grid-template-rows: minmax(34rem, 1fr) auto;
  min-width: 0;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1180px) {
    grid-column: 2;
    grid-template-rows: 52rem auto;
  }

  @media (max-width: 640px) {
    grid-column: 1;
    grid-template-rows: 44rem auto;
  }
`

export const BottomStrip = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(28rem, 34rem);
  gap: ${(p) => p.theme.space.lg};
  min-height: 0;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.section`
  min-width: 0;
  border: 1px solid ${tracking.hairline};
  border-radius: ${tracking.cardRadius};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${tracking.cardShadow};
`

export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  letter-spacing: -0.015em;
  color: ${(p) => p.theme.color.textStrong};
`

export const Muted = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const SquareButton = styled.button<{ active?: boolean }>`
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  flex: 0 0 auto;
  border: 1px solid ${(p) => (p.active ? p.theme.color.accent : tracking.hairline)};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.active ? p.theme.color.accent : p.theme.color.surface)};
  color: ${(p) => (p.active ? "white" : p.theme.color.textMuted)};
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover {
    border-color: ${(p) => p.theme.color.accent};
    color: ${(p) => (p.active ? "white" : p.theme.color.accent)};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`

export type BadgeTone = "accent" | "success" | "danger" | "neutral"

const badgeBg: Record<BadgeTone, string> = {
  accent: tracking.accentWash,
  success: "rgba(29, 65, 27, 0.1)",
  danger: "rgba(239, 68, 68, 0.1)",
  neutral: "rgba(82, 82, 82, 0.08)",
}

export const StatusBadge = styled.span<{ tone: BadgeTone; dot?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.4rem 0.9rem;
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  white-space: nowrap;
  background: ${(p) => badgeBg[p.tone]};
  color: ${(p) =>
    ({ accent: tracking.accentInk, success: p.theme.color.addAction, danger: "#b91c1c", neutral: p.theme.color.textMuted })[p.tone]};

  &::before {
    content: ${(p) => (p.dot ? '""' : "none")};
    width: 0.6rem;
    height: 0.6rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: currentColor;
  }
`
