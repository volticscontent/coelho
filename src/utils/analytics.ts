// Tipos de eventos
export interface AnalyticsEvent {
  event_name: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  event_value?: number;
  component?: string;
  button_text?: string;
  // Propriedades para e-commerce
  item_id?: string | number;
  item_name?: string;
  price?: number;
  cart_value?: number;
  items?: Record<string, unknown>[];
  // Propriedades para personalização
  personalization_step?: string;
  from_step?: string;
  to_step?: string;
  step_data?: unknown;
  criancas?: number;
}

// Função principal para enviar eventos
export const trackEvent = (eventData: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventData.event_name, {
        ...eventData
      });
    } catch (error) {
      // Em desenvolvimento, apenas loga os eventos sem erro
      if (process.env.NODE_ENV !== 'production') {
        console.log('Tracking event in development:', eventData);
      } else {
        console.error('Error tracking event:', error);
      }
    }
  }
};

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

  // Hero
  hero: {
    orderNow: () => trackEvent({
      event_name: 'hero_order_now',
      event_category: 'engagement',
      event_action: 'click',
      component: 'Hero',
      button_text: 'Pedir agora'
    }),
    watchVideo: () => trackEvent({
      event_name: 'hero_watch_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'Hero',
      button_text: 'Ver vídeo'
    })
  },

  // WhySell
  whySell: {
    createVideo: () => trackEvent({
      event_name: 'why_sell_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'WhySell',
      button_text: 'Criar vídeo'
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

  // MapSell
  mapSell: {
    createVideo: () => trackEvent({
      event_name: 'map_sell_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'MapSell',
      button_text: 'Criar vídeo agora'
    })
  },

  // SpecialistSocial
  specialistSocial: {
    createVideo: () => trackEvent({
      event_name: 'specialist_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'SpecialistSocial',
      button_text: 'Criar vídeo do coelhinho agora'
    }),
    learnMore: () => trackEvent({
      event_name: 'specialist_learn_more',
      event_category: 'engagement',
      event_action: 'click',
      component: 'SpecialistSocial',
      button_text: 'Saiba Mais'
    })
  },

  // StartProduct
  startProduct: {
    customizeVideo: () => trackEvent({
      event_name: 'start_product_customize',
      event_category: 'engagement',
      event_action: 'click',
      component: 'StartProduct',
      button_text: 'Personalizar vídeo'
    }),
    watchExample: () => trackEvent({
      event_name: 'start_product_watch_example',
      event_category: 'engagement',
      event_action: 'click',
      component: 'StartProduct',
      button_text: 'Ver exemplo'
    })
  },

  // StarProduct1
  starProduct1: {
    createVideo: () => trackEvent({
      event_name: 'star_product_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'StarProduct1',
      button_text: 'Criar vídeo'
    })
  },

  // CarroSocial3
  carroSocial3: {
    createVideo: () => trackEvent({
      event_name: 'carro_social_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'CarroSocial3',
      button_text: 'CRIAR VIDEO'
    })
  },

  // Garantias
  garantias: {
    createVideo: () => trackEvent({
      event_name: 'garantias_create_video',
      event_category: 'engagement',
      event_action: 'click',
      component: 'Garantias',
      button_text: 'Criar vídeo agora'
    })
  }
};

// Declare o tipo gtag no window
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (command: string, event: string, params: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (event: string, ...args: any[]) => void;
  }
}

// Evento de E-commerce: begin_checkout (convenção GA4)
export const trackBeginCheckout = (data: {
  value: number;
  currency?: string;
  items: { item_name: string; quantity: number; price: number; item_category?: string }[];
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'begin_checkout', {
        value: data.value,
        currency: data.currency || 'BRL',
        items: data.items.map((item, index) => ({
          item_id: `video_coelho_${index}`,
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price,
          item_category: item.item_category || 'Video Personalizado'
        }))
      });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('begin_checkout event in development:', data);
      } else {
        console.error('Error tracking begin_checkout:', error);
      }
    }
  }
};

export const trackPageView = (url?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'page_view', {
        page_location: url || window.location.href,
        page_title: document.title
      });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Google Analytics PageView event in development');
      } else {
        console.error('Error tracking Google Analytics PageView:', error);
      }
    }
  }

  if (typeof window !== 'undefined' && window.fbq) {
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('Error tracking Facebook PageView:', error);
    }
  }
};

export const trackInitiateCheckout = () => {
  if (window.fbq) {
    try {
      window.fbq('track', 'InitiateCheckout');
    } catch (error) {
      console.error('Error tracking Facebook InitiateCheckout:', error);
    }
  }
};

export const trackAddToCart = () => {
  if (window.fbq) {
    try {
      window.fbq('track', 'AddToCart');
    } catch (error) {
      console.error('Error tracking Facebook AddToCart:', error);
    }
  }
}; 