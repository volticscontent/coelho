<template>
  <div v-if="show" class="character-demo-modal" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="$emit('close')">
        <span class="material-icons">close</span>
      </button>
      <div class="demo-container">
        <div class="character-info">
          <img :src="characterImage" alt="Personagem" class="character-image" />
          <h3>{{ characterName }}</h3>
        </div>
        <div class="chat-simulation">
          <div class="message-container">
            <div class="message character-message">
              <div class="audio-message">
                <span class="material-icons play-icon">play_circle</span>
                <div class="audio-wave">
                  <div class="wave-bar" v-for="n in 20" :key="n"></div>
                </div>
                <span class="audio-duration">0:15</span>
              </div>
            </div>
            <div class="message user-message">
              <p>Qual é a sua música favorita?</p>
            </div>
            <div class="message character-message">
              <div class="audio-message">
                <span class="material-icons play-icon">play_circle</span>
                <div class="audio-wave">
                  <div class="wave-bar" v-for="n in 20" :key="n"></div>
                </div>
                <span class="audio-duration">0:22</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CharacterDemoModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    characterName: {
      type: String,
      default: 'Personagem'
    },
    characterImage: {
      type: String,
      default: require('@/assets/imgs/default-character.png')
    }
  },
  emits: ['close']
})
</script>

<style scoped>
.character-demo-modal {
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
  max-width: 400px;
  height: 500px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

.demo-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.character-info {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #075e54;
  color: white;
}

.character-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.chat-simulation {
  flex: 1;
  padding: 16px;
  background: #e5ddd5;
  overflow-y: auto;
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 8px;
}

.character-message {
  align-self: flex-start;
  background: white;
}

.user-message {
  align-self: flex-end;
  background: #dcf8c6;
}

.message p {
  margin: 0;
  font-size: 14px;
}

.audio-message {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 180px;
}

.play-icon {
  color: #075e54;
  font-size: 32px;
}

.audio-wave {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  height: 30px;
}

.wave-bar {
  width: 2px;
  background: #075e54;
  height: 100%;
  opacity: 0.5;
  transform-origin: bottom;
}

.wave-bar:nth-child(odd) {
  height: 60%;
}

.wave-bar:nth-child(3n) {
  height: 80%;
}

.wave-bar:nth-child(5n) {
  height: 40%;
}

.audio-duration {
  font-size: 12px;
  color: #888;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    height: 450px;
  }
  
  .close-button {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }
}
</style> 