<template>
  <main class="content container">
    <div class="loader__container" v-if="orderLoading">
      <div class="loader">
        <span>Оформляем...</span>
      </div>
    </div>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
       Товаров в корзине: {{ totalProducts  }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" placeholder="Введите ваше полное имя"
                          :error="formError.name"></BaseFormText>
            <BaseFormText v-model="formData.address" title="Адрес доставки"
                          placeholder="Введите ваш адрес" :error="formError.address"></BaseFormText>
            <BaseFormText v-model="formData.phone" title="Телефон" type="tel"
                          placeholder="Введите ваш телефон" :error="formError.phone"></BaseFormText>
            <BaseFormText v-model="formData.email" title="Email" type="email"
                          placeholder="Введи ваш Email" :error="formError.email"></BaseFormText>
            <BaseFormTextArea title="Комментарии к заказу" :error="formError.comment"
                              v-model="formData.comment" placeholder="Ваши пожелания"
                              name="comments"></BaseFormTextArea>
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                         checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart__block">
          <ul class="cart__orders" v-for="item in products">
            <li class="cart__order">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price}} ₽</b>
              <span> Артукул товара: {{item.product.id}}</span>
              <span> Количетсво:{{item.amount}}</span>
            </li>

          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalProducts }}</b> товара на сумму <b>{{ totalPrice | numberFormat}}
              ₽</b></p>
          </div>
        </div>

        <button class="cart__button button my__btn" type="submit">
          Оформить заказ
        </button>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>

</template>

<script>

  import BaseFormText from '../components/BaseFormText';
  import BaseFormTextArea from '../components/BaseFormTextArea';
  import { mapGetters } from 'vuex';
  import numberFormat from '../helpers/numberFormat';
  import axios from 'axios';

  export default {
    filters:
      { numberFormat },
    computed: {
      ...mapGetters({
        products: 'cartDetailProducts',
        totalPrice: 'cartTotalPrice',
        totalProducts: 'cartTotalProducts'
      }),
    },
    components: {
      BaseFormText,
      BaseFormTextArea
    },
    data() {
      return {
        formData: {},
        formError: {},
        formErrorMessage: '',
        orderLoading: false
      };
    },
    methods: {
      order() {
        this.formError = {};
        this.formErrorMessage = '';
        this.orderLoading = true;
        axios
          .post('https://vue-study.skillbox.cc/api/orders', {
            ...this.formData
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey
            }
          })
          .then(response => {
            this.orderLoading = false;
            this.$store.commit('resetCart'),
              this.$store.commit('updateOrderInfo', response.data),
              this.$router.push({
                name: 'orderInfo',
                params: { id: response.data.id }
              });
          })
          .catch(error => {
            this.orderLoading = false;
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          });
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

  .my__btn {
    background-color: #9eff00;
    border: 1px solid #9eff00;
    font-family: "PressStart";
    color: #222;
    font-size: 13px;
  }

  .my__btn:hover {
    background-color: black;
    color: white;
    border: 1px solid #9eff00;
  }
</style>
