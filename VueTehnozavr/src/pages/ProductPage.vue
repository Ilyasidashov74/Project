<template>

  <div class="loader__container" v-if="productLoading">
    <div class="loader">
      <span>Загрузка...</span>
    </div>
  </div>


  <div class="loading__failed" v-else-if="!productData">Произошла ошибка :(
    <button @click.prevent="loadProduct" class="button-2"><span>Попробовать еще </span></button>
  </div>

  <main class="content container" v-else="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{product.title}} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="370"
            height="370"
            :src="product.image.file.url"
            :alt="product.title"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">{{product.title}}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price"> {{product.price | numberFormat}} р </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="blue"
                      checked=""
                    />
                    <span
                      class="colors__value"
                      style="background-color: #73b6ea"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="yellow"
                    />
                    <span
                      class="colors__value"
                      style="background-color: #ffbe15"
                    >
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="gray"/>
                    <span
                      class="colors__value"
                      style="background-color: #939393"
                    >
                    </span
                    ></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                        @click="productAmount = productAmount === 0 ? productAmount : productAmount - 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount"/>

                <button type="button" aria-label="Добавить один товар" @click="productAmount += 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляем товар в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br/>
            Синхронизация со смартфоном<br/>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br/>
            Поддержка сторонних приложений<br/>
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер,который позволяет
            оптимизировать свои велотренировки,сделав их максимально
            эффективными.Wahoo ELEMNT BOLT GPS синхронизируется с датчиками
            по ANT+,объединяя полученную с них информацию. Данные отображаются
            на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю
            56 мм. На дисплей выводятся координаты и скорость, а также
            полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не
            входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает,что устройство не боится пыли,а
            также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
  import axios from 'axios';
  import gotoPage from '../helpers/gotoPage';
  import numberFormat from '../helpers/numberFormat';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        productAmount: 1,
        productData: null,
        productLoading: false,
        productLoadingFailed: false,
        productAdded: false,
        productAddSending: false,
      };
    },
    filters: {
      numberFormat,
    },
    computed: {
      product() {
        return this.productData;
      },
      category() {
        return this.productData.category;
      },
    },
    methods: {
      ...mapActions(['addProductToCart']),
      gotoPage,
      addToCart() {
        this.productAdded = false;
        this.productAddSending = true;
        this.addProductToCart({
          productId: this.product.id,
          amount: this.productAmount
        })
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          });
      },
      loadProduct() {
        this.productLoading = true,
          this.productLoadingFailed = false;
        return axios
          .get(`https://vue-study.skillbox.cc/api/products/` + this.$route.params.id)
          .then(response => this.productData = response.data)
          .catch(() => this.productLoadingFailed = true)
          .then(() => this.productLoading = false);
      }
    },
    created() {
      this.loadProduct();
    },
    watch: {
      '$route.params.id'() {
        this.loadProduct();
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

