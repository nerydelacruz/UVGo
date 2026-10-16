import { FiCheck, FiImage, FiPlus } from "react-icons/fi"
import type { ProductoExterno } from "@/models/producto.model"
import { AddButton, Card, Description, Info, Thumb, Title } from "./ExternalResultCard.styles"

interface ExternalResultCardProps {
  producto: ProductoExterno
  added: boolean
  onToggle: (producto: ProductoExterno) => void
}

const ExternalResultCard = ({ producto, added, onToggle }: ExternalResultCardProps) => {
  // Sin enlace el backend no acepta el producto en la solicitud
  const sinEnlace = !producto.url

  return (
    <Card added={added}>
      <Thumb>
        {producto.imagen ? <img src={producto.imagen} alt="" loading="lazy" /> : <FiImage size={20} aria-hidden />}
      </Thumb>

      <Info>
        <Title title={producto.titulo}>{producto.titulo}</Title>
        {producto.tienda && <Description title={producto.tienda}>{producto.tienda}</Description>}
      </Info>

      <AddButton
        type="button"
        added={added}
        aria-pressed={added}
        aria-label={`${added ? "Quitar" : "Agregar"} ${producto.titulo}`}
        disabled={sinEnlace && !added}
        title={sinEnlace ? "Este resultado no trae enlace al producto; prueba con otro" : undefined}
        onClick={() => onToggle(producto)}
      >
        {added ? <FiCheck size={14} aria-hidden /> : <FiPlus size={14} aria-hidden />}
        {added ? "Agregado" : "Agregar"}
      </AddButton>
    </Card>
  )
}

export default ExternalResultCard
