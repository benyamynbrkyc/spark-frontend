import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';
import isEmpty from '@/utils/isObjectEmpty';
import { mustBeLoggedInToast } from '@/utils/toasts';
import setAxiosDefaults from '@/utils/setAxiosDefaults';

// TODO: delete
import axios from 'axios';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shipments',
    name: 'Shipments',
    component: () => import('../views/Shipments.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // TODO: delete
  console.log(store.getters.getUser);
  console.log(store.getters.getToken);
  console.log(store.getters.getCartContents);
  setAxiosDefaults(store.getters.getToken);
  console.log(
    'axios.defaults.headers.common["Authorization"]',
    axios.defaults.headers.common['Authorization']
  );

  if (to.fullPath !== '/cart' && to.fullPath !== '/shipments') {
    if (
      to.meta.requiresAuth == true &&
      (isEmpty(store.getters.getUser) || store.getters.getUser.role !== 'admin')
    ) {
      mustBeLoggedInToast();
      next(from.fullPath);
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth == true && isEmpty(store.getters.getUser)) {
      mustBeLoggedInToast();
      next(from.fullPath);
    } else {
      next();
    }
  }
});

export default router;
