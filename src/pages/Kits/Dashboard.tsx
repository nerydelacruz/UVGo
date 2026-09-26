import { useMemo, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import KitCard from "./components/KitCard/KitCard"
import { useKits } from "@/hooks/useKits"
import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import Pedidos from "../Pedidos/Pedidos"
import { Count, Grid, GridScroll, List, Page, RightColumn, SearchBox, Toolbar, TrendsRow } from "./Dashboard.styles"

// minúsculas y sin tildes: "quimica" encuentra "Química"
const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const Dashboard = () => {
  const { data: kits = [], isLoading, isError } = useKits()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const filteredKits = useMemo(() => {
    const term = normalize(search.trim())
    if (!term) return kits
    return kits.filter((kit) =>
      [kit.name, kit.course, kit.description].some((field) => normalize(field).includes(term)),
    )
  }, [kits, search])

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
            {filteredKits.length} <span>Kits</span>
          </Count>
          <SearchBox>
            <FiSearch size={18} />
            <input
              placeholder="Buscar kit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
        </Toolbar>

        <GridScroll>
          {isLoading && <p>Cargando kits...</p>}
          {isError && <p>Error al cargar los kits</p>}
          {!isLoading && !isError && search.trim() && filteredKits.length === 0 && (
            <p>No se encontraron kits para "{search.trim()}"</p>
          )}
          <Grid>
            {filteredKits.map((kit) => (
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

export default Dashboard
