import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { obtenerSolicitud } from "@/services/pedido.service"
import { useAuthStore } from "@/store/auth.store"
import { FiCheckCircle } from "react-icons/fi"
import SolicitudList from "@/components/SolicitudList/SolicitudList"
import { usePagarPedido, usePedidos } from "@/hooks/usePedidos"
import { Aviso, EmptyState, ErrorText, GhostButton, Eyebrow, Header, Page, Panel, Title } from "@/styles/shared.styles"
import CotizacionDetail from "./components/CotizacionDetail/CotizacionDetail"
import { Split } from "./MisSolicitudes.styles"

// El estudiante ve sus solicitudes; las cotizadas las paga (comprobante) o las rechaza
const MisSolicitudes = () => {
  // Sin filtro: el backend devuelve solo las del estudiante autenticado, más recientes primero
  const { data, isLoading, isError, refetch } = usePedidos()
  const solicitudes = data?.contenido ?? []
  const usuario = useAuthStore(s => s.usuario?.id)
  const [params, setParams] = useSearchParams()
  const enlaceId = params.get('solicitud')
  const enlazada = useQuery({
    queryKey: ['pedidos', 'detalle', usuario, enlaceId],
    queryFn: () => obtenerSolicitud(enlaceId!),
    enabled: !!usuario && !!enlaceId,
  })

  const [selectedId, setSelectedId] = useState<string>()
  // Sin selección se abre primero la que espera pago (cotizada o confirmada sin comprobante); si no hay, la más reciente
  const selected = enlaceId ? enlazada.data :
    solicitudes.find((s) => s.id === selectedId) ??
    solicitudes.find((s) => s.estado === "COTIZADO" || (s.estado === "CONFIRMADO" && !s.comprobante)) ??
    solicitudes[0]

  const pagar = usePagarPedido()
  const [aviso, setAviso] = useState<string>()

  const seleccionar = (id: string) => {
    setParams({})
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

        {enlaceId && (enlazada.isPending || enlazada.isError) ? (
          <Panel>
            {enlazada.isPending ? <p>Cargando solicitud…</p> : <>
              <ErrorText role="alert">No se pudo abrir la solicitud. Puede no estar disponible para tu cuenta.</ErrorText>
              <GhostButton onClick={() => void enlazada.refetch()}>Reintentar</GhostButton>
            </>}
          </Panel>
        ) : selected ? (
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
