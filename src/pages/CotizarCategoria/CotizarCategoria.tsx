import { useState } from "react"
import { FiArrowRight, FiFileText } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { CATEGORIAS, isCategoria, type Categoria } from "@/models/categoria.model"
import { useAuthStore } from "@/store/auth.store"
import CrearSolicitudDialog from "./components/CrearSolicitudDialog/CrearSolicitudDialog"
import ExternalSearchPanel from "./components/ExternalSearchPanel/ExternalSearchPanel"
import ImportarMateriales from "./components/ImportarMateriales/ImportarMateriales"
import StockPanel from "./components/StockPanel/StockPanel"
import {
  EmptyState,
  Eyebrow,
  GhostButton,
  Header,
  Page,
  Panel,
  PrimaryButton,
  SelectionActions,
  SelectionBar,
  SelectionSummary,
  Split,
  Tab,
  Tabs,
  Title,
} from "./CotizarCategoria.styles"
import { materialesATexto, type MaterialImportado } from "./materiales"
import { useSeleccion } from "./useSeleccion"

const plural = (count: number, singular: string, pluralForm: string) => `${count} ${count === 1 ? singular : pluralForm}`

const CotizarCategoria = () => {
  const { categoria } = useParams()

  // La selección se conserva al cambiar de categoría: un pedido puede mezclar varias
  const seleccion = useSeleccion()
  const [dialogOpen, setDialogOpen] = useState(false)
  // Materiales importados desde un PDF: van como lista en las observaciones del pedido
  const [materiales, setMateriales] = useState<MaterialImportado[]>([])
  const [importOpen, setImportOpen] = useState(false)
  // Solo los estudiantes crean solicitudes; el admin puede ver esta pantalla desde "Vista usuario"
  const esEstudiante = useAuthStore((s) => s.usuario?.rol === "ESTUDIANTE")

  const total = seleccion.items.length
  const deStock = seleccion.stockIds.size
  const externos = total - deStock

  const limpiar = () => {
    seleccion.limpiar()
    setMateriales([])
  }

  const tabs = (
    <Tabs aria-label="Categorías">
      {(Object.keys(CATEGORIAS) as Categoria[]).map((key) => (
        <Tab key={key} to={`/cotizar/${key}`}>
          {CATEGORIAS[key]}
        </Tab>
      ))}
    </Tabs>
  )

  if (!isCategoria(categoria)) {
    return (
      <Page>
        <Header>
          <div>
            <Eyebrow>Cotizar</Eyebrow>
            <Title>Categoría no encontrada</Title>
          </div>
          {tabs}
        </Header>
        <Panel>
          <EmptyState>
            <strong>“{categoria}” no es una categoría válida</strong>
            <p>Elige una de las categorías de arriba para ver su stock y buscar productos.</p>
          </EmptyState>
        </Panel>
      </Page>
    )
  }

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Cotizar</Eyebrow>
          <Title>{CATEGORIAS[categoria]}</Title>
        </div>
        {tabs}
      </Header>

      <Split>
        <StockPanel
          selectedIds={seleccion.stockIds}
          onToggle={seleccion.toggleProducto}
          onSetMany={seleccion.setProductos}
        />
        <ExternalSearchPanel addedKeys={seleccion.externoKeys} onToggle={seleccion.toggleExterno} />
      </Split>

      <SelectionBar>
        <SelectionSummary aria-live="polite">
          {total === 0 ? (
            "Selecciona productos del stock o agrégalos desde el buscador"
          ) : (
            <>
              <strong>{plural(total, "producto", "productos")}</strong> para cotizar ·{" "}
              {plural(deStock, "de stock", "de stock")} · {plural(externos, "externo", "externos")}
            </>
          )}
          {materiales.length > 0 && <> · {plural(materiales.length, "material del PDF", "materiales del PDF")}</>}
        </SelectionSummary>
        <SelectionActions>
          <GhostButton type="button" onClick={() => setImportOpen(true)}>
            <FiFileText size={14} aria-hidden />
            Importar desde PDF
          </GhostButton>
          <GhostButton type="button" disabled={total === 0 && materiales.length === 0} onClick={limpiar}>
            Limpiar
          </GhostButton>
          <PrimaryButton
            type="button"
            disabled={total === 0 || !esEstudiante}
            title={esEstudiante ? undefined : "Solo las cuentas de estudiante pueden solicitar cotizaciones"}
            onClick={() => setDialogOpen(true)}
          >
            Crear pedido
            <FiArrowRight size={16} aria-hidden />
          </PrimaryButton>
        </SelectionActions>
      </SelectionBar>

      <CrearSolicitudDialog
        open={dialogOpen}
        items={seleccion.items}
        observacionesIniciales={materialesATexto(materiales)}
        onCantidad={seleccion.setCantidad}
        onQuitar={seleccion.quitar}
        onCreada={limpiar}
        onClose={() => setDialogOpen(false)}
      />

      <ImportarMateriales
        open={importOpen}
        onAdd={(nuevos) => setMateriales((prev) => [...prev, ...nuevos])}
        onClose={() => setImportOpen(false)}
      />
    </Page>
  )
}

export default CotizarCategoria
