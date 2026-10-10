import { useState } from "react"
import { useNavigate } from "react-router"
import { GRAPHICS_SUBCATEGORIES, type Category, type Project } from "../data/projects"
import { useInView } from "../hooks/useInView"
import { useProjects } from "../hooks/useProjects"
import ProjectGalleryModal, { preloadGallery } from "./ProjectGalleryModal"

const CATS: Category[] = [
  "All",
  "UI/UX & Product Design",
  "Graphics & Marketing",
]

const PAGE_SIZE = 6

function ProjectCard({
  p,
  index,
  onOpenGallery,
}: {
  p: Project
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
            {p.subCategory || p.categories[0]}
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
  const [sub, setSub] = useState<string>("All")
  const [page, setPage] = useState(1)
  const [galleryProject, setGalleryProject] = useState<Project | null>(null)
  const { ref, inView } = useInView(0.08)
  const { projects, loading } = useProjects()

  const inCat = (c: Category) => projects.filter((p) => c === "All" || p.categories.includes(c))
  const graphics = inCat("Graphics & Marketing")
  // Sub-filters only list the types that actually have projects, so visitors never hit an empty page.
  const subOptions = GRAPHICS_SUBCATEGORIES
    .map((s) => ({ name: s, count: graphics.filter((p) => p.subCategory === s).length }))
    .filter((s) => s.count > 0)
  const showSubs = active === "Graphics & Marketing" && subOptions.length > 0

  const filtered = inCat(active).filter(
    (p) => !(active === "Graphics & Marketing" && sub !== "All") || p.subCategory === sub,
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function selectCategory(c: Category) {
    setActive(c)
    setSub("All")
    setPage(1)
  }

  function selectSub(s: string) {
    setSub(s)
    setPage(1)
  }

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
          style={{ marginBottom: "36px" }}
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
              {"Things I've made"}
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
              A few projects {"I'm"} really{" "}
              <span
                style={{
                  fontFamily: "var(--f-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                proud of.
              </span>
            </h2>
          </div>

        </div>

        {/* Filter bar: main categories, then (for graphics) the type row right underneath */}
        <div
          className={`reveal ${inView ? "v" : ""}`}
          style={{ animationDelay: "0.18s", marginBottom: "44px" }}
        >
          <style>{`
            .wf-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; }
            .wf-seg { display: inline-flex; flex-wrap: wrap; gap: 4px; padding: 5px; border-radius: 999px;
                      background: rgba(127,127,127,0.08); border: 1px solid var(--border); }
            .wf-main { padding: 9px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; font-family: var(--f-sans);
                       letter-spacing: -0.005em; border: 0; cursor: pointer; transition: background-color .2s, color .2s; white-space: nowrap;
                       background-color: transparent; color: var(--muted); }
            .wf-main:hover { color: var(--fg); }
            .wf-main.on { background-color: var(--accent); color: #fff; }
            .wf-count { margin-left: 8px; font-weight: 500; opacity: .6; font-variant-numeric: tabular-nums; }
            .wf-result { font-size: 13px; color: var(--muted); font-family: var(--f-sans); }
            @media (max-width: 767px) {
              .wf-bar { flex-direction: column; align-items: stretch; gap: 10px; }
              .wf-seg { display: flex; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; max-width: 100%; }
              .wf-seg::-webkit-scrollbar { display: none; }
              .wf-main { flex-shrink: 0; padding: 9px 16px; }
              .wf-result { padding-left: 6px; }
              .wf-subs { flex-direction: column; align-items: stretch; gap: 8px; padding-left: 0; }
              .wf-subs-label { align-self: flex-start; padding-left: 6px; }
            }
            @keyframes wfIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
            .wf-subs { display: flex; align-items: center; gap: 12px; margin-top: 14px; padding-left: 6px; animation: wfIn .3s var(--ease) both; }
            .wf-subs-label { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); white-space: nowrap; flex-shrink: 0; }
            .wf-subs-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 2px 0; min-width: 0; max-width: 100%; }
            .wf-subs-row::-webkit-scrollbar { display: none; }
            @media (min-width: 768px) { .wf-subs-row { flex-wrap: wrap; overflow: visible; } }
            .wf-sub { padding: 7px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600; font-family: var(--f-sans); white-space: nowrap;
                      cursor: pointer; transition: all .2s; background-color: transparent; color: var(--fg2, var(--fg)); border: 1px solid var(--border); }
            .wf-sub:hover { border-color: var(--accent); }
            .wf-sub.on { background-color: var(--accent-dim); color: var(--accent); border-color: var(--accent); }
          `}</style>

          <div className="wf-bar">
            <div className="wf-seg" role="tablist" aria-label="Project category">
              {CATS.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active === c}
                  className={`wf-main${active === c ? " on" : ""}`}
                  onClick={() => selectCategory(c)}
                >
                  {c}
                  {!loading && <span className="wf-count">{inCat(c).length}</span>}
                </button>
              ))}
            </div>
            {!loading && (
              <span className="wf-result">
                Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
              </span>
            )}
          </div>

          {showSubs && (
            <div className="wf-subs">
              <span className="wf-subs-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4v9a3 3 0 0 0 3 3h13" /><path d="M16 12l4 4-4 4" />
                </svg>
                Type
              </span>
              <div className="wf-subs-row" role="tablist" aria-label="Graphics type">
                {[{ name: "All", count: graphics.length }, ...subOptions].map((sOpt) => (
                  <button
                    key={sOpt.name}
                    role="tab"
                    aria-selected={sub === sOpt.name}
                    className={`wf-sub${sub === sOpt.name ? " on" : ""}`}
                    onClick={() => selectSub(sOpt.name)}
                  >
                    {sOpt.name === "All" ? "All graphics" : sOpt.name}
                    <span className="wf-count">{sOpt.count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ columnGap: "28px", rowGap: "48px" }}
        >
          {loading && (
            <div
              className="col-span-full"
              style={{
                padding: "80px 0",
                textAlign: "center",
                color: "var(--muted)",
                fontFamily: "var(--f-mono)",
                fontSize: "13px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Loading projects…
            </div>
          )}
          {!loading && paged.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpenGallery={setGalleryProject} />
          ))}
          {!loading && filtered.length === 0 && (
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

        {/* Pagination */}
        {!loading && pageCount > 1 && (
          <div
            className="flex items-center justify-center gap-2"
            style={{ marginTop: "56px" }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--f-mono)",
                letterSpacing: "0.05em",
                background: "transparent",
                color: currentPage === 1 ? "var(--border)" : "var(--muted)",
                border: "1px solid var(--border)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ← Prev
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--f-mono)",
                  background: n === currentPage ? "var(--fg)" : "transparent",
                  color: n === currentPage ? "var(--bg)" : "var(--muted)",
                  border: `1px solid ${n === currentPage ? "var(--fg)" : "var(--border)"}`,
                  cursor: "pointer",
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--f-mono)",
                letterSpacing: "0.05em",
                background: "transparent",
                color: currentPage === pageCount ? "var(--border)" : "var(--muted)",
                border: "1px solid var(--border)",
                cursor: currentPage === pageCount ? "not-allowed" : "pointer",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
    {galleryProject && (
      <ProjectGalleryModal project={galleryProject} onClose={() => setGalleryProject(null)} />
    )}
    </>
  )
}