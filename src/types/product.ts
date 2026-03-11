export interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  image: string
  thumbnail: string
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
  description: string
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

export const COELHO_VIDEO: BunnyVideo = {
  id: 'video_coelho',
  name: 'Vídeo do Coelho da Páscoa',
  description: 'O Coelho da pascoa vai esconder os ovos na pascoa! Será que seu filho vai conseguir encontrar?',
  basePrice: 37.90,
  image: '/video.png',
  thumbnail: '/video.png',
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
      title: 'Foto com o Coelho da Páscoa',
      description: 'Foto personalizada com o Coelho da Páscoa',
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
      'Mensagem especial do Coelho da Páscoa',
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