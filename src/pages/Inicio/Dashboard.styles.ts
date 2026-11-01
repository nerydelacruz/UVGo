import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const Page = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  gap: ${(p) => p.theme.space.lg};
  padding: ${(p) => p.theme.space.xl};
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  flex: 1;
  min-width: 0;
  min-height: 0;
`

export const GridScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  /* oculta la barra visualmente, el scroll sigue funcionando */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.lg};
`

export const Count = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${(p) => p.theme.space.xs};
  flex-shrink: 0;
  font-size: ${(p) => p.theme.font.size.xxl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};

  span {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textMuted};
  }
`

export const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid ${(p) => p.theme.color.border};
  background: ${(p) => p.theme.color.surface};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.lg};
  color: ${(p) => p.theme.color.textDisabled};

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: ${(p) => p.theme.font.size.md};
    color: ${(p) => p.theme.color.text};

    &::placeholder {
      color: ${(p) => p.theme.color.textDisabled};
    }
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: ${(p) => p.theme.space.lg};
`

// Saludo con la fecha y el atajo principal (nueva cotización)
export const Greeting = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};

  h1 {
    font-size: ${(p) => p.theme.font.size.xxl};
    font-weight: ${(p) => p.theme.font.weight.bold};
    letter-spacing: -0.02em;
    color: ${(p) => p.theme.color.textStrong};
  }

  p {
    margin-top: 0.2rem;
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.textMuted};
  }

  p span::first-letter {
    text-transform: uppercase;
  }
`

export const NewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 1rem 1.8rem;
  background: ${(p) => p.theme.color.textStrong};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  text-decoration: none;
  box-shadow: 0 8px 20px -10px rgb(0 0 0 / 0.5);
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.neutralDarker};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.4);
    outline-offset: 2px;
  }
`

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const TrendsRow = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: ${(p) => p.theme.breakpoint.lg}) {
    flex-direction: column;
  }
`

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  width: 34rem;
  flex-shrink: 0;
  min-height: 0;
`
