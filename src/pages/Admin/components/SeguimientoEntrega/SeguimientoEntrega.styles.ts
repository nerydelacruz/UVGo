import styled from "@emotion/styled"
import { Tile, verdeClaro } from "../DashboardCard/DashboardCard.styles"

export const Encabezado = styled(Tile)`
  flex-direction: column;
  gap: 0.2rem;

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Numero = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};

  strong {
    font-size: ${(p) => p.theme.font.size.xl};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }
`

// Línea de tiempo vertical: punto + conector punteado en verde UVGo
export const Linea = styled.ol`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.xs} 0;
`

export const Paso = styled.li<{ hecho: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0 0 ${(p) => p.theme.space.lg} 2.4rem;

  &::before {
    content: "";
    position: absolute;
    top: 0.3rem;
    left: 0;
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid ${(p) => p.theme.color.addAction};
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => (p.hecho ? p.theme.color.addAction : p.theme.color.surface)};
  }

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 1.8rem;
    bottom: 0.2rem;
    left: 0.5rem;
    border-left: 2px dashed ${verdeClaro};
  }

  &:last-of-type {
    padding-bottom: 0;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    overflow-wrap: anywhere;
  }

  > span {
    align-self: flex-start;
    margin-top: 0.2rem;
  }
`

export const Nota = styled.p`
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(82, 82, 82, 0.05);
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
  text-wrap: pretty;
  overflow-wrap: anywhere;
`
