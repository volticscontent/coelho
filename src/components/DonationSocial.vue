import whatsapp-button
<template>
  <section :id="id" class="donation-social">
    <div class="donation-social__container">
      <h2 class="title-custom">Compartilhe a magia</h2>
      
      <div class="donation-card">
        <div class="donation-header">
          <span class="material-icons">favorite</span>
          <h3>Doe um vídeo do Coelho da Páscoa</h3>
        </div>
        <div class="donation-content">
          <p>Ajude a levar alegria para crianças que precisam de um momento especial. Com sua doação, uma criança receberá um vídeo personalizado do Coelho da Páscoa.</p>
          <a :href="whatsappLink" target="_blank" rel="noopener" class="btn btn-primary" @click="trackWhatsAppClick">
            Doar agora
          </a>
        </div>
      </div>

      <div class="donation-content">
        <h3>Ajude milhares de crianças ao redor do mundo</h3>
        
        <p class="donation-text">
          Em 2025 arrecadamos e doamos mais de R$170.000 para várias instituições de caridade ao redor do mundo
        </p>
        <p>Mais de 1000 doações realizadas em 2025</p>
      </div>

      <div class="donation-image">
        <img src="/donate.png" alt="Doações VdKids" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { trackEvent } from '@/utils/analytics'

export default {
  name: 'DonationSocial',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup() {
    const whatsappLink = computed(() => {
      const number = '+553184865510'
      const message = 'Olá! Gostaria de fazer uma doação para o Recadinho do Coelho da Páscoa'
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    })

    const trackWhatsAppClick = () => {
      trackEvent('DonationClick')
    }

    const handleDonationClick = (platform) => {
      trackEvent({
        event_name: 'donation_click',
        personalization_step: 'Donation',
        from_step: platform,
        step_data: JSON.stringify({
          platform: platform,
          section: 'donation_social'
        })
      })
    }

    return {
      whatsappLink,
      trackWhatsAppClick,
      handleDonationClick
    }
  }
}
</script>

<style scoped>
.donation-social {
  padding: 40px 16px;
  background: rgb(255, 255, 255); /* Azul claro */
}

.donation-social__container {
  max-width: 466px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.donation-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title-custom {
  color: var(--text-color)!important;
}

.donation-content h3 {
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
  font-family: 'Product Sans', sans-serif;
}

.donation-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
  font-family: 'Product Sans', sans-serif;
  opacity: 0.9;
}

.donation-image {
  margin-top: 16px;
  width: 100%;
  max-width: 466px;
  height: 415px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  scale: 1.2
}

.donation-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.donation-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.donation-header {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.donation-header .material-icons {
  font-size: 32px;
  color: var(--primary-color);
  background: var(--primary-color-light);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donation-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--white);
  padding: 16px 32px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  margin-top: 16px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}
</style> 