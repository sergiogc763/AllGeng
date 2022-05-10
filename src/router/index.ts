import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
const routes: Array<RouteRecordRaw> = [
{
  path: '/',
  name: 'HomeView',
  component: HomeView
},
{
  path: '/login',
  name: 'LoginView',
  component: LoginView
},
{
  path: '/register',
  name: 'RegisterView',
  component: RegisterView
}

]
const router = createRouter({
  history: createWebHistory(import.meta.env['BASE_URL']),
  routes,
})

export default router
