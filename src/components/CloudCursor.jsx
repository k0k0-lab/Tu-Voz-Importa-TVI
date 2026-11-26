import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DATOS_NUBI } from '../data/tviData';

export default function CloudCursor({ enabled = true }) {
  const canvasRef = useRef(null);
  const leafRef = useRef(null);
  const mascotWrapRef = useRef(null);
  const bubbleRef = useRef(null);

  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
  });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [leafMood, setLeafMood] = useState('happy'); // happy, talking

  const mouseRef = useRef({ x: -200, y: -200, lastX: -200, lastY: -200 });
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const idleTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);

  // Trigger Leaf mascot speech bubble with a random friendly fact
  const speakRandomFact = useCallback(() => {
    const randomFact = DATOS_NUBI[Math.floor(Math.random() * DATOS_NUBI.length)];
    setCurrentFact(randomFact);
    setShowBubble(true);
    setLeafMood('talking');

    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
      setLeafMood('happy');
    }, 6000);
  }, []);

  useEffect(() => {
    if (!enabled || isTouchDevice) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial greeting after 1.5 seconds
    const initialGreeting = setTimeout(() => {
      speakRandomFact();
    }, 1500);

    // Botanical leaf & dewdrop particle system (lightweight, no shadowBlur lag)
    const leafParticles = ['🍃', '✦', '⋆', '•'];
    const leafColors = [
      '#7ca382',
      '#a3c4a8',
      '#588157',
      '#d9e8d8',
      '#fde68a',
      '#ffffff'
    ];

    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      const now = performance.now();
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Direct GPU-accelerated DOM transform update: zero React re-render lag
      if (leafRef.current) {
        leafRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          leafRef.current.style.opacity = '1';
        }
      }

      const dx = currentX - mouseRef.current.lastX;
      const dy = currentY - mouseRef.current.lastY;
      const dist = Math.hypot(dx, dy);

      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;

      // Only trigger state update if hover state actually changes
      const target = e.target;
      const hovering = Boolean(
        target && (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.clickable'))
      );
      if (hovering !== isHoveringRef.current) {
        isHoveringRef.current = hovering;
        setIsHoveringClickable(hovering);
      }

      // Spawn lightweight floating leaves/sparkles (capped at 36 particles)
      if (dist > 4 && now - lastSpawn > 45 && particlesRef.current.length < 36) {
        lastSpawn = now;
        particlesRef.current.push({
          x: currentX + (Math.random() - 0.5) * 18,
          y: currentY + 12 + Math.random() * 6,
          vx: (Math.random() - 0.5) * 1.3,
          vy: Math.random() * 0.9 + 0.5,
          size: Math.random() * 7 + 9,
          shape: leafParticles[Math.floor(Math.random() * leafParticles.length)],
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          alpha: 0.92,
          decay: Math.random() * 0.022 + 0.018,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.06,
          sway: Math.random() * 0.05
        });
      }

      // Reset idle timer for sharing facts
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        speakRandomFact();
      }, 12000);
    };

    const handleMouseLeave = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        if (leafRef.current) leafRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (leafRef.current) leafRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Render loop for botanical particles (no shadowBlur for smooth 60/120fps)
    let isRunning = true;
    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.y * p.sway) * 0.4;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.shape, 0, 0);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(initialGreeting);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [enabled, isTouchDevice, speakRandomFact]);

  if (!enabled || isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Canvas for gentle floating leaf trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99998]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />

      {/* Leaf Mascot Pointer (positioned via direct DOM transform for zero lag) */}
      <div
        ref={leafRef}
        className="cloud-cursor-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate3d(-200px, -200px, 0)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 0.2s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Animated Cute Sage Leaf SVG */}
        <div
          ref={mascotWrapRef}
          className={`cloud-mascot ${isHoveringClickable ? 'cloud-hover' : ''}`}
          style={{
            position: 'absolute',
            top: -18,
            left: -18,
            width: 44,
            height: 44,
            transition: 'transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHoveringClickable ? 'scale(1.18) rotate(-8deg)' : 'scale(1)',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="leafGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stopColor="#d9ecda" />
                <stop offset="45%" stopColor="#93bfa0" />
                <stop offset="100%" stopColor="#588565" />
              </linearGradient>
              <linearGradient id="leafBlushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* Cute curved stem */}
            <path
              d="M 22 76 Q 14 84 10 90"
              stroke="#3b6247"
              strokeWidth="4.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Main Leaf Body */}
            <path
              d="M 82 16
                 C 52 14, 24 28, 20 58
                 C 19 66, 20 73, 24 78
                 C 33 83, 48 84, 62 76
                 C 80 65, 86 39, 82 16 Z"
              fill="url(#leafGrad)"
              stroke="#3b6247"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Subtle central leaf vein */}
            <path
              d="M 24 76 Q 48 52 75 24"
              stroke="#e9f4ea"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.7"
              fill="none"
            />
            <path
              d="M 43 58 L 39 45 M 57 44 L 54 32 M 50 51 L 64 53"
              stroke="#e9f4ea"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
              fill="none"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="38" cy="59" rx="5.2" ry="3.2" fill="url(#leafBlushGrad)" />
            <ellipse cx="67" cy="55" rx="5.2" ry="3.2" fill="url(#leafBlushGrad)" />

            {/* Eyes */}
            {leafMood === 'talking' ? (
              <>
                <path d="M 42 49 Q 45.5 44.5 49 49" stroke="#1b3022" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M 59 47 Q 62.5 42.5 66 47" stroke="#1b3022" strokeWidth="2.4" strokeLinecap="round" />
              </>
            ) : isHoveringClickable ? (
              <>
                <circle cx="45" cy="48" r="3.8" fill="#132519" />
                <circle cx="43.8" cy="46.6" r="1.4" fill="#ffffff" />
                <circle cx="63" cy="46" r="3.8" fill="#132519" />
                <circle cx="61.8" cy="44.6" r="1.4" fill="#ffffff" />
              </>
            ) : (
              <>
                <circle cx="45" cy="49" r="3.1" fill="#1b3022" />
                <circle cx="44" cy="47.8" r="1.1" fill="#ffffff" />
                <circle cx="63" cy="47" r="3.1" fill="#1b3022" />
                <circle cx="62" cy="45.8" r="1.1" fill="#ffffff" />
              </>
            )}

            {/* Smile / Mouth */}
            {leafMood === 'talking' ? (
              <path
                d="M 50 56 Q 55 62.5 59 55 Z"
                fill="#f43f5e"
                stroke="#1b3022"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            ) : isHoveringClickable ? (
              <path
                d="M 49 55 Q 54.5 62 60 54"
                stroke="#1b3022"
                strokeWidth="2.1"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M 50 55 Q 54.5 59.5 59 54"
                stroke="#1b3022"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Little Morning Dewdrop */}
            <circle cx="71" cy="29" r="3" fill="#ffffff" opacity="0.88" />
            <circle cx="70" cy="28" r="1" fill="#d9ecda" />
          </svg>
        </div>

        {/* Mascot Speech Bubble */}
        {showBubble && currentFact && (
          <div
            ref={bubbleRef}
            className="mascot-speech-bubble"
            style={{
              position: 'absolute',
              bottom: 42,
              left: 28,
              minWidth: 230,
              maxWidth: 320,
              padding: '10px 14px',
              backgroundColor: 'rgba(252, 254, 252, 0.97)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #9ab99f',
              borderRadius: '16px',
              borderBottomLeftRadius: '3px',
              boxShadow: '0 10px 25px -5px rgba(74, 124, 89, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
              color: '#1e3024',
              fontSize: '13px',
              lineHeight: '1.45',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              animation: 'popInBubble 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'none',
              transformOrigin: 'bottom left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#3b6247', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>🍃 Hojita (Mascota TVI)</span>
              <span style={{ fontSize: '10px', background: '#e5efe6', padding: '1px 6px', borderRadius: '8px', color: '#2f523a' }}>Dato amistoso</span>
            </div>
            <div>{currentFact}</div>
          </div>
        )}
      </div>
    </>
  );
}
