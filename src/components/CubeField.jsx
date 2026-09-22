import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A grid of instanced columns that ripple like a live data heatmap and rise under the pointer.
function Field({ n, accent }) {
  const mesh = useRef(null);
  const group = useRef(null);
  const target = useRef(new THREE.Vector3(1e3, 0, 1e3));
  const hover = useRef(new THREE.Vector3(1e3, 0, 1e3));
  const pointer = useRef(new THREE.Vector2(-10, -10));
  const { dummy, base, hot, tmp, plane } = useMemo(() => ({
    dummy: new THREE.Object3D(),
    base: new THREE.Color("#3c3c48"),
    hot: new THREE.Color(accent),
    tmp: new THREE.Color(),
    plane: new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
  }), [accent]);
  const gap = 0.46;

  useEffect(() => {
    const move = (e) => { pointer.current.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame(({ clock, camera, raycaster }) => {
    const t = clock.elapsedTime;
    raycaster.setFromCamera(pointer.current, camera);
    if (raycaster.ray.intersectPlane(plane, target.current)) group.current.worldToLocal(target.current);
    hover.current.lerp(target.current, 0.08);
    // camera sway toward pointer
    camera.position.x += (pointer.current.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (8 + pointer.current.y * 0.6 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    let i = 0;
    for (let ix = 0; ix < n; ix++) {
      for (let iz = 0; iz < n; iz++) {
        const px = (ix - n / 2) * gap, pz = (iz - n / 2) * gap;
        const wave = (Math.sin(px * 0.7 + t * 0.9) + Math.cos(pz * 0.7 + t * 0.75)) * 0.34 + 0.72;
        const d = Math.hypot(px - hover.current.x, pz - hover.current.z);
        const bump = Math.max(0, 1 - d / 2.4);
        const h = wave + bump * bump * 2.2;
        dummy.position.set(px, h / 2, pz);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        tmp.copy(base).lerp(hot, Math.min(1, Math.pow(Math.max(0, h - 0.4) / 2.2, 1.25)));
        mesh.current.setColorAt(i, tmp);
        i++;
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0, Math.PI / 4.4, 0]} scale={1.15}>
      <instancedMesh ref={mesh} args={[undefined, undefined, n * n]}>
        <boxGeometry args={[gap * 0.62, 1, gap * 0.62]} />
        <meshStandardMaterial roughness={0.55} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

export default function CubeField() {
  const n = typeof window !== "undefined" && window.innerWidth < 900 ? 22 : 34;
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#a07cff";
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 8, 12], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <fog attach="fog" args={["#08080a", 11, 24]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[6, 12, 5]} intensity={2.6} />
      <directionalLight position={[-8, 5, -6]} intensity={1.1} color={accent} />
      <pointLight position={[-5, 5, -3]} intensity={45} color={accent} />
      <Field n={n} accent={accent} />
    </Canvas>
  );
}
