import React from 'react';

export default function ConclusionSection() {
  return (
    <section id="conclusion" className="conclusion-section">
      <div className="conclusion-card">
        <div className="conclusion-header-col">
          <span className="category-tag-petrol">SÍNTESIS Y COMPROMISO</span>
          <h2 className="section-main-title">Conclusión</h2>
          <p className="conclusion-lead">
            Construir una escuela secundaria justa requiere pasar de la tolerancia pasiva a una cultura activa
            de escucha, equidad y corresponsabilidad entre estudiantes y docentes.
          </p>
        </div>

        <div className="conclusion-body-col">
          <p className="conclusion-paragraph">
            La igualdad de género y la escucha activa en el ámbito escolar son pilares inseparables para garantizar
            espacios educativos libres de miedo, burlas y discriminación. Cuando se cuestionan los prejuicios cotidianos,
            se visibilizan los canales de orientación y se valora la voz de cada estudiante sin distinción, la escuela
            deja de reproducir desigualdades y se consolida como un entorno verdaderamente formativo y seguro.
          </p>

          <div className="conclusion-pillars-row">
            <div className="conclusion-pillar-item">
              <strong>Escucha sin juicios</strong>
              <span>Validar cada duda y vivencia fortalece la confianza en el aula.</span>
            </div>
            <div className="conclusion-pillar-item">
              <strong>Detección oportuna</strong>
              <span>Reconocer señales de alerta permite actuar antes de que el daño escale.</span>
            </div>
            <div className="conclusion-pillar-item">
              <strong>Responsabilidad compartida</strong>
              <span>La convivencia respetuosa se sostiene con acciones cotidianas de toda la comunidad.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

