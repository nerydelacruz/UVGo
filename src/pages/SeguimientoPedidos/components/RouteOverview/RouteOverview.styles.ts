import styled from "@emotion/styled"
import type { AlertTone } from "../../data"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

const floatingSurface = `
  border: 1px solid rgba(82, 82, 82, 0.1);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 28px -14px rgb(0 0 0 / 0.25);
`

export const MapCard = styled(Card)<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: ${(p) => p.theme.space.lg};
  gap: ${(p) => p.theme.space.md};

  ${(p) =>
    p.expanded &&
    `
    position: fixed;
    inset: ${p.theme.space.lg};
    z-index: 50;
    box-shadow: ${p.theme.shadow.xl};
  `}
`

export const MapHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
  padding: 0 ${(p) => p.theme.space.xs};

  > div > span {
    display: block;
    margin-top: 0.3rem;
  }
`

export const Toolbar = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.xs};
`

export const MapStage = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.lg};
  background: #eef0ec;
`

export const MapContainer = styled.div`
  position: absolute;
  inset: 0;

  .mapboxgl-ctrl-attrib {
    font-size: 1rem;
  }
`

export const MapFallback = styled.p`
  display: grid;
  place-items: center;
  height: 100%;
  padding: ${(p) => p.theme.space.xl};
  text-align: center;
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.color.textFaint};
`

export const MapPin = styled.span<{ destination?: boolean }>`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: 3px solid white;
  border-radius: ${(p) => (p.destination ? "50% 50% 50% 0" : p.theme.radius.full)};
  transform: ${(p) => (p.destination ? "rotate(-45deg)" : "none")};
  background: ${(p) => (p.destination ? p.theme.color.accent : p.theme.color.textStrong)};
  box-shadow: 0 4px 10px -2px rgb(0 0 0 / 0.3);
  color: white;

  svg {
    transform: ${(p) => (p.destination ? "rotate(45deg)" : "none")};
  }
`

export const MotoPin = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 3.8rem;
  height: 3.8rem;
  border: 3px solid ${(p) => p.theme.color.accent};
  border-radius: ${(p) => p.theme.radius.full};
  background: white;
  box-shadow: 0 6px 14px -4px rgb(0 0 0 / 0.35);
  color: ${(p) => p.theme.color.accent};

  &::after {
    content: "";
    position: absolute;
    inset: -3px;
    z-index: -1;
    border-radius: inherit;
    background: rgba(224, 122, 95, 0.35);
    animation: motoPulse 1.8s ease-out infinite;
  }

  @keyframes motoPulse {
    0% { transform: scale(1); opacity: 1; }
    80%, 100% { transform: scale(1.9); opacity: 0; }
  }
`

export const TimeLabel = styled.span<{ dark?: boolean }>`
  position: relative;
  display: block;
  border-radius: ${(p) => p.theme.radius.sm};
  padding: 0.4rem 0.8rem;
  background: ${(p) => (p.dark ? p.theme.color.textStrong : "white")};
  box-shadow: 0 4px 12px -4px rgb(0 0 0 / 0.3);
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => (p.dark ? "white" : tracking.accentInk)};

  &:empty {
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -0.4rem;
    width: 0.8rem;
    height: 0.8rem;
    transform: translateX(-50%) rotate(45deg);
    background: inherit;
  }
`

export const LiveBadge = styled.span<{ live: boolean }>`
  position: absolute;
  z-index: 2;
  top: ${(p) => p.theme.space.md};
  left: ${(p) => p.theme.space.md};
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.6rem 1.1rem;
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
  ${floatingSurface}
`

export const LiveDot = styled.span<{ live: boolean }>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.live ? p.theme.color.accent : p.theme.color.textDisabled)};
  box-shadow: 0 0 0 4px ${(p) => (p.live ? "rgba(224, 122, 95, 0.16)" : "rgba(82, 82, 82, 0.1)")};
  animation: ${(p) => (p.live ? "liveDot 1.8s ease-in-out infinite" : "none")};

  @keyframes liveDot {
    50% { box-shadow: 0 0 0 7px rgba(224, 122, 95, 0.04); }
  }
`

export const DetailPanel = styled.aside`
  position: absolute;
  z-index: 2;
  top: ${(p) => p.theme.space.md};
  right: ${(p) => p.theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
  max-width: calc(100% - 2.4rem);
  max-height: calc(100% - 10rem);
  overflow-y: auto;
  border-radius: ${(p) => p.theme.radius.lg};
  padding: ${(p) => p.theme.space.md};
  scrollbar-width: none;
  ${floatingSurface}

  > strong {
    padding: 0 0.4rem;
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }

  @media (max-width: 640px) {
    display: none;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 1.8rem;
  right: 1.8rem;
  display: grid;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  border: 0;
  border-radius: ${(p) => p.theme.radius.full};
  background: rgba(255, 255, 255, 0.9);
  color: ${(p) => p.theme.color.textMuted};
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.color.textStrong};
  }

  &:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
  }
`

export const Illustration = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  height: 7.2rem;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  background: linear-gradient(135deg, rgba(224, 122, 95, 0.22), ${tracking.pageBg} 70%);

  svg {
    position: absolute;
    inset: auto 0 0;
    width: 100%;
    height: 7rem;
  }

  span {
    position: relative;
    display: grid;
    place-items: center;
    width: 5rem;
    height: 5rem;
    border-radius: ${(p) => p.theme.radius.full};
    background: white;
    box-shadow: 0 10px 20px -10px rgb(163 79 58 / 0.6);
    color: ${(p) => p.theme.color.accent};
  }
`

export const DetailList = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem ${(p) => p.theme.space.md};
  padding: 0 0.4rem;
  font-size: ${(p) => p.theme.font.size.xs};

  dt {
    color: ${(p) => p.theme.color.textFaint};
  }

  dd {
    text-align: right;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.textStrong};
  }
`

const alertTones: Record<AlertTone | "neutral", { bg: string; fg: string }> = {
  info: { bg: "rgba(14, 165, 233, 0.12)", fg: "#0369a1" },
  warning: { bg: "rgba(251, 191, 36, 0.2)", fg: "#92400e" },
  accent: { bg: tracking.accentWash, fg: tracking.accentInk },
  neutral: { bg: "rgba(82, 82, 82, 0.08)", fg: "#525252" },
}

export const AlertRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-top: ${(p) => p.theme.space.sm};
  border-top: 1px solid ${tracking.hairline};
`

export const AlertChip = styled.span<{ tone: AlertTone | "neutral" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.4rem 0.8rem;
  background: ${(p) => alertTones[p.tone].bg};
  font-size: 1.05rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  white-space: nowrap;
  color: ${(p) => alertTones[p.tone].fg};
`

export const ReopenButton = styled.button`
  position: absolute;
  z-index: 2;
  top: ${(p) => p.theme.space.md};
  right: ${(p) => p.theme.space.md};
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: ${(p) => p.theme.radius.full};
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  color: ${(p) => p.theme.color.text};
  cursor: pointer;
  ${floatingSurface}

  &:hover {
    color: ${(p) => p.theme.color.accent};
  }
`

export const ZoomControls = styled.div`
  position: absolute;
  z-index: 2;
  right: ${(p) => p.theme.space.md};
  bottom: ${(p) => p.theme.space.md};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.md};
  ${floatingSurface}

  button {
    display: grid;
    place-items: center;
    width: 3.4rem;
    height: 3.4rem;
    border: 0;
    background: transparent;
    color: ${(p) => p.theme.color.textMuted};
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease;
  }

  button + button {
    border-top: 1px solid ${tracking.hairline};
  }

  button:hover {
    background: ${tracking.accentWash};
    color: ${(p) => p.theme.color.accent};
  }

  button:focus-visible {
    outline: 3px solid rgba(224, 122, 95, 0.35);
    outline-offset: -3px;
  }
`
