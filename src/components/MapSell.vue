<template>
  <section class="map-sell">
    <div class="map-sell__container">
      <h2 class="title-custom">Como funciona</h2>
      
      <div class="steps">
        <div class="step">
          <div class="step__icon-wrapper">
            <div class="step__number">1</div>
            <div class="step__line"></div>
          </div>
          <div class="step__content">
            <h3 class="step__title">Escolha o vídeo</h3>
            <p class="step__text">Selecione o vídeo do Coelho da Páscoa e clique em "Criar vídeo"</p>
            <div class="step__features">
              <span class="feature-tag">Vídeo 2025</span>
              <span class="feature-tag">Personalização rápida</span>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step__icon-wrapper">
            <div class="step__number">2</div>
            <div class="step__line"></div>
          </div>
          <div class="step__content">
            <h3 class="step__title">Personalize</h3>
            <p class="step__text">Adicione o nome da criança e uma mensagem especial</p>
            <div class="step__features">
              <span class="feature-tag">Nome personalizado</span>
              <span class="feature-tag">Mensagem especial</span>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step__icon-wrapper">
            <div class="step__number">3</div>
            <div class="step__line"></div>
          </div>
          <div class="step__content">
            <h3 class="step__title">Receba</h3>
            <p class="step__text">O vídeo personalizado será enviado por email em até 24 horas</p>
            <div class="step__features">
              <span class="feature-tag">Entrega rápida</span>
              <span class="feature-tag">Email seguro</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <button 
          @click="goToPersonalization"
          class="btn btn-cta"
        >
          Criar vídeo agora
        </button>
        <p class="cta-text">Traga a magia para quem você ama!</p>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'MapSell',
  setup() {
    const router = useRouter()

    const goToPersonalization = async () => {
      // Track the event
      trackComponentEvent.mapSell.createVideo()

      // Primeiro faz o scroll para o topo
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Usamos 'instant' para ser imediato
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
.map-sell {
  padding: 60px 16px;
  background: linear-gradient(180deg, #ffffff 0%, #9febf8 100%);
  position: relative;
  overflow: hidden;
}

.map-sell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/imgs/thumb-up-bg.webp') repeat;
  opacity: 0.1;
  pointer-events: none;
}

.map-sell__container {
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}

.title-custom {
  margin-bottom: 40px;
  text-align: center;
  font-size: 32px;
  color: var(--text-color);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 8px;
}

.step {
  display: flex;
  gap: 24px;
  position: relative;
}

.step__icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step__number {
  width: 48px;
  height: 48px;
  background: var(--accent-blue);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Product Sans', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
  position: relative;
  z-index: 1;
}

.step__line {
  width: 2px;
  flex: 1;
  background: var(--accent-blue);
  margin: 8px 0;
  opacity: 0.3;
}

.step__content {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.step__title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
}

.step__highlight {
  color: var(--accent-blue);
}

.step__text {
  font-size: 16px;
  color: var(--text-color);
  opacity: 0.9;
  font-family: 'Product Sans', sans-serif;
  line-height: 1.6;
  margin-bottom: 16px;
}

.step__features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: rgba(0, 89, 255, 0.01);
  color: var(--accent-blue);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Product Sans', sans-serif;
}

.cta-section {
  margin-top: 48px;
  text-align: center;
}

.cta-text {
  margin-top: 16px;
  font-family: 'Product Sans', sans-serif;
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.9;
}

@media (max-width: 480px) {
  .map-sell {
    padding: 40px 16px;
  }

  .title-custom {
    font-size: 28px;
    margin-bottom: 32px;
  }

  .steps {
    gap: 32px;
  }

  .step {
    gap: 16px;
  }

  .step__number {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .step__content {
    padding: 20px;
  }

  .step__title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .step__text {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .feature-tag {
    font-size: 14px;
    padding: 3px 10px;
  }

  .cta-section {
    margin-top: 32px;
  }

  .cta-text {
    font-size: 1.5rem;
  }
}
</style> 