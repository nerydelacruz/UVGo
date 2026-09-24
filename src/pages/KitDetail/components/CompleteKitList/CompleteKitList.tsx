import { useState } from "react"
import { FiBox, FiInfo, FiPlus, FiX } from "react-icons/fi"
import { useUpdateKit } from "@/hooks/useUpdateKit"
import type { NuevoArticulo } from "@/models/articulo.model"
import type { KitWithArticulos } from "@/models/kit.model"
import AddArticuloModal from "../AddArticuloModal/AddArticuloModal"
import {
  AddButton,
  AddProductRow,
  Card,
  ErrorText,
  InfoLink,
  Label,
  List,
  NewBadge,
  RemoveButton,
  Row,
  SaveButton,
  Thumb,
  Title,
} from "./CompleteKitList.styles"

const CompleteKitList = ({ kit }: { kit: KitWithArticulos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // productos agregados en esta sesión: se guardan todos juntos con un solo PUT
  const [nuevos, setNuevos] = useState<NuevoArticulo[]>([])
  const { mutate, isPending, isError } = useUpdateKit()

  const { articulos } = kit
  const categorias = [...new Set([...articulos, ...nuevos].map((articulo) => articulo.categoria).filter(Boolean))]

  const removeNuevo = (index: number) => setNuevos((prev) => prev.filter((_, i) => i !== index))

  const handleSave = () => {
    const existentes: NuevoArticulo[] = articulos.map(
      ({ nombre, descripcion, cantidad, categoria, observacionesCotizacion }) => ({
        nombre,
        descripcion,
        cantidad,
        categoria,
        observacionesCotizacion,
      }),
    )

    mutate(
      {
        kitId: kit.kitId,
        name: kit.name,
        description: kit.description,
        course: kit.course,
        price: kit.price,
        articulos: [...existentes, ...nuevos],
      },
      { onSuccess: () => setNuevos([]) },
    )
  }

  return (
    <Card>
      <Title>Personaliza tu Kit</Title>

      <List>
        {articulos.length === 0 && nuevos.length === 0 && <p>Este kit no tiene artículos</p>}
        {articulos.map((articulo) => (
          <Row key={articulo.id}>
            <Thumb>
              <FiBox size={18} />
            </Thumb>
            <Label>{articulo.nombre}</Label>
            <AddButton>
              <FiPlus size={16} />
            </AddButton>
          </Row>
        ))}

        {nuevos.map((articulo, index) => (
          <Row key={`nuevo-${index}`}>
            <Thumb>
              <FiBox size={18} />
            </Thumb>
            <Label>
              {articulo.nombre} · x{articulo.cantidad}
            </Label>
            <NewBadge>Nuevo</NewBadge>
            <RemoveButton type="button" onClick={() => removeNuevo(index)} aria-label="Quitar producto">
              <FiX size={16} />
            </RemoveButton>
          </Row>
        ))}

        <AddProductRow type="button" onClick={() => setIsModalOpen(true)}>
          <Thumb>
            <FiPlus size={18} />
          </Thumb>
          Agregar producto
        </AddProductRow>
      </List>

      {nuevos.length > 0 && (
        <>
          <SaveButton type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? "Guardando..." : `Guardar cambios (${nuevos.length})`}
          </SaveButton>
          {isError && <ErrorText>No se pudieron guardar los cambios. Intenta de nuevo.</ErrorText>}
        </>
      )}

      <InfoLink>
        <FiInfo size={14} />
        Ver contenido detallado
      </InfoLink>

      {isModalOpen && (
        <AddArticuloModal
          kitName={kit.name}
          categorias={categorias}
          onAdd={(articulo) => setNuevos((prev) => [...prev, articulo])}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  )
}

export default CompleteKitList
