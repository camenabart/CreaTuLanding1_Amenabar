import React from 'react';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="item-list-container">
      <div className="container">
        <div className="welcome-section">
          <h1 className="welcome-title">{greeting}</h1>
          <p className="welcome-subtitle">
            Descubre nuestra selección premium de vinos y licores
          </p>
          <div className="welcome-content">
            <p>
              Bienvenido a El Tineo, tu tienda especializada en vinos y licores de la más alta calidad. 
              Aquí encontrarás una cuidadosa selección de productos para todos los gustos y ocasiones.
            </p>
            <p>
              Nuestro catálogo incluye vinos tintos, blancos, rosados y espumantes, así como una 
              amplia variedad de licores y destilados de las mejores marcas del mundo.
            </p>
          </div>
        </div>
        
        <div className="catalog-placeholder">
          <h2>Catálogo de Productos</h2>
          <p>Aquí se mostrará el catálogo de productos próximamente...</p>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer; 