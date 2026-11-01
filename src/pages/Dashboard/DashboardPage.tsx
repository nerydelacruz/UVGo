import CheckoutSummaryCard from "./components/CheckoutSummaryCard/CheckoutSummaryCard"
import CourierCard from "./components/CourierCard/CourierCard"
import DeliveryInfoCard from "./components/DeliveryInfoCard/DeliveryInfoCard"
import HistoryCard from "./components/HistoryCard/HistoryCard"
import { Body, Content, Frame, Left, Page, PhotoLayer, Right } from "./DashboardPage.styles"

const DashboardPage = () => {
  return (
    <Page>
      <Frame>
        <PhotoLayer>
          {/* <PhotoImg src={photo} alt="" /> */}
        </PhotoLayer>
        <Content>
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
