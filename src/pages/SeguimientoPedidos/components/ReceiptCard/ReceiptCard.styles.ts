import styled from "@emotion/styled"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

export const Receipt = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ReceiptHead = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  padding: 1rem ${(p) => p.theme.space.lg};
  background: ${(p) => p.theme.color.accent};
  color: white;

  span, strong {
    display: block;
  }

  span {
    font-size: 1.05rem;
    font-weight: ${(p) => p.theme.font.weight.medium};
    opacity: 0.85;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    letter-spacing: -0.01em;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    flex: 0 0 auto;
    border: 0;
    border-radius: ${(p) => p.theme.radius.full};
    padding: 0.5rem 1.1rem;
    background: rgba(255, 255, 255, 0.2);
    font: inherit;
    font-size: 1.15rem;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: white;
    cursor: pointer;
    transition: background 150ms ease;
  }

  button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.32);
  }

  button:disabled {
    cursor: default;
    opacity: 0.55;
  }

  button:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`

export const ReceiptBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
`

// Datos del pedido en 2 columnas sin cajas: etiqueta pequeña sobre el valor
export const Facts = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem ${(p) => p.theme.space.lg};

  > div {
    min-width: 0;
  }

  dt {
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  dd {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

// Resumen de productos en una línea, con corte punteado arriba como en un recibo
export const Products = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding-top: ${(p) => p.theme.space.md};
  border-top: 2px dashed rgba(82, 82, 82, 0.16);

  > svg {
    flex: 0 0 auto;
    color: ${(p) => p.theme.color.accent};
  }

  > div {
    flex: 1;
    min-width: 0;
  }

  strong, span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    flex: 0 0 auto;
    border: 1px solid ${tracking.hairline};
    border-radius: ${(p) => p.theme.radius.full};
    padding: 0.4rem 1rem;
    background: white;
    font: inherit;
    font-size: 1.1rem;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${tracking.accentInk};
    cursor: pointer;
    transition: border-color 150ms ease;
  }

  button:hover {
    border-color: ${(p) => p.theme.color.accent};
  }

  button:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`

// Lista completa: flota sobre el cuerpo de la tarjeta (debajo del encabezado coral) sin empujar la página
export const ItemPanel = styled.div`
  position: absolute;
  z-index: 3;
  top: 6.4rem;
  right: ${(p) => p.theme.space.sm};
  bottom: ${(p) => p.theme.space.sm};
  left: ${(p) => p.theme.space.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${tracking.hairline};
  border-radius: ${(p) => p.theme.radius.md};
  background: white;
  box-shadow: 0 16px 32px -12px rgb(16 24 16 / 0.28);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.6rem 0.6rem 1.2rem;
    border-bottom: 1px solid ${tracking.hairline};
  }

  header strong {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  header button {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border: 0;
    border-radius: ${(p) => p.theme.radius.full};
    background: none;
    color: ${(p) => p.theme.color.textMuted};
    cursor: pointer;
  }

  header button:hover {
    background: ${tracking.pageBg};
    color: ${(p) => p.theme.color.textStrong};
  }

  header button:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
  }

  ul {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 0.4rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(82, 82, 82, 0.2) transparent;
  }

  li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 3.2rem 7rem;
    align-items: baseline;
    gap: ${(p) => p.theme.space.sm};
    padding: 0.6rem 0.8rem;
    border-radius: ${(p) => p.theme.radius.sm};
    font-size: ${(p) => p.theme.font.size.xs};
  }

  li:nth-of-type(odd) {
    background: ${tracking.pageBg};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${(p) => p.theme.color.text};
  }

  small {
    text-align: right;
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    text-align: right;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    font-variant-numeric: tabular-nums;
    color: ${(p) => p.theme.color.textStrong};
  }
`

// Pie del recibo: desglose a la izquierda, total destacado a la derecha
export const Totals = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: auto;
  padding: 0.8rem 1.2rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${tracking.accentWash};
  font-variant-numeric: tabular-nums;

  dl {
    display: flex;
    gap: ${(p) => p.theme.space.lg};
    font-size: 1.1rem;
  }

  dt {
    color: ${(p) => p.theme.color.textFaint};
  }

  dd {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  p {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
  }

  p span {
    font-size: 1.1rem;
    color: ${tracking.accentInk};
  }

  p strong {
    font-size: ${(p) => p.theme.font.size.xl};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    letter-spacing: -0.02em;
    color: ${(p) => p.theme.color.textStrong};
  }
`
