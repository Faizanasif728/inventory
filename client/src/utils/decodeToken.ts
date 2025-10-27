import { jwtDecode } from 'jwt-decode'
import { TUser } from '../redux/services/authSlice'

const decodeToken = (token: string): TUser => {
  return jwtDecode(token)
}

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as any
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    return true // If token is invalid, consider it expired
  }
}

// Check if token is valid (not expired and properly formatted)
export const isTokenValid = (token: string): boolean => {
  if (!token) return false
  return !isTokenExpired(token)
}

export default decodeToken