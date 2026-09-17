import { FiEdit2, FiFileText, FiMinus, FiPlus } from "react-icons/fi"
import {
  Card,
  Count,
  EditButton,
  Header,
  Info,
  Name,
  Note,
  OptionChip,
  Options,
  Photo,
  QuantityRow,
  StepButton,
  Stepper,
  TotalPrice,
  UnitPrice,
} from "./OrderItemCard.styles"

export interface OrderItem {
  name: string
  image: string
  unitPrice: number
  quantity: number
  options: { label: string; value: string }[]
  note?: string
}

const OrderItemCard = ({ item }: { item: OrderItem }) => {
  const total = item.unitPrice * item.quantity

  return (
    <Card>
      <Header>
        <Photo src={item.image} alt={item.name} />
        <Info>
          <Name>{item.name}</Name>
          <UnitPrice>${item.unitPrice.toFixed(2)}</UnitPrice>
        </Info>
        <EditButton>
          <FiEdit2 size={14} />
        </EditButton>
      </Header>

      <QuantityRow>
        <Stepper>
          <StepButton>
            <FiMinus size={14} />
          </StepButton>
          <Count>{item.quantity}</Count>
          <StepButton filled>
            <FiPlus size={14} />
          </StepButton>
        </Stepper>

        <TotalPrice>${total.toFixed(2)}</TotalPrice>
      </QuantityRow>

      <Options>
        {item.options.map((option) => (
          <OptionChip key={option.label}>
            {option.label} : <b>{option.value}</b>
          </OptionChip>
        ))}
      </Options>

      {item.note && (
        <Note>
          <FiFileText size={14} />
          {item.note}
        </Note>
      )}
    </Card>
  )
}

export default OrderItemCard
