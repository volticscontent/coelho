const selectProduct = () => {
  selectedProduct.value = {
    id: 'video_stitch',
    name: 'Vídeo do Stitch',
    description: 'Um vídeo personalizado com o Stitch',
    price: 0,
    image: '/images/stitch.jpg'
  }
  emit('update:product', selectedProduct.value)
} 