# S3NK — Agent Handoff Document

> **Last Updated**: 2026-03-26  
> **Project**: S3NK Quadruped Inspection & Rescue Robot — Storytelling Website  
> **Repo**: `c:\Users\sanja\Documents\S3NK`  
> **Stack**: Next.js 15 · React 19 · Tailwind CSS 4 · Three.js · R3F · GSAP · Zustand · shadcn/ui

---

## What This Project Is

A **premium, scroll-driven 3D storytelling website** for the S3NK quadruped robot. The user scrolls through 8 cinematic scenes like a mission briefing — the robot (built from Three.js primitives) walks, scans, detects hazards, and deploys payloads. Each scene highlights one robot feature with dramatic 3D environment changes and GSAP-controlled camera movements.

**The experience must feel like**: "This is not a website… this is a mission."

---

## Reference Files

| File | Purpose |
|---|---|
| `agent.md` | Full design brief — visual style, scene list, feature copy, tech stack requirements |
| `project_detail.md` | Academic project background — the technical context of S3NK as a real robot |
| `implementation_plan.md` | **Full build plan** (stored in Antigravity brain) — read this before making any changes |
| `src/content.json` | All site text copy — titles, taglines, descriptions for all 8 scenes |

Full implementation plan path:  
`C:\Users\sanja\.gemini\antigravity\brain\e533d1a9-6588-4e85-a1ad-4889ed9d97b9\implementation_plan.md`

---

## Finalized Decisions

| Topic | Decision |
|---|---|
| UI Components | **shadcn/ui** — run `npx shadcn@latest init` (New York, Zinc, CSS vars) |
| State Management | **Zustand** — `src/stores/missionStore.ts` |
| Sound | **None** — no audio at all |
| Mobile | **3D everywhere + auto-degrade**: PerformanceMonitor → 3 tiers (high→low→2D fallback) |
| Robot Model | **Procedural** — built from Three.js primitives (no .glb needed). Swap-ready via `RobotModel.tsx` |
| Fonts | Orbitron (headings) · Inter (body) · JetBrains Mono (HUD) |
| Colors | `#050510` bg · `#00f0ff` cyan · `#ff2d2d` red · `#1e40ff` blue |

---

## Current Build Status

### ✅ DONE
- Implementation plan finalized
- `gemini.md` (this file) written
- Content strategy defined (`content.json` structure planned)
- Phase 1: Foundation (dependencies installed, config files updated, globals.css styled, content.json seeded)
- Phase 2: 3D Engine (SceneManager, RobotModel, EnvironmentScene, CameraController, ScrollController)

### 🔄 IN PROGRESS
- Phase 3: UI Layer (DataHUD, FeatureOverlay, MissionProgress, HeroSection, CTASection)

### ⏳ TODO
- Phase 3: UI Layer (DataHUD, FeatureOverlay, MissionProgress, HeroSection, CTASection)
- Phase 4: Page Assembly (`page.tsx` + `layout.tsx` wired up)
- Phase 5: Fallback (WebGLDetector + FallbackExperience)
- Phase 6: Performance (demand rendering, instancing, lazy load)
- Phase 7: Verify (`npm run build` passes, scroll works, fallback triggers)

---

## Architecture Overview

```
Fixed Layer (z-index 0):   R3F Canvas ← SceneManager
Fixed Layer (z-index 10):  DataHUD · MissionProgress (HUD overlays)
Scrollable (z-index 10):   HeroSection · 8× FeatureSection · CTASection
                            (these create the 1000vh scroll height)
Bridge:                     ScrollController (GSAP ScrollTrigger → Zustand store)
State:                      missionStore { scrollProgress, currentScene,
                                           robotState, performanceTier }
```

### Scroll to Scene Mapping
Total page: **1000vh** (hero=100vh + 8 features×100vh + CTA=100vh)

| Scroll % | Scene | Robot State | Environment |
|---|---|---|---|
| 0–10% | Hero | idle | void/space |
| 10–22% | 1. Terrain Mobility | walk | rubble |
| 22–34% | 2. Terrain Awareness | scan | rubble |
| 34–46% | 3. Surveillance | idle | industrial |
| 46–58% | 4. Hazard Detection | alert | hazard (red) |
| 58–70% | 5. Control System | idle | industrial |
| 70–82% | 6. Payload Delivery | deploy | rubble |
| 82–92% | 7. Data Streaming | idle | digital |
| 92–100% | 8. Modularity | explode | digital |

### Camera Path (3D world coords)
| Scene | Position | LookAt |
|---|---|---|
| Hero | (0, 2, 8) | (0, 0, 0) |
| 1 | (3, 1.5, 5) | (0, 0.5, 0) |
| 2 | (0, 3, 4) | (0, 0, 0) |
| 3 | (2, 1, 3) | (0, 1, 0) |
| 4 | (0, 1.5, 5) | (0, 0.5, 0) |
| 5 | (-2, 2, 4) | (0, 0.5, 0) |
| 6 | (1, 0.8, 3) | (0, 0, 0) |
| 7 | (0, 2, 6) | (0, 0, 0) |
| 8 | (0, 2, 5) | (0, 1, 0) |

---

## File Manifest

```
src/
├── app/
│   ├── page.tsx              [REWRITE] — client component, assembles all sections
│   ├── layout.tsx            [MODIFY]  — S3NK metadata, Orbitron+Inter+JetBrains fonts, dark class
│   ├── globals.css           [REWRITE] — dark theme, CSS tokens, glow utilities, scan-overlay
│   ├── manifest.ts           [MODIFY]  — S3NK PWA branding
│   └── api/metrics/          [KEEP]    — Prometheus endpoint untouched
│
├── components/
│   ├── three/
│   │   ├── SceneManager.tsx      R3F Canvas, Suspense, PerformanceMonitor
│   │   ├── RobotModel.tsx        Procedural robot (box+cylinder primitives)
│   │   ├── EnvironmentScene.tsx  4 environments: rubble/industrial/hazard/digital
│   │   ├── ScanEffect.tsx        LiDAR expanding ring effect
│   │   ├── ParticleSystem.tsx    Dust/ember particles (drei Sparkles)
│   │   └── CameraController.tsx  GSAP-driven camera, reads scrollProgress from Zustand
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       Full-viewport hero, massive S3NK title
│   │   ├── FeatureSection.tsx    Per-scene container (100vh spacer + overlay)
│   │   └── CTASection.tsx        Deploy S3NK / Request Demo / View Capabilities
│   │
│   ├── ui/
│   │   ├── FeatureOverlay.tsx    Left-side text panel per scene
│   │   ├── DataHUD.tsx           Tactical HUD (battery, signal, radar, mission status)
│   │   ├── MissionProgress.tsx   Right-side 8-dot scene indicator (clickable)
│   │   └── LoadingScreen.tsx     Branded 3D loading bar
│   │
│   ├── ScrollController.tsx      GSAP ScrollTrigger → Zustand bridge (client component)
│   ├── WebGLDetector.tsx         Checks WebGL + performanceTier, switches to fallback
│   └── FallbackExperience.tsx    Full 2D CSS version (parallax, CSS animations)
│
├── stores/
│   └── missionStore.ts           Zustand: { scrollProgress, currentScene,
│                                            robotState, performanceTier }
│
├── lib/
│   ├── sceneConfig.ts            Camera paths array, scene→robotState map, timing
│   └── useScrollProgress.ts     Custom hook wrapping Zustand selectors
│
└── content.json                  All site copy (hero, 8 features, CTA, footer)

public/assets/
├── models/    (empty — placeholder for future .glb files)
├── images/    (AI-generated 2D fallback images)
└── videos/    (empty — placeholder for future videos)
```

---

## Performance Tiers

```
'high'     → Full 3D, all particles, all effects  (default)
'low'      → 3D with reduced particles, no scan rings, basic materials
'fallback' → FallbackExperience.tsx (2D CSS version)
```

Degradation is automatic via R3F's `<PerformanceMonitor>` writing to `missionStore.performanceTier`.

---

## Key Dependencies to Install

```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react zustand
npm install class-variance-authority clsx tailwind-merge lucide-react
npm install -D @types/three

# Then:
npx shadcn@latest init   # New York · Zinc · CSS vars = yes
npx shadcn@latest add button badge separator
```

---

## Commands

```bash
npm run dev       # Start dev server → http://localhost:3000
npm run build     # Verify production build passes
npm run lint      # ESLint check
```

---

## Rules for Any Agent Taking Over

1. **Read `implementation_plan.md` first** — full technical spec is there
2. **Do not touch** `src/lib/metadata.ts`, `src/lib/logger.ts`, `src/app/api/metrics/`
3. **All 3D code must be in `'use client'` components** or dynamically imported with `ssr: false`
4. **Use `frameloop="demand"`** on the R3F Canvas — call `invalidate()` on scroll events
5. **Robot model is procedural** — do not try to fetch/download external .glb files
6. **All copy lives in `src/content.json`** — do not hardcode any text
7. **Zustand is the only state layer** — no Redux, no Context for this state
8. **No audio** — skip any sound-related code
9. **Run `npm run build`** before marking any phase complete
10. **Update this file** (`gemini.md`) after completing each phase
