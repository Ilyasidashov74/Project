<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="colors.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                v-model="currentColor"
                :value="color.id"
                checked=""
              />
              <span class="colors__value" :style="{background:color.code}">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        currentPriceFrom: 0,
        currentPriceTo: 0,
        currentCategoryId: 0,
        currentColor: '#FFFFFF',
        categoriesData: null,
        colorsData: null,
      };
    },
    props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
    computed: {
      categories() {
        return this.categoriesData ? this.categoriesData : [];
      },
      colors() {
        return this.colorsData ? this.colorsData : [];
      }
    },
    watch: {
      priceFrom(value) {
        this.currentPriceFrom = value;
      },
      priceTo(value) {
        this.currentPriceTo = value;
      },
      categoryId(value) {
        this.currentCategoryId = value;
      },
      color(value) {
        this.currentColor = value;
      },
    },
    methods: {
      submit() {
        this.$emit('update:priceFrom', this.currentPriceFrom);
        this.$emit('update:priceTo', this.currentPriceTo);
        this.$emit('update:categoryId', this.currentCategoryId);
        this.$emit('update:color', this.currentColor);
      },
      reset() {
        this.$emit('update:priceFrom', 0);
        this.$emit('update:priceTo', 0);
        this.$emit('update:categoryId', 0);
        this.$emit('update:color', '#FFFFFF');
      },
      loadCategories() {
        axios
          .get(`https://vue-study.skillbox.cc/api/productCategories`, {
            'Content-type': 'application/json'
          })
          .then(response => {

            this.categoriesData = response.data.items;
          })
          .catch(error => {
            console.log('Error is>>>>>>>>>>>>>>', error);
          });

      },
      loadColors() {
        axios
          .get(`https://vue-study.skillbox.cc/api/colors`, {
            'Content-type': 'application/json'
          })
          .then(response => {
            console.log(response);
            console.log(response);
            this.colorsData = response.data.items;
          })
          .catch(error => {
            console.log('Error is>>>>>>>>>>>>>>', error);
          });

      },
    },
    created() {
      this.loadCategories();
      this.loadColors();
    },

  };
</script>
