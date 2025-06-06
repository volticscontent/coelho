<template>
  <section :id="id" class="garantias">
    <div class="garantias-container">
      <div class="garantia-item">
        <div class="icon-circle">
          <span class="material-icons">download</span>
        </div>
        <h3>Baixe gratuitamente</h3>
        <p>Vídeo exemplo e prévia da mensagem personalizada.</p>
      </div>

      <div class="garantia-item">
        <div class="icon-circle">
          <span class="material-icons">update</span>
        </div>
        <h3>180 dias de garantia</h3>
        <p>Solicite reembolso a qualquer momento. Sem necessidade de justificativa.</p>
      </div>

      <div class="garantia-item">
        <div class="icon-circle">
          <span class="material-icons">favorite</span>
        </div>
        <h3>Aprovado pelos pais</h3>
        <p>Mais de 60.000 famílias já fizeram a alegria de seus pequenos.</p>
      </div>

      <div class="garantia-item">
        <div class="icon-circle">
          <span class="material-icons">payments</span>
        </div>
        <h3>Pagamento Seguro</h3>
        <p>Diversas formas de pagamento com total segurança.</p>
      </div>

      <button class="btn-primary" @click="handleCreateVideo">
        Criar vídeo agora
      </button>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'GarantiasSection',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter()

    const handleCreateVideo = () => {
      // Track the event
      trackComponentEvent.garantias.createVideo()

      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })

      router.push({ 
        name: 'personalizar-quantidade',
        replace: true
      })
    }

    return {
      handleCreateVideo
    }
  }
}
</script>

<style scoped>
.garantias {
  padding: 64px 0;
  background: #89f1ff96;
  overflow: hidden;
}

.garantias-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  text-align: center;
}

.garantia-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  background: var(--white);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.garantia-item:hover {
  transform: translateY(-4px);
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.icon-circle .material-icons {
  font-size: 32px;
  color: var(--white);
}

.garantia-item h3 {
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 8px;
}

.garantia-item p {
  font-size: 16px;
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.5;
}

.btn-primary {
  grid-column: 1 / -1;
  margin: 32px auto 0;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
  background: var(--gradient-primary);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 89, 255, 0.3);
}

@media (max-width: 768px) {
  .garantias {
    padding: 40px 0;
  }

  .garantias-container {
    gap: 24px;
  }

  .garantia-item {
    padding: 20px;
  }

  .btn-primary {
    width: 100%;
    margin-top: 24px;
  }
}
</style> 