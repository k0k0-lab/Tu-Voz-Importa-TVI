import React from 'react';

export default function Footer() {
  return (
    <footer className="tvi-footer">
      <div className="footer-comfort-card">
        <div className="comfort-icon-badge">✨🤍✨</div>
        <h3 className="comfort-heading">Una palabra para tu corazón</h3>
        <blockquote className="comfort-quote">
          "Si alguna vez has sentido que tu voz no cabe en el aula, que tus preguntas incomodan o que debes 
          hacerte pequeñx para no ser blanco de burlas, escucha esto con calma: <strong>no hay nada roto en ti</strong>. 
          Tu voz, tu sensibilidad y tus sueños son valiosos exactamente como son. 
          Nadie tiene derecho a apagar tu brillo ni a definir tus capacidades por estereotipos de género. 
          Incluso en los días donde el colegio se sienta pesado y el silencio parezca la única salida, 
          recuerda que tu existencia importa, tu presencia hace falta y mereces caminar por los pasillos con la frente en alto. 
          No estás solx: hay personas esperando escucharte con cariño y respeto."
        </blockquote>
        <div className="comfort-author">— Con cariño, la comunidad de TVI (Tu Voz Importa) ☁️</div>
      </div>

      <div className="footer-support-strip">
        <div className="support-strip-item">
          <span className="strip-icon">📞</span>
          <div>
            <strong>¿Necesitas hablar hoy?</strong>
            <p>Busca a tu orientadorx escolar o llama a la línea infantil/juvenil de tu país.</p>
          </div>
        </div>

        <div className="support-strip-item">
          <span className="strip-icon">🛡️</span>
          <div>
            <strong>Pedir ayuda es valentía</strong>
            <p>Un supervisor mayor de confianza está para protegerte, nunca para juzgarte.</p>
          </div>
        </div>

        <div className="support-strip-item">
          <span className="strip-icon">🌈</span>
          <div>
            <strong>Igualdad es empatía</strong>
            <p>Construyamos escuelas libres de prejuicios, machismo y violencia.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-brand-info">
          <span className="footer-logo">☁️ TVI</span>
          <span>Tu Voz Importa • Proyecto Educativo de Igualdad de Género y Convivencia Escolar</span>
        </div>
        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#panorama">Panorama</a>
          <a href="#encuesta">Encuesta</a>
          <a href="#mitos-verdades">Mitos y Verdades</a>
        </div>
      </div>
    </footer>
  );
}

