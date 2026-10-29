import { Fragment } from "react"
import { FiClock } from "react-icons/fi"
import { IconBadge } from "@/styles/shared.styles"
import { FRANJAS, type ResumenPedidos } from "@/utilities/resumenPedidos"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Calor, Celda, Pico, Rotulo } from "./HorarioSolicitudes.styles"

interface HorarioSolicitudesProps {
  resumen: ResumenPedidos | undefined
  estado: EstadoCarga
}

const INICIALES = ["L", "M", "M", "J", "V", "S", "D"]
const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

// A qué hora piden los estudiantes (últimas 4 semanas): sirve para saber cuándo revisar y cotizar
const HorarioSolicitudes = ({ resumen, estado }: HorarioSolicitudesProps) => {
  const max = Math.max(1, ...(resumen?.horario.flat() ?? [0]))

  return (
    <DashboardCard
      titulo="Horario de solicitudes"
      estado={estado}
      esqueleto={["6.4rem", "14rem"]}
      vacio={resumen && !resumen.pico ? { titulo: "Sin solicitudes recientes", texto: "No hubo solicitudes en las últimas 4 semanas." } : null}
    >
      {resumen?.pico && (
        <>
          <Pico>
            <IconBadge>
              <FiClock size={16} aria-hidden />
            </IconBadge>
            <div>
              <span>Hora pico</span>
              <strong>
                {DIAS[resumen.pico.dia]} · {FRANJAS[resumen.pico.franja]} h
              </strong>
            </div>
          </Pico>

          <Calor role="table" aria-label="Solicitudes por día y franja horaria, últimas 4 semanas">
            <Rotulo aria-hidden />
            {INICIALES.map((inicial, i) => (
              <Rotulo key={i} aria-hidden>
                {inicial}
              </Rotulo>
            ))}
            {FRANJAS.map((franja, f) => (
              <Fragment key={franja}>
                <Rotulo>{franja}</Rotulo>
                {resumen.horario.map((franjas, d) => (
                  <Celda
                    key={d}
                    nivel={franjas[f] / max}
                    title={`${DIAS[d]}, ${franja} h: ${franjas[f]} ${franjas[f] === 1 ? "solicitud" : "solicitudes"}`}
                    aria-label={`${DIAS[d]}, ${franja} h: ${franjas[f]}`}
                  />
                ))}
              </Fragment>
            ))}
          </Calor>
        </>
      )}
    </DashboardCard>
  )
}

export default HorarioSolicitudes
