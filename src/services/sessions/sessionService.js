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

export default sessionService;



// import axios from 'axios';
// import { AuthService } from "services/authentification/authService";
// // Création d'une instance axios avec configuration par défaut
// const secureAxios = axios.create();

// // Intercepteur pour ajouter le token à chaque requête
// secureAxios.interceptors.request.use(
//   (config) => {
//     const user = AuthService.getCurrentUser();
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// const API_URL = '/sessions/';
// const API_URL_Count = '/sessions/count';

// export const sessionService = {
//   // Récupérer toutes les sessions
//   getAllSessions: async () => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur lors de la récupération des sessions:', error);
//       throw error;
//     }
//   },
  
//   // Récupérer le nombre total de sessions
//   getCountSessions: async () => {
//     try {
//       const response = await axios.get(API_URL_Count);
//       return response.data; // Retourne la donnée brute (un entier)
//     } catch (error) {
//       console.error("Erreur lors de la récupération du nombre de sessions:", error);
//       throw error;
//     }
//   },addSession: async (session) => {
//     try {
//       const response = await axios.post(API_URL, session);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur lors de la création de la session:', error);
//       throw error;
//     }
//   },

//   // Supprimer une session
//   deleteSession: async (id) => {
//     try {
//       const response = await axios.delete(`${API_URL}${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur lors de la suppression de la session:', error);
//       throw error;
//     }
//   },

//   // Mettre à jour une session
//   updateSession: async (session) => {
//     try {
//       const response = await axios.put(API_URL, session);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de la session:', error);
//       throw error;
//     }
//   }
// };



