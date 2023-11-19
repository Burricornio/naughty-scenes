import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/impro',
    name: 'Impro',
    component: () => import('@/views/ImproView.vue')
  },
  {
    path: '/actor',
    name: 'Actor',
    component: () => import('@/views/ActorView.vue')
  },
  {
    path: '/director',
    name: 'Director',
    component: () => import('@/views/DirectorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
