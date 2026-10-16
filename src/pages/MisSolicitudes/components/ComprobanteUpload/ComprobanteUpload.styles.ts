import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const Dropzone = styled.label<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.xs};
  min-height: 12rem;
  padding: ${(p) => p.theme.space.lg};
  border: 1.5px dashed ${(p) => (p.dragging ? p.theme.color.accent : "rgba(82, 82, 82, 0.28)")};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => (p.dragging ? "rgba(224, 122, 95, 0.08)" : "rgba(255, 255, 255, 0.55)")};
  text-align: center;
  color: ${(p) => p.theme.color.textFaint};
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;

  &:hover {
    border-color: ${(p) => p.theme.color.accent};
    background: rgba(255, 255, 255, 0.85);
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${(p) => p.theme.color.accent};
    outline-offset: 2px;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  span {
    font-size: 1.1rem;
  }

  /* el input queda accesible por teclado pero invisible */
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
`

export const Selected = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
`

export const Preview = styled.div`
  display: grid;
  place-items: center;
  width: 6.4rem;
  height: 6.4rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(242, 244, 240, 0.9);
  color: ${(p) => p.theme.color.textFaint};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const FileInfo = styled.div`
  min-width: 0;

  strong {
    display: block;
    overflow: hidden;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
    font-variant-numeric: tabular-nums;
  }
`

export const RemoveButton = styled.button`
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: transparent;
  color: ${(p) => p.theme.color.textFaint};
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.08);
    color: #b91c1c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`
