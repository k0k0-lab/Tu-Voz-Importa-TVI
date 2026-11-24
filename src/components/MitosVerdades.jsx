import React, { useState } from 'react';
import { MITOS_Y_VERDADES } from '../data/tviData';

export default function MitosVerdades() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="mitos-verdades" className="mitos-section">
      <div className="section-header-center">
        <span className="category-tag-teal">DESMONTANDO PREJUICIOS</span>
        <h2 className="section-main-title">Mitos y Verdades en la Vida Escolar</h2>
        <p className="section-subtitle">
          Muchos estereotipos se han repetido tantas veces que parecen verdades naturales. 
          Haz clic en cada tarjeta para desarmar el mito y descubrir la realidad basada en respeto y evidencia.
        </p>
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
              aria-label={`Verdad sobre: ${item.mito}`}
            >
              <div className="myth-card-inner">
                {/* Front: Mito */}
                <div className="myth-card-face myth-front">
                  <div className="myth-header">
                    <span className="myth-badge">❌ MITO #{item.id}</span>
                    <span className="flip-icon-hint">🔄 Toca para revelar</span>
                  </div>
                  <h3 className="myth-text">"{item.mito}"</h3>
                  <div className="myth-bottom-bar">
                    <span>¿Por qué la gente lo cree? Haz clic para ver la verdad</span>
                  </div>
                </div>

                {/* Back: Verdad */}
                <div className="myth-card-face myth-back">
                  <div className="truth-header">
                    <span className="truth-badge">✅ LA VERDAD</span>
                    <span className="flip-icon-hint">🔄 Volver</span>
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
        <span>💡 <strong>Consejo de Nubi:</strong> Cuestionar lo que consideramos "normal" en el colegio es el primer paso para construir una convivencia donde nadie se sienta menos.</span>
      </div>
    </section>
  );
}

