<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h1>Vídeos Personalizados para Crianças</h1>
        <p>Crie uma experiência mágica e inesquecível para seu pequeno</p>
      </div>
      <div class="hero__image">
        <img src="@/assets/imgs/hero-image.webp" alt="Crianças felizes" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--white);
  padding: 40px 16px;
  overflow: hidden;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 48px;
}

.hero__content {
  flex: 1;
  max-width: 600px;
}

h1 {
  font-size: 48px;
  line-height: 1.2;
  margin: 0 0 24px;
  color: var(--text-color);
  font-family: "Fertigo Pro", serif;
}

p {
  font-size: 20px;
  line-height: 1.5;
  margin: 0 0 32px;
  color: var(--text-secondary);
  font-family: 'Product Sans', sans-serif;
}

.cta-wrapper {
  display: flex;
  justify-content: flex-start;
}

.btn-cta {
  font-size: 18px;
  padding: 16px 32px;
  max-width: 280px;
  position: relative;
  overflow: hidden;
}

.btn-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: transform 0.6s ease;
}

.btn-cta:hover::before {
  transform: translateX(50%);
}

.hero__image {
  flex: 1;
  max-width: 500px;
}

.hero__image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero__container {
    gap: 32px;
  }

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 32px 16px;
  }

  .hero__container {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  .hero__content {
    max-width: 100%;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .cta-wrapper {
    justify-content: center;
  }

  .btn-cta {
    font-size: 16px;
    padding: 14px 28px;
    width: auto;
    min-width: 200px;
  }

  .hero__image {
    max-width: 100%;
    margin: 0 -16px;
  }

  .hero__image img {
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 24px 16px;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 15px;
  }

  .btn-cta {
    font-size: 14px;
    padding: 12px 24px;
    min-width: 180px;
  }

  .hero__image {
    margin: 0 -8px;
  }
}
</style> 