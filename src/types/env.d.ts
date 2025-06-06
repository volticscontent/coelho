/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  __VITE_AUTH_KEY?: string
} 