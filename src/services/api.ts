import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // 
})

// Access token stored in memory
let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

export { accessToken };

// Add Authorization header to every request
api.interceptors.request.use(config => {
  if (accessToken && config.headers) {
    console.log('🔐 Using access token:', accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// Handle 401 and try refresh logic (except for login/refresh routes)
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    const isLoginOrRefresh =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh-token')

    // If 401 error, and not a login/refresh request, and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry && !isLoginOrRefresh) {
      originalRequest._retry = true
      try {
        const refreshRes = await api.post('/auth/refresh-token')
        const newAccessToken = refreshRes.data.accessToken
        setAccessToken(newAccessToken)

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('🔴 Refresh token failed:', refreshError)
        return Promise.reject(refreshError) // 🔒 Prevent retry loops
      }
    }

    return Promise.reject(error)
  }
)

export default api
