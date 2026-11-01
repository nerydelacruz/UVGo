import styled from "@emotion/styled"
import { focusRing } from "@/styles/shared.styles"
import { Tile } from "../DashboardCard/DashboardCard.styles"

export const Contenido = styled(Tile)`
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`

export const Fila = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
`

export const Espera = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Cuenta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;

  strong {
    font-size: ${(p) => p.theme.font.size.xxl};
    line-height: 1.1;
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

// PrimaryButton compacto, negro como el botón activo de la barra lateral
export const Accion = styled.button`
  flex-shrink: 0;
  height: 3.2rem;
  padding: 0 ${(p) => p.theme.space.lg};
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.textStrong};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  cursor: pointer;
  transition: background 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.neutralDarker};
  }

  ${focusRing}
`
