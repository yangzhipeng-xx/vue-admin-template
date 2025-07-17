import request from '@/utils/request'

export function login() {
  return request({
    url: '/admin/user_login',
    method: 'get'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/admin/user_login_out',
    method: 'get'
  })
}
