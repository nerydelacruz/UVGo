import { useState } from "react"
import type { IconType } from "react-icons"
import { FiCheckCircle, FiChevronDown, FiChevronUp, FiFileText, FiFlag, FiInfo, FiTag } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { phaseIndex, phases, type Order, type OrderStatus } from "../../data"
import { CardTitle, SquareButton } from "../../SeguimientoPedidos.styles"
import { HistoryCard, HistoryHeader, InfoHint, Node, NodeIcon, Nodes, RowBullet, TableWrap, Table, type NodeState } from "./OrderHistory.styles"

const phaseIcon: Record<OrderStatus, IconType> = {
  solicitado: FiFileText,
  cotizado: FiTag,
  confirmado: FiCheckCircle,
  "en-ruta": MdDeliveryDining,
  entregado: FiFlag,
}

const nodeState = (index: number, current: number, status: OrderStatus): NodeState =>
  index < current || (index === current && status === "entregado") ? "done" : index === current ? "current" : "pending"

const OrderHistory = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false)
  const current = phaseIndex(order.status)

  return (
    <HistoryCard aria-label="Historial del pedido">
      <HistoryHeader>
        <CardTitle>
          Historial del pedido
          <InfoHint tabIndex={0} aria-label="Registro de cada fase del pedido, desde la solicitud hasta la entrega">
            <FiInfo size={15} />
            <span role="tooltip">Registro de cada fase del pedido, desde la solicitud hasta la entrega.</span>
          </InfoHint>
        </CardTitle>
        <SquareButton
          type="button"
          aria-expanded={expanded}
          aria-label={expanded ? "Contraer historial" : "Expandir historial"}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? <FiChevronDown size={17} /> : <FiChevronUp size={17} />}
        </SquareButton>
      </HistoryHeader>

      <Nodes aria-label="Fases del pedido">
        {phases.map((phase, index) => {
          const state = nodeState(index, current, order.status)
          const Icon = phaseIcon[phase.id]
          const entry = order.timeline[index]
          return (
            <Node key={phase.id} state={state} aria-current={state === "current" ? "step" : undefined}>
              <NodeIcon state={state}><Icon size={16} /></NodeIcon>
              <strong>{phase.label}</strong>
              <small>{entry?.time ?? "—"}</small>
            </Node>
          )
        })}
      </Nodes>

      <TableWrap expanded={expanded}>
        <Table>
          <thead>
            <tr>
              <th scope="col">Fase</th>
              <th scope="col">Hora</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Acción</th>
              <th scope="col">Detalle adicional</th>
            </tr>
          </thead>
          <tbody>
            {order.timeline.map((entry, index) => {
              const state = nodeState(index, current, order.status)
              return (
                <tr key={entry.phase} data-state={state}>
                  <td><RowBullet state={state} />{phases[index].label}</td>
                  <td>{entry.time}</td>
                  <td>{entry.location}</td>
                  <td>{entry.action}</td>
                  <td>{entry.detail}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </TableWrap>
    </HistoryCard>
  )
}

export default OrderHistory
