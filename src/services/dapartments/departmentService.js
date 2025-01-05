import axios from 'axios';
import { AuthService } from "services/authentification/authService";


const API_URL = '/departments/';
const API_URL_COUNT = '/departments/count';

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

export const DepartmentService = {

  getDepartmentById: async (id) => {
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
  },
  importDepartmentsFromCSV: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await secureAxios.post("/departments/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error importing file");
    }
  },
  getAllDepartments: async () => {
    try {
      const response = await secureAxios.get(API_URL);
      console.log('Réponse de l\'API:', response.data); 
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  getCountDepartment: async () => {
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

  // addDepartment: async (department) => {
  //   try {
  //     const response = await secureAxios.post(API_URL, department);
  //     return response.data;
  //   } catch (error) {
  //     if (error.response?.status === 401) {
  //       AuthService.logout();
  //       window.location.href = '/sign-in';
  //     }
  //     throw error;
  //   }
  // },
  addDepartment: async (department) => {
    try {
      const response = await secureAxios.post(API_URL, department, {
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
  deleteDepartment: async (id) => {
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

  updateDepartment: async (department) => {
    try {
      const response = await secureAxios.put(`${API_URL}/${department.id}`, department);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  getDepartmentById: async (id) => {
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
export default DepartmentService;