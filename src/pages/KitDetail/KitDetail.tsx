import { lazy, Suspense } from "react"
import { FiTag, FiTruck } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useKit } from "@/hooks/useKit"
import AddonsPanel from "./components/AddonsPanel/AddonsPanel"
import CartPanel from "./components/CartPanel/CartPanel"
import CheckoutPanel from "./components/CheckoutPanel/CheckoutPanel"
import CompleteKitList from "./components/CompleteKitList/CompleteKitList"
import { Viewport } from "./components/KitModelViewer/KitModelViewer.styles"
import {
  CenterColumn,
  Eyebrow,
  HeaderBlock,
  LeftColumn,
  Page,
  RightColumn,
  StatIcon,
  StatItem,
  StatsColumn,
  StatValue,
  Title,
} from "./KitDetail.styles"

const KitModelViewer = lazy(() => import("./components/KitModelViewer/KitModelViewer"))

const KitDetail = () => {
  const { kitId } = useParams()
  const { data: kit, isLoading, isError } = useKit(Number(kitId))

  if (isLoading) return <p>Cargando kit...</p>
  if (isError) return <p>Error al cargar el kit</p>
  if (!kit) return <p>Kit no encontrado</p>

  const stats = [
    { id: "precio", icon: <FiTag size={20} />, value: `Q${kit.price.toFixed(2)}` },
    { id: "entrega", icon: <FiTruck size={20} />, value: "Entrega: 24h" },
  ]

  return (
    <Page>
      <LeftColumn>
        <HeaderBlock>
          <Eyebrow>{kit.course}</Eyebrow>
          <Title>{kit.name}</Title>
        </HeaderBlock>

        <StatsColumn>
          {stats.map((stat) => (
            <StatItem key={stat.id}>
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
            </StatItem>
          ))}
        </StatsColumn>

        <AddonsPanel />
      </LeftColumn>

      <CenterColumn>
        <Suspense fallback={<Viewport>Cargando modelo 3D…</Viewport>}>
          <KitModelViewer />
        </Suspense>

        <CartPanel />
      </CenterColumn>

      <RightColumn>
        <CompleteKitList kit={kit} />
        <CheckoutPanel />
      </RightColumn>
    </Page>
  )
}

export default KitDetail
