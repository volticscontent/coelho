export interface QuizData {
  product: string | null
  quantity: number
  options: string[]
  children: Array<{
    name: string
    age: number | null
    photo: File | null
    photoPreview: string | null
  }>
  totalPrice?: number
}

export type CheckoutUrlKey = 
  // 1 criança
  | 'base_1' | '4k_1' | 'foto_1' | 'rapido_1' | '4k_foto_1' | '4k_rapido_1' | 'foto_rapido_1' | '4k_foto_rapido_1' | 'premium_1'
  // 2 crianças
  | 'base_2' | '4k_2' | 'foto_2' | 'rapido_2' | '4k_foto_2' | '4k_rapido_2' | 'foto_rapido_2' | '4k_foto_rapido_2' | 'premium_2'
  // 3+ crianças
  | 'base_3' | '4k_3' | 'foto_3' | 'rapido_3' | '4k_foto_3' | '4k_rapido_3' | 'foto_rapido_3' | '4k_foto_rapido_3' | 'premium_3'
  // Produtos adicionais
  | 'kit_atividades' | 'certificado' | 'minigame' | 'pacote_completo'

export type CheckoutUrls = Record<CheckoutUrlKey, string> 