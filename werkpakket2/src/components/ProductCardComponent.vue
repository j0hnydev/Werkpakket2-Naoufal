<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    viewProductDetails() {
      this.$router.push({name: 'product', params: {id: this.product.id}})
    }
  }
};
</script>

<template>
  <div class="manga-content-holder">
    <div class="manga-information-container" @click="viewProductDetails">
      <div class="first-title-wrapper">
        <img :src="'src/assets/' + product.image" :alt="product.title">
        <div class="manga-title-price">
          <h3>{{ product.title }}</h3>
          <h3>{{ product.price }}$</h3>
        </div>
      </div>
      <div class="manga-description">
        <h6>{{ product.description }}</h6>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '../scss/base.scss';


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


@media screen and (max-width: 768px) {
  .manga-content-holder {
    margin-bottom: 20px;
  }

  .mangas-container {
    flex-direction: column;

    img {
      width: 100%;
    }
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