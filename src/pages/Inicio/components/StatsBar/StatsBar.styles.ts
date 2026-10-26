import styled from "@emotion/styled"

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: ${(p) => p.theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
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

export const Delta = styled.p`
  margin-top: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.addAction};
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
