import { useEffect, useMemo, useState } from "react"
import { FiAlertCircle, FiDownload, FiExternalLink, FiFileText, FiImage, FiMaximize2 } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, Body, DialogText, DialogTitle } from "@/components/Dialog/Dialog.styles"
import { useComprobante } from "@/hooks/usePedidos"
import type { PedidoDetalle } from "@/models/pedido.model"
import { ErrorText, GhostButton } from "@/styles/shared.styles"
import { formatFecha } from "@/utilities/date"
import { Card, Full, Info, Links, ThumbButton } from "./ComprobanteViewer.styles"

const tamanio = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

interface ComprobanteViewerProps {
  pedido: PedidoDetalle
}

// Miniatura del comprobante y vista completa (foto o PDF). El archivo llega con el token como Blob
// y se muestra con una URL temporal que se libera al desmontar o al cambiar de archivo.
const ComprobanteViewer = ({ pedido }: ComprobanteViewerProps) => {
  const { data: blob, isLoading, isError, refetch } = useComprobante(pedido)
  const [abierto, setAbierto] = useState(false)
  const comprobante = pedido.comprobante

  const url = useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob])
  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url)
  }, [url])

  if (!comprobante) return null
  const esImagen = comprobante.tipo.startsWith("image/")

  return (
    <>
      <Card>
        <ThumbButton
          type="button"
          onClick={() => setAbierto(true)}
          disabled={!url}
          aria-label={`Ver comprobante ${comprobante.nombre}`}
        >
          {url && esImagen ? (
            <img src={url} alt="" />
          ) : esImagen ? (
            <FiImage size={24} aria-hidden />
          ) : (
            <FiFileText size={24} aria-hidden />
          )}
        </ThumbButton>
        <Info>
          <strong title={comprobante.nombre}>{comprobante.nombre}</strong>
          <span>
            {tamanio(comprobante.tamano)} · Subido el {formatFecha(comprobante.fecha)}
          </span>
          {isLoading && <span>Cargando comprobante…</span>}
          {isError && (
            <ErrorText role="alert">
              <FiAlertCircle size={14} aria-hidden />
              No pudimos cargar el comprobante.
              <GhostButton type="button" onClick={() => refetch()}>
                Reintentar
              </GhostButton>
            </ErrorText>
          )}
          {url && (
            <Links>
              <button type="button" onClick={() => setAbierto(true)}>
                <FiMaximize2 size={12} aria-hidden /> Ver completo
              </button>
              <a href={url} target="_blank" rel="noreferrer">
                <FiExternalLink size={12} aria-hidden /> Abrir en otra pestaña
              </a>
              <a href={url} download={comprobante.nombre}>
                <FiDownload size={12} aria-hidden /> Descargar
              </a>
            </Links>
          )}
        </Info>
      </Card>

      <Dialog open={abierto && !!url} onClose={() => setAbierto(false)} labelledBy="comprobante-title" wide>
        <Body>
          <div>
            <DialogTitle id="comprobante-title">Comprobante de pago</DialogTitle>
            <DialogText>
              {comprobante.nombre} · {pedido.curso}
            </DialogText>
          </div>
          <Full>
            {url &&
              (esImagen ? (
                <img src={url} alt={`Comprobante de pago de ${pedido.curso}`} />
              ) : (
                <iframe src={url} title={`Comprobante de pago de ${pedido.curso}`} />
              ))}
          </Full>
          <Actions>
            <GhostButton type="button" onClick={() => setAbierto(false)} data-autofocus>
              Cerrar
            </GhostButton>
          </Actions>
        </Body>
      </Dialog>
    </>
  )
}

export default ComprobanteViewer
