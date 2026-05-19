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

  const PARAMS = useMemo(() => ({"speed":1.7,"radius":30,"nucleus":5,"trail":25}), []);
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
        const speed = addControl("speed", "Orbit Speed", 0.1, 3.0, 1.7);
        const radius = addControl("radius", "Ring Radius", 15, 60, 30);
        const nucleusSize = addControl("nucleus", "Nucleus Size", 1, 12, 5);
        const trailLen = addControl("trail", "Trail Length", 5, 40, 25);
        
        const nucleusCount = Math.floor(count * 0.12);
        const ringCount = Math.floor(count * 0.65);
        const ringSize = Math.floor(ringCount / 3);
        const electronTrailCount = Math.floor(count * 0.18);
        const trailPerRing = Math.floor(electronTrailCount / 3);
        const ambientCount = count - nucleusCount - ringCount - electronTrailCount;
        const t = time * speed;
        
        if (i < nucleusCount) {
          const golden = 2.399963;
          const theta = Math.acos(1 - 2 * (i + 0.5) / nucleusCount);
          const phi = golden * i + t * 0.3;
          const r = nucleusSize * (0.5 + 0.5 * Math.pow(Math.abs(Math.sin(t * 1.5 + i * 0.2)), 0.5));
          target.set(
            Math.sin(theta) * Math.cos(phi) * r,
            Math.sin(theta) * Math.sin(phi) * r,
            Math.cos(theta) * r
          );
          const pulse = 0.7 + 0.3 * Math.sin(t * 2.5 + i * 0.1);
          color.setRGB(0.65 * pulse, 0.35 * pulse, 1.0 * pulse);
        
        } else if (i < nucleusCount + ringCount) {
          const ri = i - nucleusCount;
          const ringIdx = Math.floor(ri / ringSize);
          const pi = ri - ringIdx * ringSize;
          const frac = pi / ringSize;
          const orbitSpeed = (1.0 + ringIdx * 0.3) * (ringIdx === 1 ? -1 : 1);
          const angle = frac * Math.PI * 2 + t * orbitSpeed;
          let x = Math.cos(angle) * radius;
          let y = Math.sin(angle) * radius;
          let z = 0;
          const tiltX = ringIdx === 0 ? 0.44 : ringIdx === 1 ? 1.13 : 1.45;
          const tiltZ = ringIdx === 0 ? 0.17 : ringIdx === 1 ? 0.73 : -0.38;
          const cx = Math.cos(tiltX);
          const sx = Math.sin(tiltX);
          const y1 = y * cx - z * sx;
          const z1 = y * sx + z * cx;
          const cz = Math.cos(tiltZ);
          const sz = Math.sin(tiltZ);
          target.set(x * cz - y1 * sz, x * sz + y1 * cz, z1);
          const bright = 0.5 + 0.2 * Math.sin(angle * 3 + t);
          if (ringIdx === 0) {
            color.setRGB(0.49 * bright, 0.23 * bright, 0.93 * bright);
          } else if (ringIdx === 1) {
            color.setRGB(0.02 * bright, 0.71 * bright, 0.83 * bright);
          } else {
            color.setRGB(0.42 * bright, 0.30 * bright, 0.98 * bright);
          }
        
        } else if (i < nucleusCount + ringCount + electronTrailCount) {
          const ei = i - nucleusCount - ringCount;
          const ringIdx = Math.floor(ei / trailPerRing);
          const trailIdx = ei - ringIdx * trailPerRing;
          const trailFrac = trailIdx / trailPerRing;
          const orbitSpeed = (1.0 + ringIdx * 0.3) * (ringIdx === 1 ? -1 : 1);
          const electronAngle = t * orbitSpeed * 3.0;
          const trailOffset = trailFrac * (trailLen * 0.04);
          const angle = electronAngle - trailOffset;
          let x = Math.cos(angle) * radius;
          let y = Math.sin(angle) * radius;
          let z = 0;
          const tiltX = ringIdx === 0 ? 0.44 : ringIdx === 1 ? 1.13 : 1.45;
          const tiltZ = ringIdx === 0 ? 0.17 : ringIdx === 1 ? 0.73 : -0.38;
          const cx = Math.cos(tiltX);
          const sx = Math.sin(tiltX);
          const y1 = y * cx - z * sx;
          const z1 = y * sx + z * cx;
          const cz = Math.cos(tiltZ);
          const sz = Math.sin(tiltZ);
          target.set(x * cz - y1 * sz, x * sz + y1 * cz, z1);
          const fade = 1.0 - trailFrac;
          const fadeCurve = fade * fade;
          if (trailFrac < 0.02) {
            color.setRGB(1.0, 1.0, 1.0);
          } else if (ringIdx === 0) {
            color.setRGB(0.7 * fadeCurve, 0.4 * fadeCurve, 1.0 * fadeCurve);
          } else if (ringIdx === 1) {
            color.setRGB(0.1 * fadeCurve, 0.9 * fadeCurve, 1.0 * fadeCurve);
          } else {
            color.setRGB(0.6 * fadeCurve, 0.45 * fadeCurve, 1.0 * fadeCurve);
          }
        
        } else {
          const ai = i - nucleusCount - ringCount - electronTrailCount;
          const golden = 2.399963;
          const theta = Math.acos(1 - 2 * (ai + 0.5) / ambientCount);
          const phi = golden * ai + t * 0.05;
          const r = radius * 2.5;
          target.set(
            Math.sin(theta) * Math.cos(phi) * r,
            Math.sin(theta) * Math.sin(phi) * r,
            Math.cos(theta) * r
          );
          const mix = Math.sin(ai * 0.05 + t * 0.3) * 0.5 + 0.5;
          color.setRGB(
            (0.49 * (1 - mix) + 0.02 * mix) * 0.15,
            (0.23 * (1 - mix) + 0.71 * mix) * 0.15,
            (0.93 * (1 - mix) + 0.83 * mix) * 0.15
          );
        }
        
        if (i === 0) {
          setInfo("korFlow Atom", "Electrons with trails orbiting. Adjust Trail Length slider.");
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