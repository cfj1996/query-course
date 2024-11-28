import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('@/views/base/UserList.vue'),
    },
    {
      path: '/base/create',
      name: 'baseCreate',
      component: () => import('@/views/base/CreateUser.vue'),
    },
    {
      path: '/base/create/:id',
      name: 'baseUpdate',
      component: () => import('@/views/base/CreateUser.vue'),
    },
    {
      path: '/base/:id',
      name: 'baseUserDetail',
      component: () => import('@/views/base/detail.vue'),
    },
    {
      path: '/linkQuery',
      name: 'linkQuery',
      component: () => import('@/views/LinkQuery.vue'),
    },
  ],
})

export default router
