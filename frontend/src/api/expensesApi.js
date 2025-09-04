import axios from 'axios';

const API_URL = 'http://localhost:3000/api/expenses';

const expensesApi = {
  getAll: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      throw error;
    }
  },

  create: async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
      throw error;
    }
  },

  update: async (id, expenseData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, expenseData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
      throw error;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover despesa:', error);
      throw error;
    }
  },
};

export default expensesApi;