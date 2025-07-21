import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getSessionToken, setSessionToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  if (to.path === '/404') {
    next()
    NProgress.done()
    return
  }

  if (to.path === '/screen') {
    next()
    NProgress.done()
    return
  }

  // 如果访问 /dashboard/index 并且带 token 参数
  if (to.path === '/' && to.query.token) {
    const incomingToken = to.query.token
    setSessionToken(incomingToken)

    try {
      console.log('Setting session token:', incomingToken)
      // const { app_menu_list: permissionIds } = await store.dispatch(
      //   'user/login'
      // )

      // const accessRoutes = await store.dispatch(
      //   'permission/generateRoutes',
      //   permissionIds
      // )
      // // const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionIds);
      // accessRoutes.push({ path: '*', redirect: '/404', hidden: true })

      // console.log(' hasToken  accessedRoutes:', accessRoutes)

      // router.addRoutes(accessRoutes)
      // store.dispatch('permission/setRoutes', accessRoutes)
    } catch (error) {
      console.error('Login failed:', error)
      next('/404')
      NProgress.done()
    }
  }

  const hasToken = getSessionToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/404' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const permissionIds = store.getters.permissionIds
      const hasPermissionIds = permissionIds && permissionIds.length > 0
      console.log('hasToken permissionIds:', permissionIds)

      if (hasPermissionIds) {
        next()
      } else {
        try {
          const { app_menu_list: permissionIds } = await store.dispatch(
            'user/login'
          )

          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            permissionIds
          )
          // const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionIds);
          accessRoutes.push({ path: '*', redirect: '/404', hidden: true })

          console.log(' hasToken  accessedRoutes:', accessRoutes)

          router.addRoutes(accessRoutes)

          // // 删除 token 和 from 参数
          // const query = { ...to.query }
          // delete query.token
          // delete query.from

          // 跳转到目标页面（不带 token）
          // next({ ...to, query }) // 注意不要 replace: true
          next({ ...to, replace: true })
          NProgress.done()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error.message || 'Has Error')
          // next(`/404`)
          NProgress.done()
        }
      }
    }
  } else {
    next('/404')
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
