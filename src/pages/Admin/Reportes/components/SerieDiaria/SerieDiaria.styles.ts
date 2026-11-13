import styled from "@emotion/styled"
import { Tile } from "../../../components/DashboardCard/DashboardCard.styles"

export const Total = styled(Tile)`
  flex-direction: column;

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

export const Grafica = styled.div`
  height: 22rem;
  min-width: 0;
`
