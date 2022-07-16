export const menuRouter = [
  {
    path: '/user',
    name: 'user',
    redirect: '/user/users',
    component: () => import('../layout'),
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'users2',
        name: 'users2',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'users3',
        name: 'users3',
        component: () => import('@/views/users/index.vue'),
        children: [
          {
            path: 'users31',
            name: 'users31',
            component: () => import('@/views/users/index.vue')
          },
          {
            path: 'users32',
            name: 'users32',
            component: () => import('@/views/users/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    redirect: '/categories',
    component: () => import('../layout'),
    children: [
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/categories/index.vue')
      }
    ]
  }
]
