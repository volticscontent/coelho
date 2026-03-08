<template>
  <section :id="id" class="hero">
    <div class="hero__image">
      <div class="video-container">
        <video
          ref="heroVideo"
          autoplay
          loop
          muted
          playsinline
          webkit-playsinline
          preload="auto"
          disablePictureInPicture
          oncontextmenu="return false;"
          @canplay="onVideoCanPlay"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <!-- Overlay para suprimir o botão de play nativo do iOS Safari -->
        <div class="video-overlay"></div>
        
        <div class="hero__content">
          <h1 class="hero__headline">
            Espalhe
            <br/>alegria infantil
          </h1>
          <div class="hero__subtext">
            O Coelho da Páscoa vai fazer<br/>
            um vídeo para o seu filho!
          </div>

          <button class="btn hero__cta-btn" @click="goToPersonalization">
            Criar video
          </button>
        </div>

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
    },
    onVideoCanPlay() {
      const video = this.$refs.heroVideo
      if (video && video.paused) {
        video.muted = true
        video.play().catch(() => {})
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showVideo) {
        this.closeVideo()
      }
    })

    this.$nextTick(() => {
      const video = this.$refs.heroVideo
      if (!video) return

      // Garante muted e playsinline via JS (belt & suspenders para iOS)
      video.muted = true
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')

      const tryPlay = () => {
        if (!video.paused) return
        const promise = video.play()
        if (promise !== undefined) {
          promise.catch(() => {
            // Fallback: tenta no primeiro toque do usuário
            document.addEventListener('touchstart', () => {
              video.muted = true
              video.play().catch(() => {})
            }, { once: true })
          })
        }
      }

      // Se o vídeo já está pronto, tenta imediatamente
      if (video.readyState >= 2) {
        tryPlay()
      } else {
        // Aguarda o vídeo ter dados suficientes
        video.addEventListener('canplay', tryPlay, { once: true })
      }

      // Retoma o vídeo quando o usuário volta para a aba
      this._visibilityHandler = () => {
        if (document.visibilityState === 'visible') {
          video.muted = true
          video.play().catch(() => {})
        }
      }
      document.addEventListener('visibilitychange', this._visibilityHandler)
    })
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeVideo)
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler)
    }
  }
}
</script>

<style scoped>
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

.hero__image .video-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
}

.hero__image video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

/* Overlay que bloqueia a shadow DOM de controles nativos do iOS */
.video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
}

.hero__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 20px 80px 20px;
  gap: 24px;
  z-index: 2;
  pointer-events: none;
}

.hero__headline {
  border-bottom: 2px solid var(--primary-color);
  border-radius: 20px;
  margin-inline: 62px;
  font-size: 40px;
  line-height: 1.1;
  color: var(--white);
  font-family: "Fertigo Pro", Times, "Times New Roman", serif;
  margin: 0;
}

.hero__subtext {
  font-size: 15px;
  line-height: 1.3;
  color: var(--white);
  opacity: 0.9;
  font-family: 'Product Sans', sans-serif;
  margin: 0;
}

.hero__cta-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  pointer-events: auto;
  padding: 8px 24px !important;
  line-height: 1 !important;
  width: auto !important;
  min-width: unset !important;
  flex: none !important;
  background: var(--accent-blue);
  color: var(--white);
  border: none;
  cursor: pointer;
  font-size: 16px !important;
  font-weight: 700;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 15px rgba(0, 183, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.hero__cta-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 183, 255, 0.5);
}

.hero__player-btn {
  position: absolute;
  font-size: 12px;
  color: var(--white);
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 10px;
  width: 130px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
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
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.3)
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
    font-size: 16px !important;
    padding: 2px 20px !important;
  }

  .hero__player-btn {
    font-size: 10px !important;
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
    font-size: 15px !important;
    padding: 2px 18px !important;
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

@media (max-width: 390px) {
  .hero__content {
    gap: 20px;
    padding-bottom: 70px;
  }

  .hero__headline {
    font-size: 30px !important;
    margin-inline: 15px;
    padding: 0px 5px;
  }

  .hero__subtext {
    font-size: 15px !important;
  }

  .hero__cta-btn {
    font-size: 14px !important;
    padding: 2px 16px !important;
  }
}

@media (max-width: 320px) {
  .hero__content {
    gap: 16px;
    padding-bottom: 60px;
  }

  .hero__headline {
    font-size: 26px !important;
    margin-inline: 10px;
  }

  .hero__subtext {
    font-size: 13px !important;
  }

  .hero__cta-btn {
    font-size: 13px !important;
    padding: 2px 14px !important;
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

  
