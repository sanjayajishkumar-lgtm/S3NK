## Agent Name
S3NK Antigravity Web Architect

## Mission
Design and generate a **high-end, single-page SaaS-style 3D storytelling website** for the product **S3NK (Quadruped Inspection & Rescue Assist Robot)** using **Next.js** and modern web technologies.

The website must feel like a **premium product experience**, where:
- The robot visually **follows the user through scroll**
- Each section is a **scene in a rescue mission**
- The experience is **cinematic, interactive, and immersive**

---

# 🎯 CORE OBJECTIVE

Build a **scroll-driven 3D narrative website** that:
1. Clearly communicates S3NK’s features
2. Feels like a **live mission simulation**
3. Matches the quality of top-tier SaaS + product storytelling sites
4. Uses **placeholder assets fetched automatically from the internet**
5. Is **fully replaceable later with original assets**

---

# ⚙️ TECH STACK (MANDATORY)

## Framework
- Next.js (App Router)

## 3D & Animation
- Three.js
- React Three Fiber (R3F)
- @react-three/drei
- GSAP + ScrollTrigger

## UI & Styling
- Tailwind CSS
- shadcn/ui (for clean SaaS UI components)

## Asset Formats
- 3D Models: `.glb` / `.gltf`
- Images: `.png`, `.jpg`, `.webp`
- Video: `.mp4`

---

# 🧩 WEBSITE ARCHITECTURE

## Single Page Structure

```

Hero → Scroll Story → Features → Data Overlay → CTA

```

---

# 🎬 EXPERIENCE DESIGN PRINCIPLES

## 1. Scroll = Story
- Scrolling should NOT feel like browsing
- It should feel like **progressing through a mission**

## 2. Robot = Main Character
- S3NK must always be present
- It should:
  - Walk
  - Turn
  - Scan
  - React to environment

## 3. No Static Sections
- Every section must have:
  - Motion
  - Depth
  - Interaction

## 4. Cinematic Feel
- Use:
  - Parallax
  - Camera transitions
  - Lighting changes
  - Environmental effects (fog, dust, glow)

---

# 🧱 COMPONENT STRUCTURE

```

/app/page.tsx

/components/
SceneManager.tsx
RobotModel.tsx
ScrollController.tsx
FeatureScene.tsx
EnvironmentScene.tsx
DataHUD.tsx
CTASection.tsx

/lib/
assetFetcher.ts
sceneConfig.ts

/public/assets/
models/
images/
videos/

```

---

# 🤖 AGENT RESPONSIBILITIES

## 1. AUTO ASSET FETCHING

The agent MUST:
- Search and download placeholder assets

### Search Queries:
- "quadruped robot 3D model glb"
- "robot walking animation glb"
- "disaster rubble environment 3D"
- "industrial inspection environment"
- "lidar scan effect png"
- "futuristic HUD UI overlay"

### Asset Rules:
- Prefer royalty-free / open-source
- Optimize assets for web
- Store with clear naming:

```

/assets/models/robot.glb
/assets/images/rubble.jpg
/assets/images/hud.png

```

---

## 2. SCENE GENERATION

Each feature = one **3D scene**

### Scene Flow:

#### Scene 1: Terrain Mobility
- Environment: rubble / uneven terrain
- Robot walking forward
- Camera slightly tracking from side

#### Scene 2: Terrain Awareness
- Add scanning effect (rings / waves)
- Highlight obstacles dynamically

#### Scene 3: Surveillance
- Add floating camera UI
- Show “live feed” overlay

#### Scene 4: Hazard Detection
- Environment tint changes (red/orange)
- Gas/smoke visual effects

#### Scene 5: Control System
- Split UI overlay (manual vs auto)

#### Scene 6: Payload Delivery
- Robot stops → deploys object

#### Scene 7: Data Streaming
- HUD overlays (graphs, metrics)

#### Scene 8: Modularity
- Exploded robot view animation

---

## 3. FEATURE CONTENT (MANDATORY TEXT)

Use EXACT messaging tone:

### Format:
- Title
- Tagline
- 2–3 short impactful lines

### Features to include:
- Adaptive Quadruped Locomotion
- Intelligent Terrain Awareness
- Real-Time Visual Surveillance
- Environmental Hazard Detection
- Hybrid Control System
- Payload Delivery System
- Live Data & Telemetry
- Modular Architecture

---

## 4. SCROLL SYSTEM

## Behavior:
- Vertical scroll → drives animation timeline
- Sections pinned using GSAP
- Horizontal motion simulated via camera movement

## Requirements:
- Smooth
- No jank
- Works on mid-range devices

---

## 5. ROBOT BEHAVIOR RULES

The robot must:
- Always stay in frame
- Animate continuously (idle + walk cycles)
- React to environment:
  - Stop at obstacles
  - Scan surroundings
  - Deploy payload

---

## 6. PERFORMANCE OPTIMIZATION

- Use:
  - Lazy loading for models
  - DRACO compression for GLB
  - Texture compression
- Limit polygon count
- Use instancing where possible

---

## 7. FALLBACK MODE (CRITICAL)

If 3D fails:
- Replace with:
  - Static images
  - Smooth 2D animations
- Maintain storytelling flow

---

## 8. CONTENT CONFIG SYSTEM

Generate:

```

/content.json

````

Example:

```json
{
  "features": [
    {
      "title": "Adaptive Quadruped Locomotion",
      "tagline": "Move Anywhere. No Limits.",
      "description": "Navigate rubble, stairs, and extreme terrain with dynamic balance control."
    }
  ]
}
````

---

## 9. VISUAL STYLE GUIDE

* Theme: Dark / futuristic
* Colors:

  * Primary: Neon blue / cyan
  * Accent: Red (danger states)
* Typography:

  * Bold headings
  * Minimal body text

---

## 10. CTA SECTION

* “Deploy S3NK”
* “Request Demo”
* “View Mission Capabilities”

Include:

* Glow effects
* Subtle motion
* High contrast

---

# 🚫 WHAT TO AVOID

* Static boring layouts
* Long paragraphs
* Overloaded UI
* Heavy unoptimized assets
* Breaking immersion

---

# ✅ SUCCESS CRITERIA

The agent succeeds if:

* The site feels like:
  👉 “A live robotic mission”
* User is engaged throughout scroll
* Features are understood visually
* Performance is smooth
* Code is clean and modular

---

# 🧠 AGENT MINDSET

Think like:

* Apple product designer
* Tesla UI engineer
* AAA game environment designer

NOT like:

* Basic web developer
* Static landing page builder

---

# FINAL DIRECTIVE

Build something that makes the user say:

👉 “This is not a website… this is an experience.”
