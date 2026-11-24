import React, { useState } from 'react';
import { AMBITO_ESCOLAR_PILARES } from '../data/tviData';

export default function AmbitoEscolar() {
  const [selectedCase, setSelectedCase] = useState(0);

  const realCases = [
    {
      title: "En el Laboratorio de Ciencias",
      problem: "A veces se asume que los varones deben operar los equipos complejos o liderar el experimento, mientras a las chicas se les pide tomar notas o limpiar la mesa.",
      solucion: "La capacidad analítica y experimental no tiene género. Fomentar que todas las estudiantes manipulen instrumentos y lideren investigaciones desmonta barreras vocacionales.",
      tag: "Vocación y Ciencia"
    },
    {
      title: "En la Clase de Literatura y Debate",
      problem: "Cuando un varón expresa sensibilidad o emociones poéticas, puede recibir burlas de 'debilidad'; si una chica habla con firmeza, a menudo es catalogada despectivamente de 'mandona'.",
      solucion: "El liderazgo asertivo y la sensibilidad emocional son fortalezas humanas universales que deben ser celebradas por igual.",
      tag: "Libertad de Expresión"
    },
    {
      title: "En la Cancha y el Recreo",
      problem: "Los campos de fútbol suelen abarcar el 80% del patio escolar, desplazando a quienes desean conversar, leer o practicar otros deportes.",
      solucion: "Democratizar los espacios comunes y crear torneos mixtos donde el juego limpio y el compañerismo primen sobre la agresividad.",
      tag: "Espacio Público Escolar"
    }
  ];

  return (
    <section id="ambito-escolar" className="ambito-section">
      <div className="section-header-center">
        <span className="category-tag-purple">IMPACTO EN LA CONVIVENCIA</span>
        <h2 className="section-main-title">¿Cómo afecta la igualdad de género en la escuela?</h2>
        <p className="section-subtitle">
          La igualdad no es un concepto abstracto de libros: se vive en cada pupitre, en cada trabajo grupal y en cada mirada en los pasillos.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="pilares-grid">
        {AMBITO_ESCOLAR_PILARES.map((pilar, index) => (
          <div key={index} className="pilar-card">
            <div className="pilar-icon-wrap">{pilar.icon}</div>
            <h3 className="pilar-title">{pilar.title}</h3>
            <p className="pilar-desc">{pilar.desc}</p>
          </div>
        ))}
      </div>

      {/* Real Everyday Situations Interactive Box */}
      <div className="cases-interactive-container">
        <div className="cases-nav-tabs">
          <div className="cases-nav-intro">
            <h4>Casos cotidianos en el colegio</h4>
            <p>Selecciona una situación para reflexionar sobre su impacto:</p>
          </div>
          <div className="cases-button-list">
            {realCases.map((c, idx) => (
              <button
                key={idx}
                className={`case-tab-btn ${selectedCase === idx ? 'active-case' : ''}`}
                onClick={() => setSelectedCase(idx)}
              >
                <span>{c.tag}</span>
                <strong>{c.title}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="case-content-display">
          <div className="case-badge-pill">{realCases[selectedCase].tag}</div>
          <h3 className="case-title">{realCases[selectedCase].title}</h3>

          <div className="case-analysis-block">
            <div className="case-sub-block alert-block">
              <span className="case-mini-icon">⚠️</span>
              <div>
                <strong>¿Qué suele ocurrir?</strong>
                <p>{realCases[selectedCase].problem}</p>
              </div>
            </div>

            <div className="case-sub-block solution-block">
              <span className="case-mini-icon">🌱</span>
              <div>
                <strong>¿Cómo transformar esta realidad?</strong>
                <p>{realCases[selectedCase].solucion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

