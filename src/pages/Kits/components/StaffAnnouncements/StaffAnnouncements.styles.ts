import styled from "@emotion/styled"

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};

  &:hover .swiper-button-prev,
  &:hover .swiper-button-next {
    opacity: 1;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const IconBadge = styled.span<{ active?: boolean }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => (p.active ? p.theme.color.accent : p.theme.color.textFaint)};
  background: ${(p) => (p.active ? "rgba(224, 122, 95, 0.16)" : p.theme.color.bg)};
`

export const StatusDot = styled.span<{ active?: boolean }>`
  height: 0.9rem;
  width: 0.9rem;
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.active ? p.theme.color.danger : p.theme.color.addAction)};
  box-shadow: ${(p) => (p.active ? "0 0 0 4px rgba(239, 68, 68, 0.18)" : "0 0 0 4px rgba(29, 65, 27, 0.14)")};
`

export const Content = styled.div`
  margin-top: ${(p) => p.theme.space.lg};

  .swiper {
    width: 100%;
    --swiper-navigation-size: 1.6rem;
    --swiper-navigation-sides-offset: 0.4rem;
  }

  .swiper-pagination {
    position: static;
    margin-top: ${(p) => p.theme.space.md};
  }

  .swiper-pagination-bullet {
    background: ${(p) => p.theme.color.border};
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: ${(p) => p.theme.color.accent};
  }

  .swiper-button-prev,
  .swiper-button-next {
    height: 2.8rem;
    width: 2.8rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => p.theme.color.surface};
    box-shadow: ${(p) => p.theme.shadow.sm};
    color: ${(p) => p.theme.color.accent};
    opacity: 0;
    transition: opacity 150ms ease;

    .swiper-navigation-icon{
      height:48%;
      width:71%;
    }
  }
`

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${(p) => p.theme.space.xs};
  min-height: 9rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  padding: ${(p) => p.theme.space.lg};
`

export const Message = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Timestamp = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const EmptyText = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
`
