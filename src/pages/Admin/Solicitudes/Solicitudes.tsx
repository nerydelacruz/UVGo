import { useState } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { useCotizarPedido, usePedidos } from "@/hooks/usePedidos"
import SolicitudDetail from "./components/SolicitudDetail/SolicitudDetail"
import SolicitudList from "@/components/SolicitudList/SolicitudList"
import { FILTROS } from "@/utilities/estadoPedido"
import {
  Aviso,
  EmptyState,
  Eyebrow,
  Header,
  Page,
  Panel,
  SegmentButton,
  Segmented,
  Split,
  Title,
} from "./Solicitudes.styles"

const Solicitudes = () => {
  const [filtro, setFiltro] = useState(0)
  const { estado, label } = FILTROS[filtro]
  const { data, isLoading, isError, refetch } = usePedidos(estado)
  const solicitudes = data?.contenido ?? []

  const [selectedId, setSelectedId] = useState<string>()
  // Sin selección (o si la elegida salió del filtro, p. ej. al cotizarla) se muestra la más reciente
  const selected = solicitudes.find((s) => s.id === selectedId) ?? solicitudes[0]

  // Vive aquí para que el error (p. ej. 409) se siga viendo cuando la solicitud se recarga
  const cotizar = useCotizarPedido()
  const [aviso, setAviso] = useState<string>()

  const seleccionar = (id: string) => {
    cotizar.reset()
    setAviso(undefined)
    setSelectedId(id)
  }

  const cambiarFiltro = (indice: number) => {
    cotizar.reset()
    setAviso(undefined)
    setSelectedId(undefined)
    setFiltro(indice)
  }

  const handleCotizar: typeof cotizar.mutate = (variables, options) =>
    cotizar.mutate(variables, {
      ...options,
      onSuccess: (pedido, ...rest) => {
        setAviso(`Cotización de ${pedido.curso} enviada. Le avisamos al estudiante por correo.`)
        options?.onSuccess?.(pedido, ...rest)
      },
    })

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Vista admin</Eyebrow>
          <Title>Solicitudes</Title>
        </div>
        <Segmented role="tablist" aria-label="Filtrar por estado">
          {FILTROS.map((f, i) => (
            <SegmentButton
              key={f.label}
              type="button"
              role="tab"
              aria-selected={filtro === i}
              selected={filtro === i}
              onClick={() => cambiarFiltro(i)}
            >
              {f.label}
            </SegmentButton>
          ))}
        </Segmented>
      </Header>

      {aviso && (
        <Aviso role="status">
          <FiCheckCircle size={16} aria-hidden />
          {aviso}
        </Aviso>
      )}

      <Split>
        <SolicitudList
          titulo={label}
          vacio="No hay solicitudes en este estado. Cuando un estudiante pida una cotización aparecerá aquí."
          solicitudes={solicitudes}
          total={data?.totalElementos ?? 0}
          selectedId={selected?.id}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
          onSelect={seleccionar}
        />

        {selected?.verificandoStock ? (
          <Panel>
            <EmptyState>
              <strong>Verificando productos en stock…</strong>
              <p>Estamos comparando los materiales de {selected.curso} con el stock. Se abrirá sola en unos segundos.</p>
            </EmptyState>
          </Panel>
        ) : selected ? (
          <SolicitudDetail
            key={`${selected.id}-${selected.version}`}
            pedido={selected}
            cotizar={{ ...cotizar, mutate: handleCotizar }}
            onCancelado={() => setAviso(`Solicitud de ${selected.curso} cancelada. Le avisamos al estudiante por correo.`)}
            onPagado={() => setAviso(`Pago de ${selected.curso} validado. Le avisamos al estudiante por correo.`)}
          />
        ) : (
          <Panel>
            <EmptyState>
              <strong>{isLoading ? "Cargando…" : "Nada que revisar"}</strong>
              <p>Selecciona una solicitud para ver sus productos y cotizarla.</p>
            </EmptyState>
          </Panel>
        )}
      </Split>
    </Page>
  )
}

export default Solicitudes
