import { FiBarChart2, FiPackage, FiTag } from "react-icons/fi"
import {
  AddButton,
  Card,
  Code,
  Description,
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

export interface Kit {
  code: string
  name: string
  description: string
  price: string
  available: number
}

const KitCard = ({ kit, onAdd }: { kit: Kit; onAdd?: () => void }) => {
  return (
    <Card>
      <Name>
        {kit.name} <Code>[{kit.code}]</Code>
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
              <StatValue>Q{kit.price}</StatValue>
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
              <StatValue>{kit.available} piezas</StatValue>
            </div>
            <StatBadge tone="warning">
              <FiBarChart2 size={20} />
            </StatBadge>
          </StatRow>
        </StatBox>
      </Stats>

      <AddButton onClick={onAdd}>Agregar</AddButton>
    </Card>
  )
}

export default KitCard
