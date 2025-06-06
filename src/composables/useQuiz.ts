import { ref, computed, markRaw } from 'vue'
import type { QuizData, QuizStep } from '@/types/quiz'
import PersQuantity from '@/components/personalization/steps/PersQuantity.vue'
import PersType from '@/components/personalization/steps/PersType.vue'
import PersContact from '@/components/personalization/steps/PersContact.vue'

const stepsData: QuizStep[] = [
  {
    id: 1,
    label: 'Quantidade',
    icon: 'child_care',
    component: markRaw(PersQuantity),
    title: 'Quantas crianças participarão?',
    description: 'Selecione a quantidade de crianças que conversarão com o Stitch',
    path: '/personalizar/quantidade'
  },
  {
    id: 2,
    label: 'Extras',
    icon: 'star',
    component: markRaw(PersType),
    title: 'Personalize sua conversa',
    description: 'Escolha melhorias para tornar o vídeo ainda mais especial',
    path: '/personalizar/extras'
  },
  {
    id: 3,
    label: 'Dados',
    icon: 'person',
    component: markRaw(PersContact),
    title: 'Informações das Crianças',
    description: 'Preencha os dados de cada criança que aparecerá no vídeo',
    path: '/personalizar/contato'
  }
]

const initialQuizData: QuizData = {
  product: 'video_stitch',
  quantity: 1,
  options: [],
  children: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  message: '',
  totalPrice: 0,
  dataCommitment: false
}

export function useQuiz() {
  const currentStep = ref(1)
  const steps = ref<QuizStep[]>(stepsData)
  const quizData = ref<QuizData>({ ...initialQuizData })

  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 1:
        return quizData.value.quantity >= 1 && quizData.value.quantity <= 3
      case 2:
        return true
      case 3:
        return Boolean(
          quizData.value.contactEmail && 
          quizData.value.contactPhone && 
          quizData.value.contactName &&
          quizData.value.dataCommitment
        )
      default:
        return false
    }
  })

  function setStep(step: number) {
    currentStep.value = step
  }

  function updateQuizData(data: Partial<QuizData>) {
    quizData.value = { ...quizData.value, ...data }
  }

  function resetQuiz() {
    currentStep.value = 1
    quizData.value = { ...initialQuizData }
  }

  return {
    currentStep,
    steps,
    quizData,
    canProceed,
    setStep,
    updateQuizData,
    resetQuiz
  }
}