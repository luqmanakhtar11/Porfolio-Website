import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import portraitSrc from '../imports/9869a790-96ba-464a-8397-1b925d67c518.png';

const STATS = [
  { num: '5+', label: 'Years of experience' },
  { num: '50+', label: 'Projects delivered' },
  { num: '1×', label: 'Employee of the Year- 2022' },
  { num: '6×', label: 'Employee of the Month' },
];

export default function Hero() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [80, 200, 800, 1050, 1320];
    const ids = steps.map((delay, i) => setTimeout(() => setPhase(i + 1), delay));
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      style={{
        background: 'var(--hero-bg)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Two-column body ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          padding: '0 40px',
          paddingTop: '96px',
          paddingBottom: '40px',
          gap: '0',
          position: 'relative',
          zIndex: 1,
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* LEFT — text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '40px',
          }}
        >


          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(100px, 6.5vw, 100px)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              marginBottom: '36px',
            }}
          >
            {[
              { text: 'Design That Earns', serif: false },
              { text: 'trust.', serif: true },
            ].map((line, i) => (
              <span key={i} className="line-mask" style={{ display: 'block' }}>
                <span
                  className={`line-inner ${phase >= 2 ? 'a' : ''}`}
                  style={{
                    animationDelay: `${0.06 + i * 0.11}s`,
                    fontFamily: line.serif ? 'var(--f-serif)' : 'var(--f-sans)',
                    fontStyle: line.serif ? 'italic' : 'normal',
                    fontWeight: line.serif ? 400 : 800,
                    color: 'var(--hero-fg)',
                  }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          {/* CTAs */}
          <div
            className="flex items-center gap-3"
            style={{
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
                padding: '13px 26px',
                borderRadius: '10px',
                background: 'var(--hero-fg)',
                color: 'var(--hero-bg)',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: 'var(--f-sans)',
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                border: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button
              onClick={() => navigate('/resume')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '10px',
                border: '1px solid rgba(247,246,241,0.15)',
                color: 'rgba(247,246,241,0.65)',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--f-sans)',
                letterSpacing: '-0.01em',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(247,246,241,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--hero-fg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(247,246,241,0.15)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(247,246,241,0.65)';
              }}
            >
              Resume ↗
            </button>
          </div>
        </div>

        {/* RIGHT — headshot */}
        <div
          style={{
            position: 'relative',
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 1.2s var(--ease)',
            marginRight: '-40px',
            /* Push image slightly toward center */
            transform: 'translateX(-6%)',
          }}
          className="hidden md:block"
        >
          <img
            src={portraitSrc}
            alt="M. Luqman Akhtar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              /* Shift face crop slightly toward center */
              objectPosition: '38% center',
              display: 'block',
            }}
          />
          {/* Left feather — blends into dark left side */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--hero-bg) 0%, rgba(10,10,9,0.4) 18%, transparent 40%)',
            pointerEvents: 'none',
          }} />
          {/* Bottom feather */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--hero-bg) 0%, transparent 30%)',
            pointerEvents: 'none',
          }} />
          {/* Top feather */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, var(--hero-bg) 0%, transparent 18%)',
            pointerEvents: 'none',
          }} />
          {/* Right feather — prevents hard crop appearance */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to left, var(--hero-bg) 0%, rgba(10,10,9,0.6) 12%, transparent 30%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Stats strip */}
      <div
        style={{
          borderTop: '1px solid rgba(247,246,241,0.08)',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          padding: '24px 40px',
          position: 'relative',
          zIndex: 1,
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.6s var(--ease2), transform 0.6s var(--ease2)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                borderLeft: i > 0 ? '1px solid rgba(247,246,241,0.08)' : 'none',
                paddingLeft: i > 0 ? '24px' : '0',
              }}
            >
              <div style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, fontFamily: 'var(--f-sans)', color: 'var(--hero-fg)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(247,246,241,0.4)', fontFamily: 'var(--f-sans)', marginTop: '5px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
