import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import Pedidos from "../Pedidos/Pedidos"
import { List, Page, RightColumn, TrendsRow } from "./Dashboard.styles"

const Dashboard = () => {
  return (
    <Page>
      <List>
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
