<script>

import {useProductStore} from '@/stores/productStore.js'

import ProductCard from '@/components/ProductCardComponent.vue'

export default {
  data() {
    return {
      products: useProductStore(),
    }
  },
  components: {
    ProductCard
  },
  computed: {
    mostPopularProduct() {
      return this.products.returnHighestAmount;
    },
  },
}
</script>

<template>
  <div class="specific-manga">
    <div v-for="(product, id) in mostPopularProduct" :key="id">
      <ProductCard :product="product"/>
    </div>
  </div>
</template>

<style scoped>
.specific-manga {
  display: flex;
  justify-content: space-between;
}
</style>