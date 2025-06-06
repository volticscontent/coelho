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
    base_1: 'https://go.perfectpay.com.br/PPU38CPO0DP',
    '4k_1': 'https://go.perfectpay.com.br/PPU38CPO0DR',
    foto_1: 'https://go.perfectpay.com.br/PPU38CPO0DQ',
    rapido_1: 'https://go.perfectpay.com.br/PPU38CPO0DT',
    '4k_foto_1': 'https://go.perfectpay.com.br/PPU38CPO0DU',
    '4k_rapido_1': 'https://go.perfectpay.com.br/PPU38CPO0EM',
    foto_rapido_1: 'https://go.perfectpay.com.br/PPU38CPO0E0',
    '4k_foto_rapido_1': 'https://go.perfectpay.com.br/PPU38CPO0EN',
    premium_1: 'https://go.perfectpay.com.br/PPU38CPO0EQ',

    // 2 crianças
    base_2: 'https://go.perfectpay.com.br/PPU38CPO0FO',
    '4k_2': 'https://go.perfectpay.com.br/PPU38CPO0GO',
    foto_2: 'https://go.perfectpay.com.br/PPU38CPO0GN',
    rapido_2: 'https://go.perfectpay.com.br/PPU38CPO0GP',
    '4k_foto_2': 'https://go.perfectpay.com.br/PPU38CPO0GS',
    '4k_rapido_2': 'https://go.perfectpay.com.br/PPU38CPO0H2',
    foto_rapido_2: 'https://go.perfectpay.com.br/PPU38CPO0H1',
    '4k_foto_rapido_2': 'https://go.perfectpay.com.br/PPU38CPO0H3',
    premium_2: 'https://go.perfectpay.com.br/PPU38CPO0H4',

    // 3+ crianças
    base_3: 'https://go.perfectpay.com.br/PPU38CPO0H5',
    '4k_3': 'https://go.perfectpay.com.br/PPU38CPO0H7',
    foto_3: 'https://go.perfectpay.com.br/PPU38CPO0H6',
    rapido_3: 'https://go.perfectpay.com.br/PPU38CPO0HK',
    '4k_foto_3': 'https://go.perfectpay.com.br/PPU38CPO0HN',
    '4k_rapido_3': 'https://go.perfectpay.com.br/PPU38CPO0HQ',
    foto_rapido_3: 'https://go.perfectpay.com.br/PPU38CPO0HP',
    '4k_foto_rapido_3': 'https://go.perfectpay.com.br/PPU38CPO0HT',
    premium_3: 'https://go.perfectpay.com.br/PPU38CPO0I1',

    // Produtos adicionais
    kit_atividades: 'https://go.perfectpay.com.br/PPU38CPO0I3',
    certificado: 'https://go.perfectpay.com.br/PPU38CPO0I4',
    minigame: 'https://go.perfectpay.com.br/PPU38CPO0I5',
    pacote_completo: 'https://go.perfectpay.com.br/PPU38CPO0I6'
  }

  static processCheckout(data: CheckoutData): string {
    // Validação específica para vídeo do Stitch
    if (data.product !== 'video_stitch') {
      throw new Error('Produto inválido. Deve ser um vídeo do Stitch.')
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