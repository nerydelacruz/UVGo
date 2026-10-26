import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const SectionTitle = styled.h3`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.textStrong};

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  max-height: 26rem;
  margin-top: ${(p) => p.theme.space.sm};
  padding: 0.2rem;
  overflow-y: auto;
  list-style: none;
`

export const Item = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(242, 244, 240, 0.6);
`

export const ItemThumb = styled.div`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.surface};
  color: ${(p) => p.theme.color.textFaint};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const ItemInfo = styled.div`
  min-width: 0;

  strong {
    display: block;
    overflow: hidden;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span {
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.surface};

  button {
    display: grid;
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    border: 0;
    border-radius: ${(p) => p.theme.radius.full};
    background: transparent;
    color: ${(p) => p.theme.color.text};
    cursor: pointer;
    transition: background 150ms ease-out;

    &:hover:not(:disabled) {
      background: rgba(82, 82, 82, 0.08);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    ${focusRing}
  }

  input {
    width: 4rem;
    height: 3.2rem;
    border: 0;
    background: transparent;
    font: inherit;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
    text-align: center;
    outline: 0;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      appearance: none;
    }

    &:focus-visible {
      border-radius: ${(p) => p.theme.radius.sm};
      box-shadow: 0 0 0 2px ${(p) => p.theme.color.accent};
    }
  }
`

export const RemoveButton = styled.button`
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: transparent;
  color: ${(p) => p.theme.color.textFaint};
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover {
    background: rgba(239, 68, 68, 0.08);
    color: #b91c1c;
  }

  ${focusRing}
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Optional = styled.span`
  font-weight: 400;
  color: ${(p) => p.theme.color.textFaint};
`

export const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.lg} 0;
  text-align: center;
`

export const SuccessIcon = styled.span`
  display: grid;
  place-items: center;
  width: 5.6rem;
  height: 5.6rem;
  margin-bottom: ${(p) => p.theme.space.sm};
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(29, 65, 27, 0.1);
  color: ${(p) => p.theme.color.addAction};
`
