declare module 'vue-the-mask' {
  import type { DirectiveBinding } from 'vue'
  
  export const mask: {
    bind: (el: HTMLElement, binding: DirectiveBinding) => void
    unbind: (el: HTMLElement) => void
    update: (el: HTMLElement, binding: DirectiveBinding) => void
  }
} 