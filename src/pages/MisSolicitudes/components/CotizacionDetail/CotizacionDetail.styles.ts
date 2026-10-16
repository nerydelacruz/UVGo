import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const HeaderTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
`

export const Facts = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;
`

// Productos a la izquierda, transferencia a la derecha (como en el diseño)
export const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(28rem, 34rem);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.md};

  @media (max-width: 1280px) {
    grid-template-columns: minmax(0, 1fr);
    overflow-y: auto;
  }
`

export const Productos = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const SectionTitle = styled.h3`
  margin-bottom: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  gap: ${(p) => p.theme.space.sm};
  padding: 0.2rem;
  overflow-y: auto;
  list-style: none;
`

export const Row = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.45);
`

export const RowInfo = styled.div`
  min-width: 0;

  strong {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    line-height: 1.3;
    color: ${(p) => p.theme.color.text};
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
    font-variant-numeric: tabular-nums;
  }
`

export const RowPrice = styled.div`
  text-align: right;
  font-variant-numeric: tabular-nums;

  strong {
    display: block;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
    white-space: nowrap;
  }

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
    white-space: nowrap;
  }
`

export const Totals = styled.dl`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.2rem ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.xs} 0;
  border-top: 1px solid ${hairline};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;

  dd {
    text-align: right;
    color: ${(p) => p.theme.color.text};
  }

  .total {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const Nota = styled.p`
  margin-top: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border-left: 3px solid ${(p) => p.theme.color.accent};
  border-radius: ${(p) => p.theme.radius.sm};
  background: rgba(224, 122, 95, 0.08);
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
  white-space: pre-wrap;

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

// Tarjeta de pago: datos de transferencia + comprobante
export const PagoCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  align-self: start;
  padding: ${(p) => p.theme.space.lg};
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: ${(p) => p.theme.radius.xl};
  background: rgba(255, 255, 255, 0.7);
  box-shadow: ${(p) => p.theme.shadow.sm};
`

export const PagoTitle = styled.h3`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};

  span {
    display: block;
    margin-top: 0.2rem;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: 400;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Cuenta = styled.dl`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(242, 244, 240, 0.9);
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};

  dd {
    min-width: 0;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }

  .monto {
    font-size: ${(p) => p.theme.font.size.md};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: ${(p) => p.theme.space.sm};
  padding: 0.2rem ${(p) => p.theme.space.sm};
  border: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  background: rgba(82, 82, 82, 0.08);
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
  cursor: pointer;
  transition: background 150ms ease-out;

  &:hover {
    background: rgba(82, 82, 82, 0.14);
  }

  ${focusRing}
`

export const Acciones = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};

  > button {
    width: 100%;
  }
`

export const Estado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.sm};
  text-align: center;

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  p {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
    text-wrap: pretty;
  }
`

export const EstadoIcon = styled.span<{ tone: "success" | "accent" | "danger" }>`
  display: grid;
  place-items: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => ({ success: p.theme.color.addAction, accent: p.theme.color.accent, danger: "#b91c1c" })[p.tone]};
  background: ${(p) =>
    ({ success: "rgba(29, 65, 27, 0.1)", accent: "rgba(224, 122, 95, 0.14)", danger: "rgba(239, 68, 68, 0.1)" })[p.tone]};
`
