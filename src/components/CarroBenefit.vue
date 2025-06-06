<template>
  <section :id="id" class="carro-benefit">
    <div class="carro-benefit__container">
      <div class="benefit-track">
        <div class="benefit-inner">
          <div v-for="(image, index) in baseImages" :key="'first-' + index" class="benefit-item">
            <img :src="image" :alt="'Benefício ' + (index + 1)" class="benefit-image" loading="lazy" />
          </div>
          <div v-for="(image, index) in baseImages" :key="'second-' + index" class="benefit-item">
            <img :src="image" :alt="'Benefício ' + (index + 1)" class="benefit-image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CarroBenefit',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      baseImages: [
        require('@/assets/imgs/c1.png'),
        require('@/assets/imgs/c2.png'),
        require('@/assets/imgs/c3.png'),
        require('@/assets/imgs/c4.png')
      ]
    }
  }
}
</script>

<style scoped>
.carro-benefit {
  padding: 24px 0;
  background: var(--white);
  overflow: hidden;
  position: relative;
}

.carro-benefit::before,
.carro-benefit::after {
  content: '';
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.carro-benefit::before {
  left: 0;
  background: linear-gradient(to right, var(--white) 0%, transparent 100%);
}

.carro-benefit::after {
  right: 0;
  background: linear-gradient(to left, var(--white) 0%, transparent 100%);
}

.carro-benefit__container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.benefit-track {
  overflow: hidden;
  padding: 12px 60px;
  margin: 0 -60px;
}

.benefit-inner {
  display: flex;
  gap: 24px;
  animation: slideTrack 15s linear infinite;
  width: fit-content;
}

.benefit-item {
  flex: 0 0 auto;
  width: 180px;
  padding: 8px;
}

.benefit-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.benefit-item:hover .benefit-image {
  transform: scale(1.05);
}

@keyframes slideTrack {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .benefit-item {
    width: 140px;
  }
  
  .carro-benefit::before,
  .carro-benefit::after {
    width: 60px;
  }
  
  .benefit-track {
    padding: 8px 30px;
    margin: 0 -30px;
  }
  
  .benefit-inner {
    gap: 16px;
  }
}

/* Pausa a animação quando a página está em background */
@media (prefers-reduced-motion: reduce) {
  .benefit-inner {
    animation-play-state: paused;
  }
}
</style> 
