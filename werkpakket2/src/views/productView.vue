<script>
import {useProductStore} from '@/stores/productStore.js'
import {useCartStore} from '@/stores/cartStore.js'
import {useAccountCheckerStore} from "@/stores/accountCheckerStore.js";

export default {
  data() {
    const checker = useAccountCheckerStore();
    return {
      quantity: 1,
      itemAdded: false,
      assetUrl: "http://localhost:5173/src/assets/",
      checker,
    };
  },
  computed: {
    productStore() {
      return useProductStore();
    },
    cartStore() {
      return useCartStore();
    },
    product() {
      const productId = this.$route.params.id;
      return this.productStore.getProductById(productId)
    },
    itemIsAvailable() {
      return this.product.stock > 0;
    },
  },

  methods: {
    addToCart() {
      const isUserLoggedIn = this.checker.loginStatus;

      if (isUserLoggedIn) {
        if (!this.product) {
          alert('Wrong password or email');
        } else {
          this.itemAdded = true;
          setTimeout(() => {
            this.itemAdded = false;
          }, 3000);

          const cartItem = {
            product: this.product,
            quantity: this.quantity,
          };

          this.cartStore.addToCart(cartItem);
          this.productStore.updateStock(this.product.id, - this.quantity);
        }
      } else {
        this.$router.push('/login');
      }
    },
  }
}
</script>


<template>
  <body>

  <header class="header-content">
    <div class="top-mangas-wrapper">
      <div class="header-title">
        <h4>
          Detailpage
        </h4>
        <hr>
      </div>
    </div>
    <div class="item__container">
      <div class="item__image">
        <img :src="'/src/assets/' + product.image" :alt="product.title">
      </div>
      <div class="manga__detail__container">
        <div v-if="product" class="manga__detail__description">
          <h2 class="manga__title">{{ product.title }}</h2>
          <h3>{{ product.title }}</h3>
          <h3 class="price__tag">{{ "$" + product.price }}</h3>
          <p v-if="itemIsAvailable">Available</p>
          <p id="sold-out" v-else>Sold out</p>
          <p>
            {{ product.description }}
          </p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <p><a href="#">12 Reviews</a></p>
          <input type="number" v-model="quantity" :max="itemIsAvailable ? product.stock : undefined" min="1">
          <button @click="addToCart" :disabled="!itemIsAvailable || quantity > product.stock">Add to cart</button>
        </div>
        <div v-else>
          <h1>Product not found.</h1>
        </div>

        <div v-if="itemAdded" class="item-added">
          Item added to cart!
        </div>
      </div>
    </div>
  </header>

  </body>
</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.navbar .logo h3 {
  font-size: $font-md-pls;
}

#sold-out {
  font-size: $font-md;
  color: $color-red;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 2.5% 4% 5% 4%;
}

.item-added {
  color: $color-red;
}

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
  margin-bottom: 20px;
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


.banner-description {
  margin-bottom: 5%;

  h4 {
    display: flex;
    justify-content: center;
    font-weight: 300;
    color: $color-grey;
    font-size: $font-sm;
  }

}

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

.mangas-container {
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
}

.suggestion-content {
  margin: 2.5% 4% 5% 4%;
}

.header-title {
  margin-bottom: 3%;
}

.suggestions-wrapper {
  display: flex;
  justify-content: space-between;

  .suggestion-box {
    margin-top: 6%;
  }

  .suggestion-box-wrapper {
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
}

.footer-content {
  margin: 2.5% 4% 5% 4%;

  .footer-wrapper {
    display: flex;
    justify-content: space-between;

    h4 {
      font-size: $font-smm;
      font-weight: 500;
    }
  }
}

.mangas-first-row-container, .mangas-second-row-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;

}

.mangas-first-row-container a, .mangas-second-row-container a {
  text-decoration: none;
}

.manga-title-price h3 {
  font-size: $font-sm;
  font-weight: 400;
  line-height: normal;
}

.manga-description h6 {
  font-size: $font-sxm;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: $color-grey;
}


.filter-container {
  margin-bottom: 5%;

  select, button {
    height: 40px;
    width: 250px;
    margin-right: 10px;
  }

  select {
    border: $color-black solid 1px;
    color: $color-black;
    padding-left: 10px;
    padding-right: 10px;
  }

  button {
    background-color: $color-black;
    border: $color-white solid 1px;
    color: $color-white;
  }
}

.manga__detail_container {
  p {
    width: 50%;
  }
}

.manga__detail__description {
  h2 {
    padding-bottom: 20px;
  }

  h3 {
    padding-bottom: 20px;
  }

  p {
    padding-bottom: 20px;
    color: $color-grey;
  }

  .checked {
    color: $color-yellow;
  }


  width: 75%;
  margin: auto;
  margin-bottom: 15vh;

  .manga__title {
    font-size: $font-md-pls;
  }

  .price__tag {
    font-size: $font-md;
  }
}

.item__container {
  display: flex;
  justify-content: space-around;
}


.button__container {
  margin-top: 20px;

  button {
    background-color: $color-white;
    border: $color-black solid 1px;
    color: $color-black;
    height: 40px;
    width: 250px;
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


/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .mangas-first-row-container,
  .mangas-second-row-container {
    flex-direction: column;
    align-items: center;
  }

  .manga-content-holder {
    margin-bottom: 20px; /* Adjust the spacing between manga content holders */
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