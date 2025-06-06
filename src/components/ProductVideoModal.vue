<template>
  <div v-if="show" class="product-video-modal" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <!--<button class="close-button" @click="$emit('close')">
        <span class="material-icons">close</span>
       </button>-->
      <iframe
        :src="videoUrl"
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductVideoModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    }
  },
  emits: ['close']
})
</script>

<style scoped>
.product-video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.2s;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.close-button .material-icons {
  color: white;
  font-size: 24px;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }
  
  .close-button {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }
}
</style> 