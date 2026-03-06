<template>
  <div class="desktop-block">
    <div class="block-content">
      <img src="logo.png" alt="Logo" class="block-logo">
      <h1 class="title-custom">
        Versão Mobile
      </h1>
      <p class="block-text">Este site foi desenvolvido exclusivamente para dispositivos móveis. Por favor, acesse através do seu celular.</p>
      <router-link to="/admin" class="block-admin-link">
        Acesso Admin
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesktopBlock'
}
</script>

<style scoped>
.desktop-block {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--gray-50);
}

.block-content {
  max-width: 400px;
  text-align: center;
  padding: 32px;
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.block-logo {
  height: 60px;
  margin-bottom: 24px;
}

.block-title {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 16px;
}

.block-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 24px;
}

.block-admin-link {
  display: inline-block;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.block-admin-link:hover {
  opacity: 0.8;
}
</style> 