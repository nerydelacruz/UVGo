import CheckoutSummaryCard from "./components/CheckoutSummaryCard/CheckoutSummaryCard"
import CourierCard from "./components/CourierCard/CourierCard"
import DeliveryInfoCard from "./components/DeliveryInfoCard/DeliveryInfoCard"
import HistoryCard from "./components/HistoryCard/HistoryCard"
import TopNavbar from "./components/TopNavbar/TopNavbar"
import { Body, Content, Frame, Left, Page, PhotoImg, PhotoLayer, Right } from "./DashboardPage.styles"

const photo = "https://uvgnery.blob.core.windows.net/contenedor1/RL21_asignaruta_porhorario_editarasignacion.png"

const DashboardPage = () => {
  return (
    <Page>
      <Frame>
        <PhotoLayer>
          {/* <PhotoImg src={photo} alt="" /> */}
        </PhotoLayer>
        <Content>
          <TopNavbar />
          <Body>
            <Left>
              <DeliveryInfoCard />
              <CourierCard />
            </Left>

            <Right>
              <HistoryCard />
              <CheckoutSummaryCard />
            </Right>
          </Body>
        </Content>
      </Frame>
    </Page>
  )
}

export default DashboardPage
