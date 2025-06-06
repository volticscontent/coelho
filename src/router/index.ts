import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DesktopBlock from '../views/DesktopBlock.vue'
import AdminAuth from '../views/AdminAuth.vue'
import { isMobile } from '../middleware/deviceDetection'
import PersonalizarView from '@/views/PersonalizarView.vue'
import PersSteps from '@/components/personalization/PersSteps.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Recadinho do Stitch - Vídeos Personalizados'
    },
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const isAdmin = localStorage.getItem('isAdmin') === 'true'
      if (!isMobile() && !isAdmin) {
        next({ name: 'desktop-block' })
      } else {
        next()
      }
    }
  },
  {
    path: '/desktop-block',
    name: 'desktop-block',
    component: DesktopBlock
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminAuth
  },
  {
    path: '/personalizar',
    name: 'personalizar',
    component: PersonalizarView,
    meta: {
      title: 'Personalizar Vídeo - Recadinho do Stitch',
      scrollToTop: true
    },
    children: [
      {
        path: '',
        redirect: '/personalizar/quantidade'
      },
      {
        path: 'quantidade',
        name: 'personalizar-quantidade',
        component: PersSteps,
        meta: {
          title: 'Quantidade de Crianças - Recadinho do Stitch',
          scrollToTop: true
        }
      },
      {
        path: 'extras',
        name: 'personalizar-extras',
        component: PersSteps,
        meta: {
          title: 'Opções Extras - Recadinho do Stitch',
          scrollToTop: true
        }
      },
      {
        path: 'contato',
        name: 'personalizar-contato',
        component: PersSteps,
        meta: {
          title: 'Informações de Contato - Recadinho do Stitch',
          scrollToTop: true
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'personalizar' || to.meta.scrollToTop) {
      return {
        top: 0,
        behavior: 'auto',
        immediate: true
      }
    }

    if (to.hash) {
      return { 
        el: to.hash,
        behavior: 'smooth',
        offset: { y: 70 } // offset do header
      }
    }

    if (savedPosition) {
      return savedPosition
    }

    return { 
      top: 0,
      behavior: 'smooth',
      immediate: false
    }
  }
})

// Atualiza título da página
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = to.meta.title as string || 'Block'
  next()
})

export default router
