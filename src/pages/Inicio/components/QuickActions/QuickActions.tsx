import type { IconType } from "react-icons"
import { FiArrowUpRight, FiFileText, FiInbox, FiNavigation, FiShoppingBag } from "react-icons/fi"
import { Card, Grid, Header, Tile } from "./QuickActions.styles"

interface Atajo {
  titulo: string
  texto: string
  to: string
  icono: IconType
}

const atajos: Atajo[] = [
  { titulo: "Cotizar con PDF", texto: "Sube la lista de tu curso", to: "/cotizar", icono: FiFileText },
  { titulo: "Catálogo", texto: "Arma tu pedido a mano", to: "/cotizar", icono: FiShoppingBag },
  { titulo: "Mis solicitudes", texto: "Cotizaciones y pagos", to: "/mis-solicitudes", icono: FiInbox },
  { titulo: "Seguimiento", texto: "Estado de tus pedidos", to: "/seguimiento-pedidos", icono: FiNavigation },
]

// Atajos a las pantallas del estudiante; "Mis solicitudes" muestra cuántas esperan su respuesta
const QuickActions = ({ pendientes }: { pendientes: number }) => (
  <Card aria-label="Atajos">
    <Header>Atajos</Header>
    <Grid>
      {atajos.map(({ titulo, texto, to, icono: Icono }) => (
        <Tile key={titulo} to={to}>
          <i aria-hidden><Icono size={17} /></i>
          <strong>
            {titulo}
            {titulo === "Mis solicitudes" && pendientes > 0 && <em aria-label={`${pendientes} pendientes`}>{pendientes}</em>}
          </strong>
          <span>{texto}</span>
          <FiArrowUpRight size={15} aria-hidden />
        </Tile>
      ))}
    </Grid>
  </Card>
)

export default QuickActions
