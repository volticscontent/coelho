<template>
  <section class="sec-social">
    <div class="sec-social__container">
      <h2 class="title-custom">Avaliações</h2>
      
      <div class="verified-badge">
        <span class="material-icons check-icon">verified</span>
        <p>Somente avaliações verificadas</p>
      </div>

      <div class="rating-stars">
        <span class="material-icons" v-for="i in 5" :key="i">star</span>
        <span class="more-link">Mais ></span>
      </div>

      <div class="rating-cards">
        <div class="rating-card">
          <div class="rating-score">4.7</div>
          <p>de 1403 avaliações</p>
          <img src="@/assets/imgs/trustpilotbadge_159x41.webp" alt="Trustpilot" class="platform-logo" />
        </div>

        <div class="rating-card">
          <div class="rating-score">4.9</div>
          <p>de 60.627 avaliações</p>
          <img src="@/assets/imgs/google.png" alt="Google" class="platform-logo" />
        </div>

        <div class="rating-card">
          <div class="rating-score">4.4</div>
          <p>de 135 avaliações</p>
          <img src="@/assets/imgs/facebook.png" alt="Facebook" class="platform-logo" />
        </div>
      </div>

      <button 
        @click="goToPersonalization"
        class="btn btn-primary btn-cta"
      >
        Criar Vídeo 
      </button>

      <div class="security-seals">
        <img src="@/assets/imgs/trustpilotbadge_159x41.webp" alt="Trustpilot Seal" class="seal-logo" />
        <img src="@/assets/imgs/google.png" alt="Google Seal" class="seal-logo" />
        <img src="@/assets/imgs/facebook.png" alt="Meta Seal" class="seal-logo" />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackEvent } from '@/utils/analytics'

export default {
  name: 'SecSocial',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup() {
    const router = useRouter()

    const goToPersonalization = async () => {
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

    const handleTestimonialView = (testimonialId) => {
      trackEvent({
        event_name: 'testimonial_view',
        personalization_step: 'Social',
        from_step: String(testimonialId),
        step_data: JSON.stringify({
          testimonial_id: testimonialId,
          section: 'sec_social'
        })
      })
    }

    const handleSeeMore = () => {
      trackEvent({
        event_name: 'testimonial_see_more',
        personalization_step: 'Social',
        from_step: 'button',
        step_data: JSON.stringify({
          section: 'sec_social'
        })
      })
    }

    onMounted(() => {
      // Track view
      trackEvent({
        event_name: 'social_proof_view',
        personalization_step: 'Social',
        from_step: 'home',
        step_data: JSON.stringify({
          section: 'sec_social'
        })
      })
    })

    return {
      goToPersonalization,
      handleTestimonialView,
      handleSeeMore
    }
  }
}
</script>

<style scoped>
.sec-social {
  padding: 40px 16px;
  background:  linear-gradient(180deg, #89f1ff96 0%, #ffffff 100%); /* Verde claro */
}

.sec-social__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.verified-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #2e7d32; /* Verde escuro */
}

.check-icon {
  color: #2e7d32;
  font-size: 20px;
}

.verified-badge p {
  font-family: 'Product Sans', sans-serif;
  font-size: 14px;
  margin: 0;
  color: #2e7d32;
}

.rating-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.rating-stars .material-icons {
  color: #FFD700;
  font-size: 24px;
}

.more-link {
  margin-left: 8px;
  color: var(--text-color);
  font-family: 'Product Sans', sans-serif;
}

.rating-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rating-card {
  background: var(--white);
  padding: 16px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.rating-score {
  font-size: 32px;
  font-weight: 700;
  color: #2e7d32;
  font-family: 'Product Sans', sans-serif;
}

.rating-card p {
  font-size: 14px;
  color: var(--text-color);
  margin: 4px 0 12px;
  font-family: 'Product Sans', sans-serif;
}

.platform-logo {
  height: 24px;
  object-fit: contain;
}

.security-seals {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.seal-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.btn-cta {
  width: 100%;
  max-width: 280px;
  margin: 8px auto;
}
</style> 