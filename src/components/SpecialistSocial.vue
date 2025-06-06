<template>
  <section class="specialist-social">
    <div class="specialist-social__container">
      <h2 class="title-custom">O que os especialistas falam sobre o vídeo do Stitch</h2>
      
      <div class="specialist-card">
        <div class="specialist-header">
          <img src="@/assets/imgs/specialist.webp" alt="Especialista" class="specialist-photo" />
          <div class="specialist-info">
            <h3>Dra. Maria Silva</h3>
            <p>Psicóloga Infantil</p>
          </div>
        </div>

        <div class="specialist-content">
          <p>"O vídeo personalizado do Stitch é uma ferramenta incrível para criar momentos mágicos e memoráveis para as crianças. A personalização com o nome da criança e mensagens especiais fortalece o vínculo emocional e torna a experiência ainda mais especial e significativa."</p>
          
          <button 
            class="btn btn-outline"
            @click="showPopup = true"
          >
            Saiba Mais
            <span class="material-icons">info</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Popup -->
    <div 
      v-if="showPopup" 
      class="popup-overlay"
      @click="showPopup = false"
    >
      <div 
        class="popup-content"
        @click.stop
      >
        <button 
          class="close-btn"
          @click="showPopup = false"
        >
          <span class="material-icons">close</span>
        </button>

        <h3>Por que as crianças amam receber vídeos do Stitch?</h3>
        
        <div class="reasons">
          <div class="reason">
            <span class="material-icons">psychology</span>
            <h4>Magia</h4>
            <p>O vídeo personalizado torna a experiência mais mágica e memorável</p>
          </div>

          <div class="reason">
            <span class="material-icons">chat</span>
            <h4>Personalização Especial</h4>
            <p>O Stitch fala diretamente com a criança, usando seu nome e mensagens personalizadas</p>
          </div>

          <div class="reason">
            <span class="material-icons">favorite</span>
            <h4>Momento de Alegria</h4>
            <p>A criança se sente especial ao receber uma mensagem única do Stitch</p>
          </div>

          <div class="reason">
            <span class="material-icons">security</span>
            <h4>Conteúdo Seguro</h4>
            <p>O vídeo é produzido com carinho e cuidado, adequado para todas as idades</p>
          </div>
        </div>

        <button 
          @click="goToPersonalization"
          class="btn btn-cta"
        >
          Criar vídeo do Stitch agora
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'SpecialistSocial',
  setup() {
    const router = useRouter()

    const goToPersonalization = () => {
      // Track the event
      trackComponentEvent.specialistSocial.createVideo()

      router.push({ 
        name: 'personalizar-quantidade',
        replace: true
      })
    }

    return {
      goToPersonalization
    }
  },
  data() {
    return {
      showPopup: false
    }
  },
  methods: {
    showPopupHandler() {
      trackComponentEvent.specialistSocial.learnMore()
      this.showPopup = true
    }
  }
}
</script>

<style scoped>
.specialist-social {
  padding: 40px 16px;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%); /* Amarelo médio */
}

.specialist-social__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}

.specialist-card {
  background: #FFF8E1; /* Amarelo mais claro */
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-top: 24px;
  text-align: left;
}

.specialist-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.specialist-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.specialist-info h3 {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 4px;
  font-family: 'Product Sans', sans-serif;
}

.specialist-info p {
  font-size: 14px;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
  font-family: 'Product Sans', sans-serif;
}

.specialist-content p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0 0 16px;
  font-family: 'Product Sans', sans-serif;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.popup-content {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 600px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-color);
}

.popup-content h3 {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 24px;
  text-align: center;
}

.reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.reason {
  text-align: center;
  padding: 24px;
  background: var(--gray-50);
  border-radius: var(--radius-lg);
}

.reason .material-icons {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.reason h4 {
  font-size: 18px;
  color: var(--text-color);
  margin-bottom: 8px;
}

.reason p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .popup-content {
    padding: 24px 16px;
  }

  .reasons {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .reason {
    padding: 16px;
  }
}
</style> 