<script>
import {useProductStore} from '@/stores/productStore.js'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import ProductCard from '@/components/ProductCardComponent.vue'

export default {
  data() {
    return {
      products: useProductStore(),
      selectedGenreFilter: 'All',
      selectedAgeFilter: 'All',
      filterOne: ["All", "Shounen", "Shounen Jump", "Action", "Drama", "Mystery"],
      filterTwo: ["All", "12+", "18+", "-12"],
      pageSize: 8,
      pageNumber: 1,
    }
  },
  components: {
    Header,
    Footer,
    ProductCard
  },
  computed: {
    filteredProducts() {
      let filteredList = this.products.products;

      if (this.selectedGenreFilter !== 'All') {
        filteredList = filteredList.filter(product => {
          if (Array.isArray(product.genre)) {
            return product.genre.includes(this.selectedGenreFilter);
          } else {
            return product.genre === this.selectedGenreFilter;
          }
        });
      }

      if (this.selectedAgeFilter !== 'All') {
        filteredList = filteredList.filter(product => {
          if (Array.isArray(product.age)) {
            return product.age.includes(this.selectedAgeFilter);
          } else {
            return product.age === this.selectedAgeFilter;
          }
        });
      }
      return filteredList;
    },
    amountOfCurrentPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
    currentPaginationProducts() {
      const startIndex = (this.pageNumber - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
    }
  },
  methods: {
    applyFilter(filter) {
      if (this.filterOne.includes(filter) || this.filterTwo.includes(filter)) {
        this.applyGenreFilter(filter);
      } else {
        this.applyAgeFilter(filter);
      }
    },
    applyGenreFilter(filter) {
      const index = this.selectedGenreFilter.indexOf(filter);

      if (index === -1) {
        this.selectedGenreFilter.push(filter);
      } else {
        this.selectedGenreFilter.splice(index, 1);
      }
    },
    applyAgeFilter(filter) {
      this.selectedAgeFilter = filter;
    },
    goToPage(newPage) {
      if (newPage >= 1 && newPage <= this.amountOfCurrentPages) {
        this.pageNumber = newPage;
      }
    },
    pageNumbers() {
      const pages = [];
      for (let i = 1; i <= this.amountOfCurrentPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
}
</script>

<template>
  <body>
  <header class="header-content">
    <div class="top-mangas-wrapper">
      <div class="header-title">
        <h4>
          Shop
        </h4>
        <hr>
      </div>
      <div class="filter-container">
        <label for="ageFilter">Genre:</label>
        <select v-model="selectedGenreFilter" class="selectFilter" @change="applyFilter(selectedGenreFilter, 'genre')">
          <option v-for="filterOption in filterOne" :key="filterOption" :value="filterOption">
            {{ filterOption }}
          </option>
        </select>

        <label for="ageFilter">Age:</label>
        <select v-model="selectedAgeFilter" class="selectFilter" @change="applyFilter(selectedAgeFilter, 'age')">
          <option v-for="filterOption in filterTwo" :key="filterOption" :value="filterOption">
            {{ filterOption }}
          </option>
        </select>
      </div>


      <div class="mangas-shop-container">
        <div class="mangas-first-row-container">
          <div v-for="(product, id) in currentPaginationProducts" :key="id">
            <ProductCard :product="product"/>
          </div>
        </div>

        <div class="pagination">
          <div @click="goToPage(pageNumber - 1)" :aria-disabled="pageNumber === 1">
            <p>Previous</p>
          </div>
          <div v-for="page in pageNumbers()" :key="page" @click="goToPage(page)">
            <p class="pagination__item" :class="{ active: pageNumber === page }">{{ page }}</p>
          </div>
          <div @click="goToPage(pageNumber + 1)" :aria-disabled="pageNumber === amountOfCurrentPages">
            <p>Next</p>
          </div>
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


.top-mangas-wrapper {
  .filter-container {
    color: $color-black;
    font-size: 20px;
    margin: 30px 0 30px 0;
  }

  .pagination {
    color: $color-black;
    font-size: 20px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;


    div {
      padding: 10px;
      display: inline;

      .pagination__item.active {
        background-color: $color-black;
        color: $color-red;
      }
    }
  }
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

.mangas-container {
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
}


.header-title {
  margin-bottom: 3%;
}



.mangas-first-row-container, .mangas-second-row-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

.manga-content-holder {
  margin-bottom: 50px;
}


/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .mangas-first-row-container,
  .mangas-second-row-container {
    flex-direction: column;
    align-items: center;
  }

  .manga-content-holder {
    margin-bottom: 50px;
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