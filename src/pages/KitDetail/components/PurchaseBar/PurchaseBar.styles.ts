import styled from "@emotion/styled"

export const Bar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  align-items: center;
  gap: ${(p) => p.theme.space.xxl};
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${(p) => p.theme.space.xl} ${(p) => p.theme.space.xxl};
  background: ${(p) => p.theme.color.neutralDark};
  color: white;
`

export const Tagline = styled.p`
  font-size: ${(p) => p.theme.font.size.xxl};
  line-height: 1.15;
  letter-spacing: -0.04em;
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xl};
  border-radius: ${(p) => p.theme.radius.full};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.xl};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textFaint};
`

export const StepButton = styled.button`
  display: grid;
  place-items: center;
  color: ${(p) => p.theme.color.textFaint};
  transition: color 150ms ease;

  &:hover {
    color: ${(p) => p.theme.color.neutralDarker};
  }
`

export const Qty = styled.span`
  min-width: 3rem;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.lg};
  color: ${(p) => p.theme.color.neutralDark};
`

export const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${(p) => p.theme.space.lg};
  font-size: clamp(3.6rem, 3.6vw, 6.4rem);
  letter-spacing: -0.05em;
  line-height: 1;
`

export const OldPrice = styled.span`
  color: ${(p) => p.theme.color.textFaint};
`

export const NewPrice = styled.span`
  color: white;
`

export const CartButton = styled.button`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.lg};
  font-size: clamp(2.8rem, 2.6vw, 4.4rem);
  letter-spacing: -0.05em;
  color: white;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.8;
  }
`
