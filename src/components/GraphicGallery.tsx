import { gfxItems } from '../data/projects';
import { useInView } from '../hooks/useInView';

function GfxCard({ item, delay }: { item: (typeof gfxItems)[0]; delay: number }) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'v' : ''} gfx-item relative overflow-hidden`}
      style={{
        animationDelay: `${delay}s`,
        borderRadius: '12px',
        background: item.imageBg || 'var(--surface2)',
        border: '1px solid var(--border)',
        aspectRatio: item.tall ? undefined : '4/5',
        height: item.tall ? '100%' : undefined,
        width: item.tall ? '100%' : undefined,
        gridColumn: item.tall ? 'span 2' : undefined,
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div
        className="gfx-label absolute bottom-0 left-0 right-0 p-5"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
      >
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: 'var(--f-sans)', marginBottom: '2px' }}>
          {item.title}
        </p>
        {item.category && (
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--f-mono)', letterSpacing: '0.06em' }}>
            {item.category}
          </p>
        )}
      </div>
    </div>
  );
}

export default function GraphicGallery() {
  const { ref, inView } = useInView(0.08);

  return (
    <section
      style={{
        background: 'var(--surface2)',
        padding: '96px 0 80px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p
              className={`reveal ${inView ? 'v' : ''}`}
              style={{ fontSize: '13px', fontFamily: 'var(--f-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}
            >
              Graphic Design
            </p>
            <h2
              className={`reveal ${inView ? 'v' : ''} font-bold`}
              style={{ animationDelay: '0.1s', fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: 'var(--f-sans)', color: 'var(--fg)', letterSpacing: '-0.035em', lineHeight: 1.1 }}
            >
              Logos, posters &{' '}
              <span style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 400 }}>everything in between.</span>
            </h2>
          </div>
          <p
            className={`reveal ${inView ? 'v' : ''} md:max-w-xs`}
            style={{ animationDelay: '0.16s', fontSize: '14px', color: 'var(--muted)', fontFamily: 'var(--f-sans)', lineHeight: 1.7 }}
          >
            The stuff you notice before you ever open an app: brand identities, packaging, social posts and print.
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {gfxItems.map((item, i) => (
            <GfxCard key={item.id} item={item} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
