<template>
  <section :id="id" class="why-sell">
    <div class="why-sell__container">
      <h2 class="title-custom">Videos mágicos para crianças</h2>
      
      <div class="features">
        <div class="feature">
          <span class="material-icons">new_releases</span>
          <h3>Vídeo novo e exclusivo para 2025</h3>
        </div>

        <div class="feature">
          <span class="material-icons">timer</span>
          <h3>Personalização rápida – apenas 5 minutos</h3>
        </div>

        <div class="feature">
          <span class="material-icons">auto_awesome</span>
          <h3>Personalize com nome e mensagem especial</h3>
        </div>

        <div class="feature">
          <span class="material-icons">mail</span>
          <h3>Receba o vídeo por email em até 24 horas</h3>
        </div>
      </div>

      <button 
        @click="goToPersonalization"
        class="btn btn-cta"
      >
        Criar vídeo
      </button>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'WhySell',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter()

    const goToPersonalization = async () => {
      // Track the event
      trackComponentEvent.whySell.createVideo()

      // Primeiro faz o scroll para o topo
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })

      // Aguarda um pequeno delay para garantir que o scroll foi completado
      await new Promise(resolve => setTimeout(resolve, 100))

      // Depois navega para a página
      router.push({ 
        name: 'personalizar-quantidade',
        replace: true
      })
    }

    return {
      goToPersonalization
    }
  }
}
</script>

<style scoped>
.why-sell {
  padding: 40px 16px;
  background: var(--white);
}

.why-sell__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 32px 0;
}

.feature {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  padding: 16px;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.feature .material-icons {
  font-size: 24px;
  color: var(--accent-blue);
  flex-shrink: 0;
}

.feature h3 {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
  line-height: 1.4;
  margin: 0;
}

.btn-cta {
  font-size: 16px !important;
  padding: 12px 24px !important;
  width: 180px !important;
}
</style> 