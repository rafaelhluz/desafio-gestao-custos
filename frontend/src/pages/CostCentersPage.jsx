import React, { useState, useEffect } from 'react';
import costCentersApi from '../api/costCentersApi';
import CostCenterForm from '../components/costCenters/CostCenterForm'; // Importe o formulário

function CostCentersPage() {
  const [costCenters, setCostCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCostCenters = async () => {
    try {
      const response = await costCentersApi.getAll();
      setCostCenters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar centros de custo:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCostCenters();
  }, []);

  // Nova função para lidar com a criação de um centro de custo
  const handleCreateCostCenter = async (costCenterData) => {
    try {
      await costCentersApi.create(costCenterData);
      fetchCostCenters(); // Recarrega a lista após a criação
    } catch (error) {
      console.error('Erro ao criar centro de custo:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Centros de Custo</h1>
      <CostCenterForm onFormSubmit={handleCreateCostCenter} />
      <ul>
        {costCenters.map(center => (
          <li key={center.id}>{center.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CostCentersPage;