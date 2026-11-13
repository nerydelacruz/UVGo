import styled from "@emotion/styled"

// 4 columnas en escritorio, 2 en tablet y 1 en móvil
export const Cuadricula = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

// El mismo vidrio que las tarjetas del panel; "vacio" es el esqueleto mientras carga
export const Mosaico = styled.div<{ vacio?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
  min-width: 0;
  min-height: 11.2rem;
  padding: ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => (p.vacio ? "rgba(255, 255, 255, 0.4)" : p.theme.color.surfaceMuted)};
  box-shadow: ${(p) => (p.vacio ? "none" : p.theme.shadow.md)};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
`

export const Etiqueta = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
`

export const Cifra = styled.strong`
  font-size: ${(p) => p.theme.font.size.xxl};
  line-height: 1.15;
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
`

export const Detalle = styled.span`
  margin-top: auto;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`
