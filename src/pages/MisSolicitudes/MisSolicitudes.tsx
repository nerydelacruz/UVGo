import { useState } from "react"
import { FiCheckCircle } from "react-icons/fi"
import SolicitudList from "@/components/SolicitudList/SolicitudList"
import { usePagarPedido, usePedidos } from "@/hooks/usePedidos"
import { Aviso, EmptyState, Eyebrow, Header, Page, Panel, Title } from "@/styles/shared.styles"
import CotizacionDetail from "./components/CotizacionDetail/CotizacionDetail"
import { Split } from "./MisSolicitudes.styles"

// El estudiante ve sus solicitudes; las cotizadas las paga (comprobante) o las rechaza
const MisSolicitudes = () => {
  // Sin filtro: el backend devuelve solo las del estudiante autenticado, más recientes primero
  const { data, isLoading, isError, refetch } = usePedidos()
  const solicitudes = data?.contenido ?? []

  const [selectedId, setSelectedId] = useState<string>()
  // Sin selección se abre primero la que espera pago (cotizada o confirmada sin comprobante); si no hay, la más reciente
  const selected =
    solicitudes.find((s) => s.id === selectedId) ??
    solicitudes.find((s) => s.estado === "COTIZADO" || (s.estado === "CONFIRMADO" && !s.comprobante)) ??
    solicitudes[0]

  const pagar = usePagarPedido()
  const [aviso, setAviso] = useState<string>()

  const seleccionar = (id: string) => {
    pagar.reset()
    setAviso(undefined)
    setSelectedId(id)
  }

  const handlePagar: typeof pagar.mutate = (variables, options) =>
    pagar.mutate(variables, {
      ...options,
      onSuccess: (pedido, ...rest) => {
        setSelectedId(pedido.id)
        setAviso(`¡Listo! Recibimos tu comprobante de ${pedido.curso}. Lo validaremos y te avisaremos por correo.`)
        options?.onSuccess?.(pedido, ...rest)
      },
    })

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Cotizaciones</Eyebrow>
          <Title>Mis solicitudes</Title>
        </div>
      </Header>

      {aviso && (
        <Aviso role="status">
          <FiCheckCircle size={16} aria-hidden />
          {aviso}
        </Aviso>
      )}

      <Split>
        <SolicitudList
          titulo="Tus solicitudes"
          vacio="Aún no has pedido ninguna cotización. Ve a Cotizar, elige tus productos y presiona “Crear pedido”."
          solicitudes={solicitudes}
          total={data?.totalElementos ?? 0}
          selectedId={selected?.id}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
          onSelect={seleccionar}
        />

        {selected ? (
          <CotizacionDetail
            key={`${selected.id}-${selected.version}`}
            pedido={selected}
            pagar={{ ...pagar, mutate: handlePagar }}
            onRechazada={() => setAviso(`Cancelamos la solicitud de ${selected.curso}.`)}
          />
        ) : (
          <Panel>
            <EmptyState>
              <strong>{isLoading ? "Cargando…" : "Sin solicitudes"}</strong>
              <p>Aquí verás tus cotizaciones para revisarlas y pagarlas.</p>
            </EmptyState>
          </Panel>
        )}
      </Split>
    </Page>
  )
}

export default MisSolicitudes
