import styled from "@emotion/styled"

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h2`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Nav = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
`

export const NavButton = styled.button`
  display: grid;
  place-items: center;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
  transition: border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${(p) => p.theme.color.accent};
    color: ${(p) => p.theme.color.accent};
  }
`

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.xl};
  border: 1.5px dashed ${(p) => p.theme.color.border};
  padding: ${(p) => p.theme.space.xxl} ${(p) => p.theme.space.lg};
  color: ${(p) => p.theme.color.textFaint};
  font-size: ${(p) => p.theme.font.size.sm};
  text-align: center;
`

export const Scroller = styled.div`
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CardsTrack = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${(p) => p.theme.space.md};
  padding-bottom: ${(p) => p.theme.space.xs};
`

export const CardSlot = styled.div`
  flex: 0 0 26rem;
  height: 18rem;
  scroll-snap-align: start;
`
