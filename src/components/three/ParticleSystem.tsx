'use client';

import { Sparkles } from '@react-three/drei';
import { useMissionStore } from '@/stores/missionStore';

interface ParticleSystemProps {
  environment: 'void' | 'rubble' | 'industrial' | 'hazard' | 'digital';
}

export function ParticleSystem({ environment }: ParticleSystemProps) {
  const tier = useMissionStore((state) => state.performanceTier);

  // If performance is low, render no particles or very few
  if (tier === 'fallback') return null;
  const countMultiplier = tier === 'low' ? 0.3 : 1;

  switch (environment) {
    case 'rubble':
      // Dust particles
      return (
        <Sparkles 
          count={Math.floor(150 * countMultiplier)} 
          scale={15} 
          size={2} 
          speed={0.2} 
          opacity={0.3} 
          color="#cccccc" 
        />
      );
    case 'hazard':
      // Glowing ember/gas particles
      return (
        <Sparkles 
          count={Math.floor(250 * countMultiplier)} 
          scale={18} 
          size={3} 
          speed={0.8} 
          opacity={0.8} 
          color="#ff4444" 
          noise={1}
        />
      );
    case 'digital':
      // Digital matrix-like grid specs
      return (
        <Sparkles 
          count={Math.floor(200 * countMultiplier)} 
          scale={12} 
          size={1.5} 
          speed={1.5} 
          opacity={0.6} 
          color="#00f0ff" 
        />
      );
    case 'industrial':
      // Very sparse ambient dust
      return (
        <Sparkles 
          count={Math.floor(50 * countMultiplier)} 
          scale={10} 
          size={1} 
          speed={0.1} 
          opacity={0.1} 
          color="#ffffff" 
        />
      );
    default:
    case 'void':
      return null;
  }
}
