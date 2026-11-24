import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DATOS_NUBI } from '../data/tviData';

export default function CloudCursor({ enabled = true }) {
  const canvasRef = useRef(null);
  const cloudRef = useRef(null);
  const bubbleRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [cloudMood, setCloudMood] = useState('happy'); // happy, excited, talking, listening

  const mouseRef = useRef({ x: -200, y: -200, lastX: -200, lastY: -200, speed: 0 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const idleTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);
  const isTouchDevice = useRef(false);

  // Trigger Nubi speech bubble with a random fact
  const speakRandomFact = useCallback(() => {
    const randomFact = DATOS_NUBI[Math.floor(Math.random() * DATOS_NUBI.length)];
    setCurrentFact(randomFact);
    setShowBubble(true);
    setCloudMood('talking');

    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setShowBubble(false);
      setCloudMood('happy');
    }, 6000);
  }, []);

  useEffect(() => {
    // Detect touch-only devices to avoid intrusive desktop cursor on touchscreens
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      isTouchDevice.current = true;
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

    // Star particle system with gentle gravity and fading
    const starShapes = ['★', '✦', '⋆', '•'];
    const starColors = [
      '#facc15', // yellow
      '#fbbf24', // amber
      '#38bdf8', // light blue
      '#c084fc', // soft purple
      '#ffffff', // bright white
      '#fed7aa'  // warm peach
    ];

    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      const now = performance.now();
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dx = currentX - mouseRef.current.lastX;
      const dy = currentY - mouseRef.current.lastY;
      const dist = Math.hypot(dx, dy);

      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;
      mouseRef.current.speed = dist;

      setMousePos({ x: currentX, y: currentY });
      setIsVisible(true);

      // Check if hovering clickable element
      const target = e.target;
      if (target && (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.clickable'))) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }

      // Spawn falling stars smoothly if moving and throttled (capped at 55 total particles for 60fps)
      if (dist > 3 && now - lastSpawn > 35 && particlesRef.current.length < 55) {
        lastSpawn = now;
        const count = dist > 20 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: currentX + (Math.random() - 0.5) * 22,
            y: currentY + 14 + Math.random() * 8, // spawn just underneath the cloud
            vx: (Math.random() - 0.5) * 1.6,
            vy: Math.random() * 1.2 + 0.6, // gentle downward drift
            size: Math.random() * 10 + 9,
            shape: starShapes[Math.floor(Math.random() * starShapes.length)],
            color: starColors[Math.floor(Math.random() * starColors.length)],
            alpha: 1,
            decay: Math.random() * 0.022 + 0.016,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.08,
            sway: Math.random() * 0.04
          });
        }
      }

      // Reset idle timer for sharing facts
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        speakRandomFact();
      }, 12000); // speaks every 12s of idle
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Render loop for stars (hardware accelerated canvas)
    let isRunning = true;
    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.y * p.sway) * 0.3;
        p.y += p.vy;
        p.vy += 0.04; // subtle gravity
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0 || p.y > window.innerHeight) {
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
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
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
  }, [speakRandomFact]);

  if (!enabled || isTouchDevice.current) {
    return null;
  }

  return (
    <>
      {/* Canvas for falling stars trail */}
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

      {/* Cloud Mascot Pointer */}
      <div
        ref={cloudRef}
        className="cloud-cursor-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Animated Cute Cloud SVG */}
        <div
          className={`cloud-mascot ${isHoveringClickable ? 'cloud-hover' : ''}`}
          style={{
            position: 'absolute',
            top: -18,
            left: -18,
            width: 48,
            height: 48,
            filter: 'drop-shadow(0 4px 10px rgba(99, 102, 241, 0.35))',
            transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHoveringClickable ? 'scale(1.22) rotate(-6deg)' : 'scale(1)',
          }}
        >
          <svg
            viewBox="0 0 100 70"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#f0f9ff" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
              <linearGradient id="blushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.4" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Cloud Body */}
            <path
              d="M 28 58 
                 C 16 58 8 50 8 38 
                 C 8 28 15 20 25 18 
                 C 29 9 40 4 52 4 
                 C 66 4 77 12 80 23 
                 C 89 25 96 32 96 42 
                 C 96 52 88 58 76 58 
                 Z"
              fill="url(#cloudGrad)"
              stroke="#60a5fa"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="url(#softGlow)"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="28" cy="40" rx="5.5" ry="3.5" fill="url(#blushGrad)" />
            <ellipse cx="68" cy="40" rx="5.5" ry="3.5" fill="url(#blushGrad)" />

            {/* Eyes */}
            {cloudMood === 'talking' ? (
              // Happy squinting eyes
              <>
                <path d="M 34 32 Q 38 27 42 32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 54 32 Q 58 27 62 32" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : isHoveringClickable ? (
              // Starry / big excited eyes
              <>
                <circle cx="38" cy="31" r="4" fill="#0f172a" />
                <circle cx="36.5" cy="29.5" r="1.5" fill="#ffffff" />
                <circle cx="58" cy="31" r="4" fill="#0f172a" />
                <circle cx="56.5" cy="29.5" r="1.5" fill="#ffffff" />
              </>
            ) : (
              // Friendly calm eyes
              <>
                <circle cx="38" cy="32" r="3.2" fill="#1e293b" />
                <circle cx="37" cy="30.8" r="1.2" fill="#ffffff" />
                <circle cx="58" cy="32" r="3.2" fill="#1e293b" />
                <circle cx="57" cy="30.8" r="1.2" fill="#ffffff" />
              </>
            )}

            {/* Smile / Mouth */}
            {cloudMood === 'talking' ? (
              <path
                d="M 44 38 Q 48 45 52 38 Z"
                fill="#f43f5e"
                stroke="#1e293b"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : isHoveringClickable ? (
              <path
                d="M 43 38 Q 48 46 53 38"
                stroke="#1e293b"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M 44 38 Q 48 43 52 38"
                stroke="#1e293b"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Mini Star Sparkle on head */}
            <path
              d="M 68 12 L 70 8 L 72 12 L 76 14 L 72 16 L 70 20 L 68 16 L 64 14 Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="0.8"
            />
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
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #93c5fd',
              borderRadius: '16px',
              borderBottomLeftRadius: '3px',
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              color: '#1e293b',
              fontSize: '13px',
              lineHeight: '1.45',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              animation: 'popInBubble 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'none',
              transformOrigin: 'bottom left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#2563eb', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>☁️ Nubi (Mascota TVI)</span>
              <span style={{ fontSize: '10px', background: '#dbeafe', padding: '1px 6px', borderRadius: '8px' }}>Dato amistoso</span>
            </div>
            <div>{currentFact}</div>
          </div>
        )}
      </div>
    </>
  );
}

