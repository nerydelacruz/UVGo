import cajaUVGo from "../../assets/caja_uvgo.png"
import OrderItemCard, { type OrderItem } from "./components/OrderItemCard/OrderItemCard"
import { Body, Header, Panel, Tab, TabBadge, Title } from "./Pedidos.styles"

const items: OrderItem[] = [
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
  {
    name: "Kit de Laboratorio",
    image: cajaUVGo,
    unitPrice: 5,
    quantity: 2,
    options: [
      { label: "Temperature", value: "Ice" },
      { label: "Size", value: "Large" },
      { label: "Sugar", value: "Normal" },
      { label: "Topping", value: "Boba" },
    ],
    note: "1 item no sugar, 2 item normal sugar",
  },
]

const Pedidos = () => {
  return (
    <Panel
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Header>
        <Title>Pedidos</Title>
        <Tab>
          Guardados
          <TabBadge>{items.length}</TabBadge>
        </Tab>
      </Header>

      <Body>
        {items.map((item) => (
          <OrderItemCard key={item.name} item={item} />
        ))}
      </Body>
    </Panel>
  )
}

export default Pedidos
