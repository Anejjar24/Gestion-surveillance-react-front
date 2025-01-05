import axios from 'axios';
import { AuthService } from "services/authentification/authService";

const secureAxios = axios.create();

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

const API_URL = '/exams';

export const examService = {
  getAllExams: async () => {
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

  getExamsByDate: async (date) => {
    try {
      const response = await secureAxios.get(`${API_URL}date/${date}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  getExamById: async (id) => {
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

  createExam: async (exam) => {
    try {
      const response = await secureAxios.post(API_URL, exam);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  updateExam: async (id, exam) => {
    try {
      const response = await secureAxios.put(`${API_URL}${id}`, exam);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        AuthService.logout();
        window.location.href = '/sign-in';
      }
      throw error;
    }
  },

  deleteExam: async (id) => {
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
  }, getExamsByDateAndTime: async (date, startTime, endTime, sessionId) => {
    try {
      const response = await secureAxios.get(`${API_URL}/findByDateAndTime`, {
        params: {
          date,
          startTime,
          endTime,
          sessionId
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
export default examService;