import axios from 'axios';

const API_URL = '/ProjetWeb/departements/';
const API_URL_COUNT = '/ProjetWeb/departements/count';

export const DepartmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error retrieving departments:', error);
      throw error;
    }
  },
  
  // Get total number of departments
  getCountDepartment: async () => {
    try {
      const response = await axios.get(API_URL_COUNT);
      return response.data; // Returns raw data (an integer)
    } catch (error) {
      console.error("Error retrieving department count:", error);
      throw error;
    }
  },

  // Add a new department
  addDepartment: async (department) => {
    try {
      const response = await axios.post(API_URL, department);
      return response.data;
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  },

  // Delete a department by ID
  deleteDepartment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  },

  updateDepartment: async (department) => {
    try {
      const response = await axios.put(`${API_URL}/${department.id}`, department);
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
},

  // Get a single department by ID (optional, but often useful)
  getDepartmentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error retrieving department with ID ${id}:`, error);
      throw error;
    }
  }
};

export default DepartmentService;