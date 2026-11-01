import styled from "@emotion/styled"
import { Tile } from "../DashboardCard/DashboardCard.styles"

// Portada del pedido: degradado verde-crema del fondo, como la foto del vehículo en la referencia
export const Portada = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-height: 11.2rem;
  padding: ${(p) => p.theme.space.lg};
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.gradient.layoutBg};

  strong {
    max-width: 70%;
    font-size: ${(p) => p.theme.font.size.lg};
    line-height: 1.2;
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    overflow-wrap: anywhere;
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textMuted};
    font-variant-numeric: tabular-nums;
  }

  > svg {
    position: absolute;
    right: -0.8rem;
    bottom: -1.2rem;
    color: ${(p) => p.theme.color.addAction};
    opacity: 0.85;
  }
`

export const Plazo = styled(Tile)`
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};

  div {
    display: flex;
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
    font-variant-numeric: tabular-nums;
  }
`

export const Anillo = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 5.6rem;
  height: 5.6rem;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  b {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }
`

export const Mosaicos = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: ${(p) => p.theme.space.sm};
`

export const Mosaico = styled(Tile)<{ horizontal?: boolean }>`
  flex-direction: ${(p) => (p.horizontal ? "row" : "column")};
  align-items: ${(p) => (p.horizontal ? "center" : "stretch")};
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  > span:first-child {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }

  > strong {
    font-size: ${(p) => p.theme.font.size.xl};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }

  > small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

// Barras apiladas tipo batería: una por etapa, llenas hasta la actual
export const Etapas = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.3rem;
  width: 2.4rem;
  align-self: center;
`

export const Etapa = styled.span<{ llena: boolean }>`
  height: 0.8rem;
  border-radius: 0.3rem;
  background: ${(p) => (p.llena ? p.theme.color.addAction : "rgba(82, 82, 82, 0.1)")};
`
