import axios from "axios"
import { useState } from "react"
import { FiAlertCircle, FiCheck, FiClipboard, FiClock, FiCopy, FiImage, FiXCircle } from "react-icons/fi"
import ComprobanteViewer from "@/components/ComprobanteViewer/ComprobanteViewer"
import { CUENTA_TRANSFERENCIA } from "@/config/pago"
import { PagoError, type usePagarPedido } from "@/hooks/usePedidos"
import { ESTADOS, type PedidoDetalle } from "@/models/pedido.model"
import {
  Badge,
  DangerButton,
  ErrorText,
  GhostButton,
  IconBadge,
  Panel,
  PanelHeader,
  PanelTitle,
  PrimaryButton,
  Thumb,
} from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import { formatPrecio } from "@/utilities/currency"
import { formatDia, formatFecha } from "@/utilities/date"
import { tonoEstado } from "@/utilities/estadoPedido"
import ComprobanteUpload from "../ComprobanteUpload/ComprobanteUpload"
import RechazarDialog from "../RechazarDialog/RechazarDialog"
import {
  Acciones,
  Body,
  CopyButton,
  Cuenta,
  Estado,
  EstadoIcon,
  Facts,
  HeaderTop,
  List,
  Nota,
  PagoCard,
  PagoTitle,
  Productos,
  Row,
  RowInfo,
  RowPrice,
  SectionTitle,
  Totals,
} from "./CotizacionDetail.styles"

const MONEDA = "GTQ"

// Referencia corta para que UVGo identifique la transferencia
const referenciaPago = (pedido: PedidoDetalle) => pedido.id.slice(0, 8).toUpperCase()

const motivo = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    if (status === 415) return "El archivo debe ser una foto (JPG o PNG) o un PDF."
    if (status === 413) return "El archivo supera los 5 MB. Sube una foto o PDF más liviano."
    if (status === 409) return "La solicitud cambió (el equipo actualizó la cotización). Revisa el total antes de pagar."
  }
  return getErrorMessage(error, "No pudimos enviar tu comprobante. Intenta de nuevo.")
}

const mensajeError = (error: unknown) => {
  if (error instanceof PagoError) {
    return error.aceptada
      ? `Tu pedido quedó confirmado, pero no pudimos subir el comprobante. ${motivo(error.cause)} Vuelve a intentarlo.`
      : motivo(error.cause)
  }
  return motivo(error)
}

interface CotizacionDetailProps {
  pedido: PedidoDetalle
  // Vive en la página para que el error se siga viendo cuando la solicitud se recarga
  pagar: ReturnType<typeof usePagarPedido>
  onRechazada: () => void
}

const CotizacionDetail = ({ pedido, pagar, onRechazada }: CotizacionDetailProps) => {
  const [archivo, setArchivo] = useState<File | null>(null)
  const [rechazando, setRechazando] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [reemplazando, setReemplazando] = useState(false)

  const { estado } = pedido
  const conPrecios = pedido.fechaCotizacion !== null
  const errorDeEsta = pagar.isError && pagar.variables?.pedido.id === pedido.id
  const productos = (pedido.total ?? 0) - (pedido.cargoServicio ?? 0)
  // Pendiente de pagar: cotizada, o confirmada sin comprobante (p. ej. si falló la subida)
  const debePagar = estado === "COTIZADO" || (estado === "CONFIRMADO" && !pedido.comprobante)

  const copiarCuenta = async () => {
    try {
      await navigator.clipboard.writeText(CUENTA_TRANSFERENCIA.numero)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Sin permiso para el portapapeles: el número sigue visible para copiarlo a mano
    }
  }

  const enviar = () => archivo && pagar.mutate({ pedido, archivo })

  const errorPago = errorDeEsta && (
    <ErrorText role="alert">
      <FiAlertCircle size={14} aria-hidden />
      {mensajeError(pagar.error)}
    </ErrorText>
  )

  const datosTransferencia = (
    <Cuenta>
      <dt>Banco</dt>
      <dd>{CUENTA_TRANSFERENCIA.banco}</dd>
      <dt>Cuenta</dt>
      <dd>
        {CUENTA_TRANSFERENCIA.tipo} {CUENTA_TRANSFERENCIA.numero}
        <CopyButton type="button" onClick={copiarCuenta} aria-label="Copiar número de cuenta">
          {copiado ? <FiCheck size={12} aria-hidden /> : <FiCopy size={12} aria-hidden />}
          {copiado ? "Copiado" : "Copiar"}
        </CopyButton>
      </dd>
      <dt>A nombre de</dt>
      <dd>{CUENTA_TRANSFERENCIA.titular}</dd>
      <dt>Monto</dt>
      <dd className="monto">{formatPrecio(pedido.total ?? 0, MONEDA)}</dd>
      <dt>Referencia</dt>
      <dd>{referenciaPago(pedido)}</dd>
    </Cuenta>
  )

  const tarjetaPago = () => {
    if (debePagar)
      return (
        <>
          <PagoTitle id="pago-title">
            {estado === "COTIZADO" ? "Transferencia" : "Falta tu comprobante"}
            <span>
              {estado === "COTIZADO"
                ? "Deposita el total y sube tu comprobante para confirmar el pedido."
                : "Tu pedido ya está confirmado. Deposita el total y sube tu comprobante."}
            </span>
          </PagoTitle>
          {datosTransferencia}
          <ComprobanteUpload archivo={archivo} onChange={setArchivo} disabled={pagar.isPending} />
          {errorPago}
          <Acciones>
            <PrimaryButton type="button" disabled={!archivo || pagar.isPending} onClick={enviar}>
              {pagar.isPending
                ? "Enviando…"
                : estado === "COTIZADO"
                  ? "Enviar comprobante y confirmar"
                  : "Enviar comprobante"}
            </PrimaryButton>
            <DangerButton type="button" onClick={() => setRechazando(true)} disabled={pagar.isPending}>
              {estado === "COTIZADO" ? "Rechazar cotización" : "Cancelar pedido"}
            </DangerButton>
          </Acciones>
        </>
      )

    if (estado === "CONFIRMADO")
      return (
        <>
          <Estado>
            <EstadoIcon tone="accent">
              <FiClock size={22} aria-hidden />
            </EstadoIcon>
            <strong id="pago-title">Comprobante en revisión</strong>
            <p>Estamos validando tu pago. Te avisaremos por correo cuando lo confirmemos.</p>
          </Estado>
          <ComprobanteViewer pedido={pedido} />
          {reemplazando ? (
            <>
              <ComprobanteUpload archivo={archivo} onChange={setArchivo} disabled={pagar.isPending} />
              {errorPago}
              <Acciones>
                <PrimaryButton type="button" disabled={!archivo || pagar.isPending} onClick={enviar}>
                  {pagar.isPending ? "Enviando…" : "Enviar nuevo comprobante"}
                </PrimaryButton>
                <GhostButton
                  type="button"
                  disabled={pagar.isPending}
                  onClick={() => {
                    setReemplazando(false)
                    setArchivo(null)
                  }}
                >
                  Mantener el actual
                </GhostButton>
              </Acciones>
            </>
          ) : (
            <GhostButton type="button" onClick={() => setReemplazando(true)}>
              ¿Te equivocaste de archivo? Reemplazar comprobante
            </GhostButton>
          )}
        </>
      )

    if (estado === "SOLICITADO")
      return (
        <Estado>
          <EstadoIcon tone="accent">
            <FiClock size={22} aria-hidden />
          </EstadoIcon>
          <strong id="pago-title">Estamos cotizando tu solicitud</strong>
          <p>Te avisaremos por correo cuando esté lista para que la revises y pagues.</p>
          <GhostButton type="button" onClick={() => setRechazando(true)}>
            Cancelar solicitud
          </GhostButton>
        </Estado>
      )

    if (estado === "CANCELADO")
      return (
        <Estado>
          <EstadoIcon tone="danger">
            <FiXCircle size={22} aria-hidden />
          </EstadoIcon>
          <strong id="pago-title">Solicitud cancelada</strong>
          <p>No se comprará nada de esta solicitud.</p>
        </Estado>
      )

    return (
      <>
        <Estado>
          <EstadoIcon tone="success">
            <FiCheck size={22} aria-hidden />
          </EstadoIcon>
          <strong id="pago-title">{estado === "PAGADO" ? "¡Pago validado!" : ESTADOS[estado]}</strong>
          <p>
            {estado === "PAGADO"
              ? `Confirmamos tu pago${pedido.fechaPago ? ` el ${formatFecha(pedido.fechaPago)}` : ""}. Te avisaremos cuando tu pedido avance.`
              : "Tu pedido está en proceso. Te avisaremos por correo cuando avance."}
          </p>
        </Estado>
        <ComprobanteViewer pedido={pedido} />
      </>
    )
  }

  return (
    <Panel aria-labelledby="cotizacion-title">
      <PanelHeader>
        <div>
          <HeaderTop>
            <PanelTitle id="cotizacion-title">
              <IconBadge>
                <FiClipboard size={16} />
              </IconBadge>
              {pedido.curso}
            </PanelTitle>
            <Badge tone={tonoEstado(estado)}>{estado === "COTIZADO" ? "Lista para pagar" : ESTADOS[estado]}</Badge>
          </HeaderTop>
          <Facts>
            {pedido.nombreCatedratico} · Solicitada el {formatFecha(pedido.fechaSolicitud)} · Para el{" "}
            {formatDia(pedido.fechaLimite)}
          </Facts>
        </div>
      </PanelHeader>

      <Body>
        <Productos aria-labelledby="productos-title">
          <SectionTitle id="productos-title">
            {conPrecios ? "Productos cotizados" : "Productos solicitados"}
          </SectionTitle>
          <List>
            {pedido.productos.map((item) => (
              <Row key={item.id}>
                <Thumb size="sm">
                  {item.imagen ? <img src={item.imagen} alt="" loading="lazy" /> : <FiImage size={18} aria-hidden />}
                </Thumb>
                <RowInfo>
                  <strong title={item.descripcion}>{item.descripcion}</strong>
                  <span>
                    Cantidad: {item.cantidad}
                    {item.tienda ? ` · ${item.tienda}` : ""}
                  </span>
                </RowInfo>
                <RowPrice>
                  {item.precioUnitario !== null && item.subtotal !== null ? (
                    <>
                      <strong>{formatPrecio(item.subtotal, MONEDA)}</strong>
                      <span>
                        {item.cantidad} × {formatPrecio(item.precioUnitario, MONEDA)}
                      </span>
                    </>
                  ) : (
                    <span>Por cotizar</span>
                  )}
                </RowPrice>
              </Row>
            ))}
          </List>

          {conPrecios && (
            <Totals>
              <dt>Productos</dt>
              <dd>{formatPrecio(productos, MONEDA)}</dd>
              <dt>Cargo por servicio</dt>
              <dd>{formatPrecio(pedido.cargoServicio ?? 0, MONEDA)}</dd>
              <dt className="total">Total</dt>
              <dd className="total">{formatPrecio(pedido.total ?? 0, MONEDA)}</dd>
            </Totals>
          )}

          {pedido.notasCotizacion && (
            <Nota>
              <strong>Notas de UVGo:</strong> {pedido.notasCotizacion}
            </Nota>
          )}
        </Productos>

        <PagoCard aria-labelledby="pago-title">{tarjetaPago()}</PagoCard>
      </Body>

      <RechazarDialog
        pedido={pedido}
        open={rechazando}
        onClose={() => setRechazando(false)}
        onRechazada={onRechazada}
      />
    </Panel>
  )
}

export default CotizacionDetail
