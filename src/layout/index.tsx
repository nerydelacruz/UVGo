import { Outlet } from "react-router-dom"
import { Frame, Main } from "./Layout.styles"
import SideRail from "./SideRail/SideRail"

export const Layout = () => (
  <Frame>
    <SideRail />
    <Main>
      <Outlet />
    </Main>
  </Frame>
)
