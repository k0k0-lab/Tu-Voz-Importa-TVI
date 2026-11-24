import React, { useState } from 'react';
import { DATOS_NUBI, NUBI_PREGUNTAS_RAPIDAS } from '../data/tviData';

export default function NubiCompanionModal({ isOpen, onToggle, onClose }) {
  const [factIndex, setFactIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('preguntas'); // 'preguntas' | 'datos'
  const [selectedPregunta, setSelectedPregunta] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const nextFact = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 400);
    setFactIndex((prev) => (prev + 1) % DATOS_NUBI.length);
  };

  return (
    <>
      {/* Floating Action Button (Always visible on bottom-right of mobile & PC) */}
      <div className="fixed-nubi-companion">
        <button
          onClick={onToggle}
          className={`nubi-bubble-btn ${isWiggling ? 'nubi-wiggle' : ''} ${isOpen ? 'active-companion' : ''}`}
          aria-label="Abrir asistente Pregunta a Nubi"
          title="¡Haz clic para hablar o preguntar a Nubi!"
        >
          <span className="nubi-avatar-icon">☁️</span>
          <span className="nubi-btn-label">Pregunta a Nubi</span>
          <span className="nubi-sparkle-dot"></span>
        </button>
      </div>

      {/* Backdrop Overlay when Nubi is Open */}
      {isOpen && (
        <div className="nubi-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      {/* Floating Interactive Dialogue Card / Bottom Sheet on Mobile */}
      {isOpen && (
        <div className="nubi-card-popup" role="dialog" aria-modal="true" aria-labelledby="nubi-title">
          {/* Header */}
          <div className="nubi-popup-header">
            <div className="nubi-popup-title">
              <div className="nubi-avatar-badge">☁️✨</div>
              <div>
                <h4 id="nubi-title">Nubi • Tu Mascota Amiga</h4>
                <p>Pregúntame sobre igualdad y convivencia escolar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="nubi-close-btn"
              aria-label="Cerrar diálogo de Nubi"
            >
              ✕
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="nubi-tabs-nav">
            <button
              className={`nubi-tab-item ${activeTab === 'preguntas' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('preguntas')}
            >
              💬 Preguntas Frecuentes
            </button>
            <button
              className={`nubi-tab-item ${activeTab === 'datos' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('datos')}
            >
              💡 Datos al Azar
            </button>
          </div>

          {/* Content Body */}
          <div className="nubi-popup-body">
            {activeTab === 'preguntas' ? (
              <div className="nubi-questions-container">
                <div className="nubi-questions-chips">
                  {NUBI_PREGUNTAS_RAPIDAS.map((item, idx) => (
                    <button
                      key={idx}
                      className={`question-chip ${selectedPregunta === idx ? 'chip-active' : ''}`}
                      onClick={() => setSelectedPregunta(idx)}
                    >
                      {item.pregunta}
                    </button>
                  ))}
                </div>

                <div className="nubi-answer-card">
                  <div className="answer-header">
                    <span className="answer-cloud-tag">☁️ Nubi responde:</span>
                  </div>
                  <p className="answer-text">
                    {NUBI_PREGUNTAS_RAPIDAS[selectedPregunta].respuesta}
                  </p>
                </div>
              </div>
            ) : (
              <div className="nubi-facts-container">
                <div className="nubi-speech-quote">
                  <div className="quote-badge">✨ Sabías que...</div>
                  <p className="quote-text">{DATOS_NUBI[factIndex]}</p>
                </div>

                <button onClick={nextFact} className="btn-nubi-next">
                  <span>🎲 Ver otro dato al azar</span>
                </button>
              </div>
            )}

            <div className="nubi-quick-reminder">
              <span className="font-semibold text-sky-800">🤍 Recuerda:</span> Tu voz y tus límites importan siempre. Si necesitas ayuda, habla con un supervisor o docente de confianza.
            </div>
          </div>

          {/* Footer */}
          <div className="nubi-popup-footer">
            <a
              href="#encuesta"
              onClick={onClose}
              className="btn-nubi-quiz"
            >
              📋 Hacer Encuesta Escolar ➜
            </a>
          </div>
        </div>
      )}
    </>
  );
}
