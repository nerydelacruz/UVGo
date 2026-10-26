import styled from "@emotion/styled"

export const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};
`

export const Header = styled.header`
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.xs} 0;
`

export const Eyebrow = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
`

export const Title = styled.h1`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.display};
  line-height: 1.1;
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  text-wrap: balance;
`

export const Panel = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.xxl} ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.md};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
  text-align: center;

  strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  p {
    max-width: 36rem;
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.textFaint};
    text-wrap: pretty;
  }
`

export const IconBadge = styled.span`
  display: grid;
  place-items: center;
  width: 5.6rem;
  height: 5.6rem;
  margin-bottom: ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => p.theme.color.accent};
  background: rgba(224, 122, 95, 0.16);
`
