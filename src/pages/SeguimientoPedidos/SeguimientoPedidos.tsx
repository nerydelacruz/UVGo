import { useState } from "react"
import OrderHistory from "./components/OrderHistory/OrderHistory"
import OrdersPanel from "./components/OrdersPanel/OrdersPanel"
import PaymentPanel from "./components/PaymentPanel/PaymentPanel"
import RouteOverview from "./components/RouteOverview/RouteOverview"
import SideRail from "./components/SideRail/SideRail"
import { orders as initialOrders, type Order } from "./data"
import { BottomStrip, Main, Shell } from "./SeguimientoPedidos.styles"

const confirmOrder = (order: Order): Order => ({
  ...order,
  status: "confirmado",
  timeline: order.timeline.map((entry) =>
    entry.phase === "confirmado" ? { ...entry, time: "Ahora", action: "Pedido confirmado", detail: "En preparación" } : entry,
  ),
})

const SeguimientoPedidos = () => {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState(initialOrders[0].id)
  const selected = orders.find((order) => order.id === selectedId) ?? orders[0]

  const handleConfirm = (id: string) => {
    setOrders((current) => current.map((order) => (order.id === id ? confirmOrder(order) : order)))
    setSelectedId(id)
  }

  return (
    <Shell>
      <SideRail />
      <OrdersPanel orders={orders} selectedId={selected.id} onSelect={setSelectedId} onConfirm={handleConfirm} />
      <Main>
        <RouteOverview order={selected} />
        <BottomStrip>
          <OrderHistory order={selected} />
          <PaymentPanel order={selected} />
        </BottomStrip>
      </Main>
    </Shell>
  )
}

export default SeguimientoPedidos
