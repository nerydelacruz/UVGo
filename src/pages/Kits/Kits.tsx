import { FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import KitCard from "./components/KitCard/KitCard"
import { useKits } from "@/hooks/useKits"
import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import Pedidos from "../Pedidos/Pedidos"
import { Count, Grid, GridScroll, List, Page, RightColumn, SearchBox, Toolbar, TrendsRow } from "./Kits.styles"

const Kits = () => {
  const { data: kits = [], isLoading, isError } = useKits()
  const navigate = useNavigate()

  return (
    <Page>
      <List>
        <StatsBar />

        <TrendsRow>
          <OrderStatusCard />
          <OrderTrendsChart />
        </TrendsRow>

        <Toolbar>
          <Count>
            {kits.length} <span>Kits</span>
          </Count>
          <SearchBox>
            <FiSearch size={18} />
            <input placeholder="Buscar kit..." />
          </SearchBox>
        </Toolbar>

        <GridScroll>
          {isLoading && <p>Cargando kits...</p>}
          {isError && <p>Error al cargar los kits</p>}
          <Grid>
            {kits.map((kit) => (
              <KitCard
                key={kit.kitId}
                kit={kit}
                onDetail={() => navigate(`/kits/${kit.kitId}`)}
              />
            ))}
          </Grid>
        </GridScroll>
      </List>

      <RightColumn>
        <StaffAnnouncements />
        <Pedidos />
      </RightColumn>
    </Page>
  )
}

export default Kits
