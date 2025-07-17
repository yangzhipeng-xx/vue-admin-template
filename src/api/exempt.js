import request from '@/utils/request'

export function getExemptHeader() {
  return request({
    url: '/tools/exempt/excel/get_header',
    method: 'get'
  })
}

export function getExemptData(params) {
  return request({
    url: '/tools/exempt/excel/get_data',
    method: 'get',
    params
  })
}

export function importExcel(data) {
  return request({
    url: '/tools/exempt/excel/import',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: '/tools/exempt/excel/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

export function saveHeaderConfig(data) {
  return request({
    url: '/tools/exempt/save_header_config',
    method: 'post',
    data: {
      app_name: 'exempt',
      config_name: 'exempt_header_config',
      data
    }
  })
}

export function deleteData(params) {
  return request({
    url: '/tools/exempt/excel/del_data',
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
    url: '/tools/exempt/excel/save_or_update_data',
    method: 'post',
    data
  })
}
