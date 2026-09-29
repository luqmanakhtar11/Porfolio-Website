const navLinks = ['Work', 'About', 'Experience', 'Contact'];
const scrollTo = (id: string) =>
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--hero-bg)', padding: '56px 0 40px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, fontFamily: 'var(--f-mono)', color: '#fff', letterSpacing: '0.02em' }}>
                LH
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--f-sans)', color: 'var(--hero-fg)' }}>
                M. Luqman Akhtar
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(247,246,241,0.35)', fontFamily: 'var(--f-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              UI/UX · Product · Graphic Design
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {navLinks.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'rgba(247,246,241,0.4)', fontFamily: 'var(--f-sans)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--hero-fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,246,241,0.4)')}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(247,246,241,0.08)', marginBottom: '28px' }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p style={{ fontSize: '12px', color: 'rgba(247,246,241,0.3)', fontFamily: 'var(--f-mono)', letterSpacing: '0.04em' }}>
            © {year} M. Luqman Akhtar. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(247,246,241,0.3)', fontFamily: 'var(--f-serif)', fontStyle: 'italic' }}>
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
