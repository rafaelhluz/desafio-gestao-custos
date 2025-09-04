import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Coluna 1: Informações do Projeto */}
        <div className="footer-col">
          <h3 className="footer-title">Gestão de Custos</h3>
          <p>
            Uma aplicação simples e intuitiva para gerenciar seus centros de custo e despesas financeiras.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://wa.me/5547999999999" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Coluna 2: Links de Navegação */}
        <div className="footer-col">
          <h3 className="footer-title">Navegação</h3>
          <ul>
            <li><Link to="/expenses">Despesas</Link></li>
            <li><Link to="/cost-centers">Centros de Custos</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className="footer-col">
          <h3 className="footer-title">Contato</h3>
          <p>
            Joinville, SC - Brasil <br />
            CEP: 12345678
          </p>
          <p>Email: contato@gmail.com</p>
          <p>Telefone: (47) 12345-6789</p>
        </div>
      </div>

      {/* Barra de Direitos Autorais */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Gestão de Custos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;