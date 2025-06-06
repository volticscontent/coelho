declare module 'resize-observer-polyfill' {
  export default class ResizeObserver {
    constructor(callback: ResizeObserverCallback)
    observe(target: Element): void
    unobserve(target: Element): void
    disconnect(): void
  }
} 