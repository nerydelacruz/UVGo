import styled from '@emotion/styled'
import { focusRing } from '@/styles/shared.styles'

export const Screen = styled.div`
  width: 100%; min-width: 0; padding: 8px; font-size: 1.4rem;
  display: flex; flex-direction: column; gap: 24px;
`
export const Card = styled.section`
  padding: 24px; border-radius: 24px; background: ${({ theme }) => theme.color.surfaceMuted};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex; flex-direction: column; gap: 16px; min-width: 0;
  h2 { font-size: 2rem; }
  p { line-height: 1.6; }
  @media (max-width: 640px) { padding: 16px; }
`
export const Fields = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;
  @media (max-width: 640px) { grid-template-columns: minmax(0, 1fr); }
`
export const Field = styled.label`
  display: flex; flex-direction: column; gap: 8px; min-width: 0;
  input, textarea {
    width: 100%; min-width: 0; padding: 12px; border: 1px solid #b5bdb4;
    border-radius: 12px; background: white; color: #262626; font: inherit;
    ${focusRing}
  }
  textarea { min-height: 80px; resize: vertical; }
`
export const Row = styled.fieldset`
  min-width: 0; padding: 16px; border: 1px solid #b5bdb4; border-radius: 16px;
  margin: 16px 0; legend { padding: 0 8px; font-weight: 600; }
  blockquote { padding: 12px; margin: 12px 0; background: #fff8; overflow-wrap: anywhere; }
`
export const Actions = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
`
