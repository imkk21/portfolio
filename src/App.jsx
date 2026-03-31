import { useState, useEffect, useRef } from "react";
import pfp from "./assets/pfp.jpg";


const PFP = "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";

const SKILLS = [
  { cat: "Languages",      items: ["Java","Python","JavaScript","TypeScript"], col: "#3b82f6" },
  { cat: "Frontend",       items: ["React","Next.js","React Native","Tailwind CSS"], col: "#8b5cf6" },
  { cat: "Backend",        items: ["Node.js","Laravel","FastAPI","REST APIs"], col: "#10b981" },
  { cat: "Databases",      items: ["MongoDB","PostgreSQL","MySQL","Firebase","Supabase"], col: "#f59e0b" },
  { cat: "DevOps & Tools", items: ["Docker","Redis","Git","Linux","Celery"], col: "#ef4444" },
];

const PROJECTS = [
  { name:"Insightify", emoji:"🔭", col:"#3b82f6",
    desc:"Pulls your GitHub activity, live weather & tech news, then uses Google Gemini AI to create a smart weekly developer digest.",
    stack:["React","Node.js","MongoDB","Firebase","Gemini AI","Vite","Tailwind"],
    link:"https://github.com/imkk21/Insightify", cta:"GitHub" },
  { name:"ShareItz", emoji:"⚡", col:"#8b5cf6",
    desc:"Paste text, get a shareable link instantly — no sign-ups, no friction. TypeScript-first, deployed globally on Vercel.",
    stack:["Next.js","TypeScript","Firebase","Tailwind CSS","Vercel"],
    link:"https://shareitz.vercel.app", cta:"Live Demo" },
  { name:"DevSync", emoji:"🔗", col:"#10b981",
    desc:"Real-time code collaboration — multiple developers write and edit code together, powered by Supabase and the Judge0 API.",
    stack:["Supabase","JavaScript","Judge0 API"],
    link:"https://github.com/imkk21/devsync", cta:"GitHub" },
  { name:"CityShop", emoji:"🛒", col:"#f59e0b",
    desc:"Mobile-first shopping app built with React Native — browse products, manage your cart, and log in securely.",
    stack:["React Native","Supabase","JavaScript","Android Studio"],
    link:"https://github.com/imkk21/cityshop", cta:"GitHub" },
  { name:"DocFlow", emoji:"📄", col:"#ef4444",
    desc:"Upload a doc, watch AI extract what matters, review and edit it, then export — with live progress via Redis Pub/Sub.",
    stack:["React","FastAPI","PostgreSQL","Celery","Redis","TypeScript","Docker"],
    link:"https://github.com/imkk21/dockflow", cta:"GitHub" },
];

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}

/* ────────────────────────────── NAV ────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About","Skills","Projects","Contact"];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:999,
      background: scrolled ? "rgba(15,17,26,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition:"all 0.3s ease",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(1rem,4vw,2.5rem)", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"#3b82f6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:800, color:"#fff", fontFamily:"'Inter',sans-serif" }}>KK</div>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"0.92rem", color:"#f1f5f9" }}>Kunal Kumar</span>
        </div>

        {/* Desktop links */}
        <div className="desk-nav" style={{ display:"flex", gap:"0.2rem", alignItems:"center" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"#94a3b8", textDecoration:"none", padding:"0.4rem 0.85rem", borderRadius:7, transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.target.style.color="#f1f5f9"; e.target.style.background="rgba(255,255,255,0.07)"; }}
              onMouseLeave={e=>{ e.target.style.color="#94a3b8"; e.target.style.background="transparent"; }}
            >{l}</a>
          ))}
          <a href="mailto:kunalkumar12350@gmail.com" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", fontWeight:600, color:"#fff", background:"#3b82f6", padding:"0.45rem 1.1rem", borderRadius:8, textDecoration:"none", marginLeft:"0.5rem", transition:"background 0.2s" }}
            onMouseEnter={e=>e.target.style.background="#2563eb"}
            onMouseLeave={e=>e.target.style.background="#3b82f6"}
          >Hire Me</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={()=>setMenuOpen(o=>!o)} className="hamburger" style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:6, flexDirection:"column", gap:5 }}>
          <span style={{ display:"block", width:22, height:2, background:"#94a3b8", borderRadius:2 }} />
          <span style={{ display:"block", width:22, height:2, background:"#94a3b8", borderRadius:2 }} />
          <span style={{ display:"block", width:22, height:2, background:"#94a3b8", borderRadius:2 }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background:"rgba(15,17,26,0.98)", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1rem clamp(1rem,4vw,2.5rem)" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ display:"block", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", color:"#94a3b8", textDecoration:"none", padding:"0.6rem 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{l}</a>
          ))}
          <a href="mailto:kunalkumar12350@gmail.com" style={{ display:"inline-block", fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#fff", background:"#3b82f6", padding:"0.6rem 1.4rem", borderRadius:8, textDecoration:"none", marginTop:"0.8rem" }}>Hire Me</a>
        </div>
      )}
    </nav>
  );
}

/* ────────────────────────────── HERO ────────────────────────────── */
function Hero() {
  const roles = ["Full Stack Developer","MERN Stack Engineer","Java Developer","Mobile App Builder"];
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [fwd, setFwd] = useState(true);

  useEffect(() => {
    const role = roles[idx];
    if (fwd) {
      if (chars < role.length) {
        const t = setTimeout(()=>setChars(c=>c+1), 60);
        return ()=>clearTimeout(t);
      } else {
        const t = setTimeout(()=>setFwd(false), 2000);
        return ()=>clearTimeout(t);
      }
    } else {
      if (chars > 0) {
        const t = setTimeout(()=>setChars(c=>c-1), 28);
        return ()=>clearTimeout(t);
      } else {
        setIdx(i=>(i+1)%roles.length);
        setFwd(true);
      }
    }
  }, [chars, fwd, idx]);

  return (
    <section id="about" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:"#0f1119",
      padding:"80px clamp(1rem,5vw,3rem) 60px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Subtle dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(59,130,246,0.12) 1px, transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none", opacity:0.6 }} />
      {/* Soft glow */}
      <div style={{ position:"absolute", top:"10%", right:"-5%", width:"40vw", height:"40vw", borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)", pointerEvents:"none", filter:"blur(30px)" }} />

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", gap:"clamp(2rem,6vw,5rem)", flexWrap:"wrap" }}>

        {/* LEFT */}
        <div style={{ flex:"1 1 340px", minWidth:0, animation:"fadeUp 0.8s ease both" }}>
          {/* Green badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.22)", borderRadius:100, padding:"0.32rem 0.85rem", marginBottom:"1.8rem" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", fontWeight:600, color:"#10b981", letterSpacing:"0.05em" }}>Open to Opportunities</span>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"clamp(2.6rem,7vw,5.2rem)", lineHeight:1.0, letterSpacing:"-0.03em", color:"#f1f5f9", margin:"0 0 1rem" }}>
            Kunal<br />
            <span style={{ color:"#3b82f6" }}>Kumar</span>
          </h1>

          {/* Typewriter */}
          <div style={{ height:"1.7rem", display:"flex", alignItems:"center", marginBottom:"1.4rem" }}>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.92rem,2vw,1.1rem)", color:"#64748b", fontWeight:500 }}>
              {roles[idx].slice(0,chars)}
              <span style={{ borderRight:"2px solid #3b82f6", animation:"blink 0.8s step-end infinite", paddingLeft:1 }} />
            </span>
          </div>

          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(0.9rem,1.6vw,1rem)", color:"#64748b", lineHeight:1.85, maxWidth:480, margin:"0 0 2rem", fontWeight:400 }}>
            I build scalable web and mobile apps using the MERN stack, Java, and modern tools. Clean code, solid APIs, and software that works reliably.
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", marginBottom:"2rem" }}>
            <a href="#projects" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#fff", background:"#3b82f6", padding:"0.75rem 1.8rem", borderRadius:9, textDecoration:"none", transition:"background 0.2s, transform 0.15s" }}
              onMouseEnter={e=>{ e.target.style.background="#2563eb"; e.target.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.target.style.background="#3b82f6"; e.target.style.transform="none"; }}
            >View Projects ↓</a>
            <a href="https://github.com/imkk21" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#94a3b8", border:"1px solid rgba(148,163,184,0.2)", background:"transparent", padding:"0.75rem 1.8rem", borderRadius:9, textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="#f1f5f9"; e.currentTarget.style.borderColor="rgba(241,245,249,0.3)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.borderColor="rgba(148,163,184,0.2)"; }}
            >GitHub ↗</a>
            <a href="https://linkedin.com/in/kunal-kumar-a7176219b" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:600, color:"#94a3b8", border:"1px solid rgba(148,163,184,0.2)", background:"transparent", padding:"0.75rem 1.8rem", borderRadius:9, textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.color="#f1f5f9"; e.currentTarget.style.borderColor="rgba(241,245,249,0.3)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.borderColor="rgba(148,163,184,0.2)"; }}
            >LinkedIn ↗</a>
          </div>

          {/* Tech tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
            {["MERN Stack","Java","Docker","React Native","PostgreSQL","Cybersecurity"].map(t=>(
              <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.67rem", fontWeight:500, color:"#475569", border:"1px solid rgba(71,85,105,0.3)", borderRadius:5, padding:"0.2rem 0.6rem", letterSpacing:"0.03em" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT – PHOTO (no overlapping badges, clean card) */}
        <div style={{ flex:"0 0 auto", display:"flex", justifyContent:"center", animation:"fadeUp 0.85s 0.1s ease both" }}>
          <div style={{ position:"relative" }}>
            {/* Photo card */}
            <div style={{
              width:"clamp(220px,28vw,290px)",
              borderRadius:20,
              overflow:"hidden",
              border:"2px solid rgba(59,130,246,0.25)",
              boxShadow:"0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)",
              background:"#1e2432",
            }}>
              <img
                src={pfp}
                alt="Kunal Kumar"
                style={{ width:"100%", aspectRatio:"4/5", objectFit:"cover", objectPosition:"center top", display:"block" }}
              />
              {/* Name overlay at bottom of photo */}
              <div style={{ padding:"1rem 1.1rem 1.1rem", background:"#161b27" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"1rem", color:"#f1f5f9", marginBottom:3 }}>Kunal Kumar</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"#3b82f6", fontWeight:600, letterSpacing:"0.06em" }}>FULL STACK DEVELOPER</div>
              </div>
            </div>

            {/* Single info badge – bottom right corner, no overlap */}
            <div style={{
              position:"absolute", bottom:-12, right:-12,
              background:"#161b27",
              border:"1px solid rgba(59,130,246,0.25)",
              borderRadius:10, padding:"0.5rem 0.8rem",
              boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.58rem", fontWeight:700, color:"#3b82f6", letterSpacing:"0.1em", marginBottom:2 }}>PROJECTS</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:800, color:"#f1f5f9" }}>5+  🚀</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────── SKILLS ────────────────────────────── */
function Skills() {
  const [ref, vis] = useVisible();
  return (
    <section id="skills" ref={ref} style={{ background:"#0c0e16", padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <SectionLabel num="02" text="Skills" col="#3b82f6" vis={vis} />
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"clamp(2rem,4.5vw,3.2rem)", color:"#f1f5f9", margin:"0.3rem 0 2.8rem", letterSpacing:"-0.03em", opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"all 0.6s ease" }}>
          Technical Arsenal
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", gap:"0.9rem" }}>
          {SKILLS.map((g,i)=>(
            <div key={g.cat} style={{
              background:"#161b27", border:`1px solid ${g.col}22`,
              borderRadius:14, padding:"1.4rem",
              opacity:vis?1:0, transform:vis?"none":"translateY(18px)",
              transition:`opacity 0.55s ${i*0.07}s, transform 0.55s ${i*0.07}s`,
              position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:g.col, borderRadius:"14px 14px 0 0" }} />
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem", fontWeight:700, color:g.col, letterSpacing:"0.14em", textTransform:"uppercase", margin:"0 0 0.85rem" }}>{g.cat}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.38rem" }}>
                {g.items.map(item=>(
                  <span key={item} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:500, color:"#94a3b8", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, padding:"0.24rem 0.55rem" }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── PROJECTS ────────────────────────────── */
function ProjCard({ p, i, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      background: hov ? `${p.col}08` : "#161b27",
      border:`1px solid ${hov ? p.col+"40" : "rgba(255,255,255,0.07)"}`,
      borderRadius:16, padding:"1.6rem",
      opacity:vis?1:0, transform:vis?"none":"translateY(20px)",
      transition:`opacity 0.6s ${i*0.08}s, transform 0.6s ${i*0.08}s, background 0.25s, border 0.25s`,
      display:"flex", flexDirection:"column", gap:"0.85rem",
      position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:p.col, opacity: hov?1:0.35, transition:"opacity 0.25s", borderRadius:"16px 16px 0 0" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{ fontSize:"1.7rem", lineHeight:1 }}>{p.emoji}</span>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.67rem", fontWeight:700, color:p.col, border:`1px solid ${p.col}44`, borderRadius:6, padding:"0.28rem 0.7rem", textDecoration:"none", letterSpacing:"0.04em", transition:"background 0.2s" }}
          onMouseEnter={e=>e.target.style.background=`${p.col}18`}
          onMouseLeave={e=>e.target.style.background="transparent"}
        >{p.cta} ↗</a>
      </div>

      <div>
        <h3 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#f1f5f9", margin:"0 0 0.5rem", letterSpacing:"-0.02em" }}>{p.name}</h3>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", color:"#64748b", margin:0, lineHeight:1.75 }}>{p.desc}</p>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem", marginTop:"auto" }}>
        {p.stack.map(t=>(
          <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.6rem", fontWeight:600, color:"#475569", background:"rgba(71,85,105,0.15)", border:"1px solid rgba(71,85,105,0.2)", borderRadius:4, padding:"0.16rem 0.48rem" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [ref, vis] = useVisible();
  return (
    <section id="projects" ref={ref} style={{ background:"#0f1119", padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <SectionLabel num="03" text="Projects" col="#8b5cf6" vis={vis} />
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"clamp(2rem,4.5vw,3.2rem)", color:"#f1f5f9", margin:"0.3rem 0 2.8rem", letterSpacing:"-0.03em", opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"all 0.6s ease" }}>
          Things I've Built
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(290px,1fr))", gap:"1rem" }}>
          {PROJECTS.map((p,i)=><ProjCard key={p.name} p={p} i={i} vis={vis} />)}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── CONTACT ────────────────────────────── */
function Contact() {
  const [ref, vis] = useVisible();
  const items = [
    { label:"Email",    val:"kunalkumar12350@gmail.com", href:"mailto:kunalkumar12350@gmail.com", col:"#3b82f6" },
    { label:"Phone",    val:"+91 8619045960",            href:"tel:+918619045960",               col:"#8b5cf6" },
    { label:"GitHub",   val:"github.com/imkk21",         href:"https://github.com/imkk21",       col:"#10b981" },
    { label:"LinkedIn", val:"linkedin.com/in/kunal-kumar", href:"https://linkedin.com/in/kunal-kumar-a7176219b", col:"#f59e0b" },
  ];
  return (
    <section id="contact" ref={ref} style={{ background:"#0c0e16", padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <SectionLabel num="04" text="Contact" col="#3b82f6" vis={vis} centered />
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:"clamp(2rem,4.5vw,3.2rem)", color:"#f1f5f9", textAlign:"center", margin:"0.3rem 0 0.8rem", letterSpacing:"-0.03em", opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"all 0.6s ease" }}>
          Let's Work Together
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", color:"#64748b", textAlign:"center", lineHeight:1.8, margin:"0 0 3rem", opacity:vis?1:0, transition:"opacity 0.6s 0.15s" }}>
          Open to roles, freelance work, or interesting collaborations. Reach out anytime.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:"0.85rem" }}>
          {items.map((c,i)=>(
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{
              display:"flex", alignItems:"center", gap:"0.85rem",
              background:"#161b27", border:`1px solid ${c.col}20`,
              borderRadius:12, padding:"1.2rem 1.4rem", textDecoration:"none",
              opacity:vis?1:0, transform:vis?"none":"translateY(14px)",
              transition:`opacity 0.55s ${i*0.08}s, transform 0.55s ${i*0.08}s, background 0.2s, border 0.2s`,
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background=`${c.col}0d`; e.currentTarget.style.borderColor=`${c.col}45`; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#161b27"; e.currentTarget.style.borderColor=`${c.col}20`; }}
            >
              <div style={{ width:38, height:38, borderRadius:9, background:`${c.col}14`, border:`1px solid ${c.col}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1rem" }}>
                {c.label==="Email"?"✉":c.label==="Phone"?"📱":c.label==="GitHub"?"⌨":"🔗"}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.6rem", fontWeight:700, color:c.col, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:3 }}>{c.label}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.8rem", color:"#94a3b8", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── FOOTER ────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:"#0c0e16", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"1.6rem clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.7rem" }}>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"#334155" }}>© 2025 Kunal Kumar · All rights reserved</span>
        <div style={{ display:"flex", gap:"1.4rem" }}>
          {[["GitHub","https://github.com/imkk21"],["LinkedIn","https://linkedin.com/in/kunal-kumar-a7176219b"],["Email","mailto:kunalkumar12350@gmail.com"]].map(([l,h])=>(
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"#334155", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>e.target.style.color="#3b82f6"}
              onMouseLeave={e=>e.target.style.color="#334155"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────── SECTION LABEL ────────────────────────────── */
function SectionLabel({ num, text, col, vis, centered=false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"0.4rem", justifyContent: centered?"center":"flex-start", opacity:vis?1:0, transition:"opacity 0.5s" }}>
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem", fontWeight:700, color:col, letterSpacing:"0.18em", textTransform:"uppercase" }}>{num} — {text}</span>
      {!centered && <div style={{ height:1, flex:1, background:`linear-gradient(to right, ${col}40, transparent)` }} />}
    </div>
  );
}

/* ────────────────────────────── ROOT ────────────────────────────── */
export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0f1119; color: #f1f5f9; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(59,130,246,0.25); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0c0e16; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 8px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes pulse {
          0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          50%      { opacity:0.75; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }

        /* Responsive: hide desktop nav, show hamburger on mobile */
        @media (max-width: 700px) {
          .desk-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }

        /* Hero wrap on mobile */
        @media (max-width: 640px) {
          #about > div > div:first-child { order: 2; }
          #about > div > div:last-child { order: 1; }
        }
      `}</style>
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
