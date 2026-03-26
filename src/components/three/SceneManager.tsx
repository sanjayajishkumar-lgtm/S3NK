'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, Preload } from '@react-three/drei';
import { useMissionStore } from '@/stores/missionStore';

import { RobotModel } from './RobotModel';
import { EnvironmentScene } from './EnvironmentScene';
import { CameraController } from './CameraController';
import { ParticleSystem } from './ParticleSystem';
import { SCENE_TIMINGS } from '@/lib/sceneConfig';

export function SceneManager() {
  const setPerformanceTier = useMissionStore((state) => state.setPerformanceTier);
  const performanceTier = useMissionStore((state) => state.performanceTier);
  const scrollProgress = useMissionStore((state) => state.scrollProgress);
  const currentScene = useMissionStore((state) => state.currentScene);

  // We re-render only when needed using frameloop="demand", but since we have 
  // continuous animations (idle, walk), we actually need "always" when visible.
  // Optimization: use frameloop="always" but reduce pixel ratio on low perf.

  const dpr = performanceTier === 'low' ? [0.5, 1] : [1, 2];

  // Derive environment from current scene config
  const sceneData = SCENE_TIMINGS.find((s) => s.id === currentScene) || SCENE_TIMINGS[0];

  return (
    <div className="scene-canvas">
      <Canvas
        shadows={performanceTier === 'high'}
        dpr={dpr as [number, number]}
        gl={{ powerPreference: 'high-performance', antialias: performanceTier === 'high' }}
      >
        <PerformanceMonitor
          onDecline={() => {
            const current = useMissionStore.getState().performanceTier;
            if (current === 'high') setPerformanceTier('low');
            else setPerformanceTier('fallback'); // This triggers DOM fallback
          }}
          flipflops={3} // Allow 3 recovers
          threshold={0.5} // Under 30fps
        >
          <Suspense fallback={null}>
            <CameraController />
            <EnvironmentScene />
            <RobotModel />
            <ParticleSystem environment={sceneData.environment} />
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
