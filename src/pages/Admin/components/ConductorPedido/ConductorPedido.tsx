import { useState, type FormEvent } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { MdDeliveryDining } from "react-icons/md"
import { useAsignarPiloto, usePilotos, useQuitarPiloto } from "@/hooks/usePilotos"
import { admitePiloto, type PedidoDetalle } from "@/models/pedido.model"
import { ErrorText, GhostButton, PrimaryButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Acciones, Actual, Avatar, Formulario, Nota, Selector } from "./ConductorPedido.styles"

interface ConductorPedidoProps {
  pedido: PedidoDetalle | undefined
  estado: EstadoCarga
}

interface FormProps {
  pedido: PedidoDetalle
}

// El padre lo monta con key={id + version}: al cambiar de pedido (o cuando se actualiza) el formulario arranca limpio
const Contenido = ({ pedido }: FormProps) => {
  const pilotos = usePilotos()
  const asignar = useAsignarPiloto()
  const quitar = useQuitarPiloto()
  const [elegido, setElegido] = useState(pedido.piloto?.id ?? "")

  const lista = pilotos.data ?? []
  const ocupado = asignar.isPending || quitar.isPending
  const cambio = elegido !== "" && elegido !== pedido.piloto?.id
  const error = asignar.error ?? quitar.error

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!cambio) return
    quitar.reset()
    asignar.mutate({ pedidoId: pedido.id, version: pedido.version, pilotoId: elegido })
  }

  return (
    <>
      <Actual>
        <Avatar>
          <MdDeliveryDining size={24} aria-hidden />
        </Avatar>
        <div>
          <small>Conductor</small>
          <strong>{pedido.piloto?.nombre ?? "Sin asignar"}</strong>
        </div>
      </Actual>

      {admitePiloto(pedido.estado) ? (
        <Formulario onSubmit={handleSubmit} aria-label="Asignar conductor">
          <label htmlFor={`piloto-${pedido.id}`}>{pedido.piloto ? "Cambiar de conductor" : "Asignar conductor"}</label>
          <Selector
            id={`piloto-${pedido.id}`}
            value={elegido}
            disabled={ocupado || pilotos.isLoading || lista.length === 0}
            onChange={(e) => setElegido(e.target.value)}
          >
            <option value="">{pilotos.isLoading ? "Cargando conductores…" : lista.length === 0 ? "No hay conductores disponibles" : "Elige un conductor"}</option>
            {lista.map((piloto) => (
              <option key={piloto.id} value={piloto.id}>
                {piloto.nombre}
              </option>
            ))}
          </Selector>
          <Acciones>
            <PrimaryButton type="submit" disabled={!cambio || ocupado}>
              {asignar.isPending ? "Asignando…" : pedido.piloto ? "Cambiar conductor" : "Asignar conductor"}
            </PrimaryButton>
            {pedido.piloto && (
              <GhostButton
                type="button"
                disabled={ocupado}
                onClick={() => {
                  asignar.reset()
                  quitar.mutate({ pedidoId: pedido.id, version: pedido.version })
                }}
              >
                {quitar.isPending ? "Quitando…" : "Quitar"}
              </GhostButton>
            )}
          </Acciones>
          {pilotos.isError && (
            <ErrorText role="alert">
              <FiAlertCircle size={14} aria-hidden />
              No pudimos cargar los conductores.
              <GhostButton type="button" onClick={() => void pilotos.refetch()}>
                Reintentar
              </GhostButton>
            </ErrorText>
          )}
          {error && (
            <ErrorText role="alert">
              <FiAlertCircle size={14} aria-hidden />
              {getErrorMessage(error, "No se pudo cambiar el conductor. Intenta de nuevo.")}
            </ErrorText>
          )}
        </Formulario>
      ) : (
        <Nota>
          {pedido.estado === "ENTREGADO"
            ? "El pedido ya se entregó."
            : "El conductor se asigna cuando el estudiante acepta la cotización."}
        </Nota>
      )}
      {pedido.piloto && admitePiloto(pedido.estado) && (
        <Nota>{pedido.piloto.nombre} recibe el pedido al instante en su simulador y su posición aparece en el mapa.</Nota>
      )}
    </>
  )
}

// Quién entrega el pedido seleccionado: el admin elige entre los conductores disponibles
const ConductorPedido = ({ pedido, estado }: ConductorPedidoProps) => (
  <DashboardCard
    titulo="Conductor"
    estado={estado}
    esqueleto={["6.4rem", "4.4rem"]}
    vacio={pedido ? null : { titulo: "Ningún pedido", texto: "Elige un pedido de la lista para asignarle un conductor." }}
  >
    {pedido && <Contenido key={`${pedido.id}-${pedido.version}`} pedido={pedido} />}
  </DashboardCard>
)

export default ConductorPedido
