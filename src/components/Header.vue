<template>
  <header class="header">
    <button class="header__menu-btn" @click="toggleMenu" aria-label="Menu">
      <div class="btn-circle">
        <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
      </div>
    </button>
    
    <router-link to="/" class="header__logo">
      <img src="/logo.png" alt="Logo" />
    </router-link>
    
    <button @click="goToPersonalization" class="header__cart-btn" aria-label="Criar Vídeo">
      <div class="btn-circle">
        <span class="material-icons">video_camera_front</span>
      </div>
    </button>

    <!-- Overlay do menu -->
    <div 
      class="menu-overlay" 
      :class="{ 'menu-overlay--active': isMenuOpen }"
      @click="toggleMenu"
    ></div>

    <!-- Menu mobile -->
    <div class="menu" :class="{ 'menu--active': isMenuOpen }">
      <div class="menu__header">
        <img src="/logo.png" alt="Logo" class="menu__logo" />
      </div>
      
      <nav class="menu__nav">
        <div class="menu__section">
          <h3 class="menu__section-title">Menu Principal</h3>
          <a href="#hero" @click.prevent="handleMenuClick('hero')" class="menu-item">
            <span class="material-icons">home</span>
            Início
          </a>
          <a href="#star-product" @click.prevent="handleMenuClick('star-product')" class="menu-item">
            <span class="material-icons">star</span>
            Vídeo do Coelho
          </a>
          <a href="#map-sell" @click.prevent="handleMenuClick('map-sell')" class="menu-item">
            <span class="material-icons">info</span>
            Como Funciona
          </a>
        </div>

        <div class="menu__section">
          <h3 class="menu__section-title">Informações</h3>
          <a href="#why-sell" @click.prevent="handleMenuClick('why-sell')" class="menu-item">
            <span class="material-icons">help</span>
            Por que Escolher
          </a>
          <a href="#carro-social-3" @click.prevent="handleMenuClick('carro-social-3')" class="menu-item">
            <span class="material-icons">groups</span>
            Depoimentos
          </a>
          <a href="#donation-social" @click.prevent="handleMenuClick('donation-social')" class="menu-item">
            <span class="material-icons">favorite</span>
            Doações
          </a>
        </div>

        <div class="menu__section">
          <h3 class="menu__section-title">Ações</h3>
          <button @click="goToPersonalization" class="menu-item menu-item--cta">
            <span class="material-icons">video_camera_front</span>
            Criar Vídeo
          </button>
        </div>
      </nav>

      <div class="menu__footer">
        <p class="menu__copyright">© 2025 Recadinho do Coelho da Páscoa. Todos os direitos reservados.</p>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { trackComponentEvent } from '@/utils/analytics'

export default {
  name: 'SiteHeader',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    const handleMenuClick = async (sectionId) => {
      console.log('Iniciando handleMenuClick para seção:', sectionId)
      
      // Fecha o menu
      isMenuOpen.value = false
      document.body.style.overflow = ''

      try {
        // Se não estiver na home, navega primeiro
        if (route.path !== '/') {
          console.log('Não está na home, navegando para /')
          await router.push('/')
          // Aguarda a navegação e renderização
          await new Promise(resolve => setTimeout(resolve, 100))
          console.log('Navegação concluída')
        }

        // Função para tentar fazer o scroll
        const attemptScroll = () => {
          console.log('Tentando fazer scroll para:', sectionId)
          const element = document.getElementById(sectionId)
          console.log('Elemento encontrado:', element)
          
          if (element) {
            // Usa scrollIntoView com offset
            const headerOffset = 70
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            
            // Ajusta o offset do header após o scroll
            setTimeout(() => {
              window.scrollBy({
                top: -headerOffset,
                behavior: 'smooth'
              })
            }, 100)

            console.log('Scroll executado com sucesso')
            return true
          }
          console.log('Elemento não encontrado')
          return false
        }

        // Tenta fazer o scroll imediatamente
        console.log('Tentativa 1 - Scroll imediato')
        if (attemptScroll()) return

        // Se não conseguiu, tenta novamente após um delay maior
        console.log('Tentativa 2 - Após 500ms')
        await new Promise(resolve => setTimeout(resolve, 500))
        if (attemptScroll()) return

        // Última tentativa após um delay ainda maior
        console.log('Tentativa 3 - Após 1000ms')
        await new Promise(resolve => setTimeout(resolve, 1000))
        attemptScroll()

      } catch (error) {
        console.error('Erro ao rolar para seção:', error)
        console.error('Stack trace:', error.stack)
      }
    }

    const goToPersonalization = async () => {
      isMenuOpen.value = false
      document.body.style.overflow = ''
      
      // Track the event based on where the click came from
      if (isMenuOpen.value) {
        trackComponentEvent.header.mobileMenuCreateVideo()
      } else {
        trackComponentEvent.header.createVideo()
      }

      await router.push({ 
        name: 'personalizar-quantidade'
      })
    }

    return {
      isMenuOpen,
      toggleMenu,
      handleMenuClick,
      goToPersonalization
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 1000;
  pointer-events: none;
}

.header__menu-btn,
.header__cart-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--accent-blue);
  pointer-events: auto;
  position: relative;
  transition: transform 0.2s ease;
}

.header__menu-btn:active,
.header__cart-btn:active {
  transform: scale(0.95);
}

.btn-circle {
  width: 44px;
  height: 44px;
  background-color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.btn-circle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-circle .material-icons {
  font-size: 22px;
  color: var(--primary-color);
}

.header__logo {
  border: 1px solid var(--gray-100);
  height: 60px;
  display: flex;
  align-items: center;
  pointer-events: auto;
  transition: transform 0.2s ease;
  border-radius: 360px;
}

.header__logo:active {
  transform: scale(0.95);
}

.header__logo img {
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  box-shadow: 1px 1px 1px 1px var(--accent-blue, 60%, 50%, 30%, 15%);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 5;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 998;
  pointer-events: none;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.menu-overlay--active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background: var(--white);
  z-index: 999;
  pointer-events: auto;
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.menu--active {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

.menu__header {
  padding: 20px;
  border-bottom: 1px solid var(--gray-100);
}

.menu__logo {
  height: 50px;
  object-fit: contain;
}

.menu__nav {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.menu__section {
  margin-bottom: 24px;
}

.menu__section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-left: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  position: relative;
  overflow: hidden;
  margin-bottom: 4px;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.menu-item:hover::before,
.menu-item.router-link-active::before {
  opacity: 1;
}

.menu-item .material-icons {
  font-size: 24px;
  color: var(--primary-color);
  transition: transform 0.2s ease;
}

.menu-item:hover .material-icons {
  transform: scale(1.1);
}

.menu-item:hover {
  background: var(--gray-50);
  transform: translateX(4px);
}

.menu-item--cta {
  background: var(--gradient-primary);
  color: var(--white);
  justify-content: center;
  font-weight: 600;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 89, 255, 0.2);
  margin-top: 8px;
}

.menu-item--cta .material-icons,
.menu-item--whatsapp .material-icons {
  color: var(--white);
}

.menu-item--cta:hover,
.menu-item--whatsapp:hover {
  transform: translateY(-2px);
}

.menu-item--cta:hover {
  box-shadow: 0 6px 16px rgba(0, 89, 255, 0.3);
}

.menu-item--whatsapp:hover {
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
}

.menu-item.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
  background: var(--gray-50);
}

.menu__footer {
  padding: 20px;
  border-top: 1px solid var(--gray-100);
}

.menu__copyright {
  font-size: 12px;
  color: var(--gray-500);
  text-align: center;
}

@media (min-width: 768px) {
  .header {
    padding: 0 32px;
  }
  
  .menu {
    padding: 0;
  }
}
</style> 