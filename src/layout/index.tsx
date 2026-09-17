import CheckoutSummaryCard from "@/pages/Dashboard/components/CheckoutSummaryCard/CheckoutSummaryCard"
import CourierCard from "@/pages/Dashboard/components/CourierCard/CourierCard"
import DeliveryInfoCard from "@/pages/Dashboard/components/DeliveryInfoCard/DeliveryInfoCard"
import HistoryCard from "@/pages/Dashboard/components/HistoryCard/HistoryCard"
import TopNavbar from "@/pages/Dashboard/components/TopNavbar/TopNavbar"
import { Body, Content, Frame, Left, Page, PhotoLayer, Right } from "@/pages/Dashboard/DashboardPage.styles"
import { Outlet } from "react-router-dom"

export const Layout =()=>(
    <div>
        <Page>
      <Frame>
        <PhotoLayer>
          {/* <PhotoImg src={photo} alt="" /> */}
        </PhotoLayer>
        <Content>
          <TopNavbar />
          <Body>
            <Outlet/>
          </Body>
        </Content>
      </Frame>
    </Page>
    </div>
)