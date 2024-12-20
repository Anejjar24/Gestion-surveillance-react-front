import axios from 'axios';

const API_URL = '/api/auth/';

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(API_URL + 'login', { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthHeader(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (email, password) => {
    try {
      const response = await axios.post(API_URL + 'signup', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    setAuthHeader(null);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Fonction d'initialisation à appeler au démarrage de l'application
  initializeAuth: () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      setAuthHeader(user.token);
    }
  }
};

export default AuthService;