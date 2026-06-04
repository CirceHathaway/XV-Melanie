// src/components/Gifts.jsx
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection'; // <-- Importamos
import decoEsquinaTop from '../assets/image_1.png';
import decoEsquinaBottom from '../assets/image_2.png';

export default function Gifts() {
  const [showToast, setShowToast] = useState(false);

  const copyCBU = () => {
    navigator.clipboard.writeText("0000003100088083630080").then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <>
      <AnimatedSection>
        <div className="corner-deco corner-top-left"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-top-right"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-bottom-left"><img src={decoEsquinaBottom} alt="" /></div>
        <div className="corner-deco corner-bottom-right"><img src={decoEsquinaBottom} alt="" /></div>

        <i className="fas fa-gift" style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '20px' }}></i>
        <h2>Regalos</h2>
        <p>El mejor regalo es tu presencia. Si deseas regalarme algo más que tu hermosa presencia...</p>
        
        <button className="btn" onClick={copyCBU}>
          <i className="fas fa-university"></i> Número de CBU
        </button>
      </AnimatedSection>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        ¡CBU copiado al portapapeles!
      </div>
    </>
  );
}