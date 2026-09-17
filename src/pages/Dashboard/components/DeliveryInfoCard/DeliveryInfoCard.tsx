import { useTheme } from "@emotion/react"
import { FiCheck, FiMoreHorizontal, FiTruck } from "react-icons/fi"
import {
  Card,
  Connector,
  Content,
  Desc,
  Head,
  Label,
  MarkerActive,
  MarkerDone,
  MarkerPending,
  Order,
  Step,
  Steps,
  Time,
  Title,
} from "./DeliveryInfoCard.styles"

const steps = [
  { title: "Delivered", desc: "Expect delivery soon.", time: "Today 8:45 PM", status: "pending" },
  { title: "Out for Delivery", desc: "Your items are on the way.", time: "Today 4:29 PM", status: "active" },
  { title: "Ready for Delivery", desc: "Your order is waiting to be dispatched.", time: "Today 1:25 AM", status: "done" },
  { title: "Cleaning in Progress", desc: "A quality check has been completed.", time: "Yesterday 11:38 PM", status: "done" },
] as const

const Marker = ({ status }: { status: string }) => {
  if (status === "pending") return <MarkerPending />

  if (status === "active") {
    return (
      <MarkerActive>
        <FiTruck size={14} />
      </MarkerActive>
    )
  }

  return (
    <MarkerDone>
      <FiCheck size={14} />
    </MarkerDone>
  )
}

const DeliveryInfoCard = () => {
  const theme = useTheme()

  return (
    <Card>
      <Head>
        <Label>Delivery Info</Label>
        <FiMoreHorizontal size={20} color={theme.color.textDisabled} />
      </Head>

      <Order>#ORD-P14-001</Order>

      <Steps>
        {steps.map((step, index) => (
          <Step key={step.title}>
            {index < steps.length - 1 && <Connector />}

            <Marker status={step.status} />

            <Content>
              <div>
                <Title muted={step.status === "pending"}>{step.title}</Title>
                <Desc>{step.desc}</Desc>
              </div>
              <Time>{step.time}</Time>
            </Content>
          </Step>
        ))}
      </Steps>
    </Card>
  )
}

export default DeliveryInfoCard
