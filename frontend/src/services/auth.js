import api from './axios'

export const loginUser = (credentials) => api.post('/auth/login' , credentials)
export const registerUser = (userData) => api.post('/auth/register', userData)
export const logoutUser = () => api.post ('/auth/logout')
export const getMe = () => api.get('/auth/me')