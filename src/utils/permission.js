import permissionMap from '@/router/permissionMap'

/**
 * 根据权限 ID 列表，过滤 asyncRoutes 中用户有权访问的路由
 */
export function filterAsyncRoutes(routes, allowedPermissionIds) {
  return routes.filter(route => {
    const routeName = route.meta?.title
    const routeId = routeName ? permissionMap[routeName] : null

    const hasAccess = routeId && allowedPermissionIds.includes(routeId)

    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children, allowedPermissionIds)
      const hasChildAccess = route.children.length > 0

      return hasAccess || hasChildAccess
    }

    return hasAccess
  })
}
