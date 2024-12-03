import axios from 'axios';

const API_URL = '/ProjetWeb/locals/';
const API_URL_Count = '/ProjetWeb/locals/count';

export const localService = {
  // Récupérer tous les locaux
  getAllLocals: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des locaux:', error);
      throw error;
    }
  },
  
  // Récupérer le nombre total de locaux
  getCountLocals: async () => {
    try {
      const response = await axios.get(API_URL_Count);
      return response.data; // Retourne la donnée brute (un entier)
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de locaux:", error);
      throw error;
    }
  },

  // Ajouter un local
  addLocal: async (local) => {
    try {
      const response = await axios.post(API_URL, local);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du local:', error);
      throw error;
    }
  },

  // Supprimer un local
  deleteLocal: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du local:', error);
      throw error;
    }
  },

  // Mettre à jour un local
  updateLocal: async (local) => {
    try {
      const response = await axios.put(API_URL, local);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du local:', error);
      throw error;
    }
  }
};