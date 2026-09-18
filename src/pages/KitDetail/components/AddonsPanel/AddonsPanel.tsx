import { useState } from "react"
import type { ReactNode } from "react"
import { FiEdit3, FiFolder, FiTag } from "react-icons/fi"
import { Card, Icon, Item, Label, List, Qty, StepButton, Stepper, Subtitle, Title } from "./AddonsPanel.styles"

interface Addon {
  id: string
  label: string
  icon: ReactNode
}

const addonsList: Addon[] = [
  { id: "folder", label: "Folder", icon: <FiFolder size={16} /> },
  { id: "marcador", label: "Marcador", icon: <FiEdit3 size={16} /> },
  { id: "etiquetas", label: "Etiquetas", icon: <FiTag size={16} /> },
]

const AddonsPanel = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    folder: 1,
    marcador: 2,
    etiquetas: 0,
  })

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }))
  }

  return (
    <Card>
      <Title>Extras</Title>
      <Subtitle>Incluye lo básico</Subtitle>

      <List>
        {addonsList.map((addon) => (
          <Item key={addon.id}>
            <Icon>{addon.icon}</Icon>
            <Label>{addon.label}</Label>
            <Stepper>
              <StepButton onClick={() => updateQty(addon.id, -1)}>−</StepButton>
              <Qty>x{quantities[addon.id]}</Qty>
              <StepButton onClick={() => updateQty(addon.id, 1)}>+</StepButton>
            </Stepper>
          </Item>
        ))}
      </List>
    </Card>
  )
}

export default AddonsPanel
