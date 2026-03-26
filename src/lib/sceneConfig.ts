export type RobotState = 'idle' | 'walk' | 'scan' | 'alert' | 'deploy' | 'explode';
export type EnvironmentType = 'void' | 'rubble' | 'industrial' | 'hazard' | 'digital';

export interface SceneConfig {
  id: number; // 0 is Hero, 1-8 are features, 9 is CTA (or mapped to 8)
  progressRange: [number, number]; // e.g. [0, 0.1]
  cameraPos: [number, number, number];
  cameraLookAt: [number, number, number];
  robotState: RobotState;
  environment: EnvironmentType;
}

// 10 sections total (Hero + 8 features + CTA)
// Each section represents 10% of scroll progress (0.1)
export const SCENE_TIMINGS: SceneConfig[] = [
  {
    id: 0, // Hero
    progressRange: [0, 0.1],
    cameraPos: [0, 2, 8],
    cameraLookAt: [0, 0, 0],
    robotState: 'idle',
    environment: 'void',
  },
  {
    id: 1, // Terrain Mobility
    progressRange: [0.1, 0.22],
    cameraPos: [3, 1.5, 5],
    cameraLookAt: [0, 0.5, 0],
    robotState: 'walk',
    environment: 'rubble',
  },
  {
    id: 2, // Terrain Awareness
    progressRange: [0.22, 0.34],
    cameraPos: [0, 3, 4],
    cameraLookAt: [0, 0, 0],
    robotState: 'scan',
    environment: 'rubble',
  },
  {
    id: 3, // Surveillance
    progressRange: [0.34, 0.46],
    cameraPos: [2, 1, 3],
    cameraLookAt: [0, 1, 0],
    robotState: 'idle',
    environment: 'industrial',
  },
  {
    id: 4, // Hazard
    progressRange: [0.46, 0.58],
    cameraPos: [0, 1.5, 5],
    cameraLookAt: [0, 0.5, 0],
    robotState: 'alert',
    environment: 'hazard',
  },
  {
    id: 5, // Control System
    progressRange: [0.58, 0.7],
    cameraPos: [-2, 2, 4],
    cameraLookAt: [0, 0.5, 0],
    robotState: 'idle',
    environment: 'industrial',
  },
  {
    id: 6, // Payload Delivery
    progressRange: [0.7, 0.82],
    cameraPos: [1, 0.8, 3],
    cameraLookAt: [0, 0, 0],
    robotState: 'deploy',
    environment: 'rubble',
  },
  {
    id: 7, // Data Streaming
    progressRange: [0.82, 0.92],
    cameraPos: [0, 2, 6],
    cameraLookAt: [0, 0, 0],
    robotState: 'idle',
    environment: 'digital',
  },
  {
    id: 8, // Modularity
    progressRange: [0.92, 1],
    cameraPos: [0, 2, 5],
    cameraLookAt: [0, 1, 0],
    robotState: 'explode',
    environment: 'digital',
  },
];

export const getSceneForProgress = (progress: number): SceneConfig => {
  // Clamp to 0-1
  const clamped = Math.max(0, Math.min(1, progress));
  
  // Find the matching range
  const scene = SCENE_TIMINGS.find(
    (s) => clamped >= s.progressRange[0] && clamped <= s.progressRange[1]
  );
  
  return scene || SCENE_TIMINGS[SCENE_TIMINGS.length - 1]!;
};
