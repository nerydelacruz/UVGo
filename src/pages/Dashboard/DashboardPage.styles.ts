import styled from "@emotion/styled"

export const Page = styled.div`
  display: flex;
`

export const Frame = styled.div`
  height: 100vh;
  position: relative;
  margin: 0 auto;
  aspect-ratio: 16 / 11;
  width: 100%;
  overflow: hidden;
  padding: ${(p) => p.theme.space.lg};
  box-shadow: ${(p) => p.theme.shadow.xl};
  background-color: ${(p) => p.theme.color.surface};
  background-image: ${(p) => p.theme.gradient.layoutBg};
`

export const PhotoLayer = styled.div`
  pointer-events: none;
  position: absolute;
  inset-block: 0;
  right: 0;
  width: 55%;
  mask-image: linear-gradient(to right, transparent, black 30%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 30%);
`

export const PhotoImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

export const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1.6rem;
`

export const Body = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  gap: 1.6rem;
`

export const Left = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  gap: 1.2rem;
`

export const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  gap: 1.6rem;
`
