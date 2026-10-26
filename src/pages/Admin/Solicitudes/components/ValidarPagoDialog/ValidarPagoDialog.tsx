import axios from "axios"
import { FiAlertCircle } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, Body, DialogText, DialogTitle } from "@/components/Dialog/Dialog.styles"
import { useRegistrarPago } from "@/hooks/usePedidos"
import type { PedidoDetalle } from "@/models/pedido.model"
import { ErrorText, GhostButton, PrimaryButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"
import { formatPrecio } from "@/utilities/currency"

interface ValidarPagoDialogProps {
  pedido: PedidoDetalle
  open: boolean
  onClose: () => void
  onPagado: () => void
}

const mensajeError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 409
    ? "La solicitud cambió (por ejemplo, el estudiante reemplazó el comprobante). Revisa el comprobante nuevo antes de validar."
    : getErrorMessage(error, "No se pudo registrar el pago. Intenta de nuevo.")

// El admin confirma que el depósito llegó: el pedido pasa a PAGADO y el estudiante recibe un correo
const ValidarPagoDialog = ({ pedido, open, onClose, onPagado }: ValidarPagoDialogProps) => {
  const registrar = useRegistrarPago()

  const handleClose = () => {
    registrar.reset()
    onClose()
  }

  const handleConfirm = () =>
    registrar.mutate(
      { pedidoId: pedido.id, version: pedido.version },
      {
        onSuccess: () => {
          handleClose()
          onPagado()
        },
      },
    )

  return (
    <Dialog open={open} onClose={handleClose} labelledBy="validar-title">
      <Body>
        <div>
          <DialogTitle id="validar-title">¿Validar el pago?</DialogTitle>
          <DialogText>
            Confirma que el depósito de <strong>{formatPrecio(pedido.total ?? 0, "GTQ")}</strong> de {pedido.curso} ya
            está en la cuenta. El pedido quedará como pagado y le enviaremos un correo al estudiante.
          </DialogText>
        </div>

        {registrar.isError && (
          <ErrorText role="alert">
            <FiAlertCircle size={14} aria-hidden />
            {mensajeError(registrar.error)}
          </ErrorText>
        )}

        <Actions>
          <GhostButton type="button" onClick={handleClose} disabled={registrar.isPending} data-autofocus>
            Volver
          </GhostButton>
          <PrimaryButton type="button" onClick={handleConfirm} disabled={registrar.isPending}>
            {registrar.isPending ? "Validando…" : "Validar pago"}
          </PrimaryButton>
        </Actions>
      </Body>
    </Dialog>
  )
}

export default ValidarPagoDialog
