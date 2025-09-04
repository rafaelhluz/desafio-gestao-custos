import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cost-centers';

const costCentersApi = {
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar centros de custo:', error);
      throw error;
    }
  },

  create: async (costCenterData) => {
    try {
      const response = await axios.post(API_URL, costCenterData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar centro de custo:', error);
      throw error;
    }
  },

  update: async (id, costCenterData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, costCenterData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar centro de custo:', error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover centro de custo:', error);
      throw error;
    }
  },
};

export default costCentersApi;