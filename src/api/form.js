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

export function exportExcel(data) {
  return request({
    url: '/tools/excel/export',
    method: 'post',
    data,
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

export function getDataDict() {
  return request({
    url: '/tools/excel/get_data_dict',
    method: 'get'
  })
}

export function saveHeaderConfig(data) {
  return request({
    url: '/tools/excel/save_header_config',
    method: 'post',
    data: {
      app_name: 'plan',
      config_name: 'plan_header_config',
      data
    }
  })
}

export function uploadFiles(data) {
  return request({
    url: '/tools/excel/upload_files',
    method: 'post',
    data
  })
}

export function downloadFiles(data) {
  return request({
    url: '/tools/excel/download_files',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
