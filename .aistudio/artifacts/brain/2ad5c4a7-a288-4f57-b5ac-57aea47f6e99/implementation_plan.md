# Slipstream Ram — 3D Multiplayer Car Racing & Community Track Studio

A 3D third-person chase-camera arcade car racing game where players customize composite 3D vehicles, sketch and publish freehand community race tracks, join friends via private room codes (with optional AI fill racers), and bash rivals off the apex with a tactical lateral ram dash.

---

### User Review & Critical Decisions

> [!IMPORTANT] All four core design choices from clarification have been locked in. Review the summary below and approve to begin implementation.

- **Confirmed Camera & Perspective**: 3D third-person chase camera powered by Three.js (`WebGLRenderer` with automatic software-WebGL pacing, `RoomEnvironment` PBR reflections, horizon fog, and dynamic FOV/trauma shake).
- **Confirmed Track Creation**: Draw-your-own freehand road path editor where players sketch closed circuit loops on a canvas, auto-smoothed into banked 3D spline ribbons with curbs, boost pads, and trackside landmarks, saved to the server's persistent community track library.
- **Confirmed Vehicle Customization & Dash**: Visual parts (chassis silhouette, rear wing, wheel/rim style, metallic/matte paint & livery accent) paired with balanced stat tuning (Top Speed, Acceleration, Handling, Dash Impact) and an active **Lateral Ram Dash** (`Q` / `E` or `Space` + steer) that delivers lateral impulse, car-to-car knockback, sparks, hitstop, and cooldown recovery.
- **Confirmed Multiplayer Architecture**: Real-time WebSocket multiplayer via private 6-character room codes (`ws` attached to Express on port 3000) with host-configurable AI fill bots, live lobby state, and server-authoritative race state.

---

### 1. Overview & Core Concept

- **What It Does**: Players launch into a full-viewport 3D racing shell featuring a live 3D garage/track backdrop. From the hub they can jump directly into a Solo/Bot Quick Race (`Enter`/`Space`), enter the **Vehicle Garage** to tune parts and stats on a 3D turntable, open the **Freehand Track Studio** to draw and publish new circuits to the shared community library, or **Create / Join a Room** using a 6-character code to race online against friends and AI bots.
- **Target Audience**: Casual and competitive arcade racing fans who enjoy tactile car-combat (ramming rivals into corners), creative circuit sketching, and instant drop-in multiplayer with a shareable room code.
- **Key Value**: Combines instant creative track sketching with physical lateral-dash car combat and seamless room-code multiplayer—playable solo with smart AI fill racers or live online with friends.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Title Screen**: Full-bleed live 3D camera flyover around the showcase circuit with idling/cruising cars, calm negative space on the left third framing a bespoke inline `<svg>` title emblem, primary **Race Now** CTA (`Enter`/`Space` or `?autostart=1`), secondary actions (**Multiplayer Room**, **Garage**, **Track Studio**), and a single-line control hint (`WASD / Arrows Drive · Q / E Lateral Dash · Esc Pause`).
  2. **Garage & Stat Tuner**: Live 3D turntable showcase of the player's composite 6–10 part car. Bottom/side compact dock lets players switch Chassis (Apex Coupe, Heavy Bruiser, Aero Wedge), Rear Wing (Ducktail, GT Wing, Twin-Fin), Wheels (5-Spoke Alloy, Aero Disc, Deep-Dish), Paint & Accent colors, and allocate tuning points across **Speed**, **Acceleration**, **Handling**, and **Ram Impact**. Saved locally and sent to the server on room join.
  3. **Freehand Track Studio**: Clean 2D drawing canvas with grid backdrop. Players click-and-drag to draw a loop from Start/Finish back toward the origin; release auto-closes and smooths the path via Catmull-Rom resampling, checks minimum length and self-intersection safety, allows toggling Road Width, Track Biome/Theme (Sunset Canyon, Alpine Asphalt, Midnight Circuit), and placing Boost Pads, then previews the generated 3D ribbon before publishing to the Community Track Library.
  4. **Multiplayer Room Lobby**: Create Room (generates 6-char code, e.g., `APEX7K`, with one-click copy) or Join by Code. Host selects any built-in or community track, lap count (2–5), and AI Fill Bots (0–5). Players see live connected racers, customized car summaries, and Ready toggles before the 3-2-1-GO countdown.
  5. **In-Race 3D Gameplay & HUD**: Minimal perimeter HUD (`>= 85%` clear viewport, no `backdrop-filter`): Top-left Position (`1/6`) & Lap (`2/3`) + Race Timer; Top-right Mute/Pause icon buttons + compact Track Minimap; Bottom-right tabular Speedometer (`KM/H`) & Dash Charge gauge (`Q` Left / `E` Right ready indicators). Lateral Ram Dash triggers directional side-surge, skid sparks, rival knockback, 50ms hitstop on heavy contact, camera shake, and procedural Web Audio engine/impact synth.
  6. **Pause & Race Finish Modals**: Pressing `Esc`/`P` opens a single clean Pause modal (`Resume`, `Restart`, `Exit to Title`). Crossing the finish line reveals the Podium Results modal with final standings, best lap, total time, ram hits landed, and **Play Again / Back to Lobby**.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-contrast daytime/golden-hour motorsport paddock & alpine circuit aesthetic—crisp asphalt, painted red/white apex curbs, brushed anodized aluminum, and vibrant team liveries rather than generic dark cyberpunk glow.
  - *Color Palette & Mood*: Warm slate asphalt (`#14181F`), deep paddock charcoal (`#1C222D` with hairline `rgba(255,255,255,0.12)` borders, no `backdrop-filter`), racing signal orange-red (`#FF4D2E`) primary CTA accent, and crisp cyan/amber functional HUD indicators (`#0EA5E9` dash charge, `#F59E0B` lap/podium gold).
  - *Typography & Hierarchy*: `Oxanium` / `Chakra Petch` geometric motorsport display numerals (`tabular-nums`) for speed, lap timers, and positions, paired with `Plus Jakarta Sans` for crisp UI controls.
  - *Component Styling*: Unboxed typographic metadata with `·` separators, zero decorative pulsing dots, solid/translucent `rgba(...)` HUD surfaces, and single-elevation modal cards.

- **Interactive Feedback & Motion**:
  - Frame-rate independent damped third-person chase camera with dynamic FOV widening at high speed/boost and decaying trauma shake on ram collisions.
  - Pooled particle bursts for tire drift smoke, boost flames, and metallic ram sparks.
  - Procedural Web Audio synthesizer (pitch-modulated engine hum, tire screech, lateral dash whoosh, metallic ram impact clang, countdown beeps, lap chime) with a persistent Mute toggle.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Server-Side JSON Persistence + WebSocket Rooms in Express (`server.ts`)**
  - *Chosen Approach*: Single Node/Express HTTP + WebSocket server on port 3000 managing real-time multiplayer rooms and persisting community tracks to a server-side JSON store (`data/tracks.json` seeded with 3 curated starter tracks).
  - *Why*: Room-code multiplayer requires a low-latency WebSocket server anyway; keeping community tracks in the same Express backend gives immediate zero-friction sharing across all connected browsers without external auth barriers.
  - *Alternatives Considered*: Browser `localStorage` only (rejected because community tracks wouldn't be visible across different online players) or external DB provisioning (unnecessary overhead since no user accounts/RBAC were requested).

- **Decision 2: Hybrid Server-Authoritative Simulation with Client Prediction**
  - *Chosen Approach*: Clients run deterministic 60fps vehicle kinematics and local steering/dash responsiveness, sending throttle/steer/dash inputs (and position/velocity checkpoints) to the room server; the server validates checkpoints/laps, resolves authoritative lateral ram collisions & knockback impulses between players and AI bots, and broadcasts room snapshots at 20Hz with client-side exponential interpolation for remote cars.
  - *Why*: Guarantees responsive 60fps driving feel with zero input lag while keeping lap counts, race standings, and player-vs-player ram collisions authoritative and synchronized.

- **Decision 3: Freehand Path Smoothing & Track Mesh Generation**
  - *Chosen Approach*: Capture pointer samples in the 2D canvas editor, simplify via Ramer-Douglas-Peucker / distance filtering, close the loop smoothly into a `CatmullRomCurve3`, validate non-zero arc length and safe curvature, then extrude a continuous flat/banked 3D ribbon with offset curb strips (`>= 0.02` Y-offset to eliminate Z-fighting), start/finish gantry, and instanced trackside trees/bollards/barriers.
  - *Why*: Lets any player sketch a real 3D circuit in 5 seconds without struggling with complex CAD handles, while guaranteeing driveable road geometry.

---

### 4. Technical Architecture & Data Strategy

```
┌───────────────────────────────────────────────────────────────────────────┐
│                     Express + WebSocket Server (Port 3000)                │
│                                                                           │
│  ┌──────────────────────────┐        ┌─────────────────────────────────┐  │
│  │ Community Track Store    │        │ Multiplayer Room & Physics Hub  │  │
│  │ (GET/POST /api/tracks)   │        │ - Room Code Registry (6 chars)  │  │
│  │ - Built-in + User Tracks │        │ - AI Bot Pathfinding & Ram AI   │  │
│  │ - Disk JSON Persistence  │        │ - Server-Authoritative Laps &   │  │
│  └─────────────┬────────────┘        │   Lateral Ram Collision Impulses│  │
│                │                     └────────────────┬────────────────┘  │
└────────────────┼──────────────────────────────────────┼───────────────────┘
                 │ HTTP REST                            │ WebSocket (20Hz)
┌────────────────▼──────────────────────────────────────▼───────────────────┐
│                         React + Three.js Client                           │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Game Shell & State Machine (title | garage | studio | lobby | play) │  │
│  ├───────────────────┬─────────────────────┬───────────────────────────┤  │
│  │ Garage Configurator│ Freehand Track Editor│ Multiplayer Lobby Modal  │  │
│  │ (Parts + Stats)   │ (2D Draw -> Spline) │ (Create / Join by Code)  │  │
│  └─────────┬─────────┴──────────┬──────────┴────────────┬──────────────┘  │
│            │                    │                       │                 │
│  ┌─────────▼────────────────────▼───────────────────────▼──────────────┐  │
│  │ Isolated Three.js Viewport (<div ref>) + Pure Physics/Track Engine  │  │
│  │ - Composite 3-12 part 3D Cars   - Spline Road + Curbs + Boost Pads  │  │
│  │ - Lateral Ram Dash + Sparks     - Software-WebGL afterDraw() Guard  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Low-Occlusion Perimeter HUD + Web Audio Procedural Synth            │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `VehicleConfig`: Chassis ID, spoiler ID, wheel ID, primary/accent hex colors, finish (`metallic` | `matte`), and stat points (`speed`, `accel`, `handling`, `ram`) summing to a balanced point budget.
  - `TrackDefinition`: `id`, `name`, `author`, `theme` (`alpine` | `sunset` | `midnight`), `roadWidth`, `controlPoints` (`{x, z}[]`), `boostPads` (`t` spline parameters), `createdAt`.
  - `RoomState`: `code`, `hostId`, `trackId`, `laps`, `aiCount`, `status` (`waiting` | `countdown` | `racing` | `finished`), `players[]` (live pose, velocity, dash state, lap, checkpoint progress, finish time, ram count).

- **Interactive Component & State Mapping**:
  - **Game Shell**: Mirrors active game phase to `document.body.dataset.state` (`'title'`, `'playing'`, `'paused'`, `'gameover'`). Supports `?autostart=1` and `Enter`/`Space` start handshake on Title Screen.
  - **Pure Simulation Modules**: Spline sampling/projection, vehicle steering/drift/lateral-dash physics, bounding-sphere + OBB ram collision math, and lap/checkpoint progression live in pure TypeScript modules decoupled from React/Three.js so they are directly unit-tested via `node:test`.
  - **Three.js Renderer**: Mounted once in a sibling `<div>` ref, completely isolated from React HUD updates. Uses `RoomEnvironment` PMREM, warm key directional light + cool hemisphere fill, instanced trackside props, pooled particle instancing, and `isSoftwareGl` detection for `afterDraw()` loop pacing.
