import styled from "@emotion/styled"

export const Card = styled.div`
  flex: 1;
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.xl};

  &:hover .swiper-button-prev,
  &:hover .swiper-button-next {
    opacity: 1;
    .swiper-navigation-icon{
      height:48%;
      width:71%;
      
    }
  }
`

export const CarouselWrapper = styled.div`
  .swiper {
    width: 100%;
    --swiper-navigation-size: 1.6rem;
    --swiper-navigation-sides-offset: 0.4rem;
  }

  .swiper-pagination {
    position: static;
    margin-top: ${(p) => p.theme.space.lg};
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
    background: ${(p) => p.theme.color.bg};
    color: ${(p) => p.theme.color.accent};
    opacity: 0;
    transition: opacity 150ms ease;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  min-width: 0;
`

export const BrandIcon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 4rem;
  width: 4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(224, 122, 95, 0.16);
  color: ${(p) => p.theme.color.accent};
`

export const BrandName = styled.p`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Meta = styled.p`
  flex-shrink: 0;
  text-align: right;
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};

  strong {
    margin-left: 0.4rem;
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.xl};
`

export const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  min-width: 0;
`

export const StatusIcon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 5.6rem;
  width: 5.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.textMuted};
`

export const StatusText = styled.div`
  min-width: 0;
`

export const StatusTag = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.accent};
`

export const StatusStep = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
`

export const Eta = styled.div`
  flex-shrink: 0;
  text-align: right;
`

export const EtaLabel = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
`

export const EtaValue = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
`

export const Progress = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.xl};
`

export const ProgressSegment = styled.div<{ filled?: boolean }>`
  flex: 1;
  height: 0.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.filled ? p.theme.color.accent : p.theme.color.border)};
`

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.xl};
`

export const CodeInfo = styled.div`
  min-width: 0;
`

export const CodeLabel = styled.p`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  white-space: nowrap;
`

export const CodeOrderId = styled.p`
  margin-top: 0.2rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  white-space: nowrap;
`

export const Digits = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.sm};
`

export const Digit = styled.span`
  display: grid;
  place-items: center;
  height: 4rem;
  width: 3.6rem;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid ${(p) => p.theme.color.border};
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
`
