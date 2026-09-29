import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface NavProps {
  dark: boolean;
  onToggle: () => void;
}

const links = ['Work', 'About', 'Experience', 'Contact'];

const Signature = ({ color }: { color: string }) => (
  <span
    aria-label="M. Luqman Akhtar"
    style={{
      fontFamily: "'Great Vibes', cursive",
      fontSize: '26px',
      color,
      lineHeight: 1,
      letterSpacing: '0.01em',
      transition: 'color 0.3s',
      display: 'block',
      userSelect: 'none' as const,
    }}
  >
    M. Luqman Akhtar
  </span>
);

export default function Nav({ dark, onToggle }: NavProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atHero, setAtHero] = useState(true);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      const hero = document.getElementById('hero');
      setAtHero(hero ? window.scrollY < hero.getBoundingClientRect().height - 80 : false);
    };
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  const fgColor = atHero ? 'rgba(247,246,241,0.55)' : 'var(--muted)';

  return (
    <header
      data-hero={atHero ? 'true' : 'false'}
      className="fixed left-0 right-0 z-50"
      style={{
        top: 'var(--ticker-h, 0px)',
        background: scrolled
          ? (dark ? 'rgba(17,16,16,0.9)' : 'rgba(247,246,241,0.9)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <nav
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 40px',
          height: scrolled ? '56px' : '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 0.4s var(--ease)',
        }}
      >
        {/* Logo — signature */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
          aria-label="Home"
        >
          <Signature color={atHero ? 'var(--hero-fg)' : 'var(--fg)'} />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l}
              onClick={() => (l === 'Experience' ? navigate('/resume') : scrollTo(l))}
              className="nav-link text-sm font-medium"
              style={{ color: fgColor, fontFamily: 'var(--f-sans)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden items-center justify-center"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              width: '36px', height: '36px',
              borderRadius: '8px',
              background: atHero ? 'rgba(247,246,241,0.08)' : 'var(--surface2)',
              border: atHero ? '1px solid rgba(247,246,241,0.12)' : '1px solid var(--border)',
              color: fgColor,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.3s',
            }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
          <button
            onClick={onToggle}
            aria-label={dark ? 'Light mode' : 'Dark mode'}
            style={{
              width: '36px', height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: atHero ? 'rgba(247,246,241,0.08)' : 'var(--surface2)',
              border: atHero ? '1px solid rgba(247,246,241,0.12)' : '1px solid var(--border)',
              color: fgColor,
              cursor: 'pointer',
              transition: 'background 0.3s, border-color 0.3s',
            }}
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z"/>
              </svg>
            )}
          </button>

          <a
            href="https://www.linkedin.com/in/luqmanakhtar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: '36px', height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0A66C2',
              border: '1px solid #0A66C2',
              color: '#fff',
              transition: 'background 0.3s, border-color 0.3s, opacity 0.3s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <button
            onClick={() => navigate('/resume')}
            className="hidden md:inline-flex items-center gap-1.5"
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'var(--f-sans)',
              color: '#fff',
              background: 'var(--accent)',
              letterSpacing: '0.01em',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Resume ↗
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden flex flex-col px-10 pb-8 pt-3 gap-6"
          style={{ background: dark ? 'rgba(17,16,16,0.97)' : 'rgba(247,246,241,0.97)', backdropFilter: 'blur(16px)' }}
        >
          {links.map(l => (
            <button
              key={l}
              onClick={() => { if (l === 'Experience') { navigate('/resume'); setMenuOpen(false); } else { scrollTo(l); } }}
              style={{ textAlign: 'left', fontSize: '18px', fontWeight: 500, fontFamily: 'var(--f-sans)', color: 'var(--fg)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => { navigate('/resume'); setMenuOpen(false); }}
            style={{
              fontSize: '16px', fontWeight: 600, color: '#fff',
              fontFamily: 'var(--f-sans)', background: 'var(--accent)',
              border: 'none', cursor: 'pointer', textAlign: 'center',
              padding: '14px 20px', borderRadius: '10px', width: '100%',
            }}
          >
            Resume ↗
          </button>
        </div>
      )}
    </header>
  );
}
