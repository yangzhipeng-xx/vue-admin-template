import request from '@/utils/request'

export function getExcelData(params) {
  return request({
    url: '/tools/excel/get_data',
    method: 'get',
    params
  })
}

export function getExcelHeader() {
  return request({
    url: '/tools/excel/get_header',
    method: 'get'
  })
}

export function saveOrUpdateData(data) {
  return request({
    url: '/tools/excel/save_or_update_data',
    method: 'post',
    data
  })
}

export function deleteData(params) {
  return request({
    url: '/tools/excel/del_data',
    method: 'DELETE',
    params
  })
}

export function importExcel(data) {
  return request({
    url: '/tools/excel/import',
    method: 'post',
    data
  })
}

export function exportExcel(params) {
  return request({
    url: '/tools/excel/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// export function getExcelNames(params) {
//   return request({
//     url: '/tools/excel/get_names',
//     method: 'get',
//     params
//   })
// }
