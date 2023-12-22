<script>
import {useProductStore} from '@/stores/productStore.js'
import {useCartStore} from '@/stores/cartStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'

export default {
  data() {
    return {
      products: useProductStore(),
      cartProducts: useCartStore(),
      assetUrl: "http://localhost:5173/src/assets/"
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    calculateTotalPriceWithBTW() {
      return this.cartProducts.cartItems.reduce(
          (total, product) => total + product.quantity * this.calculatePriceWithBTW(product.product),
          0).toFixed(2);
    },
    calculateTotalPriceWithoutBTW() {
      return this.cartProducts.cartItems.reduce(
          (total, product) => total + product.quantity * this.calculatePriceWithoutBTW(product.product),
          0).toFixed(2);
    },
    calculatePriceWithBTW(product) {
      return (product.price * (1 + product.btw / 100)).toFixed(2);
    },
    calculatePriceWithoutBTW(product) {
      return product.price.toFixed(2);
    },
    addProductsToCart(index) {
      const product = this.cartProducts.cartItems[index];
      if (product) {
        this.cartProducts.addToCart({product: product.product, quantity: 1});
      }
    },
    removeProductsFromCart(index) {
      const product = this.cartProducts.cartItems[index];
      if (product && product.quantity > 1) {
        this.cartProducts.addToCart({product: product.product, quantity: -1});
      }
    },
    removeProduct(index) {
      this.cartProducts.removeFromCart(index);
    },
  },
}
</script>


<template>
  <div class="container">

    <router-link to='/shop'>
      <button>Back to shop</button>
    </router-link>

    <div v-if="cartProducts.cartItems.length === 0">
      <h1>Hey you haven't added any manga's yet!!!</h1>
    </div>
    <div v-else>

      <div class="checkout-container" v-for="(product, index) in cartProducts.cartItems" :key="index">
        <div>
          <img :src=" assetUrl + product.product.image" :alt="product.alt"/>
          <div>
            <h3>{{ product.product.title }}</h3>
            <p>{{ product.product.short_description }}</p>
          </div>
        </div>
        <button class="amountproduct" @click="removeProductsFromCart(index)">-</button>
        <div id="amount">{{ product.quantity }}</div>
        <button class="amountproduct" @click="addProductsToCart(index)">+</button>
        <button @click="removeProduct(index)">Remove</button>
        <p>${{ calculatePriceWithBTW(product.product) }} per item</p>
        <hr>
      </div>

      <div>
        <p>BTW excluded: ${{ calculateTotalPriceWithoutBTW() }}</p>
        <p>VAT included: ${{ calculateTotalPriceWithBTW() }}</p>
      </div>

      <div>
        <router-link to='/checkout'>
          <button>Checkout</button>
        </router-link>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.container {
  margin: 2.5% 4% 5% 4%;
}

button {
  height: 40px;
  width: 250px;
  background-color: $color-black;
  border: $color-white solid 1px;
  color: $color-white;
  margin-top: 10px;
  margin-bottom: 10px;


}

.checkout-container {
  hr {
    width: 25%;
    margin-bottom: 25px;
  }
}

.amountproduct {
  width: 75px;
  display: block;
}

#id {
  height: 40px;
  width: 40px;
  background-color: $color-black;
  border: $color-white solid 1px;
  color: $color-white;
}


</style>