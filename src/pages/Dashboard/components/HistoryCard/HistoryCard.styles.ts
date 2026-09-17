import styled from "@emotion/styled"

export const Card = styled.section`
  flex: 1;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceFaint};
  padding: ${(p) => p.theme.space.lg};
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

export const ViewAll = styled.a`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};

  &:hover {
    color: ${(p) => p.theme.color.text};
  }
`

export const Grid = styled.div`
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
`

export const Item = styled.article`
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(255, 255, 255, 0.9);
  box-shadow: ${(p) => p.theme.shadow.sm};
`

export const Photo = styled.div<{ tone: "neutral" | "slate" }>`
  position: relative;
  height: 11.2rem;
  background: ${(p) => (p.tone === "neutral" ? p.theme.gradient.photoNeutral : p.theme.gradient.photoSlate)};
`

export const Badge = styled.span<{ tone: string }>`
  position: absolute;
  right: 0;
  top: 0;
  display: grid;
  place-items: center;
  height: 3.6rem;
  width: 3.6rem;
  border-bottom-left-radius: ${(p) => p.theme.radius.md};
  color: white;
  background: ${(p) => (p.tone === "delivery" ? p.theme.color.warning : p.theme.color.primary)};
`

export const Body = styled.div`
  padding: 0 1.2rem 1.2rem;
`

export const Date = styled.p`
  padding: 0.6rem 0;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Name = styled.p`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`

export const Code = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`
