import "@emotion/react"
import type { Theme as AppTheme } from "./theme"

declare module "@emotion/react" {
  // Emotion requiere una interfaz para ampliar su tema por declaration merging.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {}
}
