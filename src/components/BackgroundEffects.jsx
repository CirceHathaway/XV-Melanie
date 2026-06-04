// src/components/BackgroundEffects.jsx
import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const firefliesRef = useRef(null);
  const lanternsRef = useRef(null);

  useEffect(() => {
    // --- ANIMACIÓN LINTERNAS ---
    function createLantern() {
      if (!lanternsRef.current) return;
      
      const lantern = document.createElement('div');
      lantern.classList.add('lantern');
      lantern.style.left = Math.random() * 95 + 'vw';
      
      const widthSize = Math.random() * 40 + 50; 
      lantern.style.width = widthSize + 'px';
      lantern.style.height = (widthSize * 1.3) + 'px'; 
      lantern.style.animationDuration = (Math.random() * 10 + 12) + 's';
      lantern.style.animationDelay = Math.random() * 3 + 's';
      
      lanternsRef.current.appendChild(lantern);
      
      setTimeout(() => { 
        if (lantern.parentNode) lantern.remove(); 
      }, 25000);
    }

    // Iniciar linternas
    for(let i = 0; i < 5; i++) createLantern();
    const lanternInterval = setInterval(createLantern, 2500);


    // --- ANIMACIÓN LUCIÉRNAGAS ---
    function createFirefly() {
      if (!firefliesRef.current) return;
      
      const firefly = document.createElement('div');
      firefly.classList.add('firefly');
      firefly.style.left = Math.random() * 100 + 'vw';
      firefly.style.top = Math.random() * 100 + 'vh';
      
      const moveX = (Math.random() * 200 - 100) + 'px'; 
      const moveY = (Math.random() * 200 - 100) + 'px';
      firefly.style.setProperty('--moveX', moveX);
      firefly.style.setProperty('--moveY', moveY);
      firefly.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      firefliesRef.current.appendChild(firefly);
      
      setTimeout(() => { 
        if (firefly.parentNode) firefly.remove(); 
      }, 5000);
    }
    
    const fireflyInterval = setInterval(createFirefly, 300);

    // --- LIMPIEZA ---
    // Esto es vital en React para detener la generación si el componente se desmonta
    return () => {
      clearInterval(lanternInterval);
      clearInterval(fireflyInterval);
    };
  }, []);

  return (
    <>
      {/* Contenedores donde se inyectarán los divs dinámicos */}
      <div className="firefly-container" ref={firefliesRef}></div>
      <div className="lantern-container" ref={lanternsRef}></div>
    </>
  );
}