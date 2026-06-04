// src/components/EventDetails.jsx
import React from 'react';
import AnimatedSection from './AnimatedSection'; // Lo mantenemos para la 2da sección
import decoEsquinaTop from '../assets/image_1.png';
import decoEsquinaBottom from '../assets/image_2.png';

export default function EventDetails({ onOpenModal }) {
  return (
    <>
      {/* SECCIÓN 1: Celebración (SIN animación de scroll, queda fija para anclar) */}
      <section id="detalles" className="section visible">
        <div className="corner-deco corner-top-left"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-top-right"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-bottom-left"><img src={decoEsquinaBottom} alt="" /></div>
        <div className="corner-deco corner-bottom-right"><img src={decoEsquinaBottom} alt="" /></div>
        
        <h2>Celebración</h2>
        <div className="big-date-container">
          <div className="date-day-name">SÁBADO</div>
          <div className="date-number-big">05</div>
          <div className="date-month-year">de Diciembre, 2026</div>
          <div className="time-box-styled"><div className="time-text">21:00 Hs</div></div>
          
          <button className="btn" style={{ marginTop: '15px', padding: '10px 30px', fontSize: '0.9rem' }} onClick={() => onOpenModal('calendar')}>
            <i className="far fa-calendar-alt"></i> Agendar
          </button>
        </div>
      </section>

      {/* SECCIÓN 2: Lugar de Encuentro (CON animación de scroll) */}
      <AnimatedSection>
        <div className="corner-deco corner-top-left"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-top-right"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-bottom-left"><img src={decoEsquinaBottom} alt="" /></div>
        <div className="corner-deco corner-bottom-right"><img src={decoEsquinaBottom} alt="" /></div>
        
        <h2>Lugar de Encuentro</h2>
        <div className="venue-subtitle">Te espero en...</div>
        <div className="venue-name">Salón "SMILE Black"</div>
        <div className="venue-address">Boulogne Sur Mer 633, Pacheco Buenos Aires</div>
        
        <button className="btn" style={{ padding: '15px 35px', fontSize: '1rem' }} onClick={() => onOpenModal('map')}>
          ¿Cómo Llegar?
        </button>
      </AnimatedSection>
    </>
  );
}