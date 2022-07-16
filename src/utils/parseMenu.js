export default function parseMenu(routes) {
  const menus = traverse(routes)
  return menus
}

function traverse(routes, path = '') {
  const menus = []
  routes.sort((a, b) => {
    if (a.meta.menuNum && b.meta.menuNum) return a.meta.menuNum - b.meta.menuNum
    return 1
  })

  routes.forEach((route) => {
    if (!route.meta.hideMenu) {
      const menu = {
        path: path ? parsePath([path, route.path]) : route.path,
        title: route.meta.title,
        name: route.name,
        icon: route.meta.icon || '',
        children: []
      }
      if (route.children && route.children.length !== 0) {
        menu.children = traverse(route.children, menu.path)
      }
      menus.push(menu)
    }
  })

  return menus
}

function parsePath(arr) {
  return arr.reduce((pre, next) => {
    pre = pre.trim().replace('/', '')
    next = next.trim().replace('/', '')
    return `/${pre}/${next}`
  })
}
