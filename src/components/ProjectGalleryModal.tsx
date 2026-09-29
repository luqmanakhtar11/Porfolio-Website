import { useEffect, useRef } from "react"
import type { Project } from "../data/projects"

/** Bumps an Unsplash (or similar) URL up to a large, uncropped width for full-quality display. */
export function hiRes(url: string, w = 2400): string {
  return url
    .replace(/([?&])w=\d+/, `$1w=${w}`)
    .replace(/[?&]h=\d+/, "")
    .replace(/[?&]fit=crop/, "")
}

export interface GalleryImage {
  src: string
  caption: string
}

/** Every image belonging to a project's case study (excludes the grid thumbnail, which is just a cover crop). */
export function galleryImages(p: Project): GalleryImage[] {
  const imgs: GalleryImage[] = []
  if (p.caseStudy) {
    p.caseStudy.processImages.forEach((im) => imgs.push({ src: im.src, caption: im.caption }))
    p.caseStudy.finalImages.forEach((im) => imgs.push({ src: im.src, caption: im.caption }))
  }
  if (imgs.length === 0) imgs.push({ src: p.image, caption: p.title })
  return imgs
}

/** Warms the browser cache so the modal opens with zero visible load time. Safe to call multiple times. */
export function preloadGallery(p: Project) {
  galleryImages(p).forEach(({ src }) => {
    const img = new Image()
    img.decoding = "async"
    img.src = hiRes(src)
  })
}

export default function ProjectGalleryModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const images = galleryImages(project)

  return (
    <>
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close gallery"
        style={{
          position: "fixed",
          top: "40px",
          right: "24px",
          zIndex: 310,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6L18 18M18 6L6 18" />
        </svg>
      </button>

      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(10,10,10,0.94)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          overflowY: "auto",
          animation: "pgm-fade 0.22s ease",
        }}
      >
      <style>{`
        @keyframes pgm-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pgm-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(1700px, 85vw)",
          margin: "0 auto",
          padding: "44px 20px 96px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "12px",
              fontFamily: "var(--f-mono)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {project.subtitle}
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 38px)",
              fontWeight: 700,
              fontFamily: "var(--f-sans)",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {images.map((img, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                animation: `pgm-rise 0.5s ease ${Math.min(i * 0.06, 0.4)}s both`,
              }}
            >
              <img
                src={hiRes(img.src)}
                alt={img.caption}
                loading={i < 2 ? "eager" : "lazy"}
                // @ts-ignore -- valid HTML attribute, not yet in this TS lib's JSX typings
                fetchpriority={i < 2 ? "high" : "auto"}
                decoding="async"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  display: "block",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
              />
              {img.caption && (
                <figcaption
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--f-sans)",
                  }}
                >
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
