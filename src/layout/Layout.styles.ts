import styled from "@emotion/styled"

// Marco de toda la app: sidebar a la izquierda y la página activa a la derecha, sobre el degradado verde-crema
export const Frame = styled.div`
  display: grid;
  grid-template-columns: 7.2rem minmax(0, 1fr);
  gap: ${(p) => p.theme.space.lg};
  height: 100dvh;
  padding: ${(p) => p.theme.space.lg};
  overflow: hidden;
  background-color: ${(p) => p.theme.color.surface};
  background-image: ${(p) => p.theme.gradient.layoutBg};
  color: ${(p) => p.theme.color.text};

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    padding: ${(p) => p.theme.space.md};
  }
`

export const Main = styled.main`
  display: flex;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
`
