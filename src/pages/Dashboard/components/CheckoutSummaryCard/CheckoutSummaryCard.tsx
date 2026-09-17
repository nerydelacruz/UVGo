import { useTheme } from "@emotion/react"
import { FiCreditCard } from "react-icons/fi"
import {
  Card,
  Divider,
  Head,
  Label,
  Line,
  Lines,
  Pay,
  Title,
  Total,
  TotalLabel,
  TotalRow,
  Value,
} from "./CheckoutSummaryCard.styles"

const lines = [
  { label: "Jacket (Dry Clean)", value: "$18.99", free: false },
  { label: "Hoodie (Wash)", value: "$12.99", free: false },
  { label: "Delivery", value: "Free", free: true },
] as const

const CheckoutSummaryCard = () => {
  const theme = useTheme()

  return (
    <Card>
      <Head>
        <Title>Checkout Summary</Title>
        <FiCreditCard size={20} color={theme.color.neutralDark} />
      </Head>

      <Lines>
        {lines.map((line) => (
          <Line key={line.label}>
            <Label>{line.label}</Label>
            <Value free={line.free}>{line.value}</Value>
          </Line>
        ))}
      </Lines>

      <Divider />

      <TotalRow>
        <TotalLabel>Total</TotalLabel>
        <Total>$31.98</Total>
      </TotalRow>

      <Pay>Pay by Card</Pay>
    </Card>
  )
}

export default CheckoutSummaryCard
