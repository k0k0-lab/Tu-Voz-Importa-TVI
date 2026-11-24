import React from 'react';

export default function Navbar({ cursorEnabled, onToggleCursor, onTriggerNubi }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand / Logo */}
        <a href="#inicio" className="brand-link" aria-label="TVI - Inicio">
          <div className="brand-logo-badge">
            <span className="brand-cloud-icon">☁️</span>
            <span className="brand-sparkle">✨</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">TVI</span>
            <span className="brand-sub">Tu Voz Importa</span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#panorama" className="nav-item">
            <span className="nav-icon">📊</span> Panorama Estudiantil
          </a>
          <a href="#ambito-escolar" className="nav-item">
            <span className="nav-icon">🏫</span> Ámbito Escolar
          </a>
          <a href="#mitos-verdades" className="nav-item">
            <span className="nav-icon">⚖️</span> Mitos y Verdades
          </a>
          <a href="#encuesta" className="nav-item nav-item-highlight">
            <span className="nav-icon">📋</span> Encuesta de Escucha
          </a>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Nubi Interaction Trigger */}
          <button
            onClick={onTriggerNubi}
            className="btn-mascot-nav"
            title="Pedirle un consejo o dato a la mascota Nubi"
          >
            <span className="mascot-emoji">☁️</span>
            <span className="hidden-mobile">Pregunta a Nubi</span>
          </button>

          {/* Cursor Toggle */}
          <button
            onClick={onToggleCursor}
            className={`btn-cursor-toggle ${cursorEnabled ? 'active' : ''}`}
            title={cursorEnabled ? 'Desactivar efecto de puntero nube' : 'Activar efecto de puntero nube'}
            aria-label="Alternar cursor personalizado"
          >
            <span>{cursorEnabled ? '✨ Nube On' : '🖱️ Nube Off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

