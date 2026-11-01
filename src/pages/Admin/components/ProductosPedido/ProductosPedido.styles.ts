import styled from "@emotion/styled"
import { hairline } from "@/styles/shared.styles"

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  max-height: 40rem;
  overflow-y: auto;
  scrollbar-width: thin;
`

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.6);
`

export const Texto = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  strong {
    overflow: hidden;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Precio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;

  strong {
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }

  small {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
    font-variant-numeric: tabular-nums;
  }
`
