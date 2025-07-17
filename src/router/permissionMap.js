export const ASYNC_ROUTES = [
  { name: '数据看板', id: 'W10' },
  { name: '大屏投屏', id: 'W1001' },
  { name: '投屏配置', id: 'W1002' },
  { name: '计划与进展', id: 'W11' },
  { name: '认证测试', id: 'W12' },
  { name: '问题跟踪表', id: 'W1201' },
  { name: '豁免清单', id: 'W1202' },
  { name: '工具清单', id: 'W13' },
  { name: '配置', id: 'W14' }
]

const permissionMap = {}
ASYNC_ROUTES.forEach(item => {
  permissionMap[item.name] = item.id
})

export default permissionMap
