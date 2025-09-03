import React, { useState, useEffect } from 'react';
import costCentersApi from '../../api/costCentersApi';

function ExpenseForm({ onFormSubmit }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [costCenterId, setCostCenterId] = useState('');
  const [costCenters, setCostCenters] = useState([]);

  useEffect(() => {
    // Busca os centros de custo para popular o campo de seleção
    const fetchCostCenters = async () => {
      try {
        const response = await costCentersApi.getAll();
        setCostCenters(response.data);
      } catch (error) {
        console.error('Erro ao buscar centros de custo:', error);
      }
    };
    fetchCostCenters();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description || !value || !date || !costCenterId) return;

    // Converte o valor para o formato correto
    const expenseData = {
      description,
      value: parseFloat(value),
      date,
      costCenterId: parseInt(costCenterId),
    };

    onFormSubmit(expenseData);
    setDescription('');
    setValue('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={costCenterId} onChange={(e) => setCostCenterId(e.target.value)}>
        <option value="">Selecione um Centro de Custo</option>
        {costCenters.map((center) => (
          <option key={center.id} value={center.id}>
            {center.name}
          </option>
        ))}
      </select>
      <button type="submit">Adicionar Despesa</button>
    </form>
  );
}

export default ExpenseForm;