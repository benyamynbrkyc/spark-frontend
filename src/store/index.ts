import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    token: '',
    user: {},
    cart: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    resetCart(state) {
      state.cart = [];
    },
    pushToCart(state: any, product) {
      for (const obj in state.cart) {
        if (JSON.stringify(state.cart[obj]) === JSON.stringify(product)) return;
      }

      state.cart.push(product);
    },
    removeFromCart(state: any, productToDelete) {
      state.cart = state.cart.filter(
        (product: any) => product._id !== productToDelete._id
      );
    },
    incrementQuantity(state: any, product) {
      state.cart.find((stateProduct: any) => stateProduct._id === product._id)
        .quantity++;
    },
    decrementQuantity(state: any, product) {
      state.cart.find((stateProduct: any) => stateProduct._id === product._id)
        .quantity--;

      if (
        state.cart.find((stateProduct: any) => stateProduct._id === product._id)
          .quantity <= 1
      ) {
        state.cart.find(
          (stateProduct: any) => stateProduct._id === product._id
        ).quantity = 1;
      }
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getCartContents(state) {
      return state.cart;
    }
  },
  plugins: [createPersistedState()]
});

export default store;
