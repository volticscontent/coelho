import type { QuizData } from '@/types/checkout'

interface QuizState {
  currentStep: number
  quizData: QuizData
}

export const quizStore = {
  state: {
    currentStep: 1,
    quizData: {
      product: null,
      quantity: 1,
      options: [],
      children: []
    }
  } as QuizState,

  setStep(step: number): void {
    this.state.currentStep = step
  },

  updateQuizData(data: Partial<QuizData>): void {
    this.state.quizData = { ...this.state.quizData, ...data }
  },

  resetQuiz() {
    this.state.currentStep = 1
    this.state.quizData = {
      product: null,
      quantity: 1,
      options: [],
      children: []
    }
  }
} 