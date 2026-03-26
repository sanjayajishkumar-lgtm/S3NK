'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMissionStore } from '@/stores/missionStore';
import { SCENE_TIMINGS } from '@/lib/sceneConfig';

gsap.registerPlugin(ScrollTrigger);

export function ScrollController() {
  const setScrollProgress = useMissionStore((state) => state.setScrollProgress);
  const setCurrentScene = useMissionStore((state) => state.setCurrentScene);
  const setRobotState = useMissionStore((state) => state.setRobotState);
  
  const triggerRef = useRef<ScrollTrigger>(null);

  useEffect(() => {
    // We create a ScrollTrigger that tracks the entire document body's scroll.
    // The page structure in page.tsx will have 10 elements of 100vh each.
    
    // Smooth scrub to avoid jank
    triggerRef.current = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // 0.5 sec smooth catch-up
      onUpdate: (self) => {
        // self.progress is exactly 0.0 to 1.0!
        setScrollProgress(self.progress);
        
        // Find which scene we're in
        let current = SCENE_TIMINGS[0];
        for (const scene of SCENE_TIMINGS) {
          if (self.progress >= scene.progressRange[0] && self.progress <= scene.progressRange[1]) {
            current = scene;
            break;
          }
        }
        
        // Update store
        if (current) {
            setCurrentScene(current.id);
        }
        
        // Don't override explode, ensure trigger bounds
        if (self.progress >= 0.92) {
            setRobotState('explode');
        } else if (current) {
            setRobotState(current.robotState);
        }
      }
    });

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [setScrollProgress, setCurrentScene, setRobotState]);

  return null; // This is purely logical component
}
