import { FiNavigation, FiPackage } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { warehouse, type Order } from "@/pages/SeguimientoPedidos/data"
import type { ResumenPedidos } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Avatar, Cifra, Cifras, Encabezado } from "./EquipoEntrega.styles"

interface EquipoEntregaProps {
  resumen: ResumenPedidos | undefined
  orders: Order[]
  estado: EstadoCarga
}

// Carga de trabajo de entregas: cuántos pedidos aceptados faltan por entregar y cuántos km suman sus rutas
// desde la bodega (la misma estimación que usa Seguimiento de pedidos), y a cuántos aún les falta conductor.
const EquipoEntrega = ({ resumen, orders, estado }: EquipoEntregaProps) => {
  const pendientes = orders.filter((o) => o.status !== "entregado")
  const km = pendientes.reduce((total, o) => total + o.distanceKm, 0)
  const sinConductor = pendientes.filter((o) => !o.conductor).length

  return (
    <DashboardCard titulo="Entregas" estado={estado} esqueleto={["6.8rem", "10rem"]}>
      <Encabezado>
        <Avatar>
          <MdDeliveryDining size={24} aria-hidden />
        </Avatar>
        <div>
          <strong>{warehouse.name}</strong>
          <span>
            Salida · {sinConductor === 0 ? "todos con conductor" : `${sinConductor} por asignar`}
          </span>
        </div>
      </Encabezado>

      <Cifras>
        <Cifra>
          <FiPackage size={20} aria-hidden />
          <strong>{resumen?.porEntregar ?? 0}</strong>
          <span>Por entregar</span>
        </Cifra>
        <Cifra>
          <FiNavigation size={20} aria-hidden />
          <strong>{km.toLocaleString("es-GT", { maximumFractionDigits: 1 })} km</strong>
          <span>Ruta estimada</span>
        </Cifra>
      </Cifras>
    </DashboardCard>
  )
}

export default EquipoEntrega
