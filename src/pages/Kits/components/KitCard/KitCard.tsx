import { FiBarChart2, FiPackage, FiTag } from "react-icons/fi"
import {
  Actions,
  AddButton,
  Card,
  Code,
  Description,
  DetailButton,
  ImageSlot,
  Name,
  StatBadge,
  StatBox,
  StatHead,
  StatRow,
  Stats,
  StatSub,
  StatValue,
} from "./KitCard.styles"
import type { Kit } from "@/models/kit.model"

const KitCard = ({ kit, onAdd, onDetail }: { kit: Kit; onAdd?: () => void; onDetail?: () => void }) => {
  return (
    <Card>
      <Name>
        {kit.name} <Code>[{kit.course}]</Code>
      </Name>
      <Description>{kit.description}</Description>

      <ImageSlot >
        <img src="./src/assets/caja_uvgo.png"/>
      </ImageSlot>

      <Stats>
        <StatBox>
          <StatHead>
            <FiTag size={20} />
            Precio
          </StatHead>
          <StatRow>
            <div>
              <StatSub>50% Anticu</StatSub>
              <StatValue>Q{kit.price.toFixed(2)}</StatValue>
            </div>
            <StatBadge tone="primary">
              <FiBarChart2 size={20} />
            </StatBadge>
          </StatRow>
        </StatBox>

        <StatBox>
          <StatHead>
            <FiPackage size={20} />
            Detalles
          </StatHead>
          <StatRow>
            <div>
              <StatSub>Erick Marroquin</StatSub>
              <StatValue>{kit.course}</StatValue>
            </div>
            <StatBadge tone="warning">
              <FiBarChart2 size={20} />
            </StatBadge>
          </StatRow>
        </StatBox>
      </Stats>

      <Actions>
        <DetailButton onClick={onDetail}>Ver detalle</DetailButton>
        <AddButton onClick={onAdd}>Agregar</AddButton>
      </Actions>
    </Card>
  )
}

export default KitCard
