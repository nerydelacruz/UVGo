import { useState } from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Column, Item, ItemBody, ItemHead, ItemTitle, Items, Paragraph, SectionTitle } from "./ProductDescription.styles"

interface Highlight {
  id: string
  title: string
  body: string
}

const highlights: Highlight[] = [
  {
    id: "comfort",
    title: "Comfort",
    body: "Gentle curves that soften any space, so the chair fits naturally into any room without feeling out of place.",
  },
  {
    id: "size",
    title: "Size",
    body: "Compact size, ideal for small apartments, reading corners, or bedrooms where every centimeter counts.",
  },
  {
    id: "fabric",
    title: "Fabric",
    body: "Breathable fabric for all-season comfort, cool to sit on in summer and cozy through the winter months.",
  },
  {
    id: "materials",
    title: "Materials",
    body: "Crafted from sustainably sourced log, with a solid ash wood frame built to last for years.",
  },
]

const ProductDescription = () => {
  const [openId, setOpenId] = useState<string | null>(highlights[0].id)

  return (
    <Column>
      <div>
        <SectionTitle>Description</SectionTitle>
        <Paragraph>
          The Lunna Lounge Chair is designed to invite rest and pause. With soft, curved edges and a solid ash wood
          frame, it fits seamlessly into small living spaces, reading corners, or bedrooms.
        </Paragraph>
      </div>

      <Items>
        {highlights.map((highlight) => {
          const isOpen = openId === highlight.id

          return (
            <Item key={highlight.id}>
              <ItemHead type="button" onClick={() => setOpenId(isOpen ? null : highlight.id)}>
                <ItemTitle>{highlight.title}</ItemTitle>
                {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
              </ItemHead>
              {isOpen && <ItemBody>{highlight.body}</ItemBody>}
            </Item>
          )
        })}
      </Items>
    </Column>
  )
}

export default ProductDescription
