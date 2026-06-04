// src/components/Countdown.jsx
import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    const eventTime = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = eventTime - now;

      if (distance < 0) return;

      const format = (num) => num.toString().padStart(2, '0');
      
      setTimeLeft({
        days: format(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: format(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: format(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: format(Math.floor((distance % (1000 * 60)) / 1000))
      });
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); 
  }, [targetDate]);

  // --- LÓGICA DE SCROLL EXACTA Y FLUIDA ---
  const scrollToDetails = (e) => {
    e.preventDefault();
    const target = document.querySelector('#detalles');
    
    if (!target) return;

    const startPosition = window.scrollY || window.pageYOffset;
    const rectTop = target.getBoundingClientRect().top; 
    
    const windowHeight = window.innerHeight;
    const targetHeight = target.offsetHeight;
    let offsetCorrection = (windowHeight - targetHeight) / 2;
    
    if (offsetCorrection < 60) {
      offsetCorrection = 80;
    }

    // --- NUEVO: Ajuste fino para bajar "un poquito más" ---
    // Aumenta este número (ej: 70) para bajar más, o redúcelo (ej: 20) para subir.
    const ajusteFino = 60; 

    // Al sumar el ajusteFino, forzamos a la cámara a descender esos píxeles extra
    const targetPosition = (startPosition + rectTop) - offsetCorrection + ajusteFino;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const duration = 800;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeOutCubic(t, b, c, d) {
      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animation);
  };

  return (
    <div className="countdown-container">
      <div className="subtitle">¡Prepárate porque faltan!</div>
      <div className="countdown">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div className="time-box" key={unit}>
            <span className="time-val">{value}</span>
            <span className="time-label">
              {unit === 'days' ? 'Días' : unit === 'hours' ? 'Hs' : unit === 'minutes' ? 'Min' : 'Seg'}
            </span>
          </div>
        ))}
      </div>
      <a href="#detalles" className="btn-hero" onClick={scrollToDetails}>
        Ver Detalles
      </a>
    </div>
  );
}