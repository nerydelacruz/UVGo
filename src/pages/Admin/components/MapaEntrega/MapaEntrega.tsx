import { type Order } from "@/pages/SeguimientoPedidos/data"
import { formatDiaNumerico } from "@/utilities/date"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { BarraRuta, Cifras, Linea, MapaRuta } from "./MapaEntrega.styles"

interface MapaEntregaProps {
  order: Order | undefined
  fechaLimite: string | undefined // yyyy-mm-dd del pedido seleccionado
  estado: EstadoCarga
}

// El mismo mapa de Seguimiento de pedidos (capas, 3D, repartidor, detalle, zoom y pantalla completa),
// con la barra de distancia, tiempo estimado y fecha límite al pie. Distancia y tiempo los da Mapbox al trazar la ruta.
const MapaEntrega = ({ order, fechaLimite, estado }: MapaEntregaProps) => {
  // Cargando, con error o sin pedido: la tarjeta del panel muestra su estado
  if (!order || estado.isLoading || estado.isError) {
    return (
      <DashboardCard
        titulo="Ruta de entrega"
        grow
        estado={estado}
        esqueleto={["36rem"]}
        vacio={{ titulo: "Sin pedidos para trazar", texto: "Cuando haya un pedido confirmado verás aquí su ruta de entrega." }}
      />
    )
  }

  return (
    <MapaRuta
      order={order}
      titleExtra={`#${order.number}`}
      footer={({ distanceKm, etaMin }) => (
        <BarraRuta>
          <Cifras>
            <span>
              <strong>{distanceKm.toLocaleString("es-GT", { maximumFractionDigits: 1 })} km</strong>
              Distancia
            </span>
            <span>
              <strong>~{etaMin} min</strong>
              Tiempo estimado
            </span>
            <span>
              <strong>{fechaLimite ? formatDiaNumerico(fechaLimite) : "—"}</strong>
              Fecha límite
            </span>
          </Cifras>
          <Linea aria-hidden />
        </BarraRuta>
      )}
    />
  )
}

export default MapaEntrega
