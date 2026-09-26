import styled from "@emotion/styled"

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
  height: 100%;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Course = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${(p) => p.theme.color.accent};
`

export const Name = styled.h3`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-style: italic;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Description = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: ${(p) => p.theme.space.sm};
  border-top: 1px solid ${(p) => p.theme.color.border};
`

export const Price = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-style: italic;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.color.textStrong};
`

export const ArticleCount = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const Actions = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
`

export const DetailButton = styled.button`
  flex: 1;
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.space.sm} 0;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.addAction};
  background: transparent;
  border: 2px solid ${(p) => p.theme.color.addAction};
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.addAction};
    color: white;
  }
`

export const AddButton = styled.button`
  flex: 1;
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.space.sm} 0;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  background: ${(p) => p.theme.color.addAction};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.9;
  }
`
