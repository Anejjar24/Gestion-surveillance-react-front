import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/auth', // Changez l'URL selon votre backend
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
