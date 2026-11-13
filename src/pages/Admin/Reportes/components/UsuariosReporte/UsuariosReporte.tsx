import type { ClienteReporte, UsuariosReporte as Usuarios } from "@/models/reporte.model"
import { formatPrecio } from "@/utilities/currency"
import DashboardCard, { type EstadoCarga } from "../../../components/DashboardCard/DashboardCard"
import { formatEntero } from "../../formato"
import TablaReporte, { type Columna } from "../TablaReporte/TablaReporte"
import { Cifras, Nota, Subtitulo } from "./UsuariosReporte.styles"

interface UsuariosReporteProps {
  usuarios: Usuarios | undefined
  estado: EstadoCarga
}

const columnas: Columna<ClienteReporte>[] = [
  { titulo: "Estudiante", celda: (c) => c.nombre },
  { titulo: "Carné", celda: (c) => c.carne ?? "—" },
  { titulo: "Pedidos", celda: (c) => formatEntero(c.pedidos), numero: true },
  { titulo: "Total", celda: (c) => formatPrecio(c.total), numero: true },
]

// Cuánta gente usa UVGo y quiénes compran más en el periodo
const UsuariosReporte = ({ usuarios, estado }: UsuariosReporteProps) => (
  <DashboardCard titulo="Usuarios" to={null} estado={estado} esqueleto={["9.6rem", "16rem"]}>
    {usuarios && (
      <>
        <Cifras>
          <div>
            <strong>{formatEntero(usuarios.estudiantes)}</strong>
            <span>Estudiantes</span>
            <small>{formatEntero(usuarios.estudiantesNuevos)} nuevos en el periodo</small>
          </div>
          <div>
            <strong>{formatEntero(usuarios.estudiantesConSolicitud)}</strong>
            <span>Con solicitud</span>
            <small>Pidieron en el periodo</small>
          </div>
          <div>
            <strong>{formatEntero(usuarios.pilotos)}</strong>
            <span>Pilotos</span>
            <small>{formatEntero(usuarios.pilotosActivos)} activos</small>
          </div>
          <div>
            <strong>{formatEntero(usuarios.administradores)}</strong>
            <span>Administradores</span>
          </div>
        </Cifras>
        <Subtitulo>Estudiantes que más compraron</Subtitulo>
        {usuarios.topEstudiantes.length > 0 ? (
          <TablaReporte
            resumen="Estudiantes con mayor monto en pedidos del periodo"
            columnas={columnas}
            filas={usuarios.topEstudiantes}
            clave={(c) => c.id}
          />
        ) : (
          <Nota>Todavía no hay pedidos confirmados en el periodo.</Nota>
        )}
      </>
    )}
  </DashboardCard>
)

export default UsuariosReporte
