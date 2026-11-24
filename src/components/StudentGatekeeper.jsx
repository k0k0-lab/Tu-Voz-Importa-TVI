import React, { useState } from 'react';
import { FILTRO_VALIDACION_ESTUDIANTE } from '../data/tviData';

export default function StudentGatekeeper({ onAuthenticated }) {
  const [tab, setTab] = useState('registro'); // 'registro' | 'login'
  
  // Registration form state
  const [nivel, setNivel] = useState('');
  const [respuestaSituacion, setRespuestaSituacion] = useState('');
  const [respuestaIntencion, setRespuestaIntencion] = useState('');
  const [compromisoAceptado, setCompromisoAceptado] = useState(false);
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  
  // Login form state
  const [loginAlias, setLoginAlias] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status & validation states
  const [errorMessage, setErrorMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const avatares = ['🎓', '🎨', '🔬', '📚', '🌟', '🛡️', '🌱', '🕊️'];
  const [selectedAvatar, setSelectedAvatar] = useState('🎓');

  // Handle registration & strict student verification
  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Check level selection
    if (!nivel) {
      setErrorMessage('Por favor selecciona tu nivel académico actual.');
      return;
    }

    // Filter: Adults / external tutors are NOT allowed
    if (nivel === 'adulto_externo') {
      setIsBlocked(true);
      return;
    }

    // Check contextual questions
    if (!respuestaSituacion || !respuestaIntencion) {
      setErrorMessage('Por favor responde las preguntas de contexto estudiantil.');
      return;
    }

    const situacionValida = FILTRO_VALIDACION_ESTUDIANTE.preguntaSituacional.opciones.find(
      (o) => o.id === respuestaSituacion
    )?.esEstudiante;

    const intencionValida = FILTRO_VALIDACION_ESTUDIANTE.preguntaIntencion.opciones.find(
      (o) => o.id === respuestaIntencion
    )?.esValido;

    if (!situacionValida || !intencionValida) {
      // Detected invalidating or non-student intent
      setIsBlocked(true);
      return;
    }

    if (!compromisoAceptado) {
      setErrorMessage('Debes aceptar el compromiso de respeto mutuo y confidencialidad entre estudiantes.');
      return;
    }

    if (!alias.trim() || alias.trim().length < 3) {
      setErrorMessage('Ingresa un alias o apodo seguro de al menos 3 caracteres.');
      return;
    }

    if (!password.trim() || password.trim().length < 4) {
      setErrorMessage('Ingresa una clave de al menos 4 caracteres para tu cuenta.');
      return;
    }

    // Check if alias already exists
    const existingUsers = JSON.parse(localStorage.getItem('tvi_registered_students') || '[]');
    if (existingUsers.some((u) => u.alias.toLowerCase() === alias.trim().toLowerCase())) {
      setErrorMessage('Este alias ya está en uso. Por favor elige otro o inicia sesión.');
      return;
    }

    // Save student
    const newStudent = {
      alias: alias.trim(),
      password: password.trim(),
      nivel,
      avatar: selectedAvatar,
      fechaRegistro: new Date().toLocaleDateString('es-ES'),
    };

    existingUsers.push(newStudent);
    localStorage.setItem('tvi_registered_students', JSON.stringify(existingUsers));
    localStorage.setItem('tvi_student_session', JSON.stringify(newStudent));

    onAuthenticated(newStudent);
  };

  // Handle Login for returning verified students
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginAlias.trim() || !loginPassword.trim()) {
      setErrorMessage('Ingresa tu alias y clave.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('tvi_registered_students') || '[]');
    const student = existingUsers.find(
      (u) =>
        u.alias.toLowerCase() === loginAlias.trim().toLowerCase() &&
        u.password === loginPassword.trim()
    );

    if (!student) {
      setErrorMessage('Alias o clave incorrectos. Si aún no te has validado como estudiante, regístrate en la pestaña anterior.');
      return;
    }

    localStorage.setItem('tvi_student_session', JSON.stringify(student));
    onAuthenticated(student);
  };

  // Screen for blocked non-students / invalidators
  if (isBlocked) {
    return (
      <div className="gatekeeper-overlay">
        <div className="gatekeeper-blocked-card">
          <div className="blocked-shield-icon">🛑🛡️</div>
          <h2 className="blocked-title">Espacio Restringido Exclusivo para Estudiantes</h2>
          <p className="blocked-text">
            TVI (Tu Voz Importa) es un <strong>santuario protegido de confidencialidad y escucha activa</strong> diseñado exclusivamente por y para estudiantes de secundaria y educación superior.
          </p>
          <div className="blocked-note">
            <p>
              Para resguardar la salud mental de los jóvenes y prevenir que adultos o personas ajenas menosprecien o juzguen el sufrimiento estudiantil, el acceso a esta plataforma queda restringido.
            </p>
          </div>
          <button
            onClick={() => {
              setIsBlocked(false);
              setTab('registro');
              setNivel('');
              setRespuestaSituacion('');
              setRespuestaIntencion('');
              setCompromisoAceptado(false);
            }}
            className="btn-retry-gatekeeper"
          >
            ← Volver a intentar verificación honesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gatekeeper-overlay">
      <div className="gatekeeper-modal-card">
        {/* Brand Banner */}
        <div className="gatekeeper-header">
          <div className="gate-brand-row">
            <div className="gate-cloud-badge">☁️✨</div>
            <div>
              <h1 className="gate-app-name">TVI (Tu Voz Importa)</h1>
              <p className="gate-subtitle">Comunidad Segura de Igualdad y Convivencia Escolar</p>
            </div>
          </div>
          <div className="gate-security-pill">
            <span className="security-icon">🔒</span>
            <span>Acceso Estudiantil Verificado (Secundaria en adelante)</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="gate-tabs-row">
          <button
            type="button"
            className={`gate-tab-btn ${tab === 'registro' ? 'active-gate-tab' : ''}`}
            onClick={() => { setTab('registro'); setErrorMessage(''); }}
          >
            📝 Crear Cuenta / Validación
          </button>
          <button
            type="button"
            className={`gate-tab-btn ${tab === 'login' ? 'active-gate-tab' : ''}`}
            onClick={() => { setTab('login'); setErrorMessage(''); }}
          >
            🔑 Ya soy Estudiante Verificadx
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="gate-error-banner">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        {/* Tab 1: Registration with Strict Student Verification */}
        {tab === 'registro' ? (
          <form onSubmit={handleRegister} className="gate-form-flow">
            <div className="gate-intro-notice">
              <p>
                <strong>Protegemos tu voz:</strong> Este filtro garantiza que ningún adulto o infiltrado entre a menospreciar o burlarse del sufrimiento ajeno. Por favor responde con seriedad y honestidad.
              </p>
            </div>

            {/* 1. Nivel académico */}
            <div className="gate-field-group">
              <label className="gate-field-label">
                1. ¿Cuál es tu nivel académico actual? <span className="req">*</span>
              </label>
              <div className="gate-radio-options">
                {FILTRO_VALIDACION_ESTUDIANTE.nivelesValidos.map((n) => (
                  <label key={n.id} className={`gate-radio-card ${nivel === n.id ? 'radio-selected' : ''}`}>
                    <input
                      type="radio"
                      name="nivel"
                      value={n.id}
                      checked={nivel === n.id}
                      onChange={(e) => setNivel(e.target.value)}
                    />
                    <span className="radio-label-text">{n.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Pregunta contextual de convivencia escolar */}
            <div className="gate-field-group">
              <label className="gate-field-label">
                2. {FILTRO_VALIDACION_ESTUDIANTE.preguntaSituacional.pregunta} <span className="req">*</span>
              </label>
              <div className="gate-radio-options">
                {FILTRO_VALIDACION_ESTUDIANTE.preguntaSituacional.opciones.map((op) => (
                  <label key={op.id} className={`gate-radio-card ${respuestaSituacion === op.id ? 'radio-selected' : ''}`}>
                    <input
                      type="radio"
                      name="situacion"
                      value={op.id}
                      checked={respuestaSituacion === op.id}
                      onChange={(e) => setRespuestaSituacion(e.target.value)}
                    />
                    <span className="radio-label-text">{op.texto}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Pregunta de Intención */}
            <div className="gate-field-group">
              <label className="gate-field-label">
                3. {FILTRO_VALIDACION_ESTUDIANTE.preguntaIntencion.pregunta} <span className="req">*</span>
              </label>
              <div className="gate-radio-options">
                {FILTRO_VALIDACION_ESTUDIANTE.preguntaIntencion.opciones.map((op) => (
                  <label key={op.id} className={`gate-radio-card ${respuestaIntencion === op.id ? 'radio-selected' : ''}`}>
                    <input
                      type="radio"
                      name="intencion"
                      value={op.id}
                      checked={respuestaIntencion === op.id}
                      onChange={(e) => setRespuestaIntencion(e.target.value)}
                    />
                    <span className="radio-label-text">{op.texto}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Alias y Clave */}
            <div className="gate-credentials-grid">
              <div className="gate-input-box">
                <label className="gate-field-label">Tu Alias o Pseudónimo Anónimo <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="Ej: FénixEscolar, Azul3ro, AlmaLibre"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  maxLength={24}
                  className="gate-text-input"
                  required
                />
                <span className="gate-hint">Para que nadie sepa tu nombre real y tu privacidad sea 100% segura.</span>
              </div>

              <div className="gate-input-box">
                <label className="gate-field-label">Elige una Clave Personal <span className="req">*</span></label>
                <input
                  type="password"
                  placeholder="Mínimo 4 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="gate-text-input"
                  required
                />
                <span className="gate-hint">Para volver a entrar a tu cuenta cuando quieras.</span>
              </div>
            </div>

            {/* Avatar Selector */}
            <div className="gate-field-group">
              <label className="gate-field-label">Elige un Avatar Estudiantil:</label>
              <div className="gate-avatars-row">
                {avatares.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`gate-avatar-btn ${selectedAvatar === av ? 'avatar-active' : ''}`}
                    onClick={() => setSelectedAvatar(av)}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Compromiso Solemne */}
            <div className="gate-compromiso-box">
              <label className="compromiso-check-label">
                <input
                  type="checkbox"
                  checked={compromisoAceptado}
                  onChange={(e) => setCompromisoAceptado(e.target.checked)}
                />
                <span>
                  <strong>Compromiso Estudiantil TVI:</strong> Prometo utilizar este espacio con respeto mutuo. Jamás me burlaré de las vivencias o el dolor de un(a) compañerx y guardaré la confidencialidad de este santuario.
                </span>
              </label>
            </div>

            <button type="submit" className="btn-gate-submit">
              ✨ Validar y Entrar al Espacio Seguro TVI
            </button>
          </form>
        ) : (
          /* Tab 2: Login for verified students */
          <form onSubmit={handleLogin} className="gate-form-flow">
            <div className="gate-intro-notice">
              <p>
                ¡Hola de nuevo! Ingresa con tu <strong>Alias Anónimo</strong> y tu clave para continuar explorando la app y el muro de experiencias.
              </p>
            </div>

            <div className="gate-input-box">
              <label className="gate-field-label">Tu Alias Anónimo:</label>
              <input
                type="text"
                placeholder="Ingresa el alias con el que te registraste"
                value={loginAlias}
                onChange={(e) => setLoginAlias(e.target.value)}
                className="gate-text-input"
                required
              />
            </div>

            <div className="gate-input-box">
              <label className="gate-field-label">Tu Clave Personal:</label>
              <input
                type="password"
                placeholder="Ingresa tu clave"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="gate-text-input"
                required
              />
            </div>

            <button type="submit" className="btn-gate-submit">
              🔓 Iniciar Sesión como Estudiante
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
