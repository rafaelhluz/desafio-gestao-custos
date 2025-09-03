import React from "react";
import "./DashboardPage.css";

function DashboardPage() {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <p>Seus dashboards</p>
      </header>

      {/* Resumo Rápido */}
      <section>
        <h2 className="section-title">📈 Resumo Rápido</h2>
        <div className="card-grid">
          <div className="card">
            <p>Gastos com Supermercado</p>
            <h3>387</h3>
          </div>
          <div className="card">
            <p>Gastos com Transporte</p>
            <h3>42</h3>
          </div>
          <div className="card">
            <p>Gastos com Lazer</p>
            <h3>R$ 15.2k</h3>
          </div>
          <div className="card">
            <p>Gastos totais</p>
            <h3>28</h3>
          </div>
        </div>
      </section>

      {/* Indicadores do Mês */}
      <section>
        <h2 className="section-title">📅 Indicadores do Mês</h2>
        <div className="card-grid">
          <div className="card">
            <p>Exemplo</p>
            <h3>156</h3>
          </div>
          <div className="card">
            <p>Exemplo</p>
            <h3>23</h3>
          </div>
          <div className="card">
            <p>Exemplo</p>
            <h3>34</h3>
          </div>
        </div>
      </section>

      {/* Gráfico */}
      <section>
        <h2 className="section-title">📊 Gastos por mês</h2>
        <div className="chart-card">
          {/* Aqui você pode usar Chart.js ou Recharts */}
          <img
            src="https://quickchart.io/chart?c={type:'bar',data:{labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],datasets:[{label:'Gastos',data:[20,15,30,40,25,33,18,16,45,35,27,31]}]}}"
            alt="Gráfico de gastos"
          />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
