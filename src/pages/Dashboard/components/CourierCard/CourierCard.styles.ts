import styled from "@emotion/styled"

export const Card = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  padding: ${(p) => p.theme.space.md} 1.6rem ${(p) => p.theme.space.md} ${(p) => p.theme.space.md};
  box-shadow: ${(p) => p.theme.shadow.sm};
`

export const Person = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.md};
`

export const Avatar = styled.div`
  height: 4.8rem;
  width: 4.8rem;
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.gradient.avatarCool};
`

export const Phone = styled.div`
  text-align: right;
`

export const Label = styled.p`
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textFaint};
`

export const Value = styled.p`
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
`

export const Chat = styled.button`
  display: grid;
  place-items: center;
  height: 4.4rem;
  width: 4.4rem;
  flex-shrink: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.color.textStrong};
  color: white;
  transition: background-color 150ms ease;

  &:hover {
    background: ${(p) => p.theme.color.neutralDark};
  }
`
