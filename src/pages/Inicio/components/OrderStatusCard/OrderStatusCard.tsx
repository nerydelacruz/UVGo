import { FiBox, FiPrinter } from "react-icons/fi"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {
  Brand,
  BrandIcon,
  BrandName,
  Card,
  CarouselWrapper,
  CodeInfo,
  CodeLabel,
  CodeOrderId,
  Digit,
  Digits,
  Eta,
  EtaLabel,
  EtaValue,
  FooterRow,
  HeaderRow,
  Meta,
  Progress,
  ProgressSegment,
  StatusIcon,
  StatusLeft,
  StatusRow,
  StatusStep,
  StatusTag,
  StatusText,
} from "./OrderStatusCard.styles"

interface OrderStatus {
  id: string
  kitName: string
  location: string
  items: number
  total: string
  statusTag: string
  currentStep: string
  etaRange: string
  orderId: string
  progressSegments: number
  progressFilled: number
}

const orders: OrderStatus[] = [
  {
    id: "o1",
    kitName: "Kit de Laboratorio",
    location: "Edificio T3",
    items: 3,
    total: "135.00",
    statusTag: "En progreso",
    currentStep: "Pedido recibido",
    etaRange: "10:30 - 10:50",
    orderId: "PED-1042",
    progressSegments: 3,
    progressFilled: 1,
  },
  {
    id: "o2",
    kitName: "Kit de Cálculo",
    location: "Edificio A",
    items: 1,
    total: "25.00",
    statusTag: "En camino",
    currentStep: "Encargado en ruta",
    etaRange: "11:15 - 11:35",
    orderId: "PED-1038",
    progressSegments: 3,
    progressFilled: 2,
  },
]

const OrderStatusCard = () => (
  <Card>
    <CarouselWrapper>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={orders.length > 1 ? { clickable: true } : false}
        navigation={orders.length > 1}
        loop={orders.length > 1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
      >
        {orders.map((order) => {
          const deliveryCode = order.orderId.replace(/\D/g, "").split("")

          return (
            <SwiperSlide key={order.id}>
              <HeaderRow>
                <Brand>
                  <BrandIcon>
                    <FiBox size={20} />
                  </BrandIcon>
                  <BrandName>
                    {order.kitName} - {order.location}
                  </BrandName>
                </Brand>
                <Meta>
                  {order.items} artículos · <strong>Q{order.total}</strong>
                </Meta>
              </HeaderRow>

              <StatusRow>
                <StatusLeft>
                  <StatusIcon>
                    <FiPrinter size={24} />
                  </StatusIcon>
                  <StatusText>
                    <StatusTag>{order.statusTag}</StatusTag>
                    <StatusStep>{order.currentStep}</StatusStep>
                  </StatusText>
                </StatusLeft>
                <Eta>
                  <EtaLabel>Llegada estimada</EtaLabel>
                  <EtaValue>{order.etaRange}</EtaValue>
                </Eta>
              </StatusRow>

              <Progress>
                {Array.from({ length: order.progressSegments }).map((_, index) => (
                  <ProgressSegment key={index} filled={index < order.progressFilled} />
                ))}
              </Progress>

              <FooterRow>
                <CodeInfo>
                  <CodeLabel>Código de entrega</CodeLabel>
                  <CodeOrderId>Pedido ID: #{order.orderId}</CodeOrderId>
                </CodeInfo>
                <Digits>
                  {deliveryCode.map((digit, index) => (
                    <Digit key={index}>{digit}</Digit>
                  ))}
                </Digits>
              </FooterRow>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </CarouselWrapper>
  </Card>
)

export default OrderStatusCard
