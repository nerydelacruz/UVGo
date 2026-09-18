import styled from "@emotion/styled"

export const Viewport = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`
