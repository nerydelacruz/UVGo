import type { IconType } from "react-icons"
import { FiArrowRight, FiBox, FiCheckCircle, FiClock, FiCreditCard, FiPackage, FiPlus, FiTag } from "react-icons/fi"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import type { EstadoPedido, PedidoDetalle } from "@/models/pedido.model"
import { formatDia } from "@/utilities/date"
import { PASOS_TOTALES, cuentaRegresiva, diasParaLimite, etapa, formatQ } from "../../resumen"
import {
  ActionLink,
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
  Empty,
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

const iconoEstado: Record<EstadoPedido, IconType> = {
  SOLICITADO: FiClock,
  COTIZADO: FiTag,
  CONFIRMADO: FiCreditCard,
  PAGADO: FiPackage,
  EN_COMPRA: FiPackage,
  LISTO: FiBox,
  ENTREGADO: FiCheckCircle,
  CANCELADO: FiClock,
}

const etiquetasFases = ["Solicitado", "Cotizado", "Confirmado", "Pagado", "Entregado"]

interface OrderStatusCardProps {
  activos: PedidoDetalle[]
  cargando: boolean
}

// Carrusel de pedidos activos, el de fecha límite más cercana primero
const OrderStatusCard = ({ activos, cargando }: OrderStatusCardProps) => {
  if (cargando || activos.length === 0) {
    return (
      <Card>
        <Empty>
          <BrandIcon><FiBox size={20} /></BrandIcon>
          <strong>{cargando ? "Cargando tus pedidos…" : "No tienes pedidos activos"}</strong>
          {!cargando && (
            <>
              <p>Sube la lista de materiales de tu curso o arma tu pedido y te enviamos una cotización.</p>
              <ActionLink to="/cotizar"><FiPlus size={14} aria-hidden /> Nueva cotización</ActionLink>
            </>
          )}
        </Empty>
      </Card>
    )
  }

  return (
    <Card>
      <CarouselWrapper>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          pagination={activos.length > 1 ? { clickable: true } : false}
          navigation={activos.length > 1}
          loop={activos.length > 1}
          autoplay={activos.length > 1 ? { delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        >
          {activos.map((pedido) => {
            const e = etapa(pedido)
            const Icono = iconoEstado[pedido.estado]
            const dias = diasParaLimite(pedido)
            // Hasta 99 días en dos casillas; vencido o lejano solo se describe con texto
            const digitos = dias >= 0 && dias <= 99 ? String(dias).padStart(2, "0").split("") : null
            const unidades = pedido.productos.reduce((suma, item) => suma + item.cantidad, 0)

            return (
              <SwiperSlide key={pedido.id}>
                <HeaderRow>
                  <Brand>
                    <BrandIcon><FiBox size={20} /></BrandIcon>
                    <BrandName title={pedido.curso}>
                      {pedido.curso}
                      {pedido.puntoEntregaPreferido ? ` - ${pedido.puntoEntregaPreferido}` : ""}
                    </BrandName>
                  </Brand>
                  <Meta>
                    {unidades} {unidades === 1 ? "artículo" : "artículos"} ·
                    <strong>{pedido.total !== null ? formatQ(pedido.total) : "Por cotizar"}</strong>
                  </Meta>
                </HeaderRow>

                <StatusRow>
                  <StatusLeft>
                    <StatusIcon tone={e.tono}><Icono size={24} /></StatusIcon>
                    <StatusText>
                      <StatusTag tone={e.tono}>{e.tag}</StatusTag>
                      <StatusStep>{e.paso}</StatusStep>
                    </StatusText>
                  </StatusLeft>
                  <Eta>
                    <EtaLabel>Fecha límite</EtaLabel>
                    <EtaValue>{formatDia(pedido.fechaLimite)}</EtaValue>
                  </Eta>
                </StatusRow>

                <Progress aria-label={`Fase ${e.avance} de ${PASOS_TOTALES}: ${etiquetasFases[e.avance - 1] ?? ""}`}>
                  {etiquetasFases.map((fase, index) => (
                    <ProgressSegment key={fase} filled={index < e.avance} title={fase} />
                  ))}
                </Progress>

                <FooterRow>
                  <CodeInfo>
                    <CodeLabel>{dias >= 0 ? "Días para la fecha límite" : "Fecha límite"}</CodeLabel>
                    <CodeOrderId>
                      {cuentaRegresiva(dias)} · #UVG-{pedido.id.slice(0, 8).toUpperCase()}
                    </CodeOrderId>
                  </CodeInfo>
                  {digitos ? (
                    <Digits urgent={dias <= 2} aria-hidden>
                      {digitos.map((digito, index) => (
                        <Digit key={index}>{digito}</Digit>
                      ))}
                    </Digits>
                  ) : null}
                  <ActionLink to={e.accion.to} primary={e.pendienteDelEstudiante}>
                    {e.accion.label} <FiArrowRight size={14} aria-hidden />
                  </ActionLink>
                </FooterRow>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </CarouselWrapper>
    </Card>
  )
}

export default OrderStatusCard
