import { useState } from "react"
import { FiDownload, FiList, FiPackage, FiX } from "react-icons/fi"
import { obtenerComprobante } from "@/services/pedido.service"
import { formatQ, type Order } from "../../data"
import { Facts, ItemPanel, Products, Receipt, ReceiptBody, ReceiptHead, Totals } from "./ReceiptCard.styles"

// Nombres que se muestran en el resumen de productos antes de "y N más"
const NOMBRES_RESUMEN = 2

// Solo la parte antes del " - " (p. ej. "74LS08N - AND de 2 entradas" → "74LS08N")
const nombreCorto = (descripcion: string) => descripcion.split(" - ")[0].trim()

// Recibo compacto del pedido: datos, resumen de productos (la lista completa se despliega) y total
const ReceiptCard = ({ order }: { order: Order }) => {
  const [descargando, setDescargando] = useState(false)
  const [verLista, setVerLista] = useState(false)
  const subtotal = order.total - order.shipping
  const unidades = order.items.reduce((suma, item) => suma + item.cantidad, 0)
  const restantes = order.items.length - NOMBRES_RESUMEN
  const resumen =
    order.items.slice(0, NOMBRES_RESUMEN).map((item) => nombreCorto(item.descripcion)).join(", ") +
    (restantes > 0 ? ` y ${restantes} más` : "")

  // Descarga el comprobante de pago que subió el estudiante (se pide con el token, como Blob)
  const descargar = async () => {
    setDescargando(true)
    try {
      const blob = await obtenerComprobante(order.id)
      const url = URL.createObjectURL(blob)
      const enlace = document.createElement("a")
      enlace.href = url
      enlace.download = `comprobante-${order.number}`
      enlace.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      // Sin comprobante o sin conexión: el botón se vuelve a habilitar para reintentar
    } finally {
      setDescargando(false)
    }
  }

  return (
    <Receipt aria-label="Comprobante">
      <ReceiptHead>
        <div>
          <span>Comprobante</span>
          <strong>#{order.number}</strong>
        </div>
        <button
          type="button"
          title={order.tieneComprobante ? "Descargar el comprobante de pago que subiste" : "Aún no hay comprobante de pago"}
          disabled={!order.tieneComprobante || descargando}
          onClick={descargar}
        >
          <FiDownload size={14} aria-hidden /> {descargando ? "Descargando…" : "Descargar"}
        </button>
      </ReceiptHead>

      <ReceiptBody>
        <Facts>
          <div><dt>Pedido</dt><dd title={order.kitName}>{order.kitName}</dd></div>
          <div><dt>Cliente</dt><dd title={order.cliente}>{order.cliente}</dd></div>
          <div><dt>Entrega</dt><dd>{order.destination === "Por definir" ? "Por definir" : order.destination}</dd></div>
          <div><dt>Solicitado</dt><dd>{order.requestedAt}</dd></div>
        </Facts>

        <Products>
          <FiPackage size={16} aria-hidden />
          <div>
            <strong>
              {order.items.length} {order.items.length === 1 ? "producto" : "productos"} · {unidades}{" "}
              {unidades === 1 ? "unidad" : "unidades"}
            </strong>
            <span title={resumen}>{resumen}</span>
          </div>
          {order.items.length > 0 && (
            <button type="button" aria-expanded={verLista} onClick={() => setVerLista(true)}>
              <FiList size={13} aria-hidden /> Ver lista
            </button>
          )}
        </Products>

        {verLista && (
          <ItemPanel role="dialog" aria-label="Productos del pedido" onKeyDown={(e) => e.key === "Escape" && setVerLista(false)}>
            <header>
              <strong>Productos del pedido</strong>
              <button type="button" aria-label="Cerrar lista de productos" onClick={() => setVerLista(false)} autoFocus>
                <FiX size={15} aria-hidden />
              </button>
            </header>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <span title={item.descripcion}>{item.descripcion}</span>
                  <small>×{item.cantidad}</small>
                  <strong>{item.subtotal !== null ? formatQ(item.subtotal) : "—"}</strong>
                </li>
              ))}
            </ul>
          </ItemPanel>
        )}

        <Totals>
          <dl>
            <div><dt>Productos</dt><dd>{formatQ(subtotal)}</dd></div>
            <div><dt>Servicio</dt><dd>{formatQ(order.shipping)}</dd></div>
          </dl>
          <p>
            <span>Total</span>
            <strong>{formatQ(order.total)}</strong>
          </p>
        </Totals>
      </ReceiptBody>
    </Receipt>
  )
}

export default ReceiptCard
