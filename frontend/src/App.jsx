import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import CostCentersPage from './pages/CostCentersPage';
import ExpensesPage from './pages/ExpensesPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = isMobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [isMobileOpen]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setIsMobileOpen(v => !v);
    } else {
      setIsSidebarCollapsed(v => !v);
    }
  };

  return (
    <Router>
      <div className="app-layout">
        <Sidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} onToggle={toggleSidebar} />
        <div className={`drawer-overlay ${isMobileOpen ? 'show' : ''}`} onClick={() => setIsMobileOpen(false)} />
        
        <div className={`main-content-wrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="topbar-mobile">
            <button className="topbar-menu-btn" onClick={() => setIsMobileOpen(true)} aria-label="Abrir menu">☰ Menu</button>
            <span className="brand">Gestão de Custos</span>
          </div>
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