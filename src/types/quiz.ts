export interface Step {
  id: number
  label: string
  icon: string
  component: string
}

export interface Child {
  name: string
  age: number | null
  photo: File | null
  photoPreview: string | null
}

export interface Product {
  id: string
  name: string
  price: number
  description: string
}

export interface QuizData {
  product: string | null
  quantity: number
  options: string[]
  children: Child[]
  contactName: string
  contactEmail: string
  contactPhone: string
  message: string
  totalPrice?: number
  isValid?: boolean
  dataCommitment: boolean
}

export interface ContactData {
  email: string
  phone: string
  acceptTerms: boolean
  isValid?: boolean
  children: Child[]
  message: string
}

export interface QuizStep {
  id: number
  label: string
  icon: string
  component: any
  title: string
  description: string
  path: string
}

export interface QuizState {
  currentStep: number
  steps: QuizStep[]
  quizData: QuizData
} 