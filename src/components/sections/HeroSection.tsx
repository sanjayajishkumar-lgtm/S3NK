'use client';

import content from '@/content.json';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const handleStart = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="z-10 text-center space-y-4">
        <h2 className="font-mono text-xs md:text-sm tracking-[0.6em] text-s3nk-cyan animate-pulse uppercase">
          {content.hero.subtitle}
        </h2>
        
        <h1 className="font-display text-7xl md:text-[10rem] text-white leading-none glow-cyan drop-shadow-2xl">
          {content.hero.title}
        </h1>
        
        <div className="max-w-md mx-auto pt-6">
          <p className="font-body text-white/60 text-sm md:text-base tracking-widest uppercase mb-12">
            {content.hero.tagline}
          </p>
          
          <Button 
            onClick={handleStart}
            variant="outline" 
            className="rounded-none border-s3nk-cyan/50 text-s3nk-cyan hover:bg-s3nk-cyan hover:text-s3nk-bg transition-all duration-500 font-mono tracking-widest px-8 group"
          >
            {content.hero.cta}
            <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Background large text overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] text-white/[0.02] pointer-events-none select-none">
        MISSION
      </div>
    </section>
  );
}
