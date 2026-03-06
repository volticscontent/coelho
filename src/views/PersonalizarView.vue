<template>
  <div class="personalizar">
    
    <!-- <PersHero /> -->
    <Header />
    <div class="personalizar__content">
      <div class="page-title">
        <h1>Personalize seu <span class="text-gradient">vídeo mágico</span></h1>
        <p>Crie uma experiência inesquecível para seu pequeno em poucos passos</p>
      </div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" @quiz-completed="handleQuizCompleted" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">  
import { defineComponent, onMounted } from 'vue'
import { trackAddToCart } from '@/utils/analytics'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import PersHero from '@/components/personalization/PersHero.vue'

import type { QuizData } from '@/types/quiz'

export default defineComponent({
  name: 'PersonalizarView',
  components: {
    Header,
    Footer,
    // PersHero,
  },
  setup() {
    const handleQuizCompleted = (quizData: QuizData) => {
      // O checkout já é processado no PersSteps
      console.log('Quiz completed:', quizData)
    }

    onMounted(() => {
      // Força o scroll para o topo imediatamente quando a página é montada
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Valores válidos são: 'auto' | 'smooth'
      })

      // Garante que o body também está no topo
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    })

    return {
      handleQuizCompleted
    }
  },
  mounted() {
    trackAddToCart()
  }
})
</script>

<style scoped>
.personalizar {
  min-height: 100vh;
  background: var(--white);
  padding-top: 75px;
}

.personalizar__content {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-title {
  text-align: center;
  margin-bottom: 32px;
}

.page-title h1 {
  font-size: 32px;
  margin-bottom: 8px;
}

.page-title p {
  font-size: 16px;
  color: var(--gray-600);
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .page-title h1 {
    font-size: 24px;
  }
  
  .page-title p {
    font-size: 14px;
  }
}
</style> 