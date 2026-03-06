<template>
  <section :id="id" class="star-product">
    <div class="star-product__container">
      <h2 class="title-custom">Mais Procurados</h2>
      
      <div class="product-card">
        <ProductCard 
          :product="coelhoVideo" 
          @personalize="goToPersonalization" 
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BunnyVideo } from '@/types/product'
import { COELHO_VIDEO } from '@/types/product'
import ProductCard from './ProductCard.vue'
import { trackComponentEvent } from '@/utils/analytics'

interface ComponentData {
  coelhoVideo: BunnyVideo
}

export default defineComponent({
  name: 'StarProduct1',
  components: {
    ProductCard
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data(): ComponentData {
    return {
      coelhoVideo: COELHO_VIDEO
    }
  },
  methods: {
    goToPersonalization(): void {
      trackComponentEvent.starProduct1.createVideo()
      this.$router.push('/personalizar/quantidade')
    }
  }
})
</script>

<style scoped>
.star-product {
  padding: 10px 16px;
  background: var(--white);
}

.star-product__container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
}

.product-card {
  margin-top: 24px;
  width: 100%;
}
</style> 