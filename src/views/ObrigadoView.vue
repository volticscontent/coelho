<template>
  <div class="thank-you-view">
    <div class="thank-you-content">
      <span class="material-icons success-icon">check_circle</span>
      <h1>Pagamento Confirmado!</h1>
      <p>Sua compra foi aprovada com sucesso. Muito obrigado por confiar no nosso trabalho.</p>
      
      <div class="cta-box">
        <h3>Próximo passo:</h3>
        <p>Seu video será entregue em até 24 horas no e-mail!. Qualquer dúvida clique no botão abaixo!</p>
        <a :href="whatsappLink" target="_blank" class="whatsapp-btn">
          <span class="material-icons">chat</span>
          Falar no WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ObrigadoView',
  setup() {
    // Número a definir pelo usuário 
    const whatsappLink = ref('https://wa.me/553184865510?text=Olá!%20Acabei%20de%20fazer%20o%20pagamento%20do%20vídeo%20do%20Coelho!');
    
    onMounted(async () => {
      const sessionId = localStorage.getItem('rabbit_session_id');
      
      if (sessionId) {
        console.log('Confirmando sessão:', sessionId);
        try {
          const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';
          const response = await fetch(`${apiUrl}/checkout/confirm`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId })
          });
          
          if (response.ok) {
             console.log('Venda confirmada com sucesso no backend!');
             // Remove session id após confirmação (opcional ou manter por garantia if needs refresh)
             localStorage.removeItem('rabbit_session_id');
          } else {
             console.error('Erro ao confirmar venda no backend.');
          }
        } catch (error) {
          console.error('Erro de rede na confirmação da venda', error);
        }
      } else {
        console.warn('Nenhuma sessão pendente encontrada no localStorage.');
      }
    });

    return {
      whatsappLink
    }
  }
})
</script>

<style scoped>
.thank-you-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--gray-50);
}

.thank-you-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.success-icon {
  font-size: 64px;
  color: #25d390!important;
  margin-bottom: 20px;
}

h1 {
  color: var(--text-color);
  font-size: 28px;
  margin-bottom: 12px;
}

p {
  color: var(--gray-400);
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.cta-box {
  background: var(--gray-50);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
}

.cta-box h3 {
  color: var(--text-color);
  font-size: 18px;
  margin-bottom: 8px;
}

.material-icons {
  color: white;
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #25d390;
  color: white;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  transition: transform 0.2s, background 0.2s;
  margin-top: 16px;
}

.whatsapp-btn:hover {
  background: #128C7E;
  transform: translateY(-2px);
}
</style>
