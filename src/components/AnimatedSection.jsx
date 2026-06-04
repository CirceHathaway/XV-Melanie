// src/components/AnimatedSection.jsx
import React, { useEffect, useRef } from 'react';

export default function AnimatedSection({ children, id, style }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Creamos el observador que vigila si el elemento entra en pantalla
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Si entra en la pantalla, le agrega la clase que dispara tu CSS
          entry.target.classList.add('visible');
          
          // Opcional: si quieres que la animación se reproduzca SOLO la primera vez
          // que el usuario baja (y no cada vez que sube y baja), descomenta esta línea:
          // observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.15 }); // 0.15 significa que se activa cuando el 15% de la sección es visible

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Limpieza al desmontar
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className="section" style={style}>
      {children}
    </section>
  );
}