import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import portraitSrc from '../imports/9869a790-96ba-464a-8397-1b925d67c518.png';

/*
 * HERO — "Look behind the design"
 * The hero is dark and moody. The visitor's cursor acts as a flashlight:
 * wherever it moves, it lights up the portrait and reveals a hidden design
 * "blueprint" layer (grid, spacing notes, colour codes, live x/y readout).
 * On touch devices the light drifts by itself and jumps to wherever you tap.
 */

// ✏️ Words that rotate in the headline: "I design ___ people actually enjoy."
const WORDS = ['apps', 'brands', 'websites', 'dashboards', 'logos'];

const STATS = [
  { value: 5, suffix: '+', label: 'Years of experience' },
  { value: 100, suffix: '+', label: 'Projects delivered' },
  { value: 1, suffix: '×', label: 'Employee of the Year · 2022' },
  { value: 6, suffix: '×', label: 'Employee of the Month' },
];

// Notes scattered on the hidden blueprint layer (positions are % of the hero)
const NOTES = [
  { x: 6, y: 16, text: '12-col grid · 40px gutters' },
  { x: 40, y: 12, text: 'Bricolage Grotesque · 800' },
  { x: 74, y: 20, text: 'focal point ↓' },
  { x: 58, y: 46, text: 'contrast ratio 15.8 : 1 ✓' },
  { x: 84, y: 58, text: '#7C7CFF' },
  { x: 10, y: 86, text: 'spacing · 8pt system' },
  { x: 46, y: 80, text: 'line-height 1.02' },
];

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1300;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return (
    <>
      {n}
      <span style={{ color: '#9B8CFF' }}>{suffix}</span>
    </>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [hintGone, setHintGone] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  // Intro choreography
  useEffect(() => {
    const steps = [80, 200, 800, 1050, 1320];
    const ids = steps.map((delay, i) => setTimeout(() => setPhase(i + 1), delay));
    return () => ids.forEach(clearTimeout);
  }, []);

  // Rotating headline word
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Flashlight: follows the pointer smoothly; wanders on its own on touch screens
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouch(!finePointer);

    const rect = () => el.getBoundingClientRect();
    let { width, height } = rect();
    // start the light on the face area
    const target = finePointer ? { x: width * 0.76, y: height * 0.4 } : { x: width * 0.5, y: height * 0.22 };
    const pos = { ...target };
    let userControlled = false;
    let lastTap = 0;
    let raf = 0;
    const t0 = performance.now();

    const onResize = () => {
      ({ width, height } = rect());
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = rect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!userControlled) {
        userControlled = true;
        setHintGone(true);
      }
    };
    const onTap = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      const r = rect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      lastTap = performance.now();
      setHintGone(true);
    };

    const loop = (t: number) => {
      // On touch screens: drift in a slow figure-eight, unless the user tapped recently
      if (!finePointer && !reduce && t - lastTap > 3500) {
        const s = (t - t0) / 1000;
        target.x = width * (0.5 + 0.3 * Math.sin(s * 0.45));
        target.y = height * (0.26 + 0.16 * Math.sin(s * 0.9));
      }
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      el.style.setProperty('--mx', `${pos.x.toFixed(1)}px`);
      el.style.setProperty('--my', `${pos.y.toFixed(1)}px`);
      if (readoutRef.current) {
        readoutRef.current.textContent = `x ${Math.round(pos.x)}  y ${Math.round(pos.y)}`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onTap);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onTap);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const word = WORDS[wordIndex];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-x"
      style={{
        background: 'var(--hero-bg)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>{`
        .hero-x { --mx: 66%; --my: 38%; --r: 240px; }
        @media (max-width: 767px) { .hero-x { --r: 160px; } }
        .hero-x .hx-layer { position: absolute; inset: 0; pointer-events: none; }
        .hero-x .hx-photo { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-x .hx-dim { filter: brightness(0.38) contrast(1.05); }
        .hero-x .hx-reveal {
          -webkit-mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 45%, transparent 100%);
                  mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 45%, transparent 100%);
        }
        .hero-x .hx-ring {
          position: absolute; left: var(--mx); top: var(--my);
          width: calc(var(--r) * 1.1); height: calc(var(--r) * 1.1);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px dashed rgba(155,140,255,0.35);
          pointer-events: none;
        }
        .hero-x .hx-readout {
          position: absolute; left: var(--mx); top: var(--my);
          transform: translate(18px, 18px);
          font: 600 11px/1 var(--f-mono); letter-spacing: 0.06em;
          color: #fff; background: #7C7CFF; padding: 5px 8px; border-radius: 6px;
          white-space: pre; pointer-events: none;
        }
        .hero-x .hx-note {
          position: absolute; font: 500 11px/1.2 var(--f-mono); letter-spacing: 0.05em;
          color: #B9B0FF; white-space: nowrap;
          padding: 4px 8px; border: 1px solid rgba(155,140,255,0.45); border-radius: 6px;
          background: rgba(17,16,16,0.55);
        }
        .hero-x .hx-line { display: block; overflow: hidden; padding-bottom: 0.08em; }
        @keyframes hxWordIn {
          from { transform: translateY(105%); opacity: 0; filter: blur(6px); }
          to   { transform: none; opacity: 1; filter: none; }
        }
        .hero-x .hx-word {
          display: inline-block;
          background: linear-gradient(100deg, #8B8BFF 0%, #B57BFF 45%, #F06AE0 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: hxWordIn 0.6s var(--ease2) both;
        }
        @keyframes hxPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
        .hero-x .hx-dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; animation: hxPulse 2s infinite; flex-shrink: 0; }
        @keyframes hxHint { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .hero-x .hx-hint { animation: hxHint 2.4s ease-in-out infinite; }
        .hero-x .hx-photo-wrap { position: absolute; top: 0; left: 0; right: 0; height: 66svh; }
        .hero-x .hx-photo-pos { object-position: 54% 30%; }
        .hero-x .hx-photo-shade { position: absolute; inset: 0; background: linear-gradient(to top, var(--hero-bg) 0%, rgba(10,10,9,0.7) 30%, transparent 60%); }
        .hero-x .hx-content { padding-top: 46svh; }
        .hero-x .hx-note:not(.hx-egg) { display: none; }
        .hero-x .hx-egg { left: 6%; top: 9%; white-space: normal; max-width: 260px; }
        @media (min-width: 768px) {
          .hero-x .hx-photo-wrap { height: 100%; }
          .hero-x .hx-photo-pos { object-position: 30% 30%; }
          .hero-x .hx-photo-shade { display: none; }
          .hero-x .hx-content { padding-top: 120px; }
          .hero-x .hx-note:not(.hx-egg) { display: block; }
          .hero-x .hx-egg { left: 62%; top: 70%; white-space: nowrap; max-width: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-x .hx-word, .hero-x .hx-dot, .hero-x .hx-hint { animation: none; }
        }
      `}</style>

      {/* ── Layer 1: dimmed portrait (what you see by default) ── */}
      <div
        className="hx-layer"
        style={{ opacity: phase >= 3 ? 1 : 0, transition: 'opacity 1.4s var(--ease)' }}
      >
        <div className="hx-photo-wrap">
          <img src={portraitSrc} alt="" aria-hidden="true" className="hx-photo hx-photo-pos hx-dim" />
          <div className="hx-photo-shade" />
        </div>
      </div>

      {/* ── Layer 2: revealed by the flashlight — bright portrait + blueprint ── */}
      <div
        className="hx-layer hx-reveal"
        style={{ opacity: phase >= 3 ? 1 : 0, transition: 'opacity 1.4s var(--ease)' }}
        aria-hidden="true"
      >
        <div className="hx-photo-wrap">
          <img src={portraitSrc} alt="" className="hx-photo hx-photo-pos" />
        </div>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="hx-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="rgba(155,140,255,0.28)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hx-grid)" />
          {/* column guides */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={`${(100 / 12) * i + 0.6}%`}
              y="0"
              width={`${100 / 12 - 1.2}%`}
              height="100%"
              fill="rgba(124,124,255,0.05)"
            />
          ))}
        </svg>
        {NOTES.map((n) => (
          <span key={n.text} className="hx-note" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {n.text}
          </span>
        ))}
        <span className="hx-note hx-egg" style={{ color: '#fff', borderColor: '#F06AE0' }}>
          ✦ You found the blueprint. Every pixel here is on purpose.
        </span>
      </div>

      {/* light ring + live coordinates */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: phase >= 4 ? 1 : 0, transition: 'opacity 0.8s' }}>
        <div className="hx-ring" />
        <span className="hx-readout" ref={readoutRef} />
      </div>

      {/* ── Legibility shade behind the text ── */}
      <div
        className="hx-layer hidden md:block"
        style={{ background: 'linear-gradient(90deg, var(--hero-bg) 0%, rgba(10,10,9,0.85) 28%, rgba(10,10,9,0.15) 62%, transparent 80%)' }}
      />
      {/* ── Content ── */}
      <div
        className="hx-content md:justify-center"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '40px',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Who I am — status chip */}
        <div
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            marginBottom: '28px',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.6s var(--ease2), transform 0.6s var(--ease2)',
          }}
        >
          <span className="hx-dot" />
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(247,246,241,0.85)', fontFamily: 'var(--f-sans)' }}>
            {"Hi, I'm Luqman, a UI/UX & graphic designer"}
          </span>
        </div>

        {/* Headline */}
        <h1
          aria-label={`I design ${word} people actually enjoy.`}
          style={{
            fontSize: 'clamp(44px, 6vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: '28px',
            maxWidth: '15ch',
            color: 'var(--hero-fg)',
          }}
        >
          <span className="hx-line" aria-hidden="true">
            <span className={`line-inner ${phase >= 2 ? 'a' : ''}`} style={{ animationDelay: '0.06s', fontFamily: 'var(--f-sans)', fontWeight: 800 }}>
              I design
            </span>
          </span>
          <span className="hx-line" aria-hidden="true">
            <span className={`line-inner ${phase >= 2 ? 'a' : ''}`} style={{ animationDelay: '0.16s', fontFamily: 'var(--f-sans)', fontWeight: 800 }}>
              <span key={word} className="hx-word">{word}</span>
            </span>
          </span>
          <span className="hx-line" aria-hidden="true">
            <span
              className={`line-inner ${phase >= 2 ? 'a' : ''}`}
              style={{ animationDelay: '0.26s', fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}
            >
              people actually enjoy.
            </span>
          </span>
        </h1>

        {/* Sub line */}
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'rgba(247,246,241,0.62)',
            fontFamily: 'var(--f-sans)',
            maxWidth: '46ch',
            marginBottom: '32px',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'none' : 'translateY(12px)',
            transition: 'opacity 0.65s var(--ease2), transform 0.65s var(--ease2)',
          }}
        >
          Product, UI/UX and brand design for people who sweat the small stuff, just like me.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-3"
          style={{
            pointerEvents: 'auto',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'none' : 'translateY(14px)',
            transition: 'opacity 0.65s 0.1s var(--ease2), transform 0.65s 0.1s var(--ease2)',
          }}
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 26px',
              borderRadius: '12px',
              background: 'var(--hero-fg)',
              color: 'var(--hero-bg)',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--f-sans)',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.2s var(--ease), opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            See my work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/resume')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 22px',
              borderRadius: '12px',
              border: '1px solid rgba(247,246,241,0.18)',
              color: 'rgba(247,246,241,0.75)',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--f-sans)',
              letterSpacing: '-0.01em',
              background: 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(247,246,241,0.45)';
              e.currentTarget.style.color = 'var(--hero-fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(247,246,241,0.18)';
              e.currentTarget.style.color = 'rgba(247,246,241,0.75)';
            }}
          >
            Resume ↗
          </button>
        </div>

        {/* Interaction hint */}
        <div
          className="hx-hint"
          style={{
            marginTop: '28px',
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontFamily: 'var(--f-mono)',
            letterSpacing: '0.06em',
            color: '#B9B0FF',
            opacity: phase >= 4 && !hintGone ? 1 : 0,
            transition: 'opacity 0.6s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          {isTouch ? 'Tap around to peek behind the design' : 'Move your cursor around. There’s more here than it looks.'}
        </div>
      </div>

      {/* ── Stats strip (numbers count up) ── */}
      <div
        style={{
          borderTop: '1px solid rgba(247,246,241,0.08)',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          padding: '24px 40px',
          position: 'relative',
          zIndex: 2,
          background: 'linear-gradient(to top, var(--hero-bg) 40%, transparent)',
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.6s var(--ease2), transform 0.6s var(--ease2)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={i % 2 === 1 ? 'border-l pl-6' : i > 0 ? 'md:border-l md:pl-6' : ''}
              style={{ borderColor: 'rgba(247,246,241,0.08)' }}
            >
              <div style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, fontFamily: 'var(--f-sans)', color: 'var(--hero-fg)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                <CountUp value={s.value} suffix={s.suffix} start={phase >= 5} />
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(247,246,241,0.45)', fontFamily: 'var(--f-sans)', marginTop: '5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
