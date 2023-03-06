import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gacha',
    name: 'gacha',
    component: () => import('../views/GachaView.vue')
  },
  {
    path: '/item_list',
    name: 'item_list',
    component: () => import('../views/ItemListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
