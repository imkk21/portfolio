import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../lib/smooth";
import { Chars } from "../lib/text";
import { PROFILE } from "../data";
import Magnetic from "./Magnetic";

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useGSAP(() => {
    gsap.from(".contact-title .ch", { yPercent: 110, stagger: 0.03, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: ".contact-title", start: "top 80%" } });
  }, { scope: root });

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, ...Object.fromEntries(new FormData(form)), subject: "Portfolio inquiry" }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section ref={root} id="contact" className="wrap contact">
      <span className="sec-idx" data-reveal>06 — Contact</span>
      <h2 className="contact-title" style={{ marginTop: 16 }}>
        <span className="mask"><Chars text="Let's" /></span>
        <span className="mask"><Chars text="talk." /></span>
      </h2>

      <div className="contact-grid">
        <div data-reveal>
          <p className="sec-sub" style={{ marginBottom: 32 }}>Open to backend and full-stack roles, and interesting problems around data, APIs and infrastructure. I reply within a day.</p>
          <Magnetic><a href={`mailto:${PROFILE.email}`} className="contact-big link-u">{PROFILE.email}</a></Magnetic>
          <div className="contact-meta">
            <div><span className="label">Phone</span><a className="v link-u" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a></div>
            <div><span className="label">Based in</span><p className="v">{PROFILE.location}</p></div>
          </div>
        </div>

        <form className="form" onSubmit={submit} data-reveal>
          <div className="field"><label className="label" htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" placeholder="Your name" /></div>
          <div className="field"><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
          <div className="field"><label className="label" htmlFor="message">Message</label><textarea id="message" name="message" rows="4" required placeholder="What are you building?" /></div>
          <Magnetic>
            <button type="submit" className="btn btn-solid" disabled={status === "sending" || status === "sent"}>
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent — talk soon" : <>Send message <ArrowUpRight size={16} /></>}
            </button>
          </Magnetic>
          {status === "error" && <p className="form-msg" style={{ color: "#ff6b6b" }}>Couldn't send — email me directly instead.</p>}
        </form>
      </div>
    </section>
  );
}
