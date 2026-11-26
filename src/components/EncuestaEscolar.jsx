import React, { useState } from 'react';
import { ENCUESTA_PREGUNTAS, RESULTADOS_SEMAFORO } from '../data/tviData';

export default function EncuestaEscolar() {
  const [respuestas, setRespuestas] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [showFullReview, setShowFullReview] = useState(false);

  const totalPreguntas = ENCUESTA_PREGUNTAS.length;
  const currentQ = ENCUESTA_PREGUNTAS[currentStep];

  const handleSelectOption = (preguntaId, puntos, color) => {
    const updated = {
      ...respuestas,
      [preguntaId]: { puntos, color }
    };
    setRespuestas(updated);

    // Auto advance after slight pause or stay on step
    if (currentStep < totalPreguntas - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 250);
    }
  };

  const calcularResultado = () => {
    const respuestasArray = Object.values(respuestas);
    if (respuestasArray.length < totalPreguntas) {
      alert("Por favor responde todas las preguntas para que tu diagnóstico sea preciso y confiable.");
      return;
    }

    // Contar cuántas respuestas rojas, amarillas y verdes hubo
    let rojas = 0;
    let amarillas = 0;
    let verdes = 0;
    let puntosTotales = 0;

    respuestasArray.forEach((r) => {
      puntosTotales += r.puntos;
      if (r.color === 'rojo') rojas++;
      if (r.color === 'amarillo') amarillas++;
      if (r.color === 'verde') verdes++;
    });

    // Criterio de semáforo:
    // Si tiene 2 o más respuestas rojas, o el puntaje es <= 9, es ROJO (prioridad a la seguridad del alumno)
    // Si el puntaje es >= 15 y tiene 0 o 1 amarilla sin rojas, es VERDE
    // En caso intermedio, es AMARILLO
    let nivel = 'amarillo';
    if (rojas >= 2 || puntosTotales <= 9) {
      nivel = 'rojo';
    } else if (verdes >= 4 && rojas === 0) {
      nivel = 'verde';
    } else {
      nivel = 'amarillo';
    }

    setResultado({
      nivel,
      info: RESULTADOS_SEMAFORO[nivel],
      puntos: puntosTotales,
      maxPuntos: totalPreguntas * 3,
      rojas,
      amarillas,
      verdes,
      porcentajeVerde: Math.round((verdes / totalPreguntas) * 100),
      porcentajeAmarillo: Math.round((amarillas / totalPreguntas) * 100),
      porcentajeRojo: Math.round((rojas / totalPreguntas) * 100),
    });
  };

  const reiniciarEncuesta = () => {
    setRespuestas({});
    setCurrentStep(0);
    setResultado(null);
    setShowFullReview(false);
  };

  const answeredCount = Object.keys(respuestas).length;
  const progressPercent = Math.round((answeredCount / totalPreguntas) * 100);

  return (
    <section id="encuesta" className="encuesta-section">
      <div className="section-header-center">
        <span className="category-tag-indigo">DIAGNÓSTICO ESTUDIANTIL</span>
        <h2 className="section-main-title">¿realmente te sientes escuchadx en tu ámbito escolar?</h2>
        <p className="section-subtitle">
          Esta encuesta es un espacio íntimo, anónimo y sin juicios. Responde con la mayor sinceridad 
          para conocer en qué estado se encuentra tu entorno escolar y qué acciones puedes tomar.
        </p>
      </div>

      {!resultado ? (
        <div className="encuesta-box-container">
          <div className="encuesta-horizontal-grid">
            {/* Left Column: Progress & Question */}
            <div className="encuesta-left-col">
              <div className="encuesta-progress-bar-wrap">
                <div className="progress-info-row">
                  <span className="progress-step-label">
                    Pregunta {currentStep + 1} de {totalPreguntas}
                  </span>
                  <span className="progress-percent-label">
                    {progressPercent}% completado
                  </span>
                </div>
                <div className="quiz-progress-track">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${((currentStep + 1) / totalPreguntas) * 100}%` }}
                  />
                </div>
              </div>

              <div className="quiz-question-card">
                <div className="question-number-pill">Pregunta #{currentQ.id}</div>
                <h3 className="question-text">{currentQ.pregunta}</h3>
              </div>

              <div className="quiz-disclaimer">
                <span>🔒 Tus respuestas no se guardan en ningún servidor. Este test es 100% privado y seguro.</span>
              </div>
            </div>

            {/* Right Column: Options & Stepper Controls */}
            <div className="encuesta-right-col">
              <div className="quiz-options-list">
                {currentQ.opciones.map((op, idx) => {
                  const isSelected = respuestas[currentQ.id]?.texto === op.texto || respuestas[currentQ.id]?.puntos === op.puntos;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`quiz-option-button ${isSelected ? 'option-selected' : ''} option-${op.color}`}
                      onClick={() => handleSelectOption(currentQ.id, op.puntos, op.color)}
                    >
                      <div className="option-indicator-bubble">
                        {op.color === 'verde' && '🟢'}
                        {op.color === 'amarillo' && '🟡'}
                        {op.color === 'rojo' && '🔴'}
                      </div>
                      <span className="option-text-label">{op.texto}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="quiz-navigation-controls">
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="btn-stepper btn-prev"
                >
                  ◀ Anterior
                </button>

                {currentStep < totalPreguntas - 1 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => Math.min(totalPreguntas - 1, prev + 1))}
                    disabled={!respuestas[currentQ.id]}
                    className="btn-stepper btn-next"
                  >
                    Siguiente ▶
                  </button>
                ) : (
                  <button
                    onClick={calcularResultado}
                    disabled={answeredCount < totalPreguntas}
                    className="btn-stepper btn-finish"
                  >
                    🏁 Ver mi diagnóstico y semáforo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen with Semaphore Traffic Light System */
        <div className={`resultado-container resultado-${resultado.nivel}`}>
          {/* Traffic Light Visual Header */}
          <div className="traffic-light-visual-box">
            <div className="traffic-light-housing">
              <div className={`light-circle light-red ${resultado.nivel === 'rojo' ? 'light-active pulse-red' : ''}`} title="Rojo: Alerta Crítica" />
              <div className={`light-circle light-yellow ${resultado.nivel === 'amarillo' ? 'light-active pulse-yellow' : ''}`} title="Amarillo: Zona de Atención" />
              <div className={`light-circle light-green ${resultado.nivel === 'verde' ? 'light-active pulse-green' : ''}`} title="Verde: Espacio Seguro" />
            </div>

            <div className="traffic-light-details">
              <div className="result-badge-level" style={{ color: resultado.info.color }}>
                {resultado.info.badge}
              </div>
              <h3 className="result-headline">{resultado.info.nivel}</h3>
              <p className="result-main-message">{resultado.info.mensajePrincipal}</p>
            </div>
          </div>

          {/* Horizontal Pair: Percentages Breakdown + Pedagogical Analysis */}
          <div className="result-horizontal-pair">
            <div className="result-percentages-panel">
              <h4 className="panel-subheading">Distribución de tu vivencia escolar:</h4>
              <div className="percentage-bars-breakdown">
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>🟢 Vivencias Seguras y de Respeto:</span>
                    <strong>{resultado.porcentajeVerde}%</strong>
                  </div>
                  <div className="breakdown-track">
                    <div className="breakdown-bar bar-green" style={{ width: `${resultado.porcentajeVerde}%` }} />
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>🟡 Momentos con Sesgos o Inseguridad Parcial:</span>
                    <strong>{resultado.porcentajeAmarillo}%</strong>
                  </div>
                  <div className="breakdown-track">
                    <div className="breakdown-bar bar-yellow" style={{ width: `${resultado.porcentajeAmarillo}%` }} />
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>🔴 Situaciones de Riesgo, Silenciamiento o Acoso:</span>
                    <strong>{resultado.porcentajeRojo}%</strong>
                  </div>
                  <div className="breakdown-track">
                    <div className="breakdown-bar bar-red" style={{ width: `${resultado.porcentajeRojo}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Emotional & Pedagogical Analysis */}
            <div className="result-analysis-box">
              <h4>Análisis de tu situación</h4>
              <p>{resultado.info.analisis}</p>
            </div>
          </div>

          {/* Actionable Steps for Safety & Help */}
          <div className="result-action-plan">
            <h4 className="plan-heading">
              {resultado.nivel === 'rojo' ? '🚨 Ruta urgente de apoyo y búsqueda de ayuda:' : '🌱 Pasos sugeridos para tu bienestar:'}
            </h4>
            <ul className="action-steps-list">
              {resultado.info.pasosAccion.map((paso, idx) => (
                <li key={idx} className="action-step-item">
                  <span className="step-number">{idx + 1}</span>
                  <span className="step-text">{paso}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trusted Supervisor Contact Guide (especially critical for RED, but valuable for all) */}
          <div className="trusted-supervisor-guide">
            <div className="guide-icon">🤝</div>
            <div className="guide-content">
              <h5>¿Quién es un supervisor o persona mayor de confianza?</h5>
              <p>
                Puede ser tu <strong>profesorx tutorx</strong>, el/la <strong>psicólogx o trabajadx social del colegio</strong>, 
                un/a <strong>familiar adulto</strong> (padres, tíos, abuelos) o la dirección de convivencia escolar. 
                Si sientes que en tu colegio nadie te respalda, recuerda que existen <strong>líneas de orientación gratuitas y confidenciales</strong> para niños, niñas y jóvenes en cada región.
              </p>
            </div>
          </div>

          {/* Retake & Action Buttons */}
          <div className="result-actions-footer">
            <button onClick={reiniciarEncuesta} className="btn-retake-quiz">
              🔄 Repetir Encuesta
            </button>
            <a href="#inicio" className="btn-back-home">
              Ir al inicio
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

