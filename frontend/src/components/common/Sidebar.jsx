import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faMoneyBillWave, faTags, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import logo from '../../assets/logo.png';

const Sidebar = ({ isCollapsed, onToggle }) => {
    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <img src={logo} alt="Gestão de Custos Logo" className="sidebar-logo" />
                {!isCollapsed && <h1 className="sidebar-title">Gestão de Custos</h1>}
                <button className="sidebar-toggle-btn" onClick={onToggle}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
                            <span className="nav-label">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                            <FontAwesomeIcon icon={faMoneyBillWave} className="nav-icon" />
                            <span className="nav-label">Despesas</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cost-centers" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
                            <FontAwesomeIcon icon={faTags} className="nav-icon" />
                            <span className="nav-label">Centros de Custo</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;