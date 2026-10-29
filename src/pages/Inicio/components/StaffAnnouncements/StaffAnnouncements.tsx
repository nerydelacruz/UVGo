import { FiBell } from "react-icons/fi"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import type { PedidoDetalle } from "@/models/pedido.model"
import { etapa, hace, ultimaActividad } from "../../resumen"
import { Board, BoardLink, Card, Content, EmptyText, Header, IconBadge, Kind, Message, StatusDot, Timestamp, Title } from "./StaffAnnouncements.styles"

interface Announcement {
  id: string
  kind: "pedido" | "staff"
  message: string
  timestamp: string
  to?: string
  urgent?: boolean
}

// Avisos generales del equipo UVGo. El backend todavía no los guarda: se editan aquí.
const avisosStaff: Announcement[] = [
  { id: "s1", kind: "staff", message: "Entregas de lunes a viernes, de 8:00 a 17:00", timestamp: "Horario de entregas" },
  { id: "s2", kind: "staff", message: "Las cotizaciones se responden en menos de 24 h hábiles", timestamp: "Tiempo de respuesta" },
]

// Texto del aviso según lo último que pasó en la solicitud
const avisoDePedido = (p: PedidoDetalle): Announcement => {
  const mensaje: Record<PedidoDetalle["estado"], string> = {
    SOLICITADO: `Recibimos tu solicitud de ${p.curso}`,
    COTIZADO: `Tu cotización de ${p.curso} está lista`,
    CONFIRMADO: p.comprobante ? `Revisamos el pago de ${p.curso}` : `Falta el comprobante de ${p.curso}`,
    PAGADO: `Pago validado: ${p.curso}`,
    EN_COMPRA: `Compramos los materiales de ${p.curso}`,
    LISTO: `${p.curso} está listo para entregarse`,
    ENTREGADO: `${p.curso} fue entregado`,
    CANCELADO: `${p.curso} fue cancelado`,
  }
  const e = etapa(p)
  return {
    id: p.id,
    kind: "pedido",
    message: mensaje[p.estado],
    timestamp: hace(ultimaActividad(p)),
    to: e.accion.to,
    urgent: e.pendienteDelEstudiante,
  }
}

const AnnouncementBody = ({ item }: { item: Announcement }) => (
  <>
    <Kind urgent={item.urgent}>{item.kind === "pedido" ? (item.urgent ? "Requiere tu acción" : "Tu pedido") : "Staff UVGo"}</Kind>
    <Message>{item.message}</Message>
    <Timestamp>{item.timestamp}</Timestamp>
  </>
)

// Novedades de los 3 pedidos con actividad más reciente, seguidas de los avisos del staff
const StaffAnnouncements = ({ recientes }: { recientes: PedidoDetalle[] }) => {
  const announcements = [...recientes.slice(0, 3).map(avisoDePedido), ...avisosStaff]
  const hasUrgent = announcements.some((a) => a.urgent)

  return (
    <Card>
      <Header>
        <Title>
          <IconBadge active={hasUrgent}>
            <FiBell size={16} />
          </IconBadge>
          Avisos
        </Title>
        <StatusDot active={hasUrgent} title={hasUrgent ? "Tienes pedidos que esperan tu respuesta" : "Todo en orden"} />
      </Header>

      <Content>
        {announcements.length > 0 ? (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={announcements.length > 1 ? { clickable: true } : false}
            navigation={announcements.length > 1}
            loop={announcements.length > 1}
          >
            {announcements.map((item) => (
              <SwiperSlide key={item.id}>
                {item.to ? (
                  <BoardLink to={item.to}><AnnouncementBody item={item} /></BoardLink>
                ) : (
                  <Board><AnnouncementBody item={item} /></Board>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Board>
            <Message>Todo en orden</Message>
            <EmptyText>Sin avisos por el momento</EmptyText>
          </Board>
        )}
      </Content>
    </Card>
  )
}

export default StaffAnnouncements
