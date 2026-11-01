import { useMemo, useState } from "react"
import { usePedidos } from "@/hooks/usePedidos"
import { esPedido, pedidoToOrder } from "@/pages/SeguimientoPedidos/adapter"
import { resumirPedidos } from "@/utilities/resumenPedidos"
import ActividadSemanal from "./components/ActividadSemanal/ActividadSemanal"
import CobrosSemana from "./components/CobrosSemana/CobrosSemana"
import EquipoEntrega from "./components/EquipoEntrega/EquipoEntrega"
import HorarioSolicitudes from "./components/HorarioSolicitudes/HorarioSolicitudes"
import MapaEntrega from "./components/MapaEntrega/MapaEntrega"
import PedidoSeleccionado from "./components/PedidoSeleccionado/PedidoSeleccionado"
import PedidosLista, { type PedidoEnMapa } from "./components/PedidosLista/PedidosLista"
import PorCotizar from "./components/PorCotizar/PorCotizar"
import ProductosPedido from "./components/ProductosPedido/ProductosPedido"
import SeguimientoEntrega from "./components/SeguimientoEntrega/SeguimientoEntrega"
import { Bento, Columna, Eyebrow, Header, Nota, Page, Title } from "./AdminHome.styles"

// Inicio de la vista admin: tarjetas que responden, cada una, una sola pregunta del administrador.
// Usa la misma consulta que Solicitudes (el admin ve todas), así que se refresca al cotizar o validar un pago.
// Los pedidos (cotización aceptada) se pasan por el adaptador de Seguimiento de pedidos para reutilizar su mapa.
const AdminHome = () => {
  const { data, isLoading, isError, refetch } = usePedidos()
  const resumen = useMemo(() => (data ? resumirPedidos(data.contenido) : undefined), [data])
  const pedidos = useMemo<PedidoEnMapa[]>(
    () => (data?.contenido ?? []).filter(esPedido).map((pedido) => ({ pedido, order: pedidoToOrder(pedido, "Estudiante", false) })),
    [data],
  )
  const estado = { isLoading, isError, onRetry: () => void refetch() }

  // Sin selección (o si el elegido ya no está) se muestra el pedido más reciente
  const [selectedId, setSelectedId] = useState<string>()
  const seleccionado = pedidos.find((p) => p.pedido.id === selectedId) ?? pedidos[0]

  // El backend entrega como máximo 100 por página; con más, las métricas cubren solo las más recientes
  const parcial = data !== undefined && data.totalElementos > data.contenido.length

  return (
    <Page>
      <Header>
        <Eyebrow>Vista admin</Eyebrow>
        <Title>Panel de administración</Title>
        {parcial && <Nota>Métricas calculadas con las {data.contenido.length} solicitudes más recientes.</Nota>}
      </Header>

      <Bento>
        <Columna>
          <HorarioSolicitudes resumen={resumen} estado={estado} />
          <EquipoEntrega resumen={resumen} orders={pedidos.map((p) => p.order)} estado={estado} />
          <ActividadSemanal porDia={resumen?.porDia} estado={estado} />
        </Columna>

        <Columna ancha>
          <PedidosLista pedidos={pedidos} selectedId={seleccionado?.pedido.id} onSelect={setSelectedId} estado={estado} />
          <MapaEntrega order={seleccionado?.order} fechaLimite={seleccionado?.pedido.fechaLimite} estado={estado} />
        </Columna>

        <Columna>
          <PedidoSeleccionado pedido={seleccionado?.pedido} order={seleccionado?.order} estado={estado} />
          <ProductosPedido pedido={seleccionado?.pedido} estado={estado} />
        </Columna>

        <Columna>
          <CobrosSemana resumen={resumen} estado={estado} />
          <PorCotizar resumen={resumen} estado={estado} />
          <SeguimientoEntrega pedido={seleccionado?.pedido} order={seleccionado?.order} estado={estado} />
        </Columna>
      </Bento>
    </Page>
  )
}

export default AdminHome
