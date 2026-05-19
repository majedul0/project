import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 0.8854036331176758;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"spread":92,"focus":1.15,"flow":0.72,"twist":1.35,"depth":64}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const spread = addControl("spread", "Field Spread", 20, 180, 92);
        const focus = addControl("focus", "Core Focus", 0.2, 3.0, 1.15);
        const flow = addControl("flow", "Flow Speed", 0.0, 2.5, 0.72);
        const twist = addControl("twist", "Hex Twist", 0.0, 4.0, 1.35);
        const depth = addControl("depth", "Depth", 10, 160, 64);
        
        const u = i / (count > 1 ? count - 1 : 1);
        const t = time * flow;
        const pi2 = 6.283185307179586;
        const g = 2.399963229728653;
        const a = i * g;
        
        const band = Math.floor(u * 6.0);
        const bandPhase = band * 1.0471975511965976;
        const local = u * 6.0 - band;
        
        const wave1 = Math.sin(a * 0.73 + t * 1.7);
        const wave2 = Math.cos(a * 1.11 - t * 1.3);
        const wave3 = Math.sin(a * 0.19 + t * 2.1);
        
        const corePull = Math.pow(1.0 - Math.abs(local * 2.0 - 1.0), focus);
        const radiusBase = spread * (0.16 + 0.84 * Math.sqrt(u));
        const radiusMod = 1.0 + 0.18 * wave1 + 0.08 * wave2;
        const radius = radiusBase * radiusMod * (0.55 + 0.45 * corePull);
        
        const theta = a * 0.045 + bandPhase + twist * (0.8 + 1.2 * u) + t * (0.35 + 0.25 * corePull);
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        
        const hex = Math.pow(Math.abs(c), 12.0) + Math.pow(Math.abs(s), 12.0);
        const hexScale = Math.pow(hex > 0.000001 ? hex : 0.000001, -0.08333333333333333);
        
        const drift = 10.0 * wave3 * (1.0 - u);
        const lane = (local - 0.5) * 2.0;
        const ribbon = lane * depth * (0.35 + 0.65 * corePull);
        
        const x = c * radius * hexScale + Math.cos(theta * 3.0 + t + bandPhase) * ribbon * 0.22 + drift;
        const y = s * radius * hexScale + Math.sin(theta * 2.0 - t * 1.2 + bandPhase) * ribbon * 0.22;
        const z = depth * (u - 0.5) * (1.2 + 0.25 * wave2) + ribbon * 0.85 + Math.sin(a * 0.31 - t * 1.8) * 7.0 * (0.2 + 0.8 * corePull);
        
        target.set(x, y, z);
        
        const glow = 0.5 + 0.5 * corePull;
        const warm = 0.55 + 0.45 * Math.sin(theta * 2.0 - t * 0.8);
        const orange = 0.75 * glow + 0.25 * warm;
        const inkMix = 1.0 - glow * 0.82;
        
        const r = 0.05 * inkMix + 1.0 * orange * (1.0 - inkMix);
        const gg = 0.07 * inkMix + 0.40 * orange * (1.0 - inkMix) + 0.06 * glow;
        const b = 0.11 * inkMix + 0.06 * orange * (1.0 - inkMix) + 0.02 * corePull;
        
        color.setRGB(r, gg, b);
        
        if (i === 0) {
        setInfo(
        "Faraday Field",
        "A six-fold convergence swarm inspired by standards, learning, and alignment. Particles flow through hexagonal lanes into a calibrated core, blending Faraday ink with signal orange."
        );
        annotate("core", new THREE.Vector3(0, 0, 0), "Faraday Core");
        annotate("flow", new THREE.Vector3(spread * 0.9, 0, -depth * 0.55), "Learning Flow");
        }
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}