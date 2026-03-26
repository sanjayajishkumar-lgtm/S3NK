import { create } from 'zustand';

export type PerformanceTier = 'high' | 'low' | 'fallback';

interface MissionState {
  scrollProgress: number;
  currentScene: number;
  robotState: 'idle' | 'walk' | 'scan' | 'alert' | 'deploy' | 'explode';
  performanceTier: PerformanceTier;
  setScrollProgress: (progress: number) => void;
  setCurrentScene: (scene: number) => void;
  setRobotState: (state: 'idle' | 'walk' | 'scan' | 'alert' | 'deploy' | 'explode') => void;
  setPerformanceTier: (tier: PerformanceTier) => void;
}

export const useMissionStore = create<MissionState>((set) => ({
  scrollProgress: 0,
  currentScene: 0,
  robotState: 'idle',
  performanceTier: 'high',
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setRobotState: (state) => set({ robotState: state }),
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
}));
