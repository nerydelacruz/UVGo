import styled from "@emotion/styled"
import { motion } from "motion/react"

export const Panel = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  width: 40rem;
  flex-shrink: 0;
  min-height: 0;
`

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
`

export const Title = styled.h2`
  position: relative;
  border-radius: ${(p) => p.theme.radius.lg} ${(p) => p.theme.radius.lg} 0 0;
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.textStrong};

  /* curva cóncava que une la pestaña con el Body de abajo */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: -2rem;
    height: 2rem;
    width: 2rem;
    background: ${(p) => p.theme.color.surfaceMuted};
    -webkit-mask: radial-gradient(circle 2rem at 100% 0, transparent 99%, #000 100%);
    mask: radial-gradient(circle 2rem at 100% 0, transparent 99%, #000 100%);
  }
`

export const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.sm};
  margin-left: ${(p) => p.theme.space.md};
  margin-bottom: 0.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  border: 1px solid ${(p) => p.theme.color.border};
  padding: 0.5rem 0.5rem 0.5rem ${(p) => p.theme.space.lg};
  font-size: ${(p) => p.theme.font.size.sm};
  color: ${(p) => p.theme.color.textMuted};
`

export const TabBadge = styled.span`
  display: grid;
  place-items: center;
  height: 2.4rem;
  width: 2.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.warning};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  border-radius: 0 ${(p) => p.theme.radius.xl} ${(p) => p.theme.radius.xl} ${(p) => p.theme.radius.xl};
  background: ${(p) => p.theme.color.surfaceMuted};
  backdrop-filter: blur(24px);
  box-shadow: ${(p) => p.theme.shadow.md};
  padding: ${(p) => p.theme.space.xl};

  /* oculta la barra visualmente, el scroll sigue funcionando */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
