<script setup>
import {useCartStore} from "@/stores/cartStore";

const store = useCartStore();

</script>

<template>
  <nav class="navbar">

    <div class="logo">
      <router-link to='/'>
        <a href="index.html">
          <h3>MANGAZINE</h3>
        </a>
      </router-link>
    </div>

    <div class="nav-bar-wrapper">
      <ul>
        <router-link to='/shop'>
          <li><a href="shop.html">Shop</a></li>
        </router-link>
        <li><a href="#">Contact</a></li>
        <router-link to='/login'>
          <li><a href="login.html">Login</a></li>
        </router-link>
        <router-link to='/shoppingCart'>
          <div class="shopping-cart">Items in Cart: {{ store.getTotalQuantity }}</div>
        </router-link>
      </ul>
    </div>

  </nav>
</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.navbar .logo h3 {
  font-size: $font-md-pls;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2.5% 4% 5% 4%;
}

.shopping-cart {
  color: $color-black;
  height: 30px;
  width: 150px;
  background-color: white;
}

.nav-bar-wrapper ul {
  flex-direction: column;
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  li {
    margin-left: 60px;

    a {
      font-size: $font-sm;
      text-decoration: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .navbar .logo h3 {
    font-size: $font-sm;
  }

}


</style>
