import { lazy, Suspense } from "react"
import { FiPackage, FiTruck } from "react-icons/fi"
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

const kit = {
  category: "Kit Académico",
  nameLines: ["Kit de", "Laboratorio"],
  stats: [
    { id: "piezas", icon: <FiPackage size={20} />, value: "12 piezas" },
    { id: "entrega", icon: <FiTruck size={20} />, value: "Entrega: 24h" },
  ],
}

const KitDetail = () => {
  return (
    <Page>
      <LeftColumn>
        <HeaderBlock>
          <Eyebrow>{kit.category}</Eyebrow>
          <Title>
            {kit.nameLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </Title>
        </HeaderBlock>

        <StatsColumn>
          {kit.stats.map((stat) => (
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
        <CompleteKitList />
        <CheckoutPanel />
      </RightColumn>
    </Page>
  )
}

export default KitDetail
