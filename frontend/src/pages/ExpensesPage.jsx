import React, { useState, useEffect } from 'react';
import expensesApi from '../api/expensesApi';
import ExpenseForm from '../components/expenses/ExpensesForm';
import './ExpensesPage.css'; // Importando o CSS

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await expensesApi.getAll();
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreateExpense = async (expenseData) => {
    try {
      await expensesApi.create(expenseData);
      fetchExpenses();
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="expenses-container">
      {/* Cabeçalho */}
      <header className="page-header">
        <h1>Despesas</h1>
        <p>Gerencie todas as suas movimentações financeiras</p>
      </header>

      {/* Card de Filtros */}
      <div className="filters-card">
        <h3>Filtros</h3>
        <div className="filters">
          <select><option>Tipo</option></select>
          <select><option>Movimentação</option></select>
          <select><option>Ano</option></select>
          <select><option>Mês</option></select>
          <button className="btn-primary">✔ Aplicar</button>
          <button className="btn-secondary">✖ Limpar</button>
        </div>
      </div>

      {/* Botão Nova Despesa */}
      <div className="actions">
        <button className="btn-add">+ Nova Despesa</button>
      </div>

      {/* Tabela de Despesas */}
      <div className="table-wrapper">
        <table className="expenses-table">
          <thead>
            <tr>
              <th>CC</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.CostCenter?.name || 'N/A'}</td>
                <td>{expense.description}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>R$ {Number(expense.value).toFixed(2)}</td>
                <td>
                  <button className="btn-icon">✏️</button>
                  <button className="btn-icon delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulário (se quiser mostrar abaixo ou em modal futuramente) */}
      <div className="form-section">
        <ExpenseForm onFormSubmit={handleCreateExpense} />
      </div>
    </div>
  );
}

export default ExpensesPage;
