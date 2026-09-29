import { useRef, useState, useEffect } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const caps = [
  {
    label: 'Product & UX',
    desc: 'End-to-end product design: from research and strategy to detailed interaction design and handoff.',
    skills: ['UX Research', 'User Flows', 'Information Architecture', 'Wireframing', 'Prototyping', 'Usability Testing', 'Interaction Design', 'Design Systems'],
  },
  {
    label: 'UI & Visual Design',
    desc: 'Crafting interfaces that balance aesthetic precision with functional clarity and accessibility.',
    skills: ['UI Design', 'Responsive Design', 'Visual Hierarchy', 'Typography Systems', 'Component Libraries', 'Design Tokens', 'Motion Design', 'Dark Mode'],
  },
  {
    label: 'Graphic & Brand',
    desc: 'Building brand identities and visual systems that communicate with consistency and character.',
    skills: ['Brand Identity', 'Logo Design', 'Packaging', 'Marketing Collateral', 'Editorial Design', 'Social Media', 'Print Design', 'Apparel & Merch'],
  },
];

function CapCard({ cap, index }: { cap: typeof caps[0]; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'v' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        padding: '36px 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', alignItems: 'start' }}
        className="hidden md:grid">
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>0{index + 1}</span>
          <h3 style={{ fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.2, marginTop: '8px' }}>
            {cap.label}
          </h3>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.75, paddingTop: '26px' }}>{cap.desc}</p>
        <div className="flex flex-wrap gap-2 pt-6">
          {cap.skills.map(s => (
            <span key={s} style={{ fontSize: '12px', color: 'var(--fg2)', fontFamily: 'var(--f-mono)', padding: '5px 12px', borderRadius: '100px', background: 'var(--surface2)', border: '1px solid var(--border)', letterSpacing: '0.04em' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.025em' }}>{cap.label}</h3>
          <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.06em' }}>0{index + 1}</span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.7, marginBottom: '16px' }}>{cap.desc}</p>
        <div className="flex flex-wrap gap-2">
          {cap.skills.map(s => (
            <span key={s} style={{ fontSize: '11px', color: 'var(--fg2)', fontFamily: 'var(--f-mono)', padding: '4px 10px', borderRadius: '100px', background: 'var(--surface2)', border: '1px solid var(--border)', letterSpacing: '0.04em' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Capabilities() {
  const { ref, visible } = useReveal();

  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="mb-2">
          <p className={`reveal ${visible ? 'v' : ''}`}
            style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Capabilities
          </p>
          <h2 className={`reveal ${visible ? 'v' : ''} font-bold`}
            style={{ animationDelay: '0.1s', fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            What I bring{' '}
            <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>to the table.</span>
          </h2>
        </div>
        {caps.map((cap, i) => <CapCard key={cap.label} cap={cap} index={i} />)}
      </div>
    </section>
  );
}
