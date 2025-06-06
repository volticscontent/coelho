<template>
  <section class="pers-hero">
    <!-- Background decorativo -->
    <div class="hero-bg">
      <div class="bg-pattern"></div>
      <div class="bg-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-4"></div>
      </div>
    </div>

    <div class="pers-hero__container">
      <div class="hero-content">
        <h1>
          Estamos criando seu
          <p><span class="text-gradient">video mágico</span></p>
        </h1>
        <p class="subtitle">
          Crie uma experiência <span class="text-gradient-accent">mágica</span> e <span class="text-gradient-accent">inesquecível</span> em menos de <span class="text-gradient-accent">5 minutos</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PersHero'
}
</script>

<style scoped>
.pers-hero {
  position: relative;
  background: var(--white);
  padding: 96px 25px 64px!important;
  overflow: hidden;
  z-index: 1;
}

.pers-hero h1, .text-gradient  {
  font-size: 30px;
  line-height: 1.2;
  margin: 0 0 24px;
  color: var(--text-color);
  font-family: "Fertigo Pro", serif !important;
}

/* Background com círculos */
.bg-circles {
  position: absolute;
  top: -32px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-blue));
  opacity: 0.05;
  animation: float 8s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: -100px;
  animation-delay: 2s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: -50px;
  left: 20%;
  animation-delay: 4s;
}

.circle-4 {
  width: 100px;
  height: 100px;
  top: 40%;
  right: 20%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* iOS fixes */
@supports (-webkit-touch-callout: none) {
  .badge-item,
  .hero-trust {
    background: var(--white);
  }
  
  .badge-item:hover {
    transform: none;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .pers-hero {
    padding: 48px 16px 24px;
  }

  .hero-badges {
    grid-template-columns: 1fr;
  }

  .badge-item {
    padding: 12px;
  }

  .badge-icon {
    width: 32px;
    height: 32px;
  }

  .badge-icon .material-icons {
    font-size: 16px;
  }
}
</style> 