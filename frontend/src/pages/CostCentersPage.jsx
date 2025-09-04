import React, { useState, useEffect } from 'react';
import costCentersApi from '../api/costCentersApi';
import '../App.css';
import ExpenseModal from '../components/expenses/ExpensesModal';

function CostCentersPage() {
  const [costCenters, setCostCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCostCenter, setEditingCostCenter] = useState(null);
  const [costCenterName, setCostCenterName] = useState('');

  const normalizeList = (resp) => {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp.data)) return resp.data; 
    if (resp.data && Array.isArray(resp.data.data)) return resp.data.data;
    return [];
  };

  const fetchCostCenters = async () => {
    try {
      const response = await costCentersApi.getAll({ params: { _t: Date.now() } });
      const list = normalizeList(response);
      setCostCenters(list);
    } catch (error) {
      console.error('Erro ao buscar centros de custo:', error);
      setCostCenters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostCenters();
  }, []);

  const handleOpenModal = (ccToEdit = null) => {
    setEditingCostCenter(ccToEdit);
    setCostCenterName(ccToEdit ? ccToEdit.name : '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCostCenter(null);
    setCostCenterName('');
  };

  const handleSaveCostCenter = async (e) => {
    e.preventDefault();
    try {
      const ccData = { name: costCenterName };

      if (editingCostCenter) {
        await costCentersApi.update(editingCostCenter.id, ccData);
      } else {
        await costCentersApi.create(ccData);
      }

      await fetchCostCenters();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar centro de custo:', error);
    }
  };

  const handleDeleteCostCenter = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este centro de custo?')) {
      try {
        await costCentersApi.remove(id);
        await fetchCostCenters();
      } catch (error) {
        console.error('Erro ao excluir centro de custo:', error);
      }
    }
  };

  if (loading) {
    return <div className="page-container">Carregando...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title page-title-center">Centros de Custo</h1>
      <p className="page-subtitle page-subtitle-center">Gerencie os centros de custo da sua aplicação.</p>

      <div className="expenses-content-wrapper">
        <div className="new-expense-header new-item-button-center">
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            + Novo Centro de Custo
          </button>
        </div>

        {costCenters.length > 0 ? (
          <div className="card table-card">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Nome do Centro de Custo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {costCenters.map((cc) => (
                  <tr key={cc.id}>
                    <td>{cc.name}</td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => handleOpenModal(cc)}>
                        Editar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteCostCenter(cc.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">Nenhum centro de custo cadastrado. Adicione um novo!</p>
        )}
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCostCenter ? 'Editar Centro de Custo' : 'Novo Centro de Custo'}
      >
        <form onSubmit={handleSaveCostCenter} className="expense-form">
          <div className="form-group">
            <label htmlFor="name">Nome do Centro de Custo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={costCenterName}
              onChange={(e) => setCostCenterName(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingCostCenter ? 'Salvar Alterações' : 'Adicionar'}
            </button>
          </div>
        </form>
      </ExpenseModal>
    </div>
  );
}

export default CostCentersPage;
