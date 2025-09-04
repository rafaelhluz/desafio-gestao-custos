import React, { useState, useEffect } from 'react';
import expensesApi from '../api/expensesApi';
import costCentersApi from '../api/costCentersApi';
import '../App.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesByCostCenterData, setExpensesByCostCenterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await expensesApi.getAll();
        const costCentersResponse = await costCentersApi.getAll();

        const expensesData = expensesResponse.data || expensesResponse;
        const costCentersData = costCentersResponse.data || costCentersResponse;

        // Mapear expenses com cost center name
        const expensesWithNames = expensesData.map(expense => {
          const cc = costCentersData.find(cc => cc.id === expense.costCenterId);
          // Certifique-se de que expense.date está em formato de data (YYYY-MM-DD)
          // E que expense.value é um número
          return {
            ...expense,
            costCenterName: cc ? cc.name : 'Outros',
            value: parseFloat(expense.value) // Garantir que o valor é um número
          };
        });

        // Calcular o total de despesas
        const total = expensesWithNames.reduce((sum, expense) => sum + expense.value, 0);
        setTotalExpenses(total);

        // Agrupar despesas por centro de custo para o gráfico
        const groupedExpenses = expensesWithNames.reduce((acc, expense) => {
          const { costCenterName, value } = expense;
          if (!acc[costCenterName]) {
            acc[costCenterName] = 0;
          }
          acc[costCenterName] += value;
          return acc;
        }, {});

        // Formatar os dados para o Recharts
        const chartData = Object.entries(groupedExpenses).map(([name, value]) => ({
          name: name,
          Despesas: value,
        }));
        setExpensesByCostCenterData(chartData);

        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados para o dashboard:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="page-container">Carregando dados...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Visão geral das suas finanças.</p>
      <div className="dashboard-content">
        <div className="card summary-card">
          <h3>Resumo Mensal</h3>
          <p>
            Total de Despesas: <span className="highlight-value">R$ {totalExpenses.toFixed(2)}</span>
          </p>
          <div className="summary-list">
            {expensesByCostCenterData.length > 0 ? (
              expensesByCostCenterData.map((item) => (
                <div key={item.name} className="summary-item">
                  <span className="summary-label">{item.name}</span>
                  <span className="summary-value">R$ {item.Despesas.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>Nenhuma despesa para exibir no resumo.</p>
            )}
          </div>
        </div>

        {/* Card do Gráfico de Barras */}
        <div className="card chart-card">
          <h3>Distribuição de Despesas por Centro de Custo</h3>
          {expensesByCostCenterData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expensesByCostCenterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => `R$ ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="Despesas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">Adicione despesas para ver o gráfico!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;