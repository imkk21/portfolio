import { MARQUEE } from "../data";

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t} <i>✦</i></span>)}
      </div>
    </div>
  );
}
