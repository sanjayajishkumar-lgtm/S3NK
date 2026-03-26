'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useMissionStore } from '@/stores/missionStore';

import { SCENE_TIMINGS, SceneConfig } from '@/lib/sceneConfig';

export function EnvironmentScene() {
  const currentScene = useMissionStore((state) => state.currentScene);
  
  // Find current env based on currentScene
  const sceneData = SCENE_TIMINGS.find((s: SceneConfig) => s.id === currentScene) || SCENE_TIMINGS[0];
  const envType = sceneData?.environment || 'void';

  const rubbleGroup = useRef<THREE.Group>(null);
  
  // Procedural Rubble generation for the 'rubble' env
  const rubbleInstances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < 80; i++) {
        instances.push({
            position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() * 0.5), (Math.random() - 0.5) * 20),
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
            scale: new THREE.Vector3(Math.random() * 1.5 + 0.2, Math.random() * 1.5 + 0.2, Math.random() * 1.5 + 0.2)
        });
    }
    return instances;
  }, []);

  const envColor = '#050510';
  let fogColor = '#050510';
  let fogDensity = 0.05;

  if (envType === 'hazard') {
    fogColor = '#3a0202';
    fogDensity = 0.08;
  } else if (envType === 'industrial') {
    fogColor = '#020a10';
    fogDensity = 0.04;
  } else if (envType === 'rubble') {
    fogColor = '#0a0a0a';
    fogDensity = 0.06;
  }
  
  return (
    <>
      <color attach="background" args={[envColor]} />
      <fogExp2 attach="fog" args={[fogColor, fogDensity]} />

      <ambientLight intensity={envType === 'hazard' ? 0.2 : 0.4} />
      <directionalLight position={[10, 10, 5]} intensity={envType === 'hazard' ? 0.3 : 1} />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.6, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
            color={envType === 'hazard' ? '#220000' : (envType === 'digital' ? '#001122' : '#111')} 
            wireframe={envType === 'digital'}
        />
      </mesh>

      {/* Rubble Meshes */}
      {(envType === 'rubble' || envType === 'hazard' || envType === 'industrial') && (
        <group ref={rubbleGroup} position={[0, -0.5, 0]}>
          {rubbleInstances.map((props, i) => (
            <mesh key={i} position={props.position} rotation={props.rotation} scale={props.scale}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={envType === 'hazard' ? "#1a0505" : "#222"} roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Industrial specific */}
      {envType === 'industrial' && (
          <group position={[0, -0.5, 0]}>
            <gridHelper args={[50, 50, '#00f0ff', '#112233']} />
            <mesh position={[5, 2, -5]}>
                <cylinderGeometry args={[0.5, 0.5, 6, 8]} />
                <meshStandardMaterial color="#334" />
            </mesh>
            <mesh position={[-4, 2, -3]}>
                <cylinderGeometry args={[0.5, 0.5, 6, 8]} />
                <meshStandardMaterial color="#334" />
            </mesh>
          </group>
      )}
    </>
  );
}
