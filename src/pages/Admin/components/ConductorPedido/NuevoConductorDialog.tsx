import axios from "axios"
import { useState, type FormEvent } from "react"
import { FiAlertCircle } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, DialogText, DialogTitle, FormBody, FormField } from "@/components/Dialog/Dialog.styles"
import { useCrearPiloto } from "@/hooks/usePilotos"
import type { Piloto, PilotoNuevo } from "@/models/pedido.model"
import { ErrorText, GhostButton, PrimaryButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"

// Mismas reglas que valida el backend (PilotoDtos.Alta)
const MIN_CONTRASENA = 12

interface NuevoConductorDialogProps {
  open: boolean
  onClose: () => void
  onCreado: (piloto: Piloto) => void
}

const VACIO: PilotoNuevo = { nombre: "", correo: "", telefono: "", contrasena: "" }

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 409
    ? "Ya existe una cuenta con ese correo."
    : getErrorMessage(error, "No pudimos crear el conductor. Revisa los datos e intenta de nuevo.")

// El admin crea la cuenta del conductor; con ese correo y contraseña el conductor entra a la app móvil
const NuevoConductorDialog = ({ open, onClose, onCreado }: NuevoConductorDialogProps) => {
  const crear = useCrearPiloto()
  const [datos, setDatos] = useState<PilotoNuevo>(VACIO)

  const set = (campo: keyof PilotoNuevo) => (e: { target: { value: string } }) =>
    setDatos((actual) => ({ ...actual, [campo]: e.target.value }))

  // Al cerrar se borra lo escrito (incluida la contraseña) y el error de un intento anterior
  const handleClose = () => {
    crear.reset()
    setDatos(VACIO)
    onClose()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    crear.mutate(
      { nombre: datos.nombre.trim(), correo: datos.correo.trim(), telefono: datos.telefono.trim(), contrasena: datos.contrasena },
      {
        onSuccess: (piloto) => {
          handleClose()
          onCreado(piloto)
        },
      },
    )
  }

  return (
    <Dialog open={open} onClose={handleClose} labelledBy="nuevo-conductor-title">
      <FormBody onSubmit={handleSubmit}>
        <div>
          <DialogTitle id="nuevo-conductor-title">Nuevo conductor</DialogTitle>
          <DialogText>
            Crea su cuenta. Con este correo y contraseña el conductor inicia sesión en la <strong>app móvil de UVGo</strong>,
            donde ve sus pedidos y comparte su ubicación.
          </DialogText>
        </div>

        <FormField>
          Nombre completo
          <input value={datos.nombre} onChange={set("nombre")} autoComplete="off" maxLength={120} required data-autofocus />
        </FormField>
        <FormField>
          Correo
          <input type="email" value={datos.correo} onChange={set("correo")} autoComplete="off" maxLength={254} required />
        </FormField>
        <FormField>
          Teléfono
          <input
            type="tel"
            value={datos.telefono}
            onChange={set("telefono")}
            placeholder="5555 0000"
            autoComplete="off"
            pattern="[+0-9 ()\-]{8,25}"
            title="Entre 8 y 25 dígitos; se permiten +, espacios, paréntesis y guiones"
            required
          />
        </FormField>
        <FormField>
          Contraseña inicial
          <input
            type="password"
            value={datos.contrasena}
            onChange={set("contrasena")}
            placeholder={`Al menos ${MIN_CONTRASENA} caracteres`}
            autoComplete="new-password"
            minLength={MIN_CONTRASENA}
            maxLength={72}
            required
          />
        </FormField>

        {crear.isError && (
          <ErrorText role="alert">
            <FiAlertCircle size={14} aria-hidden />
            {mensajeError(crear.error)}
          </ErrorText>
        )}

        <Actions>
          <GhostButton type="button" onClick={handleClose} disabled={crear.isPending}>
            Cancelar
          </GhostButton>
          <PrimaryButton type="submit" disabled={crear.isPending}>
            {crear.isPending ? "Creando…" : "Crear conductor"}
          </PrimaryButton>
        </Actions>
      </FormBody>
    </Dialog>
  )
}

export default NuevoConductorDialog
