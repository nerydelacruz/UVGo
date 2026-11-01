import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import type { Theme } from "@/styles/theme"
import type { Tono } from "../../resumen"

// Color de texto y fondo de cada tono de estado
const tono = (t: Tono, theme: Theme) =>
  ({
    accent: { fg: theme.color.accent, bg: "rgba(224, 122, 95, 0.14)" },
    warning: { fg: "#b45309", bg: "rgba(251, 191, 36, 0.18)" },
    primary: { fg: "#0369a1", bg: "rgba(14, 165, 233, 0.13)" },
    success: { fg: theme.color.addAction, bg: "rgba(29, 65, 27, 0.1)" },
    neutral: { fg: theme.color.textMuted, bg: theme.color.bg },
  })[t]

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

export const StatusIcon = styled.span<{ tone: Tono }>`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 5.6rem;
  width: 5.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => tono(p.tone, p.theme).bg};
  color: ${(p) => tono(p.tone, p.theme).fg};
`

export const StatusText = styled.div`
  min-width: 0;
`

export const StatusTag = styled.p<{ tone: Tono }>`
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => tono(p.tone, p.theme).fg};
`

export const StatusStep = styled.p`
  margin-top: 0.2rem;
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  text-overflow: ellipsis;
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
  flex: 1;
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

// Casillas con los días restantes; en rojo a partir de 2 días
export const Digits = styled.div<{ urgent?: boolean }>`
  display: flex;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.xs};

  span {
    border-color: ${(p) => (p.urgent ? "rgba(239, 68, 68, 0.45)" : p.theme.color.border)};
    color: ${(p) => (p.urgent ? "#b91c1c" : p.theme.color.textStrong)};
  }
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

// Acción del pedido: oscura si espera algo del estudiante, contorno si solo es para ver
export const ActionLink = styled(Link, { shouldForwardProp: (prop) => prop !== "primary" })<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
  border: 1px solid ${(p) => (p.primary ? p.theme.color.textStrong : p.theme.color.border)};
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.8rem 1.4rem;
  background: ${(p) => (p.primary ? p.theme.color.textStrong : p.theme.color.surface)};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.primary ? "white" : p.theme.color.text)};
  text-decoration: none;
  white-space: nowrap;
  transition: background 150ms ease, border-color 150ms ease;

  &:hover {
    border-color: ${(p) => (p.primary ? p.theme.color.neutralDarker : p.theme.color.textStrong)};
    background: ${(p) => (p.primary ? p.theme.color.neutralDarker : p.theme.color.surface)};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.4);
    outline-offset: 2px;
  }
`

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  min-height: 22rem;
  text-align: center;

  strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }

  p {
    max-width: 34rem;
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.textMuted};
    text-wrap: pretty;
  }
`
