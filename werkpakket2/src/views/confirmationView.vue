<script>
import { useProductStore } from '@/stores/productStore.js'
import { useCartStore } from '@/stores/cartStore.js'


export default {
  methods: {
    backToIndex() {
      this.$router.push('/');
      this.cartProducts.resetTotalQuantity();
    },
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
  },
  computed: {
    assetUrl() {
      return () => this.products.assetUrl;
    },
  },
  data() {
    const products = useProductStore();
    const cartProducts = useCartStore();
    return {
      products,
      cartProducts,
    }
  }
}
</script>

<template>
  <body>
  <div class="container">

   <h1>
     Congrats with your order!!!
   </h1>

    <h1>Order</h1>
    <div class="checkout-container" v-for="(product, index) in cartProducts.cartItems" :key="index">
      <div>
        <div>
          <h3>{{ product.product.title }}</h3>
          <p>{{ product.product.description }}</p>
        </div>
      </div>
      <p>${{ calculatePriceWithBTW(product.product) }} per item</p>
      <hr>
    </div>

    <div>
      <h3>TOTAL</h3>
      <p>BTW excluded: ${{ calculateTotalPriceWithoutBTW() }}</p>
      <p>BTW included: ${{ calculateTotalPriceWithBTW() }}</p>
    </div>
    <button @click="backToIndex">Let's shop some more!</button>

  </div>
  </body>
</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.container {
  margin: 2.5% 4% 5% 4%;
}

.login-content {
  display: flex;
  justify-content: center;
  margin-bottom: 15%;
}

.checkout-container {
  hr {
    width: 25%;
    margin-bottom: 25px;
  }
}

.adress-container {
  margin-top: 50px;
  margin-bottom: 50px;
}

button {
  background-color: $color-white;
  border: $color-black solid 1px;
  color: $color-black;
  height: 40px;
  width: 250px;
}

.form {
  button {
    background-color: $color-white;
    border: $color-black solid 1px;
    color: $color-black;
    height: 40px;
    width: 250px;
    margin-bottom: 20px;
  }

  label {
    display: block;

  }

  .checkbox-label {
    #checkbox {
      margin: 0;
      width: auto;
      height: auto;
    }
  }

  input {
    border: $color-black solid 1px;
    color: $color-black;
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    width: 250px;
    margin-bottom: 20px;
  }
}


p {
  margin-bottom: 15px;
}



</style>