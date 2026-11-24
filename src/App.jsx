import React, { useState } from 'react';
import CloudCursor from './components/CloudCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PanoramaEstudiantil from './components/PanoramaEstudiantil';
import AmbitoEscolar from './components/AmbitoEscolar';
import MitosVerdades from './components/MitosVerdades';
import EncuestaEscolar from './components/EncuestaEscolar';
import Footer from './components/Footer';
import NubiCompanionModal from './components/NubiCompanionModal';
import './App.css';

export default function App() {
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [isNubiOpen, setIsNubiOpen] = useState(false);

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

  return (
    <div className={`tvi-app-root ${cursorEnabled ? 'custom-cloud-cursor-active' : ''}`}>
      {/* Dynamic Cloud Cursor & Falling Stars Particle System (Desktop) */}
      <CloudCursor enabled={cursorEnabled} key={`cursor-${cursorEnabled}`} />

      {/* Navigation Header with Responsive Mobile Drawer */}
      <Navbar
        cursorEnabled={cursorEnabled}
        onToggleCursor={handleToggleCursor}
        onTriggerNubi={handleOpenNubi}
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
