import styled from "@emotion/styled"

export const Wrapper = styled.div`
  position: relative;
  margin-top: ${(p) => p.theme.space.sm};
`

export const AvatarButton = styled.button<{ open: boolean }>`
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  padding: 0;
  border: 2px solid white;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.gradient.avatarWarm};
  box-shadow: 0 0 0 ${(p) => (p.open ? "3px rgba(224, 122, 95, 0.35)" : "1px rgba(82, 82, 82, 0.12)")};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
  cursor: pointer;
  transition: box-shadow 150ms ease-out;

  &:hover {
    box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.accent};
    outline-offset: 2px;
  }
`

// Se abre a la derecha del avatar, alineado con su borde inferior
export const Popover = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(100% + ${(p) => p.theme.space.lg});
  width: 24rem;
  padding: ${(p) => p.theme.space.xs};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 32px -8px rgb(16 24 16 / 0.22), 0 1px 2px rgb(16 24 16 / 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.8);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
`

export const Header = styled.div`
  overflow-wrap: anywhere;
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md} ${(p) => p.theme.space.md};
  border-bottom: 1px solid rgba(82, 82, 82, 0.1);
  margin-bottom: ${(p) => p.theme.space.xs};

  strong {
    display: block;
    font-size: ${(p) => p.theme.font.size.sm};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  span {
    font-size: ${(p) => p.theme.font.size.xs};
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const Divider = styled.hr`
  margin: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.sm};
  border: 0;
  border-top: 1px solid rgba(82, 82, 82, 0.1);
`

export const Item = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  width: 100%;
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
  border: 0;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => (p.active ? "rgba(224, 122, 95, 0.12)" : "transparent")};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => (p.active ? p.theme.font.weight.semibold : p.theme.font.weight.medium)};
  color: ${(p) => (p.active ? p.theme.color.textStrong : p.theme.color.textMuted)};
  text-align: left;
  cursor: pointer;
  transition: background 150ms ease-out, color 150ms ease-out;

  &:hover:not(:disabled) {
    background: ${(p) => (p.active ? "rgba(224, 122, 95, 0.16)" : "rgba(82, 82, 82, 0.06)")};
    color: ${(p) => p.theme.color.textStrong};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.accent};
    outline-offset: -2px;
  }

  span {
    flex: 1;
  }

  .check {
    color: ${(p) => p.theme.color.accent};
  }
`
