'use client';

import { useMissionStore } from '@/stores/missionStore';
import { useEffect, useState } from 'react';

export function DataHUD() {
  const scrollProgress = useMissionStore((state) => state.scrollProgress);
  const currentScene = useMissionStore((state) => state.currentScene);
  const performanceTier = useMissionStore((state) => state.performanceTier);
  
  const [alt, setAlt] = useState(1.2);
  const [battery, setBattery] = useState(87);

  // Subtle variations in data
  useEffect(() => {
    const interval = setInterval(() => {
      setAlt(prev => +(prev + (Math.random() - 0.5) * 0.01).toFixed(2));
      setBattery(prev => Math.max(0, prev - 0.001));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none font-mono text-[10px] text-s3nk-cyan/70 uppercase p-6 flex flex-col justify-between mix-blend-screen overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
             <div className="w-2 h-2 bg-s3nk-cyan animate-pulse"></div>
             <span className="text-s3nk-cyan font-bold tracking-[0.2em] text-xs">S3NK_OS v4.2</span>
          </div>
          <div>STATUS: <span className="text-white">MISSION_ACTIVE</span></div>
          <div>TIER: <span className={performanceTier === 'high' ? 'text-s3nk-cyan' : 'text-s3nk-red'}>{performanceTier}</span></div>
        </div>

        <div className="text-right space-y-1">
          <div>LOC: <span className="text-white">LAT:34.0522 N, LON:118.2437 W</span></div>
          <div>COORD: <span className="text-white">{(scrollProgress * 1000).toFixed(0)}m_DISP</span></div>
        </div>
      </div>

      {/* Middle side brackets */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col space-y-4">
        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-s3nk-cyan/40 to-transparent"></div>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col space-y-4">
        <div className="w-1 h-32 bg-gradient-to-b from-transparent via-s3nk-cyan/40 to-transparent"></div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span>BAT: {battery.toFixed(0)}%</span>
              <div className="w-24 h-1 bg-white/10 relative">
                <div className="absolute inset-0 bg-s3nk-cyan" style={{ width: `${battery}%` }}></div>
              </div>
            </div>
            <div>SIG: <span className="text-white">████████░░ STRONG</span></div>
          </div>
          <div className="flex space-x-6">
            <div>TEMP: <span className="text-white">23°C</span></div>
            <div>ALT: <span className="text-white">{alt}m</span></div>
          </div>
        </div>

        {/* Radar-like indicator */}
        <div className="relative w-16 h-16 border border-s3nk-cyan/30 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 border-t border-s3nk-cyan animate-spin origin-center duration-[3s]"></div>
            <div className="w-1 h-1 bg-s3nk-cyan rounded-full"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[6px] opacity-40">N</div>
        </div>
      </div>
      
      {/* HUD scanlines */}
      <div className="absolute inset-0 pointer-events-none scan-overlay opacity-30"></div>
    </div>
  );
}
