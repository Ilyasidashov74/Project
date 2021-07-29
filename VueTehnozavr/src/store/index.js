import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;
        return {
          ...item,
          product,
          image: product.image.file.url
        };
      });
    },
    cartTotalPrice(state, getters) {
      // eslint-disable-next-line max-len
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalProducts(state, getters) {
      // eslint-disable-next-line max-len
      return getters.cartDetailProducts.reduce((acc, item) => (acc + item.amount), 0);
    },
    reloadOrderInfo(state) {
      return state.orderInfo;
    }
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`https://vue-study.skillbox.cc/api/orders/` + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`https://vue-study.skillbox.cc/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey
          }

        })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items),
            context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(`https://vue-study.skillbox.cc/api/baskets/products`, {
            productId: productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          }
        )
        .then(response => {
          context.commit('updateCartProductsData', response.data.items),
            context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount
      });
      if (amount < 1) {
        return;
      }
      return axios
        .put(`https://vue-study.skillbox.cc/api/baskets/products`, {
            productId: productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          }
        )
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      console.log('delete');
      context.state.cartProducts = context.state.cartProducts.filter(item => item.productId !== productId);
      return axios
        .delete(`https://vue-study.skillbox.cc/api/baskets/products`, {
            data: {
              productId: productId,
            },
            params: {
              userAccessKey: context.state.userAccessKey
            },

          }
        )
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    }
  },
  modules: {},
});
