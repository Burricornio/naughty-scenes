import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ViewName } from './types'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ViewName.HOME,
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: `/${ViewName.IMPRO}`,
    name: ViewName.IMPRO,
    component: () => import('@/views/ImproView.vue')
  },
  {
    path: `/${ViewName.ACTOR}`,
    name: ViewName.ACTOR,
    component: () => import('@/views/ActorView.vue')
  },
  {
    path: `/${ViewName.DIRECTOR}`,
    name: ViewName.DIRECTOR,
    component: () => import('@/views/DirectorView/DirectorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
