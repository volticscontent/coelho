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
    base_1: 'https://go.perfectpay.com.br/PPU38CPKHIF', // Checkout - 1 Criança
    '4k_1': 'https://go.perfectpay.com.br/PPU38CPKHJJ', // Checkout - 1 criança + Vídeo 4K
    foto_1: 'https://go.perfectpay.com.br/PPU38CPKHJP', // Checkout - 1 criança + Foto
    rapido_1: 'https://go.perfectpay.com.br/PPU38CPKHJS', // Checkout - 1 criança + Entrega Rápida
    '4k_foto_1': 'https://go.perfectpay.com.br/PPU38CPKHJU', // Checkout - 1 criança + 4K + Foto
    '4k_rapido_1': 'https://go.perfectpay.com.br/PPU38CPKHK0', // Checkout - 1 criança + 4K + Entrega Rápida
    foto_rapido_1: 'https://go.perfectpay.com.br/PPU38CPKHK2', // Checkout - 1 criança + Foto + Entrega Rápida
    '4k_foto_rapido_1': 'https://go.perfectpay.com.br/PPU38CPKHK3', // Checkout - 1 criança + 4K + Foto + Entrega Rápida
    premium_1: 'https://go.perfectpay.com.br/PPU38CPKHK4', // Checkout - 1 criança + Combo Premium

    // 2 crianças
    base_2: 'https://go.perfectpay.com.br/PPU38CPKHK7', // Checkout - 2 crianças (sem adicionais)
    '4k_2': 'https://go.perfectpay.com.br/PPU38CPKHK8', // Checkout - 2 crianças + 4K
    foto_2: 'https://go.perfectpay.com.br/PPU38CPKHK9', // Checkout - 2 crianças + Foto
    rapido_2: 'https://go.perfectpay.com.br/PPU38CPKHKA', // Checkout - 2 crianças + Entrega Rápida
    '4k_foto_2': 'https://go.perfectpay.com.br/PPU38CPKHKB', // Checkout - 2 crianças + 4K + Foto
    '4k_rapido_2': 'https://go.perfectpay.com.br/PPU38CPKHKC', // Checkout - 2 crianças + 4K + Entrega Rápida
    foto_rapido_2: 'https://go.perfectpay.com.br/PPU38CPKHKD', // Checkout - 2 crianças + Foto + Entrega Rápida
    '4k_foto_rapido_2': 'https://go.perfectpay.com.br/PPU38CPKHKI', // Checkout - 2 crianças + 4K + Foto + Entrega Rápida
    premium_2: 'https://go.perfectpay.com.br/PPU38CQ8EB2', // Checkout - 2 crianças combo premium

    // 3+ crianças
    base_3: 'https://go.perfectpay.com.br/PPU38CQ8EBB', // Checkout - 3+ crianças sem adicionais
    '4k_3': 'https://go.perfectpay.com.br/PPU38CPKHKP', // Checkout - 3+ crianças + 4K
    foto_3: 'https://go.perfectpay.com.br/PPU38CPKHKR', // Checkout - 3+ crianças + Foto
    rapido_3: 'https://go.perfectpay.com.br/PPU38CPKHKT', // Checkout - 3+ crianças + Entrega Rápida
    '4k_foto_3': 'https://go.perfectpay.com.br/PPU38CPKHL0', // Checkout - 3+ crianças + 4K + Foto
    '4k_rapido_3': 'https://go.perfectpay.com.br/PPU38CPKHL2', // Checkout - 3+ crianças + 4K + Entrega Rápida
    foto_rapido_3: 'https://go.perfectpay.com.br/PPU38CPKHL3', // Checkout - 3+ crianças + Foto + Entrega Rápida
    '4k_foto_rapido_3': 'https://go.perfectpay.com.br/PPU38CPKHL4', // Checkout - 3+ crianças + 4K + Foto + Entrega Rápida
    premium_3: 'https://go.perfectpay.com.br/PPU38CPKHL5', // Checkout - 3+ crianças + Combo Premium

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