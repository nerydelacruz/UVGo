import { Card, Footer, List, Price, ProceedButton, Row, Title, Total } from "./CheckoutPanel.styles"

const checkoutItems = [
  { id: "co1", label: "Kit de Laboratorio", price: 45.0 },
  { id: "co2", label: "Guantes de nitrilo", price: 8.0 },
  { id: "co3", label: "Marcador permanente", price: 3.5 },
]

const total = checkoutItems.reduce((sum, item) => sum + item.price, 0)

const CheckoutPanel = () => (
  <Card>
    <Title>Resumen</Title>

    <List>
      {checkoutItems.map((item) => (
        <Row key={item.id}>
          {item.label}
          <Price>Q{item.price.toFixed(2)}</Price>
        </Row>
      ))}
    </List>

    <Footer>
      <Total>
        Total: <strong>Q{total.toFixed(2)}</strong>
      </Total>
      <ProceedButton>Continuar</ProceedButton>
    </Footer>
  </Card>
)

export default CheckoutPanel
