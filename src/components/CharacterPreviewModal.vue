<template>
  <div v-if="show" class="character-preview-modal" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">
        <span class="material-icons">close</span>
      </button>
      <div class="preview-container">
        <div class="character-chat">
          <div class="chat-header">
            <img :src="characterImage" alt="Personagem" class="character-avatar" />
            <h3>{{ characterName }}</h3>
          </div>
          <div class="chat-messages">
            <div class="message character-message">
              <p>Olá! Que bom te conhecer! Como você está hoje?</p>
              <span class="message-time">10:30</span>
            </div>
            <div class="message user-message">
              <p>Oi! Estou bem! O que você gosta de fazer?</p>
              <span class="message-time">10:31</span>
            </div>
            <div class="message character-message">
              <p>Eu adoro cantar, dançar e contar histórias! Quer ouvir uma história mágica?</p>
              <span class="message-time">10:32</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterPreviewModal',
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
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }
}
</script>

<style scoped>
.character-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.close-button .material-icons {
  color: var(--white);
  font-size: 24px;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.preview-container {
  width: 100%;
  height: 500px;
}

.character-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd5;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #075e54;
  color: white;
}

.character-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
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

.message-time {
  font-size: 11px;
  color: #999;
  display: block;
  text-align: right;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .character-preview-modal {
    padding: 16px;
  }

  .close-button {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }

  .close-button .material-icons {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .character-preview-modal {
    padding: 8px;
  }
  
  .preview-container {
    height: 400px;
  }
}
</style> 