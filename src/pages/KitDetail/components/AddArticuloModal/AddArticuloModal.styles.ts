import styled from "@emotion/styled"

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: ${(p) => p.theme.space.lg};
  background: rgba(10, 10, 10, 0.35);
  backdrop-filter: blur(4px);
`

export const Dialog = styled.form`
  width: 100%;
  max-width: 48rem;
  max-height: calc(100vh - 3.2rem);
  overflow-y: auto;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.xl};
  padding: ${(p) => p.theme.space.xl};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  margin-bottom: ${(p) => p.theme.space.xl};
`

export const Title = styled.h2`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Subtitle = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  height: 3.2rem;
  width: 3.2rem;
  border-radius: ${(p) => p.theme.radius.full};
  color: ${(p) => p.theme.color.textMuted};
  transition: background 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.bg};
  }
`

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
`

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${(p) => p.theme.space.md};
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textMuted};
`

const inputBase = (p: { theme: import("@/styles/theme").Theme }) => `
  width: 100%;
  border-radius: ${p.theme.radius.md};
  border: 1px solid ${p.theme.color.border};
  background: ${p.theme.color.surface};
  padding: ${p.theme.space.md} ${p.theme.space.md};
  font-size: ${p.theme.font.size.sm};
  font-weight: ${p.theme.font.weight.medium};
  color: ${p.theme.color.text};
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${p.theme.color.textDisabled};
  }

  &:focus {
    border-color: ${p.theme.color.accent};
    box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.18);
  }
`

export const Input = styled.input`
  ${(p) => inputBase(p)}
`

export const TextArea = styled.textarea`
  ${(p) => inputBase(p)}
  resize: vertical;
  min-height: 7.2rem;
`

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.sm};
  height: 100%;
  min-width: 12rem;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid ${(p) => p.theme.color.border};
  padding: 0 ${(p) => p.theme.space.sm};
`

export const StepButton = styled.button`
  display: grid;
  place-items: center;
  height: 2.6rem;
  width: 2.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  color: ${(p) => p.theme.color.textMuted};
  font-size: ${(p) => p.theme.font.size.md};

  &:hover:not(:disabled) {
    border-color: ${(p) => p.theme.color.accent};
    color: ${(p) => p.theme.color.accent};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const Qty = styled.span`
  min-width: 2rem;
  text-align: center;
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.xl};
`

export const CancelButton = styled.button`
  border-radius: ${(p) => p.theme.radius.full};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.xl};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textMuted};
  transition: background 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.bg};
  }
`

export const SubmitButton = styled.button`
  border-radius: ${(p) => p.theme.radius.full};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.xl};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  background: ${(p) => p.theme.color.accent};
  transition: opacity 150ms ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
