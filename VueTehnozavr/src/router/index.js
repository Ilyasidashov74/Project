import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import CartPage from '../pages/CartPage.vue';
import OrderPage from '../pages/OrderPage';
import OrderInfoPages from '../pages/OrderInfoPages';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '*',
    name: 'notFoundPage',
    component: NotFoundPage,
  },
  {
    path: '/cartPage/',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/orderPAge/',
    name: 'order',
    component: OrderPage,
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPages,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
