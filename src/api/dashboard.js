import request from '@/utils/request'

export function getOperationOverview() {
  return request({
    url: '/screen/get_operation_overview',
    method: 'get'
  })
}

export function getCategoryOverview() {
  return request({
    url: '/screen/get_category_overview',
    method: 'get'
  })
}

export function getCooperationPartners() {
  return request({
    url: '/screen/get_cooperation_partners',
    method: 'get'
  })
}

export function getPartnersOverview() {
  return request({
    url: '/screen/get_partners_overview',
    method: 'get'
  })
}

export function getScreenConfig() {
  return request({
    url: '/screen/get_screen_config',
    method: 'get'
  })
}

export function saveScreenConfig(data) {
  return request({
    url: '/screen/save_screen_config',
    method: 'post',
    data: {
      app_name: 'screen',
      config_name: 'screen_config',
      data
    }
  })
}

export function uploadImg(data) {
  return request({
    url: '/screen/upload_img',
    method: 'post',
    data
  })
}
