<template>
  <section class="carro-social2">
    <div class="marquee">
      <div class="marquee__content">
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
      </div>
      <div class="marquee__content" aria-hidden="true">
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
        <span>Faça uma surpresa para o seu filho!</span>
        <span class="separator">★</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CarroSocial2'
}
</script>

<style scoped>
.carro-social2 {
  background: var(--accent-blue);
  overflow: hidden;
  padding: 12px 0;
}

.marquee {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 30px;
  overflow-x: hidden;
  display: flex;
  user-select: none;
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 100%;
  gap: 24px;
  animation: scroll 30s linear infinite;
  color: var(--white);
  font-family: 'Product Sans', sans-serif;
  font-size: 16px;
}

.separator {
  color: var(--white);
  opacity: 0.6;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style> 