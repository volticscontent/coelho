<template>
  <BaseModal @close="$emit('close')">
    <h2 class="modal-title">Perguntas Frequentes</h2>
    <div class="modal-body">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <h3>{{ faq.question }}</h3>
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'FaqModal',
  components: {
    BaseModal
  },
  data() {
    return {
      faqs: [
        {
          question: 'Quanto tempo leva para ativar o personagem?',
          answer: 'A ativação é instantânea! Assim que confirmado o pagamento, você receberá o link para começar a conversar.'
        },
        {
          question: 'Como funciona a personalização?',
          answer: 'Você escolhe o personagem, adiciona informações sobre a criança (nome, idade, interesses) e o personagem usará essas informações nas conversas.'
        },
        {
          question: 'As conversas são seguras para crianças?',
          answer: 'Sim! Todas as interações são monitoradas e projetadas especificamente para serem seguras e adequadas para crianças.'
        },
        {
          question: 'Posso pedir reembolso?',
          answer: 'Sim, garantimos reembolso total em até 7 dias após a compra se você não ficar satisfeito com o serviço.'
        },
        {
          question: 'Por quanto tempo o personagem fica ativo?',
          answer: 'O personagem fica disponível por 30 dias após a ativação. Você pode renovar a assinatura ao final deste período.'
        }
      ]
    }
  }
}
</script> 