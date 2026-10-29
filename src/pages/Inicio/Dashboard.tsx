import { useMemo } from "react"
import { FiPlus } from "react-icons/fi"
import { usePedidos } from "@/hooks/usePedidos"
import { useAuthStore } from "@/store/auth.store"
import OrderStatusCard from "./components/OrderStatusCard/OrderStatusCard"
import OrderTrendsChart from "./components/OrderTrendsChart/OrderTrendsChart"
import QuickActions from "./components/QuickActions/QuickActions"
import SpendSummary from "./components/SpendSummary/SpendSummary"
import StaffAnnouncements from "./components/StaffAnnouncements/StaffAnnouncements"
import StatsBar from "./components/StatsBar/StatsBar"
import Pedidos from "../Pedidos/Pedidos"
import { resumir } from "./resumen"
import { BottomRow, Greeting, List, NewButton, Page, RightColumn, TrendsRow } from "./Dashboard.styles"

const saludo = (hora: number) => (hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches")
const fechaLarga = new Intl.DateTimeFormat("es-GT", { weekday: "long", day: "numeric", month: "long" })

// Inicio del estudiante: todo sale de sus solicitudes reales (una sola consulta compartida por las tarjetas)
const Dashboard = () => {
  const usuario = useAuthStore((s) => s.usuario)
  const { data, isLoading } = usePedidos()
  const pedidos = useMemo(() => data?.contenido ?? [], [data])
  const resumen = useMemo(() => resumir(pedidos), [pedidos])

  const ahora = new Date()
  const nombre = usuario?.nombre.split(" ")[0]
  const pendientes = resumen.pendientesDelEstudiante.length

  return (
    <Page>
      <List>
        <Greeting>
          <div>
            <h1>
              {saludo(ahora.getHours())}
              {nombre ? `, ${nombre}` : ""}
            </h1>
            <p>
              <span>{fechaLarga.format(ahora)}</span>
              {!isLoading &&
                (pendientes > 0
                  ? ` · Tienes ${pendientes} ${pendientes === 1 ? "pedido que espera" : "pedidos que esperan"} tu respuesta`
                  : " · Todo al día con tus pedidos")}
            </p>
          </div>
          <NewButton to="/cotizar">
            <FiPlus size={16} aria-hidden /> Nueva cotización
          </NewButton>
        </Greeting>

        <StatsBar resumen={resumen} cargando={isLoading} />

        <TrendsRow>
          <OrderStatusCard activos={resumen.activos} cargando={isLoading} />
          <OrderTrendsChart pedidos={pedidos} />
        </TrendsRow>

        <BottomRow>
          <SpendSummary semestre={resumen.semestre} />
          <QuickActions pendientes={pendientes} />
        </BottomRow>
      </List>

      <RightColumn>
        <StaffAnnouncements recientes={resumen.recientes} />
        <Pedidos recientes={resumen.recientes} cargando={isLoading} />
      </RightColumn>
    </Page>
  )
}

export default Dashboard
