import React from 'react';
import footerBgImg from '../assets/footer-bg.jpg';

export default function Footer() {
  return (
    <footer
      className="tvi-footer"
      style={{
        backgroundImage: `linear-gradient(180deg, #f1f5f0 0%, rgba(241, 245, 240, 0.55) 16%, rgba(226, 238, 224, 0.35) 100%), url(${footerBgImg})`,
      }}
    >
      <div className="footer-comfort-card">
        <span className="comfort-eyebrow">MENSAJE DE ACOMPAÑAMIENTO</span>
        <h3 className="comfort-heading">Tu voz y tu bienestar son prioridad</h3>
        <blockquote className="comfort-quote">
          "Si alguna vez has sentido que tu participación no tiene lugar en el aula, que tus preguntas incomodan o que debes
          guardar silencio para evitar burlas, recuerda esto con serenidad: <strong>no hay nada incorrecto en ti</strong>.
          Tu voz, tu criterio y tus metas son valiosos. Nadie tiene derecho a limitar tus capacidades por estereotipos de género.
          Mereces transitar la etapa escolar con respeto, seguridad y respaldo."
        </blockquote>
        <div className="comfort-author">— Comunidad Educativa TVI (Tu Voz Importa) 🍃</div>
      </div>

      <div className="footer-support-strip">
        <div className="support-strip-item">
          <span className="strip-num">01</span>
          <div>
            <strong>Canales de orientación</strong>
            <p>Acude a tu tutoría escolar o a las líneas confidenciales de apoyo juvenil de tu localidad.</p>
          </div>
        </div>

        <div className="support-strip-item">
          <span className="strip-num">02</span>
          <div>
            <strong>Pedir ayuda es responsabilidad</strong>
            <p>Contar con una persona adulta de confianza protege tu integridad física y emocional.</p>
          </div>
        </div>

        <div className="support-strip-item">
          <span className="strip-num">03</span>
          <div>
            <strong>Igualdad es convivencia</strong>
            <p>Construyamos instituciones educativas libres de prejuicios, discriminación y violencia.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-brand-info">
          <span className="footer-logo">🍃 TVI</span>
          <span>Tu Voz Importa • Igualdad de Género y Convivencia en Secundaria</span>
        </div>
        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#panorama">Panorama</a>
          <a href="#igualdad-secundaria">Secundaria</a>
          <a href="#encuesta">Encuesta</a>
          <a href="#conclusion">Conclusión</a>
        </div>
      </div>
    </footer>
  );
}
