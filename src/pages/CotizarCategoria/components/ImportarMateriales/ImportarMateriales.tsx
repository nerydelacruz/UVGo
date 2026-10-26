import { useRef, useState, type FormEvent } from "react"
import { FiAlertCircle, FiX } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, DialogText, DialogTitle, FormBody, FormField } from "@/components/Dialog/Dialog.styles"
import { CANTIDAD_MAX, CANTIDAD_MIN } from "@/models/pedido.model"
import { extraerProductos } from "@/services/extraccion.service"
import { ErrorText, GhostButton, PrimaryButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import type { MaterialImportado } from "../../materiales"
import { Fila, Lista } from "./ImportarMateriales.styles"

interface ImportarMaterialesProps {
  open: boolean
  onAdd: (materiales: MaterialImportado[]) => void
  onClose: () => void
}

type FilaEditable = MaterialImportado & { id: number }

const PDF_MAX_BYTES = 5 * 1024 * 1024

const limitar = (cantidad: number) => Math.min(CANTIDAD_MAX, Math.max(CANTIDAD_MIN, Math.round(cantidad) || CANTIDAD_MIN))

const Formulario = ({ onAdd, onClose }: Omit<ImportarMaterialesProps, "open">) => {
  const siguiente = useRef(0)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [filas, setFilas] = useState<FilaEditable[] | null>(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")

  const analizar = async () => {
    if (!archivo || cargando) return
    if (!archivo.name.toLowerCase().endsWith(".pdf") || archivo.size > PDF_MAX_BYTES) {
      setError("Selecciona un PDF de hasta 5 MB.")
      return
    }
    setCargando(true)
    setError("")
    try {
      const productos = await extraerProductos(archivo)
      setFilas(productos.map((p) => ({ id: siguiente.current++, nombre: p.nombre, cantidad: limitar(p.cantidad) })))
    } catch (e) {
      setError(getErrorMessage(e, "No se pudo analizar el PDF. Intenta de nuevo."))
    } finally {
      setCargando(false)
    }
  }

  const editar = (id: number, cambios: Partial<MaterialImportado>) =>
    setFilas((prev) => prev && prev.map((fila) => (fila.id === id ? { ...fila, ...cambios } : fila)))

  const validas = !!filas && filas.length > 0 && filas.every((fila) => fila.nombre.trim())

  const confirmar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!filas || !validas) return
    onAdd(filas.map(({ nombre, cantidad }) => ({ nombre: nombre.trim(), cantidad })))
    onClose()
  }

  return (
    <FormBody onSubmit={confirmar}>
      <div>
        <DialogTitle id="importar-title">Importar materiales desde PDF</DialogTitle>
        <DialogText>Claude lee el PDF y arma la lista. Revísala antes de agregarla a tu solicitud.</DialogText>
      </div>

      {!filas && (
        <>
          <FormField>
            PDF con texto seleccionable (máximo 5 MB)
            <input
              type="file"
              accept=".pdf,application/pdf"
              disabled={cargando}
              onChange={(e) => {
                setArchivo(e.target.files?.[0] ?? null)
                setError("")
              }}
              data-autofocus
            />
          </FormField>
          <DialogText role="status" aria-live="polite">
            {cargando && "Analizando… puede tardar hasta un minuto."}
          </DialogText>
        </>
      )}

      {error && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          {error}
        </ErrorText>
      )}

      {filas && (
        <>
          <DialogText>
            {filas.length === 0
              ? "No se encontraron productos en el PDF."
              : "Corrige los nombres y cantidades que no coincidan con el PDF."}
          </DialogText>
          <Lista>
            {filas.map((fila) => (
              <Fila key={fila.id}>
                <FormField>
                  Producto
                  <input
                    required
                    maxLength={120}
                    value={fila.nombre}
                    onChange={(e) => editar(fila.id, { nombre: e.target.value })}
                  />
                </FormField>
                <FormField>
                  Cantidad
                  <input
                    type="number"
                    inputMode="numeric"
                    min={CANTIDAD_MIN}
                    max={CANTIDAD_MAX}
                    value={fila.cantidad}
                    onChange={(e) => editar(fila.id, { cantidad: limitar(Number(e.target.value)) })}
                  />
                </FormField>
                <GhostButton
                  type="button"
                  aria-label={`Quitar ${fila.nombre}`}
                  onClick={() => setFilas((prev) => prev && prev.filter((item) => item.id !== fila.id))}
                >
                  <FiX size={16} aria-hidden />
                </GhostButton>
              </Fila>
            ))}
          </Lista>
        </>
      )}

      <Actions>
        <GhostButton type="button" disabled={cargando} onClick={onClose}>
          Cancelar
        </GhostButton>
        {filas ? (
          <PrimaryButton type="submit" disabled={!validas}>
            Agregar {filas.length} materiales
          </PrimaryButton>
        ) : (
          <PrimaryButton type="button" disabled={!archivo || cargando} onClick={analizar}>
            {cargando ? "Analizando…" : "Analizar PDF"}
          </PrimaryButton>
        )}
      </Actions>
    </FormBody>
  )
}

const ImportarMateriales = ({ open, onClose, ...props }: ImportarMaterialesProps) => (
  <Dialog open={open} onClose={onClose} labelledBy="importar-title" wide>
    <Formulario {...props} onClose={onClose} />
  </Dialog>
)

export default ImportarMateriales
