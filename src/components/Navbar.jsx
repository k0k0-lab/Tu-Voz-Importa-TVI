import React, { useState } from 'react';

export default function Navbar({
  cursorEnabled,
  onToggleCursor,
  onTriggerNubi,
  currentStudent,
  onLogout
}) {
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
            <span className="brand-cloud-icon">🍃</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">TVI</span>
            <span className="brand-sub">Tu Voz Importa</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#panorama" className="nav-item">Panorama</a>
          <a href="#igualdad-secundaria" className="nav-item">Secundaria</a>
          <a href="#ambito-escolar" className="nav-item">Escuela</a>
          <a href="#mitos-verdades" className="nav-item">Mitos</a>
          <a href="#muro-anonimo" className="nav-item">Muro</a>
          <a href="#conclusion" className="nav-item">Conclusión</a>
          <a href="#encuesta" className="nav-item nav-item-highlight">Encuesta</a>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {currentStudent && (
            <div className="student-profile-pill" title={`Estudiante: ${currentStudent.alias}`}>
              <span className="student-pill-alias">{currentStudent.alias}</span>
              <button
                onClick={onLogout}
                className="btn-pill-logout"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                Salir
              </button>
            </div>
          )}

          {/* Hojita Interaction Trigger */}
          <button
            onClick={onTriggerNubi}
            className="btn-mascot-nav"
            title="Consultar al asistente Hojita"
            aria-label="Abrir asistente Hojita"
          >
            <span className="mascot-emoji">🍃</span>
            <span className="btn-nubi-nav-text">Hojita</span>
          </button>

          {/* Cursor Toggle (Desktop only) */}
          <button
            onClick={onToggleCursor}
            className={`btn-cursor-toggle ${cursorEnabled ? 'active' : ''} desktop-only-control`}
            title={cursorEnabled ? 'Desactivar puntero hoja' : 'Activar puntero hoja'}
            aria-label="Alternar puntero hoja"
          >
            <span>{cursorEnabled ? 'Hoja: On' : 'Hoja: Off'}</span>
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
          {currentStudent && (
            <div className="mobile-student-banner">
              <div>
                <strong>{currentStudent.alias}</strong>
                <span>Estudiante verificadx</span>
              </div>
              <button onClick={() => { handleNavClick(); onLogout(); }} className="btn-mobile-logout">
                Cerrar sesión
              </button>
            </div>
          )}

          <a href="#panorama" onClick={handleNavClick} className="mobile-nav-link">
            Panorama Estudiantil
          </a>
          <a href="#igualdad-secundaria" onClick={handleNavClick} className="mobile-nav-link">
            Igualdad en Secundaria
          </a>
          <a href="#ambito-escolar" onClick={handleNavClick} className="mobile-nav-link">
            Ámbito Escolar
          </a>
          <a href="#mitos-verdades" onClick={handleNavClick} className="mobile-nav-link">
            Mitos y Verdades
          </a>
          <a href="#muro-anonimo" onClick={handleNavClick} className="mobile-nav-link">
            Muro de Voces Anónimas
          </a>
          <a href="#conclusion" onClick={handleNavClick} className="mobile-nav-link">
            Conclusión
          </a>
          <a href="#encuesta" onClick={handleNavClick} className="mobile-nav-link mobile-highlight-link">
            Encuesta Diagnóstica
          </a>
          <button
            onClick={() => {
              handleNavClick();
              onTriggerNubi();
            }}
            className="mobile-nav-link mobile-nubi-link"
          >
            <span>🍃</span> Consultar a Hojita
          </button>
        </nav>
      )}
    </header>
  );
}
