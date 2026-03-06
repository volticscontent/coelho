<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="$emit('close')">
          <span class="material-icons">close</span>
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal-content {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--gray-50);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--gray-100);
  transform: scale(1.05);
  color: var(--accent-pink);
}
</style> 