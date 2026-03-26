import { useEffect, useState } from 'react';
import { useMissionStore } from '@/stores/missionStore';

export function useScrollProgress() {
  const scrollProgress = useMissionStore((state) => state.scrollProgress);
  const currentScene = useMissionStore((state) => state.currentScene);
  const robotState = useMissionStore((state) => state.robotState);
  
  // Also track if we're mounted to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { scrollProgress, currentScene, robotState, isMounted };
}
