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

:root {
  --primary-color: #0059ff;
  --secondary-color: #FFB800;
  --text-color: #333333;
  --white: #FFFFFF;
  --gradient-primary: linear-gradient(45deg, #0059ff, #0095ff);
  --gradient-secondary: linear-gradient(180deg, #FFB800 0%, #FFD700 100%);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Product Sans', Arial, sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--white);
  color: var(--text-color);
}

.material-icons {
  font-size: 24px;
}

button {
  font-family: 'Product Sans', Arial, sans-serif;
  font-weight: 500;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Product Sans', Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--white);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--white);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:hover {
  background: rgba(0, 89, 255, 0.05);
  transform: translateY(-2px);
}

.btn-icon {
  gap: 8px;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

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
