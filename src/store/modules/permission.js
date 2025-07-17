import permissionMap from '@/router/permissionMap'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 根据权限 ID 列表，过滤 asyncRoutes 中用户有权访问的路由
 */
export function filterAsyncRoutes(routes, allowedPermissionIds) {
  return routes.filter((route) => {
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

const state = {
  routes: JSON.parse(sessionStorage.getItem('routes')) || []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // sessionStorage.setItem("routes", JSON.stringify(routes)); // 存储到sessionStorage
    // state.routes = JSON.parse(sessionStorage.getItem("routes")) || [];
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  },
  generateRoutes({ commit }, permissionIds = []) {
    return new Promise((resolve) => {
      let accessedRoutes
      if (permissionIds.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionIds)
      }
      console.log('store accessedRoutes: ==== ', accessedRoutes)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
