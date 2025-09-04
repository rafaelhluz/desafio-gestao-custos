import React, { useState } from 'react';
import './CostCenterForm.css';

function CostCenterForm({ onFormSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') return;

    onFormSubmit({ name });

    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="cost-center-form">
      <input
        type="text"
        placeholder="Nome do Centro de Custo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default CostCenterForm;