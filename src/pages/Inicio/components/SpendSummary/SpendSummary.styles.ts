import styled from "@emotion/styled"

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  min-width: 0;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.lg};
`

export const Header = styled.div`
  span {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  svg {
    color: ${(p) => p.theme.color.addAction};
  }
`

export const Total = styled.div`
  strong {
    display: block;
    font-size: 3rem;
    font-weight: ${(p) => p.theme.font.weight.bold};
    font-style: italic;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textMuted};
  }
`

// Barra partida: verde = productos, coral (fondo) = cargo de servicio; gris si aún no hay pagos
export const Bar = styled.div<{ vacia: boolean }>`
  height: 0.8rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.vacia ? "rgba(82, 82, 82, 0.12)" : p.theme.color.accent)};

  span {
    display: block;
    height: 100%;
    border-right: 2px solid white;
    background: ${(p) => p.theme.color.addAction};
    transition: width 400ms ease;
  }
`

export const Legend = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
  font-size: 1.1rem;
  color: ${(p) => p.theme.color.textFaint};

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  span::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => p.theme.color.addAction};
  }

  span + span::before {
    background: ${(p) => p.theme.color.accent};
  }

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const Figures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${(p) => p.theme.space.sm};
  margin-top: auto;

  div {
    border-radius: ${(p) => p.theme.radius.md};
    padding: 0.8rem 1rem;
    background: ${(p) => p.theme.color.surface};
  }

  span {
    display: block;
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  strong {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`
