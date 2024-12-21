import axios from 'axios';

const API_URL = '/enseignants/';
const API_URL_COUNT = '/enseignants/count';
const API_URL_COUNT_ALL = '/enseignants/count';
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

export const EnseignantService = {
  // Obtenir tous les enseignants
  getAllEnseignants: async () => {
    try {
      const response = await secureAxios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur de récupération des enseignants:', error);
      throw error;
    }
  },
  getAllCountEnseignants: async () => {
    try {
      const response = await axios.get(API_URL_COUNT_ALL);
      return response.data; // Retourne la donnée brute (un entier)
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de sessions:", error);
      throw error;
    }
  },
  // Obtenir le nombre total d'enseignants
  getCountEnseignants: async () => {
    try {
      const response = await axios.get(API_URL_COUNT);
      return response.data;
    } catch (error) {
      console.error("Erreur de récupération du nombre d'enseignants:", error);
      throw error;
    }
  },

  // Obtenir les enseignants par département
  findByDepartmentId: async (departmentId) => {
    try {
      const response = await axios.get(`${API_URL}department/${departmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur de récupération des enseignants du département ${departmentId}:`, error);
      throw error;
    }
  },

  // Ajouter un nouvel enseignant
  addEnseignant: async (enseignant) => {
    try {
      const response = await axios.post(API_URL, enseignant);
      return response.data;
    } catch (error) {
      console.error('Erreur de création de l\'enseignant:', error);
      throw error;
    }
  },

  // Supprimer un enseignant par ID
  deleteEnseignant: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur de suppression de l\'enseignant:', error);
      throw error;
    }
  },

  // Mettre à jour un enseignant
  updateEnseignant: async (enseignant) => {
    try {
      const response = await axios.put(`${API_URL}${enseignant.id}`, enseignant);
      return response.data;
    } catch (error) {
      console.error('Erreur de mise à jour de l\'enseignant:', error);
      throw error;
    }
  },

  // Obtenir un enseignant par ID
  getEnseignantById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur de récupération de l'enseignant ${id}:`, error);
      throw error;
    }
  },
  getCountEnseignantsByDepartment: async (departmentId) => {
    try {
       console.log(`Fetching count for URL: ${API_URL}department/${departmentId}/count`);
        const response = await axios.get(`${API_URL}department/${departmentId}/count`);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
      console.error(`Erreur de récupération du nombre d'enseignants du département ${departmentId}:`, error);
      throw error;
    }
  }, importEnseignantsFromCSV: async (departmentId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}department/${departmentId}/import`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Import error details:", error.response);
      throw new Error(error.response?.data?.message || "Error importing file");
    }
  }
};
secureAxios.defaults.withCredentials = true;

export default EnseignantService;