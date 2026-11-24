import React, { useState } from 'react';
import { MITOS_Y_VERDADES } from '../data/tviData';

export default function MitosVerdades() {
  const [flippedCards, setFlippedCards] = useState({});
  const [allFlipped, setAllFlipped] = useState(false);

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    const nextState = !allFlipped;
    setAllFlipped(nextState);
    const newFlipped = {};
    MITOS_Y_VERDADES.forEach((item) => {
      newFlipped[item.id] = nextState;
    });
    setFlippedCards(newFlipped);
  };

  return (
    <section id="mitos-verdades" className="mitos-section">
      <div className="section-header-center">
        <span className="category-tag-teal">DESMONTANDO PREJUICIOS</span>
        <h2 className="section-main-title">Mitos y Verdades en la Vida Escolar</h2>
        <p className="section-subtitle">
          Muchos estereotipos se han repetido tanto que parecen verdades naturales. 
          Toca cada tarjeta para desarmar el mito con evidencia y empatía.
        </p>

        {/* Quick helper toggle for mobile & PC */}
        <div className="mitos-action-bar">
          <button
            onClick={handleToggleAll}
            className="btn-toggle-all-mitos"
            aria-label="Alternar todos los mitos y verdades"
          >
            <span>{allFlipped ? '🔄 Volver a ver Mitos' : '✨ Revelar Todas las Verdades'}</span>
          </button>
        </div>
      </div>

      <div className="mitos-grid">
        {MITOS_Y_VERDADES.map((item) => {
          const isFlipped = !!flippedCards[item.id];
          return (
            <div
              key={item.id}
              className={`myth-card ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => toggleFlip(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleFlip(item.id);
                }
              }}
              aria-label={`Mito: ${item.mito}. Toca para voltear tarjeta`}
            >
              <div className="myth-card-inner">
                {/* Front: Mito */}
                <div className="myth-card-face myth-front">
                  <div className="myth-header">
                    <span className="myth-badge">❌ MITO #{item.id}</span>
                    <span className="flip-icon-hint">Toca para voltear 🔄</span>
                  </div>
                  <h3 className="myth-text">"{item.mito}"</h3>
                  <div className="myth-bottom-bar">
                    <span>¿Es verdad? Toca para descubrir</span>
                  </div>
                </div>

                {/* Back: Verdad */}
                <div className="myth-card-face myth-back">
                  <div className="truth-header">
                    <span className="truth-badge">✅ LA VERDAD</span>
                    <span className="flip-icon-hint">Volver 🔄</span>
                  </div>
                  <h4 className="truth-text">{item.verdad}</h4>
                  <p className="truth-explanation">{item.explicacion}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mitos-summary-note">
        <span>💡 <strong>Consejo de Nubi:</strong> Cuestionar los estereotipos en el colegio abre caminos para que cada estudiante sea libre de aprender y soñar sin límites.</span>
      </div>
    </section>
  );
}
