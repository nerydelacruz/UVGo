import styled from "@emotion/styled"
import { hairline } from "@/styles/shared.styles"

export const Contenedor = styled.div`
  min-width: 0;
  overflow-x: auto;
  border: 1px solid ${hairline};
  border-radius: ${(p) => p.theme.radius.lg};
  background: rgba(255, 255, 255, 0.75);
`

export const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${(p) => p.theme.font.size.xs};

  caption {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  th,
  td {
    padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
    text-align: left;
    white-space: nowrap;
  }

  th {
    font-weight: ${(p) => p.theme.font.weight.medium};
    color: ${(p) => p.theme.color.textFaint};
    border-bottom: 1px solid ${hairline};
  }

  td {
    color: ${(p) => p.theme.color.text};
  }

  tbody tr + tr td {
    border-top: 1px solid ${hairline};
  }

  [data-numero] {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* La primera columna (nombre) puede ser larga: se corta con puntos suspensivos */
  td:first-of-type {
    max-width: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${(p) => p.theme.font.weight.medium};
  }
`
