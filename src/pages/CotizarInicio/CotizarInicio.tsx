import { useState } from "react"
import type { IconType } from "react-icons"
import { FiClock, FiCpu, FiDroplet, FiFileText, FiGrid, FiSettings, FiTool, FiUpload } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { CATEGORIAS, type Categoria } from "@/models/categoria.model"
import ImportarMateriales from "../CotizarCategoria/components/ImportarMateriales/ImportarMateriales"
import type { MaterialImportado } from "../CotizarCategoria/materiales"
import {
  CategoriaCard,
  CategoriaDeshabilitada,
  ContenidoDeshabilitado,
  Categorias,
  Eyebrow,
  Header,
  IconoDeshabilitado,
  IconBadge,
  Page,
  Panel,
  PanelHeader,
  PanelHint,
  PanelTitle,
  ProximamenteTag,
  Split,
  Title,
  UploadButton,
  UploadIcon,
} from "./CotizarInicio.styles"

const ICONOS: Record<Categoria, IconType> = {
  electronica: FiCpu,
  mecatronica: FiSettings,
  quimica: FiDroplet,
  mecanica: FiTool,
}

// Categorías con catálogo disponible; el resto se muestra como "Muy pronto"
const DISPONIBLES: Categoria[] = ["electronica"]

const CotizarInicio = () => {
  const navigate = useNavigate()
  const [importOpen, setImportOpen] = useState(false)

  // Los materiales del PDF viajan a la pantalla de la categoría, donde se arma el pedido
  const handleAdd = (materiales: MaterialImportado[]) =>
    navigate(`/cotizar/${Object.keys(CATEGORIAS)[0]}`, { state: { materiales } })

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>Cotizar</Eyebrow>
          <Title>¿Qué necesitas cotizar?</Title>
        </div>
      </Header>

      <Split>
        <Panel aria-labelledby="documento-title">
          <PanelHeader>
            <div>
              <PanelTitle id="documento-title">
                <IconBadge>
                  <FiFileText size={16} />
                </IconBadge>
                Subir documento
              </PanelTitle>
              <PanelHint>Tienes una lista de materiales en PDF</PanelHint>
            </div>
          </PanelHeader>
          <UploadButton type="button" onClick={() => setImportOpen(true)}>
            <UploadIcon>
              <FiUpload size={28} aria-hidden />
            </UploadIcon>
            <strong>Seleccionar PDF</strong>
            <span>Claude lee el documento y arma la lista de productos por ti. La revisas antes de continuar.</span>
          </UploadButton>
        </Panel>

        <Panel aria-labelledby="categorias-title">
          <PanelHeader>
            <div>
              <PanelTitle id="categorias-title">
                <IconBadge>
                  <FiGrid size={16} />
                </IconBadge>
                Categorías
              </PanelTitle>
              <PanelHint>Elige una para ver el stock y buscar productos</PanelHint>
            </div>
          </PanelHeader>
          <Categorias>
            {(Object.keys(CATEGORIAS) as Categoria[]).map((key) => {
              const Icono = ICONOS[key]
              if (!DISPONIBLES.includes(key)) {
                return (
                  <CategoriaDeshabilitada key={key} aria-disabled="true">
                    <ContenidoDeshabilitado>
                      <IconoDeshabilitado>
                        <Icono size={28} aria-hidden />
                      </IconoDeshabilitado>
                      {CATEGORIAS[key]}
                    </ContenidoDeshabilitado>
                    <ProximamenteTag>
                      <FiClock size={12} aria-hidden />
                      Muy pronto
                    </ProximamenteTag>
                  </CategoriaDeshabilitada>
                )
              }
              return (
                <CategoriaCard key={key} to={`/cotizar/${key}`}>
                  <Icono size={32} aria-hidden />
                  {CATEGORIAS[key]}
                </CategoriaCard>
              )
            })}
          </Categorias>
        </Panel>
      </Split>

      <ImportarMateriales open={importOpen} onAdd={handleAdd} onClose={() => setImportOpen(false)} />
    </Page>
  )
}

export default CotizarInicio
