<template>
  <section :id="id" class="hero">
    <div class="hero__image">
      <div class="video-container">
        <video src="/hero.mp4" autoplay loop muted playsinline preload="metadata" disablePictureInPicture oncontextmenu="return false;" style="pointer-events: none;"></video>
      </div>
      
      <h1 class="hero__headline">
        Espalhe
       <br/>alegria infantil
      </h1>
      <p class="hero__subtext">
        O Coelho da Páscoa vai fazer<br/>
        um vídeo para o seu filho!
      </p>
      
      <button class="btn btn-cta btn-cta-sm hero__cta-btn" @click="goToPersonalization">
        Criar video
      </button>

       <!-- <button class="btn btn-play btn-play-sm hero__player-btn" @click="openVideo">
        <span class="material-icons">play_circle</span>
        Ver Exemplo
      </button>  -->

      <div class="hero__trustpilot">
        <div class="rating-container">
          <img src="@/assets/imgs/trustpilotbadge_159x41.webp" alt="Trustpilot" class="trustpilot-logo" />
          <span class="rating">4.7 de 1403 avaliações</span>
          <div class="stars">
            <span class="material-icons" v-for="i in 5" :key="i">star</span>
          </div>
        </div>
      </div>
    </div>

    <VideoModal 
      :show="showVideo"
      :video-url="videoUrl"
      @close="closeVideo"
    />
  </section>
</template>

<script>
import VideoModal from './VideoModal.vue'
import { useRouter } from 'vue-router'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'SiteHero',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    VideoModal
  },
  data() {
    return {
      showVideo: false,
      videoUrl: 'https://pub-2303c0d3070d458f94b2c5e86cc6c622.r2.dev/VSL%20SITE.mp4'
    }
  },
  setup() {
    const router = useRouter()

    const goToPersonalization = async () => {
      // Track the event
      trackComponentEvent.hero.orderNow()

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
  },
  methods: {
    openVideo() {
      trackComponentEvent.hero.watchVideo()
      this.showVideo = true
    },
    closeVideo() {
      this.showVideo = false
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showVideo) {
        this.closeVideo()
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeVideo)
  }
}
</script>

<style>
.hero {
  width: 100%;
  position: relative;
  background: #ffffff;
}

.hero__image {
  position: relative;
  text-align: center;
  width: 100%;
  height: auto;
}

.hero__image .video-container,
.hero__image video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero__headline {
  position: absolute;
  border-bottom: 2px solid var(--primary-color);
  border-radius: 20px;
  margin-inline: 62px;
  top: 50%;
  left: 0;
  right: 0;
  font-size: 40px;
  line-height: 1.1;
  color: var(--white);
  font-family: "Fertigo Pro", Times, "Times New Roman", serif;
  z-index: 2;
}

.hero__subtext {
  position: absolute;
  top: 67%;
  left: 0;
  right: 0;
  font-size: 15px;
  line-height: 1.3;
  color: var(--white);
  opacity: 0.9;
  font-family: 'Product Sans', sans-serif;
  z-index: 2;
}

.hero__cta-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 76%;
  left: 29%;
  z-index: 2;
}

.hero__cta-btn:hover,
.hero__cta-btn:active {
  transform: translateX(-50%) !important;
}

.hero__player-btn {
  position: absolute;
  font-size: 12px !important;
  color: var(--white) !important;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 10px !important;
  width: 130px !important;
  z-index: 2;
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: none !important;
}

.hero__player-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateX(-50%) !important;
}

.hero__player-btn .material-icons {
  font-size: 20px;
  color: var(--accent-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
}

.hero__trustpilot {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  padding: 0 10px;
}

.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 18px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 4px 4px;
  max-width: 240px;
  margin: 0 auto;
}

.trustpilot-logo {
  height: 12px;
  width: auto;
  display: block;
}

.rating {
  font-size: 9px !important;
  line-height: 12px;
  color: var(--white);
  font-family: 'Product Sans', sans-serif;
  white-space: nowrap;
}

.stars {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 12px;
}

.stars .material-icons {
  font-size: 6px;
  color: var(--accent-yellow);
  line-height: 6px;
  height: 6px;
  width: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-pagination) {
  bottom: 20px !important;
  z-index: 2;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: var(--white);
  opacity: 0.8;
  transition: none !important;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--primary-color);
  transform: none !important;
}

.hero__image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.0),
    rgba(0, 0, 0, 0.0),
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  );
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero__image img,
  .hero__image video {
    height: 100%;
    max-height: 80vh;
  }

  .hero__headline {
    font-size: 20px;
  }

  .hero__subtext {
    font-size: 14px !important;
  }

  .hero__cta-btn {
    font-size: 18px !important;
    width: 200px !important;
  }

  .hero__player-btn {
    font-size: px !important;
    padding: 6px 12px !important;
    min-width: 100px !important;
  }

  .hero__player-btn .material-icons {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero__image img,
  .hero__image video {
    max-height: 70vh;
  }

  .hero__headline {
    font-size: 42px!important;
    padding: 0px 7px;
  }

  .hero__subtext {
    font-size: 18px!important;
    padding: 0px 7px;
  }

  .hero__cta-btn {
    font-size: 16px !important;
    width: 180px !important;
  }

  .hero__player-btn {
    font-size: 10px !important;
    padding: 7px 10px !important;
    min-width: 100px !important;
  }

  .hero__player-btn .material-icons {
    font-size: 16px;
  }
}

.material-icons {
  font-family: 'Material Icons' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}
</style> 

  
