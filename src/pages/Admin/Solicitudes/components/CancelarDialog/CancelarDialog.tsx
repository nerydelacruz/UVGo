import { FiAlertCircle } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, Body, DialogText, DialogTitle } from "@/components/Dialog/Dialog.styles"
import { useCancelarPedido } from "@/hooks/usePedidos"
import type { PedidoDetalle } from "@/models/pedido.model"
import { getErrorMessage } from "@/utilities/apiError"
import { DangerButton, ErrorText, GhostButton } from "../../Solicitudes.styles"

interface CancelarDialogProps {
  pedido: PedidoDetalle
  open: boolean
  onClose: () => void
  onCancelado: () => void
}

const CancelarDialog = ({ pedido, open, onClose, onCancelado }: CancelarDialogProps) => {
  const cancelar = useCancelarPedido()

  // Limpia el error de un intento anterior al cerrar
  const handleClose = () => {
    cancelar.reset()
    onClose()
  }

  const handleConfirm = () =>
    cancelar.mutate(
      { pedidoId: pedido.id, version: pedido.version },
      {
        onSuccess: () => {
          handleClose()
          onCancelado()
        },
      },
    )

  return (
    <Dialog open={open} onClose={handleClose} labelledBy="cancelar-title">
      <Body>
        <div>
          <DialogTitle id="cancelar-title">¿Cancelar esta solicitud?</DialogTitle>
          <DialogText>
            La solicitud de <strong>{pedido.curso}</strong> quedará cancelada y le enviaremos un correo al estudiante.
            Úsalo cuando no se puedan conseguir los productos. Esta acción no se puede deshacer.
          </DialogText>
        </div>

        {cancelar.isError && (
          <ErrorText role="alert">
            <FiAlertCircle size={14} aria-hidden />
            {getErrorMessage(cancelar.error, "No se pudo cancelar la solicitud. Intenta de nuevo.")}
          </ErrorText>
        )}

        <Actions>
          <GhostButton type="button" onClick={handleClose} disabled={cancelar.isPending} data-autofocus>
            Volver
          </GhostButton>
          <DangerButton type="button" onClick={handleConfirm} disabled={cancelar.isPending}>
            {cancelar.isPending ? "Cancelando…" : "Cancelar solicitud"}
          </DangerButton>
        </Actions>
      </Body>
    </Dialog>
  )
}

export default CancelarDialog
