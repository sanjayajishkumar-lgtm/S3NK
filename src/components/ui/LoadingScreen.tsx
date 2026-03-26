'use client';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-s3nk-bg overflow-hidden">
      <div className="relative mb-8 h-px w-48 overflow-hidden bg-white/10">
        <div className="absolute inset-0 bg-s3nk-cyan animate-[loading_2s_infinite_ease-in-out]"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <h1 className="font-display text-2xl tracking-[0.5em] text-white glow-cyan uppercase">S3NK</h1>
        <p className="font-mono text-[10px] text-s3nk-cyan/60 uppercase tracking-widest">Initialising Mission Briefing</p>
      </div>

      <div className="absolute inset-0 pointer-events-none scan-overlay opacity-20"></div>
      
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
