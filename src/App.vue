<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <CookieConsent v-if="!isAuthPage" @cookies-accepted="handleCookiesResponse" />
    <WhatsappButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationNormalized } from 'vue-router'
import CookieConsent from '@/components/CookieConsent.vue'
import WhatsappButton from '@/components/WhatsappButton.vue'

export default defineComponent({
  name: 'App',
  components: {
    CookieConsent,
    WhatsappButton
  },
  computed: {
    isAuthPage(): boolean {
      return (this.$route as RouteLocationNormalized).path.includes('/auth')
    }
  },
  methods: {
    handleCookiesResponse(accepted: boolean): void {
      if (accepted) {
        // Aqui você pode inicializar analytics ou outros serviços
        console.log('Cookies aceitos')
      } else {
        console.log('Cookies recusados')
      }
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Product+Sans:wght@400;500;700&display=swap');

#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
