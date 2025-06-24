import React from 'react';
import CartWidget from './CartWidget';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <img src="/img/logo-06.png" alt="El Tineo" className="navbar-logo" />
          <span className="navbar-title">El Tineo</span>
        </div>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#inicio" className="nav-link">Inicio</a>
          </li>
          <li className="nav-item">
            <a href="#vinos" className="nav-link">Vinos</a>
          </li>
          <li className="nav-item">
            <a href="#licores" className="nav-link">Licores</a>
          </li>
          <li className="nav-item">
            <a href="#ofertas" className="nav-link">Ofertas</a>
          </li>
          <li className="nav-item">
            <a href="#contacto" className="nav-link">Contacto</a>
          </li>
        </ul>
        
        <div className="navbar-cart">
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 