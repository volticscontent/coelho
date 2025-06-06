<template>
  <div v-if="!accepted" class="cookie-consent">
    <div class="cookie-content">
      <p>
        Utilizamos cookies e coletamos dados para melhorar sua experiência. 
        Ao continuar navegando, você concorda com nossa 
        <button class="link-button" @click="showPrivacyModal = true">Política de Privacidade</button>.
      </p>
      <div class="cookie-actions">
        <button class="btn btn-cta" @click="acceptCookies">Aceitar</button>
        <button class="btn btn-outline" @click="rejectCookies">Recusar</button>
      </div>
    </div>

    <!-- Modal de Privacidade -->
    <PrivacyModal v-if="showPrivacyModal" @close="showPrivacyModal = false" />
  </div>
</template>

<script>
import PrivacyModal from './modals/PrivacyModal.vue'

export default {
  name: 'CookieConsent',
  components: {
    PrivacyModal
  },
  data() {
    return {
      accepted: localStorage.getItem('cookiesAccepted') === 'true',
      showPrivacyModal: false
    }
  },
  methods: {
    acceptCookies() {
      localStorage.setItem('cookiesAccepted', 'true')
      this.accepted = true
      this.$emit('cookies-accepted', true)
    },
    rejectCookies() {
      localStorage.setItem('cookiesAccepted', 'false')
      this.accepted = true
      this.$emit('cookies-accepted', false)
    }
  }
}
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--white);
  padding: 16px;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.cookie-content {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}

.cookie-content p {
  font-size: 14px;
  line-height: 1.4;
  color: var(--text-color);
  margin: 0 0 16px;
  font-family: 'Product Sans', sans-serif;
  margin-bottom: 1rem;
}

.cookie-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.link-button {
  background: none;
  border: none;
  color: var(--primary-color);
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .cookie-content {
    max-width: 720px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .cookie-content p {
    margin-bottom: 1rem;
  }
}
</style> 