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
      address: {
        street: '',
        name: '',
        city: '',
        email: '',
      },
      separateBilling: false,
      billingAddress: {
        street: '',
        name: '',
        city: '',
        email: '',
      },
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    calculateTotalPriceWithBTW() {
      return this.cartProducts.cartItems
          .map(product => product.quantity * this.calculatePriceWithBTW(product.product))
          .reduce((total, productPrice) => total + productPrice, 0)
          .toFixed(2);
    },
    calculateTotalPriceWithoutBTW() {
      return this.cartProducts.cartItems
          .map(product => product.quantity * this.calculatePriceWithoutBTW(product.product))
          .reduce((total, productPrice) => total + productPrice, 0)
          .toFixed(2);
    },
    calculatePriceWithBTW(product) {
      return (product.price * (1 + product.btw / 100)).toFixed(2);
    },
    calculatePriceWithoutBTW(product) {
      return product.price.toFixed(2);
    },
  },
}
</script>

<template>
  <body>
  <div class="container">

    <router-link to='/shop'>
      <button>Back to shop!</button>
    </router-link>

    <div class="adress-container">
      <h1>Adress information</h1>
      <form class="form" @submit.prevent="submitForm">
        <label for="street">Street:</label>
        <input placeholder="Enter your street" type="text" id="street" v-model="address.street" required>
        <label for="city">City:</label>
        <input placeholder="Enter your city" type="text" id="city" v-model="address.city" required>
        <label for="name">Name:</label>
        <input placeholder="Enter your name" type="text" id="name" v-model="address.name" required>
        <label for="email">Email:</label>
        <input placeholder="Enter your email" type="text" id="email" v-model="address.email" required>


        <label class="checkbox-label">
          Aparte facturatiegegevens
          <input id="checkbox" type="checkbox" v-model="separateBilling">
        </label>


        <div v-if="separateBilling">
          <h2>Billingdetails</h2>
          <label for="billingStreet">Street:</label>
          <input placeholder="Enter your street" type="text" id="billingStreet" v-model="billingAddress.street"
                 required>
          <label for="billingCity">City:</label>
          <input placeholder="Enter your city" type="text" id="billingCity" v-model="billingAddress.city" required>
          <label for="billingName">Name:</label>
          <input placeholder="Enter your name" type="text" id="billingName" v-model="billingAddress.name" required>
        </div>

        <router-link to='/confirmation'>
          <button type="submit">Pay</button>
        </router-link>
      </form>
    </div>


    <h1>Order</h1>
    <div class="checkout-container" v-for="(product, index) in cartProducts.cartItems" :key="index">
      <div>
        <div>
          <h3>{{ product.product.title }}</h3>
          <p>{{ product.product.description }}</p>
        </div>
      </div>
      <p>${{ calculatePriceWithBTW(product.product) }} PER ITEM</p>
      <hr>
    </div>

    <div>
      <h3>TOTAL</h3>
      <p>BTW excluded: ${{ calculateTotalPriceWithoutBTW() }}</p>
      <p>BTW included: ${{ calculateTotalPriceWithBTW() }}</p>
    </div>

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

.checkout-container {
  hr {
    width: 25%;
    margin-bottom: 25px;
  }
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