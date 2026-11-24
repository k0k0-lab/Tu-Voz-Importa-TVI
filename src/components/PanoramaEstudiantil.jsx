import React, { useState } from 'react';
import { PANORAMA_DATA } from '../data/tviData';

export default function PanoramaEstudiantil() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="panorama" className="panorama-section">
      <div className="section-header-left">
        <span className="category-tag-brown">PANORAMA ESTUDIANTIL</span>
        <h2 className="section-main-title">¿Por qué necesitamos espacios de escucha activa?</h2>
        <p className="section-subtitle">
          Indicadores frecuentes observados en diagnósticos de convivencia escolar juvenil:
        </p>
      </div>

      {/* Grid of the 4 Key Indicators from the uploaded image */}
      <div className="panorama-grid">
        {PANORAMA_DATA.map((item) => {
          const isSelected = activeCard === item.id;
          return (
            <div
              key={item.id}
              className={`panorama-card ${isSelected ? 'card-expanded' : ''}`}
              onClick={() => setActiveCard(isSelected ? null : item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveCard(isSelected ? null : item.id);
                }
              }}
              title="Haz clic para ver el impacto pedagógico y cómo abordarlo"
            >
              <div className="card-top-row">
                <h3 className="indicator-title">{item.title}</h3>
                <span className="indicator-percent" style={{ color: item.accent }}>
                  {item.percentage}%
                </span>
              </div>

              {/* Progress Bar resembling the screenshot */}
              <div className="progress-track-container">
                <div
                  className="progress-fill-bar"
                  style={{
                    width: `${item.percentage}%`,
                    background: item.barColor,
                  }}
                />
              </div>

              <p className="indicator-subtext">{item.subtitle}</p>

              {/* Interactive Delicacy / Deep-Dive note */}
              <div className="card-deep-dive">
                <div className="delicacy-badge">
                  <span className="delicacy-icon">🔍</span>
                  <span>Impacto real en el aula</span>
                </div>
                <p className="deep-dive-text">{item.impact}</p>

                <div className="solution-box">
                  <strong>💡 ¿Cómo sanar este indicador?</strong>
                  <p>{item.solution}</p>
                </div>
              </div>

              <div className="card-click-hint">
                <span>{isSelected ? 'Ocultar detalle ▲' : 'Ver reflexión sobre este indicador ▼'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delicacy & Empathy Callout Box */}
      <div className="delicacy-statement-box">
        <div className="delicacy-callout-icon">🕊️</div>
        <div className="delicacy-callout-content">
          <h4>La delicadeza detrás de cada porcentaje</h4>
          <p>
            Detrás del <strong>68%</strong> de jóvenes que guardan silencio o del <strong>59%</strong> que no sabe a quién recurrir, 
            hay miradas que buscan complicidad, mentes brillantes intimidadas por estereotipos de género y corazones que temen el rechazo. 
            La escuela debe ser el lugar donde aprendas a volar, no la jaula donde aprendas a callar. Visibilizar estas cifras nos compromete a 
            cuidarnos unos a otros.
          </p>
        </div>
      </div>
    </section>
  );
}

