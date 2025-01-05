import axios from 'axios';
import { AuthService } from "services/authentification/authService";

// Création d'une instance axios avec configuration par défaut
const secureAxios = axios.create();

// Intercepteur pour ajouter le token à chaque requête
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

const API_URL = '/locals/';
const API_URL_COUNT = '/locals/count';

export const localService = {
  importLocauxFromCSV: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await secureAxios.post(`${API_URL}import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Import error details:", error.response);
      throw new Error(error.response?.data?.message || "Error importing file");
    }
  },
  // Récupérer tous les locaux
  getAllLocals: async () => {
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
  
  // Récupérer le nombre total de locaux
  getCountLocals: async () => {
    try {
      const response = await secureAxios.get(API_URL_COUNT);
      return response.data; // Retourne la donnée brute (un entier)
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  // Ajouter un local
  addLocal: async (local) => {
    try {
      const response = await secureAxios.post(API_URL, local);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  // Supprimer un local
  deleteLocal: async (id) => {
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

  // Mettre à jour un local
  updateLocal: async (local) => {
    try {
      const response = await secureAxios.put(`${API_URL}${local.id}`, local);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },// localService.js

  getLocalById: async (id) => {
    try {
      const response = await secureAxios.get(`${API_URL}${id}`);
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

export default localService;
