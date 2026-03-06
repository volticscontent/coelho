import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { preventInspect } from './middleware/deviceDetection'
import './assets/main.css'
import ResizeObserver from 'resize-observer-polyfill'
import { setupScrollBehavior } from './utils/scroll'

// Polyfill para ResizeObserver
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver
}

// Previne inspeção em produção
if (process.env.NODE_ENV === 'production') {
  preventInspect()
}

// Configura o comportamento de scroll
setupScrollBehavior()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
