import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/home/index'),
    hidden: true,
    meta: { title: '鸿蒙外设管理平台' }
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/dashboard/BlankScreen'),
    meta: { title: '投屏' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: { title: '数据看板', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '大屏投屏', icon: 'dashboard' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/dashboard/Configuration'),
        meta: { title: '投屏配置', icon: 'dashboard' }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/dashboard/TestWeeklyReport.vue'),
        meta: { title: '测试周报', icon: 'dashboard' }
      },
      {
        path: 'briefing',
        name: 'Briefing',
        component: () => import('@/views/dashboard/TestWorkBriefing.vue'),
        meta: { title: '测试工作简报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    // redirect: '/form/index',
    meta: { title: '计划与进展', icon: 'form' },
    children: [
      {
        path: '',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '计划与进展', icon: 'form' }
      }
    ]
  },
  {
    path: '/certification',
    component: Layout,
    redirect: '/certification/menu1',
    name: 'Certification',
    alwaysShow: true,
    meta: { title: '认证测试', icon: 'nested' },
    children: [
      {
        path: 'problem',
        component: () => import('@/views/certification/problem/index'), // Parent router-view
        name: 'Problem',
        meta: { title: '问题跟踪表', icon: 'nested' }
      },
      {
        path: 'exempt',
        component: () => import('@/views/certification/exempt/index'),
        name: 'Exempt',
        meta: { title: '豁免清单', icon: 'nested' }
      }
    ]
  },
  {
    path: '/tool',
    component: Layout,
    meta: { title: '工具清单', icon: 'tree' },
    children: [
      {
        path: '',
        component: () => import('@/views/toolList/index'),
        name: 'Tool',
        meta: { title: '工具清单', icon: 'tree' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    meta: { title: '配置', icon: 'table' },
    children: [
      {
        path: '',
        component: () => import('@/views/config/index'),
        name: 'ConfigMenu',
        meta: { title: '配置', icon: 'table' }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
