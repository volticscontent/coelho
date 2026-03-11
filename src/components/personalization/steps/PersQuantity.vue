<template>
  <div class="step-content">
    <h3 class="step-title">Quantas crianças participarão do vídeo?</h3>
    <p class="step-description">Selecione a quantidade de crianças que participarão do vídeo</p>
    
    <div class="live-counter">
      <div class="counter-icon">
        <span class="material-icons pulse">group</span>
      </div>
      <div class="counter-text">
        <span class="counter">{{ currentCount }}</span> mães já personalizaram
        <span class="highlight">hoje</span>
      </div>
    </div>

    <div class="quantity-options">
      <div 
        v-for="option in quantityOptions" 
        :key="option.value"
        class="quantity-card"
        :class="{ selected: selectedQuantity === option.value }"
        @click="handleSelection(option.value)"
      >
        <span class="material-icons">{{ option.icon }}</span>
        <h4>{{ option.title }}</h4>
        <p class="description">{{ option.description }}</p>
        <div class="price-container">
           <div class="drop-price">
            -20%
          </div>
          <div class="price">
            {{ formatPrice(calculatePrice(option.value)) }}
            <small>/video</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import type { QuizData } from '@/types/quiz'

export default defineComponent({
  name: 'PersQuantity',
  props: {
    quizData: {
      type: Object as () => QuizData,
      required: true
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const selectedQuantity = ref<number | null>(props.quizData.quantity || null)

    // Counter logic with improved randomness
    const baseCount = 842 // Base number for today
    const currentCount = ref(baseCount + Math.floor(Math.random() * 30))
    let counterInterval: number | undefined
    let lastUpdate = Date.now()
    
    const getRandomIncrement = () => {
      // 70% chance of +1, 20% chance of +2, 10% chance of +3
      const rand = Math.random()
      if (rand < 0.7) return 1
      if (rand < 0.9) return 2
      return 3
    }

    const getUpdateDelay = () => {
      // Random delay between 1.5 and 4 seconds
      return Math.floor(Math.random() * 2500) + 1500
    }

    const scheduleNextUpdate = () => {
      const now = Date.now()
      // Ensure minimum 1.5s between updates
      const minDelay = Math.max(0, 1500 - (now - lastUpdate))
      const delay = minDelay + getUpdateDelay()
      
      counterInterval = window.setTimeout(() => {
        if (currentCount.value >= baseCount + 158) {
          // Reset to a number between base and base+30
          currentCount.value = baseCount + Math.floor(Math.random() * 30)
        } else {
          currentCount.value += getRandomIncrement()
        }
        lastUpdate = Date.now()
        scheduleNextUpdate()
      }, delay)
    }

    onMounted(() => {
      scheduleNextUpdate()
    })

    onUnmounted(() => {
      if (counterInterval) {
        clearTimeout(counterInterval)
      }
    })

    const quantityOptions = [
      {
        value: 1,
        icon: 'child_care',
        title: '1 Criança',
        description: 'Vídeo personalizado para uma criança',
        price: 37.90
      },
      {
        value: 2,
        icon: 'family_restroom',
        title: '2 Crianças',
        description: 'Vídeo para duas crianças',
        price: 47.90
      },
      {
        value: 3,
        icon: 'groups',
        title: '3 Crianças',
        description: 'Vídeo para três crianças',
        price: 57.90
      }
    ]

    const handleSelection = (quantity: number) => {
      // Se clicar na mesma quantidade, desmarca
      if (selectedQuantity.value === quantity) {
        selectedQuantity.value = null
      } else {
        // Senão, seleciona a nova quantidade
        selectedQuantity.value = quantity
      }

      // Emite o evento com a quantidade atualizada
      emit('update', { quantity: selectedQuantity.value || 1 })
    }

    const calculatePrice = (quantity: number): number => {
      switch (quantity) {
        case 1:
          return 37.90;
        case 2:
          return 47.90;
        case 3:
          return 57.90;
        default:
          return 37.90;
      }
    }

    const formatPrice = (price: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)
    }

    return {
      selectedQuantity,
      quantityOptions,
      handleSelection,
      calculatePrice,
      formatPrice,
      currentCount
    }
  }
})
</script>

<style scoped>
.step-content {
  text-align: center;
  margin-inline: 12px;
}

.step-title {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.step-description {
  font-size: 16px;
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 12px;
}

.live-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto 32px;
  padding: 12px 24px;
  background: linear-gradient(to right, rgba(var(--primary-rgb), 0.05), rgba(var(--primary-rgb), 0.02));
  border-radius: 100px;
  max-width: fit-content;
  border: 1px solid rgba(var(--secondary-color), 0.1);
}

.counter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--secondary-color);
  border-radius: 50%;
  color: white;
}

.counter-icon .material-icons {
  color: white;
  font-size: 22px;
}

.counter-text {
  font-family: 'Product Sans', sans-serif;
  color: var(--text-color);
  font-size: 15px;
}

.counter {
  color: var(--secondary-color);
  font-weight: 700;
  font-size: 16px;
  margin-right: 4px;
}

.highlight {
  color: var(--primary-color);
  font-weight: 500;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

.quantity-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 0 auto;
  max-width: 960px;
}

.quantity-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 2px solid var(--gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-height: 280px;
}

.quantity-card.selected {
  border-color: var(--primary-color);
  background: rgba(0, 89, 255, 0.05);
  box-shadow: var(--shadow-primary);
}

.quantity-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
}

.quantity-card:hover:not(.selected) {
  background: var(--white);
}

@media (max-width: 768px) {
  .step-title {
    font-size: 20px;
  }

  .step-description {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .live-counter {
    padding: 8px 16px;
    margin-bottom: 24px;
  }

  .counter-icon {
    width: 28px;
    height: 28px;
  }

  .counter-icon .material-icons {
    font-size: 16px;
  }

  .counter-text {
    font-size: 14px;
  }

  .counter {
    font-size: 15px;
  }
}
</style> 