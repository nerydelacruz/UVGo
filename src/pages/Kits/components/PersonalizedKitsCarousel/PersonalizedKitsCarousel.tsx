import { useRef } from "react"
import { FiChevronLeft, FiChevronRight, FiPackage } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useKitsPersonalizados } from "@/hooks/useKitsPersonalizados"
import PersonalizedKitCard from "../PersonalizedKitCard/PersonalizedKitCard"
import {
  CardSlot,
  CardsTrack,
  Empty,
  Header,
  Nav,
  NavButton,
  Scroller,
  Section,
  Title,
} from "./PersonalizedKitsCarousel.styles"

const SCROLL_STEP = 320

const PersonalizedKitsCarousel = () => {
  const { data: kits = [], isLoading, isError } = useKitsPersonalizados()
  const navigate = useNavigate()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (delta: number) => scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" })

  return (
    <Section>
      <Header>
        <Title>Tus kits personalizados</Title>
        {kits.length > 0 && (
          <Nav>
            <NavButton type="button" onClick={() => scrollBy(-SCROLL_STEP)} aria-label="Ver anteriores">
              <FiChevronLeft size={18} />
            </NavButton>
            <NavButton type="button" onClick={() => scrollBy(SCROLL_STEP)} aria-label="Ver siguientes">
              <FiChevronRight size={18} />
            </NavButton>
          </Nav>
        )}
      </Header>

      {isLoading && <p>Cargando kits personalizados...</p>}
      {isError && <p>Error al cargar tus kits personalizados</p>}

      {!isLoading && !isError && kits.length === 0 && (
        <Empty>
          <FiPackage size={22} />
          Aún no tienes kits personalizados
        </Empty>
      )}

      {!isLoading && !isError && kits.length > 0 && (
        <Scroller ref={scrollerRef}>
          <CardsTrack>
            {kits.map((kit) => (
              <CardSlot key={kit.kitId}>
                <PersonalizedKitCard kit={kit} onDetail={() => navigate(`/kits/${kit.kitId}`)} />
              </CardSlot>
            ))}
          </CardsTrack>
        </Scroller>
      )}
    </Section>
  )
}

export default PersonalizedKitsCarousel
