import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ICONS from "../lib/icons.json";

const R = 2.9;

// Icon positions never change, so compute them once.
const LAYOUT = ICONS.map((node, i) => {
  const y = 1 - (i / (ICONS.length - 1)) * 2;
  const rad = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return { node, pos: [Math.cos(theta) * rad * R, y * R, Math.sin(theta) * rad * R] };
});

// Renders one icon (vector path or wordmark) to a canvas we can use as a sprite map.
function makeTexture(node, mode) {
  const S = 168, PAD = 8, BOX = S - PAD * 2;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d");
  const lit = mode !== "dim";

  ctx.fillStyle = lit ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.045)";
  ctx.strokeStyle = lit ? node.hex + "88" : "rgba(255,255,255,0.10)";
  ctx.lineWidth = lit ? 3 : 2;
  ctx.beginPath();
  ctx.roundRect(PAD, PAD, BOX, BOX, 38);
  ctx.fill();
  ctx.stroke();

  // Brand colour when lit, muted grey when dim.
  ctx.fillStyle = lit ? node.hex : "rgba(255,255,255,0.5)";
  const G = 92;
  if (node.text) {
    ctx.font = "600 40px Geist, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.text, S / 2, S / 2 + 1);
  } else {
    ctx.save();
    ctx.translate((S - G) / 2, (S - G) / 2);
    ctx.scale(G / 24, G / 24);
    ctx.fill(new Path2D(node.d));
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

// Shortest signed angle from a to b.
const shortest = (a, b) => {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

function Scene({ focus, onHover, accent }) {
  const group = useRef(null);
  const spin = useRef(0.0022);
  const drag = useRef(null);
  const tiltV = useRef(0);
  const { gl } = useThree();

  const items = useMemo(
    () => LAYOUT.map(({ node, pos }) => ({ node, pos, dim: makeTexture(node, "dim"), lit: makeTexture(node, "lit") })),
    []
  );

  // Where the group must rotate so the focused icon faces the camera.
  const target = useMemo(() => {
    if (!focus) return null;
    const hit = LAYOUT.find((l) => l.node.label === focus);
    if (!hit) return null;
    const [x, y, z] = hit.pos;
    const r = Math.hypot(x, z);
    return { y: Math.atan2(-x, z), x: Math.atan2(y, r) };
  }, [focus]);

  useFrame(() => {
    const g = group.current;
    if (target) {
      g.rotation.y += shortest(g.rotation.y, target.y) * 0.09;
      g.rotation.x += (target.x - g.rotation.x) * 0.09;
      return;
    }
    if (!drag.current) {
      spin.current += (0.0022 - spin.current) * 0.05;
      tiltV.current *= 0.94;
    }
    g.rotation.y += spin.current;
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + tiltV.current, -0.55, 0.55);
  });

  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY }; gl.domElement.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!drag.current) return;
    spin.current = (e.clientX - drag.current.x) * 0.0022;
    tiltV.current = (e.clientY - drag.current.y) * 0.0006;
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const up = () => { drag.current = null; };

  return (
    <group ref={group} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
      <mesh>
        <sphereGeometry args={[R - 0.04, 32, 22]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.05} />
      </mesh>
      {items.map((it) => (
        <Icon key={it.node.label} item={it} focus={focus} onHover={onHover} />
      ))}
    </group>
  );
}

function Icon({ item, focus, onHover }) {
  const ref = useRef(null);
  const [hot, setHot] = useState(false);
  const picked = focus === item.node.label;
  // Brand colour by default; only fade to grey when something else is focused.
  const lit = !focus || picked || hot;
  // When something else is focused, everything but it recedes.
  const scale = picked ? 1.24 : hot ? 1.06 : focus ? 0.62 : 0.78;

  useFrame(() => {
    const s = THREE.MathUtils.lerp(ref.current.scale.x, scale, 0.14);
    ref.current.scale.set(s, s, s);
    const m = ref.current.material;
    m.opacity = THREE.MathUtils.lerp(m.opacity, focus && !picked ? 0.4 : 1, 0.12);
  });

  return (
    <sprite
      ref={ref}
      position={item.pos}
      onPointerOver={(e) => { e.stopPropagation(); setHot(true); onHover(item.node.label); }}
      onPointerOut={() => { setHot(false); onHover(null); }}
    >
      <spriteMaterial map={lit ? item.lit : item.dim} transparent depthWrite={false} />
    </sprite>
  );
}

export default function TechGlobe({ focus, onHover }) {
  const [hover, setHover] = useState(null);
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7c6af7";
  const shown = hover || focus;
  const node = shown && ICONS.find((n) => n.label === shown);

  useEffect(() => { onHover?.(hover); }, [hover, onHover]);

  return (
    <div className="globe">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 10.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <Scene focus={shown || null} onHover={setHover} accent={accent} />
      </Canvas>
      <div className="globe-name" style={node ? { borderColor: node.hex + "66" } : undefined}>
        <span className="sw" style={node ? { background: node.hex } : undefined} />
        {shown || "Drag to spin · hover a skill"}
      </div>
    </div>
  );
}
