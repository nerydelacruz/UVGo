/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_MAPBOX_TOKEN?: string
  readonly VITE_SIMULAR_REPARTIDOR?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
