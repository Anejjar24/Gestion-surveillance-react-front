import axios from 'axios';
import { AuthService } from "services/authentification/authService";

const API_URL = '/options/';
const API_URL_COUNT = '/options/count';

// Create an axios instance with default configuration
const secureAxios = axios.create();

// Interceptor to add the token to each request
secureAxios.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const OptionService = {
  importOptionsFromCSV: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await secureAxios.post("/options/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error importing file");
    }
  },
  getAllOptions: async () => {
    try {
      const response = await secureAxios.get(API_URL);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  getOptionsByDepartmentId: async (departmentId) => {
    try {
      const response = await secureAxios.get(`${API_URL}department/${departmentId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  getOptionsByName: async (nom) => {
    try {
      const response = await secureAxios.get(`${API_URL}name/${nom}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  addOption: async (option) => {
    try {
      const response = await secureAxios.post(API_URL, option, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  updateOption: async (id, option) => {
    try {
      const response = await secureAxios.put(`${API_URL}${id}`, option, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  deleteOption: async (id) => {
    try {
      const response = await secureAxios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  countAllOptions: async () => {
    try {
      const response = await secureAxios.get(`${API_URL_COUNT}/all`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  countOptionsByDepartment: async (department) => {
    try {
      const response = await secureAxios.post(`${API_URL_COUNT}/department`, department, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  existsOptionByNameAndDepartment: async (nom, department) => {
    try {
      const response = await secureAxios.post(`${API_URL}exists/${nom}`, department, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  }
};
secureAxios.defaults.withCredentials = true;

export default OptionService;
