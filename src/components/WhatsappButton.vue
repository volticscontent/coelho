<template>
  <a 
    :href="whatsappLink" 
    target="_blank" 
    rel="noopener"
    class="whatsapp-button"
    aria-label="Contato WhatsApp"
    @click="trackWhatsAppClick"
  >
    <div class="btn-circle">
      <i class="fab fa-whatsapp"></i>
    </div>
    <div class="tooltip">Precisa de ajuda?</div>
  </a>
</template>

<script>
import { trackEvent } from '@/utils/analytics'

export default {
  name: 'WhatsappButton',
  computed: {
    whatsappLink() {
      const number = '+5519984279574'
      const message = 'Olá! Preciso de ajuda com meu Recadinho do Coelho da Páscoa'
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    }
  },
  methods: {
    trackWhatsAppClick() {
      trackEvent('Contact')
    }
  }
}
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  text-decoration: none;
  cursor: pointer;
}

.btn-circle {
  width: 56px;
  height: 56px;
  background: #25d3ad;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
}

.btn-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.btn-circle i {
  font-size: 32px;
  color: white;
}

.tooltip {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
}

.whatsapp-button:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .whatsapp-button {
    bottom: 50px;
    right: 16px;
  }

  .btn-circle {
    width: 60px;
    height: 60px;
  }

  .btn-circle i {
    font-size: 38px;
  }
}
</style> 