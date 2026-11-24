import React, { useState, useEffect } from 'react';
import CloudCursor from './components/CloudCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PanoramaEstudiantil from './components/PanoramaEstudiantil';
import AmbitoEscolar from './components/AmbitoEscolar';
import MitosVerdades from './components/MitosVerdades';
import MuroAnonimo from './components/MuroAnonimo';
import EncuestaEscolar from './components/EncuestaEscolar';
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

  // If waiting for auth state initialization
  if (isLoadingAuth) {
    return <div className="tvi-loading-screen"><span>☁️ Cargando santuario TVI...</span></div>;
  }

  // If NOT logged in / not verified as a student, show the Student Gatekeeper
  if (!currentStudent) {
    return (
      <div className="tvi-app-root">
        <CloudCursor enabled={cursorEnabled} />
        <StudentGatekeeper onAuthenticated={handleAuthenticated} />
      </div>
    );
  }

  // Once verified as a student, full access to TVI
  return (
    <div className={`tvi-app-root ${cursorEnabled ? 'custom-cloud-cursor-active' : ''}`}>
      {/* Dynamic Cloud Cursor & Falling Stars Particle System (Desktop) */}
      <CloudCursor enabled={cursorEnabled} key={`cursor-${cursorEnabled}`} />

      {/* Navigation Header with Verified Student Pill and Mobile Drawer */}
      <Navbar
        cursorEnabled={cursorEnabled}
        onToggleCursor={handleToggleCursor}
        onTriggerNubi={handleOpenNubi}
        currentStudent={currentStudent}
        onLogout={handleLogout}
      />

      {/* Main Content Flow */}
      <main className="main-content-flow">
        {/* Hero Section */}
        <Hero
          onStartSurvey={handleScrollToSurvey}
          onMeetNubi={handleOpenNubi}
        />

        {/* Panorama Estudiantil (4 Key Indicators & Delicacy Reflection) */}
        <PanoramaEstudiantil />

        {/* Ámbito Escolar & Género (Pillars & Real-World Cases) */}
        <AmbitoEscolar />

        {/* Mitos y Verdades (Concise & Optimized for PC and Mobile) */}
        <MitosVerdades />

        {/* Muro de Voces Estudiantiles (Anonymous & Safe Space) */}
        <MuroAnonimo currentStudent={currentStudent} />

        {/* Encuesta Escolar ("¿realmente te sientes escuchadx en tu ámbito escolar?") */}
        <EncuestaEscolar />
      </main>

      {/* Comforting & Reflective Footer */}
      <Footer />

      {/* Interactive Nubi Assistant Modal & Floating Companion (Mobile & PC) */}
      <NubiCompanionModal
        isOpen={isNubiOpen}
        onToggle={handleToggleNubi}
        onClose={handleCloseNubi}
      />
    </div>
  );
}
