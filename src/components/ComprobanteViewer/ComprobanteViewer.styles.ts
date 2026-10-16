import styled from "@emotion/styled"
import { focusRing, hairline } from "@/styles/shared.styles"

export const Card = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: ${(p) => p.theme.space.md};
  padding: ${(p) => p.theme.space.sm};
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
`

export const ThumbButton = styled.button`
  display: grid;
  place-items: center;
  width: 7.2rem;
  height: 7.2rem;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(242, 244, 240, 0.9);
  color: ${(p) => p.theme.color.textFaint};
  cursor: zoom-in;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:disabled {
    cursor: default;
  }

  ${focusRing}
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  strong {
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
    font-variant-numeric: tabular-nums;
  }
`

export const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.md};
  margin-top: ${(p) => p.theme.space.xs};

  button,
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0;
    border: 0;
    border-radius: ${(p) => p.theme.radius.sm};
    background: none;
    font: inherit;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;

    ${focusRing}
  }
`

// Vista completa dentro del diálogo
export const Full = styled.div`
  display: grid;
  place-items: center;
  max-height: 70dvh;
  overflow: auto;
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(242, 244, 240, 0.9);

  img {
    max-width: 100%;
    max-height: 70dvh;
    object-fit: contain;
  }

  iframe {
    width: 100%;
    height: 70dvh;
    border: 0;
  }
`
