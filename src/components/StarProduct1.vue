<template>
  <section :id="id" class="star-product">
    <div class="star-product__container">
      <h2 class="title-custom">Mais vendidos</h2>
      
      <div class="product-card">
        <ProductCard 
          :product="stitchVideo" 
          @personalize="goToPersonalization" 
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BunnyVideo } from '@/types/product'
import { STITCH_VIDEO } from '@/types/product'
import ProductCard from './ProductCard.vue'
import { trackComponentEvent } from '@/utils/analytics'

interface ComponentData {
  stitchVideo: BunnyVideo
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
      stitchVideo: STITCH_VIDEO
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
  padding: 40px 16px;
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