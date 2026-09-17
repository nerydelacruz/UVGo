import styled from "@emotion/styled"

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
