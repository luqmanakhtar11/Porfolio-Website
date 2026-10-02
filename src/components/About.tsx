import { useInView } from '../hooks/useInView';
const aboutPhoto = 'https://res.cloudinary.com/pzdwfxph/image/upload/f_auto,q_auto/v1790889282/unnamed.jpg';

const paras = [
  "I started out in graphic design, obsessing over type, colour and layout. That's still how I see things: every screen is a composition first.",
  "Over 5+ years that grew into product work: research, user flows, UI and design systems, alongside the brand and marketing work I never stopped loving. I care just as much about how something looks as whether it actually works.",
  "Big enterprise platform or small brand refresh, it gets the same attention from me. The details are usually where the good stuff hides.",
];

const stats = [
  { n: '5', suffix: '+', label: 'Years of experience' },
  { n: '100', suffix: '+', label: 'Projects delivered' },
  { n: '6', suffix: '×', label: 'Employee of the Month' },
];

export default function About() {
  const { ref, inView } = useInView(0.08);
  const rv = `reveal ${inView ? 'v' : ''}`;

  return (
    <section id="about" style={{ background: 'var(--bg)', padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* Photo card with floating award badge */}
          <div
            className={`${rv} relative overflow-hidden aspect-[4/5] md:aspect-auto md:col-span-5 md:row-span-2`}
            style={{ animationDelay: '0.1s', borderRadius: '28px', background: 'var(--surface2)', border: '1px solid var(--border)', minHeight: '420px' }}
          >
            <img
              src={aboutPhoto}
              alt="M. Luqman Akhtar"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '36% center' }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute', left: '16px', right: '16px', bottom: '16px',
                padding: '14px 16px', borderRadius: '18px',
                background: 'rgba(20,20,24,0.42)',
                backdropFilter: 'blur(18px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--f-sans)' }}>Employee of the Year</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--f-sans)', marginTop: '2px' }}>Touchstone Communications · 2022 </div>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Story card */}
          <div
            className={`${rv} md:col-span-7`}
            style={{ animationDelay: '0.15s', borderRadius: '28px', padding: 'clamp(24px, 3vw, 40px)', background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            <p style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
              About me
            </p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(30px, 4vw, 56px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: '24px' }}>
              A graphic designer who{' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>fell for UX.</span>
            </h2>

            <p style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', fontWeight: 500, color: 'var(--fg)', fontFamily: 'var(--f-sans)', lineHeight: 1.6, marginBottom: '22px' }}>
              {paras[0]}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4" style={{ marginBottom: '28px' }}>
              {paras.slice(1).map((text, i) => (
                <p key={i} style={{ fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.75 }}>
                  {text}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '12px 24px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--f-sans)', letterSpacing: '-0.01em', cursor: 'pointer', border: 'none' }}
              >
                {"Let's Work Together"}
              </button>
              <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--f-sans)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Resume ↗
              </a>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={rv}
                style={{ animationDelay: `${0.25 + i * 0.08}s`, borderRadius: '24px', padding: '24px', background: 'var(--surface2)', border: '1px solid var(--border)' }}
              >
                <div style={{ fontSize: 'clamp(34px, 3.4vw, 48px)', fontWeight: 800, fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {s.n}<span style={{ color: 'var(--accent)' }}>{s.suffix}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', marginTop: '10px' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
