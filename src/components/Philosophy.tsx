import { useRef, useState, useEffect } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const LINES = [
  { text: 'Good design gets attention.', serif: false, accent: false, delay: 0.04 },
  { text: 'Exceptional design earns trust.', serif: false, accent: false, delay: 0.15 },
] as const;

const PILLARS = [
  { label: 'Clarity first', body: 'Every decision should reduce cognitive load, not add to it. If it needs explaining, it needs redesigning.' },
  { label: 'Consistency builds trust', body: 'Users build mental models from patterns. I design systems, not screens — so every interaction feels familiar.' },
  { label: 'Details are not details', body: 'The micro-interactions, the spacing, the type choices — they accumulate into how something makes you feel.' },
];

function PhilosophyLine({ text, serif, accent, delay }: typeof LINES[number]) {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="line-mask">
      <span
        className={`line-inner ${visible ? 'a' : ''}`}
        style={{
          animationDelay: `${delay}s`,
          fontFamily: serif ? 'var(--f-serif)' : 'var(--f-sans)',
          fontStyle: serif ? 'italic' : 'normal',
          fontWeight: serif ? 400 : 700,
          color: accent ? 'var(--accent)' : 'var(--fg)',
          display: 'block',
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Pillar({ label, body, index }: { label: string; body: string; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'v' : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--f-sans)', color: 'var(--fg)', marginBottom: '6px', letterSpacing: '-0.01em' }}>
        {label}
      </div>
      <p style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.75 }}>
        {body}
      </p>
    </div>
  );
}

export default function Philosophy() {
  const { ref, visible } = useReveal();

  return (
    <section style={{ background: 'var(--surface2)', padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <p ref={ref} className={`reveal ${visible ? 'v' : ''}`}
              style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
              Design Philosophy
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.035em' }}>
              {LINES.map((l, i) => <PhilosophyLine key={i} {...l} />)}
            </h2>
          </div>

          <div className="md:pt-24 flex flex-col gap-7">
            {PILLARS.map((p, i) => <Pillar key={p.label} label={p.label} body={p.body} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
