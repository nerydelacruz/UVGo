import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { accentWash, focusRing, hairline } from "@/styles/shared.styles"

export * from "@/styles/shared.styles"

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    flex: none;
  }
`

export const UploadButton = styled.button`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.md};
  min-height: 24rem;
  margin-top: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.xl};
  border: 2px dashed ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceFaint};
  text-align: center;
  color: ${(p) => p.theme.color.textMuted};
  cursor: pointer;
  transition: border-color 150ms ease-out, background 150ms ease-out;

  &:hover {
    border-color: ${(p) => p.theme.color.accent};
    background: ${accentWash};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    max-width: 26rem;
    font-size: ${(p) => p.theme.font.size.sm};
    text-wrap: pretty;
  }

  ${focusRing}
`

export const UploadIcon = styled.span`
  display: grid;
  place-items: center;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => p.theme.color.accent};
  background: ${accentWash};
`

export const Categorias = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(14rem, 1fr);
  flex: 1;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const CategoriaCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.md};
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.textStrong};
    color: white;
  }

  ${focusRing}
`

// Categoría aún sin catálogo: misma forma que CategoriaCard, pero no navega.
// Deshabilitado con opacity 0.5 (el tag queda a opacidad completa para que se lea).
export const CategoriaDeshabilitada = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.lg};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  cursor: not-allowed;
  user-select: none;
`

export const ContenidoDeshabilitado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  opacity: 0.5;
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const IconoDeshabilitado = styled.span`
  display: grid;
  place-items: center;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textStrong};
`

export const ProximamenteTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.space.xs};
  padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.md};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${accentWash};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`
