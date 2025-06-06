<template>
  <section class="trust-badges">
    <div class="trust-badges__container">
      <!-- Badges Carousel -->
      <div class="badges-carousel">
        <swiper
          :modules="modules"
          :slides-per-view="1.2"
          :space-between="16"
          :loop="true"
          :autoplay="autoplayConfig"
          :breakpoints="swiperBreakpoints"
          class="badges-swiper"
        >
          <swiper-slide v-for="badge in badges" :key="badge.id">
            <div class="badge-item">
              <div class="badge-icon">
                <span class="material-icons">{{ badge.icon }}</span>
              </div>
              <div class="badge-text">
                <h4>{{ badge.title }}</h4>
                <p>{{ badge.description }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default {
  name: 'TrustBadges',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay],
      autoplayConfig: {
        delay: 3000,
        disableOnInteraction: false
      },
      swiperBreakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      },
      badges: [
        {
          id: 1,
          icon: 'verified',
          title: 'Garantia de Satisfação',
          description: 'Reembolso integral em até 7 dias'
        },
        {
          id: 2,
          icon: 'rocket_launch',
          title: 'Entrega Rápida',
          description: 'Receba em até 24 horas'
        },
        {
          id: 3,
          icon: 'support_agent',
          title: 'Suporte 24/7',
          description: 'Atendimento via WhatsApp'
        }
      ]
    }
  }
}
</script>

<style scoped>
.trust-badges {
  padding: 32px 16px;
  background: var(--white);
  margin-top: 64px; /* Espaço para o header fixo */
}

.trust-badges__container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Badges Carousel */
.badges-carousel {
  width: 100%;
}

.badges-swiper {
  padding: 8px 4px;
  margin: -8px -4px;
}

:deep(.swiper-slide) {
  height: auto;
}

:deep(.swiper) {
  overflow: visible;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  height: 100%;
}

.badge-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-blue));
  border-radius: 12px;
  flex-shrink: 0;
}

.badge-icon .material-icons {
  font-size: 20px;
  color: var(--white);
}

.badge-text {
  text-align: left;
}

.badge-text h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.badge-text p {
  font-size: 12px;
  color: var(--gray-500);
  line-height: 1.4;
}

/* iOS fixes */
@supports (-webkit-touch-callout: none) {
  .badge-item {
    background: var(--white);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .trust-badges {
    padding: 24px 16px;
  }

  .badge-item {
    padding: 12px;
  }

  .badge-icon {
    width: 32px;
    height: 32px;
  }

  .badge-icon .material-icons {
    font-size: 16px;
  }
}
</style> 