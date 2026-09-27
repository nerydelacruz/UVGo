import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder"
import {
  Availability,
  AvailableLabel,
  AvailableTotal,
  Column,
  EmptySlot,
  LastLine,
  PageIndicator,
  StepButton,
  Stepper,
  Thumb,
  Thumbs,
  ThumbsHead,
  Title,
} from "./ProductInfo.styles"

const PAGE_SIZE = 6
// Placeholder mientras no hay imágenes reales del kit; el mosaico siempre muestra 6 casillas por página.
const TOTAL_THUMBS = 14

const ProductInfo = () => {
  const [page, setPage] = useState(0)
  const [selectedThumb, setSelectedThumb] = useState(0)

  const totalPages = Math.ceil(TOTAL_THUMBS / PAGE_SIZE)
  const pageStart = page * PAGE_SIZE

  const goTo = (nextPage: number) => setPage(Math.min(Math.max(nextPage, 0), totalPages - 1))

  return (
    <Column>
      <Title>
        <span>Luna Liven</span>
        <span>Lounge</span>
        <LastLine>
          <span>Chair</span>
          <Availability>
            13/<AvailableTotal>100</AvailableTotal>
            <AvailableLabel>Available</AvailableLabel>
          </Availability>
        </LastLine>
      </Title>

      <div>
        {totalPages > 1 && (
          <ThumbsHead>
            <Stepper>
              <StepButton type="button" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Página anterior">
                <FiChevronLeft size={16} />
              </StepButton>
              <PageIndicator>
                {page + 1}/{totalPages}
              </PageIndicator>
              <StepButton
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages - 1}
                aria-label="Página siguiente"
              >
                <FiChevronRight size={16} />
              </StepButton>
            </Stepper>
          </ThumbsHead>
        )}

        <Thumbs>
          {Array.from({ length: PAGE_SIZE }, (_, slot) => {
            const index = pageStart + slot
            if (index >= TOTAL_THUMBS) return <EmptySlot key={slot} />

            return (
              <Thumb
                key={slot}
                type="button"
                onClick={() => setSelectedThumb(index)}
                aria-label={`Vista ${index + 1}`}
              >
                <ImagePlaceholder selected={selectedThumb === index} />
              </Thumb>
            )
          })}
        </Thumbs>
      </div>
    </Column>
  )
}

export default ProductInfo
