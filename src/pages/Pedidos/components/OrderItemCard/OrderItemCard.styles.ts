import styled from "@emotion/styled"

export const Card = styled.div`
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.sm};
  padding: ${(p) => p.theme.space.lg};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${(p) => p.theme.space.md};
`

export const Photo = styled.img`
  height: 5.6rem;
  width: 5.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  object-fit: cover;
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const Name = styled.p`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const UnitPrice = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
`

export const EditButton = styled.button`
  display: grid;
  place-items: center;
  height: 2.8rem;
  width: 2.8rem;
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
`

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(p) => p.theme.space.lg};
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
`

export const StepButton = styled.button<{ filled?: boolean }>`
  display: grid;
  place-items: center;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => (p.filled ? "transparent" : p.theme.color.border)};
  background: ${(p) => (p.filled ? p.theme.color.addAction : "transparent")};
  color: ${(p) => (p.filled ? "white" : p.theme.color.textMuted)};
`

export const Count = styled.span`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`

export const TotalPrice = styled.span`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.lg};
`

export const OptionChip = styled.span`
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.color.border};
  padding: 0.4rem 1rem;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};

  b {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const Note = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.lg};
  padding-top: ${(p) => p.theme.space.md};
  border-top: 1px solid ${(p) => p.theme.color.border};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`
