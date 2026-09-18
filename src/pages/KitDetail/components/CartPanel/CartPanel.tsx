import { FiBox, FiPlus } from "react-icons/fi"
import { AddThumb, Card, Grid, Item, Label, Thumb, Title } from "./CartPanel.styles"

const cartItems = [
  { id: "c1", label: "Kit de Química" },
  { id: "c2", label: "Kit de Dibujo" },
  { id: "c3", label: "Kit de Laboratorio" },
]

const CartPanel = () => (
  <Card>
    <Title>Tu Pedido</Title>
    <Grid>
      {cartItems.map((item) => (
        <Item key={item.id}>
          <Thumb>
            <FiBox size={24} />
          </Thumb>
          <Label>{item.label}</Label>
        </Item>
      ))}

      <Item>
        <AddThumb>
          <FiPlus size={22} />
        </AddThumb>
        <Label>Agregar kit</Label>
      </Item>
    </Grid>
  </Card>
)

export default CartPanel
