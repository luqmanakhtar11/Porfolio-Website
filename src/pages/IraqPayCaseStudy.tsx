import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router"
import phoneMockup1 from "@/imports/Phone_Mockup_1.png"
import phoneMockup2 from "@/imports/Phone_Mockup_2.png"
import phoneMockup3 from "@/imports/Phone_Mockup_3.png"
import mapping1 from "@/imports/Mapping-1.webp"
import decisionImg1 from "@/imports/01.png"
import decisionImg2 from "@/imports/02.png"
import decisionImg3 from "@/imports/3.png"

/* Screenshots used as imagery in the flow frames */
const flowShots: Record<string, string> = {
  auth: mapping1,
  payments: "https://i.postimg.cc/zXChbqM0/Cash-Pro-Mockup.jpg",
  wallets: "https://i.postimg.cc/0y4BzGhk/Himolatech.jpg",
}

const css = `
.iraqpay-cs {
  --ink: #07142d;
  --ink-2: #14213d;
  --blue: #1769ff;
  --blue-2: #0b4cd6;
  --sky: #dceaff;
  --ice: #f4f7fc;
  --paper: #fbfcff;
  --line: #d9e1ee;
  --muted: #65718a;
  --mint: #00a98f;
  --plum: #6d3fd1;
  --coral: #f05f54;
  --radius: 26px;
  --shadow: 0 28px 70px rgba(7, 20, 45, .13);

  color: var(--ink);
  background: var(--paper);
  font-family: Poppins;
  line-height: 1.55;
  overflow-x: clip;
  position: relative;
  min-height: 100vh;

  * { box-sizing: border-box; }
  a { color: inherit; }
  button { font: inherit; }
  img { max-width: 100%; display: block; }
  :focus-visible { outline: 3px solid #8db8ff; outline-offset: 4px; }

  .cs-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image: linear-gradient(rgba(23,105,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,105,255,.035) 1px, transparent 1px);
    background-size: 32px 32px; mask-image: linear-gradient(to bottom, black, transparent 85%); }

  .progress { position: fixed; inset: 0 0 auto; height: 4px; z-index: 99; background: rgba(23,105,255,.12); }
  .progress > span { display: block; height: 100%; width: 0; background: var(--blue); }
  .wrap { position: relative; z-index: 1; width: min(1440px, calc(100% - 80px)); margin-inline: auto; }
  .eyebrow { margin: 0 0 14px; color: var(--blue); font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
  .display { font-family: "Arial Narrow", "Roboto Condensed", Inter, sans-serif; font-stretch: condensed; letter-spacing: 0em; line-height: .94; }

  .cs-nav { position: sticky; top: 0; z-index: 40; background: rgba(251,252,255,.88); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(217,225,238,.8); }
  .nav-inner { height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 900; letter-spacing: -.03em; background: none; border: 0; cursor: pointer; font-size: 16px; color: var(--ink); }
  .brand-mark { width: 32px; height: 32px; display: grid; place-items: center; color: white; background: var(--blue); border-radius: 11px 11px 11px 3px; box-shadow: 0 8px 20px rgba(23,105,255,.25); font-size: 15px; }
  .nav-links { display: flex; gap: 28px; font-size: 13px; font-weight: 700; color: #3b4862; }
  .nav-links a { text-decoration: none; }
  .nav-links a:hover { color: var(--blue); }
  .nav-tag { border: 1px solid var(--line); border-radius: 999px; padding: 7px 11px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
  .nav-actions { display: flex; align-items: center; gap: 14px; }
  .nav-home { display: inline-flex; align-items: center; gap: 7px; background: var(--blue); color: #fff; border: 0; cursor: pointer; font-size: 13px; font-weight: 700; letter-spacing: -.01em; padding: 9px 16px; border-radius: 999px; box-shadow: 0 8px 20px rgba(23,105,255,.22); transition: transform .18s ease, box-shadow .18s ease; }
  .nav-home:hover { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(23,105,255,.32); }

  section { scroll-margin-top: 130px; }

  .hero { min-height: 820px; position: relative; display: grid; align-items: center; padding: 86px 0 92px; overflow: hidden; }
  .hero-grid { display: grid; grid-template-columns: .95fr 1.05fr; align-items: center; gap: 56px; }
  .hero h1 { max-width: 650px; margin: 0 0 26px; font-size: clamp(64px, 8vw, 118px); }
  .hero h1 span { color: var(--blue); }
  .hero-copy { max-width: 620px; font-size: 19px; color: #4c5870; }
  .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: 34px; }
  .button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; padding: 0 19px; border-radius: 14px; border: 1px solid var(--line); background: white; color: var(--ink); text-decoration: none; font-size: 13px; font-weight: 850; box-shadow: 0 8px 22px rgba(7,20,45,.06); cursor: pointer; }
  .button.primary { color: white; background: var(--blue); border-color: var(--blue); }
  .hero-note { margin-top: 26px; display: flex; gap: 18px; align-items: center; font-size: 12px; color: var(--muted); }
  .hero-note::before { content: ""; width: 42px; height: 1px; background: var(--blue); }

  .hero-stage { position: relative; height: 620px; }
  .rail { position: absolute; inset: 52px 4px 44px 30px; border: 2px solid rgba(23,105,255,.16); border-radius: 100px 24px 100px 24px; transform: rotate(-7deg); }
  .rail::before { content: ""; position: absolute; width: 11px; height: 11px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 8px rgba(23,105,255,.13); animation: orbit 8s linear infinite; offset-path: inset(0 round 100px 24px 100px 24px); }
  .mock { --tx: 0px; --rot: 0deg; position: absolute; width: 252px; transform: translateX(var(--tx)) rotate(var(--rot)); transition: transform .45s cubic-bezier(.2,.75,.2,1); filter: drop-shadow(0 40px 68px rgba(7,20,45,.34)); }
  .mock img { display: block; width: 100%; height: auto; }
  .mock:hover { transform: translateX(var(--tx)) translateY(-12px) rotate(0deg); z-index: 6; }
  .mock-front { left: 50%; --tx: -50%; bottom: 2px; z-index: 3; }
  .mock-back-left { left: 0; top: 24px; --rot: -12deg; z-index: 1; }
  .mock-back-right { right: 0; top: 10px; --rot: 12deg; z-index: 1; }

  .stats { position: relative; z-index: 5; margin-top: -36px; }
  .stats-grid { display: grid; grid-template-columns: 1.25fr repeat(3, 1fr); color: white; background: var(--ink); border-radius: 24px; box-shadow: var(--shadow); overflow: hidden; }
  .stat { min-height: 142px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid rgba(255,255,255,.12); }
  .stat:last-child { border: 0; }
  .stat-label { color: #9fb0ce; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; font-weight: 800; }
  .stat strong { font-size: 28px; line-height: 1.05; letter-spacing: -.04em; }
  .stat:first-child strong { color: #9bc0ff; }

  section { padding: 112px 0; position: relative; z-index: 1; }
  .section-head { display: grid; grid-template-columns: .75fr 1.25fr; gap: 60px; align-items: end; margin-bottom: 56px; }
  .section-head h2 { margin: 0; font-size: clamp(48px, 6vw, 82px); }
  .section-head p { max-width: 570px; margin: 0; color: var(--muted); font-size: 18px; }
  .challenge-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 34px; }
  .problem-card { min-height: 460px; padding: 46px; position: relative; overflow: hidden; color: white; background: var(--blue); border-radius: var(--radius); }
  .problem-card h3 { max-width: 650px; margin: 0; font-size: clamp(38px,5vw,65px); }
  .problem-card p { max-width: 570px; margin: 26px 0 0; color: #d7e6ff; font-size: 17px; }
  .problem-card::after { content: ""; position: absolute; width: 260px; height: 260px; right: -90px; bottom: -90px; border: 42px solid rgba(255,255,255,.12); border-radius: 50%; }
  .principles { display: grid; gap: 14px; }
  .principle { min-height: 138px; padding: 24px 26px; display: grid; grid-template-columns: 46px 1fr; gap: 18px; align-items: start; background: white; border: 1px solid var(--line); border-radius: 20px; }
  .principle .num { width: 42px; height: 42px; display: grid; place-items: center; color: var(--blue); background: var(--sky); border-radius: 12px; font-family: ui-monospace, monospace; font-size: 12px; font-weight: 900; }
  .principle h4 { margin: 1px 0 6px; font-size: 17px; }
  .principle p { margin: 0; color: var(--muted); font-size: 13px; }

  .ecosystem { background: var(--ice); }
  .role-rail { display: grid; grid-template-columns: repeat(5, 1fr); border: 1px solid var(--line); border-radius: 22px; overflow: hidden; background: white; }
  .role { min-height: 230px; padding: 25px 18px; position: relative; border-right: 1px solid var(--line); }
  .role:last-child { border: 0; }
  .role i { display: block; width: 11px; height: 11px; margin-bottom: 65px; border-radius: 50%; background: var(--role); box-shadow: 0 0 0 7px color-mix(in srgb, var(--role) 15%, transparent); }
  .role h3 { margin: 0 0 7px; font-size: 18px; }
  .role p { margin: 0; color: var(--muted); font-size: 12px; }
  .role::after { content: ""; position: absolute; left: 23px; right: -23px; top: 30px; height: 1px; background: var(--line); z-index: 0; }
  .role:last-child::after { display: none; }

  .process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
  .process-step { padding: 28px 25px; border-top: 3px solid var(--blue); background: white; box-shadow: 0 16px 40px rgba(7,20,45,.06); }
  .process-step small { font-family: ui-monospace, monospace; color: var(--blue); font-weight: 900; }
  .process-step h3 { margin: 36px 0 10px; font-size: 20px; }
  .process-step p { margin: 0; color: var(--muted); font-size: 13px; }

  .flows { color: white; background: var(--ink); }
  .flows .section-head p { color: #9aa9c4; }
  .flows .eyebrow { color: #74a6ff; }
  .flow-tabs { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 22px; }
  .flow-tab { padding: 10px 15px; color: #b9c6dc; background: transparent; border: 1px solid #2b3b59; border-radius: 999px; cursor: pointer; font-size: 12px; font-weight: 800; }
  .flow-tab.active { color: var(--ink); background: white; border-color: white; }
  .flow-frame { position: relative; min-height: 520px; padding: 18px; background: #111a2c; border: 1px solid #283651; border-radius: 24px; overflow: hidden; }
  .flow-frame img { width: 100%; height: 100%; max-height: 610px; object-fit: cover; border-radius: 14px; cursor: zoom-in; }
  .flow-caption { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-top: 18px; color: #93a4c0; font-size: 12px; }
  .flow-caption strong { color: white; }
  .flow-panel { display: none; }
  .flow-panel.active { display: block; animation: fade .35s ease-out; }

  .decisions { background: white; }
  .decision-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .decision { min-height: 503px; padding: 30px; position: relative; overflow: hidden; border: 1px solid var(--line); border-radius: 25px; background: var(--paper); }
  .decision h3 { max-width: 270px; margin: 0 0 12px; font-size: 25px; letter-spacing: -.035em; }
  .decision > p { margin: 0; color: var(--muted); font-size: 13px; }
  /* Card 1: portrait phone, right-aligned, gradient fade */
  .decision-visual { position: absolute; left: 0; right: 0; bottom: 0; top: 150px; display: flex; align-items: flex-start; justify-content: flex-end; background: linear-gradient(180deg, rgba(237,244,255,0) 0%, rgba(237,244,255,0.7) 40%, #edf4ff 100%); }
  .decision-visual > img { width: 70%; height: auto; display: block; object-fit: contain; }
  /* Card 2: 3-phone wide image, full width, gradient — cover fills full container height */
  .decision-visual.full { top: 159px; justify-content: center; align-items: flex-start; background: linear-gradient(180deg, rgba(237,244,255,0) 0%, rgba(237,244,255,0.7) 40%, #edf4ff 100%); }
  .decision-visual.full > img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: top center; }
  /* Card 3: 3-phone wide image, full width, no gradient */
  .decision-visual.bare { top: 159px; justify-content: center; align-items: flex-start; background: none; }
  .decision-visual.bare > img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: top center; }
  .mini-phone { width: 165px; padding: 7px; border-radius: 28px 28px 0 0; background: #0b1221; box-shadow: 0 25px 50px rgba(7,20,45,.18); transform: translateY(20px); }
  .mini-screen { min-height: 300px; padding: 30px 12px 12px; border-radius: 21px 21px 0 0; background: white; }
  .mini-screen h4 { margin: 0 0 14px; font-size: 12px; }
  .phone-cta { display: block; margin: 18px 15px 0; padding: 12px; border-radius: 12px; color: white; background: var(--blue); text-align: center; font-size: 9px; font-weight: 900; }
  .steps { display: flex; gap: 5px; margin: 8px 0 18px; }
  .steps span { height: 4px; flex: 1; border-radius: 8px; background: #dce5f2; }
  .steps span.active { background: var(--blue); }
  .state-row { display: flex; gap: 7px; margin: 9px 0; }
  .state-row span { flex: 1; height: 48px; border-radius: 9px; border: 1px solid #e0e7f2; background: #f7f9fc; }
  .state-row span.selected { background: #eaf2ff; border-color: var(--blue); }
  .verify-line { height: 8px; margin: 9px 0; border-radius: 4px; background: #e7ecf4; }
  .verify-line.short { width: 62%; }
  .verify-box { margin: 16px 0; padding: 12px; border-radius: 10px; background: #f1f6ff; font-size: 7px; color: #49617f; }
  .error-box { margin-top: 22px; padding: 12px; border: 1px solid #ffd0cc; border-radius: 11px; background: #fff2f0; color: #9b372f; font-size: 8px; }
  .success-ring { width: 80px; height: 80px; margin: 25px auto 16px; display: grid; place-items: center; border-radius: 50%; color: var(--mint); border: 8px solid #d9f6ef; font-size: 28px; font-weight: 900; }

  .system-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .system-card { padding: 34px; border: 1px solid var(--line); border-radius: var(--radius); background: white; }
  .system-card h3 { margin: 0 0 22px; font-size: 20px; }
  .swatches { display: grid; grid-template-columns: repeat(5,1fr); gap: 9px; }
  .swatch { aspect-ratio: .75; padding: 12px 8px; display: flex; align-items: end; border-radius: 13px; color: white; font-size: 8px; font-weight: 800; }
  .type-sample { padding: 16px 0; display: flex; justify-content: space-between; gap: 24px; align-items: baseline; border-bottom: 1px solid var(--line); }
  .type-sample:last-child { border: 0; }
  .type-sample strong { font-size: 28px; letter-spacing: -.045em; }
  .type-sample span { color: var(--muted); font-size: 11px; }
  .system-wide { grid-column: 1 / -1; display: grid; grid-template-columns: .8fr 1.2fr; gap: 40px; }
  .state-palette { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
  .state-chip { padding: 18px; border-radius: 15px; font-size: 12px; font-weight: 800; background: var(--chip-bg); color: var(--chip-fg); }

  .outcome { padding-top: 70px; }
  .outcome-card { padding: 64px; position: relative; overflow: hidden; color: white; background: linear-gradient(135deg, var(--blue), #0a43bd); border-radius: 32px; }
  .outcome-card h2 { max-width: 790px; margin: 0; font-size: clamp(48px, 7vw, 90px); }
  .outcome-card > p { max-width: 650px; margin: 28px 0 42px; color: #dbe8ff; font-size: 18px; }
  .outcome-list { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; position: relative; z-index: 2; }
  .outcome-item { min-height: 145px; padding: 23px; border: 1px solid rgba(255,255,255,.2); border-radius: 18px; background: rgba(255,255,255,.08); backdrop-filter: blur(10px); }
  .outcome-item strong { display: block; margin-bottom: 12px; font-size: 16px; }
  .outcome-item span { color: #d9e6ff; font-size: 12px; }
  .outcome-card::after { content: ""; position: absolute; width: 440px; height: 440px; top: -210px; right: -150px; border: 70px solid rgba(255,255,255,.09); border-radius: 50%; }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
  .reveal.visible { opacity: 1; transform: none; }


  @media (max-width: 980px) {
    .hero-grid, .section-head, .challenge-grid, .system-grid, .system-wide { grid-template-columns: 1fr; }
    .hero { padding-top: 58px; }
    .hero-stage { height: 560px; max-width: 620px; width: 100%; margin-inline: auto; }
    .mock { width: 234px; }
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .role-rail { grid-template-columns: repeat(2,1fr); }
    .role { border-bottom: 1px solid var(--line); }
    .role:last-child { grid-column: 1 / -1; }
    .process-grid, .decision-grid { grid-template-columns: repeat(2,1fr); }
    .decision:last-child { grid-column: 1 / -1; }
  }
  @media (max-width: 680px) {
    .nav-links { display: none; }
    .nav-tag { display: none; }
    .hero { min-height: auto; }
    .hero h1 { font-size: 64px; }
    .hero-copy { font-size: 16px; }
    .hero-stage { height: 470px; margin-top: 20px; }
    .mock { width: 190px; }
    .mock-back-left { --rot: -10deg; top: 16px; }
    .mock-back-right { --rot: 10deg; top: 6px; }
    .stats { margin-top: -76px; }
    .stats-grid, .process-grid, .decision-grid, .outcome-list { grid-template-columns: 1fr; }
    .stat { min-height: 112px; }
    .role-rail { grid-template-columns: 1fr; }
    .role, .role:last-child { grid-column: auto; }
    .section-head { gap: 22px; }
    section { padding: 80px 0; }
    .problem-card, .outcome-card { padding: 34px 25px; }
    .decision:last-child { grid-column: auto; }
    .system-wide { display: block; }
    .state-palette { grid-template-columns: repeat(2,1fr); margin-top: 26px; }
    .swatches { grid-template-columns: repeat(3,1fr); }
    .flow-frame { min-height: 300px; padding: 8px; }
    .flow-caption { align-items: flex-start; flex-direction: column; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; }
    .reveal { opacity: 1; transform: none; }
  }
}

@keyframes orbit { to { offset-distance: 100%; } }
@keyframes scan { 50% { transform: translateY(54px); } }
@keyframes fade { from { opacity: 0; transform: translateY(5px); } }
`

export default function IraqPayCaseStudy() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [flow, setFlow] = useState<"auth" | "payments" | "wallets">("auth")
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [lbScale, setLbScale] = useState(1)
  const [lbOffset, setLbOffset] = useState({ x: 0, y: 0 })
  const lbDrag = useRef<{ active: boolean; startX: number; startY: number; ox: number; oy: number }>({ active: false, startX: 0, startY: 0, ox: 0, oy: 0 })

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt })
    setLbScale(1)
    setLbOffset({ x: 0, y: 0 })
  }

  const lbZoom = (delta: number) => {
    setLbScale(prev => {
      const next = Math.min(8, Math.max(1, prev + delta))
      if (next === 1) setLbOffset({ x: 0, y: 0 })
      return next
    })
  }

  const onLbPointerDown = (e: React.PointerEvent) => {
    if (lbScale <= 1) return
    e.currentTarget.setPointerCapture(e.pointerId)
    lbDrag.current = { active: true, startX: e.clientX, startY: e.clientY, ox: lbOffset.x, oy: lbOffset.y }
  }
  const onLbPointerMove = (e: React.PointerEvent) => {
    if (!lbDrag.current.active) return
    setLbOffset({ x: lbDrag.current.ox + e.clientX - lbDrag.current.startX, y: lbDrag.current.oy + e.clientY - lbDrag.current.startY })
  }
  const onLbPointerUp = () => { lbDrag.current.active = false }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.width = `${
          max ? (window.scrollY / max) * 100 : 0
        }%`
      }
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible")
        }),
      { threshold: 0.12 },
    )
    root.querySelectorAll(".reveal").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const lbViewportRef = useRef<HTMLDivElement>(null)

  // Lightbox: ESC to close, body scroll lock, non-passive wheel for zoom
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (lightbox) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
    return () => { document.documentElement.style.overflow = "" }
  }, [lightbox])

  // Must attach wheel as non-passive so preventDefault stops page scroll
  useEffect(() => {
    const el = lbViewportRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = e.deltaY < 0 ? 0.25 : -0.25
      setLbScale(prev => {
        const next = Math.min(8, Math.max(1, prev + delta))
        if (next === 1) setLbOffset({ x: 0, y: 0 })
        return next
      })
    }
    el.addEventListener("wheel", handler, { passive: false })
    return () => el.removeEventListener("wheel", handler)
  }, [lightbox])

  return (
    <>
    <div ref={rootRef} className="iraqpay-cs page-enter">
      <style>{css}</style>
      <div className="cs-bg" aria-hidden="true" />
      <div className="progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <nav className="cs-nav" aria-label="Case study navigation">
        <div className="wrap nav-inner">
          <div className="nav-actions">
            <button
              className="nav-home"
              onClick={() => navigate("/")}
              aria-label="Back to home page"
            >
              <span aria-hidden="true">←</span> Home
            </button>
            <span className="nav-tag">IRAQPAY- UX case study</span>
          </div>
          <div className="nav-links">
            <a href="#challenge">Challenge</a>
            <a href="#flows">Flows</a>
            <a href="#decisions">Decisions</a>
            <a href="#system">System</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow" style={{ fontWeight: 400, color: "var(--surface2)" }}>Mobile finance · Product design</p>
              <h1 className="display" style={{ fontWeight: 800 }}>
                One wallet.
                <br />
                <span>Many lives.</span>
              </h1>
              <p className="hero-copy">
                Designing a secure, role-aware mobile wallet that guides
                individuals and businesses through onboarding, money movement,
                QR payments, and everyday account management.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#flows" style={{ fontWeight: 400 }}>
                  Explore the flows <span aria-hidden="true">↓</span>
                </a>
                <a className="button" href="#decisions">
                  <span className="fg-inline-font-normal">See design decisions</span>
                </a>
              </div>
            </div>

            <div
              className="hero-stage"
              aria-label="Three representative IraqPay mobile screens"
            >
              <div className="rail" aria-hidden="true" />
              <article
                className="mock mock-back-left"
                aria-label="IraqPay wallet home screen"
              >
                <img src={phoneMockup2} alt="IraqPay wallet home screen" />
              </article>
              <article
                className="mock mock-back-right"
                aria-label="IraqPay transactions screen"
              >
                <img src={phoneMockup3} alt="IraqPay transactions screen" />
              </article>
              <article
                className="mock mock-front"
                aria-label="IraqPay payment success screen"
              >
                <img src={phoneMockup1} alt="IraqPay payment success screen" />
              </article>
            </div>
          </div>
        </header>

        <div className="wrap stats reveal">
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-label" style={{ fontWeight: 400, color: "var(--color-white)" }}>Design objective</span>
              <strong>Trust at every transaction</strong>
            </div>
            <div className="stat">
              <span className="stat-label" style={{ fontWeight: 400, color: "var(--color-white)" }}>Prototype depth</span>
              <strong>499</strong>
              <span>Transitions</span>
            </div>
            <div className="stat">
              <span className="stat-label" style={{ fontWeight: 400, color: "var(--color-white)" }}>Account contexts</span>
              <strong>5</strong>
              <span>Personal Entrprises</span>
            </div>
            <div className="stat">
              <span className="stat-label" style={{ fontWeight: 400, color: "var(--color-white)" }}>Platform</span>
              <strong>Mobile</strong>
              <span>iOS + Android</span>
            </div>
          </div>
        </div>

        <section id="challenge">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow" style={{ fontWeight: 400 }}>The challenge</p>
                <h2 className="display" style={{ fontWeight: 800 }}>
                  Complex money flows, without the complexity.
                </h2>
              </div>
              <p>
                IraqPay serves people with very different financial needs. The
                design had to make identity, wallet type, permissions,
                transfers, and recovery feel like one coherent product—not a
                collection of separate forms.
              </p>
            </div>
            <div className="challenge-grid">
              <article className="problem-card reveal">
                <p className="eyebrow" style={{ fontWeight: 400, color: "#cfe0ff" }}>
                  Design question
                </p>
                <h3 className="display" style={{ fontWeight: 800 }}>
                  How might a financial app feel simple while still being
                  explicit about risk, identity, and account responsibility?
                </h3>
                <p>
                  The answer was not to hide complexity. It was to reveal only
                  the right decision, at the right moment, with clear states
                  before and after money moves.
                </p>
              </article>
              <div className="principles">
                <article className="principle reveal">
                  <span className="num" style={{ fontFamily: "Poppins" }}>01</span>
                  <div>
                    <h4>Orient before asking</h4>
                    <p>
                      Explain why information is needed before requesting
                      identity, permissions, or business documents.
                    </p>
                  </div>
                </article>
                <article className="principle reveal">
                  <span className="num" style={{ fontFamily: "Poppins" }}>02</span>
                  <div>
                    <h4>Progress over paperwork</h4>
                    <p>
                      Split long setup journeys into short, visible steps with
                      recoverable progress.
                    </p>
                  </div>
                </article>
                <article className="principle reveal">
                  <span className="num" style={{ fontFamily: "Poppins" }}>03</span>
                  <div>
                    <h4>Make status unmistakable</h4>
                    <p>
                      Use consistent language and visual feedback for pending,
                      successful, blocked, and failed actions.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="ecosystem">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow" style={{ fontWeight: 400 }}>Product architecture</p>
                <h2 className="display" style={{ fontWeight: 800 }}>A role-aware wallet ecosystem.</h2>
              </div>
              <p>
                The core interaction model stays familiar while requirements
                adapt to the responsibility of each account from fast personal
                access to document-heavy company setup.
              </p>
            </div>
            <div className="role-rail reveal">
              <article
                className="role"
                style={
                  { ["--role" as string]: "#1769ff" } as React.CSSProperties
                }
              >
                <i />
                <h3>Personal</h3>
                <p>
                  Everyday payments, transfers, history, and profile controls.
                </p>
              </article>
              <article
                className="role"
                style={
                  { ["--role" as string]: "#6d3fd1" } as React.CSSProperties
                }
              >
                <i />
                <h3>Small merchant</h3>
                <p>
                  A lighter path for accepting payments and managing a small
                  business.
                </p>
              </article>
              <article
                className="role"
                style={
                  { ["--role" as string]: "#c54077" } as React.CSSProperties
                }
              >
                <i />
                <h3>Merchant</h3>
                <p>
                  Expanded verification, transaction controls, and business
                  details.
                </p>
              </article>
              <article
                className="role"
                style={
                  { ["--role" as string]: "#00a98f" } as React.CSSProperties
                }
              >
                <i />
                <h3>Agent</h3>
                <p>
                  Operational onboarding with location and service information.
                </p>
              </article>
              <article
                className="role"
                style={
                  { ["--role" as string]: "#b26918" } as React.CSSProperties
                }
              >
                <i />
                <h3>Company</h3>
                <p>
                  Structured registration, ownership, and authorization
                  requirements.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow">Design approach</p>
                <h2 className="display" style={{ fontWeight: 800 }}>From journeys to a reusable system.</h2>
              </div>
              <p>
                The completed file shows a process centered on coverage: map the
                journey, design the happy path, define exceptions, and package
                patterns for handoff.
              </p>
            </div>
            <div className="process-grid">
              <article className="process-step reveal">
                <small style={{ fontFamily: "Poppins" }}>01 / Map</small>
                <h3>Trace user intent</h3>
                <p>
                  Organize screens by user goal rather than by isolated feature.
                </p>
              </article>
              <article className="process-step reveal">
                <small style={{ fontFamily: "Poppins" }}>02 / Reduce</small>
                <h3>Stage information</h3>
                <p>
                  Group questions into clear steps and postpone secondary
                  decisions.
                </p>
              </article>
              <article className="process-step reveal">
                <small style={{ fontFamily: "Poppins" }}>03 / Stress-test</small>
                <h3>Design the edges</h3>
                <p>
                  Include errors, permission denial, loading, empty, and
                  recovery states.
                </p>
              </article>
              <article className="process-step reveal">
                <small style={{ fontFamily: "Poppins" }}>04 / Systemize</small>
                <h3>Prepare for scale</h3>
                <p>Reuse controls and patterns across every wallet context.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="flows" id="flows">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow" style={{ fontWeight: 400 }}>Flow evidence</p>
                <h2 className="display" style={{ fontWeight: 800 }}>The system behind the screens.</h2>
              </div>
              <p>
                These maps are taken directly from the shared Figma file. They
                show the breadth of the product and how primary journeys, edge
                cases, and wallet-specific requirements were documented
                together.
              </p>
            </div>
            <div
              className="flow-tabs"
              role="tablist"
              aria-label="Figma flow maps"
            >
              <button
                className={`flow-tab ${flow === "auth" ? "active" : ""}`}
                role="tab"
                aria-selected={flow === "auth"}
                onClick={() => setFlow("auth")}
              >
                Access &amp; identity
              </button>
              <button
                className={`flow-tab ${flow === "payments" ? "active" : ""}`}
                role="tab"
                aria-selected={flow === "payments"}
                onClick={() => setFlow("payments")}
              >
                Payments &amp; onboarding
              </button>
              <button
                className={`flow-tab ${flow === "wallets" ? "active" : ""}`}
                role="tab"
                aria-selected={flow === "wallets"}
                onClick={() => setFlow("wallets")}
              >
                Wallet operations
              </button>
            </div>
            <div className={`flow-panel ${flow === "auth" ? "active" : ""}`}>
              <div className="flow-frame reveal">
                <img
                  src={flowShots.auth}
                  alt="IraqPay splash, login, account type, error, permission, and signup flows"
                  onClick={() =>
                    openLightbox(flowShots.auth, "Access & identity flows")
                  }
                />
              </div>
            </div>
            <div
              className={`flow-panel ${flow === "payments" ? "active" : ""}`}
            >
              <div className="flow-frame">
                <img
                  src={flowShots.payments}
                  alt="IraqPay foreign customer onboarding, QR, loading, and small merchant flows"
                  onClick={() =>
                    openLightbox(flowShots.payments, "Payments & onboarding flows")
                  }
                />
              </div>
              <div className="flow-caption">
                <strong>Payments &amp; onboarding</strong>
                <span>
                  Foreign customer onboarding · QR · loading behavior · small
                  merchant setup
                </span>
              </div>
            </div>
            <div className={`flow-panel ${flow === "wallets" ? "active" : ""}`}>
              <div className="flow-frame">
                <img
                  src={flowShots.wallets}
                  alt="IraqPay agent, company, existing user, and transaction history flows"
                  onClick={() =>
                    openLightbox(flowShots.wallets, "Wallet operations flows")
                  }
                />
              </div>
              <div className="flow-caption">
                <strong>Wallet operations</strong>
                <span>
                  Agent wallet · company wallet · existing users · transaction
                  history
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="decisions" id="decisions">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow" style={{ fontWeight: 400 }}>Key decisions</p>
                <h2 className="display" style={{ fontWeight: 800 }}>Confidence is a design feature.</h2>
              </div>
              <p>
                Financial UX succeeds when users can predict what happens next.
                Three patterns do most of that work in IraqPay: contextual
                setup, progressive verification, and explicit transaction
                states.
              </p>
            </div>
            <div className="decision-grid">
              <article className="decision reveal">
                <h3>Choose the wallet before completing the paperwork.</h3>
                <div className="decision-visual">
                  <img src={decisionImg1} alt="Wallet selection screen" />
                </div>
              </article>
              <article className="decision reveal">
                <h3>Break verification into visible, recoverable steps.</h3>
                <div className="decision-visual full">
                  <img src={decisionImg2} alt="Business verification screen" />
                </div>
              </article>
              <article className="decision reveal">
                <h3>Treat every state as part of the transaction.</h3>
                <div className="decision-visual bare">
                  <img src={decisionImg3} alt="Transfer status screen" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="system">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="eyebrow" style={{ fontWeight: 400 }}>Visual system</p>
                <h2 className="display" style={{ fontWeight: 800 }}>
                  A calm interface for high-stakes actions.
                </h2>
              </div>
              <p>
                Cobalt signals action and progress. Dark navy carries balances
                and financial weight. Secondary account colors distinguish
                contexts without changing how the product behaves.
              </p>
            </div>
            <div className="system-grid">
              <article className="system-card reveal">
                <h3>Core palette</h3>
                <div className="swatches">
                  <div className="swatch" style={{ background: "#1769ff" }}>
                    Action
                    <br />
                    #1769FF
                  </div>
                  <div className="swatch" style={{ background: "#07142d" }}>
                    Trust
                    <br />
                    #07142D
                  </div>
                  <div className="swatch" style={{ background: "#00a98f" }}>
                    Success
                    <br />
                    #00A98F
                  </div>
                  <div className="swatch" style={{ background: "#6d3fd1" }}>
                    Business
                    <br />
                    #6D3FD1
                  </div>
                  <div className="swatch" style={{ background: "#f05f54" }}>
                    Attention
                    <br />
                    #F05F54
                  </div>
                </div>
              </article>
              <article className="system-card reveal">
                <h3>Type hierarchy</h3>
                <div className="type-sample">
                  <strong>Wallet total</strong>
                  <span>Display · 28 / Bold</span>
                </div>
                <div className="type-sample">
                  <strong style={{ fontSize: "18px" }}>Review transfer</strong>
                  <span>Title · 18 / Bold</span>
                </div>
                <div className="type-sample">
                  <strong style={{ fontSize: "13px" }}>
                    Recipient details
                  </strong>
                  <span>Label · 13 / Medium</span>
                </div>
              </article>
              <article className="system-card system-wide reveal">
                <div>
                  <h3>State language</h3>
                  <p style={{ color: "var(--muted)", margin: 0 }}>
                    Every color has a job: confirm, warn, block, or inform. Copy
                    remains direct and action-oriented.
                  </p>
                </div>
                <div className="state-palette">
                  <div
                    className="state-chip"
                    style={
                      {
                        ["--chip-bg" as string]: "#e8f8f4",
                        ["--chip-fg" as string]: "#087b69",
                      } as React.CSSProperties
                    }
                  >
                    Completed
                  </div>
                  <div
                    className="state-chip"
                    style={
                      {
                        ["--chip-bg" as string]: "#fff5dc",
                        ["--chip-fg" as string]: "#966100",
                      } as React.CSSProperties
                    }
                  >
                    Pending
                  </div>
                  <div
                    className="state-chip"
                    style={
                      {
                        ["--chip-bg" as string]: "#fff0ee",
                        ["--chip-fg" as string]: "#9d3b32",
                      } as React.CSSProperties
                    }
                  >
                    Needs action
                  </div>
                  <div
                    className="state-chip"
                    style={
                      {
                        ["--chip-bg" as string]: "#eaf2ff",
                        ["--chip-fg" as string]: "#0b4cd6",
                      } as React.CSSProperties
                    }
                  >
                    In progress
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="outcome">
          <div className="wrap">
            <article className="outcome-card reveal">
              <p className="eyebrow" style={{ fontWeight: 400, color: "var(--color-white)" }}>
                Design outcome
              </p>
              <h2 className="display" style={{ fontWeight: 800 }}>
                A complete product language, not just a set of screens.
              </h2>
              <p>
                The resulting system supports access, onboarding, identity,
                multiple wallet types, QR payments, transfers, history,
                settings, permissions, and failure states within one consistent
                interaction model.
              </p>
              <div className="outcome-list">
                <div className="outcome-item">
                  <strong>Broad flow coverage</strong>
                  <span>
                    Happy paths and exceptions live together, making gaps
                    visible before development.
                  </span>
                </div>
                <div className="outcome-item">
                  <strong>Reusable interaction patterns</strong>
                  <span>
                    Forms, verification, status, and navigation patterns repeat
                    across account contexts.
                  </span>
                </div>
                <div className="outcome-item">
                  <strong>Handoff clarity</strong>
                  <span>
                    Flow sections marked ready for development provide a shared
                    reference for implementation.
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

    </div>
    {lightbox && createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image viewer"
        style={{
          position: "fixed", inset: 0, zIndex: 99999,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(4,10,24,0.95)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", top: 18, right: 22, zIndex: 100000,
            width: 42, height: 42, borderRadius: "50%",
            background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.25)",
            color: "white", fontSize: 22, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Image viewport — wheel listener attached via ref */}
        <div
          ref={lbViewportRef}
          onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null) }}
          style={{
            flex: 1, width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            draggable={false}
            onPointerDown={onLbPointerDown}
            onPointerMove={onLbPointerMove}
            onPointerUp={onLbPointerUp}
            onPointerLeave={onLbPointerUp}
            style={{
              maxWidth: "90vw", maxHeight: "calc(100vh - 100px)",
              borderRadius: 12,
              boxShadow: "0 30px 100px rgba(0,0,0,0.6)",
              transformOrigin: "center center",
              transform: `translate(${lbOffset.x}px,${lbOffset.y}px) scale(${lbScale})`,
              transition: lbDrag.current.active ? "none" : "transform 0.1s ease",
              cursor: lbScale > 1 ? (lbDrag.current.active ? "grabbing" : "grab") : "default",
              userSelect: "none",
              display: "block",
            }}
          />
        </div>

        {/* Zoom controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", flexShrink: 0 }}>
          {[
            { label: "−", action: () => lbZoom(-0.5) },
          ].map(({ label, action }) => (
            <button key={label} aria-label="Zoom out" onClick={action} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{label}</button>
          ))}
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, minWidth: 46, textAlign: "center", fontFamily: "Poppins, sans-serif" }}>{Math.round(lbScale * 100)}%</span>
          <button aria-label="Zoom in" onClick={() => lbZoom(0.5)} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          <button aria-label="Reset zoom" onClick={() => { setLbScale(1); setLbOffset({ x: 0, y: 0 }) }} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>↺</button>
        </div>
      </div>,
      document.body
    )}
    </>
  )
}
