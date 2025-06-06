<template>
  <div class="admin-auth">
    <div class="auth-card">
      <h1 class="title-custom">
        Login Administrativo
      </h1>
      <div class="auth-form">
        <input 
          type="password" 
          v-model="password"
          placeholder="Digite a senha de admin"
          class="auth-input"
          @keyup.enter="verifyPassword"
        >
        <p v-if="error" class="auth-error">Senha incorreta</p>
        <button @click="verifyPassword" class="btn btn-primary">
          Acessar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminAuth',
  data() {
    return {
      password: '',
      error: false
    }
  },
  methods: {
    verifyPassword() {
      // Senha definida como "vdkids2025"
      if (this.password === '15951522') {
        localStorage.setItem('isAdmin', 'true')
        this.$router.push('/')
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.admin-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--gray-50);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.auth-title {
  font-size: 24px;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--gray-100);
  border-radius: var(--radius-md);
  font-size: 16px;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.auth-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 89, 255, 0.1);
}

.auth-error {
  color: #DC2626;
  font-size: 14px;
  margin-top: -8px;
}
</style> 