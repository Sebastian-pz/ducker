import jwtDecode from 'jwt-decode'

export function isAuthenticated() {
  const token = localStorage.getItem('Authorization')
  if (!token) return false
  if (validateExpDate(token)) return true
}

function validateExpDate(token) {
  const decoded = jwtDecode(token)
  if (!decoded) return false
  if (decoded.exp * 1000 < Date.now()) {
    console.log('Logging out')
    localStorage.clear()
    return false
  }

  return true
}

export function getUserID() {
  const token = localStorage.getItem('Authorization')
  return jwtDecode(token).id
}

export function logout() {
  localStorage.clear()
  return true
}
