import { ESTADOS, type EstadoPedido } from "@/models/pedido.model"
import DashboardCard, { type EstadoCarga } from "../../../components/DashboardCard/DashboardCard"
import { formatEntero, formatPorcentaje } from "../../formato"
import { Barra, Fila, Lista, Pista } from "./EstadosSolicitudes.styles"

interface EstadosSolicitudesProps {
  porEstado: Record<EstadoPedido, number> | undefined
  estado: EstadoCarga
}

// En el orden en que avanza una solicitud; cancelada al final
const ORDEN: EstadoPedido[] = ["SOLICITADO", "COTIZADO", "CONFIRMADO", "PAGADO", "EN_COMPRA", "LISTO", "ENTREGADO", "CANCELADO"]

// Dónde están las solicitudes del periodo. Barras de un solo color: la etiqueta, no el color, dice qué estado es.
const EstadosSolicitudes = ({ porEstado, estado }: EstadosSolicitudesProps) => {
  const total = porEstado ? ORDEN.reduce((s, e) => s + (porEstado[e] ?? 0), 0) : 0
  const max = porEstado ? Math.max(1, ...ORDEN.map((e) => porEstado[e] ?? 0)) : 1

  return (
    <DashboardCard
      titulo="Estado de las solicitudes"
      to={null}
      extra={porEstado ? `${formatEntero(total)} en total` : undefined}
      estado={estado}
      esqueleto={["24rem"]}
      vacio={porEstado && total === 0 ? { titulo: "Sin solicitudes", texto: "Nadie pidió materiales en este periodo." } : null}
    >
      {porEstado && (
        <Lista>
          {ORDEN.map((e) => {
            const n = porEstado[e] ?? 0
            return (
              <Fila key={e}>
                <span>{ESTADOS[e]}</span>
                <Pista aria-hidden>
                  <Barra ancho={n / max} />
                </Pista>
                <strong>{formatEntero(n)}</strong>
                <small>{formatPorcentaje(n, total)}</small>
              </Fila>
            )
          })}
        </Lista>
      )}
    </DashboardCard>
  )
}

export default EstadosSolicitudes
