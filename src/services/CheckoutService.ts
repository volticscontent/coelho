import type { CheckoutUrls, CheckoutUrlKey } from '@/types/checkout'

interface CheckoutError extends Error {
  code?: string
  details?: unknown
  response?: {
    status: number
    data?: unknown
  }
}

export interface CheckoutData {
  quantity: number
  options: string[]
  product: string
  totalPrice: number
}

export class CheckoutService {
  static readonly CHECKOUT_URLS: CheckoutUrls = {
    // 1 criança
    base_1: 'https://go.perfectpay.com.br/PPU38CQ8E66', // Checkout - 1 Criança - R$ 47,90
    '4k_1': 'https://go.perfectpay.com.br/PPU38CQ8EAI', // Checkout - 1 criança + Vídeo 4K - R$ 57,90
    foto_1: 'https://go.perfectpay.com.br/PPU38CQ8EA9', // Checkout - 1 criança + Foto - R$ 61,90
    rapido_1: 'https://go.perfectpay.com.br/PPU38CQ8EA8', // Checkout - 1 criança + Entrega Rápida - R$ 57,90
    '4k_foto_1': 'https://go.perfectpay.com.br/PPU38CQ8EA4', // Checkout - 1 criança + 4K + Foto - R$ 71,90
    '4k_rapido_1': 'https://go.perfectpay.com.br/PPU38CQ8EA1', // Checkout - 1 criança + 4K + Entrega Rápida - R$ 67,90
    foto_rapido_1: 'https://go.perfectpay.com.br/PPU38CQ8EAB', // Checkout - 1 criança + Foto + Entrega Rápida - R$ 71,90
    '4k_foto_rapido_1': 'https://go.perfectpay.com.br/PPU38CQ8EA6', // Checkout - 1 criança + 4K + Foto + Entrega Rápida - R$ 81,90
    premium_1: 'https://go.perfectpay.com.br/PPU38CQ8EA7', // Checkout - 1 criança + Combo Premium - R$ 67,80

    // 2 crianças
    base_2: 'https://go.perfectpay.com.br/PPU38CQ8EAL', // Checkout - 2 crianças (sem adicionais) - R$ 57,90
    '4k_2': 'https://go.perfectpay.com.br/PPU38CQ8EAN', // Checkout - 2 crianças + 4K - R$ 67,90
    foto_2: 'https://go.perfectpay.com.br/PPU38CQ8EB8', // Checkout - 2 crianças + Foto - R$ 71,90
    rapido_2: 'https://go.perfectpay.com.br/PPU38CQ8EB3', // Checkout - 2 crianças + Entrega Rápida - R$ 67,90
    '4k_foto_2': 'https://go.perfectpay.com.br/PPU38CQ8EAQ', // Checkout - 2 crianças + 4K + Foto - R$ 81,90
    '4k_rapido_2': 'https://go.perfectpay.com.br/PPU38CQ8EAO', // Checkout - 2 crianças + 4K + Entrega Rápida - R$ 77,90
    foto_rapido_2: 'https://go.perfectpay.com.br/PPU38CQ8EBA', // Checkout - 2 crianças + Foto + Entrega Rápida - R$ 81,90
    '4k_foto_rapido_2': 'https://go.perfectpay.com.br/PPU38CQ8EAU', // Checkout - 2 crianças + 4K + Foto + Entrega Rápida - R$ 91,90
    premium_2: 'https://go.perfectpay.com.br/PPU38CQ8EB2', // Checkout - 2 crianças + Combo Premium - R$ 77,80

    // 3+ crianças
    base_3: 'https://go.perfectpay.com.br/PPU38CQ8EBB', // Checkout - 3+ crianças sem adicionais - R$ 67,90
    '4k_3': 'https://go.perfectpay.com.br/PPU38CQ8EBC', // Checkout - 3+ crianças + 4K - R$ 77,90
    foto_3: 'https://go.perfectpay.com.br/PPU38CQ8EBN', // Checkout - 3+ crianças + Foto - R$ 81,90
    rapido_3: 'https://go.perfectpay.com.br/PPU38CQ8EBK', // Checkout - 3+ crianças + Entrega Rápida - R$ 77,90
    '4k_foto_3': 'https://go.perfectpay.com.br/PPU38CQ8EBF', // Checkout - 3+ crianças + 4K + Foto - R$ 91,90
    '4k_rapido_3': 'https://go.perfectpay.com.br/PPU38CQ8EBD', // Checkout - 3+ crianças + 4K + Entrega Rápida - R$ 87,90
    foto_rapido_3: 'https://go.perfectpay.com.br/PPU38CQ8EBO', // Checkout - 3+ crianças + Foto + Entrega Rápida - R$ 91,90
    '4k_foto_rapido_3': 'https://go.perfectpay.com.br/PPU38CQ8EBH', // Checkout - 3+ crianças + 4K + Foto + Entrega Rápida - R$ 101,90
    premium_3: 'https://go.perfectpay.com.br/PPU38CQ8EBJ', // Checkout - 3+ crianças + Combo Premium - R$ 87,90

    // Produtos adicionais
    kit_atividades: 'https://go.perfectpay.com.br/PPU38CPO0I3',
    certificado: 'https://go.perfectpay.com.br/PPU38CPO0I4',
    minigame: 'https://go.perfectpay.com.br/PPU38CPO0I5',
    pacote_completo: 'https://go.perfectpay.com.br/PPU38CPO0I6'
  }

  static processCheckout(data: CheckoutData): string {
    // Validação específica para vídeo do Coelho da Páscoa
    if (data.product !== 'video_coelho') {
      throw new Error('Produto inválido. Deve ser um vídeo do Coelho da Páscoa.')
    }

    // Validação da quantidade
    if (!data.quantity || data.quantity < 1 || data.quantity > 3) {
      throw new Error('Quantidade de crianças inválida. Deve ser entre 1 e 3.')
    }

    const quantity = data.quantity
    const options = Array.isArray(data.options) ? data.options : []

    // Determinar a URL correta baseada nas opções
    const key = this.determineCheckoutKey(quantity, options)
    const url = this.CHECKOUT_URLS[key]

    if (!url) {
      throw new Error(`URL de checkout não encontrada para: quantidade=${quantity}, opções=${options.join(',')}`)
    }

    return url
  }

  private static determineCheckoutKey(quantity: number, options: string[]): CheckoutUrlKey {
    // Lógica para determinar a chave correta baseada nas opções
    let key = 'base'

    if (options.includes('premium')) {
      key = 'premium'
    } else if (options.includes('4k') && options.includes('foto') && options.includes('rapido')) {
      key = '4k_foto_rapido'
    } else if (options.includes('4k') && options.includes('foto')) {
      key = '4k_foto'
    } else if (options.includes('4k') && options.includes('rapido')) {
      key = '4k_rapido'
    } else if (options.includes('foto') && options.includes('rapido')) {
      key = 'foto_rapido'
    } else if (options.includes('4k')) {
      key = '4k'
    } else if (options.includes('foto')) {
      key = 'foto'
    } else if (options.includes('rapido')) {
      key = 'rapido'
    }

    return `${key}_${quantity}` as CheckoutUrlKey
  }

  private static handleError(error: CheckoutError): never {
    console.error('Erro no checkout:', error)
    throw error
  }
}

export default CheckoutService 