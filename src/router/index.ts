import { GameModeName } from '@/stores/useGameStore'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/impro',
    name: GameModeName.IMPRO,
    component: () => import('@/views/ImproView.vue')
  },
  {
    path: '/actor',
    name: GameModeName.ACTOR,
    component: () => import('@/views/ActorView.vue')
  },
  {
    path: '/director',
    name: GameModeName.DIRECTOR,
    component: () => import('@/views/DirectorView/DirectorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
