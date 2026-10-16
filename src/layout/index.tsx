import TopNavbar from "@/pages/Dashboard/components/TopNavbar/TopNavbar"
import { Body, Content, Frame, Page, PhotoLayer } from "@/pages/Dashboard/DashboardPage.styles"
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
