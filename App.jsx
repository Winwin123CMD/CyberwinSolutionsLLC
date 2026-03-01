import { useState, useEffect, useRef } from "react";

const SECTIONS = ["Home", "About", "Services", "Sectors", "Results", "Contact"];

// ─── Intersection Observer Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stat Counter ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [ref, visible] = useInView(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Navigation ───
function Nav({ active, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,14,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#Home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #00E0A0, #00B4D8)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: "#0A0A0E" }}>C</span>
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.02em" }}>CYBERWIN</span>
        </a>
        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {SECTIONS.map(s => (
            <a key={s} href={`#${s}`} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.06em",
              textTransform: "uppercase", textDecoration: "none",
              color: active === s ? "#00E0A0" : "rgba(255,255,255,0.65)",
              transition: "color 0.25s",
            }}>{s}</a>
          ))}
          <a href="#Contact" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
            textTransform: "uppercase", textDecoration: "none", color: "#0A0A0E",
            background: "linear-gradient(135deg, #00E0A0, #00B4D8)", padding: "10px 24px",
            borderRadius: 6, transition: "opacity 0.25s",
          }}>Get Started</a>
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-toggle" style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, opacity: mobileOpen ? 0 : 1, transition: "all 0.3s" }} />
          <div style={{ width: 24, height: 2, background: "#fff", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: "rgba(10,10,14,0.98)", padding: "24px 40px 32px", display: "flex", flexDirection: "column", gap: 20 }} className="mobile-menu">
          {SECTIONS.map(s => (
            <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, textDecoration: "none",
              color: active === s ? "#00E0A0" : "rgba(255,255,255,0.7)",
            }}>{s}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ───
function Hero() {
  return (
    <section id="Home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      background: "linear-gradient(165deg, #0A0A0E 0%, #0F1923 50%, #0A0A0E 100%)",
    }}>
      {/* Decorative grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Accent glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(0,224,160,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(0,180,216,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Diagonal accent bar */}
      <div style={{ position: "absolute", top: 0, right: "12%", width: 4, height: "45%", background: "linear-gradient(to bottom, #00E0A0, transparent)", opacity: 0.3 }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "140px 40px 80px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: 820 }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(0,224,160,0.08)", border: "1px solid rgba(0,224,160,0.2)", borderRadius: 100, padding: "8px 20px 8px 14px", marginBottom: 32 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E0A0", boxShadow: "0 0 12px #00E0A0" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#00E0A0", letterSpacing: "0.04em", textTransform: "uppercase" }}>GSA Schedule Contract Holder</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5.5vw, 76px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
              Enterprise IT Solutions Built on{" "}
              <span style={{ background: "linear-gradient(135deg, #00E0A0, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trust</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 1.3vw, 20px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 620, margin: "28px 0 44px", fontWeight: 400 }}>
              Mission-critical information technology services for government agencies, academic institutions, and Fortune 500 enterprises. Infrastructure modernization, cybersecurity, and digital transformation—delivered with excellence.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#Contact" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#0A0A0E",
                background: "linear-gradient(135deg, #00E0A0, #00B4D8)", padding: "16px 36px",
                borderRadius: 6, textDecoration: "none", letterSpacing: "0.01em",
                boxShadow: "0 0 40px rgba(0,224,160,0.2)", transition: "transform 0.25s, box-shadow 0.25s",
              }}>Schedule a Consultation</a>
              <a href="#Services" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#fff",
                border: "1px solid rgba(255,255,255,0.15)", padding: "16px 36px",
                borderRadius: 6, textDecoration: "none", letterSpacing: "0.01em",
                transition: "border-color 0.25s",
              }}>View Capabilities →</a>
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.45}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, marginTop: 80, background: "rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
            {[
              { val: 500, suffix: "+", label: "Successful Implementations" },
              { val: 99, suffix: ".9%", label: "Uptime Guarantee" },
              { val: 24, suffix: "/7", label: "Support Coverage" },
              { val: 85, suffix: "%", label: "Faster Threat Detection" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", padding: "32px 28px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, background: "linear-gradient(135deg, #00E0A0, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Counter end={s.val} />{s.suffix.replace(/^\d*/, "")}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 8, letterSpacing: "0.03em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── About ───
function About() {
  const commitments = [
    { icon: "◆", title: "Operational Excellence", desc: "Industry-leading service delivery backed by certified professionals." },
    { icon: "◇", title: "Strategic Partnership", desc: "Long-term relationships built on transparency, accountability, and results." },
    { icon: "▣", title: "Compliance-First", desc: "Full adherence to federal regulations, industry frameworks, and security protocols." },
    { icon: "△", title: "Scalable Architecture", desc: "Solutions designed to grow with your organization's evolving needs." },
  ];
  return (
    <section id="About" style={{ background: "#fff", padding: "120px 40px", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="about-grid">
          <div>
            <FadeIn>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B4D8" }}>About Cyberwin</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, color: "#0A0A0E", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 0" }}>
                Technology Partner for Organizations That Demand the Highest Standards
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.75, margin: "28px 0 0" }}>
                Since our founding, we have built a reputation for delivering complex technology solutions that meet the rigorous requirements of government compliance, academic research environments, and enterprise-scale commercial operations.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.75, margin: "20px 0 0" }}>
                Our team combines deep technical expertise with a client-first philosophy, ensuring every engagement results in measurable outcomes and lasting partnerships.
              </p>
            </FadeIn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {commitments.map((c, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  background: "#F7F8FA", borderRadius: 12, padding: "32px 24px",
                  borderLeft: "3px solid #00E0A0", height: "100%",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}>
                  <div style={{ fontSize: 20, color: "#00B4D8", marginBottom: 14 }}>{c.icon}</div>
                  <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#0A0A0E", margin: "0 0 8px" }}>{c.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#777", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Certifications ribbon */}
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 80, padding: "40px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "32px 48px", alignItems: "center" }}>
              {["ISO 27001", "SOC 2 Type II", "CMMC Level 3", "AWS Partner", "Microsoft Gold", "FedRAMP", "NIST CSF"].map((c, i) => (
                <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#999", letterSpacing: "0.06em", textTransform: "uppercase" }}>{c}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Services ───
function Services() {
  const [active, setActive] = useState(0);
  const services = [
    {
      title: "Infrastructure & Cloud",
      desc: "Design, deployment, and management of hybrid cloud environments, on-premises infrastructure, and multi-cloud strategies with 99.9%+ uptime.",
      items: ["Cloud Migration & Optimization", "Infrastructure as Code", "Disaster Recovery & Business Continuity", "Network Modernization", "Virtualization & Containerization"],
    },
    {
      title: "Cybersecurity & Compliance",
      desc: "Comprehensive security solutions to protect critical assets, ensure regulatory compliance, and maintain operational continuity.",
      items: ["Security Operations Center (SOC)", "Penetration Testing & Assessments", "NIST, FedRAMP, FISMA Compliance", "Identity & Access Management", "Incident Response & Forensics"],
    },
    {
      title: "Digital Transformation",
      desc: "Strategic technology consulting that modernizes operations, enhances user experiences, and drives measurable business outcomes.",
      items: ["Enterprise Application Development", "Legacy System Modernization", "Workflow Automation", "Data Analytics & BI", "AI/ML Strategy & Implementation"],
    },
    {
      title: "Managed IT Services",
      desc: "Proactive, around-the-clock support allowing your team to focus on core mission objectives.",
      items: ["24/7/365 Helpdesk & Support", "Server & Endpoint Management", "Patch Management & Updates", "Performance Monitoring", "IT Asset Lifecycle Management"],
    },
  ];

  return (
    <section id="Services" style={{ background: "#0A0A0E", padding: "120px 40px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00E0A0, transparent)", opacity: 0.3 }} />
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00E0A0" }}>Core Competencies</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 48px" }}>
            End-to-End Technology Services
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 48 }} className="services-grid">
          {/* Tabs */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {services.map((s, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: active === i ? 600 : 400,
                  color: active === i ? "#fff" : "rgba(255,255,255,0.4)",
                  background: active === i ? "rgba(0,224,160,0.08)" : "transparent",
                  border: "none", borderLeft: active === i ? "3px solid #00E0A0" : "3px solid transparent",
                  padding: "18px 24px", textAlign: "left", cursor: "pointer",
                  borderRadius: "0 8px 8px 0", transition: "all 0.3s",
                }}>
                  {s.title}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.15}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "48px 44px",
            }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                {services[active].title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 32px" }}>
                {services[active].desc}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="services-items-grid">
                {services[active].items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #00E0A0, #00B4D8)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.75)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Sectors ───
function Sectors() {
  const sectors = [
    {
      title: "Government & Public Sector",
      desc: "Strict security protocols, compliance mandates, and budget accountability for federal, state, and local agencies.",
      tags: ["FedRAMP", "NIST 800-53", "FISMA", "Section 508", "Secure Comms"],
    },
    {
      title: "Higher Education & Research",
      desc: "Technology solutions that enhance learning outcomes, protect research data, and streamline administration.",
      tags: ["LMS Integration", "Research Computing", "Campus Networks", "FERPA Compliance"],
    },
    {
      title: "Enterprise & Commercial",
      desc: "Enterprise-grade IT driving competitive advantage, efficiency, and innovation across industries.",
      tags: ["ERP/CRM", "DevOps & CI/CD", "Multi-Site Networks", "Digital Workplace"],
    },
  ];

  return (
    <section id="Sectors" style={{ background: "#F7F8FA", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B4D8" }}>Industries</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, color: "#0A0A0E", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 0" }}>
              Sectors We Serve
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="sectors-grid">
          {sectors.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: "#fff", borderRadius: 16, padding: "44px 36px", height: "100%",
                border: "1px solid #eee", position: "relative", overflow: "hidden",
                transition: "box-shadow 0.4s, transform 0.4s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ width: "100%", height: 3, background: "linear-gradient(90deg, #00E0A0, #00B4D8)", position: "absolute", top: 0, left: 0 }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: "#0A0A0E", margin: "0 0 16px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.7, margin: "0 0 28px" }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.tags.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                      color: "#00B4D8", background: "rgba(0,180,216,0.06)", border: "1px solid rgba(0,180,216,0.15)",
                      padding: "6px 14px", borderRadius: 100,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Results ───
function Results() {
  const cases = [
    {
      label: "Federal Agency",
      title: "Infrastructure Modernization",
      challenge: "Legacy on-premises infrastructure limiting agility and increasing security risks.",
      solution: "Phased migration to FedRAMP-authorized cloud with zero downtime.",
      results: [
        { val: "40%", label: "Cost Reduction" },
        { val: "99.98%", label: "Uptime Achieved" },
        { val: "100%", label: "FISMA Compliance" },
      ],
    },
    {
      label: "University",
      title: "Research Network Upgrade",
      challenge: "Insufficient bandwidth and security for expanding research programs.",
      solution: "Next-gen campus network with segmented research zones and advanced threat protection.",
      results: [
        { val: "10Gbps", label: "Network Speed" },
        { val: "100%", label: "NSF Audit Pass" },
        { val: "3x", label: "Collaboration Boost" },
      ],
    },
    {
      label: "Enterprise",
      title: "Security Operations Center",
      challenge: "Growing cyber threats without adequate detection and response.",
      solution: "24/7 managed SOC with SIEM, threat intelligence, and IR playbooks.",
      results: [
        { val: "85%", label: "Faster Detection" },
        { val: "0", label: "Breaches in 18mo" },
        { val: "24/7", label: "Coverage" },
      ],
    },
  ];

  return (
    <section id="Results" style={{ background: "#fff", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B4D8" }}>Proven Impact</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, color: "#0A0A0E", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 56px" }}>
            Client Success Stories
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: "#F7F8FA", borderRadius: 16, padding: "44px 48px",
                border: "1px solid #eee", display: "grid",
                gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
              }} className="case-grid">
                <div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00E0A0", background: "rgba(0,224,160,0.08)", padding: "5px 12px", borderRadius: 4 }}>{c.label}</span>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 700, color: "#0A0A0E", margin: "16px 0 12px", letterSpacing: "-0.02em" }}>{c.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.65, margin: "0 0 8px" }}><strong style={{ color: "#555" }}>Challenge:</strong> {c.challenge}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.65, margin: 0 }}><strong style={{ color: "#555" }}>Solution:</strong> {c.solution}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {c.results.map((r, j) => (
                    <div key={j} style={{ textAlign: "center", background: "#fff", borderRadius: 12, padding: "24px 16px", border: "1px solid #eee" }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg, #00E0A0, #00B4D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{r.val}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ───
function Process() {
  const steps = [
    { num: "01", title: "Discovery & Assessment", desc: "Comprehensive analysis of your environment, objectives, and technical requirements." },
    { num: "02", title: "Strategic Planning", desc: "Detailed roadmaps, architecture designs, and implementation plans with clear milestones." },
    { num: "03", title: "Implementation", desc: "Phased deployment using proven methodologies, minimizing disruption." },
    { num: "04", title: "Training & Transfer", desc: "Comprehensive training to ensure your team can effectively manage deployed solutions." },
    { num: "05", title: "Ongoing Optimization", desc: "Continuous monitoring, tuning, and proactive improvements to maximize ROI." },
  ];

  return (
    <section style={{ background: "#0A0A0E", padding: "120px 40px", position: "relative" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00E0A0" }}>Our Methodology</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 0" }}>
              How We Deliver
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, position: "relative" }} className="process-grid">
          {/* Connecting line */}
          <div style={{ position: "absolute", top: 40, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,224,160,0.3), transparent)" }} className="process-line" />
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(0,224,160,0.15), rgba(0,180,216,0.15))",
                  border: "1px solid rgba(0,224,160,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#00E0A0" }}>{s.num}</span>
                </div>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{s.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Why Section ───
function WhySection() {
  const reasons = [
    { title: "Certified Expertise", desc: "CISSP, CISM, AWS SA, Azure Admin, PMP, ITIL, and TS/SCI clearances." },
    { title: "Vendor-Neutral", desc: "Recommendations based solely on your requirements—not vendor partnerships." },
    { title: "Rapid Response", desc: "24/7 support infrastructure with enterprise-class escalation protocols." },
    { title: "Security-First Culture", desc: "Every solution adheres to security-by-design with defense-in-depth." },
  ];

  return (
    <section style={{ background: "linear-gradient(165deg, #0F1923, #0A0A0E)", padding: "120px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(0,224,160,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="why-grid">
          <FadeIn>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00E0A0" }}>Why Cyberwin</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 28px" }}>
                Trusted by Organizations That Can't Afford Downtime
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 36px" }}>
                With hundreds of successful implementations across federal, state, and commercial sectors, we bring battle-tested methodologies and real-world experience to every engagement.
              </p>
              <a href="#Contact" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#0A0A0E",
                background: "linear-gradient(135deg, #00E0A0, #00B4D8)", padding: "16px 36px",
                borderRadius: 6, textDecoration: "none", display: "inline-block",
              }}>Partner With Us →</a>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {reasons.map((r, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12, padding: "28px 24px",
                }}>
                  <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{r.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───
function Contact() {
  return (
    <section id="Contact" style={{ background: "#fff", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="contact-grid">
          <FadeIn>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00B4D8" }}>Get In Touch</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 800, color: "#0A0A0E", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "16px 0 28px" }}>
                Ready to Transform Your Technology?
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#777", lineHeight: 1.7, margin: "0 0 40px" }}>
                Our team of senior consultants is available to provide complimentary assessments and strategic recommendations tailored to your organization.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { label: "Email", value: "info@cyberwinsolutions.com" },
                  { label: "Hours", value: "Mon–Fri 8AM–6PM EST" },
                  { label: "Support", value: "24/7 Emergency Available" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,224,160,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E0A0" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#333", fontWeight: 500, marginTop: 2 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{
              background: "#F7F8FA", borderRadius: 16, padding: "44px 40px",
              border: "1px solid #eee",
            }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#0A0A0E", margin: "0 0 28px" }}>Request a Consultation</h3>
              {["Full Name", "Work Email", "Organization", "Phone Number"].map((f, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 6 }}>{f}</label>
                  <input type={f === "Work Email" ? "email" : "text"} placeholder={f} style={{
                    width: "100%", padding: "13px 16px", border: "1px solid #ddd", borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#333",
                    outline: "none", transition: "border-color 0.25s", background: "#fff",
                    boxSizing: "border-box",
                  }} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 6 }}>How can we help?</label>
                <textarea rows={4} placeholder="Describe your technology challenges or project requirements..." style={{
                  width: "100%", padding: "13px 16px", border: "1px solid #ddd", borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#333", resize: "vertical",
                  outline: "none", background: "#fff", boxSizing: "border-box",
                }} />
              </div>
              <button style={{
                width: "100%", padding: "16px", border: "none", borderRadius: 8,
                background: "linear-gradient(135deg, #00E0A0, #00B4D8)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#0A0A0E",
                cursor: "pointer", transition: "opacity 0.25s",
              }}>Submit Request</button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer style={{ background: "#0A0A0E", padding: "64px 40px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #00E0A0, #00B4D8)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: "#0A0A0E" }}>C</span>
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>CYBERWIN</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 320 }}>
              Enterprise IT Services for Government, Education, and Commercial organizations. Building trust through technology excellence.
            </p>
          </div>
          {[
            { title: "Services", links: ["Cloud & Infrastructure", "Cybersecurity", "Digital Transformation", "Managed IT"] },
            { title: "Sectors", links: ["Government", "Higher Education", "Enterprise"] },
            { title: "Company", links: ["About", "Careers", "Resources", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>{col.title}</h4>
              {col.links.map((l, j) => (
                <a key={j} href="#" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 12, transition: "color 0.25s" }}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2024 Cyberwin Solutions. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Security"].map((l, i) => (
              <a key={i} href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function CyberwinSolutions() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Determine active section
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0A0A0E", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .mobile-toggle { display: none !important; }
        .mobile-menu { display: none !important; }
        input:focus, textarea:focus { border-color: #00B4D8 !important; }
        button:hover { opacity: 0.9; }
        a:hover { opacity: 0.85; }

        @media (max-width: 1024px) {
          .about-grid, .services-grid, .why-grid, .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .case-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .process-line { display: none !important; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .mobile-menu { display: flex !important; }
          .sectors-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .services-items-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav active={activeSection} scrolled={scrolled} />
      <Hero />
      <About />
      <Services />
      <Sectors />
      <Results />
      <Process />
      <WhySection />
      <Contact />
      <Footer />
    </div>
  );
}
