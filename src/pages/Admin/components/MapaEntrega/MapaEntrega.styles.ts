import styled from "@emotion/styled"
import { hairline } from "@/styles/shared.styles"
import RouteOverview from "@/pages/SeguimientoPedidos/components/RouteOverview/RouteOverview"

const flotante = `
  border: 1px solid ${hairline};
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 28px -14px rgb(0 0 0 / 0.25);
`

// El mapa de Seguimiento de pedidos estirado para llenar su columna del bento
export const MapaRuta = styled(RouteOverview)`
  flex: 1 1 auto;
  min-height: 48rem;
`

// Barra inferior: distancia, tiempo estimado y fecha límite sobre una línea de ruta.
// A la derecha deja libre la columna de los botones de zoom.
export const BarraRuta = styled.div`
  position: absolute;
  z-index: 2;
  right: calc(${(p) => p.theme.space.md} * 2 + 3.4rem);
  bottom: ${(p) => p.theme.space.md};
  left: ${(p) => p.theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.space.md} ${(p) => p.theme.space.lg};
  border-radius: ${(p) => p.theme.radius.lg};
  ${flotante}
`

export const Cifras = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${(p) => p.theme.space.md};

  span {
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    color: ${(p) => p.theme.color.textFaint};
  }

  span:nth-of-type(2) {
    align-items: center;
  }

  span:last-of-type {
    align-items: flex-end;
  }

  strong {
    font-size: ${(p) => p.theme.font.size.lg};
    font-weight: ${(p) => p.theme.font.weight.bold};
    color: ${(p) => p.theme.color.textStrong};
    font-variant-numeric: tabular-nums;
  }
`

// Línea de la ruta: bodega (punto oscuro) → destino (punto coral). Sin repartidor asignado no hay avance.
export const Linea = styled.div`
  position: relative;
  height: 0.4rem;
  margin: 0 0.5rem;
  border-radius: ${(p) => p.theme.radius.full};
  background: repeating-linear-gradient(90deg, ${(p) => p.theme.color.addAction} 0 0.8rem, transparent 0.8rem 1.4rem);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid white;
    border-radius: ${(p) => p.theme.radius.full};
    transform: translateY(-50%);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
  }

  &::before {
    left: -0.6rem;
    background: ${(p) => p.theme.color.textStrong};
  }

  &::after {
    right: -0.6rem;
    background: ${(p) => p.theme.color.accent};
  }
`
