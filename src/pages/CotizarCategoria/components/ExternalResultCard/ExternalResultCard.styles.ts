import styled from "@emotion/styled"
import { focusRing, hairline, successWash } from "../../CotizarCategoria.styles"

export const Card = styled.article<{ added: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  flex-shrink: 0;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md};
  border: 1px solid ${(p) => (p.added ? "rgba(29, 65, 27, 0.35)" : hairline)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => (p.added ? p.theme.color.surface : "rgba(255, 255, 255, 0.45)")};
  transition: background 150ms ease-out, border-color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.surface};
  }
`

export const Thumb = styled.div`
  display: grid;
  place-items: center;
  width: 5.6rem;
  height: 5.6rem;
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

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`

export const Title = styled.h3`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  line-height: 1.3;
  color: ${(p) => p.theme.color.text};
`

export const Description = styled.p`
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const AddButton = styled.button<{ added: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  height: 3.6rem;
  padding: 0 ${(p) => p.theme.space.lg};
  border: 1px solid ${(p) => (p.added ? "transparent" : hairline)};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.added ? successWash : p.theme.color.surface)};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.added ? p.theme.color.addAction : p.theme.color.text)};
  white-space: nowrap;
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover:not(:disabled) {
    background: ${(p) => (p.added ? "rgba(29, 65, 27, 0.16)" : p.theme.color.textStrong)};
    color: ${(p) => (p.added ? p.theme.color.addAction : "white")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`
