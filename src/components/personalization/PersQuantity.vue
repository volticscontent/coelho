<template>
  <div class="pers-quantity">
    <h2 class="title">Quantas crianças vão receber o vídeo?</h2>
    <div class="live-counter">
      <span class="counter">{{ currentCount }}</span> mães estão comprando agora
    </div>
    <div class="quantity-options">
      <div
        v-for="option in quantities"
        :key="option.value"
        class="quantity-option"
        @click="$emit('select', option.value)"
      >
        <div class="option-icon">
          <i :class="option.icon"></i>
        </div>
        <div class="option-content">
          <h3 class="option-title">{{ option.title }}</h3>
          <p class="option-description">{{ option.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'PersQuantity',
  emits: ['select'],
  setup() {
    const quantities = ref([
      {
        value: 1,
        title: 'Para 1 Criança',
        description: 'Vídeo personalizado para uma criança',
        price: 0,
        icon: 'mdi-account-child'
      },
      {
        value: 2,
        title: 'Para 2 Crianças',
        description: 'Vídeo personalizado para duas crianças',
        price: 0,
        icon: 'mdi-account-group'
      },
      {
        value: 3,
        title: 'Para 3+ Crianças',
        description: 'Vídeo personalizado para três ou mais crianças',
        price: 0,
        icon: 'mdi-account-group'
      }
    ])

    // Counter logic
    const currentCount = ref(Math.floor(Math.random() * 200) + 800) // Start between 800-1000
    let counterInterval

    const updateCounter = () => {
      if (currentCount.value >= 1000) {
        currentCount.value = Math.floor(Math.random() * 200) + 800 // Reset between 800-1000
      } else {
        currentCount.value += Math.floor(Math.random() * 3) + 1 // Increment by 1-3
      }
    }

    onMounted(() => {
      counterInterval = setInterval(updateCounter, 2000) // Update every 2 seconds
    })

    onUnmounted(() => {
      clearInterval(counterInterval)
    })

    return {
      quantities,
      currentCount
    }
  }
}
</script>

<style scoped>
.pers-quantity {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
  font-size: 24px;
}

.live-counter {
  text-align: center;
  margin-bottom: 24px;
  font-family: 'Product Sans', sans-serif;
  color: var(--accent-blue);
  font-size: 16px;
  opacity: 0.9;
}

.counter {
  color: var(--accent-blue);
  font-weight: 600;
}

.quantity-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.quantity-option {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quantity-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.option-icon {
  width: 48px;
  height: 48px;
  background: white
  ;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.option-content {
  flex: 1;
}

.option-title {
  font-family: 'Product Sans', sans-serif;
  font-size: 18px;
  color: var(--text-color);
  margin: 0 0 4px 0;
}

.option-description {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 768px) {
  .quantity-options {
    grid-template-columns: 1fr;
    padding: 0 10px;
  }

  .title {
    font-size: 20px;
  }

  .live-counter {
    font-size: 14px;
  }
}
</style> 