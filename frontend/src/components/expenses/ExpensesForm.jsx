import React, { useState, useEffect } from 'react';
import './ExpensesForm.css';

const ExpenseForm = ({ onFormSubmit, initialData, costCenters }) => {
  const [formData, setFormData] = useState({
    costCenterId: '',
    description: '',
    value: '',
    date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        costCenterId: initialData.costCenter?.id || initialData.costCenterId || '',
        description: initialData.description || '',
        value: initialData.value || '',
        date: initialData.date || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);

    if (!initialData) {
      setFormData({
        costCenterId: '',
        description: '',
        value: '',
        date: '',
      });
    }
  };

  const buttonText = initialData ? 'Salvar Alterações' : 'Adicionar Despesa';

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label htmlFor="costCenterId">Centro de Custo</label>
        <select
          id="costCenterId"
          name="costCenterId"
          value={formData.costCenterId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um Centro de Custo</option>
          {costCenters && costCenters.map((cc) => (
            <option key={cc.id} value={cc.id}>
              {cc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="value">Valor</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Data</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
