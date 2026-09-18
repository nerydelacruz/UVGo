import styled from "@emotion/styled"

export const Page = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: 100%;
  gap: ${(p) => p.theme.space.lg};
  padding: ${(p) => p.theme.space.xl};

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    flex-direction: column;
  }
`

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  width: 26rem;
  flex-shrink: 0;
`

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  flex: 1;
  min-width: 0;
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  width: 34rem;
  flex-shrink: 0;
`

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const Eyebrow = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.textMuted};
`

export const Title = styled.h1`
  margin-top: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.display};
  line-height: 1.05;
  font-weight: ${(p) => p.theme.font.weight.bold};
  text-transform: uppercase;
  color: ${(p) => p.theme.color.textStrong};
`

export const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  margin-top: ${(p) => p.theme.space.xl};
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`

export const StatIcon = styled.span`
  display: grid;
  place-items: center;
  height: 4.4rem;
  width: 4.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.sm};
  color: ${(p) => p.theme.color.accent};
`

export const StatValue = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
`

