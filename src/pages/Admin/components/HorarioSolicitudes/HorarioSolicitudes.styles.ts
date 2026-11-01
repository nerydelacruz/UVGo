import styled from "@emotion/styled"
import { Tile } from "../DashboardCard/DashboardCard.styles"

export const Pico = styled(Tile)`
  align-items: center;
  gap: ${(p) => p.theme.space.md};

  div {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  div > strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
  }

  div > span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Calor = styled.div`
  display: grid;
  grid-template-columns: 4.4rem repeat(7, minmax(0, 1fr));
  gap: 0.6rem;
  margin-top: ${(p) => p.theme.space.sm};
  font-size: 1.1rem;
  color: ${(p) => p.theme.color.textFaint};
  font-variant-numeric: tabular-nums;
`

export const Rotulo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    justify-content: flex-start;
  }
`

// Intensidad 0–1 en verde UVGo; sin solicitudes queda en gris muy suave
export const Celda = styled.span<{ nivel: number }>`
  aspect-ratio: 1.4;
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => (p.nivel === 0 ? "rgba(82, 82, 82, 0.07)" : p.theme.color.addAction)};
  opacity: ${(p) => (p.nivel === 0 ? 1 : 0.25 + p.nivel * 0.75)};
`
