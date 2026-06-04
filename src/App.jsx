import React, { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';         
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Modal from './components/Modal';
import './App.css'; // Tus estilos globales


export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'calendar', 'map', o null
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      {/* Elementos de fondo */}
      <BackgroundEffects />
      
      <Hero />
      
      <div className="after-hero-container">
        <Countdown targetDate="2026-12-05T21:00:00" />
      </div>

      <EventDetails onOpenModal={setActiveModal} />
      
      <div className="golden-line"></div>
      
      <Gallery onImageClick={setLightboxImage} />
      
      <div className="golden-line"></div>
      
      <Gifts />
      <DressCode />
      <RSVP />

      <footer><p>Mis 15 Años - Melanie | 2026 ✨</p></footer>

      {/* Renderizado del Modal de Calendario */}
      {activeModal === 'calendar' && (
        <Modal title="Agendar Fecha" onClose={() => setActiveModal(null)}>
          <p style={{ marginBottom: '25px', color: '#e9d5ff', fontSize: '1.1rem' }}>
            Sábado 5 de Diciembre, 2026 - 21:00 Hs
          </p>
          
          {/* Opción 1: Google Calendar */}
          <a 
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+15+Años+-+Melanie&dates=20261205T210000/20261206T050000&details=Te+espero+para+compartir+esta+noche+mágica.&location=Salón+SMILE+Black,+Boulogne+Sur+Mer+633,+Pacheco,+Buenos+Aires" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="modal-btn-option"
          >
            <i className="fab fa-google" style={{ marginRight: '10px' }}></i> 
            Google Calendar
          </a>

          {/* Opción 2: Apple Calendar / Outlook */}
          <a 
            href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20261205T210000%0ADTEND:20261206T050000%0ASUMMARY:Mis%2015%20A%C3%B1os%20-%20Melanie%0ADESCRIPTION:Te%20espero%20para%20compartir%20esta%20noche%20m%C3%A1gica.%0ALOCATION:Sal%C3%B3n%20SMILE%20Black%2C%20Boulogne%20Sur%20Mer%20633%2C%20Pacheco%0AEND:VEVENT%0AEND:VCALENDAR" 
            download="Mis_15_Melanie.ics" 
            className="modal-btn-option"
          >
            <i className="fab fa-apple" style={{ marginRight: '10px' }}></i> 
            Apple Calendar
          </a>
        </Modal>
      )}

      {activeModal === 'map' && (
        <Modal title="Cómo llegar a la fiesta" onClose={() => setActiveModal(null)}>
           <div className="map-wrapper">
              <iframe 
                className="map-frame loaded" 
                /* Este es el enlace correcto generado para insertar mapas */
                src="https://maps.google.com/maps?q=Boulogne%20Sur%20Mer%20633,%20Pacheco,%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
           </div>
           
           {/* Botón para abrir el mapa directamente en la app del celular */}
           <a 
              href="https://www.google.com/maps/search/?api=1&query=Boulogne+Sur+Mer+633,+Pacheco,+Buenos+Aires" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn"
              style={{ marginTop: '20px' }}
           >
              Abrir en App de Maps
           </a>
        </Modal>
      )}

      {/* Lightbox de la Galería */}
      {lightboxImage && (
        <div className="lightbox-overlay active" onClick={() => setLightboxImage(null)}>
            <span className="lightbox-close">×</span>
            <img className="lightbox-img" src={lightboxImage} alt="Foto Ampliada" />
        </div>
      )}
    </>
  );
}