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
}

export interface CheckoutUrls {
  [key: string]: string
  base_1: string
  image_1: string
  image_fast_1: string
  image_fast_4k_1: string
  // ... outros URLs
} 