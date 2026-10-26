import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import { focusRing } from "@/styles/shared.styles"

export * from "@/styles/shared.styles"

export const Tabs = styled.nav`
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  gap: ${(p) => p.theme.space.xs};
  padding: ${(p) => p.theme.space.xs};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surfaceFaint};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
`

export const Tab = styled(NavLink)`
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.full};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
  white-space: nowrap;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover {
    color: ${(p) => p.theme.color.text};
    background: rgba(255, 255, 255, 0.6);
  }

  &.active {
    color: white;
    background: ${(p) => p.theme.color.textStrong};
  }

  ${focusRing}
`

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    flex: none;
  }
`

export const SelectionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.md} ${(p) => p.theme.space.md} ${(p) => p.theme.space.xl};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.md};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
`

export const SelectionSummary = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
  font-variant-numeric: tabular-nums;

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const SelectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
`
