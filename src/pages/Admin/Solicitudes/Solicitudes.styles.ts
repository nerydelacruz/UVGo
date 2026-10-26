import styled from "@emotion/styled"

export * from "@/styles/shared.styles"

export const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(30rem, 38rem) minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    flex: none;
  }
`
