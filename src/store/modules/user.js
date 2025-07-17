import {
  login,
  logout
  // getInfo
} from '@/api/user'
import { getToken, removeToken, clearSession } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: localStorage.getItem('username') || '',
    avatar: require('@/assets/Logo.png'),
    permissionIds: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_PERMISSION_IDS: (state, permissionIds) => {
    state.permissionIds = permissionIds
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }) {
    return new Promise((resolve, reject) => {
      login()
        .then((res) => {
          const { app_menu_list } = res.data
          commit('SET_PERMISSION_IDS', app_menu_list)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          localStorage.removeItem('username')
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      clearSession()
      localStorage.removeItem('username')
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
