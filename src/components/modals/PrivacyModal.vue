<template>
  <BaseModal @close="$emit('close')">
    <h2 class="modal-title">Política de Privacidade</h2>
    <div class="modal-body">
      <h3>1. Coleta de Informações</h3>
      <p>Coletamos apenas as informações necessárias para ativar seu personagem interativo:</p>
      <ul>
        <li>Nome da criança</li>
        <li>Informações básicas (idade, interesses)</li>
        <li>Informações de pagamento</li>
      </ul>

      <h3>2. Uso das Informações</h3>
      <p>Suas informações são usadas exclusivamente para:</p>
      <ul>
        <li>Personalizar as interações do personagem</li>
        <li>Processar seu pagamento</li>
        <li>Enviar atualizações sobre seu serviço</li>
      </ul>

      <h3>3. Proteção de Dados</h3>
      <p>Seus dados são protegidos com as mais avançadas tecnologias de segurança e nunca são compartilhados com terceiros.</p>
      
      <h3>4. Monitoramento de Conversas</h3>
      <p>Todas as conversas são monitoradas por sistemas automatizados apenas para garantir um ambiente seguro e adequado para crianças.</p>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'PrivacyModal',
  components: {
    BaseModal
  }
}
</script> 