import axiosInstance from './axiosInstance';

const AuthService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  },

  signup: async (userDetails) => {
    const response = await axiosInstance.post('/signup', userDetails);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;
