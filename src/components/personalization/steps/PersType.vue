<template>
  <div class="type-section">
    <h2 class="step-title">Personalize seu vídeo</h2>
    <p class="step-description">Escolha melhorias para seu vídeo
      <span class="premium">Adicione 2 melhorias e ganhe acesso ao combo premium com desconto✨️</span></p>
  
    <div class="type-grid">
      <div 
        v-for="option in typeOptions"
        :key="option.id"
        class="type-card"
        :class="{ selected: selectedTypes.includes(option.id) }"
        @click="handleSelection(option.id)"
      >
        <div class="type-icon">
          <span class="material-icons">{{ option.icon }}</span>
        </div>
        <h4 class="type-title">{{ option.title }}</h4>
        <p class="type-description">{{ option.description }}</p>
        <div class="type-price">
          {{ formatPrice(option.price) }}
          <small>/opcional</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { QuizData } from '@/types/quiz'


export default defineComponent({
  name: 'PersType',
  props: {
    quizData: {
      type: Object as () => QuizData,
      required: true
    },
    canProceed: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update', 'next'],
  setup(props, { emit }) {
    const selectedTypes = ref<string[]>(props.quizData.options || [])

    // Watch para sincronizar com mudanças externas
    watch(() => props.quizData.options, (newOptions) => {
      selectedTypes.value = newOptions || []
    }, { immediate: true })

    const typeOptions = [
      {
        id: '4k',
        title: 'Qualidade 4K',
        description: 'Imagem cristalina para assistir quantas vezes quiser, sem perder definição!',
        price: 10,
        icon: '4k'
      },
      {
        id: 'foto',
        title: 'Adicionar foto',
        description: 'Com a foto da criança no vídeo, ela entra na história e a magia fica completa!',
        price: 14,
        icon: 'photo_camera'
      },
      {
        id: 'rapido',
        title: 'Entrega Rápida',
        description: 'Entrega normal: 3 a 5 dias úteis. Com a entrega rápida, receba em apenas 24h úteis!',
        price: 10,
        icon: 'rocket_launch'
      },
      {
        id: 'premium',
        title: 'Combo Premium',
        description: 'Com o Pacote Premium por R$ 20, você leva todos os adicionais e um sai de graça!',
        price: 19.90,
        icon: 'stars'
      }
    ]

    const handleSelection = (typeId: string) => {
      // Se selecionar premium, desmarca todas as outras opções
      if (typeId === 'premium') {
        selectedTypes.value = ['premium']
      } else {
        // Remove premium se estiver selecionado
        selectedTypes.value = selectedTypes.value.filter(t => t !== 'premium')
        
        // Adiciona ou remove a opção selecionada
        const index = selectedTypes.value.indexOf(typeId)
        if (index === -1) {
          selectedTypes.value.push(typeId)
        } else {
          selectedTypes.value.splice(index, 1)
        }
      }

      // Emite o evento com as opções atualizadas
      emit('update', { options: selectedTypes.value })
    }

    const calculatePrice = (): number => {
      if (selectedTypes.value.includes('premium')) {
        return 19.90
      }
      return selectedTypes.value.reduce((total, type) => {
        switch (type) {
          case '4k':
            return total + 10
          case 'foto':
            return total + 14
          case 'rapido':
            return total + 10
          default:
            return total
        }
      }, 0)
    }

    function formatPrice(price: number): string {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)
    }

    return {
      selectedTypes,
      typeOptions,
      handleSelection,
      calculatePrice,
      formatPrice
    }
  }
})
</script>

<style scoped>
.type-section {
  text-align: center;
  padding: 16px 0;
  margin-inline: 22px;
}

.step-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.step-description {
  font-size: 16px;
  color: var(--gray-500);
  margin-bottom: 32px;
}

.premium {
  font-weight: 150;
  color:var(--primary-color);
}


.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.type-card {
  background: var(--white);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  border: 2px solid var(--gray-100);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.type-card.selected {
  border-color: var(--primary-color);
  background: rgba(0, 89, 255, 0.05);
}

.type-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 12px;
  color: var(--primary-color);
}

.type-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.type-description {
  font-size: 14px;
  color: var(--gray-500);
  margin: 0;
  line-height: 1.4;
}

.type-price {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Product Sans', sans-serif;
  padding: 8px 0;
  width: 100%;
}

.type-price small {
  font-size: 14px;
  opacity: 0.7;
}

@media (max-width: 480px) {
  .type-grid {
    grid-template-columns: 1fr;
  }
  
  .type-card {
    padding: 16px;
  }
  
  .type-icon {
    width: 40px;
    height: 40px;
  }
  
  .type-title {
    font-size: 15px;
  }
  
  .type-description {
    font-size: 13px;
  }
  
  .type-price {
    font-size: 18px;
  }
}
</style> 