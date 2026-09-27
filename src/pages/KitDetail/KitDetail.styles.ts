import styled from "@emotion/styled"

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  width: 100%;
  min-width: 0;
  height: 100%;
`

export const Main = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: ${(p) => p.theme.space.lg};
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.lg} 0;
`
