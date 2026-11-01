import styled from "@emotion/styled"
import { Tile } from "../DashboardCard/DashboardCard.styles"

export const Resumen = styled(Tile)`
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};

  > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  > div:last-of-type {
    align-items: flex-end;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.xxl};
    line-height: 1.1;
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Cambio = styled.em<{ sube: boolean }>`
  font-style: normal;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.sube ? p.theme.color.addAction : p.theme.color.textMuted)};
  font-variant-numeric: tabular-nums;
`

export const Grafica = styled.div`
  flex: 1;
  min-height: 16rem;
`

export const Globo = styled.div`
  white-space: nowrap;
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => p.theme.color.textStrong};
  padding: 0.4rem 1rem;
  font-size: ${(p) => p.theme.font.size.xs};
  color: white;
`
