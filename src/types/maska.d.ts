declare module 'maska' {
  import type { Directive } from 'vue'

  export const vMaska: Directive<HTMLElement, string>
  
  export interface MaskaOptions {
    mask?: string | string[]
    tokens?: { [key: string]: RegExp }
    preprocessor?: (value: string) => string
  }

  export function create(options: string | MaskaOptions): (value: string) => string
  export function mask(value: string, mask: string | MaskaOptions): string
  export function tokens(customTokens: { [key: string]: RegExp }): void
  export function preprocessor(fn: (value: string) => string): void
} 