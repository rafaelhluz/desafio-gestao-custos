const request = require('supertest');
const { app } = require('../src/server');
const sequelize = require('../src/database');
const CostCenter = require('../src/models/costCenter');

// Sincroniza e limpa o banco de dados antes de todos os testes
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão do banco de dados após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Testes de API para Despesas', () => {
  
  it('deve criar uma nova despesa e retornar status 201', async () => {
    // Organizar (Arrange)
    const newCostCenter = await CostCenter.create({ name: 'Viagem' });

    const newExpense = {
      description: 'Passagem aérea',
      value: 500.00,
      date: '2025-09-04',
      costCenterId: newCostCenter.id
    };

    // Agir (Act)
    const response = await request(app)
      .post('/api/expenses')
      .send(newExpense);

    // Afirmar (Assert)
    expect(response.statusCode).toBe(201);
    expect(response.body.description).toBe('Passagem aérea');
    expect(response.body.value).toBe(500.00);
    expect(response.body.costCenterId).toBe(newCostCenter.id);
  });
});