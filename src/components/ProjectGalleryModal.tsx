import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type WheelEvent as RWheelEvent } from "react"
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

/* ─── Full-screen image viewer: pinch / double-tap / scroll to zoom, drag to pan, swipe to change ─── */
function ImageViewer({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: GalleryImage[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const [t, setT] = useState({ s: 1, x: 0, y: 0 })
  const tRef = useRef(t)
  tRef.current = t
  const imgRef = useRef<HTMLImageElement>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const gesture = useRef<{
    s0: number; x0: number; y0: number
    d0: number; mx: number; my: number
    px: number; py: number; t0: number; moved: boolean
  } | null>(null)
  const lastTap = useRef({ time: 0, x: 0, y: 0 })
  const [animate, setAnimate] = useState(false)

  const MAX = 5
  const reset = useCallback(() => { setAnimate(true); setT({ s: 1, x: 0, y: 0 }) }, [])
  useEffect(() => { setAnimate(false); setT({ s: 1, x: 0, y: 0 }) }, [index])

  const go = useCallback((d: number) => {
    const n = index + d
    if (n >= 0 && n < images.length) onIndex(n)
  }, [index, images.length, onIndex])

  // keep the picture from being dragged completely off-screen
  const clamp = (s: number, x: number, y: number) => {
    const el = imgRef.current
    if (!el || s <= 1) return { s: Math.max(1, s), x: 0, y: 0 }
    const w = el.offsetWidth * s, h = el.offsetHeight * s
    const mx = Math.max(0, (w - window.innerWidth) / 2)
    const my = Math.max(0, (h - window.innerHeight) / 2)
    return { s, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) }
  }

  // zoom so the point under (px, py) stays under the finger / cursor
  const zoomAt = (px: number, py: number, s0: number, x0: number, y0: number, s: number) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2
    const qx = (px - cx - x0) / s0, qy = (py - cy - y0) / s0
    return clamp(s, px - cx - s * qx, py - cy - s * qy)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose() }
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [go, onClose])

  const startGesture = () => {
    const pts = [...pointers.current.values()]
    const cur = tRef.current
    const base = { s0: cur.s, x0: cur.x, y0: cur.y, t0: Date.now(), moved: false }
    if (pts.length >= 2) {
      const [a, b] = pts
      gesture.current = { ...base, d0: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, px: 0, py: 0 }
    } else if (pts.length === 1) {
      gesture.current = { ...base, d0: 0, mx: 0, my: 0, px: pts[0].x, py: pts[0].y }
    } else gesture.current = null
  }

  const onPointerDown = (e: RPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    setAnimate(false)
    startGesture()
  }

  const onPointerMove = (e: RPointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    if (!g) return
    const pts = [...pointers.current.values()]
    if (pts.length >= 2 && g.d0 > 0) {
      const [a, b] = pts
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      const s = Math.min(MAX, Math.max(1, (g.s0 * d) / g.d0))
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
      const z = zoomAt(g.mx, g.my, g.s0, g.x0, g.y0, s)
      g.moved = true
      setT(clamp(z.s, z.x + (mx - g.mx), z.y + (my - g.my)))
    } else if (pts.length === 1) {
      const dx = pts[0].x - g.px, dy = pts[0].y - g.py
      if (Math.abs(dx) + Math.abs(dy) > 6) g.moved = true
      if (g.s0 > 1) setT(clamp(g.s0, g.x0 + dx, g.y0 + dy))
    }
  }

  const onPointerUp = (e: RPointerEvent) => {
    const g = gesture.current
    const start = pointers.current.get(e.pointerId)
    pointers.current.delete(e.pointerId)
    if (g && pointers.current.size === 0 && start) {
      const dx = e.clientX - g.px, dy = e.clientY - g.py
      if (g.s0 <= 1 && g.d0 === 0 && g.moved) {
        // swipe gestures while not zoomed
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
        else if (dy > 110 && Math.abs(dy) > Math.abs(dx)) onClose()
      } else if (!g.moved && g.d0 === 0) {
        // tap: a quick second tap toggles zoom
        const now = Date.now()
        const lt = lastTap.current
        if (now - lt.time < 300 && Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 30) {
          setAnimate(true)
          const cur = tRef.current
          setT(cur.s > 1 ? { s: 1, x: 0, y: 0 } : zoomAt(e.clientX, e.clientY, cur.s, cur.x, cur.y, 2.5))
          lastTap.current = { time: 0, x: 0, y: 0 }
        } else lastTap.current = { time: now, x: e.clientX, y: e.clientY }
      }
    }
    startGesture()
  }

  const onWheel = (e: RWheelEvent) => {
    const cur = tRef.current
    const s = Math.min(MAX, Math.max(1, cur.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15)))
    setAnimate(false)
    setT(zoomAt(e.clientX, e.clientY, cur.s, cur.x, cur.y, s))
  }

  const img = images[index]
  const btn: CSSProperties = {
    position: "absolute", width: 44, height: 44, borderRadius: "50%",
    background: "rgba(20,20,20,0.72)", border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 2, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
  }

  return (
    <div
      role="dialog"
      aria-label="Image viewer"
      style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.97)", animation: "pgm-fade 0.18s ease" }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          touchAction: "none", overflow: "hidden", cursor: t.s > 1 ? "grab" : "zoom-in", userSelect: "none",
        }}
      >
        <img
          ref={imgRef}
          key={img.src}
          src={hiRes(img.src)}
          alt={img.caption}
          draggable={false}
          style={{
            maxWidth: "100vw", maxHeight: "100svh", objectFit: "contain", display: "block",
            transform: `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.s})`,
            transition: animate ? "transform 0.28s cubic-bezier(0.22,1,0.36,1)" : "none",
            willChange: "transform", pointerEvents: "none",
          }}
        />
      </div>

      {/* top bar */}
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "none", zIndex: 2 }}>
        <span style={{ fontSize: 13, fontFamily: "var(--f-mono)", color: "#fff", letterSpacing: "0.06em", background: "rgba(20,20,20,0.72)", padding: "6px 10px", borderRadius: 8 }}>
          {index + 1} / {images.length}
        </span>
        <div style={{ display: "flex", gap: 8, pointerEvents: "auto" }}>
          {t.s > 1 && (
            <button type="button" onClick={reset} aria-label="Reset zoom" style={{ ...btn, position: "static", width: "auto", padding: "0 14px", borderRadius: 22, fontSize: 13, fontFamily: "var(--f-sans)" }}>
              Reset
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close image" style={{ ...btn, position: "static" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6L18 18M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      {/* prev / next */}
      {index > 0 && (
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" style={{ ...btn, left: 16, top: "50%", transform: "translateY(-50%)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
      )}
      {index < images.length - 1 && (
        <button type="button" onClick={() => go(1)} aria-label="Next image" style={{ ...btn, right: 16, top: "50%", transform: "translateY(-50%)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}

      {/* hint */}
      {t.s === 1 && (
        <p style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 12, color: "#fff", background: "rgba(20,20,20,0.72)", padding: "6px 12px", borderRadius: 999, fontFamily: "var(--f-sans)", pointerEvents: "none", zIndex: 2 }}>
          Pinch or double-tap to zoom · swipe for next
        </p>
      )}
    </div>
  )
}

export default function ProjectGalleryModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [viewing, setViewing] = useState<number | null>(null)

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
                onClick={() => setViewing(i)}
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
                  cursor: "zoom-in",
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
    {viewing !== null && (
      <ImageViewer images={images} index={viewing} onIndex={setViewing} onClose={() => setViewing(null)} />
    )}
    </>
  )
}
