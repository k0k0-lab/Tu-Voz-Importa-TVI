import React from 'react';

export default function Hero({ onStartSurvey, onMeetNubi }) {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-badge-pill">
        <span className="hero-badge-dot"></span>
        <span>Educación con Igualdad • Convivencia Segura • Voz Estudiantil</span>
      </div>

      <h1 className="hero-title">
        Tu Voz No Es Un Murmullo: <br />
        <span className="hero-gradient-text">Tu Voz Importa y Transforma</span>
      </h1>

      <p className="hero-description">
        En la escuela pasamos gran parte de nuestras vidas. Cuando existe igualdad de género,
        nadie calla por miedo a burlas, los liderazgos se comparten con respeto y cada persona
        aprende en un refugio seguro. TVI es un espacio para reflexionar, identificar si tu entorno
        es sano y tender puentes de ayuda mutua.
      </p>

      <div className="hero-cta-group">
        <a href="#encuesta" onClick={onStartSurvey} className="btn-primary-glow">
          <span className="btn-icon">📋</span>
          <span>¿Te sientes escuchadx? Haz la Encuesta</span>
          <span className="btn-arrow">➜</span>
        </a>

        <a href="#panorama" className="btn-secondary-soft">
          <span className="btn-icon">📊</span>
          <span>Ver Panorama Estudiantil</span>
        </a>

        <button onClick={onMeetNubi} className="btn-mascot-inline">
          <span className="btn-icon">☁️</span>
          <span>Hablar con Nubi</span>
        </button>
      </div>

      {/* Floating Quick Value Cards */}
      <div className="hero-quick-cards">
        <div className="quick-card">
          <div className="qc-icon">🗣️</div>
          <div className="qc-text">
            <strong>Escucha Activa</strong>
            <span>Opinar sin temor a ser juzgadx</span>
          </div>
        </div>

        <div className="quick-card">
          <div className="qc-icon">⚖️</div>
          <div className="qc-text">
            <strong>Equidad Real</strong>
            <span>Mismos derechos y oportunidades</span>
          </div>
        </div>

        <div className="quick-card">
          <div className="qc-icon">🛡️</div>
          <div className="qc-text">
            <strong>Espacio Seguro</strong>
            <span>Redes de apoyo frente al acoso</span>
          </div>
        </div>
      </div>
    </section>
  );
}

