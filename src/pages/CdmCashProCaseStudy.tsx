import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// Images from the Figma import
import imgHero from "@/imports/CdmCashPro/d31e300c03211185d99ff720e1a911d88ec0f014.png";
import imgDashboard from "@/imports/CdmCashPro/112a9707176fa574d3e44be70dd83f92b1c0e1c8.png";
import imgFlow1 from "@/imports/CdmCashPro/5fa65aba1a9fa0e80cd208cef1e6c7f86aa2e31b.png";
import imgFlow2 from "@/imports/CdmCashPro/2189fab983b2a3ec2ecd05382dc18471ee71f6d9.png";
import imgFlow3 from "@/imports/CdmCashPro/dc4f4858e8f558117e89fc7b40b032db3c5ac64c.png";
import imgFlow4 from "@/imports/CdmCashPro/21435c9f6631e11b4206d8053cadf08e9c1193e8.png";
import imgFlow5 from "@/imports/CdmCashPro/8c544460a023ee4eb6533a25dc3b771dc8a5f9a5.png";
import imgStateDiagram from "@/imports/CdmCashPro/9ff7febe461843fba2a9cba3231e9e06f159923d.png";
import imgFailureDiagram from "@/imports/CdmCashPro/4731cfcb77d214170df859cf31c554aa1bfa8b76.png";
import imgScreen1 from "@/imports/CdmCashPro/36ed689ce8e60936f212563c9263b145e52655d0.png";
import imgScreen2 from "@/imports/CdmCashPro/ecf86bec73ef49f2d4d8cccc5cfda2dbc9334cdd.png";
import imgScreen3 from "@/imports/CdmCashPro/c3700862a3dd656f34bc234b7dd4c228206aaf30.png";
import imgScreen4 from "@/imports/CdmCashPro/656eef37b8603f51bd50ade316bd57688c4286da.png";
import imgScreen5 from "@/imports/CdmCashPro/352c308ccff84c5d8df7011950f96156934f9dd4.png";
import imgScreen6 from "@/imports/CdmCashPro/038aa51d0092991b2331ab8c9264abc687d24d7f.png";
import imgAdmin1 from "@/imports/CdmCashPro/967d6ec7b763e26573d0ea48f96b739e5d77aab8.png";
import imgAdmin2 from "@/imports/CdmCashPro/addb631872177bbbd8f093b3c8df7b37ac5f1182.png";
import imgAdmin3 from "@/imports/CdmCashPro/dfe78a26c836d72ab1944079eccd743395ee913f.png";
import imgAdmin4 from "@/imports/CdmCashPro/ef1d4c5eace824fb83f14c91e3747acdb4e84b4d.png";
import imgAdmin5 from "@/imports/CdmCashPro/a021d2d3aebbb8d69026bf4571184d61df082018.png";
import imgAdmin6 from "@/imports/CdmCashPro/4374168f998808c5e7702a2a04feecc34826fe8d.png";
import imgLocalization from "@/imports/CdmCashPro/0f67302dad3ca5e3d7cc7b24be636b1dfa74cf11.png";

const G = "'Bricolage Grotesque:Regular', sans-serif";
const GB = "'Bricolage Grotesque:Bold', sans-serif";
const fv = { fontVariationSettings: '"opsz" 14, "wdth" 100' };
const GREEN = "#00a562";
const MUTED = "#6d6d6f";
const MAX_W = 1100;
const PAD = "clamp(24px, 5vw, 80px)";

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "flows", label: "Flows" },
  { id: "screens", label: "Screens" },
];

function SectionLabel({ sub, title }: { sub: string; title: string }) {
  return (
    <div style={{ marginBottom: 40, textAlign: "center" }}>
      <p style={{ fontFamily: G, ...fv, fontSize: 16, color: MUTED, marginBottom: 8 }}>{sub}</p>
      <h2 style={{ fontFamily: GB, ...fv, fontSize: "clamp(26px, 3.5vw, 42px)", color: GREEN, lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(109,109,111,0.12)",
      borderRadius: 16,
      padding: "24px 28px",
      flex: "1 1 200px",
      minWidth: 0,
    }}>
      <p style={{ fontFamily: G, ...fv, fontSize: 14, color: MUTED, marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: GB, ...fv, fontSize: 18, color, lineHeight: 1.3 }}>{value}</p>
    </div>
  );
}

function TransactionType({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      background: "#fff",
      border: "1px solid rgba(109,109,111,0.1)",
      borderRadius: 16,
      padding: "16px 22px",
      flex: "1 1 260px",
      minWidth: 0,
    }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span style={{ fontFamily: GB, ...fv, fontSize: 16, color: "#003f2d" }}>{label}</span>
    </div>
  );
}

function StatusCard({ label, desc, color, bg }: { label: string; desc: string; color: string; bg: string }) {
  return (
    <div style={{
      background: bg,
      border: `1px solid ${bg}`,
      borderRadius: 16,
      padding: "18px 24px",
      flex: "1 1 180px",
      minWidth: 0,
    }}>
      <p style={{ fontFamily: GB, ...fv, fontSize: 16, color, marginBottom: 6 }}>{label}</p>
      <p style={{ fontFamily: G, ...fv, fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default function CdmCashProCaseStudy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100svh", fontFamily: G }}>

      {/* ── Sticky nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: GREEN, width: `${scrollProgress}%`, transition: "width 0.1s linear" }} />
        <div style={{
          maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PAD}`,
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: GREEN,
              background: "none", border: "none", cursor: "pointer",
              fontFamily: GB, flexShrink: 0, ...fv,
            }}
          >
            ← Home
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto" }}>
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  padding: "6px 14px", borderRadius: 20,
                  fontSize: 13, fontWeight: 500, whiteSpace: "nowrap",
                  border: "none", cursor: "pointer", fontFamily: G, ...fv,
                  background: activeSection === s.id ? GREEN : "transparent",
                  color: activeSection === s.id ? "#fff" : MUTED,
                  transition: "all 0.2s",
                }}
              >{s.label}</button>
            ))}
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            color: GREEN, textTransform: "uppercase", flexShrink: 0,
            fontFamily: GB, ...fv,
          }}>CASHPRO · CASE STUDY</span>
        </div>
      </nav>

      {/* ── Content ── */}
      <div style={{ paddingTop: 56 }}>

        {/* ── HERO ── */}
        <section id="overview" style={{ background: "linear-gradient(170deg, #f0fff8 0%, #fff 60%)", paddingBottom: 80 }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `72px ${PAD} 0` }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontFamily: G, ...fv, fontSize: 14, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                Terminal UI + Admin Portal
              </p>
              <h1 style={{ fontFamily: GB, ...fv, fontSize: "clamp(32px, 5vw, 60px)", color: GREEN, lineHeight: 1.1, marginBottom: 20 }}>
                CDM &amp; CashPro
              </h1>
              <p style={{ fontFamily: G, ...fv, fontSize: "clamp(16px, 2vw, 20px)", color: MUTED, lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>
                Designing a Core Banking–Integrated CDM Ecosystem{" "}
                <strong style={{ fontFamily: GB, color: GREEN }}>( 0 → 1 Product )</strong>
              </p>
            </div>

            {/* Hero images */}
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto", width: "clamp(200px, 35%, 360px)", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,165,98,0.12)" }}>
                <img src={imgHero} alt="CDM Machine" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ flex: "1 1 300px", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.08)", border: "1px solid #e0e0e0" }}>
                <img src={imgDashboard} alt="CashPro Dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW CARDS ── */}
        <section style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fafafa" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `64px ${PAD}` }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <StatCard label="My Role" value="Product Designer" color="#ea4884" />
              <StatCard label="Scope" value="CDM Terminal (B2C) + CashPro Web App (B2B)" color={GREEN} />
              <StatCard label="Team" value="Cross-functional · Product, Backend, Frontend, QA, Core Banking" color="#47c6e9" />
              <StatCard label="Project Duration" value="≈ 12 months" color="#9571c9" />
              <StatCard label="Platform" value="Terminal + Web" color="#3b82f6" />
            </div>
            <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(109,109,111,0.06)", borderRadius: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "center" }}>
              {["1 Software Dev Manager", "3 Backend Engrs", "2 Frontend Engineers", "2 QA", "2× Product Designer"].map((t, i, arr) => (
                <span key={t} style={{ fontFamily: G, ...fv, fontSize: 14, color: MUTED }}>
                  {t}{i < arr.length - 1 && <span style={{ margin: "0 10px", opacity: 0.4 }}>|</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTEXT ── */}
        <section id="context" style={{ scrollMarginTop: 72 }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PAD}` }}>
            <div style={{ display: "flex", gap: 60, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 300px" }}>
                <h2 style={{ fontFamily: GB, ...fv, fontSize: "clamp(24px, 3vw, 36px)", color: GREEN, marginBottom: 20 }}>The Context</h2>
                <p style={{ fontFamily: G, ...fv, fontSize: 17, color: MUTED, lineHeight: 1.75 }}>
                  A bank required a complete Cash Deposit Machine ecosystem built from scratch. The project included a customer-facing terminal, an operational monitoring web app, core banking integration, hardware interaction, and Arabic localization support.
                </p>
              </div>
              <div style={{ flex: "1 1 280px" }}>
                <h2 style={{ fontFamily: GB, ...fv, fontSize: "clamp(24px, 3vw, 36px)", color: GREEN, marginBottom: 20 }}>The Problem</h2>
                <ul style={{ fontFamily: G, ...fv, fontSize: 17, color: MUTED, lineHeight: 1.75, paddingLeft: 22 }}>
                  {["No existing system", "No defined transaction states", "No failure-state clarity", "Complex hardware + banking integration", "Arabic-first user base", "Operational monitoring required"].map((p) => (
                    <li key={p} style={{ marginBottom: 8 }}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHERE IT STARTED ── */}
        <section style={{ background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PAD}` }}>
            <SectionLabel sub="Complexity Without Structure" title="Where It Started" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {[imgFlow1, imgFlow2, imgFlow3, imgFlow4, imgFlow5].map((img, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", background: i === 2 ? "#1e9228" : "#f4f4f4", aspectRatio: "16/9" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM ── */}
        <section id="ecosystem" style={{ scrollMarginTop: 72, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PAD}` }}>
            <SectionLabel sub="Terminal → B2C  |  CashPro → B2B" title="Understanding the Ecosystem" />
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              {["Customer", "CDM Terminal", "Core Banking", "CashPro Dashboard"].map((node, i, arr) => (
                <div key={node} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    padding: "14px 22px", borderRadius: 12,
                    border: "1px solid rgba(109,109,111,0.15)",
                    fontFamily: GB, ...fv, fontSize: 15, color: MUTED,
                    background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>{node}</div>
                  {i < arr.length - 1 && <span style={{ fontFamily: GB, fontSize: 20, color: GREEN }}>→</span>}
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: GB, ...fv, fontSize: 20, color: GREEN, marginBottom: 20, textAlign: "center" }}>
              Designing the System Before Designing the Screens
            </h3>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 40px rgba(0,165,98,0.1)" }}>
              <img src={imgStateDiagram} alt="State diagram" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </section>

        {/* ── FLOWS ── */}
        <section id="flows" style={{ scrollMarginTop: 72, background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PAD}` }}>
            <SectionLabel sub="Defining the Architecture" title="Transaction Types &amp; Flow Design" />

            {/* Transaction types */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 56, justifyContent: "center" }}>
              <TransactionType icon="🏦" label="Cash Deposit into Account" />
              <TransactionType icon="💸" label="Send Cash Remittance" />
              <TransactionType icon="👛" label="Reload Driver Wallet" />
              <TransactionType icon="💳" label="Card Reload" />
              <TransactionType icon="❤️" label="Donation" />
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
              {[
                { label: "Total States", value: "19" },
                { label: "Total Exit Points", value: "05" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "16px 28px", borderRadius: 12,
                  border: "1px solid rgba(109,109,111,0.12)",
                  background: "#fff",
                }}>
                  <span style={{ fontFamily: G, ...fv, fontSize: 16, color: MUTED }}>{label}</span>
                  <span style={{ fontFamily: GB, ...fv, fontSize: 36, color: GREEN }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Complexity tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 56 }}>
              {["Multi-layer system interaction", "Retry logic", "Backend dependency", "Timeout handling", "Trial counters"].map((tag) => (
                <span key={tag} style={{
                  padding: "8px 16px", borderRadius: 10,
                  border: "1px solid rgba(109,109,111,0.12)",
                  fontFamily: G, ...fv, fontSize: 15, color: MUTED,
                  background: "#fff",
                }}>{tag}</span>
              ))}
            </div>

            {/* Cash deposit flow label */}
            <h3 style={{ fontFamily: GB, ...fv, fontSize: 22, color: GREEN, marginBottom: 20 }}>
              Cash Deposit into Account
            </h3>
            <p style={{ fontFamily: G, ...fv, fontSize: 16, color: MUTED, marginBottom: 24 }}>
              Defining the Architecture of Designing for Every Possible Outcome
            </p>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 40px rgba(0,165,98,0.1)" }}>
              <img src={imgStateDiagram} alt="Cash deposit flow diagram" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </section>

        {/* ── SCREENS – CDM Terminal B2C ── */}
        <section id="screens" style={{ scrollMarginTop: 72, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PAD}` }}>
            <SectionLabel sub="" title="CDM Terminal (B2C)" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 64 }}>
              {[imgScreen1, imgScreen2, imgScreen3, imgScreen4, imgScreen5, imgScreen6].map((img, i) => (
                <div key={i} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <img src={img} alt={`CDM Terminal screen ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>

            {/* Designing for Failure */}
            <h3 style={{ fontFamily: GB, ...fv, fontSize: "clamp(20px, 2.5vw, 32px)", color: GREEN, marginBottom: 24, textAlign: "center" }}>
              Designing for Failure (The Real Complexity)
            </h3>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 40px rgba(0,165,98,0.1)", marginBottom: 64 }}>
              <img src={imgFailureDiagram} alt="Failure states diagram" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>

            {/* Status taxonomy */}
            <h3 style={{ fontFamily: GB, ...fv, fontSize: "clamp(20px, 2.5vw, 32px)", color: GREEN, marginBottom: 24, textAlign: "center" }}>
              Status Taxonomy Creation
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 80 }}>
              <StatusCard label="Pending" desc="Transaction has started but not yet processed" color="#fbbf24" bg="rgba(251,191,36,0.08)" />
              <StatusCard label="Failed (Generic)" desc="Something failed, but not due to core banking specifically" color="#ef4444" bg="rgba(239,68,68,0.08)" />
              <StatusCard label="Core Banking Failed" desc="Account invalid · Limit exceeded · Business rule violation" color="#ff6c10" bg="rgba(255,108,16,0.08)" />
              <StatusCard label="No Retry" desc="Transaction failed and cannot be retried" color="#7c7c7c" bg="rgba(124,124,124,0.08)" />
              <StatusCard label="Completed" desc="Money deposited. Core banking confirmed. Transaction closed" color="#10b981" bg="rgba(16,185,129,0.08)" />
            </div>

            {/* Localization */}
            <h3 style={{ fontFamily: GB, ...fv, fontSize: "clamp(20px, 2.5vw, 32px)", color: GREEN, marginBottom: 8, textAlign: "center" }}>
              Arabic &amp; Localization Challenges
            </h3>
            <p style={{ fontFamily: G, ...fv, fontSize: 16, color: MUTED, textAlign: "center", marginBottom: 32 }}>
              Designing for a Bilingual Banking Experience
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginBottom: 80 }}>
              {["Arabic", "Kurdish"].map((lang) => (
                <div key={lang}>
                  <p style={{ fontFamily: GB, ...fv, fontSize: 16, color: MUTED, marginBottom: 12 }}>{lang}</p>
                  <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,165,98,0.15)" }}>
                    <img src={imgLocalization} alt={`${lang} UI`} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CashPro B2B */}
            <h3 style={{ fontFamily: GB, ...fv, fontSize: "clamp(20px, 2.5vw, 32px)", color: GREEN, marginBottom: 8, textAlign: "center" }}>
              Turning Machine States into Operational Clarity
            </h3>
            <p style={{ fontFamily: G, ...fv, fontSize: 16, color: MUTED, textAlign: "center", marginBottom: 32 }}>
              The Operational Intelligence Layer (B2B)
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 80 }}>
              {[imgAdmin1, imgAdmin2, imgAdmin3, imgAdmin4, imgAdmin5, imgAdmin6].map((img, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(109,109,111,0.1)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <img src={img} alt={`Admin screen ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))}
            </div>

            {/* What I Learned */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 64 }}>
              <h3 style={{ fontFamily: GB, ...fv, fontSize: "clamp(22px, 2.5vw, 32px)", color: GREEN, textAlign: "center", marginBottom: 40 }}>
                What I Learned
              </h3>
              <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  "Designing financial systems requires failure-first thinking",
                  "State architecture defines UX quality",
                  "Collaboration with backend is critical",
                  "Monitoring tools require clarity over aesthetics",
                ].map((item, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: GB, ...fv, fontSize: 18, color: MUTED, textAlign: "center", lineHeight: 1.5 }}>{item}</p>
                    {i < 3 && <div style={{ height: 1, background: "rgba(0,165,98,0.2)", marginTop: 24 }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
