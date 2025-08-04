import request from '@/utils/request'

export function getProblemHeader() {
  return request({
    url: '/tools/problem/excel/get_header',
    method: 'get'
  })
}

export function getProblemData(params) {
  return request({
    url: '/tools/problem/excel/get_data',
    method: 'get',
    params
  })
}

export function importExcel(data) {
  return request({
    url: '/tools/problem/excel/import',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: '/tools/problem/excel/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function saveHeaderConfig(data) {
  return request({
    url: '/tools/problem/save_header_config',
    method: 'post',
    data: {
      app_name: 'problem',
      config_name: 'problem_header_config',
      data
    }
  })
}

export function deleteData(params) {
  return request({
    url: '/tools/problem/excel/del_data',
    method: 'DELETE',
    params
  })
}

// problem_image或者deal_image
export function uploadImg(data) {
  return request({
    url: '/tools/exempt/upload_img',
    method: 'post',
    data
  })
}

export function saveOrUpdateData(data) {
  return request({
    url: '/tools/problem/excel/save_or_update_data',
    method: 'post',
    data
  })
}
