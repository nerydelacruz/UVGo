import styled from "@emotion/styled"

export const Hero = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
`

export const ImageSlot = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  margin: 0 ${(p) => p.theme.space.xxl};
`
