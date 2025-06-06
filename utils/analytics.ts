// Tipos de eventos
export interface AnalyticsEvent {
  event_name: string
  event_category: string
  event_action: string
  event_label?: string
  event_value?: number
  component?: string
  button_text?: string
  // Propriedades para e-commerce
  item_id?: string | number
  item_name?: string
  price?: number
  cart_value?: number
  items?: any[]
  // Propriedades para personalização
  from_step?: number
  to_step?: number
  step_data?: any
}

// Função principal para enviar eventos
export const trackEvent = (eventData: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventData.event_name, {
      ...eventData
    })
  }
}

// Eventos específicos por componente
export const trackComponentEvent = {
  // Header
  header: {
    createVideo: () => trackEvent({
      event_name: 'header_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'Header',
      button_text: 'Criar Vídeo'
    }),
    mobileMenuCreateVideo: () => trackEvent({
      event_name: 'mobile_menu_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'Header',
      button_text: 'Criar Vídeo'
    })
  },

  // WhyUpsell
  whyUpsell: {
    multipleKids: () => trackEvent({
      event_name: 'select_upsell',
      event_category: 'Upsell',
      event_action: 'click',
      event_label: 'multiple_kids',
      component: 'WhyUpsell',
      button_text: 'Ver opções'
    }),
    magicVideo: () => trackEvent({
      event_name: 'select_upsell',
      event_category: 'Upsell',
      event_action: 'click',
      event_label: 'magic_video',
      component: 'WhyUpsell',
      button_text: 'Saiba mais'
    }),
    cinematicQuality: () => trackEvent({
      event_name: 'select_upsell',
      event_category: 'Upsell',
      event_action: 'click',
      event_label: 'cinematic_quality',
      component: 'WhyUpsell',
      button_text: 'Ver detalhes'
    }),
    fastDelivery: () => trackEvent({
      event_name: 'select_upsell',
      event_category: 'Upsell',
      event_action: 'click',
      event_label: 'fast_delivery',
      component: 'WhyUpsell',
      button_text: 'Como funciona'
    })
  },

  // ... (resto do código permanece igual)
}

// ... (resto do código permanece igual) 