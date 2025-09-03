import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const navLinks = [
    { name: 'Despesas', path: '/expenses' },
    { name: 'Centros de Custos', path: '/cost-centers' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Menu centralizado */}
        <nav className="header-nav">
          <ul className="header-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Usuário à direita */}
        <div className="header-user">
          <FaUserCircle size={32} />
        </div>
      </div>
    </header>
  );
}

export default Header;
