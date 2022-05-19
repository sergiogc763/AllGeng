import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserOptionsView from '../views/UserOptionsView.vue'
import ProductView from '../views/ProductView.vue'
import { RoutePaths } from '../core/general/RoutePaths';
const routes: Array<RouteRecordRaw> = [
{
  path: RoutePaths.Home,
  name: 'HomeView',
  component: HomeView
},
{
  path: RoutePaths.Login,
  name: 'LoginView',
  component: LoginView
},
{
  path: RoutePaths.Register,
  name: 'RegisterView',
  component: RegisterView
},
{
  path: RoutePaths.UserOptions,
  name: 'UserOptionsView',
  component: UserOptionsView
},
{
  path: '/producto/:nombre/:id',
  name: 'ProductView',
  component: ProductView,
},

]
const router = createRouter({
  history: createWebHistory(import.meta.env['BASE_URL']),
  routes,
})

export default router
