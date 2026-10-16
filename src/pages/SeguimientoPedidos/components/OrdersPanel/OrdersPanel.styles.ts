import styled from "@emotion/styled"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

export const Panel = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: ${(p) => p.theme.space.xl} ${(p) => p.theme.space.lg} 0;

  @media (max-width: 1180px) {
    grid-column: 2;
    max-height: none;
  }

  @media (max-width: 640px) {
    grid-column: 1;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(p) => p.theme.space.sm};
`

export const CountBadge = styled.span`
  display: grid;
  place-items: center;
  min-width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.7rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.accent};
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
`

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.lg};
  border: 1px solid ${tracking.hairline};
  border-radius: ${(p) => p.theme.radius.md};
  padding: 0 ${(p) => p.theme.space.md};
  background: ${tracking.pageBg};
  color: ${(p) => p.theme.color.textFaint};
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:focus-within {
    border-color: ${(p) => p.theme.color.accent};
    box-shadow: 0 0 0 3px ${tracking.accentWash};
  }

  input {
    flex: 1;
    min-width: 0;
    height: 4rem;
    border: 0;
    outline: 0;
    background: transparent;
    font: inherit;
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.text};
  }

  input::placeholder {
    color: ${(p) => p.theme.color.textDisabled};
  }
`

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.xs};
  margin-top: ${(p) => p.theme.space.md};
`

export const FilterChip = styled.button<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid ${(p) => (p.active ? p.theme.color.textStrong : tracking.hairline)};
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.5rem 1rem;
  background: ${(p) => (p.active ? p.theme.color.textStrong : p.theme.color.surface)};
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => (p.active ? "white" : p.theme.color.textMuted)};
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${(p) => p.theme.color.textStrong};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.md};
  margin: ${(p) => p.theme.space.lg} -${(p) => p.theme.space.lg} 0;
  padding: 0 ${(p) => p.theme.space.lg} ${(p) => p.theme.space.lg};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(82, 82, 82, 0.2) transparent;
`

export const SectionLabel = styled.h3`
  margin-top: ${(p) => p.theme.space.sm};
  padding: 0 ${(p) => p.theme.space.xs};
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.textFaint};
`

const selectableCard = styled.article<{ isSelected: boolean }>`
  flex: 0 0 auto;
  border: 1px solid ${(p) => (p.isSelected ? p.theme.color.accent : tracking.hairline)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => (p.isSelected ? `0 0 0 3px ${tracking.accentWash}` : "none")};
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;

  &:hover {
    border-color: ${(p) => (p.isSelected ? p.theme.color.accent : "rgba(82, 82, 82, 0.24)")};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`

export const OrderCard = styled(selectableCard)`
  padding: ${(p) => p.theme.space.lg};
`

export const CompactCard = styled(selectableCard)`
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
`

export const OrderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
`

export const OrderName = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  line-height: 1.3;
  color: ${(p) => p.theme.color.textStrong};
`

export const OrderNumber = styled.p`
  margin-top: 0.2rem;
  font-size: 1.1rem;
  color: ${(p) => p.theme.color.textFaint};
`

export const RouteRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(4rem, 1fr) auto;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.lg};
`

export const RouteNode = styled.span<{ end?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  white-space: nowrap;
  color: ${(p) => p.theme.color.text};

  > span {
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid ${(p) => p.theme.color.textStrong};
    border-radius: ${(p) => p.theme.radius.full};
  }

  > svg {
    color: ${(p) => p.theme.color.accent};
  }
`

export const RouteTrack = styled.span<{ moving: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${(p) => (p.moving ? p.theme.color.accent : p.theme.color.textDisabled)};

  > svg {
    flex: 0 0 auto;
  }
`

export const RouteLine = styled.span`
  flex: 1;
  border-top: 2px dashed currentColor;
  opacity: 0.55;
`

export const RouteDates = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.sm};

  div:last-of-type {
    text-align: right;
  }

  span, strong {
    display: block;
  }

  span {
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    margin-top: 0.1rem;
    font-size: 1.15rem;
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textMuted};
  }
`

export const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${tracking.pageBg};

  div {
    padding: 0.8rem 1rem;
  }

  div + div {
    border-left: 1px solid ${tracking.hairline};
  }

  span, strong {
    display: block;
  }

  span {
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    margin-top: 0.1rem;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const OrderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.md};
`

export const Price = styled.p`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.color.textStrong};
`

export const ActionButton = styled.button`
  border: 0;
  border-radius: ${(p) => p.theme.radius.md};
  padding: 0.9rem 1.6rem;
  background: ${(p) => p.theme.color.accent};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;

  &:hover {
    filter: brightness(0.94);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: 2px;
  }
`

export const CompactMeta = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.sm};

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const EmptyState = styled.p`
  padding: ${(p) => p.theme.space.xl} 0;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`
