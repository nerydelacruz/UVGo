import styled from "@emotion/styled"

export const Card = styled.article`
  width: 100%;
  height: 45.4rem;
  overflow: hidden;
  border-radius: 2.4rem;
  padding: 2.2rem 1.8rem 1.8rem;
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    padding: 1.7rem 1.6rem 1.6rem;
  }

  @media (max-width: ${(p) => p.theme.breakpoint.sm}) {
    height: auto;
  }
`

export const Name = styled.h2`
  font-size: 2.5rem;
  line-height: 1.15;
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-style: italic;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    font-size: 1.9rem;
  }
`

export const Code = styled.span`
  color: ${(p) => p.theme.color.textStrong};
`

export const Description = styled.p`
  margin-top: 0.7rem;
  font-size: 1.2rem;
  color: ${(p) => p.theme.color.textMuted};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

export const ImageSlot = styled.div`
display: flex;
justify-content: center;
  height: 16.6rem;
  margin: 1.6rem 0 1.7rem;
   img{
    height: 100%;
   }

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    height: 11.8rem;
  }
`

export const Stats = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: ${(p) => p.theme.breakpoint.sm}) {
    flex-direction: column;
  }
`

export const StatBox = styled.div`
  flex: 1;
  min-width: 0;
  border-radius: 1.7rem;
  background: ${(p) => p.theme.color.surfaceMuted};
  padding: 1.2rem 1.2rem 1rem;
`

export const StatHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.2rem;
  white-space: nowrap;
  color: ${(p) => p.theme.color.text};

  svg {
    flex-shrink: 0;
  }
`

export const StatRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.55rem;
  margin-top: 1.38rem;
  min-width: 0;
`

export const StatSub = styled.p`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(p) => p.theme.color.textFaint};
`

export const StatValue = styled.p`
  margin-top: 0.36rem;
  font-size: 1.8rem;
  white-space: nowrap;
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-style: italic;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.color.textStrong};
`

export const AddButton = styled.button`
  margin-top: 1.2rem;
  width: 100%;
  border-radius: ${(p) => p.theme.radius.md};
  padding: 1rem 0;
  font-size: 1.2rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  background: ${(p) => p.theme.color.addAction};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.9;
  }
`

export const StatBadge = styled.div<{ tone: "primary" | "warning" }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.4rem;
  width: 3.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => (p.tone === "primary" ? p.theme.color.primary : p.theme.color.warning)};
`
