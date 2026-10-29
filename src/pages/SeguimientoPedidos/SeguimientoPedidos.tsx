import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePedidos } from "@/hooks/usePedidos"
import { useAuthStore } from "@/store/auth.store"
import { esPedido, pedidoToOrder } from "./adapter"
import OrderHistory from "./components/OrderHistory/OrderHistory"
import OrdersPanel from "./components/OrdersPanel/OrdersPanel"
import PaymentPanel from "./components/PaymentPanel/PaymentPanel"
import ReceiptCard from "./components/ReceiptCard/ReceiptCard"
import { EmptyCard, Main, Muted, Shell, TopRow } from "./SeguimientoPedidos.styles"

const SeguimientoPedidos = () => {
  const navigate = useNavigate()
  const usuario = useAuthStore((s) => s.usuario)
  const { data, isLoading, isError, refetch } = usePedidos()

  // El backend devuelve las solicitudes del estudiante (o todas si es admin), más recientes primero.
  // Aquí solo se muestran las que ya son pedido (cotización aceptada).
  const pedidos = (data?.contenido ?? []).filter(esPedido)
  const cliente = usuario?.rol === "ESTUDIANTE" ? `${usuario.nombre}${usuario.carne ? ` · ${usuario.carne}` : ""}` : "Estudiante"
  const orders = pedidos.map((p, i) => pedidoToOrder(p, cliente, i === 0))

  const [selectedId, setSelectedId] = useState<string>()
  const selected = orders.find((order) => order.id === selectedId) ?? orders[0]

  return (
    <Shell>
      <OrdersPanel
        orders={orders}
        selectedId={selected?.id ?? ""}
        onSelect={setSelectedId}
        onPagar={() => navigate("/mis-solicitudes")}
      />
      {selected ? (
        // El estudiante no ve el mapa ni la ubicación del repartidor: eso es solo del panel admin
        <Main>
          <TopRow>
            <ReceiptCard order={selected} />
            <PaymentPanel order={selected} onPagar={() => navigate("/mis-solicitudes")} />
          </TopRow>
          <OrderHistory order={selected} />
        </Main>
      ) : (
        <Main>
          <EmptyCard>
            <div>
              <strong>
                {isLoading ? "Cargando tus pedidos…" : isError ? "No pudimos cargar tus pedidos" : "Todavía no tienes pedidos"}
              </strong>
              <Muted>
                {isError ? (
                  <button type="button" onClick={() => refetch()}>
                    Reintentar
                  </button>
                ) : (
                  "Cuando aceptes una cotización en “Mis solicitudes”, tu pedido aparecerá aquí para darle seguimiento."
                )}
              </Muted>
            </div>
          </EmptyCard>
        </Main>
      )}
    </Shell>
  )
}

export default SeguimientoPedidos
