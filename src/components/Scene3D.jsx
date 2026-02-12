import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Trail, PointMaterial, Points } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { random } from 'maath';

// Techy Wireframe Heart
function WireframeHeart({ scale = 1, ...props }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const heartShape = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return heartShape;
  }, []);

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: false,
    steps: 1
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group scale={scale} rotation={[Math.PI, 0, 0]} {...props}>
        {/* Inner Glow Mesh */}
        <mesh ref={mesh}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          {/* Tech Look: Wireframe + Glowing Color */}
          <meshBasicMaterial
            color="#f43f5e"
            wireframe={true}
            wireframeLinewidth={2}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Outer Cyber Lines (Clone slightly larger) */}
        <mesh scale={1.05} rotation={[Math.PI, 0, 0]}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe={true}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Particle Field "Data Stream" look
function TechParticles(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 15 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ec4899"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function HeroScene() {
  return (
    <>
      <color attach="background" args={['#050505']} />

      {/* Main Tech Heart */}
      <WireframeHeart position={[0, 0, 0]} scale={0.2} />

      {/* Surrounding Data Particles */}
      <TechParticles />

      {/* Cyber Grid Floor (optional, but adds to tech feel) */}
      <gridHelper args={[30, 30, 0x222222, 0x111111]} position={[0, -5, 0]} />

      <ambientLight intensity={0.5} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(circle at center, #1a0b10 0%, #000000 100%)' // Fallback/Blend
    }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ antialias: true }}>
        <HeroScene />
      </Canvas>
    </div>
  );
}
