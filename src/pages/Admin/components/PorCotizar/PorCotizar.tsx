import { useNavigate } from "react-router-dom"
import { Badge } from "@/styles/shared.styles"
import { tiempoDesde } from "@/utilities/date"
import type { ResumenPedidos } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Accion, Contenido, Cuenta, Espera, Fila } from "./PorCotizar.styles"

interface PorCotizarProps {
  resumen: ResumenPedidos | undefined
  estado: EstadoCarga
}

// Lo que espera al admin: solicitudes por cotizar (y desde cuándo espera la más antigua) y comprobantes por validar
const PorCotizar = ({ resumen, estado }: PorCotizarProps) => {
  const navigate = useNavigate()
  const antigua = resumen?.masAntiguaPorCotizar

  return (
    <DashboardCard titulo="Pendientes" estado={estado} esqueleto={["12rem"]}>
      {resumen && (
        <Contenido>
          <Fila>
            <Espera>
              <small>{antigua ? "Espera más larga" : "Por cotizar"}</small>
              <strong>{antigua ? tiempoDesde(antigua.fechaSolicitud) : "Al día"}</strong>
              {antigua && <small>{antigua.curso}</small>}
            </Espera>
            <Cuenta>
              <strong>{resumen.porCotizar}</strong>
              <small>por cotizar</small>
            </Cuenta>
          </Fila>
          <Fila>
            {resumen.pagosPorValidar > 0 ? (
              <Badge tone="accent">
                {resumen.pagosPorValidar} {resumen.pagosPorValidar === 1 ? "pago" : "pagos"} por validar
              </Badge>
            ) : (
              <Badge tone="success">Pagos al día</Badge>
            )}
            <Accion type="button" onClick={() => navigate("/admin/solicitudes")}>
              Revisar
            </Accion>
          </Fila>
        </Contenido>
      )}
    </DashboardCard>
  )
}

export default PorCotizar
