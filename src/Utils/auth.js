import jwtDecode from 'jwt-decode'

export function isAuthenticated() {
  const token = localStorage.getItem('Authorization')
  if (!token) return false
  return jwtDecode(token)
}

export function getUserID() {
  const token = localStorage.getItem('Authorization')
  return jwtDecode(token).id
}

export function logout() {
  localStorage.clear()
  return true
}
