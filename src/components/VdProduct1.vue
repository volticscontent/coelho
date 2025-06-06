<template>
  <section class="vd-product">
    <div class="video-container">
      <video 
        ref="videoFrame"
        class="video-player"
        :src="videoUrl"
        loop
        playsinline
        preload="auto"
        webkit-playsinline
        x5-playsinline
        title="Stitch (Modelo)"
        @click="toggleFullscreen"
        @error="handleVideoError"
      ></video>
    
      <div class="video-description">
        <h3>Vídeo do Stitch</h3>
        <p class="highlight">🎥✨ Traga magia para uma pessoa especial!</p>
        <p class="description">Encomende um vídeo encantador onde o Stitch fala diretamente com quem você ama, chamando-a pelo nome e passando uma mensagem especial.</p>
        <p class="description">Tudo com uma mensagem personalizada, criada por você em apenas 5 minutinhos!</p>
        <ul>
          <li><span class="check-icon">🎥</span>Novo vídeo e ligação de 2025</li>
          <li><span class="check-icon">📸</span>Até 16 opções únicas de personalização</li>
          <li><span class="check-icon">📬</span>Receba em até 2 horas no seu e-mail</li>
          <li><span class="check-icon">💖</span>Fácil, rápido e emocionante</li>
        </ul>
        <button class="btn btn-primary" @click="handleCreateVideo">
          Criar vídeo agora
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'VdProduct1',
  setup() {
    const router = useRouter()
    const videoFrame = ref(null)
    let observer = null

    const videoUrl = 'https://pub-2303c0d3070d458f94b2c5e86cc6c622.r2.dev/VSL%20SITE.mp4'

    const handleVideoError = (error) => {
      console.error('Erro ao carregar o vídeo:', error)
      if (videoFrame.value) {
        videoFrame.value.src = 'https://pub-2303c0d3070d458f94b2c5e86cc6c622.r2.dev/VSL%20SITE.mp4'
        videoFrame.value.load()
      }
    }

    const handleCreateVideo = async () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })

      await new Promise(resolve => setTimeout(resolve, 100))

      router.push({ 
        name: 'personalizar',
        replace: true
      })
    }

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        if (videoFrame.value) {
          videoFrame.value.requestFullscreen().catch(error => {
            console.error('Erro ao entrar em tela cheia:', error)
          })
        }
      } else {
        document.exitFullscreen()
      }
    }

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoFrame.value) {
            videoFrame.value.play().catch(error => {
              console.error('Erro ao iniciar o vídeo:', error)
            })
          }
        } else {
          if (videoFrame.value) {
            videoFrame.value.pause()
          }
        }
      })
    }

    onMounted(() => {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
      })
      
      const section = document.querySelector('.vd-product')
      if (section) {
        observer.observe(section)
      }
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
      if (videoFrame.value) {
        videoFrame.value.pause()
        videoFrame.value.src = ''
      }
    })

    return {
      handleCreateVideo,
      videoFrame,
      videoUrl,
      toggleFullscreen
    }
  }
}
</script>

<style scoped>
.vd-product {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--white);
  padding: 40px 0;
}

.video-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 16px;
}

.video-player {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.video-player:hover {
  transform: scale(1.02);
}

.video-description {
  padding: 32px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 16px;
}

.video-description h3 {
  font-size: 28px;
  color: var(--text-color);
  margin-bottom: 24px;
  font-family: "Fertigo Pro", Times, "Times New Roman", serif;
  font-weight: 700;
}

.video-description .highlight {
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 24px;
  font-family: 'Product Sans', sans-serif;
  font-weight: 500;
}

.video-description .description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 32px;
  font-family: 'Product Sans', sans-serif;
  opacity: 0.9;
}

.video-description ul {
  list-style: none;
  padding: 0;
  margin: 32px 0;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.video-description li {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 12px;
  position: relative;
  font-family: 'Product Sans', sans-serif;
  display: flex;
  align-items: center;
  background: var(--gray-50);
  padding: 16px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  gap: 12px;
}

.video-description li:hover {
  transform: translateX(4px);
}

.video-description .check-icon {
  color: var(--accent-blue);
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  background: var(--white);
  border-radius: 50%;
  padding: 2px;
}

.video-description .btn {
  margin-top: 32px;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: var(--gradient-primary);
  color: var(--white);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
}

.video-description .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 89, 255, 0.3);
}

@media (max-width: 768px) {
  .vd-product {
    padding: 24px 0;
  }

  .video-container {
    padding: 0 12px;
    gap: 24px;
    aspect-ratio: auto;
    flex-direction: column;
  }

  .video-player {
    aspect-ratio: 16/9;
    height: auto;
    width: 100%;
  }

  .video-description {
    padding: 20px 16px;
  }

  .video-description h3 {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .video-description .highlight {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .video-description .description {
    font-size: 15px;
    margin-bottom: 24px;
  }

  .video-description ul {
    grid-template-columns: 1fr;
    gap: 12px;
    margin: 24px 0;
  }

  .video-description li {
    font-size: 15px;
    padding: 12px;
    margin-bottom: 0;
  }

  .video-description .btn {
    width: 100%;
    margin-top: 24px;
    padding: 14px 24px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .vd-product {
    padding: 16px 0;
  }

  .video-container {
    padding: 0 8px;
    gap: 16px;
  }

  .video-description {
    padding: 16px 12px;
  }

  .video-description h3 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .video-description .highlight {
    font-size: 15px;
    margin-bottom: 12px;
  }

  .video-description .description {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .video-description li {
    font-size: 14px;
    padding: 10px;
  }

  .video-description .check-icon {
    font-size: 16px;
    min-width: 20px;
    height: 20px;
  }

  .video-description .btn {
    padding: 12px 20px;
    font-size: 15px;
    margin-top: 20px;
  }
}
</style> 