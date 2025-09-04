import React, { useState, useEffect } from 'react';
import expensesApi from '../api/expensesApi';
import costCentersApi from '../api/costCentersApi';
import ExpenseModal from '../components/expenses/ExpensesModal';
import ExpenseForm from '../components/expenses/ExpensesForm';
import '../App.css';

function ExpensesPage() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Busca despesas e centros de custo
  const fetchData = async () => {
    try {
      const [expensesResponse, costCentersResponse] = await Promise.all([
        expensesApi.getAll(),
        costCentersApi.getAll(),
      ]);

      const expensesData = expensesResponse.data || expensesResponse;
      const costCentersData = costCentersResponse.data || costCentersResponse;

      setExpenses(expensesData);
      setCostCenters(costCentersData);
    } catch (error) {
      console.error('Erro ao buscar despesas ou centros de custo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingExpense(null);
    setIsModalOpen(false);
  };

  // Criar ou atualizar despesa
  const handleFormSubmit = async (formData) => {
    try {
      if (editingExpense) {
        const updated = await expensesApi.update(editingExpense.id, formData);
        setExpenses(prev => prev.map(e => e.id === updated.id ? updated : e));
      } else {
        const newExpense = await expensesApi.create(formData);
        setExpenses(prev => [...prev, newExpense]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar despesa:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      try {
        await expensesApi.remove(id);
        setExpenses(prev => prev.filter(e => e.id !== id));
      } catch (error) {
        console.error('Erro ao excluir despesa:', error);
      }
    }
  };

  if (loading) return <div className="page-container">Carregando...</div>;

  return (
    <div className="page-container">
      <h1 className="page-title">Despesas</h1>
      <p className="page-subtitle">Gerencie suas despesas vinculadas a centros de custo.</p>

      <div className="expenses-content-wrapper">
        <div className="new-expense-header new-item-button-center">
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            + Nova Despesa
          </button>
        </div>

        {expenses.length > 0 ? (
          <div className="card table-card">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Centro de Custo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => {
                  const cc = costCenters.find(cc => cc.id === exp.costCenterId);
                  return (
                    <tr key={exp.id}>
                      <td>{exp.description}</td>
                      <td>R$ {parseFloat(exp.value).toFixed(2)}</td>
                      <td>{exp.date}</td>
                      <td>{cc ? cc.name : 'Outros'}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleOpenModal(exp)}>Editar</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteExpense(exp.id)}>Excluir</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">Nenhuma despesa cadastrada. Adicione uma nova!</p>
        )}
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExpense ? 'Editar Despesa' : 'Nova Despesa'}
      >
        <ExpenseForm
          initialData={editingExpense}
          costCenters={costCenters}
          onFormSubmit={handleFormSubmit}
        />
      </ExpenseModal>
    </div>
  );
}

export default ExpensesPage;
