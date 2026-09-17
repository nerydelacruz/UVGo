import styled from "@emotion/styled"

export const Card = styled.section`
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  padding: ${(p) => p.theme.space.xxl};
  box-shadow: ${(p) => p.theme.shadow.sm};
  backdrop-filter: blur(24px);
`

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Label = styled.h2`
  font-size: ${(p) => p.theme.font.size.md};
  color: ${(p) => p.theme.color.textMuted};
`

export const Order = styled.p`
  margin-top: ${(p) => p.theme.space.md};
  font-size: ${(p) => p.theme.font.size.display};
  font-weight: ${(p) => p.theme.font.weight.medium};
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.color.textStrong};
`

export const Steps = styled.ol`
  margin-top: ${(p) => p.theme.space.xxl};
`

export const Step = styled.li`
  position: relative;
  display: flex;
  gap: 1.6rem;
  padding-bottom: ${(p) => p.theme.space.xxl};

  &:last-child {
    padding-bottom: 0;
  }
`

export const Connector = styled.span`
  position: absolute;
  left: 11px;
  top: 2.8rem;
  height: calc(100% - 2.8rem);
  border-left: 1px dashed ${(p) => p.theme.color.border};
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
`

export const Title = styled.p<{ muted?: boolean }>`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.muted ? p.theme.color.textDisabled : p.theme.color.text)};
`

export const Desc = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`

export const Time = styled.span`
  white-space: nowrap;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`

export const MarkerBase = styled.span`
  display: grid;
  place-items: center;
  height: 2.4rem;
  width: 2.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: white;
`

export const MarkerPending = styled.span`
  display: block;
  height: 2.4rem;
  width: 2.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 2px dashed ${(p) => p.theme.color.primaryLight};
`

export const MarkerActive = styled(MarkerBase)`
  background: ${(p) => p.theme.color.warning};
`

export const MarkerDone = styled(MarkerBase)`
  background: ${(p) => p.theme.color.primary};
`
