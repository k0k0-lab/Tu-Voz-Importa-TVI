import React, { useEffect, useState } from 'react';
import heroStudentsImg from '../assets/hero-students.jpg';

export default function Hero({ onStartSurvey, onMeetNubi }) {
  const [scrollFade, setScrollFade] = useState(0);

  useEffect(() => {
    let rafId = null;

    const updateScrollFade = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(1, Math.max(0, scrollY / 460));
      setScrollFade(progress);
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollFade);
      }
    };

    updateScrollFade();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const imageOpacity = Math.max(0, 1 - scrollFade * 1.15);
  const translateY = scrollFade * -24;
  const blurPx = scrollFade * 5;
  const scale = 1 + scrollFade * 0.03;

  return (
    <section id="inicio" className="hero-section">
      {/* Formal Split Hero: Editorial Copy Left + Fading Header Image Right */}
      <div className="hero-split-grid">
        <div className="hero-copy-col">
          <div className="hero-eyebrow">
            INICIATIVA ESTUDIANTIL • IGUALDAD Y CONVIVENCIA ESCOLAR
          </div>

          <h1 className="hero-title">
            Hagamos de la escuela un{' '}
            <span className="hero-accent-highlight">#espacioseguro</span>{' '}
            para todxs.
          </h1>

          <p className="hero-description">
            Queremos <strong>romper el silencio</strong> alrededor de la desigualdad de género,
            los estereotipos en el aula y el acoso escolar. Cuando cada estudiante es escuchado con respeto,
            la escuela se convierte en un lugar digno para aprender y crecer.
          </p>

          <p className="hero-action-prompt">
            Responde nuestra encuesta breve para evaluar tu entorno escolar o comparte tu vivencia de forma anónima.
          </p>

          <div className="hero-cta-group">
            <a href="#encuesta" onClick={onStartSurvey} className="btn-formal-outline">
              Haz la encuesta
            </a>

            <a href="#muro-anonimo" className="btn-formal-primary">
              Muro de Voces
            </a>

            <button onClick={onMeetNubi} className="btn-formal-ghost">
              <span>🍃</span>
              <span>Asistente Hojita</span>
            </button>
          </div>
        </div>

        <div
          className="hero-visual-col"
          style={{
            opacity: imageOpacity,
            transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
            filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
          }}
        >
          <div className="hero-image-frame">
            <img
              src={heroStudentsImg}
              alt="Estudiantes leyendo y aprendiendo juntos en biblioteca escolar"
              className="hero-header-image"
            />
            <div className="hero-header-sage-wash" />
          </div>
        </div>
      </div>

      {/* Formal Horizontal Quick Pillars */}
      <div className="hero-quick-cards">
        <div className="quick-card">
          <span className="qc-num">01</span>
          <div className="qc-text">
            <strong>Escucha Activa</strong>
            <span>Participar en clase sin temor a burlas ni prejuicios</span>
          </div>
        </div>

        <div className="quick-card">
          <span className="qc-num">02</span>
          <div className="qc-text">
            <strong>Muro Anónimo</strong>
            <span>Espacio confidencial para expresar experiencias reales</span>
          </div>
        </div>

        <div className="quick-card">
          <span className="qc-num">03</span>
          <div className="qc-text">
            <strong>Entorno Protegido</strong>
            <span>Acceso verificado exclusivo para comunidad estudiantil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
