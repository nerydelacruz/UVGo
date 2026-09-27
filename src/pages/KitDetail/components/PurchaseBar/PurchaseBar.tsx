import { useState } from "react"
import { FiArrowUpRight, FiMinus, FiPlus } from "react-icons/fi"
import {
  Bar,
  CartButton,
  NewPrice,
  OldPrice,
  Prices,
  Qty,
  Stepper,
  StepButton,
  Tagline,
} from "./PurchaseBar.styles"

const PurchaseBar = () => {
  const [quantity, setQuantity] = useState(0)

  return (
    <Bar>
      <Tagline>
        Your everyday centerpiece.
        <br />
        Functional design.
      </Tagline>

      <Stepper>
        <StepButton type="button" onClick={() => setQuantity((q) => Math.max(0, q - 1))} aria-label="Quitar uno">
          <FiMinus size={20} />
        </StepButton>
        <Qty>{quantity}</Qty>
        <StepButton type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Agregar uno">
          <FiPlus size={20} />
        </StepButton>
      </Stepper>

      <Prices>
        <OldPrice>$139</OldPrice>
        <NewPrice>$110</NewPrice>
      </Prices>

      <CartButton type="button">
        Add to cart
        <FiArrowUpRight size={36} strokeWidth={1.5} />
      </CartButton>
    </Bar>
  )
}

export default PurchaseBar
