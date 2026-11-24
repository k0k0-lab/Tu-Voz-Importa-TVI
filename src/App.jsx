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
  const [triggerNubiCount, setTriggerNubiCount] = useState(0);

  const handleToggleCursor = () => {
    setCursorEnabled((prev) => !prev);
  };

  const handleTriggerNubi = () => {
    setTriggerNubiCount((prev) => prev + 1);
    // Find the nubi bubble button and click it to open companion dialog
    const companionBtn = document.querySelector('.nubi-bubble-btn');
    if (companionBtn) {
      companionBtn.click();
    }
  };

  const handleScrollToSurvey = () => {
    const el = document.getElementById('encuesta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`tvi-app-root ${cursorEnabled ? 'custom-cloud-cursor-active' : ''}`}>
      {/* Dynamic Cloud Cursor & Falling Stars Particle System */}
      <CloudCursor enabled={cursorEnabled} key={`cursor-${cursorEnabled}`} />

      {/* Navigation Header */}
      <Navbar
        cursorEnabled={cursorEnabled}
        onToggleCursor={handleToggleCursor}
        onTriggerNubi={handleTriggerNubi}
      />

      {/* Main Content Area */}
      <main className="main-content-flow">
        {/* Hero Section */}
        <Hero
          onStartSurvey={handleScrollToSurvey}
          onMeetNubi={handleTriggerNubi}
        />

        {/* Panorama Estudiantil (The exact 4 indicators & percentages from user's image) */}
        <PanoramaEstudiantil />

        {/* Ámbito Escolar & Género */}
        <AmbitoEscolar />

        {/* Mitos y Verdades */}
        <MitosVerdades />

        {/* Encuesta: "¿realmente te sientes escuchadx en tu ámbito escolar?" */}
        <EncuestaEscolar />
      </main>

      {/* Comforting & Reflective Footer */}
      <Footer />

      {/* Floating Interactive Nubi Companion (Mobile & Desktop) */}
      <NubiCompanionModal
        key={triggerNubiCount}
        onFactRequested={() => {}}
      />
    </div>
  );
}
