// src/components/RSVP.jsx
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import decoEsquinaTop from '../assets/image_1.png';
import decoEsquinaBottom from '../assets/image_2.png';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

export default function RSVP() {
  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: 'si',
    adultos: '1',
    ninos: '0',
    nombresAcompanantes: '', // <-- NUEVO ESTADO
    dieta: 'ninguna',
    comentarios: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "invitados"), {
        ...formData,
        fechaConfirmacion: serverTimestamp() 
      });
      
      setSubmitted(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error("Error al enviar el formulario", error);
      alert("Hubo un error al enviar tu respuesta. Por favor intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  // Calculamos el total de personas para saber si pedir los nombres extra
  const totalPersonas = parseInt(formData.adultos || 0) + parseInt(formData.ninos || 0);

  if (submitted) {
    return (
      <AnimatedSection style={{ marginBottom: '50px', textAlign: 'center' }}>
        <div className="corner-deco corner-top-left"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-top-right"><img src={decoEsquinaTop} alt="" /></div>
        <div className="corner-deco corner-bottom-left"><img src={decoEsquinaBottom} alt="" /></div>
        <div className="corner-deco corner-bottom-right"><img src={decoEsquinaBottom} alt="" /></div>
        
        <h2 style={{ fontSize: '2rem', marginTop: '20px' }}>¡Gracias por responder!</h2>
        <p style={{ fontSize: '1.2rem', color: '#e9d5ff', marginBottom: '10px' }}>
          Tus datos han sido registrados con éxito.
        </p>
        
        {formData.asistencia === 'si' && (
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--gold)' }}>
            ¡Espero contar con tu presencia para compartir momentos especiales!
          </p>
        )}

        {formData.asistencia === 'no' && (
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--gold)' }}>
            ¡Gracias por avisarnos, te extrañaremos mucho!
          </p>
        )}
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection style={{ marginBottom: '50px' }}>
      <div className="corner-deco corner-top-left"><img src={decoEsquinaTop} alt="" /></div>
      <div className="corner-deco corner-top-right"><img src={decoEsquinaTop} alt="" /></div>
      <div className="corner-deco corner-bottom-left"><img src={decoEsquinaBottom} alt="" /></div>
      <div className="corner-deco corner-bottom-right"><img src={decoEsquinaBottom} alt="" /></div>

      <h2 style={{ fontSize: '1.8rem' }}>Confirmación de Asistencia</h2>
      <p style={{ marginBottom: '30px' }}>Por favor confirma tu asistencia antes del 1 de Noviembre de 2026.</p>
      
      <form onSubmit={handleSubmit} className="rsvp-form">
        
        <div className="form-group">
          <label>Nombre y Apellido del Invitado Principal *</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label>¿Podrás asistir? *</label>
          <select name="asistencia" value={formData.asistencia} onChange={handleChange} required>
            <option value="si">¡Sí, ahí estaré!</option>
            <option value="no">Lamentablemente no podré</option>
          </select>
        </div>

        {formData.asistencia === 'si' && (
          <>
            <div className="form-row">
              <div className="form-group half">
                <label>Adultos *</label>
                <input 
                  type="number" 
                  name="adultos" 
                  min="1" 
                  max="10" 
                  value={formData.adultos} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="form-group half">
                <label>Niños (menores de 12)</label>
                <input 
                  type="number" 
                  name="ninos" 
                  min="0" 
                  max="10" 
                  value={formData.ninos} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* --- NUEVO: CAMPO DE ACOMPAÑANTES (Solo si hay > 1 persona) --- */}
            {totalPersonas > 1 && (
              <div className="form-group">
                <label>Nombres de los acompañantes *</label>
                <textarea 
                  name="nombresAcompanantes" 
                  rows="2" 
                  value={formData.nombresAcompanantes} 
                  onChange={handleChange} 
                  placeholder="Ej: María Gómez, Pedro Gómez..."
                  required
                ></textarea>
              </div>
            )}

            <div className="form-group">
              <label>Menú Especial (Restricciones)</label>
              <select name="dieta" value={formData.dieta} onChange={handleChange}>
                <option value="ninguna">Ninguna</option>
                <option value="celiaco">Celíaco / Sin TACC</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="diabetico">Diabético</option>
                <option value="otro">Otro (Aclarar abajo)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Comentarios adicionales</label>
              <textarea 
                name="comentarios" 
                rows="3" 
                value={formData.comentarios} 
                onChange={handleChange} 
                placeholder="Ej: Mi acompañante es celíaco, o llevaré cochecito de bebé..."
              ></textarea>
            </div>
          </>
        )}

        <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <><i className="fas fa-spinner fa-spin"></i> Enviando...</>
          ) : (
            <><i className="fas fa-paper-plane"></i> {formData.asistencia === 'si' ? 'Confirmar Asistencia' : 'Enviar Respuesta'}</>
          )}
        </button>
      </form>
    </AnimatedSection>
  );
}