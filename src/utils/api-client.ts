import axios from 'axios'

const getAccessToken = async (): Promise<string> => {
  try {
    const tokenResponse = await axios.post(process.env.LEARNX_OPEN_EDX_OAUTH_URL ?? 'https://lms.learnx.mn/oauth2/access_token', {
      grant_type: 'client_credentials',
      client_id: process.env.LEARNX_OPEN_EDX_CLIENT_ID,
      client_secret: process.env.LEARNX_OPEN_EDX_CLIENT_SECRET
    })

    return tokenResponse.data.access_token
  } catch (error: any) {
    console.error('Error fetching access token:', error.response?.data.error ?? error)
    return ''
  }
}

const apiClient = axios.create({
  baseURL: process.env.LEARNX_OPEN_EDX_API ?? 'https://lms.learnx.mn/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// apiClient.interceptors.request.use(
//   async (config) => {
//     const token = await getAccessToken()
//     config.headers.Authorization = `Bearer ${token}`
//     return config
//   },
//   async (error) => {
//     return await Promise.reject(error)
//   }
// )

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

export default apiClient
