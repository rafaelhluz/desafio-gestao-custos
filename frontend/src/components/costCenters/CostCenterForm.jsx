import React, { useState } from 'react';
import './CostCenterForm.css'; // Importe o arquivo CSS que criamos

function CostCenterForm({ onFormSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    if (name.trim() === '') return;

    // Chama a função onFormSubmit (que virá do componente pai)
    // para lidar com a criação do centro de custo
    onFormSubmit({ name });

    // Limpa o campo do formulário
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