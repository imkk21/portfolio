import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../lib/smooth";
import { PROFILE } from "../data";

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState("idle");

  useGSAP(() => {
    gsap.from(".contact-panel", { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%" } });
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
    <section ref={root} id="contact">
      <div className="wrap">
        <div className="contact-panel panel">
          <div className="contact-grid">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="contact-h">Let&apos;s build <em>something solid.</em></h2>
              <p>Open to backend and full-stack roles, and to interesting problems around data, APIs and infrastructure. I reply within a day.</p>
              <a href={`mailto:${PROFILE.email}`} className="contact-mail link-u" style={{ marginTop: 28 }}>{PROFILE.email}</a>
              <div className="contact-meta">
                <div><span className="label">Phone</span><a className="v link-u" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a></div>
                <div><span className="label">Location</span><p className="v">{PROFILE.location}</p></div>
              </div>
            </div>

            <form className="form" onSubmit={submit}>
              <div className="field"><label className="label" htmlFor="name">Name</label><input id="name" name="name" required autoComplete="name" placeholder="Your name" /></div>
              <div className="field"><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
              <div className="field"><label className="label" htmlFor="message">Message</label><textarea id="message" name="message" rows="4" required placeholder="What are you building?" /></div>
              <button type="submit" className="btn btn-solid" disabled={status === "sending" || status === "sent"}>
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent — talk soon" : <>Send message <ArrowUpRight size={15} /></>}
              </button>
              {status === "error" && <p className="form-msg" style={{ color: "#ff7a7a" }}>Couldn&apos;t send — email me directly instead.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
