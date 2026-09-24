import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { createPortal } from "react-dom"
import { FiX } from "react-icons/fi"
import type { NuevoArticulo } from "@/models/articulo.model"
import {
  Actions,
  Backdrop,
  CancelButton,
  CloseButton,
  Dialog,
  Field,
  FieldRow,
  Fields,
  Header,
  Input,
  Qty,
  StepButton,
  Stepper,
  SubmitButton,
  Subtitle,
  TextArea,
  Title,
} from "./AddArticuloModal.styles"

interface AddArticuloModalProps {
  kitName: string
  categorias: string[]
  onAdd: (articulo: NuevoArticulo) => void
  onClose: () => void
}

const emptyForm: NuevoArticulo = {
  nombre: "",
  descripcion: "",
  cantidad: 1,
  categoria: "",
  observacionesCotizacion: "",
}

const AddArticuloModal = ({ kitName, categorias, onAdd, onClose }: AddArticuloModalProps) => {
  const [form, setForm] = useState<NuevoArticulo>(emptyForm)

  // cerrar con Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  const setField = <K extends keyof NuevoArticulo>(key: K, value: NuevoArticulo[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAdd({ ...form, nombre: form.nombre.trim(), descripcion: form.descripcion.trim() })
    onClose()
  }

  // portal al body para que el modal quede encima del canvas 3D y de los paneles
  return createPortal(
    <Backdrop onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <Header>
          <div>
            <Title>Agregar producto al kit</Title>
            <Subtitle>{kitName}</Subtitle>
          </div>
          <CloseButton type="button" onClick={onClose} aria-label="Cerrar">
            <FiX size={20} />
          </CloseButton>
        </Header>

        <Fields>
          <Field>
            Nombre *
            <Input
              autoFocus
              required
              value={form.nombre}
              onChange={(e) => setField("nombre", e.target.value)}
              placeholder="Ej. Pipeta graduada 10ml"
            />
          </Field>

          <FieldRow>
            <Field>
              Categoría
              <Input
                list="categorias-articulo"
                value={form.categoria}
                onChange={(e) => setField("categoria", e.target.value)}
                placeholder="Ej. Vidrio de laboratorio"
              />
              <datalist id="categorias-articulo">
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria} />
                ))}
              </datalist>
            </Field>

            <Field as="div">
              Cantidad *
              <Stepper>
                <StepButton
                  type="button"
                  disabled={form.cantidad <= 1}
                  onClick={() => setField("cantidad", form.cantidad - 1)}
                >
                  −
                </StepButton>
                <Qty>{form.cantidad}</Qty>
                <StepButton type="button" onClick={() => setField("cantidad", form.cantidad + 1)}>
                  +
                </StepButton>
              </Stepper>
            </Field>
          </FieldRow>

          <Field>
            Descripción *
            <TextArea
              required
              value={form.descripcion}
              onChange={(e) => setField("descripcion", e.target.value)}
              placeholder="¿Para qué se usa?"
            />
          </Field>

          <Field>
            Observaciones para cotización
            <Input
              value={form.observacionesCotizacion}
              onChange={(e) => setField("observacionesCotizacion", e.target.value)}
              placeholder="Ej. Preferible marca Pyrex"
            />
          </Field>
        </Fields>

        <Actions>
          <CancelButton type="button" onClick={onClose}>
            Cancelar
          </CancelButton>
          <SubmitButton type="submit" disabled={!form.nombre.trim() || !form.descripcion.trim()}>
            Agregar
          </SubmitButton>
        </Actions>
      </Dialog>
    </Backdrop>,
    document.body,
  )
}

export default AddArticuloModal
