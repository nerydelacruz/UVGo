import { FiTrendingUp } from "react-icons/fi"
import { formatQ, type Resumen } from "../../resumen"
import { Bar, Card, Figures, Header, Legend, Total } from "./SpendSummary.styles"

// Cuánto lleva pagado el estudiante este semestre y en qué se fue (productos vs. cargo de servicio)
const SpendSummary = ({ semestre }: { semestre: Resumen["semestre"] }) => {
  const { gastado, servicio, pedidosPagados, unidades } = semestre
  const productos = gastado - servicio
  const porcentajeProductos = gastado > 0 ? (productos / gastado) * 100 : 0
  const promedio = pedidosPagados > 0 ? gastado / pedidosPagados : 0

  return (
    <Card aria-label="Gasto del semestre">
      <Header>
        <span><FiTrendingUp size={15} aria-hidden /> Gasto del semestre</span>
      </Header>

      <Total>
        <strong>{formatQ(gastado)}</strong>
        <span>
          {pedidosPagados > 0
            ? `en ${pedidosPagados} ${pedidosPagados === 1 ? "pedido pagado" : "pedidos pagados"}`
            : "Aún no tienes pedidos pagados este semestre"}
        </span>
      </Total>

      <Bar vacia={gastado <= 0} aria-hidden>
        <span style={{ width: `${porcentajeProductos}%` }} />
      </Bar>
      <Legend>
        <span>Productos <strong>{formatQ(productos)}</strong></span>
        <span>Servicio <strong>{formatQ(servicio)}</strong></span>
      </Legend>

      <Figures>
        <div><span>Promedio por pedido</span><strong>{formatQ(promedio)}</strong></div>
        <div><span>Unidades compradas</span><strong>{unidades}</strong></div>
      </Figures>
    </Card>
  )
}

export default SpendSummary
