import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.LEARNX_OPEN_EDX_API ?? 'https://lms.learnx.mn/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  async (config) => {
    return config // No need for await here
  },
  async (error) => {
    return Promise.reject(error) // No need for await here
  }
)

apiClient.interceptors.response.use(
  async (response) => {
    return response // No need for await here
  },
  async (error) => {
    // Handle errors globally
    return Promise.reject(error) // No need for await here
  }
)

export default apiClient
