import { useEffect } from 'react';
import { Link } from 'react-router';

const resumePdf = '/Luqman_Resume_Apr_2026_.pdf';

const experience = [
  {
    company: 'URUK IT Solutions',
    location: 'Islamabad, Pakistan',
    role: 'Senior UI/UX Designer',
    period: 'Aug 2024 – Present',
    products: [
      {
        name: 'Himolatech',
        sub: 'Logistics & Freight Marketplace (Mobile App)',
        bullets: [
          'Designed a two-sided platform connecting customers with truck drivers for cargo and freight bookings.',
          'Built customer flows for booking, scheduling, vehicle selection, pricing, and in-app communication.',
          'Designed driver tools for job management, assistant pricing, vehicle types, earnings, and trip scheduling.',
          'Reduced booking uncertainty and cancellations by clarifying real-time availability, pricing, and communication between customers and drivers in the booking flow.',
        ],
      },
      {
        name: 'TAIF Pay',
        sub: 'Fintech Wallet (Mobile App)',
        bullets: [
          'Designed a digital wallet enabling users to link cards, make payments, and manage transactions securely.',
          'Created onboarding, KYC, and compliance flows aligned with financial regulations.',
          'Improved payment success and user trust by simplifying KYC, validation, and error-handling across critical payment and onboarding flows.',
        ],
      },
      {
        name: 'CashPro & CDM',
        sub: 'Banking & Operations Platform (Web App)',
        bullets: [
          'Designed a centralized system for managing and monitoring Cash Deposit Machines (CDMs) and ATMs for a national bank.',
          'Built dashboards for operations, IT, and support teams to track cash levels, transaction failures, and machine status.',
          'Replaced manual tracking with real-time CDM and ATM monitoring, significantly reducing operational overhead and incident response time for bank teams.',
        ],
      },
    ],
  },
  {
    company: 'Techlio',
    location: 'Lahore, Pakistan',
    role: 'Senior UI/UX Designer',
    period: 'March 2023 – Jul 2024',
    products: [
      {
        name: 'SpinLab AI',
        sub: 'Sports Analytics Platform (Web App)',
        bullets: [
          'Designed the complete UX and UI for an AI-powered sports-tech platform used by American football athletes and coaches.',
          'Created dashboards to visualize biomechanics, performance metrics, injury risk, and progress tracking.',
          'Transformed complex motion-capture and analytics data into clear, actionable insights for athletes and trainers.',
        ],
      },
      {
        name: 'ProjectChef',
        sub: 'Project Management SaaS (Web App)',
        bullets: [
          'Led the full redesign of a cloud-based project management platform.',
          'Built user flows for task management, Kanban boards, Gantt charts, calendars, risk tracking, and reporting dashboards.',
          'Improved usability and collaboration by simplifying complex workflows for multi-team environments.',
        ],
      },
    ],
  },
  {
    company: 'Touchstone Communications',
    location: 'Islamabad, Pakistan',
    role: 'Graphics & UI/UX Designer',
    period: 'Oct 2021 – Mar 2023',
    products: [],
  },
  {
    company: 'OBS Technologia',
    location: 'Islamabad, Pakistan',
    role: 'Graphics & UI/UX Designer',
    period: 'Dec 2020 – Oct 2021',
    products: [],
  },
];

const skills = [
  'Product Design', 'UX Strategy', 'Fintech UX', 'SaaS', 'Payments', 'KYC',
  'Marketplaces', 'Dashboards', 'Web Apps', 'Mobile Apps', 'Figma',
  'Prototyping', 'Design Systems', 'Usability Testing', 'Cross-functional Collaboration',
];

export default function Resume() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100svh', fontFamily: 'var(--f-sans)' }}>

      {/* ── Hero header ── */}
      <header style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '72px 0 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>

          {/* Back link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 500, letterSpacing: '0.04em',
              color: 'var(--accent)', textDecoration: 'none', marginBottom: 40,
              textTransform: 'uppercase',
            }}
          >
            ← Portfolio
          </Link>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            {/* Name + title */}
            <div>
              <h1 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(40px,6vw,64px)', fontWeight: 400, margin: '0 0 10px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Muhammad Luqman Akhtar
              </h1>
              <p style={{ fontSize: 17, fontWeight: 500, margin: '0 0 6px', color: 'var(--accent)' }}>UI/UX Designer</p>
            </div>

            {/* Contact + CTAs */}
            <div className="flex flex-col items-start md:items-end gap-2.5 md:min-w-[200px]">
              <div className="text-left md:text-right" style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.8 }}>
                <div>Islamabad, Pakistan</div>
                <div>+92 316 9113272</div>
                <div>luqmanakhtar3@gmail.com</div>
              </div>
              {/* Download button */}
              <a
                href={resumePdf}
                download="Luqman_Resume_Apr_2026.pdf"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', borderRadius: 8,
                  background: 'var(--accent)', color: '#fff',
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  letterSpacing: '0.01em', marginTop: 4,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/luqmanakhtar/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 20px', borderRadius: 8,
                  border: '1.5px solid rgba(247,246,241,0.25)',
                  color: 'var(--bg)', fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.01em',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 96px' }}>

        {/* Summary */}
        <section style={{ marginBottom: 60 }}>
          <p style={{
            fontSize: 17, lineHeight: 1.75, color: 'var(--fg2)',
            borderLeft: '3px solid var(--accent)', paddingLeft: 20, margin: 0,
          }}>
            Senior Product Designer with 5+ years of experience designing fintech, logistics, and SaaS platforms
            across web and mobile. Specialized in multi-sided marketplaces, payments, and operational dashboards
            used by thousands of users. Experienced working with product, engineering, and business teams from
            concept to launch.
          </p>
        </section>

        <Divider />

        {/* Experience */}
        <section style={{ marginBottom: 60 }}>
          <SectionLabel>Experience</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
            {experience.map((job) => (
              <div key={job.company}>
                {/* Company header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
                  <div>
                    <span style={{ fontFamily: 'var(--f-serif)', fontSize: 22, fontWeight: 400 }}>{job.company}</span>
                    <span style={{ fontSize: 14, color: 'var(--fg2)', marginLeft: 10 }}>{job.location}</span>
                  </div>
                  <span style={{ fontSize: 12, letterSpacing: '0.06em', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>{job.role}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg2)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: job.products.length ? 24 : 0 }}>
                  {job.period}
                </div>

                {/* Products */}
                {job.products.map((p) => (
                  <div key={p.name} style={{ marginBottom: 28 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
                      {p.name}
                      <span style={{ fontWeight: 400, color: 'var(--fg2)', fontSize: 13, marginLeft: 8 }}>— {p.sub}</span>
                    </div>
                    <ul style={{ margin: '8px 0 0', padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {p.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--fg2)' }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Skills */}
        <section style={{ marginBottom: 60 }}>
          <SectionLabel>Core Skills</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s) => (
              <span key={s} style={{
                fontSize: 13, fontWeight: 500,
                padding: '6px 14px', borderRadius: 100,
                border: '1.5px solid var(--line, rgba(0,0,0,0.1))',
                color: 'var(--fg2)',
              }}>
                {s}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* Education */}
        <section style={{ marginBottom: 60 }}>
          <SectionLabel>Education</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <span style={{ fontFamily: 'var(--f-serif)', fontSize: 20, fontWeight: 400 }}>FAST NUCES</span>
              <span style={{ fontSize: 14, color: 'var(--fg2)', marginLeft: 10 }}>Bachelor of Science in Computer Science</span>
            </div>
            <span style={{ fontSize: 12, letterSpacing: '0.06em', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>2016 – 2020</span>
          </div>
        </section>

        <Divider />

        {/* Languages */}
        <section style={{ marginBottom: 60 }}>
          <SectionLabel>Languages</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--f-serif)', fontSize: 20, fontWeight: 400 }}>English</span>
            <span style={{ fontSize: 12, letterSpacing: '0.06em', color: 'var(--fg2)', textTransform: 'uppercase' }}>CEFR levels</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {englishSkills.map((sk) => {
              const filled = CEFR.indexOf(sk.level) + 1;
              return (
                <div
                  key={sk.skill}
                  style={{ padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--line, rgba(0,0,0,0.1))' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{sk.skill}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{sk.level}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }} aria-label={`${sk.level}, level ${filled} of 6`}>
                    {CEFR.map((lv, i) => (
                      <span
                        key={lv}
                        title={lv}
                        style={{
                          flex: 1, height: 6, borderRadius: 3,
                          background: i < filled ? 'var(--accent)' : 'var(--line, rgba(0,0,0,0.1))',
                          opacity: i < filled ? 1 : 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Bottom CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 8 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--fg2)' }}>
            Want to work together? Reach out at{' '}
            <a href="mailto:luqmanakhtar3@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              luqmanakhtar3@gmail.com
            </a>
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={resumePdf}
              download="Luqman_Resume_Apr_2026.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 8,
                background: 'var(--accent)', color: '#fff',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}
            >
              Download PDF
            </a>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '9px 18px', borderRadius: 8,
                border: '1.5px solid var(--line, rgba(0,0,0,0.12))',
                fontSize: 13, fontWeight: 600,
                color: 'var(--fg)', textDecoration: 'none',
              }}
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// ✏️ English proficiency (CEFR scale: A1 → C2)
const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const englishSkills = [
  { skill: 'Speaking', level: 'B1' },
  { skill: 'Listening', level: 'B2' },
  { skill: 'Reading', level: 'B2' },
  { skill: 'Writing', level: 'B1' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'var(--accent)',
      margin: '0 0 24px',
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--line, rgba(0,0,0,0.1))', margin: '0 0 48px' }} />;
}
