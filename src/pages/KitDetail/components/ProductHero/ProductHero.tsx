import { lazy, Suspense } from "react"
import { Viewport } from "../KitModelViewer/KitModelViewer.styles"
import { Hero, ImageSlot } from "./ProductHero.styles"

const KitModelViewer = lazy(() => import("../KitModelViewer/KitModelViewer"))

const ProductHero = () => (
  <Hero>
    <ImageSlot>
      <Suspense fallback={<Viewport>Cargando modelo 3D…</Viewport>}>
        <KitModelViewer />
      </Suspense>
    </ImageSlot>
  </Hero>
)

export default ProductHero
