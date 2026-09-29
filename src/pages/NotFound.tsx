import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight: '100svh', background: 'var(--bg)', padding: '40px' }}
    >
      <p
        className="font-bold mb-4"
        style={{ fontSize: '120px', fontFamily: 'var(--f-sans)', color: 'var(--bg2)', letterSpacing: '-0.06em', lineHeight: 1 }}
      >
        404
      </p>
      <h1
        className="font-bold mb-3"
        style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.03em' }}
      >
        Page not found.
      </h1>
      <p className="mb-10 text-sm" style={{ color: 'var(--muted)', fontFamily: 'var(--f-sans)' }}>
        This page doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
        style={{ background: 'var(--accent)', fontFamily: 'var(--f-sans)' }}
      >
        ← Back to portfolio
      </Link>
    </div>
  );
}
