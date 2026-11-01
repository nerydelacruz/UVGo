import styled from "@emotion/styled"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

export type StepState = "done" | "current" | "pending"

export const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
`

export const PaymentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  svg {
    color: ${(p) => p.theme.color.textFaint};
  }
`

// Monto y su estado en la misma línea
export const Amount = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 1.2rem;

  strong {
    font-size: 3rem;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    line-height: 1.1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textMuted};
  }
`

// Pasos del pago en horizontal, unidos por una línea (como el historial del pedido)
export const Steps = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 1rem 0.4rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${tracking.pageBg};
`

export const Step = styled.li<{ state: StepState }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 0;
  padding: 0 0.4rem;
  text-align: center;

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 1.2rem;
    left: calc(50% + 1.7rem);
    width: calc(100% - 3.4rem);
    border-top: 2px ${(p) => (p.state === "done" ? "solid" : "dashed")}
      ${(p) => (p.state === "done" ? p.theme.color.accent : p.theme.color.border)};
  }

  i {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border: 2px solid ${(p) => (p.state === "pending" ? p.theme.color.border : p.theme.color.accent)};
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => (p.state === "done" ? p.theme.color.accent : "white")};
    box-shadow: ${(p) => (p.state === "current" ? `0 0 0 4px ${tracking.accentWash}` : "none")};
    font-size: 1.1rem;
    font-style: normal;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => (p.state === "done" ? "white" : p.state === "current" ? p.theme.color.accent : p.theme.color.textDisabled)};
  }

  strong {
    margin-top: 0.4rem;
    font-size: 1.15rem;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    line-height: 1.25;
    color: ${(p) => (p.state === "pending" ? p.theme.color.textDisabled : p.theme.color.text)};
  }

  small {
    overflow: hidden;
    width: 100%;
    margin-top: 0.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.05rem;
    color: ${(p) => (p.state === "current" ? tracking.accentInk : p.theme.color.textFaint)};
  }
`

// Qué sigue: verde cuando el pago ya está, coral mientras falta algo
export const NextStep = styled.div<{ done: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  padding: 0.8rem 1.2rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.done ? "rgba(29, 65, 27, 0.08)" : tracking.accentWash)};
  color: ${(p) => (p.done ? p.theme.color.addAction : tracking.accentInk)};

  > svg {
    flex: 0 0 auto;
  }

  p {
    flex: 1 1 20rem;
    font-size: 1.15rem;
    font-weight: ${(p) => p.theme.font.weight.medium};
    line-height: 1.45;
    text-wrap: pretty;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin-left: auto;
    border: 0;
    border-radius: ${(p) => p.theme.radius.full};
    padding: 0.5rem 1.1rem;
    background: ${(p) => p.theme.color.accent};
    font: inherit;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: white;
    cursor: pointer;
    transition: filter 150ms ease;
  }

  button:hover {
    filter: brightness(0.94);
  }

  button:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`

// Fechas al pie de la tarjeta
export const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid ${tracking.hairline};

  > div + div {
    padding-left: ${(p) => p.theme.space.md};
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.8rem;
    margin-top: 0.2rem;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const Countdown = styled.em<{ urgent: boolean }>`
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.2rem 0.8rem;
  background: ${(p) => (p.urgent ? "rgba(239, 68, 68, 0.1)" : "rgba(82, 82, 82, 0.08)")};
  font-size: 1.05rem;
  font-style: normal;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.urgent ? "#b91c1c" : p.theme.color.textMuted)};
`
