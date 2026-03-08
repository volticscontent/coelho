<template>
  <transition name="modal" appear>
    <div v-if="show" class="video-modal" @click.self="$emit('close')">
      <div class="modal-content">
        <button class="close-button" @click="$emit('close')">
          <span class="material-icons">close</span>
        </button>
        <div class="video-container">
          <video
            ref="modalVideo"
            :src="videoUrl"
            autoplay
            loop
            muted
            playsinline
            webkit-playsinline
            disablePictureInPicture
            oncontextmenu="return false;"
            style="pointer-events: none;"
          ></video>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VideoModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
        // Força autoplay no iOS Safari quando o modal abre
        this.$nextTick(() => {
          const video = this.$refs.modalVideo
          if (video) {
            video.muted = true
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => { /* ignorar erro de interrupção */ })
            }
          }
        })
      } else {
        document.body.style.overflow = ''
      }
    }
  }
}
</script>

<style scoped>
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 1200px;
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.close-button .material-icons {
  color: var(--white);
  font-size: 24px;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
}

.video-container iframe,
.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Esconde botão de play nativo do iOS */
.video-container video::-webkit-media-controls-start-playback-button,
.video-container video::-webkit-media-controls-play-button,
.video-container video::-webkit-media-controls-overlay-play-button,
.video-container video::-webkit-media-controls {
  display: none !important;
  -webkit-appearance: none;
  appearance: none;
}

.video-container video {
  -webkit-appearance: none;
  appearance: none;
}

@media (max-width: 768px) {
  .video-modal {
    padding: 16px;
  }

  .close-button {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }

  .close-button .material-icons {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .video-modal {
    padding: 8px;
  }
}
</style> 