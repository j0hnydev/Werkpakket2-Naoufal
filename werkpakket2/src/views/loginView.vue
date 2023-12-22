<script>
import {useProductStore} from '@/stores/productStore.js'
import {useAccountCheckerStore} from '@/stores/accountCheckerStore.js';
import {useCartStore} from '@/stores/cartStore.js'

export default {
  data() {
    const products = useProductStore();
    const accountChecker = useAccountCheckerStore();
    const shoppingCartProducts = useCartStore();

    return {
      products,
      accountChecker,
      shoppingCartProducts,
      email: '',
      password: '',
    }
  },
  methods: {
    async submitLogin() {
      try {
        await this.accountChecker.login(this.email, this.password);
        this.$router.push('/shoppingCart');
      } catch (error) {
        alert("Wrong password");
      }
    },
    async submitLogout() {
      try {
        await this.accountChecker.logout();
        this.shoppingCartProducts.resetTotalQuantity();
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<template>
  <body>
  <header class="header-content">
    <div class="top-mangas-wrapper">
      <div class="header-title">
        <h4>
          Login
        </h4>
        <hr>
      </div>
    </div>
  </header>

  <section class="login-content">
    <div class="login_container">
      <div v-if="!accountChecker.loginStatus" class="forum_container">
        <form @submit.prevent="submitLogin">
          <div>
            <label for="fname">Email</label><br>
            <input v-model="email" type="email" placeholder="Email" class="input">
          </div>
          <div>
            <label for="lname">Password</label><br>
            <input v-model="password" type="password" placeholder="Password" class="password">
          </div>
          <p><a href="#">Forgot password?</a></p>
          <button>Login</button>
        </form>
      </div>
      <div v-else>
        <button v-if="accountChecker.loginStatus" @click="submitLogout">Logout</button>
      </div>
    </div>

  </section>
  </body>
</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.header-content {
  margin: 2.5% 4% 5% 4%;
}

.header-title {
  h4 {
    color: $color-red;
    font-size: $font-sm;
    font-weight: 500;
  }

  hr {
    background-color: $color-red;
    height: 2px;
    border: none;
  }
}

.login-content {
  display: flex;
  justify-content: center;
  margin-bottom: 15%;

  button {
    background-color: $color-white;
    border: $color-black solid 1px;
    color: $color-black;
    height: 40px;
    width: 250px;
  }

  input {
    border: $color-black solid 1px;
    color: $color-black;
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    width: 250px;
  }

  p {
    margin-bottom: 15px;
  }
}

@media screen and (max-width: 768px) {
  .mangas-first-row-container,
  .mangas-second-row-container {
    flex-direction: column;
    align-items: center;
  }

  .manga-content-holder {
    margin-bottom: 20px;
  }

  .suggestions-wrapper {
    flex-direction: column;

    img {
      width: 100%;
    }
  }

  .navbar .logo h3 {
    font-size: $font-sm;
  }

  .mangas-container {
    flex-direction: column;

    img {
      width: 100%;
    }
  }

  .footer-wrapper {
    flex-direction: column;
  }

  .filter-container {
    display: flex;
  }

  .item__container {
    flex-direction: column;

    img {
      width: 100%;
    }

  }

}

.pagination {
  display: flex;
  margin-top: 2.5vh;
  justify-content: center;

  .pagination__item {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $color-white;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      background-color: $color-black;
      color: $color-yellow;
    }
  }
}

</style>