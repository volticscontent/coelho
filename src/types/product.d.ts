export interface Product {
  id: string
  name: string
  category: string
  basePrice: number
  image: string
  thumbnail: string
  description: string
  alternativeNames: string[]
  featured: boolean
  stars: number
  reviews: number
  video: string
  details: {
    duration: string
    format: string
    delivery: string
    includes: string[]
  }
}

interface ProductHandlerType {
  formatPrice(price: number): string
  getProductById(id: string): Product | null
  getProductsByCategory(category: string): Product[]
  getRelatedProducts(productId: string, limit?: number): Product[]
  searchProducts(query: string): Product[]
} 