import { FiBookOpen, FiFileText, FiGlobe } from "react-icons/fi"
import type { ItemPedido, PedidoDetalle } from "@/models/pedido.model"
import { Thumb } from "@/styles/shared.styles"
import { formatPrecio } from "@/utilities/currency"
import DashboardCard, { type EstadoCarga } from "../DashboardCard/DashboardCard"
import { Item, Lista, Precio, Texto } from "./ProductosPedido.styles"

interface ProductosPedidoProps {
  pedido: PedidoDetalle | undefined
  estado: EstadoCarga
}

const ORIGEN: Record<ItemPedido["tipo"], { label: string; icon: typeof FiGlobe }> = {
  CATALOGO: { label: "Catálogo", icon: FiBookOpen },
  WEB: { label: "Tienda web", icon: FiGlobe },
  TEXTO: { label: "Lista del PDF", icon: FiFileText },
}

// Productos del pedido seleccionado, con el precio cotizado (o el de referencia si aún no se cotizó)
const ProductosPedido = ({ pedido, estado }: ProductosPedidoProps) => (
  <DashboardCard
    titulo="Productos del pedido"
    extra={pedido ? `${pedido.productos.length}` : undefined}
    grow
    estado={estado}
    esqueleto={["5.6rem", "5.6rem", "5.6rem", "5.6rem"]}
    vacio={pedido ? null : { titulo: "Ningún pedido", texto: "Elige un pedido de la lista para ver sus productos." }}
  >
    <Lista>
      {pedido?.productos.map((item) => {
        const { label, icon: Icon } = ORIGEN[item.tipo]
        return (
          <Item key={item.id}>
            <Thumb size="sm">{item.imagen ? <img src={item.imagen} alt="" loading="lazy" /> : <Icon size={18} aria-hidden />}</Thumb>
            <Texto>
              <strong title={item.descripcion}>{item.descripcion}</strong>
              <small>
                {label} · ×{item.cantidad}
              </small>
            </Texto>
            <Precio>
              {item.subtotal !== null ? (
                <>
                  <strong>{formatPrecio(item.subtotal, pedido.monedaCotizacion)}</strong>
                  {item.cantidad > 1 && item.precioUnitario !== null && (
                    <small>{formatPrecio(item.precioUnitario, pedido.monedaCotizacion)} c/u</small>
                  )}
                </>
              ) : item.precioReferencia !== null ? (
                <>
                  <strong>{formatPrecio(item.precioReferencia, item.monedaReferencia)}</strong>
                  <small>Referencia</small>
                </>
              ) : (
                <small>Sin precio</small>
              )}
            </Precio>
          </Item>
        )
      })}
    </Lista>
  </DashboardCard>
)

export default ProductosPedido
