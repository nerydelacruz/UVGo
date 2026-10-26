import styled from "@emotion/styled"
import { hairline } from "../../CotizarCategoria.styles"

export const Toolbar = styled.form`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.md};
`

export const Row = styled.label<{ selected: boolean }>`
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  align-items: center;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg} ${(p) => p.theme.space.md} ${(p) => p.theme.space.md};
  border: 1px solid ${(p) => (p.selected ? "rgba(29, 65, 27, 0.35)" : hairline)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => (p.selected ? p.theme.color.surface : "rgba(255, 255, 255, 0.45)")};
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.surface};
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${(p) => p.theme.color.accent};
    outline-offset: 2px;
  }
`

export const Check = styled.input`
  width: 2rem;
  height: 2rem;
  margin: 0;
  accent-color: ${(p) => p.theme.color.addAction};
  cursor: inherit;
`

export const Info = styled.div`
  min-width: 0;
`

export const Name = styled.span`
  display: block;
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Description = styled.span`
  display: block;
  margin-top: 0.2rem;
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Price = styled.span`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  font-variant-numeric: tabular-nums;
`

export const Thumb = styled.div`
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textFaint};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const NoPrice = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`
