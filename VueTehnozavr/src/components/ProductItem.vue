<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product',params: {id: product.id}}">
      <img class="img__size" :src="product.image.file.url" alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(code,index) in colors" :key="index">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="code"
            v-model="currentColor"
          />
          <span class="colors__value" :style="{background:code.code}">
            </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
  import gotoPage from '../helpers/gotoPage';
  import numberFormat from '../helpers/numberFormat';

  export default {
    props: ['product'],
    data() {
      return {
        currentColor: '#73b6ea',
        colors: []
      };
    },
    created() {
      this.colors = Array.from(this.product.colors);
    },
    methods: {
      gotoPage,
    },
    filters: {
      numberFormat,
    },
  };
</script>
<style>
  .colors__value {
    border: 1px solid #2f2f2f;
  }
  .img__size{
    width: 250px;
    height: 250px;
  }
</style>
