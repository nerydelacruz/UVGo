import { AnimatePresence } from "motion/react"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import KitCard, { type Kit } from "./components/KitCard/KitCard"
import Pedidos from "../Pedidos/Pedidos"
import { Count, Grid, GridScroll, List, Page, SearchBox, Toolbar } from "./Kits.styles"

const kits: Kit[] = [
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
  {
    code: "MAT-101",
    name: "Kit de Laboratorio",
    description: "Materiales básicos para prácticas de laboratorio.",
    price: "45.00",
    available: 12,
  },
]

const Kits = () => {
  const [showPedidos, setShowPedidos] = useState(false)

  return (
    <Page>
      <List>
        <Toolbar>
          <Count>
            {kits.length} <span>Kits</span>
          </Count>
          <SearchBox>
            <FiSearch size={18} />
            <input placeholder="Buscar kit..." />
          </SearchBox>
        </Toolbar>

        <GridScroll>
          <Grid>
            {kits.map((kit) => (
              <KitCard key={kit.code} kit={kit} onAdd={() => setShowPedidos(true)} />
            ))}
          </Grid>
        </GridScroll>
      </List>

      <AnimatePresence>{showPedidos && <Pedidos />}</AnimatePresence>
    </Page>
  )
}

export default Kits
