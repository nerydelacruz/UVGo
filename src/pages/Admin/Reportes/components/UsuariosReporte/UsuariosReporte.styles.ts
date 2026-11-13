import styled from "@emotion/styled"
import { Tile } from "../../../components/DashboardCard/DashboardCard.styles"

export const Cifras = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.xl};
    line-height: 1.15;
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textMuted};
  }

  small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Subtitulo = styled.h3`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textMuted};
`

export const Nota = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`
