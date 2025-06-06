<template>
  <div class="start-product">
    <div class="product-card">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div class="product-actions">
          <button class="btn-primary" @click="goToPersonalization">
            Personalizar vídeo
          </button>
          <button class="btn-secondary" @click="openVideo">
            <span class="material-icons">play_circle</span>
            Ver exemplo
          </button>
        </div>
      </div>
    </div>
  </div>
  <ProductVideoModal 
    :show="showVideo" 
    :video-url="product.video"
    @close="closeVideo"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import productHandler from '@/handlers/ProductHandler'
import ProductVideoModal from './ProductVideoModal.vue'
import { trackComponentEvent } from '@/utils/analytics'

export default defineComponent({
  name: 'StartProduct',
  components: {
    ProductVideoModal
  },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const showVideo = ref(false)

    const goToPersonalization = () => {
      trackComponentEvent.startProduct.customizeVideo()

      productHandler.setSelectedProduct(props.product)
      router.push('/personalizar/quantidade')
    }

    const openVideo = () => {
      trackComponentEvent.startProduct.watchExample()
      showVideo.value = true
    }

    const closeVideo = () => {
      showVideo.value = false
    }

    return {
      goToPersonalization,
      openVideo,
      closeVideo,
      showVideo
    }
  }
})
</script>

<style scoped>
.product-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-secondary .material-icons {
  font-size: 1.25rem;
}
</style> 