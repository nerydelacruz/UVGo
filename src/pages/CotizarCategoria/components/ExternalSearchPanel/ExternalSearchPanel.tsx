import { useState, type FormEvent } from "react"
import { FiAlertCircle, FiGlobe, FiSearch } from "react-icons/fi"
import { useBusquedaExterna } from "@/hooks/useBusquedaExterna"
import { claveExterno, type ProductoExterno } from "@/models/producto.model"
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
  PrimaryButton,
  ScrollArea,
  SkeletonRow,
} from "../../CotizarCategoria.styles"
import ExternalResultCard from "../ExternalResultCard/ExternalResultCard"
import { SearchForm, Status } from "./ExternalSearchPanel.styles"

interface ExternalSearchPanelProps {
  addedKeys: Set<string>
  onToggle: (producto: ProductoExterno) => void
}

const ExternalSearchPanel = ({ addedKeys, onToggle }: ExternalSearchPanelProps) => {
  // draft = lo que se escribe; query = lo que se envió a la búsqueda externa
  const [draft, setDraft] = useState("")
  const [query, setQuery] = useState("")
  const { data: resultados = [], isFetching, isError, refetch } = useBusquedaExterna(query)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQuery(draft.trim())
  }

  return (
    <Panel aria-labelledby="externo-title">
      <PanelHeader>
        <div>
          <PanelTitle id="externo-title">
            <IconBadge>
              <FiGlobe size={16} />
            </IconBadge>
            Buscador de productos
          </PanelTitle>
          <PanelHint>¿No está en stock? Busca una referencia y nosotros lo conseguimos</PanelHint>
        </div>
        {query && !isFetching && !isError && <Count>{resultados.length} {resultados.length === 1 ? "resultado" : "resultados"}</Count>}
      </PanelHeader>

      <SearchForm role="search" onSubmit={handleSubmit}>
        <Field>
          <FiSearch size={16} aria-hidden />
          <input
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ej. ESP32, sensor DHT22, motor paso a paso"
            aria-label="Nombre del producto a buscar"
          />
        </Field>
        <PrimaryButton type="submit" disabled={!draft.trim() || isFetching}>
          {isFetching ? "Buscando…" : "Buscar"}
        </PrimaryButton>
      </SearchForm>

      {isError && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          La búsqueda externa falló. Intenta de nuevo en un momento.
          <GhostButton type="button" onClick={() => refetch()}>
            Reintentar
          </GhostButton>
        </ErrorText>
      )}

      {isFetching && (
        <Status aria-live="polite">
          Buscando <strong>“{query}”</strong> en tiendas externas, puede tardar unos segundos…
        </Status>
      )}

      <ScrollArea>
        {isFetching && [0, 1, 2].map((i) => <SkeletonRow key={i} aria-hidden />)}

        {!query && !isFetching && (
          <EmptyState>
            <FiSearch size={24} aria-hidden />
            <strong>¿No está en stock?</strong>
            <p>Escribe el nombre del producto, elige el que se parezca a lo que necesitas y nosotros lo conseguimos.</p>
          </EmptyState>
        )}

        {query && !isFetching && !isError && resultados.length === 0 && (
          <EmptyState>
            <strong>Sin resultados</strong>
            <p>No encontramos “{query}”. Prueba con otro nombre o con menos palabras.</p>
          </EmptyState>
        )}

        {!isFetching &&
          resultados.map((producto) => (
            <ExternalResultCard
              key={claveExterno(producto)}
              producto={producto}
              added={addedKeys.has(claveExterno(producto))}
              onToggle={onToggle}
            />
          ))}
      </ScrollArea>
    </Panel>
  )
}

export default ExternalSearchPanel
