import styled from "@emotion/styled"
import { hairline } from "@/styles/shared.styles"

export const StyledDialog = styled.dialog<{ wide?: boolean }>`
  width: min(${(p) => (p.wide ? "64rem" : "48rem")}, calc(100vw - 3.2rem));
  max-height: calc(100dvh - 3.2rem);
  /* el reset de Tailwind quita el margin: auto con el que el navegador centra el <dialog> */
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surface};
  box-shadow: ${(p) => p.theme.shadow.xl};
  color: ${(p) => p.theme.color.text};

  &::backdrop {
    background: rgba(10, 10, 10, 0.32);
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  padding: ${(p) => p.theme.space.xl};
`

export const FormBody = Body.withComponent("form")

export const DialogTitle = styled.h2`
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};
  text-wrap: balance;
`

export const DialogText = styled.p`
  margin-top: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
  text-wrap: pretty;

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`

export const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(242, 244, 240, 0.6);

  strong {
    display: block;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};

  input,
  textarea {
    width: 100%;
    padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
    border: 1px solid ${hairline};
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.color.surface};
    font: inherit;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.text};
    outline: 0;
    transition: border-color 150ms ease-out;
  }

  input {
    height: 4.4rem;
  }

  textarea {
    min-height: 8rem;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: ${(p) => p.theme.color.accent};
    box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.16);
  }
`

export const PriceInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};

  > span {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  input {
    font-variant-numeric: tabular-nums;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(p) => p.theme.space.sm};
  padding-top: ${(p) => p.theme.space.sm};
`
