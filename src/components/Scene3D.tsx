"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HexGrid() {
  const ref = useRef<THREE.Group>(null);

  const hexes = useMemo(() => {
    const items: { position: [number, number, number]; scale: number }[] = [];
    for (let x = -8; x <= 8; x += 1.5) {
      for (let z = -8; z <= 8; z += 1.3) {
        if (Math.random() > 0.6) {
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={ref}>
      {hexes.map((hex, i) => (
        <mesh key={i} position={hex.position} scale={hex.scale}>
          <cylinderGeometry args={[1, 1, 0.1, 6]} />
          <meshStandardMaterial
            color="#00f0ff"
            transparent
            opacity={0.08}
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
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#004466"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
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
        <Float key={i} speed={1 + i * 0.3} floatIntensity={0.5}>
          <Text
            position={s.pos}
            fontSize={0.15}
            color="#00e673"
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
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#bf00ff" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
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
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent />
          {interactive && <FloatingCode />}
        </Suspense>
      </Canvas>
    </div>
  );
}
