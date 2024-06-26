import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.LEARNX_OPEN_EDX_API || 'https://lms.learnx.mn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or other custom headers here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default apiClient;
