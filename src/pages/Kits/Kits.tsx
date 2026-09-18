import { FiSearch } from "react-icons/fi"
import KitCard, { type Kit } from "./components/KitCard/KitCard"
import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import Pedidos from "../Pedidos/Pedidos"
import { Count, Grid, GridScroll, List, Page, RightColumn, SearchBox, Toolbar, TrendsRow } from "./Kits.styles"

const kits: Kit[] = [
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
]

const Kits = () => {
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
          <Grid>
            {kits.map((kit) => (
              <KitCard key={kit.code} kit={kit} />
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
