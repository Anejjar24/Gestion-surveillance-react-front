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

const API_URL = '/sessions/';
const API_URL_COUNT = '/sessions/count';

export const sessionService = {
  // Récupérer toutes les sessions
  importSessionsFromCSV: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await secureAxios.post("/sessions/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error importing file");
    }
  },
  getAllSessions: async () => {
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

  // Récupérer le nombre total de sessions
  getCountSessions: async () => {
    try {
      const response = await secureAxios.get(API_URL_COUNT);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  // Ajouter une session
  addSession: async (session) => {
    try {
      const response = await secureAxios.post(API_URL, session);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  // Supprimer une session
  deleteSession: async (id) => {
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

  // Mettre à jour une session
  updateSession: async (session) => {
    try {
      const response = await secureAxios.put(`${API_URL}${session.id}`, session);
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
export default sessionService;

