import { useEffect, useRef, type ReactNode } from "react"
import { StyledDialog } from "./Dialog.styles"

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  wide?: boolean
}

// <dialog> nativo: atrapa el foco, cierra con Escape y oscurece el fondo sin librerías.
// Para enfocar un elemento al abrir, márcalo con data-autofocus.
// El contenido solo se monta mientras está abierto, así cada apertura empieza con el formulario limpio.
const Dialog = ({ open, onClose, labelledBy, children, wide = false }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal enfoca el primer campo; data-autofocus permite elegir otro (el autoFocus de React no aplica aquí)
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <StyledDialog
      ref={ref}
      wide={wide}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Clic en el fondo oscuro (fuera de la caja) también cierra
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {open && children}
    </StyledDialog>
  )
}

export default Dialog
