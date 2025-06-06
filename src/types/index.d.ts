declare module '*.png'
declare module '*.jpg'
declare module '*.webp'
declare module '*.svg'

interface RouteMetaType {
  title?: string
  requiresAuth?: boolean
}

interface RouteLocationNormalized {
  meta: RouteMetaType
} 