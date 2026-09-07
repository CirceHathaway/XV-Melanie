// src/components/Hero.jsx
import React from 'react';
import separadorHorizontal from '../assets/image_24.png';
import solDorado from '../assets/image_1.png'; 

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-center-layout">
        <div className="hero-text-content">
          <img src={solDorado} alt="Sol Dorado" className="hero-sun" />
          
          <div className="top-title">Mis XV Años</div>
          <h1>Melanie</h1>
          
          <div className="hero-quote">
            <i className="fas fa-quote-left"></i>
            Te espero para compartir la alegría de esa noche que será para mí mágica, inolvidable y única.
            <i className="fas fa-quote-right"></i>
          </div>
        </div>
      </div>
      
      <div className="horizontal-separator-container">
        <img src={separadorHorizontal} className="horizontal-separator-img" alt="" />
      </div>
    </header>
  );
}