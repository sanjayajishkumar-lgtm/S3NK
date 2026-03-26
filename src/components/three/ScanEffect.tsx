'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMissionStore } from '@/stores/missionStore';

interface ScanEffectProps {
  position: [number, number, number];
}

export function ScanEffect({ position }: ScanEffectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const robotState = useMissionStore((state) => state.robotState);
  const tier = useMissionStore((state) => state.performanceTier);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Only animate if in 'scan' state and performance allows
    if (robotState === 'scan' && tier !== 'fallback') {
      meshRef.current.scale.x += delta * 8;
      meshRef.current.scale.z += delta * 8;
      
      // Fade out as it expands
      materialRef.current.opacity = Math.max(0, 1 - (meshRef.current.scale.x / 15));
      
      // Reset logic
      if (meshRef.current.scale.x > 15) {
        meshRef.current.scale.set(1, 1, 1);
        materialRef.current.opacity = 0.8;
      }
    } else {
      // Hide completely when not scanning
      materialRef.current.opacity = 0;
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  if (tier === 'fallback' || tier === 'low') return null; // No scan ring on low perf

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.9, 1, 64]} />
      <meshBasicMaterial 
        ref={materialRef} 
        color="#00f0ff" 
        transparent 
        opacity={0} 
        side={THREE.DoubleSide} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
