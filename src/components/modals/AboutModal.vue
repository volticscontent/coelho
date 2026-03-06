<template>
  <BaseModal @close="$emit('close')">
    <h2 class="modal-title">Nossa História</h2>
    <div class="modal-body">
      <p>A Surpresa do Coelho da Páscoa nasceu com uma missão: trazer mais magia e alegria para a vida das crianças através de experiências interativas e personalizadas.</p>
      
      <h3>Nossa Missão</h3>
      <p>Criar videos mágicos que estimulam a imaginação, fortalecem os laços familiares e inspiram sorrisos diariamente.</p>

      <h3>Nossos Valores</h3>
      <ul>
        <li>Interações de qualidade e seguras</li>
        <li>Conteúdo educativo e divertido</li>
        <li>Inovação tecnológica constante</li>
        <li>Foco na experiência da criança</li>
      </ul>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'AboutModal',
  components: {
    BaseModal
  }
}
</script> 