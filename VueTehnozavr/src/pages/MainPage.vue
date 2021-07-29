<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">Всего товаров: {{countProducts}} </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
      >
      </ProductFilter>
      <section class="catalog">
        <div v-if="productsLoading" class="loader__container">
          <div class="loader">
            <span>Загрузка...</span>
          </div>
        </div>
        <div v-if="productsLoadingFailed" class="loading__failed">Произошла ошибка :(
          <button @click.prevent="loadProducts" class="button-2"><span>Попробовать еще </span>
          </button>
        </div>
        <ProductList v-bind:products="productsOnPAge"></ProductList>
        <BasePagination v-model="page" :count="countProducts" :perPage="productsPerPage">
        </BasePagination>
      </section>
    </div>
  </main>
</template>
<script>
  import axios from 'axios';
  import ProductList from '../components/ProductList.vue';
  import BasePagination from '../components/BasePagination.vue';
  import ProductFilter from '../components/ProductFilter.vue';

  export default {
    components: {
      ProductList,
      BasePagination,
      ProductFilter
    },
    data() {
      return {
        filterPriceTo: 0,
        filterPriceFrom: 0,
        filterCategoryId: 0,
        filterColor: ' ',
        page: 1,
        productsPerPage: 3,
        productsData: null,
        errors: [],
        productsLoading: false,
        productsLoadingFailed: false,
      };
    },
    computed: {

      productsOnPAge() {
        return this.productsData ? this.productsData.items : [];
      },
      countProducts() {
        return this.productsData && this.productsData.pagination ? this.productsData.pagination.total : 0;
      },
    },
    methods: {
      loadProducts() {
        this.productsLoading = true;
        this.productsLoadingFailed = false;
        clearTimeout(this.loadProductsTimer);
        this.loadProductsTimer = setTimeout(() => {
          axios
            .get(`https://vue-study.skillbox.cc/api/products`, {
              params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.filterCategoryId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
                colorId: this.filterColor
              }
            })
            .then(response => {
              this.productsData = response.data;
            })
            .catch(() => this.productsLoadingFailed = true)
            .then(() => this.productsLoading = false);
        }, 0);

      },
    },
    created() {
      this.loadProducts();
    },
    watch: {
      page() {
        this.loadProducts();
      }
      ,
      filterPriceFrom() {
        this.loadProducts();
      }
      ,
      filterPriceTo() {
        this.loadProducts();
      }
      ,
      filterCategoryId() {
        this.loadProducts();
      },
      filterColor() {
        this.loadProducts();
      }
    }
  };


</script>
<style>
  .loader__container {
    margin: 0;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .loader {
    width: 250px;
    height: 250px;
    font-size: 25px;
    box-sizing: border-box;
    border-top: 0.3em solid darkgreen;
    border-radius: 50%;
    position: relative;
    animation: rotating 2s ease-in-out infinite;
    --direction: 1;
  }

  .loader::before,
  .loader::after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    box-sizing: border-box;
    top: -0.2em;
  }

  .loader::before {
    border-top: 0.3em solid greenyellow;
    transform: rotate(120deg);
  }

  .loader::after {
    border-top: 0.3em solid green;
    transform: rotate(240deg);
  }

  .loader span {
    position: absolute;
    width: inherit;
    height: inherit;
    text-align: center;
    line-height: 10em;
    font-family: sans-serif;
    animation: rotating 2s linear infinite;
    --direction: -1;
  }

  @keyframes rotating {
    50% {
      transform: rotate(calc(180deg * var(--direction)));
    }

    100% {
      transform: rotate(calc(360deg * var(--direction)));
    }
  }

  .loading__failed {
    margin: 0 auto;
  }

  .button-2 {
    text-decoration: none;
    position: relative;
    display: inherit;
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-family: monospace;
    font-size: 16px;
    color: #232323;
  }

  .button-2 span {
    position: relative;
  }

  .button-2:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    height: 100%;
    background: #033903;
    transition: .3s ease-in-out;
  }

  .button-2:hover:before {
    width: 100%;
  }

</style>

