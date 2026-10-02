import { useInView } from '../hooks/useInView';

const HIGHLIGHTS = [
  { num: '5+', label: 'Years of turning blank artboards into real products and brands.' },
  { num: '3+', label: 'Years living and breathing UI/UX and digital products.' },
  { num: '1x', label: 'Employee of the Year (2022), and still a little proud of it.' },
];

export default function Intro() {
  const { ref, inView } = useInView(0.12);

  return (
    <section
      style={{
        background: 'var(--bg)',
        padding: '96px 0 80px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left */}
          <div>
            <p
              className={`reveal ${inView ? 'v' : ''}`}
              style={{
                fontSize: '13px',
                fontFamily: 'var(--f-mono)',
                color: 'var(--accent)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {"Hey, I'm Luqman"}
            </p>
            <h2
              className={`reveal ${inView ? 'v' : ''} font-bold`}
              style={{
                animationDelay: '0.1s',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontFamily: 'var(--f-sans)',
                color: 'var(--fg)',
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
              }}
            >
              I turn messy ideas into things that{' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                just make sense.
              </span>
            </h2>
          </div>

          {/* Right */}
          <div className="md:pt-14">
            <p
              className={`reveal ${inView ? 'v' : ''}`}
              style={{
                animationDelay: '0.18s',
                fontSize: '16px',
                color: 'var(--muted)',
                fontFamily: 'var(--f-sans)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}
            >
              {"I'm a designer who wears a few hats: product, UI/UX, branding and graphics. Honestly, my job is to sweat the small stuff so the people using what I make never have to think twice. Whether it's a banking app or a brand launch, I want it to feel clear, useful and a little bit delightful. These days I build what I design too, using agentic AI and MCP to take ideas from Figma to live."}
            </p>

            <div className="flex flex-col gap-5">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={h.num}
                  className={`reveal ${inView ? 'v' : ''} flex items-start gap-5`}
                  style={{ animationDelay: `${0.28 + i * 0.1}s` }}
                >
                  <div
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      fontFamily: 'var(--f-sans)',
                      color: 'var(--accent)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth: '48px',
                      paddingTop: '2px',
                    }}
                  >
                    {h.num}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.65 }}>
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
