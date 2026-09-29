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

const timeline = [
  {
    year: '2024 — Now',
    role: 'UI/UX Designer',
    company: 'URUK IT Solutions Islamabad',
    type: 'On-Site',
    desc: 'Leading the design of OnPoint 2.0 — a next-generation task management system for contractors. Owning end-to-end design from discovery to developer handoff.',
    tags: ['Enterprise UX', 'Design Systems', 'User Research'],
  },
  {
    year: '2021 — 2024',
    role: 'UI/UX Designer',
    company: 'Techlio',
    type: 'On-Site',
    desc: 'Led a 3-person design team shipping products across fintech, HR, and healthcare verticals. Named Employee of the Year in 2022 and 2023.',
    tags: ['Team Lead', 'Product Design', 'Fintech'],
  },
  {
    year: '2020 — 2021',
    role: 'UX/UI Designer',
    company: 'Laptop Outlet',
    type: 'Full-time',
    desc: 'Redesigned the e-commerce experience top-to-bottom, driving a 340% conversion increase through data-informed UX decisions.',
    tags: ['E-commerce', 'Conversion Optimization', 'A/B Testing'],
  },
  {
    year: '2019 — 2020',
    role: 'Graphic Designer',
    company: 'Freelance',
    type: 'Freelance',
    desc: 'Brand identities, print design, and marketing collateral for SMEs across the UK. Built a foundation in visual communication and client craft.',
    tags: ['Branding', 'Print', 'Identity'],
  },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'v' : ''}`}
      style={{
        animationDelay: `${index * 0.09}s`,
        padding: '36px 0',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '40px',
        alignItems: 'start',
      }}
    >
      {/* Year */}
      <div>
        <div style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: '4px' }}>
          {item.year}
        </div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {item.type}
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 700, fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.2, display: 'inline' }}>
            {item.role}
          </h3>
          <span style={{ fontSize: '16px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', marginLeft: '8px' }}>
            · {item.company}
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.75, marginBottom: '14px', maxWidth: '56ch' }}>
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: '11px', color: 'var(--fg2)', fontFamily: 'var(--f-mono)', padding: '4px 10px', borderRadius: '100px', background: 'var(--surface2)', border: '1px solid var(--border)', letterSpacing: '0.04em' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'v' : ''}`}
      style={{ animationDelay: `${index * 0.09}s`, padding: '28px 0', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div style={{ fontSize: '12px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.04em' }}>{item.year}</div>
        <div style={{ fontSize: '10px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.type}</div>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: '3px' }}>{item.role}</h3>
      <div style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', marginBottom: '10px' }}>{item.company}</div>
      <p style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.7, marginBottom: '12px' }}>{item.desc}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map(t => (
          <span key={t} style={{ fontSize: '10px', color: 'var(--fg2)', fontFamily: 'var(--f-mono)', padding: '3px 9px', borderRadius: '100px', background: 'var(--surface2)', border: '1px solid var(--border)', letterSpacing: '0.04em' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, visible } = useReveal();

  return (
    <section id="experience" style={{ background: 'var(--bg)', padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="mb-4">
          <p className={`reveal ${visible ? 'v' : ''}`}
            style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Experience
          </p>
          <h2 className={`reveal ${visible ? 'v' : ''} font-bold`}
            style={{ animationDelay: '0.1s', fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.035em', lineHeight: 1.1 }}>
            Where {"I've"} worked{' '}
            <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>& grown.</span>
          </h2>
        </div>

        <div className="hidden md:block">
          {timeline.map((item, i) => <TimelineItem key={item.company} item={item} index={i} />)}
        </div>
        <div className="md:hidden">
          {timeline.map((item, i) => <MobileTimelineItem key={item.company} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
