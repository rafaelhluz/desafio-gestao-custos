### Desafio de Gestão de Custos

Este projeto é uma aplicação web de **gestão de custos domésticos**, desenvolvida para gerenciar **centros de custo** e suas respectivas **despesas**.  
O sistema é dividido em duas partes: **frontend em React** e **backend em Node.js com Express e MySQL**.
Inclui **testes unitários e de integração** com Jest e Supertest.

---

## Tecnologias Utilizadas

### Backend

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **Testes:** Jest, Supertest

## Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado e em execução

## Instruções de Instalação e Execução
## Backend
Acesse a pasta do backend:

'''bash

cd backend

## Instale as dependências:

'''bash
npm install

## Crie o banco de dados no MySQL:

sql
CREATE DATABASE desafio_gestao_custos;
## Atualize as credenciais em backend/src/database/index.js se necessário.

### Inicie o servidor:

'''bash
npm start

O backend estará disponível em: http://localhost:3000

## Frontend
Em outro terminal, acesse a pasta do frontend:

'''bash
cd frontend
Instale as dependências:

'''bash
npm install

### Inicie a aplicação React:

'''bash
npm run dev

O frontend estará disponível em: http://localhost:5173

### Rodar os testes do backend

'''bash
npm test

### Decisões Técnicas
### Arquitetura

Client-Server: Separação entre frontend e backend para facilitar escalabilidade

MVC no Backend: Organização em models, controllers e routes

## Backend

Express: Simples e eficiente para APIs REST

Sequelize: Abstração do SQL com manipulação via JavaScript

MySQL: Banco relacional robusto com integridade entre entidades

## Frontend

React: Componentização e reutilização de UI

Design System: Classes CSS customizadas para consistência visual

### Observações
Este projeto foi estruturado para ser facilmente escalável, com possibilidade de incluir:

Autenticação de usuários

Gráficos de despesas

Filtros por período