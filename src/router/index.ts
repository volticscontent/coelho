import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { isMobile } from '@/middleware/deviceDetection'
import { trackPageView } from '@/utils/analytics'
const HomeView = () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
const DesktopBlock = () => import(/* webpackChunkName: "desktop" */ '../views/DesktopBlock.vue')
const AdminAuth = () => import(/* webpackChunkName: "admin" */ '../views/AdminAuth.vue')
const PersonalizarView = () => import(/* webpackChunkName: "personalizar" */ '@/views/PersonalizarView.vue')
const PersSteps = () => import(/* webpackChunkName: "personalizar-steps" */ '@/components/personalization/PersSteps.vue')
const ObrigadoView = () => import(/* webpackChunkName: "obrigado" */ '@/views/ObrigadoView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Recadinho do Coelho da Páscoa - Vídeos Personalizados'
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
    path: '/obrigado',
    name: 'obrigado',
    component: ObrigadoView,
    meta: {
      title: 'Obrigado pela Compra! - Recadinho do Coelho da Páscoa'
    }
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
      title: 'Personalizar Vídeo - Recadinho do Coelho da Páscoa',
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
          title: 'Quantidade de Crianças - Recadinho do Coelho da Páscoa',
          scrollToTop: true
        }
      },
      {
        path: 'extras',
        name: 'personalizar-extras',
        component: PersSteps,
        meta: {
          title: 'Opções Extras - Recadinho do Coelho da Páscoa',
          scrollToTop: true
        }
      },
      {
        path: 'contato',
        name: 'personalizar-contato',
        component: PersSteps,
        meta: {
          title: 'Informações de Contato - Recadinho do Coelho da Páscoa',
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

// Dispara evento de page view
router.afterEach((to) => {
  trackPageView(window.location.origin + to.fullPath)
})

export default router
