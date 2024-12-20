import axios from "axios";
import { AuthService } from "services/authentification/authService";

const API_URL = "/modules/";
const secureAxios = axios.create();

secureAxios.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const ModuleService = {
  getAllModules: async () => {
    try {
      const response = await secureAxios.get(API_URL);
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  getModulesByOptionId: async (optionId) => {
    try {
      const response = await secureAxios.get(`${API_URL}option/${optionId}`);
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  countModulesByOptionId: async (optionId) => {
    try {
      const response = await secureAxios.get(`${API_URL}count/option/${optionId}`);
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  addModule: async (module) => {
    try {
      const response = await secureAxios.post(API_URL, module, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  updateModule: async (id, moduleDetails) => {
    try {
      const response = await secureAxios.put(`${API_URL}${id}`, moduleDetails, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },

  deleteModule: async (id) => {
    try {
      const response = await secureAxios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  },
};

function handleAuthError(error) {
  if (error.response?.status === 401) {
    AuthService.logout();
    window.location.href = "/sign-in";
  }
}
