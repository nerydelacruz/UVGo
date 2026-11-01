import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { focusRing, hairline } from "@/styles/shared.styles"

// Verde claro con que arranca el degradado del fondo (gradient.layoutBg): pistas, celdas y barras sin resaltar.
// El énfasis de las gráficas es siempre color.addAction (verde UVGo).
export const verdeClaro = "#b8d4b6"

// Recuadro blanco dentro de una tarjeta (encabezados con dato, mosaicos de cifras)
export const Tile = styled.div`
  display: flex;
  min-width: 0;
  padding: ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.75);
`

// Tarjeta del bento: el mismo vidrio que Panel. "grow" la estira para llenar el alto de su columna.
export const Card = styled.section<{ grow?: boolean }>`
  display: flex;
  flex: ${(p) => (p.grow ? "1 1 auto" : "0 0 auto")};
  flex-direction: column;
  min-width: 0;
  padding: ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.md};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
`

export const CardTitle = styled.h2`
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const HeaderEnd = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

// Flecha al detalle: en hover toma el negro del botón activo de la barra lateral
export const Chevron = styled(Link)`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => p.theme.color.textMuted};
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover {
    background: ${(p) => p.theme.color.textStrong};
    color: white;
  }

  ${focusRing}
`

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  min-height: 0;
  margin-top: ${(p) => p.theme.space.md};
`

// Esqueleto estático (sin animación, como SkeletonRow) del alto que pida cada tarjeta
export const Skeleton = styled.div<{ height: string }>`
  height: ${(p) => p.height};
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(255, 255, 255, 0.6);
`

// EmptyState compacto para tarjetas pequeñas
export const CardEmpty = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.xs};
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.sm};
  text-align: center;

  strong {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  p {
    max-width: 30rem;
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
    text-wrap: pretty;
  }
`
