import { FiShield } from "react-icons/fi"
import { Eyebrow, Header, IconBadge, Page, Panel, Title } from "./AdminHome.styles"

// Inicio de la vista admin: vacío por ahora, las herramientas se irán agregando aquí
const AdminHome = () => (
  <Page>
    <Header>
      <Eyebrow>Vista admin</Eyebrow>
      <Title>Panel de administración</Title>
    </Header>

    <Panel>
      <IconBadge>
        <FiShield size={24} aria-hidden />
      </IconBadge>
      <strong>Todavía no hay herramientas</strong>
      <p>Aquí vas a gestionar pedidos, cotizaciones y el catálogo de productos.</p>
    </Panel>
  </Page>
)

export default AdminHome
