import jwt from 'jsonwebtoken'

export function isAuthenticated() {
  const token = localStorage.getItem('Authorization')
  if (!token) return false
}

export function getUserID() {
  const token = localStorage.getItem('Authorization')
  return jwt.decode(token).id
}

export function logout() {
  localStorage.clear()
  return true
}
