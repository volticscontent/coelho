<template>
  <div class="contact-step">
    <h2 class="step-title">Informações das Crianças</h2>
    <p class="step-description">Preencha os dados de cada criança que aparecerá no vídeo</p>

    <!-- Formulário das Crianças -->
    <div class="children-form">
      <div v-for="(child, index) in children" :key="index" class="child-card">
        <h3 class="child-title">Criança {{ index + 1 }}</h3>
        
        <div class="form-group" :class="{ 'error': !child.name }">
          <label>Nome da Criança</label>
          <div class="input-wrapper">
            <span class="material-icons input-icon">child_care</span>
            <input 
              type="text" 
              :value="child.name"
              @input="(e) => {
                const updatedChildren = [...children]
                updatedChildren[index] = { ...child, name: (e.target as HTMLInputElement).value }
                emit('update', { ...quizData, children: updatedChildren })
              }"
              placeholder="Digite o nome"
              required
              class="form-input"
              :class="{ 'error': !child.name }"
              :name="`child${index + 1}Name`"
            >
          </div>
          <span class="error-message" v-if="!child.name">
            Nome da criança é obrigatório
          </span>
        </div>

        <div class="form-group" :class="{ 'error': !child.age }">
          <label>Idade</label>
          <div class="input-wrapper">
            <span class="material-icons input-icon">cake</span>
            <input 
              type="number" 
              :value="child.age"
              @input="(e) => {
                const updatedChildren = [...children]
                updatedChildren[index] = { ...child, age: Number((e.target as HTMLInputElement).value) }
                emit('update', { ...quizData, children: updatedChildren })
              }"
              min="0"
              placeholder="Idade da criança"
              required
              class="form-input"
              :class="{ 'error': !child.age }"
              :name="`child${index + 1}Age`"
            >
          </div>
          <span class="error-message" v-if="!child.age">
            Idade da criança é obrigatória
          </span>
        </div>

        <div class="form-group photo-upload" :class="{ 'error': errors[`child${index + 1}Photo`] }" v-if="props.hasPhotoOption">
          <label>Foto da Criança</label>
          <div class="photo-preview" v-if="child.photoPreview">
            <img :src="child.photoPreview" alt="Preview">
          </div>
          <div class="file-input-wrapper" :class="{ 'error': errors[`child${index + 1}Photo`] }">
            <input 
              type="file" 
              accept="image/*"
              @change="handlePhotoUpload($event, index)"
              required
              class="form-input file-input"
            >
            <div class="file-input-content">
              <span class="material-icons">add_a_photo</span>
              <span class="file-input-label">Clique para escolher uma foto</span>
            </div>
          </div>
          <div class="error-container">
            <span class="error-message" v-if="errors[`child${index + 1}Photo`]">
              {{ errors[`child${index + 1}Photo`] }}
            </span>
          </div>
          <p class="photo-hint">Envie uma foto clara da criança</p>
        </div>
      </div>
    </div>

    <h2 class="child-title">Informações do Responsável</h2>
    <p class="step-description">Preencha seus dados para receber o vídeo</p>

    <!-- Formulário do Responsável -->
    <div class="contact-form">
      <div class="form-group" :class="{ 'error': !quizData.contactName }">
        <label>Nome do Responsável</label>
        <div class="input-wrapper">
          <span class="material-icons input-icon">person</span>
          <input 
            type="text" 
            :value="quizData.contactName"
            @input="(e) => emit('update', { ...quizData, contactName: (e.target as HTMLInputElement).value })"
            placeholder="Digite seu nome completo"
            required
            class="form-input"
            :class="{ 'error': !quizData.contactName }"
            name="contactName"
          >
        </div>
        <span class="error-message" v-if="!quizData.contactName">
          Nome do responsável é obrigatório
        </span>
      </div>

      <div class="form-group" :class="{ 'error': !quizData.contactEmail }">
        <label>E-mail</label>
        <div class="input-wrapper">
          <span class="material-icons input-icon">email</span>
          <input 
            type="email" 
            :value="quizData.contactEmail"
            @input="(e) => emit('update', { ...quizData, contactEmail: (e.target as HTMLInputElement).value })"
            placeholder="Digite seu e-mail"
            required
            class="form-input"
            :class="{ 'error': !quizData.contactEmail }"
            name="contactEmail"
          >
        </div>
        <span class="error-message" v-if="!quizData.contactEmail">
          E-mail é obrigatório
        </span>
      </div>

      <div class="form-group" :class="{ 'error': !quizData.contactPhone }">
        <label>WhatsApp</label>
        <div class="input-wrapper">
          <span class="material-icons input-icon">whatsapp</span>
          <input 
            type="tel" 
            :value="quizData.contactPhone"
            @input="(e) => emit('update', { ...quizData, contactPhone: (e.target as HTMLInputElement).value })"
            placeholder="(00) 00000-0000"
            required
            class="form-input"
            :class="{ 'error': !quizData.contactPhone }"
            name="contactPhone"
          >
        </div>
        <span class="error-message" v-if="!quizData.contactPhone">
          WhatsApp é obrigatório
        </span>
      </div>

      <div class="form-group" :class="{ 'error': !quizData.message }">
        <label>Mensagem Personalizada</label>
        <div class="input-wrapper">
          <span class="material-icons input-icon">message</span>
          <textarea 
            :value="quizData.message"
            @input="(e) => emit('update', { ...quizData, message: (e.target as HTMLTextAreaElement).value })"
            placeholder="Digite uma mensagem especial para as crianças"
            maxlength="200"
            required
            class="form-input"
            :class="{ 'error': !quizData.message }"
            name="message"
          ></textarea>
        </div>
        <span class="error-message" v-if="!quizData.message">
          Mensagem é obrigatória
        </span>
      </div>

      <!-- Checkbox de Concordância -->
      <div class="consent-group">
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            id="consent"
            :checked="consent"
            @change="(e) => handleConsentChange((e.target as HTMLInputElement).checked)"
            class="consent-checkbox"
          >
          <label for="consent" class="consent-label">
            Concordo em receber o vídeo personalizado e ofertas especiais por WhatsApp
          </label>
        </div>
      </div>

      <!-- Nova Checkbox de Compromisso -->
      <div class="consent-group commitment-consent">
        <div class="checkbox-wrapper highlighted">
          <input 
            type="checkbox" 
            id="dataCommitment"
            :checked="dataCommitment"
            @change="(e) => handleDataCommitmentChange((e.target as HTMLInputElement).checked)"
            class="consent-checkbox"
            required
          >
          <label for="dataCommitment" class="consent-label commitment-label">
            Concordo em preencher os dados do formulário e do pagamento da mesma forma, ou seja, prencher o mesmo nome, email e telefone de CONTATO para que o vídeo seja enviado corretamente!
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { QuizData, Child } from '@/types/quiz'

// eslint-disable-next-line no-undef
const props = defineProps<{
  quizData: QuizData
  hasPhotoOption: boolean
}>()

// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'update', data: QuizData): void
  (e: 'validation-error', errors: Record<string, string>): void
}>()

const errors = ref<Record<string, string>>({})

// Garantir que as crianças sejam inicializadas corretamente
const children = computed<Child[]>(() => {
  if (!props.quizData.children || props.quizData.children.length === 0) {
    // Criar crianças com nomes vazios em vez de nomes padrão
    return Array(props.quizData.quantity).fill(null).map(() => ({
      name: '',
      age: null,
      photo: null,
      photoPreview: null
    } as Child))
  }
  return props.quizData.children
})

// Referência local para o campo consent que não está no QuizData
const consent = ref(false)

// Adicionar nova referência para o compromisso de dados
const dataCommitment = ref(false)

const handleConsentChange = (checked: boolean) => {
  consent.value = checked
  // Não enviamos o consent no objeto QuizData, já que não faz parte do tipo
  emit('update', {
    ...props.quizData
  })
}

const handleDataCommitmentChange = (checked: boolean) => {
  dataCommitment.value = checked
  emit('update', {
    ...props.quizData,
    dataCommitment: checked
  })
}

const handlePhotoUpload = (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const updatedChildren = [...children.value]
    updatedChildren[index] = {
      ...updatedChildren[index],
      photo: file, // Armazena o arquivo File original
      photoPreview: e.target?.result as string
    }
    
    // Atualizamos apenas as propriedades existentes no QuizData
    emit('update', {
      ...props.quizData,
      children: updatedChildren
    })
    
    // Log para confirmar o upload da foto
    console.log(`[PersContact] Foto para criança ${index + 1} (${updatedChildren[index].name}) armazenada:`, {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      photoStored: !!updatedChildren[index].photo
    })
  }
  reader.readAsDataURL(file)
}

const ensureValidNames = () => {
  if (!children.value) return;
  
  // Verificar se alguma criança tem nome vazio
  const emptyNames = children.value.filter(child => !child.name || child.name.trim() === '');
  
  if (emptyNames.length > 0) {
    console.log('[PersContact] Detectados nomes vazios:', emptyNames.length);
    
    // Adicionar erros para cada nome vazio
    children.value.forEach((child, index) => {
      if (!child.name || child.name.trim() === '') {
        errors.value[`child${index + 1}Name`] = `O nome da criança ${index + 1} é obrigatório`;
      } else {
        // Remover o erro se o nome foi preenchido
        delete errors.value[`child${index + 1}Name`];
      }
    });
    
    // Emitir evento de erro de validação
    emit('validation-error', errors.value);
    
    return false;
  } else {
    console.log('[PersContact] Todos os nomes estão preenchidos:', children.value.map(c => c.name));
    
    // Limpar quaisquer erros de nome
    children.value.forEach((_, index) => {
      delete errors.value[`child${index + 1}Name`];
    });
    
    return true;
  }
}

// Verificar nomes ao inicializar
onMounted(() => {
  ensureValidNames();
});
</script>

<style scoped>
.contact-step {
  max-width: 600px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-title {
  font-size: 24px;
  margin-top: 20px!important;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  font-family: "Fertigo Pro", serif;
}

.step-description {
  font-size: 20px;
  color: var(--black);
  margin-bottom: 32px;
  line-height: 2;
}

.children-form {
  display: grid;
  gap: 24px;
  margin-bottom: 40px;
}

.child-card {
  background: var(--white);
  border-radius: 16px;
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 28px;
}

.child-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(0, 162, 255, 0.1);
}

.child-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 24px;
  font-family: "Fertigo Pro", serif;
  display: flex;
  align-items: center;
  gap: 12px;
}

.child-title::before {
  content: '';
  width: 6px;
  height: 32px;
  background: var(--accent-blue);
  border-radius: 4px;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
  background: var(--white);
  border-radius: 16px;
  transition: all 0.2s ease;
  padding: 24px;
}

.form-group:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 162, 255, 0.1);
}

.form-group.error {
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.02);
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
  font-family: "Fertigo Pro", serif;
}

.form-group label::before {
  content: '';
  width: 4px;
  height: 24px;
  background: var(--accent-blue);
  border-radius: 4px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  font-size: 22px;
  pointer-events: none;
  transition: color 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 0.1px solid var(--gray-400);
  border-radius: 12px;
  font-size: 16px;
  color: var(--text-color);
  background: var(--white);
  transition: all 0.3s ease;
  line-height: 1.5;
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 162, 255, 0.1);
  outline: none;
}

.form-input.error {
  border-color: #dc3545;
  background: rgba(220, 53, 69, 0.02);
}

.form-input.error + .input-icon {
  color: #dc3545;
}

.error-message {
  display: block;
  font-size: 14px;
  color: #dc3545;
  font-weight: 500;
  background: rgba(220, 53, 69, 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 12px;
  text-align: center;
  border: 1px solid rgba(220, 53, 69, 0.2);
}

.file-input-wrapper {
  position: relative;
  width: 100%;
  border: 2px dashed var(--gray-300);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
  background: var(--white);
  cursor: pointer;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.file-input-wrapper.error {
  border-color: #dc3545 !important;
  border-style: solid !important;
  background: rgba(220, 53, 69, 0.02) !important;
  animation: errorPulse 2s infinite !important;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15) !important;
}

.file-input-wrapper.error:hover {
  border-color: #dc3545 !important;
  background: rgba(220, 53, 69, 0.05) !important;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  padding: 0;
  border: none;
  z-index: 2;
}

.file-input-content {
  display: flex;
  background-color: var(--gradient-primary);
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.file-input-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 162, 255, 0.05), rgba(0, 162, 255, 0.1));
  border-radius: 12px;
  z-index: -1;
  transition: all 0.3s ease;
}

.file-input-wrapper:hover .file-input-content::before {
  background: linear-gradient(45deg, rgba(0, 162, 255, 0.1), rgba(0, 162, 255, 0.15));
}

.file-input-wrapper.error .file-input-content::before {
  background: linear-gradient(45deg, rgba(220, 53, 69, 0.05), rgba(220, 53, 69, 0.1)) !important;
}

.file-input-content .material-icons {
  font-size: 48px;
  color: var(--accent-blue);
  transition: all 0.3s ease;
}

.file-input-wrapper:hover .material-icons {
  color: var(--primary-color);
  transform: scale(1.1);
}

.file-input-wrapper.error .material-icons {
  color: #dc3545;
}

.file-input-label {
  font-size: 18px;
  color: var(--gray-600);
  text-align: center;
  font-weight: 500;
  transition: all 0.3s ease;
}

.file-input-wrapper:hover .file-input-label {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.file-input-wrapper.error .file-input-label {
  color: #dc3545;
}

.photo-preview {
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 162, 255, 0.15);
  position: relative;
  transition: all 0.3s ease;
}

.photo-preview:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 162, 255, 0.2);
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.photo-preview::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}

.photo-hint {
  font-size: 14px;
  color: var(--gray-500);
  margin-top: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.file-input-wrapper:hover .photo-hint {
  color: var(--primary-color);
}

.file-input-wrapper.error .photo-hint {
  color: #dc3545;
}

.error-container {
  min-height: 20px;
  margin-top: 8px;
  text-align: center;
  width: 100%;
}

.contact-form {
  background: var(--white);
  border-radius: 16px;
  padding: 28px;
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contact-form:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(0, 162, 255, 0.1);
}

textarea.form-input {
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
  padding: 16px 16px 16px 48px;
}

textarea.form-input + .input-icon {
  top: 24px;
  transform: none;
  color: var(--accent-blue);
}

.consent-group {
  margin-top: 24px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-radius: 8px;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.consent-checkbox {
  width: 16px;
  height: 16px;
  margin-top: 3px;
  accent-color: var(--primary-color);
  cursor: pointer;
  border: 1px solid var(--gray-400);
  border-radius: 2px;
}

.consent-label {
  font-size: 14px;
  color: var(--gray-600);
  line-height: 1.5;
  cursor: pointer;
  margin: 0;
  font-weight: 400;
}

.commitment-consent {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 2px solid #0088cc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.commitment-consent .checkbox-wrapper.highlighted {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.commitment-label {
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.4;
  font-size: 1.05rem;
}

.consent-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.commitment-consent:hover {
  background-color: #e9ecef;
  transition: background-color 0.2s ease;
}

@media (max-width: 480px) {
  .contact-step {
    padding: 0 12px;
  }

  .step-title {
    margin-top: 20px!important;
    font-size: 25px;
  }

  .step-description {
    font-size: 18px;
  }

  .form-group {
    padding: 10px;
  }

  .form-input {
    padding: 12px 16px 12px 44px;
    font-size: 15px;
  }

  .input-icon {
    font-size: 25px;
    top: 48%;
    left: 12px;
    color: var(--accent-blue);
  }

  .child-card {
    padding: 12px;
  }

  .contact-form {
    padding: 5px;
  }

  .child-title {
    font-size: 25px;
    margin-bottom: 20px;
  }

  .consent-group {
    padding: 12px;
  }

  .consent-checkbox {
    width: 18px;
    height: 18px;
  }

  .consent-label {
    font-size: 14px;
  }

  .form-group label {
    font-size: 15px;
  }

  .form-group label::before {
    width: 3px;
    height: 20px;
  }
}
</style> 