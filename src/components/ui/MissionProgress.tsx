'use client';

import { useMissionStore } from '@/stores/missionStore';
import content from '@/content.json';
import { cn } from '@/lib/utils';

export function MissionProgress() {
  const currentScene = useMissionStore((state) => state.currentScene);
  
  const handleScrollTo = (index: number) => {
    // Each scene is 100vh. Index 0 is hero, 1-8 features, 9 CTA.
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center space-y-6">
      <div className="flex flex-col items-center space-y-1 mb-2">
         <span className="font-mono text-[8px] text-s3nk-cyan/40 vertical-text uppercase tracking-widest">Mission_Progress</span>
         <div className="w-[1px] h-8 bg-s3nk-cyan/20"></div>
      </div>
      
      {/* 10 dots: Hero + 8 Features + CTA */}
      {Array.from({ length: 10 }).map((_, i) => (
        <button
          key={i}
          onClick={() => handleScrollTo(i)}
          className="group relative flex items-center justify-center p-2"
        >
          <div className={cn(
            "w-1 h-1 rounded-full transition-all duration-500",
            currentScene === i 
              ? "bg-s3nk-cyan scale-[2.5] glow-cyan" 
              : "bg-white/20 hover:bg-white/50"
          )} />
          
          {/* Label on hover */}
          <span className="absolute right-8 font-mono text-[8px] text-s3nk-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-[0.2em] pointer-events-none bg-s3nk-bg/80 px-2 py-1 border border-s3nk-cyan/20">
            {i === 0 ? '00_HERO' : i === 9 ? '09_DEPLOY' : `0${i}_${content.features[i-1]?.id.replace('-', '_').toUpperCase()}`}
          </span>
        </button>
      ))}

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
