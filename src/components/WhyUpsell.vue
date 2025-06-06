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
            <p>Surpreenda irmãos ou amigos com uma mensagem especial do Stitch</p>
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
        </div>

        <div v-if="activePopup === 'photos'" class="popup-photos">
          <h3>Torne o vídeo ainda mais especial!</h3>
          <p>Imagine a reação das crianças ao verem suas fotos no vídeo do Papai Noel</p>
          
          <div class="photo-feature">
            <span class="material-icons feature-icon">add_photo_alternate</span>
            <div class="feature-content">
              <p>Adicione até 3 fotos por apenas</p>
              <strong class="price">R$ 10,00</strong>
              <p class="bonus">+ Efeitos especiais exclusivos</p>
            </div>
          </div>
        </div>

        <div v-if="activePopup === 'delivery'" class="popup-delivery">
          <h3>Entrega Super Rápida</h3>
          <div class="delivery-info">
            <span class="material-icons">timer</span>
            <p>Receba seu vídeo em <strong>até 2 horas</strong></p>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { trackComponentEvent } from '@/utils/analytics'

export default defineComponent({
  name: 'WhyUpsell',
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
.price-option {
  position: relative;
  padding: 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.price-option.recommended {
  background: rgba(0, 89, 255, 0.05);
  border: 2px solid var(--accent-blue);
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-detail {
  font-size: 12px;
  color: #666;
}

.photo-feature {
  text-align: center;
  padding: 24px;
  background: #f8f9fa;
  border-radius: var(--radius-lg);
  margin-top: 16px;
}

.feature-icon {
  font-size: 48px;
  color: var(--accent-blue);
  margin-bottom: 16px;
}

.bonus {
  font-size: 14px;
  color: #00b67a;
  margin-top: 8px;
}

.delivery-info, .quality-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
}

.quality-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
}

.delivery-note, .quality-note {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 16px;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  position: relative;
  width: 90%;
  max-width: 320px;
  background: var(--white);
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.close-btn .material-icons {
  font-size: 24px;
  color: var(--text-color);
}

.popup-content h3 {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 16px;
  margin-top: 16px;
  font-family: 'Product Sans', sans-serif;
}

.popup-content p {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 16px;
  font-family: 'Product Sans', sans-serif;
}

.price-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-option span {
  font-size: 16px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
}

.price-option strong {
  font-size: 18px;
  color: var(--accent-blue);
  font-family: 'Product Sans', sans-serif;
}

.price {
  display: block;
  font-size: 24px;
  color: var(--accent-blue);
  text-align: center;
  margin-top: 8px;
  font-family: 'Product Sans', sans-serif;
}


/* Novos estilos para melhorar os popups */
.feature-list {
  text-align: left;
  margin: 12px 0;
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 8px;
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
  padding: 12px;
  border-radius: var(--radius-sm);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  font-weight: bold;
}

.quality-intro {
  margin-bottom: 16px;
}

.quality-item {
  display: flex;
  align-items: flex-start;
  text-align: left;
}

.quality-item h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: var(--accent-blue);
}

.quality-item p {
  margin: 0;
  font-size: 14px;
}

.quality-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: rgba(0, 89, 255, 0.05);
  border-radius: var(--radius-sm);
}

.quality-guarantee .material-icons {
  color: var(--accent-blue);
}

.popup-photos .photo-feature {
  text-align: left;
  padding: 20px;
}

.popup-photos .price {
  display: inline-block;
  margin: 16px 0;
  padding: 8px 16px;
  background: var(--white);
  color: white;
  border-radius: var(--radius-sm);
}

.popup-kids .price-option {
  text-align: left;
  padding: 16px;
}

.popup-kids .price-option strong {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(0, 89, 255, 0.1);
  border-radius: var(--radius-sm);
}

/* Novos estilos para os cards ajustados */

.character {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.character .material-icons {
  font-size: 24px;
  color: var(--accent-blue);
  background: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.character p {
  font-size: 12px;
  margin: 0;
}

.instant-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: #00b67a;
  color: white;
  border-radius: var(--radius-sm);
  font-weight: bold;
}

.instant-badge .material-icons {
  color: white;
}

.delivery-info .material-icons {
  font-size: 28px;
  color: #ff9500;
}

.popup-photos {
  text-align: center;
}

.photo-feature {
  background: rgba(0, 89, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  margin-top: 24px;
}

.feature-icon {
  font-size: 48px !important;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.feature-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-content p {
  margin: 0;
}

.feature-content .price {
  font-size: 32px;
  color: var(--primary-color);
}

.feature-content .bonus {
  color: #00b67a;
  font-weight: 500;
}
</style> 