import React, { useState, useEffect } from 'react';
import { EXPERIENCIAS_INICIALES } from '../data/tviData';

export default function MuroAnonimo({ currentStudent }) {
  const [posts, setPosts] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('Libertad de Opinión');
  const [publicarAnonimoTotal, setPublicarAnonimoTotal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const categorias = [
    'Todas',
    'Libertad de Opinión',
    'Equidad en Equipos',
    'Burlas y Micro-acoso',
    'Red de Apoyo y Esperanza',
    'Desahogo Escolar'
  ];

  // Load from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem('tvi_student_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(EXPERIENCIAS_INICIALES);
      }
    } else {
      setPosts(EXPERIENCIAS_INICIALES);
      localStorage.setItem('tvi_student_posts', JSON.stringify(EXPERIENCIAS_INICIALES));
    }
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim() || nuevoTexto.trim().length < 10) {
      alert('Por favor escribe al menos 10 caracteres para que tu mensaje sea claro y transmita tu vivencia.');
      return;
    }

    setIsSubmitting(true);

    const newPost = {
      id: Date.now(),
      alias: publicarAnonimoTotal ? 'Compañerx Anónimx' : (currentStudent?.alias || 'Estudiante Anónimx'),
      avatar: publicarAnonimoTotal ? '🕊️' : (currentStudent?.avatar || '🎓'),
      categoria: nuevaCategoria,
      tiempo: 'Hace un momento',
      texto: nuevoTexto.trim(),
      apoyos: 1,
      abrazos: 1
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('tvi_student_posts', JSON.stringify(updatedPosts));

    setNuevoTexto('');
    setIsSubmitting(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  const handleReaction = (postId, tipo) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          [tipo]: (p[tipo] || 0) + 1
        };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem('tvi_student_posts', JSON.stringify(updated));
  };

  const postsFiltrados = filtroCategoria === 'Todas'
    ? posts
    : posts.filter((p) => p.categoria === filtroCategoria);

  return (
    <section id="muro-anonimo" className="muro-section">
      <div className="section-header-center">
        <span className="category-tag-indigo">COMUNIDAD PROTEGIDA</span>
        <h2 className="section-main-title">Muro de Voces Estudiantiles</h2>
        <p className="section-subtitle">
          Un espacio íntimo y anónimo donde expresar lo que vives en tu entorno escolar. 
          Aquí nadie menosprecia tu sentir: tu verdad es escuchada, respetada y abrazada.
        </p>
      </div>

      {/* Post Creation Box */}
      <div className="muro-create-card">
        <div className="muro-card-top-header">
          <div className="user-author-badge">
            <span className="user-author-avatar">{currentStudent?.avatar || '🎓'}</span>
            <div className="user-author-info">
              <strong>{publicarAnonimoTotal ? 'Compañerx Anónimx' : currentStudent?.alias}</strong>
              <span>Estudiante Verificadx • Publicación Anónima</span>
            </div>
          </div>
          <span className="safe-shield-tag">🛡️ Espacio Seguro</span>
        </div>

        <form onSubmit={handlePublish} className="muro-form">
          <textarea
            className="muro-textarea"
            placeholder="¿Qué has vivido en el aula, recreo o trabajos en equipo? ¿Cómo te sientes respecto a la igualdad en tu colegio? Desahógate con libertad..."
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            maxLength={350}
            rows={3}
            required
          />

          <div className="muro-form-controls">
            <div className="muro-controls-left">
              {/* Category selector */}
              <select
                className="muro-select-category"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
              >
                {categorias.filter(c => c !== 'Todas').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Anonymity toggle */}
              <label className="muro-anonymous-toggle">
                <input
                  type="checkbox"
                  checked={publicarAnonimoTotal}
                  onChange={(e) => setPublicarAnonimoTotal(e.target.checked)}
                />
                <span>Ocultar mi alias (100% Anónimo)</span>
              </label>
            </div>

            <div className="muro-controls-right">
              <span className="muro-char-count">{350 - nuevoTexto.length} caracteres</span>
              <button type="submit" disabled={isSubmitting} className="btn-publish-post">
                🕊️ Publicar en el Muro
              </button>
            </div>
          </div>

          {successToast && (
            <div className="muro-success-toast">
              ✨ Tu voz ha sido compartida en el muro. ¡Gracias por expresarte con valentía!
            </div>
          )}
        </form>
      </div>

      {/* Category Filter Chips */}
      <div className="muro-filters-bar">
        <span className="filter-label">Filtrar por:</span>
        <div className="filter-chips-list">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filter-chip-btn ${filtroCategoria === cat ? 'active-filter' : ''}`}
              onClick={() => setFiltroCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="muro-posts-grid">
        {postsFiltrados.length === 0 ? (
          <div className="muro-empty-state">
            <span>🌱</span>
            <p>Aún no hay publicaciones en esta categoría. ¡Sé la primera voz en compartir!</p>
          </div>
        ) : (
          postsFiltrados.map((post) => (
            <div key={post.id} className="muro-post-card">
              <div className="post-header">
                <div className="post-author-data">
                  <span className="post-avatar">{post.avatar}</span>
                  <div>
                    <h4 className="post-alias">{post.alias}</h4>
                    <span className="post-time">{post.tiempo}</span>
                  </div>
                </div>
                <span className="post-category-badge">{post.categoria}</span>
              </div>

              <p className="post-body-text">{post.texto}</p>

              <div className="post-footer-actions">
                <button
                  onClick={() => handleReaction(post.id, 'apoyos')}
                  className="btn-reaction"
                  title="Demuestra que le escuchas y apoyas"
                >
                  <span>🤍 Te escucho</span>
                  <strong>{post.apoyos || 0}</strong>
                </button>

                <button
                  onClick={() => handleReaction(post.id, 'abrazos')}
                  className="btn-reaction"
                  title="Manda un abrazo de apoyo virtual"
                >
                  <span>🫂 No estás solx</span>
                  <strong>{post.abrazos || 0}</strong>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="muro-disclaimer-card">
        <span>🔒 <strong>Regla de Oro de TVI:</strong> Las vivencias compartidas son sagradas. La empatía y el respaldo mutuo salvan vidas en el ámbito escolar.</span>
      </div>
    </section>
  );
}

