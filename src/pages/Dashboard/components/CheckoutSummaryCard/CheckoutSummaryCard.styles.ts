import styled from "@emotion/styled"

export const Card = styled.section`
  width: 340px;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceFaint};
  padding: ${(p) => p.theme.space.xl};
  box-shadow: ${(p) => p.theme.shadow.sm};
  backdrop-filter: blur(24px);
`

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h2`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`

export const Lines = styled.dl`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.dt`
  color: ${(p) => p.theme.color.textMuted};
`

export const Value = styled.dd<{ free?: boolean }>`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.free ? p.theme.color.danger : p.theme.color.text)};
`

export const Divider = styled.div`
  margin: 2rem 0;
  border-top: 1px dashed ${(p) => p.theme.color.border};
`

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TotalLabel = styled.span`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`

export const Total = styled.span`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Pay = styled.button`
  margin-top: 2rem;
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.textStrong};
  padding: 1.4rem 0;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  transition: background-color 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.neutralDarker};
  }
`
