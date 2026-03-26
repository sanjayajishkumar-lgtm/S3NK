'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import content from '@/content.json';

// Components
import { ScrollController } from '@/components/ScrollController';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { DataHUD } from '@/components/ui/DataHUD';
import { FeatureOverlay } from '@/components/ui/FeatureOverlay';
import { MissionProgress } from '@/components/ui/MissionProgress';
import { WebGLDetector } from '@/components/WebGLDetector';
import { FallbackExperience } from '@/components/FallbackExperience';

// 3D Engine is heavy, dynamic import with no SSR
const SceneManager = dynamic(
  () => import('@/components/three/SceneManager').then(mod => mod.SceneManager),
  { ssr: false, loading: () => <LoadingScreen /> }
);

// Sections
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset check/loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="relative bg-s3nk-bg overflow-x-hidden">
      {/* 3D Content Wrapper */}
      <WebGLDetector fallback={<FallbackExperience />}>
        {/* The 3D layer is fixed to the background */}
        <SceneManager />

        {/* HUD UI overlays - fixed z-20 */}
        <DataHUD />
        <MissionProgress />
        <FeatureOverlay />

        {/* Scrollable Spacer Content - drives scroll z-10 */}
        <div className="content-overlay relative w-full">
          <HeroSection />
          
          {content.features.map((feature) => (
            <FeatureSection key={feature.id} />
          ))}

          <CTASection />
        </div>
        
        {/* GSAP Logic Bridge */}
        <ScrollController />
      </WebGLDetector>
    </main>
  );
}
