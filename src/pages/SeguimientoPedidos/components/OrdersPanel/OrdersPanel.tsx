import { useMemo, useState, type KeyboardEvent } from "react"
import { FiMapPin, FiPlus, FiSearch, FiX } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { formatQ, orderAction, statusLabel, type Order } from "../../data"
import { CardTitle, StatusBadge } from "../../SeguimientoPedidos.styles"
import {
  ActionButton,
  CompactCard,
  CompactMeta,
  CountBadge,
  EmptyState,
  FilterChip,
  Filters,
  Header,
  Metrics,
  OrderCard,
  OrderFooter,
  OrderName,
  OrderNumber,
  OrderTop,
  Panel,
  Price,
  RouteDates,
  RouteLine,
  RouteNode,
  RouteRow,
  RouteTrack,
  ScrollArea,
  SearchField,
  SectionLabel,
} from "./OrdersPanel.styles"

type FilterId = "semestre" | "en-ruta" | "por-confirmar"

const filterOptions: Array<{ id: FilterId; label: string; test: (order: Order) => boolean }> = [
  { id: "semestre", label: "Este semestre", test: (order) => order.thisSemester },
  { id: "en-ruta", label: "En ruta", test: (order) => order.status === "en-ruta" },
  { id: "por-confirmar", label: "Por confirmar", test: (order) => order.status === "cotizado" },
]

const statusTone = (order: Order) => (order.status === "entregado" ? "success" : order.status === "en-ruta" ? "accent" : "neutral")

interface OrdersPanelProps {
  orders: Order[]
  selectedId: string
  onSelect: (id: string) => void
  onConfirm: (id: string) => void
}

const OrdersPanel = ({ orders, selectedId, onSelect, onConfirm }: OrdersPanelProps) => {
  const [query, setQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<FilterId[]>(["semestre"])

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase()
    return orders.filter(
      (order) =>
        filterOptions.every((filter) => !activeFilters.includes(filter.id) || filter.test(order)) &&
        (!text || [order.kitName, order.number, order.course, order.destination].some((field) => field.toLowerCase().includes(text))),
    )
  }, [orders, query, activeFilters])

  const recommended = visible.filter((order) => order.recommended)
  const others = visible.filter((order) => !order.recommended)
  const activeCount = orders.filter((order) => order.status !== "entregado").length

  const toggleFilter = (id: FilterId) =>
    setActiveFilters((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]))

  const selectable = (id: string) => ({
    role: "button",
    tabIndex: 0,
    onClick: () => onSelect(id),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return
      event.preventDefault()
      onSelect(id)
    },
  })

  const handleAction = (order: Order) => (order.status === "cotizado" ? onConfirm(order.id) : onSelect(order.id))

  return (
    <Panel aria-label="Tus pedidos">
      <Header>
        <CardTitle>
          Tus pedidos <CountBadge aria-label={`${activeCount} pedidos activos`}>{activeCount}</CountBadge>
        </CardTitle>
      </Header>

      <SearchField>
        <FiSearch size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar kit, pedido o edificio"
          aria-label="Buscar pedidos"
        />
      </SearchField>

      <Filters>
        {filterOptions.map((filter) => {
          const active = activeFilters.includes(filter.id)
          return (
            <FilterChip key={filter.id} type="button" active={active} aria-pressed={active} onClick={() => toggleFilter(filter.id)}>
              {filter.label}
              {active ? <FiX size={12} aria-hidden="true" /> : <FiPlus size={12} aria-hidden="true" />}
            </FilterChip>
          )
        })}
      </Filters>

      <ScrollArea>
        {recommended.length > 0 && <SectionLabel>Recomendado</SectionLabel>}
        {recommended.map((order) => (
          <OrderCard
            key={order.id}
            isSelected={order.id === selectedId}
            {...selectable(order.id)}
            aria-current={order.id === selectedId ? "true" : undefined}
          >
            <OrderTop>
              <div>
                <OrderName>{order.kitName}</OrderName>
                <OrderNumber>#{order.number} · {statusLabel[order.status]}</OrderNumber>
              </div>
              <StatusBadge tone="neutral">{order.course}</StatusBadge>
            </OrderTop>

            <RouteRow>
              <RouteNode><span /> {order.origin}</RouteNode>
              <RouteTrack moving={order.status === "en-ruta"}>
                <RouteLine />
                <MdDeliveryDining size={18} />
                <RouteLine />
              </RouteTrack>
              <RouteNode end><FiMapPin size={12} /> {order.destination}</RouteNode>
            </RouteRow>

            <RouteDates>
              <div><span>Solicitado</span><strong>{order.requestedAt}</strong></div>
              <div><span>Entrega estimada</span><strong>{order.deliveryAt}</strong></div>
            </RouteDates>

            <Metrics>
              <div><span>Distancia</span><strong>{order.distanceKm.toFixed(1)} km</strong></div>
              <div><span>Tiempo est.</span><strong>{order.etaMin} min</strong></div>
              <div><span>Envío</span><strong>{formatQ(order.shipping)}</strong></div>
            </Metrics>

            <OrderFooter>
              <Price>{formatQ(order.total)}</Price>
              <ActionButton
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  handleAction(order)
                }}
              >
                {orderAction(order.status)}
              </ActionButton>
            </OrderFooter>
          </OrderCard>
        ))}

        {others.length > 0 && <SectionLabel>Otros pedidos</SectionLabel>}
        {others.map((order) => (
          <CompactCard
            key={order.id}
            isSelected={order.id === selectedId}
            {...selectable(order.id)}
            aria-current={order.id === selectedId ? "true" : undefined}
          >
            <OrderTop>
              <div>
                <OrderName>{order.kitName}</OrderName>
                <OrderNumber>#{order.number}</OrderNumber>
              </div>
              <StatusBadge tone={statusTone(order)} dot>{statusLabel[order.status]}</StatusBadge>
            </OrderTop>
            <CompactMeta>
              <span>{order.origin} → {order.destination}</span>
              <strong>{formatQ(order.total)}</strong>
            </CompactMeta>
          </CompactCard>
        ))}

        {visible.length === 0 && <EmptyState>No hay pedidos con esos filtros.</EmptyState>}
      </ScrollArea>
    </Panel>
  )
}

export default OrdersPanel
