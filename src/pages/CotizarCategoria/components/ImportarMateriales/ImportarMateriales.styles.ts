import styled from "@emotion/styled"

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  max-height: 40rem;
  padding: 0.2rem;
  overflow-y: auto;
  list-style: none;
`

export const Fila = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 10rem auto;
  align-items: end;
  gap: ${(p) => p.theme.space.sm};
`
