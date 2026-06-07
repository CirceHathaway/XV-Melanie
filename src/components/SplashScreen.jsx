// src/components/SplashScreen.jsx
import React, { useState } from 'react';
import sunIcon from '../assets/image_1.png';
import BackgroundEffects from './BackgroundEffects'; // Importamos tus luciérnagas

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  // Ya no hay useEffect con el temporizador. 
  // Ahora solo se cierra cuando hacen clic (handleClose).

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 800); // 800ms es el tiempo que dura el desvanecimiento CSS
  };

  return (
    <div className={`splash-overlay ${fadeOut ? 'fade-out' : ''}`} onClick={handleClose}>
      
      {/* CAPA DE EFECTOS: Renderizamos las luciérnagas por encima del fondo oscuro */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <BackgroundEffects />
      </div>
      
      <div className="splash-content" style={{ position: 'relative', zIndex: 10 }}>
        <img src={sunIcon} alt="Sol Dorado" className="splash-sun" />
        
        <h1 className="splash-title">Mis XV Años</h1>
        <h2 className="splash-name">Melanie</h2>
        
        <p className="splash-tap">Toca para entrar</p>
      </div>
    </div>
  );
}