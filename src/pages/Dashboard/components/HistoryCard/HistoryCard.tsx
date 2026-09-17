import { FiDroplet, FiTruck } from "react-icons/fi"
import { Badge, Body, Card, Code, Date, Grid, Head, Item, Name, Photo, Row, Title, ViewAll } from "./HistoryCard.styles"

const items = [
  { name: "Shirts", price: "$32.00", code: "#XC4-ICV-001", date: "22 May, 2025", photo: "neutral", badge: "delivery" },
  { name: "Hoodie", price: "$25.00", code: "#YBV-BN2-314", date: "14 May, 2025", photo: "slate", badge: "wash" },
] as const

const HistoryCard = () => {
  return (
    <Card>
      <Head>
        <Title>History</Title>
        <ViewAll href="#">View All</ViewAll>
      </Head>

      <Grid>
        {items.map((item) => (
          <Item key={item.code}>
            <Photo tone={item.photo}>
              <Badge tone={item.badge}>
                {item.badge === "delivery" ? <FiTruck size={16} /> : <FiDroplet size={16} />}
              </Badge>
            </Photo>

            <Body>
              <Date>{item.date}</Date>
              <Row>
                <Name>{item.name}</Name>
                <Name>{item.price}</Name>
              </Row>
              <Code>{item.code}</Code>
            </Body>
          </Item>
        ))}
      </Grid>
    </Card>
  )
}

export default HistoryCard
