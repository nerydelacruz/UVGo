import { FiBell } from "react-icons/fi"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Board, Card, Content, EmptyText, Header, IconBadge, Message, StatusDot, Timestamp, Title } from "./StaffAnnouncements.styles"

interface Announcement {
  id: string
  message: string
  timestamp: string
}

const announcements: Announcement[] = [
  { id: "a1", message: "Hoy no hay entregas después de las 5:00 PM", timestamp: "Hace 10 min" },
  { id: "a2", message: "Kit de Física reabastecido ✅", timestamp: "Hace 32 min" },
  { id: "a3", message: "Bodega cerrada por inventario el viernes", timestamp: "Hace 1 h" },
]

const StaffAnnouncements = () => {
  const hasAnnouncements = announcements.length > 0

  return (
    <Card>
      <Header>
        <Title>
          <IconBadge active={hasAnnouncements}>
            <FiBell size={16} />
          </IconBadge>
          Avisos del Staff
        </Title>
        <StatusDot active={hasAnnouncements} />
      </Header>

      <Content>
        {hasAnnouncements ? (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={announcements.length > 1 ? { clickable: true } : false}
            navigation={announcements.length > 1}
            loop={announcements.length > 1}
          >
            {announcements.map((item) => (
              <SwiperSlide key={item.id}>
                <Board>
                  <Message>{item.message}</Message>
                  <Timestamp>{item.timestamp}</Timestamp>
                </Board>
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
