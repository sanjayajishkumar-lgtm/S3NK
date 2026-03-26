'use client';

import content from '@/content.json';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';

export function FallbackExperience() {
  return (
    <div className="relative w-full bg-s3nk-bg overflow-x-hidden">
      {/* 2D Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-s3nk-cyan/10 to-transparent pointer-events-none"></div>
        <HeroSection />
      </div>

      {/* 2D Features with parallax-like background images */}
      {content.features.map((feature) => (
        <section 
          key={feature.id} 
          className="relative h-screen px-12 md:px-24 flex items-center border-b border-white/5"
        >
          {/* Static robot image placeholder - positioned absolute/relative */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none grayscale">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <span className="font-mono text-xs text-s3nk-cyan glow-cyan uppercase tracking-widest">Scene_0{feature.scene} // 2D_MODE</span>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase glow-cyan tracking-tight">{feature.title}</h2>
            <div className="space-y-4">
              <p className="font-display text-lg text-s3nk-cyan/90 uppercase tracking-widest">{feature.tagline}</p>
              <p className="font-body text-white/70 text-base leading-relaxed">{feature.description}</p>
            </div>
            <div className="pt-4 font-mono text-[10px] text-s3nk-cyan/60 uppercase border-l-2 border-s3nk-cyan/20 pl-4">
                {feature.detail}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <CTASection />

      {/* 2D Scanlines */}
      <div className="fixed inset-0 pointer-events-none scan-overlay opacity-10 z-[100]"></div>
    </div>
  );
}
