'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useMissionStore } from '@/stores/missionStore';

interface WebGLDetectorProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function WebGLDetector({ children, fallback }: WebGLDetectorProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const performanceTier = useMissionStore((state) => state.performanceTier);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        setWebglAvailable(false);
      } else {
        setWebglAvailable(true);
      }
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  // Use fallback if WebGL is missing or performance is critical
  if (webglAvailable === false || performanceTier === 'fallback') {
    return <>{fallback}</>;
  }

  // Show nothing until we check WebGL (prevents flash)
  if (webglAvailable === null) return null;

  return <>{children}</>;
}
