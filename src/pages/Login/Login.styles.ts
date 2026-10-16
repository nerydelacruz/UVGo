import styled from "@emotion/styled"
import { focusRing } from "@/styles/shared.styles"

// Composición inspirada en la referencia (tarjeta de vidrio sobre un fondo con manchas de color
// y objetos 3D que salen de los bordes), con la paleta verde-crema de UVGo.

export const Scene = styled.main`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: 8rem ${(p) => p.theme.space.lg} ${(p) => p.theme.space.xxl};
  /* recorta las manchas decorativas; el fondo crece con el formulario, así que el scroll lo hace la página */
  overflow: clip;
  background-color: ${(p) => p.theme.color.bg};
  background-image: ${(p) => p.theme.gradient.layoutBg};
  color: ${(p) => p.theme.color.text};
`

// Manchas de color difuminadas (decorativas, estáticas)
export const Orb = styled.div<{ tone: "green" | "coral" | "sun" | "deep" }>`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
  background: ${(p) =>
    ({
      green: "radial-gradient(circle, #9cc79a 0%, rgba(156, 199, 154, 0) 70%)",
      coral: "radial-gradient(circle, rgba(224, 122, 95, 0.55) 0%, rgba(224, 122, 95, 0) 70%)",
      sun: "radial-gradient(circle, rgba(253, 230, 138, 0.8) 0%, rgba(253, 230, 138, 0) 70%)",
      deep: "radial-gradient(circle, rgba(29, 65, 27, 0.28) 0%, rgba(29, 65, 27, 0) 70%)",
    })[p.tone]};
`

export const Brand = styled.img`
  position: absolute;
  top: ${(p) => p.theme.space.xl};
  left: ${(p) => p.theme.space.xl};
  z-index: 3;
  height: 2.8rem;
  width: auto;
`

// Tarjeta grande y borrosa detrás del formulario (como el "dashboard" desenfocado de la referencia)
export const BackCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(116rem, 92vw);
  height: min(68rem, 78dvh);
  transform: translate(-46%, -48%);
  border-radius: 4rem;
  background: rgba(255, 255, 255, 0.26);
  outline: 1px solid rgba(255, 255, 255, 0.5);
  outline-offset: -1px;
  box-shadow: 0 40px 120px -40px rgb(16 24 16 / 0.35);
  backdrop-filter: blur(32px) saturate(1.4);
  pointer-events: none;

  /* "contenido" desenfocado para dar profundidad */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: ${(p) => p.theme.radius.xl};
    filter: blur(10px);
  }

  &::before {
    top: 8%;
    left: 6%;
    width: 30%;
    height: 7%;
    background: rgba(255, 255, 255, 0.7);
  }

  &::after {
    top: 8%;
    right: 6%;
    width: 34%;
    height: 34%;
    background: rgba(29, 65, 27, 0.12);
  }

  @media (max-width: 640px) {
    display: none;
  }
`

export const Stage = styled.div`
  position: relative;
  z-index: 2;
  width: min(56rem, 100%);
`

// Caja 3D de UVGo saliendo de los bordes de la tarjeta (equivalente a los objetos de vidrio de la referencia)
export const BoxArt = styled.img<{ placement: "front" | "back" }>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 24px 32px rgb(16 24 16 / 0.28));
  ${(p) =>
    p.placement === "front"
      ? `
    z-index: 2;
    top: -12rem;
    left: -17rem;
    width: 21rem;
    transform: rotate(-14deg);
  `
      : `
    z-index: 0;
    right: -12rem;
    bottom: -9rem;
    width: 20rem;
    transform: rotate(12deg);
    opacity: 0.95;
  `}

  @media (max-width: 900px) {
    display: none;
  }
`

export const Card = styled.section`
  position: relative;
  z-index: 1;
  padding: ${(p) => p.theme.space.xxl} 5.6rem 4.8rem;
  border-radius: 3.2rem;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.4) 100%);
  outline: 1px solid rgba(255, 255, 255, 0.75);
  outline-offset: -1px;
  box-shadow: 0 32px 80px -24px rgb(16 24 16 / 0.35), 0 1px 2px rgb(16 24 16 / 0.06);
  backdrop-filter: blur(28px) saturate(1.6);

  @media (max-width: 640px) {
    padding: ${(p) => p.theme.space.xl} ${(p) => p.theme.space.lg};
  }
`

export const TabList = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(p) => p.theme.space.xxl};
  margin-bottom: ${(p) => p.theme.space.xxl};
`

export const TabButton = styled.button<{ selected: boolean }>`
  position: relative;
  padding: 0 0 ${(p) => p.theme.space.md};
  border: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  background: transparent;
  font-size: 3.2rem;
  line-height: 1.1;
  font-weight: ${(p) => (p.selected ? p.theme.font.weight.bold : 400)};
  color: ${(p) => (p.selected ? p.theme.color.textStrong : p.theme.color.textDisabled)};
  cursor: pointer;
  transition: color 150ms ease-out;

  &:hover {
    color: ${(p) => (p.selected ? p.theme.color.textStrong : p.theme.color.textFaint)};
  }

  /* subrayado corto con el acento, como en la referencia */
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 4.4rem;
    height: 0.4rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: ${(p) => p.theme.color.accent};
    transform: translateX(-50%);
    opacity: ${(p) => (p.selected ? 1 : 0)};
  }

  ${focusRing}

  @media (max-width: 640px) {
    font-size: 2.4rem;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.lg};
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(p) => p.theme.space.md};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
  min-width: 0;
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.textMuted};
`

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  padding: 0 ${(p) => p.theme.space.lg};
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: ${(p) => p.theme.radius.md};
  background: rgba(255, 255, 255, 0.55);
  font: inherit;
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  color: ${(p) => p.theme.color.text};
  outline: 0;
  transition: border-color 150ms ease-out, background 150ms ease-out;

  &::placeholder {
    font-weight: 400;
    color: ${(p) => p.theme.color.textDisabled};
  }

  &:focus {
    border-color: ${(p) => p.theme.color.accent};
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.16);
  }

  /* deja espacio al botón de mostrar contraseña */
  &[data-with-toggle] {
    padding-right: 4.8rem;
  }
`

export const Hint = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${(p) => p.theme.color.textFaint};
`

export const ToggleButton = styled.button`
  position: absolute;
  right: ${(p) => p.theme.space.sm};
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border: 0;
  border-radius: ${(p) => p.theme.radius.sm};
  background: transparent;
  color: ${(p) => p.theme.color.textFaint};
  cursor: pointer;
  transition: color 150ms ease-out, background 150ms ease-out;

  &:hover {
    color: ${(p) => p.theme.color.text};
    background: rgba(82, 82, 82, 0.08);
  }

  ${focusRing}
`

export const Submit = styled.button`
  height: 4.8rem;
  margin-top: ${(p) => p.theme.space.sm};
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => p.theme.color.textStrong};
  font-size: ${(p) => p.theme.font.size.md};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: white;
  cursor: pointer;
  transition: background 150ms ease-out;

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.color.neutralDarker};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`

export const Switch = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
  text-align: center;

  button {
    padding: 0;
    border: 0;
    border-radius: ${(p) => p.theme.radius.sm};
    background: none;
    font: inherit;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;

    ${focusRing}
  }
`
