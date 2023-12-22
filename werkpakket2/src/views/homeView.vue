<script>
import { useProductStore } from '@/stores/productStore.js'

import PopularProducts from '@/components/PopularProductsComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import ProductCard from '@/components/ProductCardComponent.vue'

export default {
    data() {
        return {
            products: useProductStore()
        };
    },
    components: {
    PopularProducts,
    Header,
    Footer,
    ProductCard,
}
}
</script>

<template>
 <body>
    <header class="header-content">
        <div class="banner-description">
            <h4>New & top series, boxed sets for manga fans</h4>
        </div>
        <div class="top-mangas-wrapper">
            <div class="header-title">
                <h4>
                    Popular mangas
                </h4>
                <hr>
            </div>
            <div class="mangas-container">
              <PopularProducts/>
            </div>
        </div>
    </header>
    <section class="suggestion-content">
        <div class="suggestions-wrapper">
            <div class="suggestion-box-wrapper">
                <h4>
                    Start a new series!
                </h4>
                <hr>
                <div class="suggestion-box">
                    <img src="../assets/Group 1.svg" alt="suggestion-1">
                </div>
            </div>

            <div class="suggestion-box-wrapper">
                <h4>
                    Order a physical copy!
                </h4>
                <hr>
                <div class="suggestion-box">
                    <img src="../assets/Group 2.svg" alt="suggestion-1">
                </div>
            </div>
        </div>
    </section>
</body>
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