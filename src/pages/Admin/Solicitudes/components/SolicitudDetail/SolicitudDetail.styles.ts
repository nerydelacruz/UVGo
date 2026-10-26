import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  flex-wrap: wrap;
`

export const Facts = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};

  div {
    display: flex;
    gap: ${(p) => p.theme.space.xs};
  }

  dd {
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.text};
    font-variant-numeric: tabular-nums;
  }
`

export const Observaciones = styled.p`
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

export const TabsRow = styled.div`
  margin-top: ${(p) => p.theme.space.md};
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.45);

  @media (max-width: 640px) {
    grid-template-columns: auto minmax(0, 1fr);

    > :last-child {
      grid-column: 1 / -1;
    }
  }
`

export const RowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`

export const RowTitle = styled.span`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  line-height: 1.3;
  color: ${(p) => p.theme.color.text};
`

export const RowMeta = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: ${(p) => p.theme.radius.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
    text-decoration: underline;
    text-underline-offset: 2px;

    ${focusRing}
  }
`

export const PriceCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
`

export const PriceField = styled.label<{ missing: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  height: 4rem;
  padding: 0 ${(p) => p.theme.space.md};
  border: 1px solid ${(p) => (p.missing ? "rgba(224, 122, 95, 0.6)" : hairline)};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  transition: border-color 150ms ease-out;

  &:focus-within {
    border-color: ${(p) => p.theme.color.accent};
    box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.16);
  }

  input {
    width: 9rem;
    border: 0;
    outline: 0;
    background: transparent;
    font: inherit;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
`

export const Subtotal = styled.span`
  font-size: 1.1rem;
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;
`

export const PriceText = styled.span`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

// Resumen de la cotización al pie del panel
export const Footer = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.md};
  padding-top: ${(p) => p.theme.space.md};
  border-top: 1px solid ${hairline};

  @media (max-width: 1180px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const FooterFields = styled.div`
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  gap: ${(p) => p.theme.space.md};

  /* cada campo: texto arriba, control abajo (solo hijos directos: PriceField también es un label) */
  > label,
  > div {
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.space.xs};
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textMuted};
  }

  textarea {
    height: 4rem;
    min-height: 4rem;
    padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
    border: 1px solid ${hairline};
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.color.surface};
    font: inherit;
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.text};
    outline: 0;
    resize: vertical;

    &:focus {
      border-color: ${(p) => p.theme.color.accent};
      box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.16);
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Totals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.sm};

  dl {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.2rem ${(p) => p.theme.space.lg};
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  dd {
    color: ${(p) => p.theme.color.text};
  }

  .total {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const FooterAlert = styled.div`
  grid-column: 1 / -1;

  > p {
    margin-top: 0;
  }
`

export const FooterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.sm};
`

export const Notice = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  text-align: right;
  text-wrap: pretty;
`

// Columna izquierda del pie cuando la solicitud ya no se cotiza (comprobante y notas)
export const ReadOnly = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  min-width: 0;
`

export const SectionLabel = styled.h3`
  margin-bottom: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textMuted};
`
