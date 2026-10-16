import styled from "@emotion/styled"

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(28rem, 34rem) minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    flex: none;
  }
`
