import axios from 'axios';

const API_URL = '/ProjetWeb/departements/';
const API_URL_Count = '/ProjetWeb/departements/count';

export const DepartmentService = {
  // Récupérer toutes les sessions
  getAllDepartments: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      throw error;
    }
  },
  
  // Récupérer le nombre total de sessions
  getCountDepartment: async () => {
    try {
      const response = await axios.get(API_URL_Count);
      return response.data; // Retourne la donnée brute (un entier)
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de departements:", error);
      throw error;
    }
  },addSession: async (department) => {
    try {
      const response = await axios.post(API_URL, department);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de departement:', error);
      throw error;
    }
  },

  // Supprimer une session
  deleteDepartment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de  departement:', error);
      throw error;
    }
  },

  // Mettre à jour une session
  updateDepartment: async (department) => {
    try {
      const response = await axios.put(API_URL, department);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de departement:', error);
      throw error;
    }
  }
};
  


