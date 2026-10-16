import styled from "@emotion/styled"

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-top: ${(p) => p.theme.space.md};
`

export const Status = styled.p`
  margin-top: ${(p) => p.theme.space.md};
  padding: 0 ${(p) => p.theme.space.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};

  strong {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }
`
