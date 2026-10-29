import styled from "@emotion/styled"
import { Tile } from "../DashboardCard/DashboardCard.styles"

export const Encabezado = styled(Tile)`
  align-items: center;
  gap: ${(p) => p.theme.space.md};

  div {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  div > strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  div > span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

// Avatar del repartidor, como el avatar de la barra lateral
export const Avatar = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.gradient.avatarWarm};
  color: ${(p) => p.theme.color.textStrong};
`

export const Cifras = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.sm};
`

export const Cifra = styled(Tile)`
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.sm};
  text-align: center;

  svg {
    color: ${(p) => p.theme.color.addAction};
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
