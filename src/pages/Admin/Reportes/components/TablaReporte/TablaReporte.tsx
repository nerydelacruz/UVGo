import type { ReactNode } from "react"
import { Contenedor, Tabla } from "./TablaReporte.styles"

export interface Columna<T> {
  titulo: string
  celda: (fila: T) => ReactNode
  // Cifras a la derecha para que se comparen columna abajo
  numero?: boolean
}

interface TablaReporteProps<T> {
  // Describe la tabla para lectores de pantalla
  resumen: string
  columnas: Columna<T>[]
  filas: T[]
  clave: (fila: T) => string
}

// Tabla simple con desplazamiento horizontal en pantallas angostas
const TablaReporte = <T,>({ resumen, columnas, filas, clave }: TablaReporteProps<T>) => (
  <Contenedor>
    <Tabla>
      <caption>{resumen}</caption>
      <thead>
        <tr>
          {columnas.map((c) => (
            <th key={c.titulo} scope="col" data-numero={c.numero || undefined}>
              {c.titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filas.map((fila) => (
          <tr key={clave(fila)}>
            {columnas.map((c) => (
              <td key={c.titulo} data-numero={c.numero || undefined}>
                {c.celda(fila)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Tabla>
  </Contenedor>
)

export default TablaReporte
