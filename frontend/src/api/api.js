import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Endereço da sua API
});

export default api;