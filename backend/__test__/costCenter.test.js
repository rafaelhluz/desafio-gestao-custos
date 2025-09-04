const request = require('supertest');
const { app, startServer } = require('../src/server');
const sequelize = require('../src/database');

beforeAll(async () => {
  // Sincroniza o banco de dados apenas uma vez, antes de todos os testes
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Limpa o banco de dados após todos os testes
  await sequelize.sync({ force: true });
  await sequelize.close();
});

describe('Testes de API para Centros de Custo', () => {

  it('deve criar um novo centro de custo e retornar status 201', async () => {
    const response = await request(app)
      .post('/api/cost-centers')
      .send({ name: 'Comida' });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Comida');
    expect(response.body.id).toBeDefined();
  });
});