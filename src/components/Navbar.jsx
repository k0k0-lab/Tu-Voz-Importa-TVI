import React, { useState } from 'react';

export default function Navbar({ cursorEnabled, onToggleCursor, onTriggerNubi }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

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

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#panorama" className="nav-item">
            <span className="nav-icon">📊</span> Panorama
          </a>
          <a href="#ambito-escolar" className="nav-item">
            <span className="nav-icon">🏫</span> Ámbito Escolar
          </a>
          <a href="#mitos-verdades" className="nav-item">
            <span className="nav-icon">⚖️</span> Mitos y Verdades
          </a>
          <a href="#encuesta" className="nav-item nav-item-highlight">
            <span className="nav-icon">📋</span> Encuesta
          </a>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Nubi Interaction Trigger */}
          <button
            onClick={onTriggerNubi}
            className="btn-mascot-nav"
            title="Pregúntale a la mascota Nubi sobre igualdad y convivencia"
            aria-label="Abrir asistente Pregunta a Nubi"
          >
            <span className="mascot-emoji">☁️</span>
            <span className="btn-nubi-nav-text">Pregunta a Nubi</span>
          </button>

          {/* Cursor Toggle (Desktop only) */}
          <button
            onClick={onToggleCursor}
            className={`btn-cursor-toggle ${cursorEnabled ? 'active' : ''} desktop-only-control`}
            title={cursorEnabled ? 'Desactivar efecto de puntero nube' : 'Activar efecto de puntero nube'}
            aria-label="Alternar cursor personalizado"
          >
            <span>{cursorEnabled ? '✨ Nube On' : '🖱️ Nube Off'}</span>
          </button>

          {/* Hamburger Menu Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            <span className="hamburger-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="mobile-dropdown-menu" aria-label="Menú móvil">
          <a href="#panorama" onClick={handleNavClick} className="mobile-nav-link">
            <span>📊</span> Panorama Estudiantil
          </a>
          <a href="#ambito-escolar" onClick={handleNavClick} className="mobile-nav-link">
            <span>🏫</span> Ámbito Escolar
          </a>
          <a href="#mitos-verdades" onClick={handleNavClick} className="mobile-nav-link">
            <span>⚖️</span> Mitos y Verdades
          </a>
          <a href="#encuesta" onClick={handleNavClick} className="mobile-nav-link mobile-highlight-link">
            <span>📋</span> Encuesta "¿Te sientes escuchadx?"
          </a>
          <button
            onClick={() => {
              handleNavClick();
              onTriggerNubi();
            }}
            className="mobile-nav-link mobile-nubi-link"
          >
            <span>☁️</span> Pregunta a Nubi
          </button>
        </nav>
      )}
    </header>
  );
}
