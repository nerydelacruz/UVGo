import { FiBox, FiInfo, FiPlus } from "react-icons/fi"
import { AddButton, Card, InfoLink, Label, List, Row, Thumb, Title } from "./CompleteKitList.styles"

const extras = [
  { id: "e1", label: "Calculadora científica" },
  { id: "e2", label: "Guantes de nitrilo" },
  { id: "e3", label: "Cuaderno de notas" },
  { id: "e4", label: "Marcador permanente" },
  { id: "e5", label: "Regla T" },
]

const CompleteKitList = () => (
  <Card>
    <Title>Personaliza tu Kit</Title>

    <List>
      {extras.map((extra) => (
        <Row key={extra.id}>
          <Thumb>
            <FiBox size={18} />
          </Thumb>
          <Label>{extra.label}</Label>
          <AddButton>
            <FiPlus size={16} />
          </AddButton>
        </Row>
      ))}
    </List>

    <InfoLink>
      <FiInfo size={14} />
      Ver contenido detallado
    </InfoLink>
  </Card>
)

export default CompleteKitList
