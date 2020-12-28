import store from '@/store';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(() => {
  console.log(store.getters.getUser);
  console.log(store.getters.getToken);
  console.log(
    'axios.defaults.headers.common["Authorization"]',
    axios.defaults.headers.common['Authorization']
  );
});

export default router;
