"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

function HexGrid() {
  const ref = useRef<THREE.Group>(null);

  const hexes = useMemo(() => {
    const items: { position: [number, number, number]; scale: number }[] = [];
    for (let x = -8; x <= 8; x += 2.4) {
      for (let z = -8; z <= 8; z += 2.1) {
        if (Math.random() > 0.5) {
          items.push({
            position: [x, -2 + Math.random() * 0.3, z],
            scale: 0.3 + Math.random() * 0.4,
          });
        }
      }
    }
    return items;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={ref}>
      {hexes.map((hex, i) => (
        <mesh key={i} position={hex.position} scale={hex.scale}>
          <cylinderGeometry args={[1, 1, 0.1, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.04}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.08;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1a1a1a"
          emissiveIntensity={0.6}
          roughness={0.6}
          metalness={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingCode() {
  const snippets = useMemo(
    () => [
      { text: "mov rax, 1", pos: [-3, 2, -2] as [number, number, number] },
      { text: "int *p = &x;", pos: [3, 1, -1] as [number, number, number] },
      { text: "syscall", pos: [-2, -1, 2] as [number, number, number] },
      { text: "malloc()", pos: [2.5, 2.5, 1] as [number, number, number] },
      { text: "0x7FFF", pos: [0, 3, -3] as [number, number, number] },
    ],
    []
  );

  return (
    <>
      {snippets.map((s, i) => (
        <Float key={i} speed={0.5 + i * 0.2} floatIntensity={0.3}>
          <Text
            position={s.pos}
            fontSize={0.15}
            color="#8a8a8a"
            anchorX="center"
            anchorY="middle"
          >
            {s.text}
          </Text>
        </Float>
      ))}
    </>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.7} color="#ffffff" />
      <Stars radius={100} depth={50} count={260} factor={2.5} saturation={0} fade speed={0.4} />
      <CoreSphere />
      <HexGrid />
    </>
  );
}

interface Scene3DProps {
  className?: string;
  interactive?: boolean;
}

export default function Scene3D({ className, interactive = false }: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          {interactive && <FloatingCode />}
        </Suspense>
      </Canvas>
    </div>
  );
}
