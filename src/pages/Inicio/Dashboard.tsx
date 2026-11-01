import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import { Link } from "react-router-dom"
import Pedidos from "../Pedidos/Pedidos"
import { List, Page, RightColumn, TrendsRow } from "./Dashboard.styles"

const Dashboard = () => {
  return (
    <Page>
      <List>
        <Link to="/materiales-ia" style={{ padding: 16, borderRadius: 16, background: 'white', fontSize: '1.6rem' }}>Materiales con IA: importar PDF y guardar listas →</Link>
        <StatsBar />

        <TrendsRow>
          <OrderStatusCard />
          <OrderTrendsChart />
        </TrendsRow>
      </List>

      <RightColumn>
        <StaffAnnouncements />
        <Pedidos />
      </RightColumn>
    </Page>
  )
}

export default Dashboard
