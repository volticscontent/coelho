<template>
  <div class="pers-steps">
    <!-- Quiz Content -->
    <div class="quiz-content">
      <!-- Progress Bar -->
      <div class="progress-bar" :style="{ '--progress-width': progressWidth }">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="progress-step"
          :class="{
            'active': currentStepIndex === index,
            'completed': currentStepIndex > index
          }"
        >
          <div class="progress-step-number">
            <span class="material-icons" v-if="currentStepIndex > index">check</span>
            <span class="material-icons" v-else>{{ getStepIcon(step.id) }}</span>
          </div>
          <div class="progress-step-label">{{ step.label }}</div>
        </div>
      </div>

      <transition name="fade-slide" mode="out-in">
        <component 
          :is="currentComponent"
          :quiz-data="quizData"
          :can-proceed="canProceed"
          :has-photo-option="hasPhotoOption"
          @update="handleUpdate"
          @next="handleNext"
          @back="handleBack"
          v-if="currentComponent"
        />
      </transition>

      <!-- Progress Bar -->
      <div class="price-progress" v-if="shouldShowPriceInfo">
        <div class="price-info">
          <div class="price-details">
            <!-- Preço base -->
            <div class="price-item">
              <span>{{ getProductName() }}</span>
              <span>{{ formatPrice(getBasePrice()) }}</span>
            </div>

            <!-- Preço das opções extras -->
            <template v-if="quizData.options?.length">
              <div class="price-item" v-for="option in quizData.options" :key="option">
                <span>{{ getOptionName(option) }}</span>
                <span>+ {{ formatPrice(getOptionPrice(option)) }}</span>
              </div>

              <!-- Mostra economia quando tem pacote premium -->
              <div class="price-item-2" v-if="quizData.options.includes('premium')">
                <span>Sua economia com o Combo Premium</span>
                <span>{{ formatPrice(15) }}</span>
              </div>

              <!-- Aviso quando todos os order bumps estão selecionados -->
              <div class="price-item-3" v-if="shouldShowPremiumAdvice">
                <span>💡 Escolha o Combo Premium e economize R$ 14,10!</span>
              </div>
            </template>
          </div>
          <div class="total-price">
            <span>Total</span>
            <span class="price">{{ formatPrice(calculateTotal()) }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="nav-buttons">
        <button 
          v-if="currentStepIndex > 0"
          class="btn btn-back" 
          @click="handleBack"
          style="background: var(--gray-50); color: var(--text-color); border: 1px solid var(--gray-100);"
        >
          <span class="material-icons">arrow_back</span>
          Voltar
        </button>
        
        <button 
          class="btn btn-next"
          @click="handleNext"
          :disabled="isSubmitting && isLastStep"
          style="background: var(--primary-color); color: var(--white);"
        >
          <span v-if="isSubmitting && isLastStep">Enviando...</span>
          <span v-else>{{ isLastStep ? 'Finalizar' : 'Continuar' }}</span>
          <span class="material-icons" :class="{ 'loading-icon': isSubmitting && isLastStep }">
            {{ isSubmitting && isLastStep ? 'sync' : (isLastStep ? 'check' : 'arrow_forward') }}
          </span>
        </button>
      </div>

      <!-- Atualizar a seção de resumo do pedido -->
      <div class="order-summary" v-if="currentStepIndex === 4">
        <h3 class="summary-title">Resumo do pedido</h3>
        
        <div class="summary-content">
          <div class="price-details">
            <!-- Preço base -->
            <div class="price-item">
              <span>{{ getProductName() }}</span>
              <span>{{ formatPrice(getBasePrice()) }}</span>
            </div>

            <!-- Opções extras -->
            <template v-if="quizData.options?.length">
              <div 
                v-for="option in quizData.options" 
                :key="option"
                class="price-item"
              >
                <span>{{ getOptionName(option) }}</span>
                <span>+ {{ formatPrice(getOptionPrice(option)) }}</span>
              </div>
            </template>

            <!-- Linha divisória -->
            <div class="price-divider"></div>

            <!-- Total -->
            <div class="price-total">
              <span>Total</span>
              <span>{{ formatPrice(calculateTotal()) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, nextTick, markRaw, onMounted, toRaw } from 'vue'
import type { QuizStep, QuizData } from '@/types/quiz'
import { useQuiz } from '@/composables/useQuiz'
import { trackEvent, trackBeginCheckout } from '@/utils/analytics'
import CheckoutService from '@/services/CheckoutService'
import PersQuantity from './steps/PersQuantity.vue'
import PersType from './steps/PersType.vue'
import PersContact from './steps/PersContact.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { CheckoutData } from '@/services/CheckoutService'

// Componentes marcados como raw para evitar reatividade desnecessária
const components = {
  PersQuantity: markRaw(PersQuantity),
  PersType: markRaw(PersType),
  PersContact: markRaw(PersContact)
}



export default defineComponent({
  name: 'PersSteps',
  components,
  emits: ['quiz-completed', 'step-change'],
  setup(_props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    
    // Flag para controlar múltiplos envios
    const isSubmitting = ref(false)
    
    const {
      quizData,
      updateQuizData,
      canProceed
    } = useQuiz()

    // Definindo o currentStep
    const currentStepIndex = ref(0)

    // Definindo os steps diretamente
    const steps = ref([
      {
        id: 1,
        label: 'Crianças',
        icon: 'child_care',
        component: components.PersQuantity,
        title: 'Quantidade de Crianças',
        description: 'Selecione quantas crianças participarão do vídeo',
        path: '/personalizar/quantidade'
      },
      {
        id: 2,
        label: 'Extras',
        icon: 'auto_awesome',
        component: components.PersType,
        title: 'Opções Extras',
        description: 'Escolha as opções extras para o seu vídeo',
        path: '/personalizar/extras'
      },
      {
        id: 3,
        label: 'Contato',
        icon: 'person',
        component: components.PersContact,
        title: 'Informações de Contato',
        description: 'Preencha os dados das crianças e do responsável',
        path: '/personalizar/contato'
      }
    ])

    const hasPhotoOption = computed(() => {
      return quizData.value.options?.includes('foto') || quizData.value.options?.includes('premium') || false
    })

    const currentComponent = computed(() => {
      if (!steps.value?.length) return null
      const step = steps.value.find((s: QuizStep) => s.id === currentStepIndex.value + 1)
      return step?.component
    })

    const isLastStep = computed(() => {
      if (!steps.value?.length) return false
      return currentStepIndex.value === steps.value.length - 1
    })

    // Função para atualizar a URL baseada no step atual
    const updateUrl = (step: number) => {
      const stepData = steps.value.find(s => s.id === step)
      if (stepData) {
        router.push(stepData.path)
      }
    }

    // Função para obter o step baseado na URL atual
    const getStepFromUrl = () => {
      const currentPath = route.path
      const stepData = steps.value.find(s => s.path === currentPath)
      return stepData ? stepData.id : 1
    }

    // Observa mudanças na URL
    watch(() => route.path, (newPath) => {
      const stepData = steps.value.find(s => s.path === newPath)
      if (stepData && stepData.id !== currentStepIndex.value + 1) {
        currentStepIndex.value = stepData.id - 1
      }
    })

    // Observa mudanças no currentStep
    watch(currentStepIndex, (newStep) => {
      updateUrl(newStep + 1)

      // Track step view for GA4
      trackEvent({
        event_name: 'view_step',
        personalization_step: steps.value[newStep].label,
        step_data: JSON.stringify({
          step_number: newStep + 1,
          form_data: quizData.value
        })
      })
      
      // Aguarda a renderização do componente
      nextTick(() => {
        // Scroll para o topo da página
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        
        // Scroll para o container do quiz (caso necessário)
        const container = document.querySelector('.pers-steps')
        if (container) {
          container.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          })
        }
      })
    })

    // Inicializa o step baseado na URL ao montar o componente
    onMounted(() => {
      const stepFromUrl = getStepFromUrl()
      if (stepFromUrl !== currentStepIndex.value + 1) {
        currentStepIndex.value = stepFromUrl - 1
      }
      
      // Track initial step view for GA4
      trackEvent({
        event_name: 'view_step',
        personalization_step: steps.value[currentStepIndex.value].label,
        step_data: JSON.stringify({
          step_number: currentStepIndex.value + 1,
          form_data: quizData.value
        })
      })
    })

    function getOptionName(optionId: string): string {
      switch (optionId) {
        case '4k':
          return 'Qualidade 4K';
        case 'foto':
          return 'Foto com o Coelho da Páscoa';
        case 'rapido':
          return 'Entrega Rápida';
        case 'premium':
          return 'Combo Premium';
        default:
          return 'Opção adicional';
      }
    }

    function getOptionPrice(optionId: string): number {
      switch (optionId) {
        case '4k':
          return 10;
        case 'foto':
          return 14;
        case 'rapido':
          return 10;
        case 'premium':
          return 19.90;
        default:
          return 0;
      }
    }

    function formatPrice(price: number): string {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)
    }

    function calculateTotal(): number {
      let total = getBasePrice();
      
      if (quizData.value.options?.includes('premium')) {
        total += 19.90;
      } else {
        quizData.value.options?.forEach(option => {
          if (option !== 'premium') {
            total += getOptionPrice(option);
          }
        });
      }
      
      return total;
    }

    function handleUpdate(data: Partial<QuizData>) {
      // Se a quantidade mudou, ajustar o array de crianças
      if (data.quantity !== undefined && data.quantity !== quizData.value.quantity) {
        const currentChildren = quizData.value.children || []
        const newChildren = [...currentChildren]
        
        // Se a quantidade aumentou, adicionar novas crianças
        while (newChildren.length < data.quantity) {
          newChildren.push({
            name: '',
            age: null,
            photo: null,
            photoPreview: null
          })
        }
        
        // Se a quantidade diminuiu, remover crianças extras
        if (newChildren.length > data.quantity) {
          newChildren.splice(data.quantity)
        }
        
        data.children = newChildren
      }
      
      // Atualizar os dados sem causar recursão
      const updatedData = {
        ...quizData.value,
        ...data
      }
      
      // Atualizar apenas se houver mudanças reais
      if (JSON.stringify(updatedData) !== JSON.stringify(quizData.value)) {
        updateQuizData(updatedData)
      }
    }

    const handleNext = async () => {
      try {
        if (isLastStep.value) {
          // Evitar múltiplos cliques
          if (isSubmitting.value) {
            console.log('Já está processando o envio, ignorando clique adicional')
            return
          }

          // Verificar se todos os dados obrigatórios estão preenchidos
          const errors = []
          
          // Verificar os nomes das crianças
          const emptyChildNames = quizData.value.children.filter(child => !child.name || child.name.trim() === '')
          if (emptyChildNames.length > 0) {
            errors.push(`${emptyChildNames.length} criança(s) sem nome preenchido`)
          }
          
          // Verificar outros campos obrigatórios
          if (!quizData.value.contactName || quizData.value.contactName.trim() === '') {
            errors.push('Nome do responsável não preenchido')
          }
          
          if (!quizData.value.contactEmail || quizData.value.contactEmail.trim() === '') {
            errors.push('E-mail não preenchido')
          }
          
          if (!quizData.value.contactPhone || quizData.value.contactPhone.trim() === '') {
            errors.push('WhatsApp não preenchido')
          }
          
          if (!quizData.value.message || quizData.value.message.trim() === '') {
            errors.push('Mensagem personalizada não preenchida')
          }
          
          // Verificar se o compromisso de dados foi aceito
          if (!quizData.value.dataCommitment) {
            errors.push('É necessário concordar com o compromisso de dados')
          }
          
          // Se houver erros, mostrar alerta e não prosseguir
          if (errors.length > 0) {
            alert(`Por favor, preencha todos os campos obrigatórios:\n- ${errors.join('\n- ')}`)
            return
          }

          // Ativar flag para evitar múltiplos envios
          isSubmitting.value = true
          
          try {
            const totalPrice = calculateTotal()
            
            // Preparar dados para o checkout
            console.log('Preparando dados para o checkout...')
            const checkoutData: CheckoutData = {
              quantity: quizData.value.quantity,
              options: quizData.value.options || [],
              product: 'video_coelho',
              totalPrice
            }

            let checkoutUrl = '';
            try {
              checkoutUrl = CheckoutService.processCheckout(checkoutData)
              console.log('URL de checkout gerada pelo CheckoutService:', checkoutUrl)
            } catch (checkoutFinalError) {
              console.error('Erro final ao gerar URL de checkout:', checkoutFinalError)
              alert('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente ou entre em contato com o suporte.')
              throw checkoutFinalError;
            }

            console.log('Enviando dados da sessão para o backend...')
            const formData = new FormData()
            formData.append('product', 'video_coelho')
            formData.append('quantity', String(quizData.value.quantity))
            formData.append('options', JSON.stringify(quizData.value.options || []))
            formData.append('totalPrice', String(totalPrice))
            formData.append('customerName', quizData.value.contactName || '')
            formData.append('customerEmail', quizData.value.contactEmail || '')
            formData.append('customerPhone', quizData.value.contactPhone || '')
            
            const childrenDataToSave = []
            if (quizData.value.children && Array.isArray(quizData.value.children)) {
              for (const child of quizData.value.children) {
                childrenDataToSave.push({
                  name: child.name,
                  age: child.age,
                  hasPhoto: !!child.photo
                })
                if (child.photo) {
                  const rawPhoto = toRaw(child.photo)
                  console.log('[Checkout] Anexando foto para', child.name, 'Size:', rawPhoto?.size)
                  formData.append('photos', rawPhoto)
                }
              }
            }
            formData.append('childrenData', JSON.stringify(childrenDataToSave))

            const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000/api'
            try {
              const response = await fetch(`${apiUrl}/checkout/session`, {
                method: 'POST',
                body: formData
              })
              if (response.ok) {
                const data = await response.json()
                if (data.sessionId) {
                  localStorage.setItem('rabbit_session_id', data.sessionId)
                  console.log('Sessão registrada com sucesso:', data.sessionId)
                }
              } else {
                console.error('Falha ao registrar sessão no backend:', await response.text())
              }
            } catch (err) {
              console.error('Erro de rede ao registrar sessão (ignorando e prosseguindo checkout):', err)
            }

            console.log('Dados para o checkout preparados com sucesso')

            // Track checkout initiation (convenção GA4 e-commerce)
            console.log('Enviando evento de checkout...')
            trackBeginCheckout({
              value: totalPrice,
              currency: 'BRL',
              items: [{
                item_name: getProductName(),
                quantity: quizData.value.quantity,
                price: getBasePrice(),
                item_category: 'Video Personalizado'
              }]
            })
            console.log('Evento de checkout enviado com sucesso')

            // Redireciona para o checkout
            window.location.href = checkoutUrl
          } catch (processError) {
            console.error('Erro detalhado no processo de checkout:', processError)
            if (processError instanceof Error) {
              console.error('Mensagem do erro:', processError.message)
              console.error('Stack trace:', processError.stack)
            }
            // Exibir mensagem de erro para o usuário
            alert('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente ou entre em contato com o suporte.')
          } finally {
            // Desativar flag após conclusão, independente do resultado
            isSubmitting.value = false
          }
        } else {
          // Avançar para o próximo passo
          const currentStep = currentStepIndex.value + 1
          currentStepIndex.value++
          const nextStep = currentStepIndex.value + 1

          trackEvent({
            event_name: 'personalization_step',
            personalization_step: steps.value[currentStepIndex.value].label,
            from_step: String(currentStep),
            step_data: JSON.stringify({
              step_number: nextStep,
              form_data: quizData.value
            })
          })
        }
      } catch (globalError) {
        console.error('Erro global no handleNext:', globalError)
        if (globalError instanceof Error) {
          console.error('Mensagem do erro global:', globalError.message)
          console.error('Stack trace do erro global:', globalError.stack)
        }
        
        // Mesmo com erro global, tentar usar o CheckoutService para o último passo
        if (isLastStep.value) {
          alert('Ocorreu um erro inesperado, tentando gerar checkout alternativo...')
          try {
            // Criar dados básicos para checkout
            const emergencyCheckoutData: CheckoutData = {
              quantity: quizData.value.quantity || 1,
              options: quizData.value.options || [],
              product: 'video_coelho',
              totalPrice: calculateTotal()
            }
            const checkoutUrl = CheckoutService.processCheckout(emergencyCheckoutData)
            console.log('URL de checkout de emergência gerada:', checkoutUrl)
            window.location.href = checkoutUrl
          } catch (emergencyError) {
            console.error('Erro ao gerar checkout de emergência:', emergencyError)
            alert('Não foi possível completar seu pedido. Por favor, tente novamente mais tarde ou entre em contato com o suporte.')
          }
        } else {
          alert('Ocorreu um erro inesperado. Por favor, tente novamente.')
        }
        
        isSubmitting.value = false
      }
    }

    function handleBack() {
      if (currentStepIndex.value > 0) {
        const currentStep = currentStepIndex.value + 1
        currentStepIndex.value--
        const previousStep = currentStepIndex.value + 1

        trackEvent({
          event_name: 'personalization_step',
          personalization_step: steps.value[currentStepIndex.value].label,
          from_step: String(currentStep),
          step_data: JSON.stringify({
            step_number: previousStep,
            form_data: quizData.value
          })
        })

        // Se voltar para o step de quantidade, limpa as opções
        if (currentStepIndex.value === 0) {
          updateQuizData({
            options: []
          })
        }
      }
    }

    function handleStepChange(step: number) {
      currentStepIndex.value = step
      emit('step-change', step)
    }

    // Computed para verificar se todos os order bumps estão selecionados
    const shouldShowPremiumAdvice = computed(() => {
      const options = quizData.value.options || [];
      // Se tem 2 ou mais opções extras, mas não tem premium
      return options.length >= 2 && !options.includes('premium');
    })

    // Computed para mostrar o price-info apenas após o step de quantidade
    const shouldShowPriceInfo = computed(() => {
      return currentStepIndex.value > 0 && quizData.value.quantity
    })

    function getStepIcon(stepId: number): string {
      const icons: Record<number, string> = {
        1: 'child_care',    // Ícone de criança para quantidade
        2: 'auto_awesome',  // Ícone de estrela para extras
        3: 'person'         // Ícone de pessoa para contato
      }
      return icons[stepId] || 'help'
    }

    function getStepLabel(stepId: number): string {
      const labels: Record<number, string> = {
        1: 'Crianças',
        2: 'Extras',
        3: 'Contato'
      }
      return labels[stepId] || 'Passo'
    }



    // Função para obter o preço base
    const getBasePrice = () => {
      switch (quizData.value.quantity) {
        case 1:
          return 47.90;
        case 2:
          return 57.90;
        case 3:
          return 67.90;
        default:
          return 47.90;
      }
    }

    // Função para obter o nome do produto
    const getProductName = () => {
      switch (quizData.value.quantity) {
        case 1:
          return 'Vídeo para uma criança';
        case 2:
          return 'Vídeo para duas crianças';
        case 3:
          return 'Grupo de amigos (3 crianças)';
        case 4:
          return 'Grupo especial (4+ crianças)';
        default:
          return 'Vídeo personalizado';
      }
    }



    const progressWidth = computed(() => {
      const totalSteps = steps.value.length
      const currentStep = currentStepIndex.value
      return `${(currentStep / (totalSteps - 1)) * 85}%`
    })

    return {
      currentStepIndex,
      steps,
      quizData,
      currentComponent,
      canProceed,
      isLastStep,
      getOptionName,
      getOptionPrice,
      formatPrice,
      calculateTotal,
      handleUpdate,
      handleNext,
      handleBack,
      handleStepChange,
      shouldShowPremiumAdvice,
      shouldShowPriceInfo,
      getStepIcon,
      getStepLabel,
      getBasePrice,
      getProductName,
      hasPhotoOption,
      progressWidth,
      isSubmitting
    }
  }
})
</script>

<style scoped>
.progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;
  margin-top: 30px;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gray-200);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 1;
}

.progress-bar::after {
  content: '';
  position: absolute;
  align-self: center;
  top:35%;
  left: 10%;
  width: var(--progress-width);
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 2;
  transition: width 0.3s ease;
}

.progress-step {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.progress-step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--white);
  border: 3px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
}

.progress-step-number .material-icons {
  font-size: 20px;
  color: var(--gray-400);
  transition: all 0.3s ease;
}

.progress-step.active .progress-step-number {
  background: var(--gradient-primary);
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 162, 255, 0.2);
}

.progress-step.active .progress-step-number .material-icons {
  color: var(--white);
}

.progress-step.completed .progress-step-number {
  background: var(--gradient-primary);
  border-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 162, 255, 0.2);
}

.progress-step.completed .progress-step-number .material-icons {
  color: var(--white);
}

.progress-step-label {
  font-size: 14px;
  color: var(--gray-400);
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 100px;
}

.progress-step.active .progress-step-label {
  color: var(--primary-color);
  font-weight: 600;
  transform: translateY(2px);
}

.progress-step.completed .progress-step-label {
  color: var(--primary-color);
  font-weight: 600;
  transform: translateY(2px);
}

@media (max-width: 768px) {
  .progress-bar {
    margin-bottom: 32px;
    padding: 0 10px;
  }

  .progress-step-number {
    width: 36px;
    height: 36px;
  }

  .progress-step-number .material-icons {
    font-size: 18px;
  }

  .progress-step-label {
    font-size: 12px;
    max-width: 80px;
  }
}

.price-item-3 {
  font-size: 12px;
  color: #dc3545;
  font-weight: 600;
  margin-top: 8px;
  text-align: center;
  padding: 8px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 8px;
}

@media (max-width: 390px) {
  .progress-container {
    width: 100%;
  }
  .progress-steps {
    margin: 0 auto;
  }
}

/* Navigation */
.nav-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 32px auto 0;
  padding: 0;
  width: 100%;
  max-width: 480px;
}

.btn {
  flex: 1;
  min-width: 120px;
  max-width: 200px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-back:hover {
  background: var(--gray-100) !important;
}

.btn-next {
  background: var(--primary-color);
  color: var(--white);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
}

.btn-next:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 89, 255, 0.1);
}

.btn-next .material-icons {
  transition: transform 0.3s ease;
}

.btn-next:hover .material-icons {
  transform: translateX(4px);
}

.btn-next:active .material-icons {
  transform: translateX(2px);
}

/* Removendo estilos desnecessários */
.btn-next:disabled {
  opacity: 1;
  cursor: pointer;
  background: var(--primary-color);
  color: var(--white);
}

.btn .material-icons {
  font-size: 20px;
  color: currentColor;
}

@media (max-width: 480px) {
  .nav-buttons {
    padding: 0 8px;
    gap: 12px;
  }
  
  .btn {
    min-width: 100px;
    height: 44px;
    font-size: 14px;
  }
}

.validation-errors {
  margin: 24px auto;
  padding: 20px;
  background: rgba(220, 53, 69, 0.1);
  border: 2px solid #dc3545;
  border-radius: 12px;
  max-width: 480px;
  animation: errorShake 0.5s ease-in-out;
  position: relative;
  z-index: 1000;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  background: rgba(220, 53, 69, 0.05);
  padding: 12px;
  border-radius: 8px;
}

.error-header .material-icons {
  color: #dc3545;
  font-size: 24px;
}

.error-header h3 {
  color: #dc3545;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-list li {
  color: #dc3545;
  font-size: 14px;
  padding: 8px 12px;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 6px;
  position: relative;
  padding-left: 32px;
}

.error-list li::before {
  content: '•';
  position: absolute;
  left: 16px;
  color: #dc3545;
  font-weight: bold;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-icon {
  animation: spin 1.5s linear infinite;
}
</style> 