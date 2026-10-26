import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const Item = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.sm};
  width: 100%;
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
  border: 1px solid ${(p) => (p.selected ? p.theme.color.accent : hairline)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => (p.selected ? p.theme.color.surface : "rgba(255, 255, 255, 0.45)")};
  box-shadow: ${(p) => (p.selected ? "0 0 0 3px rgba(224, 122, 95, 0.16)" : "none")};
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.surface};
  }

  ${focusRing}
`

export const Top = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
  width: 100%;
`

export const Name = styled.span`
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Meta = styled.span`
  flex-shrink: 0;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;
`

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.xs};
`
