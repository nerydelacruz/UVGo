import styled from "@emotion/styled"
import { Tile } from "../../../components/DashboardCard/DashboardCard.styles"

export const Lista = styled(Tile)`
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`

// Etiqueta | barra | cantidad | porcentaje
export const Fila = styled.div`
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr) 3.6rem 4rem;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};

  span {
    color: ${(p) => p.theme.color.textMuted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  strong,
  small {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Pista = styled.div`
  height: 0.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(184, 212, 182, 0.35);
  overflow: hidden;
`

// Un mínimo visible solo cuando hay al menos una solicitud
export const Barra = styled.div<{ ancho: number }>`
  width: ${(p) => (p.ancho > 0 ? `max(${p.ancho * 100}%, 0.8rem)` : "0")};
  height: 100%;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.addAction};
`
