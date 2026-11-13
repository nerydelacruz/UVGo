import styled from "@emotion/styled"

export const Nota = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const Acciones = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
`

// Mientras llega el periodo nuevo se ve el anterior atenuado
export const Secciones = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  transition: opacity 150ms ease-out;

  &[aria-busy="true"] {
    opacity: 0.6;
  }
`

// Dos tarjetas lado a lado en escritorio; una sobre otra en tablet y móvil
export const Fila = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
  }
`
