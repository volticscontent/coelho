<template>
  <div class="product-card" @click="$emit('personalize')">
    <div class="product-image">
      <img :src="product.image" :alt="product.name">
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price">{{ formatPrice(product.basePrice) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BunnyVideo } from '@/types/product'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as () => BunnyVideo,
      required: true
    }
  },
  methods: {
    formatPrice(price: number): string {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)
    }
  }
})
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: 12px;
  border-left: 2px solid rgb(228, 228, 228);
  border-right: 1px solid rgb(160, 160, 160);
  border-bottom: 1px solid rgb(202, 202, 202);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
  text-align: center;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
  font-family: "Fertigo Pro", serif;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: white;
  background-color: var(--primary-color);
  border-radius: 12px;
  font-family: 'Product Sans', sans-serif;
}

@media (max-width: 768px) {
  .product-image {
    height: 250px;
  }
  
  .product-name {
    font-size: 16px;
  }
  
  .product-price {
    font-size: 20px;
  }
}
</style> 