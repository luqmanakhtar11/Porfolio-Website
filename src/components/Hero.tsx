import { useEffect, useRef, useState, type CSSProperties } from 'react';
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

// ✏️ Hidden punchlines revealed by the flashlight.
// d = position on desktop (% of the hero), m = position on phones (% of the photo area).
// Leave out "m" to hide a line on phones. hot: true = pink highlight.
const NOTES: { text: string; d: [number, number]; m?: [number, number]; hot?: boolean }[] = [
  { text: 'Started in print. Fell for pixels.', d: [50, 15], m: [5, 6] },
  { text: '✦ You found the secret layer. Every pixel here is on purpose.', d: [70, 15], m: [30, 20], hot: true },
  { text: '5+ years. Zero boring screens.', d: [80, 23] },
  { text: '🏆 Employee of the Year, 2022', d: [56, 26], m: [52, 36] },
  { text: '6× Employee of the Month. Yes, six.', d: [80, 32] },
  { text: '100+ projects, from banking apps to brand kits', d: [55, 38], m: [5, 48] },
  { text: "Banking apps that don't feel like banking apps.", d: [76, 44] },
  { text: 'If it needs explaining, it needs redesigning.', d: [56, 50], m: [36, 62] },
  { text: 'Research first. Pixels second.', d: [82, 56], m: [5, 76] },
  { text: 'Pixel-perfect is my minimum, not my goal.', d: [58, 62] },
  { text: 'I speak fluent designer, developer and client.', d: [74, 68] },
  { text: "Your users won't notice my work. That's the point.", d: [55, 74] },
  { text: 'Graphic roots. Product brain.', d: [84, 79] },
  { text: 'Psst… hire me before your competitor does 😉', d: [64, 84], hot: true },
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
    const band = () => ({ top: 104, h: window.innerHeight * 0.46 }); // phone photo area
    const target = finePointer
      ? { x: width * 0.76, y: height * 0.48 }
      : { x: width * 0.5, y: band().top + band().h * 0.45 };
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
        const b = band();
        target.x = width * (0.5 + 0.32 * Math.sin(s * 0.45));
        target.y = b.top + b.h * (0.48 + 0.36 * Math.sin(s * 0.9));
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
        .hero-x .hx-notes { position: absolute; top: 112px; left: 0; right: 0; height: 46svh; }
        .hero-x .hx-note {
          position: absolute; left: var(--px); top: var(--py); max-width: 58%;
          white-space: normal; font: 500 11px/1.3 var(--f-mono); letter-spacing: 0.04em;
          color: #CFC8FF;
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
        .hero-x .hx-photo-wrap { position: absolute; top: 104px; left: 0; right: 0; height: 46svh; }
        .hero-x .hx-photo-feather { display: none; }
        .hero-x .hx-photo-pos { object-position: 54% 40%; }
        .hero-x .hx-photo-shade { position: absolute; inset: 0; background: linear-gradient(to top, var(--hero-bg) 0%, rgba(10,10,9,0.6) 30%, transparent 60%), linear-gradient(to bottom, var(--hero-bg) 0%, transparent 18%); }
        .hero-x .hx-content { padding-top: calc(104px + 40svh); }
        .hero-x .hx-note.hx-desk-only { display: none; }
        .hero-x .hx-note.hx-hot { color: #fff; border-color: #F06AE0; background: rgba(240,106,224,0.16); }
        @media (min-width: 768px) {
          .hero-x .hx-photo-wrap { top: 13%; bottom: 0; left: 42%; right: 0; height: auto; }
          .hero-x .hx-photo-pos { object-position: 50% 40%; }
          .hero-x .hx-photo-feather {
            display: block; position: absolute; inset: 0;
            background:
              linear-gradient(to right, var(--hero-bg) 0%, transparent 32%),
              linear-gradient(to bottom, var(--hero-bg) 0%, transparent 22%),
              linear-gradient(to left, var(--hero-bg) 0%, transparent 14%);
          }
          .hero-x .hx-photo-shade { display: none; }
          .hero-x .hx-content { padding-top: 120px; }
          .hero-x .hx-notes { top: 0; height: 100%; }
          .hero-x .hx-note { left: var(--dx); top: var(--dy); max-width: 320px; white-space: nowrap; }
          .hero-x .hx-note.hx-desk-only { display: block; }
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
          <div className="hx-photo-feather" />
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
          <div className="hx-photo-shade" />
          <div className="hx-photo-feather" />
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
        <div className="hx-notes">
          {NOTES.map((n) => (
            <span
              key={n.text}
              className={`hx-note${n.m ? '' : ' hx-desk-only'}${n.hot ? ' hx-hot' : ''}`}
              style={
                {
                  '--dx': `${n.d[0]}%`,
                  '--dy': `${n.d[1]}%`,
                  '--px': `${(n.m ?? n.d)[0]}%`,
                  '--py': `${(n.m ?? n.d)[1]}%`,
                } as CSSProperties
              }
            >
              {n.text}
            </span>
          ))}
        </div>
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
