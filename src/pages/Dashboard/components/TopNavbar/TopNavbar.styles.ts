import styled from "@emotion/styled"
import { motion } from "motion/react"

export const Nav = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  box-shadow: ${(p) => p.theme.shadow.sm};
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
  backdrop-filter: blur(24px) saturate(1.5);
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  .imgBrand{
  height: 3.6rem;
  }
`

export const Name = styled.span`
  font-size: ${(p) => p.theme.font.size.xxl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  letter-spacing: -0.02em;
  color: ${(p) => p.theme.color.text};
`

export const Links = styled.nav`
  display: none;
  align-items: center;
  gap: 3.2rem;

  @media (min-width: ${(p) => p.theme.breakpoint.lg}) {
    display: flex;
  }
`

export const Link = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: ${(p) => p.theme.font.size.md};
  color: ${(p) => p.theme.color.textMuted};
  transition: color 150ms ease;

  &:hover {
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

export const ActionButton = styled.button`
  position: relative;
  color: ${(p) => p.theme.color.textMuted};
  transition: color 150ms ease;

  &:hover {
    color: ${(p) => p.theme.color.textStrong};
  }
`

export const Dot = styled.span`
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  height: 0.8rem;
  width: 0.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.danger};
  outline: 2px solid white;
`

export const Avatar = styled.div`
  height: 3.6rem;
  width: 3.6rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) => p.theme.gradient.avatarWarm};
`
