import { useInView } from '../hooks/useInView';

const socials = [
  { label: 'Email', value: 'luqmanakhtar3@gmail.com', href: 'mailto:luqmanakhtar3@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/luqmanakhtar', href: 'https://www.linkedin.com/in/luqmanakhtar/' },
];

export default function Contact() {
  const { ref, inView } = useInView(0.12);

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: '96px 0 80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref}>
          {/* Big CTA heading */}
          <div style={{ marginBottom: '56px' }}>
            <p className={`reveal ${inView ? 'v' : ''}`}
              style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Get in Touch
            </p>
            <h2 className={`reveal ${inView ? 'v' : ''} font-bold`}
              style={{
                animationDelay: '0.08s',
                fontSize: 'clamp(36px, 6.5vw, 88px)',
                fontFamily: 'var(--f-sans)',
                color: 'var(--fg)',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                maxWidth: '11em',
              }}
            >
              Have a project worth{' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                designing?
              </span>
            </h2>
          </div>

          {/* Content row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div>
              <p className={`reveal ${inView ? 'v' : ''}`}
                style={{ animationDelay: '0.16s', fontSize: '16px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '44ch' }}>
                {"I'm"} always open to interesting products, ambitious teams, and challenging design problems.
                Whether {"you're"} building something from scratch or need a strategic design partner, {"let's"} talk.
              </p>

              <div className={`reveal ${inView ? 'v' : ''} flex items-center gap-4`} style={{ animationDelay: '0.24s' }}>
                <a
                  href="https://wa.me/923169113272"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    background: 'var(--accent)',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--f-sans)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {"Let's Talk"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="#"
                  style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--f-sans)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Resume ↗
                </a>
              </div>
            </div>

            <div className={`reveal ${inView ? 'v' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col gap-0" style={{ borderTop: '1px solid var(--border)' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between py-5"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--fg)', fontFamily: 'var(--f-sans)' }}>
                        {s.value}
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--muted)', flexShrink: 0, transition: 'transform 0.2s' }}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6">
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--f-sans)' }}>Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
