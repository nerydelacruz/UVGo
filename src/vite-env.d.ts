/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  /** URL del WebSocket (ws://...); si falta se deriva de VITE_API_URL */
  readonly VITE_WS_URL?: string
  readonly VITE_MAPBOX_TOKEN?: string
  readonly VITE_SIMULAR_REPARTIDOR?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
