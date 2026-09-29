import { useInView } from '../hooks/useInView';

const HIGHLIGHTS = [
  { num: '5+', label: 'Years of design experience across product, UX/UI & graphic design.' },
  { num: '3+', label: 'Years focused on UI/UX and digital product design,' },
  { num: '1x', label: 'Employee of the Year(2022), recognized for design excellence and contribution.' },
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
              Who I am
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
              I design experiences that {' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                look purposeful and work beautifully.
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
              I’m a multidisciplinary designer working across Product Design, UI/UX, Branding, and Graphic Design.
              I combine strategic thinking with visual craft to turn complex ideas into clear, intuitive, and engaging experiences from digital products and interfaces to brands and visual communication.
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
