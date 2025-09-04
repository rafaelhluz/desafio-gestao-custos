import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import CostCentersPage from './pages/CostCentersPage';
import ExpensesPage from './pages/ExpensesPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="app-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <div className={`main-content-wrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <main className="main-content">
            <Routes>
              <Route path="/cost-centers" element={<CostCentersPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/" element={<ExpensesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;