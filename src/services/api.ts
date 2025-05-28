import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true // ⚠️ This allows cookies to be sent
})

// store access token in memory (or a custom hook)
let accessToken: string | null = null

// set token
export const setAccessToken = (token: string) => {
  accessToken = token
}

// attach token to every request
api.interceptors.request.use(config => {
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// handle 401 errors and refresh token
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    // if access token expired and request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // call refresh endpoint
        const refreshRes = await api.get('/auth/refresh-token')
        const newAccessToken = refreshRes.data.accessToken
        setAccessToken(newAccessToken)

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError)
        // Optionally redirect to login
      }
    }

    return Promise.reject(error)
  }
)

export default api
