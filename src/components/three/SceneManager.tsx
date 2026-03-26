'use client';

import { Suspense } from 'react';
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
  const currentScene = useMissionStore((state) => state.currentScene);

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
            else setPerformanceTier('fallback');
          }}
          flipflops={3}
          threshold={0.5}
        >
          <Suspense fallback={null}>
            <CameraController />
            <EnvironmentScene />
            <RobotModel />
            <ParticleSystem environment={sceneData?.environment || 'void'} />
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
