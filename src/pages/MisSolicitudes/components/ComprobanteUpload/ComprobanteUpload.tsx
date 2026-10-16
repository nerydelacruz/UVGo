import { useEffect, useMemo, useState, type DragEvent } from "react"
import { FiAlertCircle, FiFileText, FiUploadCloud, FiX } from "react-icons/fi"
import { COMPROBANTE_MAX_MB, COMPROBANTE_TIPOS } from "@/config/pago"
import { ErrorText } from "@/styles/shared.styles"
import { Dropzone, FileInfo, Preview, RemoveButton, Selected } from "./ComprobanteUpload.styles"

interface ComprobanteUploadProps {
  archivo: File | null
  onChange: (archivo: File | null) => void
  disabled?: boolean
}

const tamanio = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

const validar = (archivo: File) => {
  if (!COMPROBANTE_TIPOS.includes(archivo.type)) return "Sube una foto (JPG o PNG) o un PDF del comprobante."
  if (archivo.size > COMPROBANTE_MAX_MB * 1024 * 1024) return `El archivo pesa más de ${COMPROBANTE_MAX_MB} MB.`
  return null
}

// Foto o PDF del comprobante: clic para elegir o arrastrar y soltar, con vista previa
const ComprobanteUpload = ({ archivo, onChange, disabled = false }: ComprobanteUploadProps) => {
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  // URL temporal para previsualizar la imagen; se libera al cambiar de archivo
  const previewUrl = useMemo(
    () => (archivo && archivo.type.startsWith("image/") ? URL.createObjectURL(archivo) : null),
    [archivo],
  )
  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const elegir = (file: File | undefined) => {
    if (!file) return
    const problema = validar(file)
    setError(problema)
    onChange(problema ? null : file)
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
    if (!disabled) elegir(e.dataTransfer.files[0])
  }

  return (
    <div>
      {archivo ? (
        <Selected>
          <Preview>{previewUrl ? <img src={previewUrl} alt="Vista previa del comprobante" /> : <FiFileText size={24} aria-hidden />}</Preview>
          <FileInfo>
            <strong title={archivo.name}>{archivo.name}</strong>
            <span>{tamanio(archivo.size)}</span>
          </FileInfo>
          <RemoveButton type="button" aria-label="Quitar comprobante" onClick={() => onChange(null)} disabled={disabled}>
            <FiX size={16} aria-hidden />
          </RemoveButton>
        </Selected>
      ) : (
        <Dropzone
          dragging={dragging}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <FiUploadCloud size={24} aria-hidden />
          <strong>Subir comprobante</strong>
          <span>
            Arrastra la foto o el PDF de tu transferencia, o haz clic para elegirlo · Máx. {COMPROBANTE_MAX_MB} MB
          </span>
          <input
            type="file"
            accept={COMPROBANTE_TIPOS.join(",")}
            disabled={disabled}
            onChange={(e) => {
              elegir(e.target.files?.[0])
              e.target.value = ""
            }}
          />
        </Dropzone>
      )}

      {error && (
        <ErrorText role="alert">
          <FiAlertCircle size={14} aria-hidden />
          {error}
        </ErrorText>
      )}
    </div>
  )
}

export default ComprobanteUpload
