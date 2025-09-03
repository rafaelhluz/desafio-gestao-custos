import api from './api';

const costCentersApi = {
  // Rota para listar todos os centros de custo
  getAll: () => api.get('/cost-centers'),
  
  // Rota para criar um novo centro de custo
  create: (costCenterData) => api.post('/cost-centers', costCenterData),
  
  // Rota para atualizar um centro de custo
  update: (id, costCenterData) => api.put(`/cost-centers/${id}`, costCenterData),
  
  // Rota para deletar um centro de custo
  remove: (id) => api.delete(`/cost-centers/${id}`),
};

export default costCentersApi;