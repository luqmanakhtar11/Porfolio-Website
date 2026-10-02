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
  { text: 'Looking good gets noticed.', serif: false, accent: false, delay: 0.04 },
  { text: 'Being clear gets used.', serif: false, accent: false, delay: 0.15 },
] as const;

const PILLARS = [
  { label: 'Clarity first', body: "If someone has to stop and think, I haven't finished designing. If it needs explaining, it needs redesigning." },
  { label: 'Familiar beats clever', body: 'People learn from patterns. I design systems, not one-off screens, so things feel familiar from the very first tap.' },
  { label: 'Small stuff, big feeling', body: "Spacing, motion, the right word on a button. Nobody notices them one by one, but together they're why something just feels good." },
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
              What I believe
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
