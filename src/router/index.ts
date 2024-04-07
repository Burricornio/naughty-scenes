import { ModeName } from '@/stores/useMode/types'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/impro',
    name: ModeName.IMPRO,
    component: () => import('@/views/ImproView.vue')
  },
  {
    path: '/actor',
    name: ModeName.ACTOR,
    component: () => import('@/views/ActorView.vue')
  },
  {
    path: '/director',
    name: ModeName.DIRECTOR,
    component: () => import('@/views/DirectorView/DirectorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
