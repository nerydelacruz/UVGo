import styled from "@emotion/styled"

// Piezas visuales compartidas entre pantallas: vidrio difuminado sobre el degradado verde-crema
// + reglas de Dribbble (grid de 4px, foco de 2px con offset, feedback de color ≤150ms, sin animaciones)

export const hairline = "rgba(82, 82, 82, 0.1)"
export const accentWash = "rgba(224, 122, 95, 0.16)"
export const successWash = "rgba(29, 65, 27, 0.1)"

export const focusRing = `
  &:focus-visible {
    outline: 2px solid #e07a5f;
    outline-offset: 2px;
  }
`

export const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};
`

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.xs} 0;
`

export const Eyebrow = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
`

export const Title = styled.h1`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.display};
  line-height: 1.1;
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  text-wrap: balance;
`

export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.md};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);

  @media (max-width: 1024px) {
    max-height: 64rem;
  }
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  padding: 0 ${(p) => p.theme.space.xs} ${(p) => p.theme.space.md};
  border-bottom: 1px solid ${hairline};
`

export const PanelTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const PanelHint = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  text-wrap: pretty;
`

export const IconBadge = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => p.theme.color.accent};
  background: ${accentWash};
`

export const Count = styled.span`
  padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

export const ScrollArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.md};
  padding: 0.2rem;
  overflow-y: auto;
  scrollbar-width: thin;
`

// Campo de texto con ícono a la izquierda (buscador de stock y búsqueda externa)
export const Field = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  min-width: 0;
  height: 4.4rem;
  padding: 0 ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textFaint};
  transition: border-color 150ms ease-out;

  &:focus-within {
    border-color: ${(p) => p.theme.color.accent};
    box-shadow: 0 0 0 3px ${accentWash};
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.text};
  }

  input::placeholder {
    color: ${(p) => p.theme.color.textDisabled};
  }
`

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  flex-shrink: 0;
  height: 4.4rem;
  padding: 0 ${(p) => p.theme.space.xl};
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.textStrong};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  cursor: pointer;
  transition: background 150ms ease-out;

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.color.neutralDarker};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`

export const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  flex-shrink: 0;
  padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.sm};
  border: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  background: transparent;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover:not(:disabled) {
    background: rgba(82, 82, 82, 0.08);
    color: ${(p) => p.theme.color.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`

// Esqueleto estático (sin animación, regla de Dribbble) mientras cargan los datos
export const SkeletonRow = styled.div`
  height: 6.4rem;
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.5);
`

export const EmptyState = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.xxl} ${(p) => p.theme.space.lg};
  text-align: center;
  color: ${(p) => p.theme.color.textFaint};

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  p {
    max-width: 32rem;
    font-size: ${(p) => p.theme.font.size.sm};
    text-wrap: pretty;
  }
`

export const ErrorText = styled.p`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(239, 68, 68, 0.08);
  font-size: ${(p) => p.theme.font.size.xs};
  color: #b91c1c;
`

// Miniatura de producto (imagen o ícono de respaldo)
export const Thumb = styled.div<{ size?: "sm" | "md" }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: ${(p) => (p.size === "sm" ? "4.4rem" : "5.6rem")};
  height: ${(p) => (p.size === "sm" ? "4.4rem" : "5.6rem")};
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textFaint};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const Badge = styled.span<{ tone: "neutral" | "accent" | "success" | "danger" }>`
  padding: 0.2rem ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.full};
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.medium};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${(p) =>
    ({ neutral: p.theme.color.textMuted, accent: "#a34f3a", success: p.theme.color.addAction, danger: "#b91c1c" })[p.tone]};
  background: ${(p) =>
    ({
      neutral: "rgba(82, 82, 82, 0.08)",
      accent: "rgba(224, 122, 95, 0.14)",
      success: "rgba(29, 65, 27, 0.1)",
      danger: "rgba(239, 68, 68, 0.1)",
    })[p.tone]};
`

export const DangerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.xs};
  flex-shrink: 0;
  height: 3.6rem;
  padding: 0 ${(p) => p.theme.space.lg};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: #b91c1c;
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`

// Control segmentado (filtros de estado y pestañas del detalle)
export const Segmented = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-self: flex-start;
  gap: ${(p) => p.theme.space.xs};
  padding: ${(p) => p.theme.space.xs};
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(82, 82, 82, 0.06);
`

export const SegmentButton = styled.button<{ selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.lg};
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.selected ? p.theme.color.surface : "transparent")};
  box-shadow: ${(p) => (p.selected ? p.theme.shadow.sm : "none")};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => (p.selected ? p.theme.font.weight.semibold : p.theme.font.weight.medium)};
  color: ${(p) => (p.selected ? p.theme.color.textStrong : p.theme.color.textMuted)};
  white-space: nowrap;
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover {
    color: ${(p) => p.theme.color.textStrong};
  }

  ${focusRing}
`

export const SegmentCount = styled.span<{ highlight?: boolean }>`
  min-width: 2rem;
  padding: 0 0.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.highlight ? p.theme.color.accent : "rgba(82, 82, 82, 0.1)")};
  font-size: 1.1rem;
  line-height: 2rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.highlight ? "white" : p.theme.color.textMuted)};
  font-variant-numeric: tabular-nums;
  text-align: center;
`

// Confirmación de una acción (cotización enviada, solicitud cancelada)
export const Aviso = styled.p`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(29, 65, 27, 0.1);
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.addAction};
`
