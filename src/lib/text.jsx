// Splits text into animatable spans. Wrap in an element with overflow:hidden for mask reveals.
export function Chars({ text }) {
  return (
    <span aria-label={text} role="text">
      {text.split("").map((c, i) => (
        <span key={i} className="ch" aria-hidden="true">{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}

export function Words({ text }) {
  return text.split(" ").map((w, i) => (
    <span key={i}><span className="wd">{w}</span>{" "}</span>
  ));
}
