import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { ScrollTrigger, useGSAP } from "../lib/smooth";
import { ENDPOINTS } from "../data";

const body = (e) => JSON.stringify(e.response, null, 2);

// A mock request/response console. Everything is local — it illustrates the shape
// of the APIs I build rather than calling a real server.
export default function ApiConsole() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("done"); // idle | sending | done
  const [typed, setTyped] = useState(body(ENDPOINTS[0]));
  const [ms, setMs] = useState(ENDPOINTS[0].ms);
  const timers = useRef([]);
  const ep = ENDPOINTS[active];

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clear, []);

  const run = (i = active) => {
    clear();
    setActive(i);
    setPhase("sending");
    setTyped("");
    setMs(0);
    const target = ENDPOINTS[i];
    const text = body(target);
    // fake round-trip, then stream the payload in
    timers.current.push(setTimeout(() => {
      setPhase("done");
      let n = 0;
      const step = () => {
        n += Math.max(2, Math.round(text.length / 90));
        setTyped(text.slice(0, n));
        if (n < text.length) timers.current.push(setTimeout(step, 12));
      };
      step();
      let t = 0;
      const tick = () => { t += 3; setMs(Math.min(t, target.ms)); if (t < target.ms) timers.current.push(setTimeout(tick, 10)); };
      tick();
    }, 420));
  };

  // Replay the first call when the section scrolls into view.
  useGSAP(() => {
    ScrollTrigger.create({ trigger: root.current, start: "top 70%", once: true, onEnter: () => run(0) });
  }, { scope: root });

  return (
    <section ref={root} id="api" className="wrap">
      <div className="sec-head" data-reveal>
        <span className="sec-idx">03 — The work, live</span>
        <h2 className="sec-title">API <em>console.</em></h2>
        <p className="sec-sub">A sketch of the endpoints I build day to day. Pick one and send it — responses are mocked locally, the shapes are real.</p>
      </div>

      <div className="console" data-reveal>
        <aside className="console-routes">
          {ENDPOINTS.map((e, i) => (
            <button key={e.path} className={`route ${i === active ? "on" : ""}`} onClick={() => run(i)}>
              <span className={`verb v-${e.method.toLowerCase()}`}>{e.method}</span>
              <span className="path">{e.path}</span>
              <span className="note">{e.note}</span>
            </button>
          ))}
        </aside>

        <div className="console-main">
          <div className="console-bar">
            <span className={`verb v-${ep.method.toLowerCase()}`}>{ep.method}</span>
            <code className="url">api.attrivo.dev{ep.path}</code>
            <button className="send" onClick={() => run()}><Play size={12} /> Send</button>
          </div>

          <div className="console-meta">
            <span className={`dot ${phase === "done" ? "ok" : ""}`} />
            <span>{phase === "sending" ? "Sending…" : "200 OK"}</span>
            <span className="sep">·</span>
            <span>{ms} ms</span>
            <span className="sep">·</span>
            <span>{ep.engine}</span>
          </div>

          <pre className="console-body"><code>{phase === "sending" ? "" : typed}<span className="caret" /></code></pre>
        </div>
      </div>
    </section>
  );
}
