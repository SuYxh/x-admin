import { createRouter, createWebHashHistory } from 'vue-router'
import { menuRouter } from './menuRouter'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: '/',
    // component: () => import('../layout'),
    redirect: '/user/users'
  },
  ...menuRouter
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
