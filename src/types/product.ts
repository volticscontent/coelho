import surpriseImage from '../assets/imgs/SURPRESA.png'

export interface Product {
  id: string
  name: string
  basePrice: number
  image: string
  thumbnail: string
  description: string
  alternativeNames: string[]
  category: string
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

export interface BunnyVideo {
  id: string
  name: string
  basePrice: number
  image: string
  thumbnail: string
  options: VideoOption[]
  maxChildren: number
  details: {
    duration: string
    format: string
    delivery: string
    includes: string[]
  }
}

export interface VideoOption {
  id: string
  title: string
  description: string
  price: number
  icon: string
}

export const STITCH_VIDEO: BunnyVideo = {
  id: 'video_stitch',
  name: 'Vídeo do Stitch',
  basePrice: 47.90,
  image: surpriseImage,
  thumbnail: surpriseImage,
  maxChildren: 3,
  options: [
    {
      id: '4k',
      title: 'Qualidade 4K',
      description: 'Vídeo em alta resolução 4K',
      price: 10,
      icon: '4k'
    },
    {
      id: 'foto',
      title: 'Foto com o Stitch',
      description: 'Foto personalizada com o Stitch',
      price: 14,
      icon: 'photo_camera'
    },
    {
      id: 'rapido',
      title: 'Entrega Rápida',
      description: 'Vídeo entregue em até 24h',
      price: 10,
      icon: 'rocket_launch'
    },
    {
      id: 'premium',
      title: 'Combo Premium',
      description: 'Todos os extras com desconto especial',
      price: 19.90,
      icon: 'stars'
    }
  ],
  details: {
    duration: '2-3 minutos',
    format: 'MP4 em HD ou 4K',
    delivery: '2-3 dias úteis (ou 24h com entrega rápida)',
    includes: [
      'Vídeo personalizado com o nome da criança',
      'Conversa interativa e divertida',
      'Mensagem especial do Stitch',
      'Música temática de fundo',
      'Efeitos especiais mágicos',
      'Garantia de encantamento'
    ]
  }
}

export interface ProductHandlerType {
  formatPrice(price: number): string
  getProductById(id: string): Product | null
  getProductsByCategory(category: string): Product[]
  getRelatedProducts(productId: string, limit?: number): Product[]
  searchProducts(query: string): Product[]
} 