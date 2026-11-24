import React, { useState } from 'react';
import { DATOS_NUBI } from '../data/tviData';

export default function NubiCompanionModal({ onFactRequested }) {
  const [isOpen, setIsOpen] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const nextFact = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    setFactIndex((prev) => (prev + 1) % DATOS_NUBI.length);
    if (onFactRequested) onFactRequested();
  };

  return (
    <div className="fixed-nubi-companion">
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) nextFact();
        }}
        className={`nubi-bubble-btn ${isWiggling ? 'nubi-wiggle' : ''}`}
        aria-label="Abrir asistente Nubi"
        title="¡Haz clic para hablar con Nubi!"
      >
        <span className="nubi-avatar-icon">☁️</span>
        <span className="nubi-btn-label">¡Hola, soy Nubi!</span>
        <span className="nubi-sparkle-dot"></span>
      </button>

      {/* Floating Dialogue Card */}
      {isOpen && (
        <div className="nubi-card-popup" role="dialog" aria-modal="true">
          <div className="nubi-popup-header">
            <div className="nubi-popup-title">
              <span className="text-xl">☁️</span>
              <div>
                <h4>Nubi • Mascota de TVI</h4>
                <p>Tu confidente y compañerx escolar</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="nubi-close-btn"
              aria-label="Cerrar diálogo"
            >
              ✕
            </button>
          </div>

          <div className="nubi-popup-body">
            <div className="nubi-speech-quote">
              <div className="quote-badge">💡 Mensaje para ti</div>
              <p>{DATOS_NUBI[factIndex]}</p>
            </div>

            <div className="nubi-quick-reminder">
              <span className="font-semibold text-sky-800">✨ Recuerda:</span> Tu voz y tus límites merecen ser respetados en cada aula y recreo.
            </div>
          </div>

          <div className="nubi-popup-footer">
            <button onClick={nextFact} className="btn-nubi-next">
              <span>🎲 Otro dato o consejo</span>
            </button>
            <a href="#encuesta" onClick={() => setIsOpen(false)} className="btn-nubi-quiz">
              Ir a la encuesta ➜
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

