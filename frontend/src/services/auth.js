import api from './axios'

export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const registerUser = (userData) => {
  return api.post('/auth/register', userData)
}

export const logoutUser = () => {
  return api.post('/auth/logout')
}

export const getMe = () => {
  return api.get('/auth/me')
}