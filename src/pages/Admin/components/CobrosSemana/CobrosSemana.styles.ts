import styled from "@emotion/styled"
import { Tile, verdeClaro } from "../DashboardCard/DashboardCard.styles"

export const Contenido = styled(Tile)`
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`

export const Fila = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  > span {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textMuted};
  }
`

export const Total = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};

  > div:first-of-type {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Barras = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1.2rem);
  align-items: end;
  gap: 0.4rem;
  height: 5.6rem;
`

export const Barra = styled.span<{ alto: number; hoy: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
  height: 100%;
  font-size: 0.9rem;
  color: ${(p) => p.theme.color.textFaint};

  &::before {
    content: "";
    width: 100%;
    height: ${(p) => Math.max(p.alto * 100, 8)}%;
    max-height: calc(100% - 1.4rem);
    border-radius: 0.4rem;
    background: ${(p) => (p.hoy ? p.theme.color.addAction : verdeClaro)};
  }
`
