import { useState, type FormEvent } from "react"
import { FiAlertCircle, FiCheckSquare, FiImage, FiSearch } from "react-icons/fi"
import { useProductos } from "@/hooks/useProductos"
import type { Producto } from "@/models/producto.model"
import { formatPrecio } from "@/utilities/currency"
import {
  Count,
  EmptyState,
  ErrorText,
  Field,
  GhostButton,
  IconBadge,
  Panel,
  PanelHeader,
  PanelHint,
  PanelTitle,
  ScrollArea,
  SkeletonRow,
} from "../../CotizarCategoria.styles"
import { Check, Description, Info, Name, NoPrice, Price, Row, Thumb, Toolbar } from "./StockPanel.styles"

interface StockPanelProps {
  selectedIds: Set<number>
  onToggle: (producto: Producto) => void
  onSetMany: (productos: Producto[], selected: boolean) => void
}

const StockPanel = ({ selectedIds, onToggle, onSetMany }: StockPanelProps) => {
  // draft = lo que se escribe; query = lo que se envió al backend ("" = artículos iniciales)
  const [draft, setDraft] = useState("")
  const [query, setQuery] = useState("")
  const { data: productos = [], isFetching, isError, refetch } = useProductos(query)

  const allSelected = productos.length > 0 && productos.every((producto) => selectedIds.has(producto.id))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(draft.trim())
  }

  // Al borrar el texto se vuelve a los artículos iniciales sin tener que presionar Enter
  const handleChange = (value: string) => {
    setDraft(value)
    if (!value.trim()) setQuery("")
  }

  const renderRow = (producto: Producto) => {
    const selected = selectedIds.has(producto.id)
    return (
      <Row key={producto.id} selected={selected}>
        <Check type="checkbox" checked={selected} onChange={() => onToggle(producto)} />
        <Thumb>
          {producto.imagen ? <img src={producto.imagen} alt="" loading="lazy" /> : <FiImage size={18} aria-hidden />}
        </Thumb>
        <Info>
          <Name title={producto.nombre}>{producto.nombre}</Name>
          <Description title={producto.descripcion}>{producto.descripcion}</Description>
        </Info>
        {producto.precio === null ? (
          <NoPrice>Sin precio</NoPrice>
        ) : (
          <Price>{formatPrecio(producto.precio, producto.moneda)}</Price>
        )}
      </Row>
    )
  }

  return (
    <Panel aria-labelledby="stock-title">
      <PanelHeader>
        <div>
          <PanelTitle id="stock-title">
            <IconBadge>
              <FiCheckSquare size={16} />
            </IconBadge>
            Stock
          </PanelTitle>
          <PanelHint>Productos disponibles en UVGo</PanelHint>
        </div>
        {!isFetching && !isError && (
          <Count>
            {productos.length} {productos.length === 1 ? "producto" : "productos"}
          </Count>
        )}
      </PanelHeader>

      <Toolbar role="search" onSubmit={handleSubmit}>
        <Field>
          <FiSearch size={16} aria-hidden />
          <input
            type="search"
            value={draft}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buscar en el catálogo de UVGo"
            aria-label="Buscar productos en stock"
          />
        </Field>
        <GhostButton
          type="button"
          disabled={productos.length === 0}
          onClick={() => onSetMany(productos, !allSelected)}
        >
          {allSelected ? "Quitar todos" : "Seleccionar todos"}
        </GhostButton>
      </Toolbar>

      {isError && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          No pudimos cargar los productos.
          <GhostButton type="button" onClick={() => refetch()}>
            Reintentar
          </GhostButton>
        </ErrorText>
      )}

      <ScrollArea>
        {isFetching && [0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} aria-hidden />)}

        {!isFetching && !isError && productos.length === 0 && (
          <EmptyState>
            <strong>{query ? "Sin coincidencias" : "Sin productos"}</strong>
            <p>
              {query
                ? `Ningún producto de UVGo coincide con “${query}”. Prueba buscarlo en tiendas externas.`
                : "Todavía no hay productos en el catálogo."}
            </p>
          </EmptyState>
        )}

        {!isFetching && productos.map(renderRow)}
      </ScrollArea>
    </Panel>
  )
}

export default StockPanel
