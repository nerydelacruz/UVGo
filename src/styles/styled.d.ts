import "@emotion/react"
import type { Theme as AppTheme } from "./theme"

declare module "@emotion/react" {
  // Emotion requiere ampliar su interfaz Theme mediante declaración de módulo.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {}
}
