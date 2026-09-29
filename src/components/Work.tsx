import { useState } from "react"
import { useNavigate } from "react-router"
import { projects, type Category, type Project } from "../data/projects"
import { useInView } from "../hooks/useInView"
import ProjectGalleryModal, { preloadGallery } from "./ProjectGalleryModal"

const CATS: Category[] = [
  "All",
  "UI/UX",
  "Product Design",
  "Graphic Design",
  "Branding",
  "Web Design",
]

function ProjectCard({
  p,
  index,
  onOpenGallery,
}: {
  p: typeof projects[0]
  index: number
  onOpenGallery: (p: Project) => void
}) {
  const { ref, inView } = useInView(0.08)
  const navigate = useNavigate()

  return (
    <div
      ref={ref}
      onClick={() => (p.galleryView ? onOpenGallery(p) : navigate(`/work/${p.slug}`))}
      onMouseEnter={() => p.galleryView && preloadGallery(p)}
      onTouchStart={() => p.galleryView && preloadGallery(p)}
      className={`reveal ${inView ? "v" : ""} work-card`}
      style={{
        animationDelay: `${index * 0.07}s`,
        cursor: "pointer",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          aspectRatio: "4/3",
          background: p.imageBg || "var(--surface2)",
          marginBottom: "18px",
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          className="wc-img w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <span
            style={{
              fontSize: "11px",
              fontFamily: "'Poppins', sans-serif",
              color: "var(--accent)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {p.categories[0]}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              fontFamily: "'Poppins', sans-serif",
              flexShrink: 0,
            }}
          >
            {p.year}
          </span>
        </div>

        <h3
          className="flex items-center gap-2"
          style={{
            fontSize: "clamp(17px, 1.6vw, 21px)",
            fontWeight: 700,
            fontFamily: "var(--f-sans)",
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {p.title}
          <svg
            className="wc-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            style={{ flexShrink: 0 }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </h3>
      </div>
    </div>
  )
}

export default function Work() {
  const [active, setActive] = useState<Category>("All")
  const [galleryProject, setGalleryProject] = useState<Project | null>(null)
  const { ref, inView } = useInView(0.08)

  const filtered = projects.filter(
    (p) => active === "All" || p.categories.includes(active),
  )

  return (
    <>
    <section
      id="work"
      style={{
        background: "var(--bg)",
        padding: "96px 0 80px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header row */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10"
        >
          <div>
            <p
              className={`reveal ${inView ? "v" : ""}`}
              style={{
                fontSize: "13px",
                fontFamily: "var(--f-mono)",
                color: "var(--accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Selected Work
            </p>
            <h2
              className={`reveal ${inView ? "v" : ""} font-bold`}
              style={{
                animationDelay: "0.1s",
                fontSize: "clamp(28px, 4.5vw, 60px)",
                fontFamily: "var(--f-sans)",
                color: "var(--fg)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              Projects that{" "}
              <span
                style={{
                  fontFamily: "var(--f-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                matter.
              </span>
            </h2>
          </div>

          {/* Filters */}
          <div
            className={`reveal ${inView ? "v" : ""} flex flex-wrap gap-2`}
            style={{ animationDelay: "0.18s" }}
          >
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--f-mono)",
                  letterSpacing: "0.05em",
                  background: active === c ? "var(--fg)" : "transparent",
                  color: active === c ? "var(--bg)" : "var(--muted)",
                  border: `1px solid ${
                    active === c ? "var(--fg)" : "var(--border)"
                  }`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ columnGap: "28px", rowGap: "48px" }}
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpenGallery={setGalleryProject} />
          ))}
          {filtered.length === 0 && (
            <div
              className="col-span-full"
              style={{
                padding: "80px 0",
                textAlign: "center",
                color: "var(--muted)",
                fontFamily: "var(--f-sans)",
              }}
            >
              No projects in this category.
            </div>
          )}
        </div>
      </div>
    </section>
    {galleryProject && (
      <ProjectGalleryModal project={galleryProject} onClose={() => setGalleryProject(null)} />
    )}
    </>
  )
}