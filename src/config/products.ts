import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: 'video_stitch',
    name: 'Vídeo do Stitch',
    basePrice: 47.90,
    image: '../assets/imgs/SURPRESA.png',
    thumbnail: '../assets/imgs/SURPRESA.png',
    description: 'Vídeo personalizado com o Stitch',
    alternativeNames: ['Stitch', 'Vídeo Mágico', 'Stitch Mágico'],
    category: 'personagens',
    featured: true,
    stars: 4.9,
    reviews: 128,
    video: '/videos/stitch-preview.mp4',
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
] 