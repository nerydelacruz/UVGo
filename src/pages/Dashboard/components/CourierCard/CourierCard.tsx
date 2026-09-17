import { FiMessageSquare } from "react-icons/fi"
import { Avatar, Card, Chat, Label, Person, Phone, Value } from "./CourierCard.styles"

const CourierCard = () => {
  return (
    <Card>
      <Person>
        <Avatar />
        <div>
          <Label>Courier</Label>
          <Value>Ben Adams</Value>
        </div>
      </Person>

      <Phone>
        <Label>Phone</Label>
        <Value>+1 122 123 1423</Value>
      </Phone>

      <Chat>
        <FiMessageSquare size={20} />
      </Chat>
    </Card>
  )
}

export default CourierCard
