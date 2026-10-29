import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import type { PedidoDetalle } from "@/models/pedido.model"
import RequestCard from "./components/RequestCard/RequestCard"
import { Body, Empty, Header, Panel, SeeAll, Tab, TabBadge, Title } from "./Pedidos.styles"

// Cuántas solicitudes recientes caben en la columna antes de "Ver todas"
const MAXIMO = 6

interface PedidosProps {
  recientes: PedidoDetalle[]
  cargando: boolean
}

// Columna derecha del inicio: las solicitudes con actividad más reciente
const Pedidos = ({ recientes, cargando }: PedidosProps) => {
  const visibles = recientes.slice(0, MAXIMO)

  return (
    <Panel
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header>
        <Title>Pedidos</Title>
        <Tab>
          Recientes
          <TabBadge>{recientes.length}</TabBadge>
        </Tab>
      </Header>

      <Body>
        {cargando ? (
          <Empty>Cargando tus solicitudes…</Empty>
        ) : visibles.length === 0 ? (
          <Empty>
            <strong>Aún no tienes solicitudes</strong>
            <span>Cuando pidas una cotización aparecerá aquí.</span>
            <Link to="/cotizar"><FiPlus size={13} aria-hidden /> Nueva cotización</Link>
          </Empty>
        ) : (
          <>
            {visibles.map((pedido) => (
              <RequestCard key={pedido.id} pedido={pedido} />
            ))}
            {recientes.length > MAXIMO && <SeeAll to="/mis-solicitudes">Ver todas ({recientes.length})</SeeAll>}
          </>
        )}
      </Body>
    </Panel>
  )
}

export default Pedidos
