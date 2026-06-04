// src/components/Modal.jsx
import React from 'react';

export default function Modal({ title, onClose, children }) {
  // Función para cerrar el modal si el usuario hace clic fuera de la caja principal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        {/* Botón de cierre */}
        <div className="close-modal" onClick={onClose}>
          <i className="fas fa-times"></i>
        </div>
        
        {/* Título dinámico */}
        <h2 className="modal-title">{title}</h2>
        
        {/* Contenido inyectado (el mapa o el calendario) */}
        {children}
        
      </div>
    </div>
  );
}