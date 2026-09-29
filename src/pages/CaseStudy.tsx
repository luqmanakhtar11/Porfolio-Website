import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { projects } from '../data/projects';
import IraqPayCaseStudy from './IraqPayCaseStudy';
import CdmCashProCaseStudy from './CdmCashProCaseStudy';

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

/* ─── Sub-components (each calls hooks at top level) ─── */

function SectionLabel({ label, heading, serif }: { label: string; heading: string; serif: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="mb-12">
      <p className={`reveal ${visible ? 'v' : ''}`} style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
        {label}
      </p>
      <h2 className={`reveal ${visible ? 'v' : ''} font-bold`} style={{ animationDelay: '0.1s', fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        {heading}{' '}
        <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>{serif}</span>
      </h2>
    </div>
  );
}

function OverviewCard({ heading, body, index }: { heading: string; body: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'v' : ''}`} style={{ animationDelay: `${index * 0.12}s` }}>
      <div className="w-8 h-1 rounded-full mb-5" style={{ background: 'var(--accent)' }} />
      <h3 className="font-bold mb-4" style={{ fontSize: '18px', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.02em' }}>
        {heading}
      </h3>
      <p style={{ fontSize: '15px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.8 }}>
        {body}
      </p>
    </div>
  );
}

function ProcessStep({ step, index }: { step: { label: string; desc: string }; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'v' : ''}`} style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="p-6 rounded-xl h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-bold mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--f-mono)', letterSpacing: '0.1em' }}>
          {step.label}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'var(--f-sans)' }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

function ProcessImage({ src, caption, wide, index }: { src: string; caption: string; wide?: boolean; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'v' : ''} rounded-2xl overflow-hidden`}
      style={{ animationDelay: `${index * 0.1}s`, gridColumn: wide ? '1 / -1' : undefined, background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div style={{ aspectRatio: wide ? '16/7' : '4/3', overflow: 'hidden' }}>
        <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <p className="px-5 py-3 text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', letterSpacing: '0.04em', borderTop: '1px solid var(--border)' }}>
        {caption}
      </p>
    </div>
  );
}

function FinalImage({ src, caption, index }: { src: string; caption: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'v' : ''} rounded-2xl overflow-hidden`} style={{ animationDelay: `${index * 0.12}s`, border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
        <img src={src} alt={caption} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <p className="px-5 py-3 text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', letterSpacing: '0.04em', borderTop: '1px solid var(--border)' }}>
        {caption}
      </p>
    </div>
  );
}

function MetricCard({ num, label, index }: { num: string; label: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'v' : ''} p-8 rounded-2xl text-center`} style={{ animationDelay: `${index * 0.1}s`, background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="font-extrabold" style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontFamily: 'var(--f-sans)', color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {num}
      </div>
      <div className="mt-2 text-sm font-medium" style={{ color: 'var(--muted)', fontFamily: 'var(--f-sans)' }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Main page ─── */

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);
  const cs = project?.caseStudy;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // The IRAQ PAY project opens a dedicated, fully-designed case-study page.
  if (slug === 'iraq-pay') {
    return <IraqPayCaseStudy />;
  }
  if (slug === 'cdm-cashpro') {
    return <CdmCashProCaseStudy />;
  }

  if (!project || !cs) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', marginBottom: '12px' }}>Project not found</p>
          <Link to="/" style={{ color: 'var(--accent)', fontFamily: 'var(--f-sans)' }}>← Back home</Link>
        </div>
      </div>
    );
  }

  const nextProject = cs.nextSlug ? projects.find(p => p.slug === cs.nextSlug) : null;

  return (
    <div className="page-enter" style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-end overflow-hidden" style={{ minHeight: '90vh', background: '#000' }}>
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" style={{ opacity: 0.32 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.55) 100%)' }} />
        </div>

        {/* Back */}
        <div className="absolute top-24 left-0 right-0 z-20" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--f-sans)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Work
          </button>
        </div>

        <div className="relative z-10" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 64px' }}>
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.categories.map(c => (
              <span key={c} className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.14)', fontFamily: 'var(--f-mono)', letterSpacing: '0.08em' }}>
                {c}
              </span>
            ))}
          </div>

          <h1 className="font-extrabold leading-tight text-white"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)', fontFamily: 'var(--f-sans)', letterSpacing: '-0.04em', maxWidth: '18ch', marginBottom: '36px' }}>
            {project.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-10">
            {[
              { label: 'Role', value: project.role },
              { label: 'Year', value: project.year },
              { label: 'Duration', value: project.duration },
            ].map(m => (
              <div key={m.label}>
                <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--f-sans)' }}>{m.value}</div>
              </div>
            ))}
            <div>
              <div className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--f-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tools</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map(t => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full text-xs text-white"
                    style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)', fontFamily: 'var(--f-mono)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <OverviewCard heading="The Challenge" body={cs.challenge} index={0} />
            <OverviewCard heading="The Approach" body={cs.approach} index={1} />
            <OverviewCard heading="The Outcome" body={cs.outcome} index={2} />
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '80px 0 100px', background: 'var(--surface2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <SectionLabel label="Design Process" heading="How the work" serif="happened." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cs.processSteps.map((step, i) => (
              <ProcessStep key={step.label} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Images ── */}
      <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <SectionLabel label="Design Exploration" heading="Inside the" serif="process." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cs.processImages.map((img, i) => (
              <ProcessImage key={i} src={img.src} caption={img.caption} wide={img.wide} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Design ── */}
      <section style={{ padding: '80px 0 100px', background: 'var(--surface2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <SectionLabel label="Final Experience" heading="The" serif="delivered design." />
          <div className="flex flex-col gap-5">
            {cs.finalImages.map((img, i) => (
              <FinalImage key={i} src={img.src} caption={img.caption} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      {cs.metrics && (
        <section style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <SectionLabel label="Impact" heading="The" serif="numbers tell the story." />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cs.metrics.map((m, i) => (
                <MetricCard key={m.label} num={m.num} label={m.label} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next Project ── */}
      {nextProject && (
        <section style={{ padding: '80px 0', background: 'var(--surface2)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Next Project
                </p>
                <h3 className="font-bold" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.03em' }}>
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--f-sans)' }}>
                  {nextProject.subtitle}
                </p>
              </div>
              <Link
                to={`/work/${nextProject.slug}`}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shrink-0"
                style={{ background: 'var(--accent)', fontSize: '15px', fontFamily: 'var(--f-sans)', letterSpacing: '-0.01em' }}
              >
                View Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
