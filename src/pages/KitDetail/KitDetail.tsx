import ProductDescription from "./components/ProductDescription/ProductDescription"
import ProductHero from "./components/ProductHero/ProductHero"
import ProductInfo from "./components/ProductInfo/ProductInfo"
import PurchaseBar from "./components/PurchaseBar/PurchaseBar"
import { Main, Page } from "./KitDetail.styles"

const KitDetail = () => {
  return (
    <Page>
      <Main>
        <ProductInfo />
        <ProductHero />
        <ProductDescription />
      </Main>

      <PurchaseBar />
    </Page>
  )
}

export default KitDetail
