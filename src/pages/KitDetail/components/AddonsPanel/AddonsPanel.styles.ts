import styled from "@emotion/styled"

export const Card = styled.div`
  margin-top: auto;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Title = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Subtitle = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.lg};
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
`

export const Icon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textMuted};
`

export const Label = styled.p`
  flex: 1;
  min-width: 0;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.text};
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  flex-shrink: 0;
`

export const StepButton = styled.button`
  display: grid;
  place-items: center;
  height: 2.2rem;
  width: 2.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
  font-size: ${(p) => p.theme.font.size.md};

  &:hover {
    border-color: ${(p) => p.theme.color.accent};
    color: ${(p) => p.theme.color.accent};
  }
`

export const Qty = styled.span`
  min-width: 1.4rem;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`
