import { FiAlertCircle } from "react-icons/fi"
import Dialog from "@/components/Dialog/Dialog"
import { Actions, Body, DialogText, DialogTitle } from "@/components/Dialog/Dialog.styles"
import { useCancelarPedido } from "@/hooks/usePedidos"
import type { PedidoDetalle } from "@/models/pedido.model"
import { DangerButton, ErrorText, GhostButton } from "@/styles/shared.styles"
import { getErrorMessage } from "@/utilities/apiError"

interface RechazarDialogProps {
  pedido: PedidoDetalle
  open: boolean
  onClose: () => void
  onRechazada: () => void
}

// Rechazar la cotización (o cancelar una solicitud aún sin cotizar) usa la cancelación del backend
const RechazarDialog = ({ pedido, open, onClose, onRechazada }: RechazarDialogProps) => {
  const cancelar = useCancelarPedido()
  const cotizada = pedido.estado === "COTIZADO"
  const confirmada = pedido.estado === "CONFIRMADO"
  const titulo = cotizada ? "¿Rechazar la cotización?" : confirmada ? "¿Cancelar el pedido?" : "¿Cancelar la solicitud?"
  const accion = cotizada ? "Rechazar cotización" : confirmada ? "Cancelar pedido" : "Cancelar solicitud"

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
          onRechazada()
        },
      },
    )

  return (
    <Dialog open={open} onClose={handleClose} labelledBy="rechazar-title">
      <Body>
        <div>
          <DialogTitle id="rechazar-title">{titulo}</DialogTitle>
          <DialogText>
            {cotizada || confirmada
              ? "La solicitud quedará cancelada y no se comprará nada. Si necesitas los productos más adelante, tendrás que crear una solicitud nueva."
              : "Dejaremos de cotizar esta solicitud. Si la necesitas más adelante, tendrás que crear una nueva."}
          </DialogText>
        </div>

        {cancelar.isError && (
          <ErrorText role="alert">
            <FiAlertCircle size={14} aria-hidden />
            {getErrorMessage(cancelar.error, "No pudimos cancelar la solicitud. Intenta de nuevo.")}
          </ErrorText>
        )}

        <Actions>
          <GhostButton type="button" onClick={handleClose} disabled={cancelar.isPending} data-autofocus>
            Volver
          </GhostButton>
          <DangerButton type="button" onClick={handleConfirm} disabled={cancelar.isPending}>
            {cancelar.isPending ? "Cancelando…" : accion}
          </DangerButton>
        </Actions>
      </Body>
    </Dialog>
  )
}

export default RechazarDialog
