import styled from "@emotion/styled"
import { accentWash, hairline } from "@/styles/shared.styles"
import { Tile } from "../DashboardCard/DashboardCard.styles"

// Conductor asignado (o el aviso de que falta)
export const Actual = styled(Tile)`
  align-items: center;
  gap: ${(p) => p.theme.space.md};

  div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 0.2rem;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const Avatar = styled.span`
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.textStrong};
  color: white;
`

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.md};

  label {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textMuted};
  }
`

export const Selector = styled.select`
  height: 4.4rem;
  padding: 0 ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.text};
  cursor: pointer;
  transition: border-color 150ms ease-out;

  &:focus-visible {
    border-color: ${(p) => p.theme.color.accent};
    box-shadow: 0 0 0 3px ${accentWash};
    outline: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.sm};

  button:first-of-type {
    flex: 1;
  }
`

export const Nota = styled.p`
  margin-top: ${(p) => p.theme.space.md};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textMuted};
`
