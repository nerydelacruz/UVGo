import styled from "@emotion/styled"

export const Box = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
  width: 100%;
  height: 100%;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1.5px dashed ${(p) => (p.selected ? p.theme.color.neutralDark : p.theme.color.textDisabled)};
  background: ${(p) => (p.selected ? p.theme.color.neutralDark : "rgba(0, 0, 0, 0.03)")};
  color: ${(p) => (p.selected ? "white" : p.theme.color.textDisabled)};
`

export const Caption = styled.span`
  font-size: ${(p) => p.theme.font.size.sm};
  letter-spacing: 0.02em;
`
