import styled from "@emotion/styled"

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.xl};
  width: 30%;
  min-width: 0;
  flex-shrink: 0;
`

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: clamp(4.8rem, 5.6vw, 9.6rem);
  line-height: 1.02;
  font-weight: ${(p) => p.theme.font.weight.medium};
  letter-spacing: -0.045em;
  color: ${(p) => p.theme.color.neutralDark};
`

export const LastLine = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
`

export const Availability = styled.span`
  display: block;
  padding-bottom: 0.4em;
  font-size: clamp(2rem, 2.2vw, 3.6rem);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.04em;
  text-align: right;
  color: ${(p) => p.theme.color.neutralDark};
`

export const AvailableTotal = styled.span`
  color: ${(p) => p.theme.color.textDisabled};
`

export const AvailableLabel = styled.span`
  display: block;
  color: ${(p) => p.theme.color.textDisabled};
`

export const ThumbsHead = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(p) => p.theme.space.sm};
  max-width: 44rem;
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
`

export const StepButton = styled.button`
  display: grid;
  place-items: center;
  height: 2.6rem;
  width: 2.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
  transition: border-color 150ms ease, color 150ms ease;

  &:hover:not(:disabled) {
    border-color: ${(p) => p.theme.color.neutralDark};
    color: ${(p) => p.theme.color.neutralDark};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const PageIndicator = styled.span`
  min-width: 3rem;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const Thumbs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.sm};
  max-width: 44rem;
`

export const Thumb = styled.button`
  aspect-ratio: 1;
`

export const EmptySlot = styled.div`
  aspect-ratio: 1;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px dashed ${(p) => p.theme.color.border};
  opacity: 0.5;
`
