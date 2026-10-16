import axios from "axios"
import { useState, type FocusEvent, type FormEvent } from "react"
import { FiAlertCircle, FiClipboard, FiExternalLink, FiImage } from "react-icons/fi"
import type { useCotizarPedido } from "@/hooks/usePedidos"
import { ESTADOS, esCotizable, type ItemPedido, type PedidoDetalle } from "@/models/pedido.model"
import { getErrorMessage } from "@/utilities/apiError"
import { formatPrecio } from "@/utilities/currency"
import { formatDia, formatFecha } from "@/utilities/date"
import { tonoEstado } from "@/utilities/estadoPedido"
import {
  Badge,
  DangerButton,
  EmptyState,
  ErrorText,
  IconBadge,
  Panel,
  PanelHeader,
  PanelTitle,
  PrimaryButton,
  ScrollArea,
  SegmentButton,
  SegmentCount,
  Segmented,
  Thumb,
} from "../../Solicitudes.styles"
import ComprobanteViewer from "@/components/ComprobanteViewer/ComprobanteViewer"
import CancelarDialog from "../CancelarDialog/CancelarDialog"
import ValidarPagoDialog from "../ValidarPagoDialog/ValidarPagoDialog"
import {
  Facts,
  Footer,
  FooterActions,
  FooterAlert,
  FooterFields,
  HeaderTop,
  Notice,
  Observaciones,
  PriceCell,
  PriceField,
  PriceText,
  ReadOnly,
  Row,
  RowInfo,
  RowMeta,
  RowTitle,
  SectionLabel,
  Subtotal,
  TabsRow,
  Totals,
} from "./SolicitudDetail.styles"

type Tab = "CATALOGO" | "WEB"
const MONEDA = "GTQ"

// Precio inicial de cada producto: el ya cotizado o, para el catálogo, su precio en quetzales
const precioInicial = (item: ItemPedido) => {
  if (item.precioUnitario !== null) return String(item.precioUnitario)
  if (item.tipo === "CATALOGO" && item.precioReferencia !== null && (item.monedaReferencia ?? MONEDA) === MONEDA)
    return String(item.precioReferencia)
  return ""
}

// Número válido para el backend: >= 0 y con hasta 2 decimales
const leerMonto = (texto: string) => {
  if (texto.trim() === "") return null
  const valor = Number(texto)
  return Number.isFinite(valor) && valor >= 0 ? Math.round(valor * 100) / 100 : null
}

// formatPrecio ya incluye la moneda ("USD 9.99", "Q 4.00")
const referencia = (item: ItemPedido) =>
  item.precioReferencia === null ? null : `Ref. ${formatPrecio(item.precioReferencia, item.monedaReferencia)}`

// Los campos vienen con un valor (precio del catálogo o ya cotizado): al entrar se selecciona
// para que lo escrito lo reemplace en vez de agregarse al final ("95" + "50" → "9550")
const seleccionarTodo = (e: FocusEvent<HTMLInputElement>) => e.target.select()

// Qué falta (o qué pasó) en una solicitud que ya no se puede cotizar
const avisoEstado = (pedido: PedidoDetalle) => {
  if (pedido.estado === "CANCELADO") return "Esta solicitud fue cancelada."
  if (pedido.estado === "CONFIRMADO")
    return pedido.comprobante
      ? "Revisa el comprobante y valida el pago cuando confirmes el depósito en la cuenta."
      : "El estudiante aceptó la cotización. Esperando que suba su comprobante de pago."
  if (pedido.estado === "PAGADO")
    return `Pago validado${pedido.fechaPago ? ` el ${formatFecha(pedido.fechaPago)}` : ""}.`
  return "El pedido está en proceso; la cotización ya no se puede modificar."
}

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 409
    ? "La solicitud cambió mientras la revisabas (el estudiante la editó o se canceló). Ya cargamos la versión nueva: revísala y vuelve a enviar."
    : getErrorMessage(error, "No se pudo enviar la cotización. Intenta de nuevo.")

interface SolicitudDetailProps {
  pedido: PedidoDetalle
  // La mutación vive en la página para que su error sobreviva a la recarga de la solicitud
  cotizar: ReturnType<typeof useCotizarPedido>
  onCancelado: () => void
  onPagado: () => void
}

// El padre lo monta con key={id + version}: si la solicitud cambia, los precios se recargan del servidor
const SolicitudDetail = ({ pedido, cotizar, onCancelado, onPagado }: SolicitudDetailProps) => {
  const editable = esCotizable(pedido.estado)
  const web = pedido.productos.filter((p) => p.tipo === "WEB")
  const catalogo = pedido.productos.filter((p) => p.tipo === "CATALOGO")

  const [tab, setTab] = useState<Tab>(web.length > 0 ? "WEB" : "CATALOGO")
  const [precios, setPrecios] = useState<Record<string, string>>(() =>
    Object.fromEntries(pedido.productos.map((item) => [item.id, precioInicial(item)])),
  )
  const [cargo, setCargo] = useState(pedido.cargoServicio !== null ? String(pedido.cargoServicio) : "0")
  const [notas, setNotas] = useState(pedido.notasCotizacion ?? "")
  const [cancelando, setCancelando] = useState(false)
  const [validando, setValidando] = useState(false)
  const porValidar = pedido.estado === "CONFIRMADO" && pedido.comprobante !== null

  const montos = Object.fromEntries(pedido.productos.map((item) => [item.id, leerMonto(precios[item.id] ?? "")]))
  const faltan = (items: ItemPedido[]) => items.filter((item) => montos[item.id] === null).length
  const cargoMonto = leerMonto(cargo)
  const subtotal = pedido.productos.reduce((suma, item) => suma + (montos[item.id] ?? 0) * item.cantidad, 0)
  const listo = faltan(pedido.productos) === 0 && cargoMonto !== null
  const errorDeEsta = cotizar.isError && cotizar.variables?.pedidoId === pedido.id

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!listo || cargoMonto === null) return
    cotizar.mutate({
      pedidoId: pedido.id,
      cotizacion: {
        version: pedido.version,
        precios: pedido.productos.map((item) => ({ itemId: item.id, precioUnitario: montos[item.id] as number })),
        cargoServicio: cargoMonto,
        ...(notas.trim() ? { notas: notas.trim() } : {}),
      },
    })
  }

  const tabs: Array<{ id: Tab; label: string; items: ItemPedido[] }> = [
    { id: "WEB", label: "De la web", items: web },
    { id: "CATALOGO", label: "Del catálogo", items: catalogo },
  ]
  const visibles = tab === "WEB" ? web : catalogo

  const renderItem = (item: ItemPedido) => {
    const monto = montos[item.id]
    const ref = referencia(item)
    return (
      <Row key={item.id}>
        <Thumb size="sm">
          {item.imagen ? <img src={item.imagen} alt="" loading="lazy" /> : <FiImage size={18} aria-hidden />}
        </Thumb>
        <RowInfo>
          <RowTitle title={item.descripcion}>{item.descripcion}</RowTitle>
          <RowMeta>
            <span>Cantidad: {item.cantidad}</span>
            {item.tienda && <span>{item.tienda}</span>}
            {ref && <span>{ref}</span>}
            {item.tipo === "WEB" && item.url && (
              <a href={item.url} target="_blank" rel="noreferrer">
                Ver producto <FiExternalLink size={12} aria-hidden />
              </a>
            )}
          </RowMeta>
        </RowInfo>
        <PriceCell>
          {editable ? (
            <PriceField missing={monto === null}>
              Q
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={precios[item.id] ?? ""}
                placeholder="0.00"
                aria-label={`Precio unitario de ${item.descripcion}`}
                onFocus={seleccionarTodo}
                onChange={(e) => setPrecios((current) => ({ ...current, [item.id]: e.target.value }))}
              />
            </PriceField>
          ) : (
            <PriceText>{item.precioUnitario === null ? "—" : formatPrecio(item.precioUnitario, MONEDA)}</PriceText>
          )}
          <Subtotal>
            {editable
              ? monto === null
                ? "Falta el precio"
                : `Subtotal ${formatPrecio(monto * item.cantidad, MONEDA)}`
              : item.subtotal !== null && `Subtotal ${formatPrecio(item.subtotal, MONEDA)}`}
          </Subtotal>
        </PriceCell>
      </Row>
    )
  }

  return (
    <Panel aria-labelledby="detalle-title">
      <PanelHeader>
        <div>
          <HeaderTop>
            <PanelTitle id="detalle-title">
              <IconBadge>
                <FiClipboard size={16} />
              </IconBadge>
              {pedido.curso}
            </PanelTitle>
            <Badge tone={tonoEstado(pedido.estado)}>{ESTADOS[pedido.estado]}</Badge>
          </HeaderTop>
          <Facts>
            <div>
              <dt>Catedrático</dt>
              <dd>{pedido.nombreCatedratico}</dd>
            </div>
            <div>
              <dt>Solicitada</dt>
              <dd>{formatFecha(pedido.fechaSolicitud)}</dd>
            </div>
            <div>
              <dt>Fecha límite</dt>
              <dd>{formatDia(pedido.fechaLimite)}</dd>
            </div>
            {pedido.puntoEntregaPreferido && (
              <div>
                <dt>Entrega</dt>
                <dd>{pedido.puntoEntregaPreferido}</dd>
              </div>
            )}
          </Facts>
          {pedido.observaciones && (
            <Observaciones>
              <strong>Observaciones:</strong> {pedido.observaciones}
            </Observaciones>
          )}
        </div>
      </PanelHeader>

      <TabsRow>
        <Segmented role="tablist" aria-label="Productos de la solicitud">
          {tabs.map(({ id, label, items }) => (
            <SegmentButton
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls="panel-productos"
              selected={tab === id}
              onClick={() => setTab(id)}
            >
              {label}
              <SegmentCount highlight={editable && faltan(items) > 0}>{items.length}</SegmentCount>
            </SegmentButton>
          ))}
        </Segmented>
      </TabsRow>

      <ScrollArea role="tabpanel" id="panel-productos" aria-labelledby={`tab-${tab}`}>
        {visibles.length === 0 ? (
          <EmptyState>
            <strong>{tab === "WEB" ? "Sin productos de la web" : "Sin productos del catálogo"}</strong>
            <p>
              {tab === "WEB"
                ? "Todos los productos de esta solicitud están en el catálogo de UVGo."
                : "Todos los productos de esta solicitud son de la web."}
            </p>
          </EmptyState>
        ) : (
          visibles.map(renderItem)
        )}
      </ScrollArea>

      <Footer onSubmit={handleSubmit} aria-label="Cotización">
        {editable ? (
          <FooterFields>
            <div>
              <span id="cargo-label">Cargo por servicio</span>
              <PriceField missing={cargoMonto === null}>
                Q
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={cargo}
                  onFocus={seleccionarTodo}
                  onChange={(e) => setCargo(e.target.value)}
                  aria-labelledby="cargo-label"
                />
              </PriceField>
            </div>
            <label>
              Notas para el estudiante
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                maxLength={2000}
                placeholder="Ej. tiempo de entrega, productos sustitutos…"
              />
            </label>
          </FooterFields>
        ) : (
          <ReadOnly>
            {pedido.comprobante && (
              <section aria-label="Comprobante de pago">
                <SectionLabel>Comprobante de pago</SectionLabel>
                <ComprobanteViewer pedido={pedido} />
              </section>
            )}
            {pedido.notasCotizacion && (
              <Observaciones>
                <strong>Notas de la cotización:</strong> {pedido.notasCotizacion}
              </Observaciones>
            )}
          </ReadOnly>
        )}

        <Totals>
          <dl>
            <dt>Productos</dt>
            <dd>{formatPrecio(editable ? subtotal : (pedido.total ?? 0) - (pedido.cargoServicio ?? 0), MONEDA)}</dd>
            <dt>Cargo por servicio</dt>
            <dd>{formatPrecio(editable ? (cargoMonto ?? 0) : (pedido.cargoServicio ?? 0), MONEDA)}</dd>
            <dt className="total">Total</dt>
            <dd className="total">
              {formatPrecio(editable ? subtotal + (cargoMonto ?? 0) : (pedido.total ?? 0), MONEDA)}
            </dd>
          </dl>

          {editable ? (
            <>
              {!listo && (
                <Notice>
                  Falta el precio de {faltan(pedido.productos)} {faltan(pedido.productos) === 1 ? "producto" : "productos"}.
                </Notice>
              )}
              <FooterActions>
                <DangerButton type="button" onClick={() => setCancelando(true)} disabled={cotizar.isPending}>
                  Cancelar solicitud
                </DangerButton>
                <PrimaryButton type="submit" disabled={!listo || cotizar.isPending}>
                  {cotizar.isPending
                    ? "Enviando…"
                    : pedido.estado === "COTIZADO"
                      ? "Actualizar cotización"
                      : "Enviar cotización"}
                </PrimaryButton>
              </FooterActions>
            </>
          ) : (
            <>
              <Notice>{avisoEstado(pedido)}</Notice>
              {porValidar && (
                <FooterActions>
                  <PrimaryButton type="button" onClick={() => setValidando(true)}>
                    Validar pago
                  </PrimaryButton>
                </FooterActions>
              )}
            </>
          )}
        </Totals>

        {errorDeEsta && (
          <FooterAlert>
            <ErrorText role="alert">
              <FiAlertCircle size={14} aria-hidden />
              {mensajeError(cotizar.error)}
            </ErrorText>
          </FooterAlert>
        )}
      </Footer>

      <CancelarDialog
        pedido={pedido}
        open={cancelando}
        onClose={() => setCancelando(false)}
        onCancelado={onCancelado}
      />
      <ValidarPagoDialog pedido={pedido} open={validando} onClose={() => setValidando(false)} onPagado={onPagado} />
    </Panel>
  )
}

export default SolicitudDetail
