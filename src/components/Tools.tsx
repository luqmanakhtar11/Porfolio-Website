import { useInView } from '../hooks/useInView';

const tools = [
  { name: 'Figma', cat: 'Design' },
  { name: 'Adobe XD', cat: 'Design' },
  { name: 'Illustrator', cat: 'Graphics' },
  { name: 'Photoshop', cat: 'Graphics' },
  { name: 'InDesign', cat: 'Print' },
  { name: 'After Effects', cat: 'Motion' },
  { name: 'Framer', cat: 'Prototyping' },
  { name: 'Webflow', cat: 'No-code' },
  { name: 'Notion', cat: 'Docs' },
  { name: 'Jira', cat: 'PM' },
  { name: 'Miro', cat: 'Collab' },
  { name: 'Slack', cat: 'Comms' },
];

export default function Tools() {
  const { ref, inView } = useInView(0.1);

  return (
    <section style={{ background: 'var(--surface2)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <p className={`reveal ${inView ? 'v' : ''}`}
              style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Toolbox
            </p>
            <h2 className={`reveal ${inView ? 'v' : ''} font-bold`}
              style={{ animationDelay: '0.1s', fontSize: 'clamp(24px, 3.5vw, 44px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Tools I work{' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>with daily.</span>
            </h2>
          </div>
        </div>

        <div className={`stagger ${inView ? 'v' : ''} flex flex-wrap gap-3`}>
          {tools.map(t => (
            <div
              key={t.name}
              className="si tool-chip"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '100px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--f-sans)' }}>{t.name}</span>
              <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--f-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
