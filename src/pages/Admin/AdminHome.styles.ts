import styled from "@emotion/styled"

export const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};
`

export const Header = styled.header`
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.xs} 0;
`

export const Eyebrow = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
`

export const Title = styled.h1`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.display};
  line-height: 1.1;
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  text-wrap: balance;
`

export const Nota = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

// Bento de 4 columnas en escritorio (la de pedidos y mapa es doble), 2 en tablet y 1 en móvil.
// Cada columna apila sus tarjetas; la última de cada una se estira para que todas terminen a la misma altura.
export const Bento = styled.div`
  display: grid;
  flex-shrink: 0;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Columna = styled.div<{ ancha?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  min-width: 0;

  /* En tablet la columna de pedidos y mapa va primero y ocupa todo el ancho */
  @media (max-width: 1280px) {
    order: ${(p) => (p.ancha ? -1 : 0)};
    grid-column: ${(p) => (p.ancha ? "1 / -1" : "auto")};
  }

  @media (max-width: 640px) {
    grid-column: auto;
  }
`
