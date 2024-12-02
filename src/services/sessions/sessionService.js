import axios from 'axios';

const API_URL = '/ProjetWeb/sessions/';
const API_URL_Count = '/ProjetWeb/sessions/count';

export const sessionService = {
  // Récupérer toutes les sessions
  getAllSessions: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      throw error;
    }
  },
  
  // Récupérer le nombre total de sessions
  getCountSessions: async () => {
    try {
      const response = await axios.get(API_URL_Count);
      return response.data; // Retourne la donnée brute (un entier)
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de sessions:", error);
      throw error;
    }
  },addSession: async (session) => {
    try {
      const response = await axios.post(API_URL, session);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
      throw error;
    }
  },

  // Supprimer une session
  deleteSession: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
      throw error;
    }
  },

  // Mettre à jour une session
  updateSession: async (session) => {
    try {
      const response = await axios.put(API_URL, session);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la session:', error);
      throw error;
    }
  }
};
  


