'use client';

import content from '@/content.json';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Cpu } from 'lucide-react';

export function CTASection() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-transparent relative">
      {/* Radial glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-s3nk-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 text-center space-y-12 max-w-4xl px-6">
        <div className="space-y-4">
          <h2 className="font-display text-5xl md:text-7xl text-white uppercase glow-cyan tracking-tight">
            {content.cta.headline}
          </h2>
          <p className="font-body text-white/50 text-lg uppercase tracking-[0.2em]">
            {content.cta.subtext}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button size="lg" className="w-full md:w-auto rounded-none bg-s3nk-cyan text-s3nk-bg hover:bg-white transition-colors h-14 px-12 font-display uppercase tracking-widest text-lg">
            <Rocket className="mr-2 h-5 w-5" />
            {content.cta.buttons[0]?.label}
          </Button>
          
          <Button variant="outline" size="lg" className="w-full md:w-auto rounded-none border-s3nk-cyan/40 text-s3nk-cyan hover:bg-s3nk-cyan/10 h-14 px-12 font-mono uppercase tracking-widest">
            <ShieldCheck className="mr-2 h-5 w-5" />
            {content.cta.buttons[1]?.label}
          </Button>

          <Button variant="ghost" size="lg" className="w-full md:w-auto rounded-none text-white/40 hover:text-s3nk-cyan hover:bg-transparent h-14 px-12 font-mono uppercase tracking-widest">
            <Cpu className="mr-2 h-5 w-5" />
            {content.cta.buttons[2]?.label}
          </Button>
        </div>

        <div className="pt-24 flex flex-col items-center space-y-4">
          <div className="w-px h-16 bg-gradient-to-b from-s3nk-cyan/40 to-transparent"></div>
          <p className="font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase">
            {content.footer.tagline} // © {content.footer.year}
          </p>
        </div>
      </div>
    </section>
  );
}
