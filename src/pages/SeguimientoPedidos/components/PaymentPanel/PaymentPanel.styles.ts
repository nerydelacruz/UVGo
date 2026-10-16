import styled from "@emotion/styled"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

export const Stack = styled.div`
  display: grid;
  gap: ${(p) => p.theme.space.lg};
  align-content: start;

  @media (max-width: 1400px) and (min-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const InvoiceCard = styled(Card)`
  overflow: hidden;
`

export const InvoiceHead = styled.header`
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
    font-size: 1.1rem;
    font-weight: ${(p) => p.theme.font.weight.medium};
    opacity: 0.85;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
  }

  button {
    display: grid;
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    border: 0;
    border-radius: ${(p) => p.theme.radius.sm};
    background: rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    transition: background 150ms ease;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.32);
  }

  button:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`

export const InvoiceBody = styled.div`
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
`

export const InvoiceRows = styled.dl`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.5rem ${(p) => p.theme.space.md};
  font-size: ${(p) => p.theme.font.size.xs};

  dt {
    color: ${(p) => p.theme.color.textFaint};
  }

  dd {
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  dd:last-of-type {
    font-size: ${(p) => p.theme.font.size.sm};
  }
`

export const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.lg};
`

export const PaymentTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    display: block;
    margin-top: 0.2rem;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const Total = styled.div`
  span, strong, small {
    display: block;
  }

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.xl};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    letter-spacing: -0.025em;
    color: ${(p) => p.theme.color.textStrong};
  }

  small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textMuted};
  }
`

export const Progress = styled.div`
  height: 0.6rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(82, 82, 82, 0.1);

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: ${(p) => p.theme.color.accent};
  }
`

export const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: ${(p) => p.theme.radius.md};
  background: ${tracking.pageBg};

  div {
    padding: 0.6rem 1rem;
  }

  div + div {
    border-left: 1px solid ${tracking.hairline};
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    display: block;
    margin-top: 0.2rem;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`
