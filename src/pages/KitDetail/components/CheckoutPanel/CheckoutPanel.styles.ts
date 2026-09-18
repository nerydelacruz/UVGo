import styled from "@emotion/styled"

export const Card = styled.div`
  margin-top: auto;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.accent};
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Title = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.lg};
`

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.sm};
  color: rgba(255, 255, 255, 0.85);
`

export const Price = styled.span`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.xl};
`

export const Total = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;

  strong {
    margin-left: 0.4rem;
    font-size: ${(p) => p.theme.font.size.md};
  }
`

export const ProceedButton = styled.button`
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: white;
  padding: 1rem 1.8rem;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.accent};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.9;
  }
`
