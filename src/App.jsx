import React, { useState, useEffect } from 'react';
import CloudCursor from './components/CloudCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PanoramaEstudiantil from './components/PanoramaEstudiantil';
import IgualdadSecundaria from './components/IgualdadSecundaria';
import AmbitoEscolar from './components/AmbitoEscolar';
import MitosVerdades from './components/MitosVerdades';
import MuroAnonimo from './components/MuroAnonimo';
import EncuestaEscolar from './components/EncuestaEscolar';
import ConclusionSection from './components/ConclusionSection';
import Footer from './components/Footer';
import NubiCompanionModal from './components/NubiCompanionModal';
import StudentGatekeeper from './components/StudentGatekeeper';
import './App.css';

export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [isNubiOpen, setIsNubiOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Check saved student session on mount
  useEffect(() => {
    const saved = localStorage.getItem('tvi_student_session');
    if (saved) {
      try {
        setCurrentStudent(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('tvi_student_session');
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const handleAuthenticated = (student) => {
    setCurrentStudent(student);
  };

  const handleLogout = () => {
    if (window.confirm('¿Seguro que deseas salir del espacio protegido? Tu cuenta y alias siguen guardados para cuando vuelvas a iniciar sesión.')) {
      localStorage.removeItem('tvi_student_session');
      setCurrentStudent(null);
    }
  };

  const handleToggleCursor = () => {
    setCursorEnabled((prev) => !prev);
  };

  const handleToggleNubi = () => {
    setIsNubiOpen((prev) => !prev);
  };

  const handleOpenNubi = () => {
    setIsNubiOpen(true);
  };

  const handleCloseNubi = () => {
    setIsNubiOpen(false);
  };

  const handleScrollToSurvey = () => {
    const el = document.getElementById('encuesta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoadingAuth) {
    return <div className="tvi-loading-screen"><span>🍃 Cargando plataforma TVI...</span></div>;
  }

  if (!currentStudent) {
    return (
      <div className="tvi-app-root">
        <CloudCursor enabled={cursorEnabled} />
        <StudentGatekeeper onAuthenticated={handleAuthenticated} />
      </div>
    );
  }

  return (
    <div className={`tvi-app-root ${cursorEnabled ? 'custom-cloud-cursor-active' : ''}`}>
      {/* Dynamic Leaf Cursor & Particle System (Desktop) */}
      <CloudCursor enabled={cursorEnabled} key={`cursor-${cursorEnabled}`} />

      {/* Prominent Petrol-Green Navigation Header */}
      <Navbar
        cursorEnabled={cursorEnabled}
        onToggleCursor={handleToggleCursor}
        onTriggerNubi={handleOpenNubi}
        currentStudent={currentStudent}
        onLogout={handleLogout}
      />

      {/* Main Content Flow */}
      <main className="main-content-flow">
        {/* Split Formal Hero Section */}
        <Hero
          onStartSurvey={handleScrollToSurvey}
          onMeetNubi={handleOpenNubi}
        />

        {/* Panorama Estudiantil */}
        <PanoramaEstudiantil />

        {/* ¿Por qué es necesario fomentar la igualdad en la secundaria? */}
        <IgualdadSecundaria />

        {/* Ámbito Escolar & Género */}
        <AmbitoEscolar />

        {/* Mitos y Verdades */}
        <MitosVerdades />

        {/* Muro de Voces Estudiantiles */}
        <MuroAnonimo currentStudent={currentStudent} />

        {/* Encuesta Escolar */}
        <EncuestaEscolar />

        {/* Conclusión */}
        <ConclusionSection />
      </main>

      {/* Footer with custom background */}
      <Footer />

      {/* Interactive Hojita Assistant Modal */}
      <NubiCompanionModal
        isOpen={isNubiOpen}
        onToggle={handleToggleNubi}
        onClose={handleCloseNubi}
      />
    </div>
  );
}
