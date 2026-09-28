import styled from "@emotion/styled"
import { Card, tracking } from "../../SeguimientoPedidos.styles"

export type NodeState = "done" | "current" | "pending"

export const HistoryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: ${(p) => p.theme.space.lg} ${(p) => p.theme.space.xl};
`

export const HistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};
`

export const InfoHint = styled.span`
  position: relative;
  display: inline-grid;
  place-items: center;
  color: ${(p) => p.theme.color.textDisabled};
  cursor: help;

  span {
    position: absolute;
    z-index: 5;
    top: calc(100% + 0.8rem);
    left: 50%;
    width: 22rem;
    transform: translateX(-50%);
    border-radius: ${(p) => p.theme.radius.sm};
    padding: 0.8rem 1rem;
    background: ${(p) => p.theme.color.textStrong};
    font-size: 1.1rem;
    font-weight: ${(p) => p.theme.font.weight.medium};
    line-height: 1.4;
    letter-spacing: 0;
    color: white;
    opacity: 0;
    pointer-events: none;
    transition: opacity 150ms ease;
  }

  &:hover span,
  &:focus-visible span {
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    color: ${(p) => p.theme.color.accent};
  }
`

export const Nodes = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-top: ${(p) => p.theme.space.lg};
`

export const Node = styled.li<{ state: NodeState }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 0;
  text-align: center;

  /* conector punteado hacia la siguiente fase */
  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 1.8rem;
    left: calc(50% + 2.4rem);
    width: calc(100% - 4.8rem);
    border-top: 2px ${(p) => (p.state === "done" ? "solid" : "dashed")}
      ${(p) => (p.state === "done" ? p.theme.color.accent : p.theme.color.border)};
  }

  strong {
    margin-top: 0.6rem;
    font-size: ${(p) => p.theme.font.size.xs};
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => (p.state === "pending" ? p.theme.color.textDisabled : p.theme.color.text)};
  }

  small {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.05rem;
    color: ${(p) => p.theme.color.textFaint};
  }
`

export const NodeIcon = styled.span<{ state: NodeState }>`
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 2px solid ${(p) => (p.state === "pending" ? p.theme.color.border : p.theme.color.accent)};
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.state === "done" ? p.theme.color.accent : "white")};
  box-shadow: ${(p) => (p.state === "current" ? `0 0 0 5px ${tracking.accentWash}` : "none")};
  color: ${(p) => (p.state === "done" ? "white" : p.state === "current" ? p.theme.color.accent : p.theme.color.textDisabled)};
`

export const TableWrap = styled.div<{ expanded: boolean }>`
  max-height: ${(p) => (p.expanded ? "40rem" : "13.6rem")};
  margin-top: ${(p) => p.theme.space.md};
  overflow: auto;
  transition: max-height 250ms ease;
  scrollbar-width: thin;
  scrollbar-color: rgba(82, 82, 82, 0.2) transparent;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${(p) => p.theme.font.size.xs};

  th {
    position: sticky;
    top: 0;
    padding: 0.6rem 1rem;
    border-bottom: 1px solid ${tracking.hairline};
    background: white;
    text-align: left;
    font-size: 1.05rem;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${(p) => p.theme.color.textFaint};
  }

  td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid ${tracking.hairline};
    white-space: nowrap;
    color: ${(p) => p.theme.color.textMuted};
  }

  th:first-of-type, td:first-of-type {
    padding-left: 0.4rem;
  }

  td:first-of-type {
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text};
  }

  tr[data-state="current"] td {
    background: rgba(224, 122, 95, 0.07);
    color: ${(p) => p.theme.color.text};
  }

  tr[data-state="pending"] td {
    color: ${(p) => p.theme.color.textDisabled};
  }

  tbody tr:last-of-type td {
    border-bottom: 0;
  }
`

export const RowBullet = styled.span<{ state: NodeState }>`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.8rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: ${(p) => (p.state === "pending" ? p.theme.color.border : p.theme.color.accent)};
  box-shadow: ${(p) => (p.state === "current" ? "0 0 0 3px rgba(224, 122, 95, 0.2)" : "none")};
  vertical-align: 0.05em;
`
