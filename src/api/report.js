import request from '@/utils/request'

export function getEditConfig() {
  return request({
    url: '/screen/get_week_work_config',
    method: 'get'
  })
}

export function editConfig(data) {
  return request({
    url: '/screen/save_week_work_config',
    method: 'post',
    data: {
      app_name: 'week_work',
      config_name: 'week_work_config',
      data
    }
  })
}

export function getReport() {
  return request({
    url: '/screen/get_week_work_data',
    method: 'get'
  })
}

export function exportExcel() {
  return request({
    url: '/screen/excel/week_work_export',
    method: 'get',
    responseType: 'blob'
  })
}
