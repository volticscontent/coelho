<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo">
        <img src="/logo.png" alt="VdKids Logo" />
      </div>

      <div class="footer__links">
        <div class="links-group">
          <h3>Sobre</h3>
          <ul>
            <li><a href="#" @click.prevent="showAboutModal = true">Nossa História</a></li>
            <li><a href="#" @click.prevent="showFaqModal = true">Como Funciona</a></li>
          </ul>
        </div>

        <div class="links-group">
          <h3>Suporte</h3>
          <ul>
            <li><a href="#" @click.prevent="showFaqModal = true">FAQ</a></li>
            <li><a href="#" @click.prevent="showPrivacyModal = true">Política de Privacidade</a></li>
          </ul>
        </div>

        <div class="links-group">
          <h3>Social</h3>
          <ul>
            <li><a href="https://instagram.com/vdkids" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="copyright">© 2025 ZapKids</p>
        <div class="payment-methods">
          <img src="@/assets/imgs/payment-methods.webp" alt="Métodos de Pagamento" />
        </div>
      </div>
    </div>

    <!-- Modais -->
    <AboutModal v-if="showAboutModal" @close="showAboutModal = false" />
    <FaqModal v-if="showFaqModal" @close="showFaqModal = false" />
    <PrivacyModal v-if="showPrivacyModal" @close="showPrivacyModal = false" />
  </footer>
</template>

<script>
import AboutModal from './modals/AboutModal.vue'
import FaqModal from './modals/FaqModal.vue'
import PrivacyModal from './modals/PrivacyModal.vue'

export default {
  name: 'SiteFooter',
  components: {
    AboutModal,
    FaqModal,
    PrivacyModal
  },
  data() {
    return {
      showAboutModal: false,
      showFaqModal: false,
      showPrivacyModal: false
    }
  }
}
</script>

<style scoped>
.footer {
  padding: 40px 16px 24px;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-100);
}

.footer__container {
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.footer__logo {
  text-align: center;
}

.footer__logo img {
  height: 40px;
  object-fit: contain;
  border-radius: 360px;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
}

.links-group h3 {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 12px;
  font-family: 'Product Sans', sans-serif;
}

.links-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.links-group a {
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;
  font-family: 'Product Sans', sans-serif;
  transition: opacity 0.3s ease;
}

.links-group a:hover {
  opacity: 1;
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--gray-100);
}

.copyright {
  font-size: 12px;
  color: var(--text-color);
  opacity: 0.7;
  margin: 0;
  font-family: 'Product Sans', sans-serif;
}

.payment-methods img {
  height: 24px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .footer__container {
    max-width: 720px;
  }

  .footer__links {
    flex-direction: row;
    justify-content: space-around;
    text-align: left;
  }

  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* Estilos compartilhados para os modais */
:deep(.modal-title) {
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 24px;
  font-family: 'Product Sans', sans-serif;
}

:deep(.modal-body) {
  font-family: 'Product Sans', sans-serif;
}

:deep(.modal-body h3) {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
  margin: 24px 0 12px;
}

:deep(.modal-body p) {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 16px;
}

:deep(.modal-body ul) {
  list-style: disc;
  padding-left: 24px;
  margin-bottom: 16px;
}

:deep(.modal-body li) {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 8px;
}

:deep(.faq-item) {
  margin-bottom: 24px;
}
</style> 