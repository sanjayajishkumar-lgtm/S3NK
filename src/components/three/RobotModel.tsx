'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMissionStore } from '@/stores/missionStore';
import { ScanEffect } from './ScanEffect';

export function RobotModel() {
  const robotState = useMissionStore((state) => state.robotState);
  const scrollProgress = useMissionStore((state) => state.scrollProgress);

  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const payloadRef = useRef<THREE.Mesh>(null);

  // Legs [frontLeft, frontRight, backLeft, backRight]
  const legRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  // Materials
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({ color: '#2a2a30', metalness: 0.6, roughness: 0.4 }),
    joint: new THREE.MeshStandardMaterial({ color: '#111115', metalness: 0.8, roughness: 0.2 }),
    glowCyan: new THREE.MeshBasicMaterial({ color: '#00f0ff' }),
    glowRed: new THREE.MeshBasicMaterial({ color: '#ff2d2d' }),
    payload: new THREE.MeshStandardMaterial({ color: '#102040', metalness: 0.5, roughness: 0.5 }),
  }), []);

  // Animation variables
  const clock = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current || !bodyRef.current) return;
    
    // Only accumulate time if we are not exploiting (the explode anim is special)
    if (robotState !== 'explode') {
        clock.current += delta;
    }
    const t = clock.current;

    // Default resets
    let bodyY = 0;
    let bodyRotX = 0;
    let headRotY = 0;
    let legSpread = 0.3; // distance from center
    let payloadY = -0.3;

    // Determine current glow
    const eyeMaterial = robotState === 'alert' ? materials.glowRed : materials.glowCyan;

    switch(robotState) {
        case 'idle':
            // Breathing motion
            bodyY = Math.sin(t * 2) * 0.02;
            headRotY = Math.sin(t * 0.5) * 0.1;
            break;
            
        case 'walk':
            // Trot gait
            bodyY = Math.abs(Math.sin(t * 10)) * 0.05;
            bodyRotX = Math.sin(t * 10) * 0.02;
            
            // Animate legs
            legRefs[0].current!.position.z = Math.sin(t * 10) * 0.4 - 0.5;
            legRefs[3].current!.position.z = Math.sin(t * 10) * 0.4 + 0.5;
            
            legRefs[1].current!.position.z = Math.sin(t * 10 + Math.PI) * 0.4 - 0.5;
            legRefs[2].current!.position.z = Math.sin(t * 10 + Math.PI) * 0.4 + 0.5;
            
            // Animate moving forward by wrapping Z
            groupRef.current.position.z = (scrollProgress * 20) % 5 - 2;
            break;
            
        case 'scan':
            // Scanning motion (head rotates)
            headRotY = Math.sin(t * 2) * 0.8;
            antennaRef.current!.rotation.z = t * 10;
            break;
            
        case 'alert':
            // Crouched, erratic
            bodyY = -0.1 + Math.sin(t * 30) * 0.01;
            headRotY = Math.sin(t * 15) * 0.2;
            legSpread = 0.4; // wider stance
            break;
            
        case 'deploy':
            // Lower body, drop payload
            bodyY = -0.15;
            legSpread = 0.4;
            payloadY = -0.8; // dropped to ground
            break;
            
        case 'explode':
            // Based on scroll progress (0.92 to 1.0)
            const explodeAmount = Math.max(0, (scrollProgress - 0.92) * 12);
            
            bodyRef.current.position.y = explodeAmount * 0.5;
            headRef.current!.position.z = explodeAmount * 1;
            
            legRefs[0].current!.position.set(-explodeAmount, 0, -0.5 - explodeAmount);
            legRefs[1].current!.position.set(explodeAmount, 0, -0.5 - explodeAmount);
            legRefs[2].current!.position.set(-explodeAmount, 0, 0.5 + explodeAmount);
            legRefs[3].current!.position.set(explodeAmount, 0, 0.5 + explodeAmount);
            
            groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
            return; // Skip standard apply
    }
    
    // Smoothly apply states if not exploding
    if (robotState !== 'explode') {
        bodyRef.current.position.y = THREE.MathUtils.lerp(bodyRef.current.position.y, bodyY, 0.1);
        bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, bodyRotX, 0.2);
        headRef.current!.rotation.y = THREE.MathUtils.lerp(headRef.current!.rotation.y, headRotY, 0.1);
        
        // Reset X/Z if we aren't walking
        if (robotState !== 'walk') {
            groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05);
            
            legRefs[0].current!.position.set(-legSpread, 0, -0.5);
            legRefs[1].current!.position.set(legSpread, 0, -0.5);
            legRefs[2].current!.position.set(-legSpread, 0, 0.5);
            legRefs[3].current!.position.set(legSpread, 0, 0.5);
            
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05);
            
            // Re-attach parts
            bodyRef.current.position.x = 0;
            headRef.current!.position.z = 0;
        }
        
        payloadRef.current!.position.y = THREE.MathUtils.lerp(payloadRef.current!.position.y, payloadY, 0.1);
        
        // Apply appropriate eye color
        headRef.current!.children[1].material = eyeMaterial;
        headRef.current!.children[2].material = eyeMaterial;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 1.2]} />
        <primitive object={materials.body} attach="material" />
        
        {/* Payload */}
        <mesh ref={payloadRef} position={[0, -0.3, 0]}>
           <boxGeometry args={[0.4, 0.2, 0.6]} />
           <primitive object={materials.payload} attach="material" />
        </mesh>
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 0.2, -0.6]} castShadow>
        <boxGeometry args={[0.4, 0.25, 0.3]} />
        <primitive object={materials.body} attach="material" />
        
        {/* Eyes */}
        <mesh position={[-0.1, 0, -0.16]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={materials.glowCyan} attach="material" />
        </mesh>
        <mesh position={[0.1, 0, -0.16]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <primitive object={materials.glowCyan} attach="material" />
        </mesh>
        
        {/* Antenna */}
        <mesh ref={antennaRef} position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.3]} />
            <primitive object={materials.joint} attach="material" />
            <mesh position={[0, 0.15, 0]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <primitive object={materials.glowCyan} attach="material" />
            </mesh>
        </mesh>
      </mesh>

      {/* Legs */}
      {[
        [-0.3, -0.5], // FL
        [0.3, -0.5],  // FR
        [-0.3, 0.5],  // BL
        [0.3, 0.5]    // BR
      ].map((pos, i) => (
        <group key={i} ref={legRefs[i]} position={[pos[0], 0, pos[1]]}>
            {/* Upper Leg */}
            <mesh position={[0, -0.2, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.04, 0.4]} />
                <primitive object={materials.joint} attach="material" />
            </mesh>
            {/* Lower Leg */}
            <mesh position={[0, -0.5, 0]} rotation={[0.2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.03, 0.02, 0.4]} />
                <primitive object={materials.body} attach="material" />
                {/* Foot */}
                <mesh position={[0, -0.2, 0]}>
                   <sphereGeometry args={[0.04]} />
                   <primitive object={materials.joint} attach="material" />
                </mesh>
            </mesh>
        </group>
      ))}

      {/* Scan Ring Effect attached to robot center */}
      <ScanEffect position={[0, -0.4, 0]} />
    </group>
  );
}
