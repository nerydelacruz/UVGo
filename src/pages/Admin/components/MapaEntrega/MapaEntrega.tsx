import { type Order } from "@/pages/SeguimientoPedidos/data"
import { formatDiaNumerico } from "@/utilities/date"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { BarraRuta, Cifras, Linea, MapaRuta, Repartidor } from "./MapaEntrega.styles"

interface MapaEntregaProps {
  order: Order | undefined
  fechaLimite: string | undefined // yyyy-mm-dd del pedido seleccionado
  estado: EstadoCarga
}

const hora = new Intl.DateTimeFormat("es-GT", { hour: "numeric", minute: "2-digit" })
const km = (n: number) => `${n.toLocaleString("es-GT", { maximumFractionDigits: 1 })} km`

// El mismo mapa de Seguimiento de pedidos (capas, 3D, repartidor, detalle, zoom y pantalla completa),
// con una barra al pie. Antes de salir: distancia, tiempo estimado y fecha límite (los da Mapbox al trazar la ruta).
// Con el piloto en camino: lo que falta, la hora estimada de llegada, la velocidad y el avance sobre la línea.
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
      footer={({ distanceKm, etaMin, vivo }) =>
        vivo ? (
          <BarraRuta>
            <Cifras>
              <span>
                <strong>{km(vivo.avance.restanteKm)}</strong>
                Falta · {Math.round(vivo.avance.fraccion * 100)} % recorrido
              </span>
              <span>
                <strong>~{hora.format(vivo.llegada)}</strong>
                Llegada estimada
              </span>
              <span>
                <strong>{vivo.velocidad === null ? "—" : `${Math.round(vivo.velocidad)} km/h`}</strong>
                Velocidad
              </span>
            </Cifras>
            <Linea
              role="progressbar"
              aria-label="Avance del repartidor"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(vivo.avance.fraccion * 100)}
              avance={vivo.avance.fraccion}
            >
              <Repartidor style={{ left: `${vivo.avance.fraccion * 100}%` }} />
            </Linea>
          </BarraRuta>
        ) : (
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
        )
      }
    />
  )
}

export default MapaEntrega
