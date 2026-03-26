'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMissionStore } from '@/stores/missionStore';
import { SCENE_TIMINGS } from '@/lib/sceneConfig';

export function CameraController() {
  const { camera } = useThree();
  const scrollProgress = useMissionStore((state) => state.scrollProgress);
  
  // Vectors for smooth interpolation
  const currentPos = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame((_, _delta) => {
    // Determine which two scenes we are between
    let prevScene = SCENE_TIMINGS[0];
    let nextScene = SCENE_TIMINGS[0];
    let localProgress = 0;

    for (let i = 0; i < SCENE_TIMINGS.length - 1; i++) {
      const scene = SCENE_TIMINGS[i];
      const next = SCENE_TIMINGS[i + 1];
      
      if (scene && next && scrollProgress >= scene.progressRange[0] && scrollProgress <= scene.progressRange[1]) {
        prevScene = scene;
        nextScene = next;
        
        const range = scene.progressRange[1] - scene.progressRange[0];
        localProgress = range === 0 ? 0 : (scrollProgress - scene.progressRange[0]) / range;
        break;
      }
    }

    const lastScene = SCENE_TIMINGS[SCENE_TIMINGS.length - 1];
    if (lastScene && scrollProgress >= lastScene.progressRange[0]) {
        prevScene = lastScene;
        nextScene = lastScene;
        localProgress = 1;
    }

    if (!prevScene || !nextScene) return;

    // Interpolate targets
    const startPos = new THREE.Vector3().fromArray(prevScene.cameraPos);
    const endPos = new THREE.Vector3().fromArray(nextScene.cameraPos);
    targetPos.current.copy(startPos).lerp(endPos, localProgress);

    const startLookAt = new THREE.Vector3().fromArray(prevScene.cameraLookAt);
    const endLookAt = new THREE.Vector3().fromArray(nextScene.cameraLookAt);
    targetLookAt.current.copy(startLookAt).lerp(endLookAt, localProgress);

    // Smoothly damp current camera to target
    currentPos.current.lerp(targetPos.current, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);

    // Apply
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
