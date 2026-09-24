import styled from "@emotion/styled"

export const Card = styled.div`
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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.lg};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  padding: ${(p) => p.theme.space.sm};
`

export const Thumb = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.6rem;
  width: 3.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(224, 122, 95, 0.16);
  color: ${(p) => p.theme.color.accent};
`

export const Label = styled.p`
  flex: 1;
  min-width: 0;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.text};
`

export const AddButton = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.accent};
  color: white;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.85;
  }
`

export const InfoLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.xs};
  width: 100%;
  margin-top: ${(p) => p.theme.space.lg};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
`

export const AddProductRow = styled.button`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  width: 100%;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1.5px dashed ${(p) => p.theme.color.accent};
  padding: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.accent};
  transition: background 150ms ease;

  &:hover {
    background: rgba(224, 122, 95, 0.08);
  }
`

export const NewBadge = styled.span`
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(224, 122, 95, 0.16);
  padding: 0.2rem ${(p) => p.theme.space.sm};
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.accent};
`

export const RemoveButton = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
  transition: border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${(p) => p.theme.color.danger};
    color: ${(p) => p.theme.color.danger};
  }
`

export const SaveButton = styled.button`
  width: 100%;
  margin-top: ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.full};
  padding: ${(p) => p.theme.space.md} 0;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  background: ${(p) => p.theme.color.addAction};
  transition: opacity 150ms ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorText = styled.p`
  margin-top: ${(p) => p.theme.space.sm};
  text-align: center;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.danger};
`
