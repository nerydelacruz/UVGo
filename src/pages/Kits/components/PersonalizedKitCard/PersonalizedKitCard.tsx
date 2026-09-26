import type { KitWithArticulos } from "@/models/kit.model"
import {
  Actions,
  AddButton,
  ArticleCount,
  Card,
  Course,
  Description,
  DetailButton,
  InfoRow,
  Name,
  Price,
} from "./PersonalizedKitCard.styles"

interface PersonalizedKitCardProps {
  kit: KitWithArticulos
  onDetail?: () => void
  onAdd?: () => void
}

const PersonalizedKitCard = ({ kit, onDetail, onAdd }: PersonalizedKitCardProps) => {
  return (
    <Card>
      <Course>{kit.course}</Course>
      <Name>{kit.name}</Name>
      <Description>{kit.description}</Description>

      <InfoRow>
        <Price>Q{kit.price.toFixed(2)}</Price>
        <ArticleCount>{kit.articulos.length} artículos</ArticleCount>
      </InfoRow>

      <Actions>
        <DetailButton type="button" onClick={onDetail}>
          Ver detalle
        </DetailButton>
        <AddButton type="button" onClick={onAdd}>
          Agregar
        </AddButton>
      </Actions>
    </Card>
  )
}

export default PersonalizedKitCard
