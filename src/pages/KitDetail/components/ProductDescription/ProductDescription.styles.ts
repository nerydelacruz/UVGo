import styled from "@emotion/styled"

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xl};
  width: 28%;
  min-width: 0;
  flex-shrink: 0;
  overflow-y: auto;

  /* oculta la barra visualmente, el scroll sigue funcionando */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SectionTitle = styled.h2`
  font-size: ${(p) => p.theme.font.size.xxl};
  font-weight: 400;
  letter-spacing: -0.03em;
  color: ${(p) => p.theme.color.neutralDark};
`

export const Paragraph = styled.p`
  margin-top: ${(p) => p.theme.space.md};
  font-size: ${(p) => p.theme.font.size.sm};
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.color.textFaint};
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
`

export const Item = styled.div`
  border-bottom: 1px solid ${(p) => p.theme.color.border};

  &:first-of-type {
    border-top: 1px solid ${(p) => p.theme.color.border};
  }
`

export const ItemHead = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${(p) => p.theme.space.lg} 0;
  color: ${(p) => p.theme.color.neutralDark};
`

export const ItemTitle = styled.span`
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  letter-spacing: -0.02em;
`

export const ItemBody = styled.p`
  padding-bottom: ${(p) => p.theme.space.lg};
  font-size: ${(p) => p.theme.font.size.sm};
  line-height: 1.4;
  color: ${(p) => p.theme.color.textFaint};
`
