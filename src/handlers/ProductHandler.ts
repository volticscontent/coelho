import { ref } from 'vue'
import { products } from '@/config/products'
import type { Product } from '@/types/product'

class ProductHandler {
  private products = ref<Product[]>(products)
  private selectedProduct = ref<Product | null>(null)

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  getProductById(id: string): Product | null {
    return this.products.value.find(product => product.id === id) || null
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.value.filter(product => product.category === category)
  }

  getRelatedProducts(productId: string, limit = 3): Product[] {
    const product = this.getProductById(productId)
    if (!product) return []

    return this.products.value
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit)
  }

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase()
    return this.products.value.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.alternativeNames.some(name => name.toLowerCase().includes(searchTerm))
    )
  }

  setSelectedProduct(product: Product): void {
    this.selectedProduct.value = product
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct.value
  }
}

export default new ProductHandler() 