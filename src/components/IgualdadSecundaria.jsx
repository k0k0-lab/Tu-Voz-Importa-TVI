import React from 'react';

const RAZONES_SECUNDARIA = [
  {
    numero: '01',
    titulo: 'Construcción de identidad y autoestima',
    resumen:
      'La secundaria es una etapa decisiva en la formación personal. Cuando el aula valida todas las voces por igual, se previene que estereotipos de género limiten la confianza y el desarrollo emocional adolescente.',
  },
  {
    numero: '02',
    titulo: 'Prevención temprana de la violencia',
    resumen:
      'Desnaturalizar burlas sexistas, apodos o exclusiones en la adolescencia interrumpe la escalada hacia formas más graves de acoso escolar y promueve relaciones basadas en el respeto y el consentimiento.',
  },
  {
    numero: '03',
    titulo: 'Vocación académica sin etiquetas',
    resumen:
      'Garantizar igualdad de oportunidades permite que estudiantes de cualquier género exploren ciencias, tecnología, artes o humanidades según su talento e interés, sin presiones sociales ni roles impuestos.',
  },
  {
    numero: '04',
    titulo: 'Participación justa y clima seguro',
    resumen:
      'Un entorno equitativo equilibra el liderazgo en trabajos grupales, democratiza los espacios de recreo y mejora el bienestar psicológico, reduciendo el silenciamiento y la deserción escolar.',
  },
];

export default function IgualdadSecundaria() {
  return (
    <section id="igualdad-secundaria" className="secundaria-section">
      <div className="section-header-left">
        <span className="category-tag-petrol">FORMACIÓN Y CONVIVENCIA EN SECUNDARIA</span>
        <h2 className="section-main-title">
          ¿Por qué es necesario fomentar la igualdad en la secundaria?
        </h2>
        <p className="section-subtitle">
          En la educación secundaria, las normas de convivencia dejan una huella duradera en la forma en que
          las y los jóvenes se relacionan, participan y proyectan su futuro. Promover la igualdad de género en
          esta etapa no es solo un principio ético: es una condición indispensable para aprender en libertad y seguridad.
        </p>
      </div>

      <div className="secundaria-grid">
        {RAZONES_SECUNDARIA.map((item) => (
          <article key={item.numero} className="secundaria-card">
            <div className="secundaria-card-top">
              <span className="secundaria-num">{item.numero}</span>
              <span className="secundaria-divider" aria-hidden="true" />
            </div>
            <h3 className="secundaria-card-title">{item.titulo}</h3>
            <p className="secundaria-card-desc">{item.resumen}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

