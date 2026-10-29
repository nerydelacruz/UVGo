import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`

// Toda la fila selecciona el pedido; el seleccionado se ve en el mapa y en las tarjetas de la derecha
export const Fila = styled.button<{ activa: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  width: 100%;
  padding: ${(p) => p.theme.space.sm};
  border: 1px solid ${(p) => (p.activa ? "rgba(29, 65, 27, 0.25)" : hairline)};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => (p.activa ? p.theme.color.surface : "rgba(255, 255, 255, 0.45)")};
  box-shadow: ${(p) => (p.activa ? p.theme.shadow.md : "none")};
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease-out, border-color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.surface};
  }

  ${focusRing}

  @media (max-width: 1280px) {
    grid-template-columns: auto minmax(0, 1fr) auto auto;

    time {
      display: none;
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: auto minmax(0, 1fr) auto;

    > span:last-of-type {
      display: none;
    }
  }
`

export const Icono = styled.span<{ activa: boolean }>`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.activa ? p.theme.color.addAction : "rgba(82, 82, 82, 0.06)")};
  color: ${(p) => (p.activa ? "white" : p.theme.color.textMuted)};
`

export const Texto = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  strong,
  small {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    font-variant-numeric: tabular-nums;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Fecha = styled.time`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

// Indicador a la derecha: "En mapa" (negro, como el botón activo de la barra lateral) o "Ver ruta"
export const Estado = styled.span<{ activa: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  height: 3.2rem;
  padding: 0 ${(p) => p.theme.space.md};
  border: 1px solid ${(p) => (p.activa ? p.theme.color.textStrong : hairline)};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.activa ? p.theme.color.textStrong : p.theme.color.surface)};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.activa ? "white" : p.theme.color.textMuted)};
  white-space: nowrap;
`
