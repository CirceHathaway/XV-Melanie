// src/components/Hero.jsx
import React from 'react';
import fotoPortada from '../assets/portada.jpg'; // Corregido a .jpg
import separadorVertical from '../assets/image_19.png';
import separadorHorizontal from '../assets/image_24.png';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-split-layout">
        <div className="hero-photo-side">
          <img src={fotoPortada} alt="Melanie" className="hero-photo-actual" />
        </div>
        
        <div className="hero-text-side-container">
          <img src={separadorVertical} className="vertical-separator-img" alt="" />
          
          {/* Contenido completo del Hero que faltaba */}
          <div className="hero-text-content">
            <div className="sun-icon">
              <i className="fas fa-sun"></i>
            </div>
            <div className="top-title">Mis 15 Años</div>
            <h1>Melanie</h1>
            <div className="hero-quote">
              <i className="fas fa-quote-left"></i>
              Te espero para compartir la alegría de esa noche que será para mí mágica, inolvidable y única.
              <i className="fas fa-quote-right"></i>
            </div>
          </div>

        </div>
      </div>
      
      <div className="horizontal-separator-container">
        <img src={separadorHorizontal} className="horizontal-separator-img" alt="" />
      </div>
    </header>
  );
}