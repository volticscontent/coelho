<template>
  <section class="why-upsell">
    <div class="why-upsell__container">
      <h2 class="title-custom">Adicione mais amor ao vídeo!</h2>
      <div class="cards">
        <div class="card">
          <div class="card-icon">
            <span class="material-icons">diversity_3</span>
          </div>
          <div class="card-content">
            <h3>Vídeo para mais de uma criança</h3>
            <p>Surpreenda irmãos ou amigos com uma mensagem especial do Coelho da Páscoa</p>
            <button class="btn-info" @click="handleClick('kids')">
              Ver opções
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <span class="material-icons">photo_camera</span>
          </div>
          <div class="card-content">
            <h3>Deixe o vídeo ainda mais mágico!</h3>
            <p>Adicione fotos das crianças e veja seus olhinhos brilharem</p>
            <button class="btn-info" @click="handleClick('photos')">
              Saiba mais
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <span class="material-icons">auto_awesome</span>
          </div>
          <div class="card-content">
            <h3>Qualidade Cinematográfica</h3>
            <p>Vídeo em alta qualidade com efeitos especiais mágicos</p>
            <button class="btn-info" @click="handleClick('quality')">
              Ver detalhes
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <span class="material-icons">rocket_launch</span>
          </div>
          <div class="card-content">
            <h3>Não perca tempo!</h3>
            <p>Receba em até 2h e surpreenda ainda hoje</p>
            <button class="btn-info" @click="handleClick('delivery')">
              Como funciona
              <span class="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="activePopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <button class="close-btn" @click="closePopup">
          <span class="material-icons">close</span>
        </button>
        
        <div v-if="activePopup === 'kids'" class="popup-kids">
          <h3>Vídeos para toda a família!</h3>
          <p>Escolha o pacote ideal para compartilhar a magia:</p>
          <div class="price-options">
            <div class="price-option">
              <div class="price-info">
                <span>1 criança</span>
                <p class="price-detail">Vídeo personalizado para uma criança especial</p>
              </div>
              <strong>R$ 39,99</strong>
            </div>
            <div class="price-option recommended">
              <div class="price-info">
                <span>2 crianças</span>
                <p class="price-detail">Surpreenda irmãos ou amigos com vídeos personalizados</p>
              </div>
              <strong>R$ 49,99</strong>
            </div>
            <div class="price-option">
              <div class="price-info">
                <span>3 crianças</span>
                <p class="price-detail">Compartilhe a magia com mais crianças</p>
              </div>
              <strong>R$ 59,99</strong>
            </div>
          </div>
          <button class="btn btn-cta btn-popup" @click="goToPersonalization">Personalizar Vídeo Agora</button>
        </div>

        <div v-if="activePopup === 'photos'" class="popup-photos">
          <h3>Torne o vídeo ainda mais especial!</h3>
          <p>Imagine a reação das crianças ao verem suas fotos no vídeo do Coelho da Páscoa</p>
          
          <div class="photo-feature">
            <span class="material-icons feature-icon">add_photo_alternate</span>
            <div class="feature-content">
              <p>Adicione até 3 fotos por apenas</p>
              <strong class="price">R$ 10,00</strong>
              <p class="bonus">+ Efeitos especiais exclusivos</p>
            </div>
          </div>
          <button class="btn btn-cta btn-popup" @click="goToPersonalization">Deixar o Vídeo Mágico</button>
        </div>

        <div v-if="activePopup === 'delivery'" class="popup-delivery">
          <h3>Entrega Super Rápida</h3>
          <div class="delivery-info">
            <span class="material-icons">timer</span>
            <p>Receba seu vídeo em <strong>até 24 horas</strong></p>
          </div>
          <div class="delivery-steps">
            <div class="step">
              <span class="step-number">1</span>
              <p>Faça seu pedido agora</p>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <p>Produção prioritária</p>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <p>Entrega em até 2h</p>
            </div>
          </div>
          <div class="instant-badge">
            <span class="material-icons">rocket_launch</span>
            <p>Surpreenda ainda hoje!</p>
          </div>
          <button class="btn btn-cta btn-popup" @click="goToPersonalization">Garantir Entrega Rápida</button>
        </div>

        <div v-if="activePopup === 'quality'" class="popup-quality">
          <h3>Qualidade Cinematográfica</h3>
          <p class="quality-intro">Oferecemos a melhor experiência:</p>
          <div class="quality-features">
            <div class="quality-item">
              <span class="material-icons">verified</span>
              <div>
                <h4>Vídeo HD</h4>
                <p>Imagem e áudio em alta qualidade</p>
              </div>
            </div>
            <div class="quality-item">
              <span class="material-icons">settings_suggest</span>
              <div>
                <h4>Personalização Completa</h4>
                <p>Nome e mensagem personalizados no vídeo</p>
              </div>
            </div>
            <div class="quality-item">
              <span class="material-icons">speed</span>
              <div>
                <h4>Efeitos Especiais</h4>
                <p>Animações e efeitos mágicos especiais</p>
              </div>
            </div>
          </div>
          <div class="quality-guarantee">
            <span class="material-icons">thumb_up</span>
            <p>Satisfação garantida ou seu dinheiro de volta</p>
          </div>
          <button class="btn btn-cta btn-popup" @click="goToPersonalization">Quero Qualidade de Cinema</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { trackComponentEvent } from '@/utils/analytics'

import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'WhyUpsell',
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      activePopup: null as string | null
    }
  },
  methods: {
    handleClick(type: string) {
      // Primeiro dispara o evento apropriado
      switch (type) {
        case 'kids':
          trackComponentEvent.whyUpsell.multipleKids()
          break
        case 'photos':
          trackComponentEvent.whyUpsell.magicVideo()
          break
        case 'quality':
          trackComponentEvent.whyUpsell.cinematicQuality()
          break
        case 'delivery':
          trackComponentEvent.whyUpsell.fastDelivery()
          break
      }
      
      // Depois mostra o popup
      this.showPopup(type)
    },
    showPopup(type: string) {
      this.activePopup = type
    },
    closePopup() {
      this.activePopup = null
    },
    goToPersonalization() {
      window.scrollTo({ top: 0, behavior: 'auto' })
      this.closePopup()
      this.router.push({ name: 'personalizar-quantidade' })
    }
  }
})
</script>

<style scoped>
.why-upsell {
  padding: 40px 16px;
  background: var(--white);
}

.why-upsell__container {
  max-width: 720px;
  margin: 0 auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1023px) and (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

.card {
  padding: 24px;
  background: var(--white);
  border: 2px solid var(--accent-blue);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  transition: all 0.3s ease;
  height: 100%;
}

.card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.1);
}

.card-icon {
  width: 64px;
  height: 64px;
  background: rgba(0, 89, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.card .material-icons {
  font-size: 32px;
  color: var(--primary-color);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.card-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.card-content p {
  font-size: 15px;
  color: var(--gray-600);
  margin: 0;
  line-height: 1.5;
}

.btn-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  background: none;
  color: var(--primary-color);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.btn-info:hover {
  transform: translateX(4px);
}

.btn-info .material-icons {
  font-size: 18px;
  background: none;
  padding: 0;
}

/* Novos estilos para os popups */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.popup-content {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--white);
  padding: 32px 24px;
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-height: 85vh;
  overflow-y: auto;
}

.popup-content::-webkit-scrollbar {
  width: 6px;
}
.popup-content::-webkit-scrollbar-track {
  background: transparent;
}
.popup-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f1f3f5;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 2;
}

.close-btn:hover {
  background: #e9ecef;
}

.close-btn .material-icons {
  font-size: 20px;
  color: var(--text-color);
}

.popup-content h3 {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
  margin-top: 8px;
  font-family: 'Product Sans', sans-serif;
  text-align: center;
}

.popup-content p {
  font-size: 15px;
  color: var(--gray-600);
  margin-bottom: 24px;
  line-height: 1.5;
  font-family: 'Product Sans', sans-serif;
  text-align: center;
}

.price-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-option {
  position: relative;
  padding: 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
}

.price-option.recommended {
  background: rgba(0, 89, 255, 0.05);
  border: 2px solid var(--accent-blue);
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.price-info span {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.price-detail {
  font-size: 13px !important;
  color: #666 !important;
  margin-bottom: 0 !important;
  text-align: left !important;
}

.price-option strong {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background: var(--white);
  border-radius: 8px;
  color: var(--accent-blue);
  font-size: 15px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  white-space: nowrap;
}

.photo-feature {
  background: rgba(0, 89, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  font-size: 40px !important;
  color: var(--primary-color);
  margin-bottom: 12px;
}

.feature-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-content p {
  margin: 0 !important;
}

.feature-content .price {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin: 8px 0;
}

.feature-content .bonus {
  color: #00b67a;
  font-weight: 500;
  font-size: 14px;
}

.delivery-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
}

.step p {
  margin: 0 !important;
  text-align: left !important;
  font-size: 14px !important;
  color: var(--text-color) !important;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
}

.delivery-info, .quality-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 12px;
}

.delivery-info p {
  margin: 0 !important;
  text-align: left !important;
  font-size: 15px !important;
}

.delivery-info .material-icons {
  font-size: 28px;
  color: #ff9500;
}

.quality-intro {
  margin-bottom: 16px !important;
}

.quality-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quality-item {
  text-align: left;
  margin-bottom: 0;
}

.quality-item .material-icons {
  font-size: 28px;
  color: var(--primary-color);
}

.quality-item h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: var(--accent-blue);
}

.quality-item p {
  margin: 0 !important;
  font-size: 13px !important;
  text-align: left !important;
  color: #666 !important;
}

.quality-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px;
  background: rgba(0, 89, 255, 0.05);
  border-radius: 8px;
}

.quality-guarantee p {
  margin: 0 !important;
  font-size: 14px !important;
  color: var(--text-color) !important;
}

.quality-guarantee .material-icons {
  color: var(--accent-blue);
  font-size: 20px;
}

.btn-popup {
  width: 100%;
  margin-top: 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Product Sans', sans-serif;
  display: block;
}

.btn-popup:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
}

.instant-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  padding: 14px;
  background: #5ed371;
  color: white;
  border-radius: 12px;
  font-weight: bold;
}

.instant-badge p {
  margin: 0 !important;
  color: white !important;
  font-weight: 600;
  font-size: 16px !important;
}

.instant-badge .material-icons {
  color: white;
}

@media (max-width: 480px) {
  .popup-content {
    padding: 24px 20px;
  }
  
  .popup-content h3 {
    font-size: 18px;
  }
  
  .popup-content p {
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .price-option {
    padding: 12px;
    gap: 8px;
  }
  
  .price-info span {
    font-size: 14px;
  }
  
  .price-detail {
    font-size: 12px !important;
  }
  
  .price-option strong {
    font-size: 14px;
    padding: 4px 8px;
  }
  
  .feature-icon {
    font-size: 32px !important;
  }
  
  .feature-content .price {
    font-size: 24px;
  }
  
  .delivery-info, .quality-item, .step {
    padding: 12px;
    gap: 12px;
  }
}

.btn-popup {
  width: 100%;
  margin-top: 24px;
  padding: 14px 24px;
  font-size: 16px;
  border-radius: 12px;
}
</style>
