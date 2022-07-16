export const menuRouter = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户',
      icon: 'user'
    },
    redirect: '/user/users',
    component: () => import('../layout'),
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          title: '所有用户',
          icon: 'menu'
        },
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'users2',
        name: 'users2',
        meta: {
          title: 'vip用户',
          icon: 'menu'
        },
        component: () => import('@/views/users/index.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'setting'
    },
    redirect: '/setting/miniconfig',
    component: () => import('../layout'),
    children: [
      {
        path: 'miniconfig',
        name: 'miniconfig',
        meta: {
          title: '小程序首页配置',
          icon: 'menu'
        },
        component: () => import('@/views/categories/index.vue')
      }
    ]
  }
]
