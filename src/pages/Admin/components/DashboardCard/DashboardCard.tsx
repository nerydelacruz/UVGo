import { Component, type ReactNode } from "react"
import { FiAlertCircle, FiChevronRight } from "react-icons/fi"
import { ErrorText, GhostButton } from "@/styles/shared.styles"
import { Card, CardBody, CardEmpty, CardHeader, CardTitle, Chevron, HeaderEnd, Skeleton } from "./DashboardCard.styles"

export interface EstadoCarga {
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

interface DashboardCardProps {
  titulo: ReactNode
  estado: EstadoCarga
  // A dónde lleva la flecha; por ahora todo se gestiona en Solicitudes
  to?: string
  // Dato corto a la izquierda de la flecha (p. ej. "Últimos 7 días")
  extra?: ReactNode
  // Se estira para llenar el alto de su columna
  grow?: boolean
  // Alto de cada bloque del esqueleto mientras carga
  esqueleto?: string[]
  // Se muestra en lugar del contenido cuando no hay datos
  vacio?: { titulo: string; texto: string } | null
  children?: ReactNode
}

// Si el contenido de una tarjeta falla al pintarse, solo esa tarjeta muestra el error y el resto del panel sigue
class AislarError extends Component<{ children: ReactNode }, { fallo: boolean }> {
  state = { fallo: false }

  static getDerivedStateFromError() {
    return { fallo: true }
  }

  render() {
    if (!this.state.fallo) return this.props.children
    return (
      <ErrorText role="alert">
        <FiAlertCircle size={14} aria-hidden />
        No pudimos mostrar esta tarjeta.
      </ErrorText>
    )
  }
}

// Marco común de las tarjetas del panel: título, flecha al detalle y estados de carga, error y vacío
const DashboardCard = ({
  titulo,
  estado,
  to = "/admin/solicitudes",
  extra,
  grow,
  esqueleto = ["4.4rem"],
  vacio,
  children,
}: DashboardCardProps) => {
  const { isLoading, isError, onRetry } = estado

  let contenido: ReactNode = children
  if (isLoading) contenido = esqueleto.map((alto, i) => <Skeleton key={i} height={alto} aria-hidden />)
  else if (isError)
    contenido = (
      <ErrorText role="alert">
        <FiAlertCircle size={14} aria-hidden />
        No pudimos cargar estos datos.
        <GhostButton type="button" onClick={onRetry}>
          Reintentar
        </GhostButton>
      </ErrorText>
    )
  else if (vacio)
    contenido = (
      <CardEmpty>
        <strong>{vacio.titulo}</strong>
        <p>{vacio.texto}</p>
      </CardEmpty>
    )

  return (
    <Card grow={grow} aria-busy={isLoading || undefined}>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <HeaderEnd>
          {extra}
          <Chevron to={to} aria-label="Ver detalle" title="Ver detalle">
            <FiChevronRight size={18} aria-hidden />
          </Chevron>
        </HeaderEnd>
      </CardHeader>
      <CardBody>
        <AislarError>{contenido}</AislarError>
      </CardBody>
    </Card>
  )
}

export default DashboardCard
