/**
 * Utilitário para gerenciar comportamentos de scroll
 */

/**
 * Rola a página suavemente para o topo
 */
export function scrollToTop(options: ScrollBehavior = 'smooth'): void {
  window.scrollTo({
    top: 0,
    behavior: options
  })
}

/**
 * Rola até um elemento específico
 * @param selector - Seletor CSS do elemento
 * @param options - Opções de comportamento do scroll
 */
export function scrollToElement(selector: string, options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }): void {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView(options)
  }
}

/**
 * Restaura a posição do scroll para o topo ao navegar
 * Deve ser usado em conjunto com o router
 */
export function setupScrollBehavior(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => scrollToTop('auto'))
    
    // Adiciona listener para links internos
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
        scrollToTop()
      }
    })
  }
} 