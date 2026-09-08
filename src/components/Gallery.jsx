// src/components/Gallery.jsx
import React, { useState } from 'react';

export default function Gallery() {
  // Tus 10 fotos originales (se agregaron 4 nuevas)
  const fotosOriginales = [
    '/images/foto1.jpg',
    '/images/foto2.jpg',
    '/images/foto3.jpg',
    '/images/foto4.jpg',
    '/images/foto5.jpg',
    '/images/foto6.jpg',
    '/images/foto7.jpeg',
    '/images/foto8.jpeg',
    '/images/foto9.jpeg',
    '/images/foto10.jpeg'
  ];

  // TRUCO DE BUCLE: Duplicamos el arreglo 4 veces (40 fotos en total ahora). 
  // Esto hace que después de la 10, venga la 1 mágicamente al deslizar.
  const fotosInfinitas = [...fotosOriginales, ...fotosOriginales, ...fotosOriginales, ...fotosOriginales];

  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; 

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    setCurrentImageIndex(null);
    document.body.classList.remove('no-scroll');
  };

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === fotosInfinitas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? fotosInfinitas.length - 1 : prevIndex - 1
    );
  };

  // Lógica táctil para el Lightbox
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > minSwipeDistance) goToNext();
    if (distance < -minSwipeDistance) goToPrev();
  };

  return (
    <>
      {/* WRAPPER PRINCIPAL: Ahora no hace scroll, el título se queda quieto */}
      <div className="gallery-wrapper" id="galleryWrapper">
        <h2 className="gallery-title">Un recorrido de estos 15 años</h2>
        
        {/* NUEVO CONTENEDOR: Este es el único que desliza */}
        <div className="carousel-viewport">
          <div className="carousel-container" id="carouselContainer">
            {fotosInfinitas.map((foto, index) => (
              <div 
                className="polaroid-item" 
                key={index} 
                onClick={() => openLightbox(index)}
              >
                <img src={foto} alt={`Recuerdo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentImageIndex !== null && (
        <div className="lightbox-overlay active" onClick={closeLightbox}>
          <span className="lightbox-close" onClick={closeLightbox}>×</span>
          
          <button className="lightbox-btn left" onClick={goToPrev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <img 
            className="lightbox-img" 
            src={fotosInfinitas[currentImageIndex]} 
            alt="Foto Ampliada" 
            onClick={(e) => e.stopPropagation()} 
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />

          <button className="lightbox-btn right" onClick={goToNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}