import { createWebHistory, createRouter } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/HomePage.vue';
import ItemsPage from '../components/ItemsPage.vue';
import CartPage from '../components/CartPage.vue';
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path:'/home',
    name: 'home',
    component: HomePage
  },
  {
    path:'/items',
    name: 'items',
    component: ItemsPage
  },
  {
    path:'/cart',
    name: 'cart',
    component: CartPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
  
export default router;