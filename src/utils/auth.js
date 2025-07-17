import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'harmony_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const sessionStorageKey = 'harmony_session_token'
export function getSessionToken() {
  return sessionStorage.getItem(sessionStorageKey)
}

export function setSessionToken(token) {
  return sessionStorage.setItem(sessionStorageKey, token)
}

export function removeSessionToken() {
  return sessionStorage.removeItem(sessionStorageKey)
}

export function clearSession() {
  return sessionStorage.clear()
}
