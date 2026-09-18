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

export const Grid = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.lg};
  overflow-x: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  flex-shrink: 0;
  width: 8rem;
  text-align: center;
`

export const Thumb = styled.span`
  display: grid;
  place-items: center;
  height: 6.4rem;
  width: 6.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.sm};
  color: ${(p) => p.theme.color.textMuted};
`

export const Label = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
`

export const AddThumb = styled.button`
  display: grid;
  place-items: center;
  height: 6.4rem;
  width: 6.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 2px dashed ${(p) => p.theme.color.accent};
  color: ${(p) => p.theme.color.accent};
`
