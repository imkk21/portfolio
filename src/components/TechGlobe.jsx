import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ICONS from "../lib/icons.json";

// AWS isn't in simple-icons (trademark), so it rides along as a wordmark tile.
const NODES = [...ICONS, { label: "AWS", text: "AWS" }];

// Draws one icon (path or wordmark) into a canvas we can use as a sprite texture.
function makeTexture(node, color) {
  const S = 160;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  const r = 34, p = 6, w = S - p * 2;
  ctx.beginPath();
  ctx.roundRect(p, p, w, w, r);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = color;
  if (node.text) {
    ctx.font = "700 42px Syne, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.text, S / 2, S / 2 + 2);
  } else {
    const scale = 88 / 24;
    ctx.save();
    ctx.translate((S - 88) / 2, (S - 88) / 2);
    ctx.scale(scale, scale);
    ctx.fill(new Path2D(node.d));
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

function Globe({ accent, onHover }) {
  const group = useRef(null);
  const vel = useRef({ x: 0.0018, y: 0.0035 });
  const drag = useRef(null);
  const { gl } = useThree();

  const items = useMemo(() => {
    const R = 2.95, n = NODES.length;
    return NODES.map((node, i) => {
      // Fibonacci sphere keeps the icons evenly spread.
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        node,
        pos: [Math.cos(theta) * rad * R, y * R, Math.sin(theta) * rad * R],
        tex: makeTexture(node, "#ffffff"),
        texHot: makeTexture(node, accent),
      };
    });
  }, [accent]);

  useFrame(() => {
    if (!drag.current) {
      vel.current.x *= 0.96;
      vel.current.y = vel.current.y * 0.96 + 0.0016 * 0.04;
      if (Math.abs(vel.current.y) < 0.0016) vel.current.y = 0.0016;
    }
    group.current.rotation.y += vel.current.y;
    group.current.rotation.x = THREE.MathUtils.clamp(group.current.rotation.x + vel.current.x, -0.6, 0.6);
  });

  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY }; gl.domElement.setPointerCapture(e.pointerId); };
  const move = (e) => {
    if (!drag.current) return;
    vel.current = { x: (e.clientY - drag.current.y) * 0.0006, y: (e.clientX - drag.current.x) * 0.0022 };
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const up = () => { drag.current = null; };

  return (
    <group ref={group} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
      <mesh>
        <sphereGeometry args={[2.92, 30, 20]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.06} />
      </mesh>
      {items.map((it, i) => (
        <Sprite key={i} item={it} onHover={onHover} />
      ))}
    </group>
  );
}

function Sprite({ item, onHover }) {
  const [hot, setHot] = useState(false);
  const ref = useRef(null);
  useFrame(() => {
    const s = THREE.MathUtils.lerp(ref.current.scale.x, hot ? 1.0 : 0.74, 0.15);
    ref.current.scale.set(s, s, s);
  });
  return (
    <sprite
      ref={ref}
      position={item.pos}
      onPointerOver={(e) => { e.stopPropagation(); setHot(true); onHover(item.node.label); }}
      onPointerOut={() => { setHot(false); onHover(null); }}
    >
      <spriteMaterial map={hot ? item.texHot : item.tex} transparent depthWrite={false} />
    </sprite>
  );
}

export default function TechGlobe() {
  const [label, setLabel] = useState(null);
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#a07cff";
  return (
    <div className="globe">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1} />
        <Globe accent={accent} onHover={setLabel} />
      </Canvas>
      <div className="globe-label">{label || "Drag to spin"}</div>
    </div>
  );
}
