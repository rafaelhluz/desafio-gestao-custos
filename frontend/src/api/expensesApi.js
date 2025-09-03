import api from './api';

const expensesApi = {
  // Rota para listar todas as despesas
  getAll: () => api.get('/expenses'),
  
  // Rota para criar uma nova despesa
  create: (expenseData) => api.post('/expenses', expenseData),
  
  // Rota para atualizar uma despesa
  update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  
  // Rota para deletar uma despesa
  remove: (id) => api.delete(`/expenses/${id}`),
};

export default expensesApi;