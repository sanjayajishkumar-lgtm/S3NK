'use client';

import { useMissionStore } from '@/stores/missionStore';
import content from '@/content.json';
import { motion, AnimatePresence } from 'framer-motion';

export function FeatureOverlay() {
  const currentScene = useMissionStore((state) => state.currentScene);
  
  // Scene 0 is Hero, 1-8 are features, 9+ is CTA
  const isFeature = currentScene >= 1 && currentScene <= 8;
  const feature = content.features.find(f => f.scene === currentScene);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center px-12 md:px-24">
      <AnimatePresence mode="wait">
        {isFeature && feature && (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl space-y-6"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-[0.3em] text-s3nk-cyan glow-cyan uppercase">
                Scene_0{feature.scene} // Feature_Intelligence
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase leading-none glow-cyan tracking-tight">
                {feature.title}
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="font-display text-lg text-s3nk-cyan/90 uppercase tracking-wider">
                {feature.tagline}
              </p>
              <p className="font-body text-white/70 text-base md:text-lg leading-relaxed border-l border-s3nk-cyan/20 pl-6">
                {feature.description}
              </p>
              <div className="pt-2 flex items-center space-x-3">
                 <div className="h-[1px] w-8 bg-s3nk-cyan"></div>
                 <p className="font-mono text-[10px] text-s3nk-cyan/60 uppercase">{feature.detail}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
