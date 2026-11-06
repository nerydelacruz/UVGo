import styled from "@emotion/styled"
import { focusRing } from "@/styles/shared.styles"

export * from "@/styles/shared.styles"

// Filtros y botón de carga, uno junto al otro
export const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
`

export const CargarButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.textStrong};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.surface};
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 150ms ease-out;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }

  svg[data-cargando="true"] {
    animation: cargarGira 0.9s linear infinite;
  }

  @keyframes cargarGira {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    svg[data-cargando="true"] {
      animation: none;
    }
  }

  ${focusRing}
`

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(30rem, 38rem) minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    flex: none;
  }
`
