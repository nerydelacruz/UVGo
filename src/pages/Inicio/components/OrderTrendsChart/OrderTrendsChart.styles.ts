import styled from "@emotion/styled"

export const Card = styled.div`
  flex: 1.2;
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
`

export const HeaderText = styled.div`
  min-width: 0;
`

export const Title = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Subtitle = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.addAction};
`

export const PeriodSelect = styled.select`
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  background: ${(p) => p.theme.color.surface};
  padding: 0.4rem 1.2rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
`

export const ChartWrapper = styled.div`
  height: 14rem;
  margin-top: ${(p) => p.theme.space.xl};
`

export const TooltipBubble = styled.div`
  white-space: nowrap;
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => p.theme.color.textStrong};
  padding: 0.4rem 1rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: white;

  strong {
    color: ${(p) => p.theme.color.accent};
  }
`
