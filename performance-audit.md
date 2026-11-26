# Racing game performance audit

Audit date: 2026-11-26. This audit is based on source inspection and the current GLB files. Runtime FPS, frame time, GPU memory, and mobile behavior have not yet been measured in a browser; those metrics are marked as unverified rather than estimated.

## Current implementation

| Area | Status | Findings |
|---|---|---|
| Performance monitoring | NOT IMPLEMENTED | `RaceEngine` reads GPU renderer information only to detect software rendering. It does not collect FPS, frame time, CPU update time, draw calls, triangles, or asset timings, and there is no performance overlay. |
| GLB optimization | PARTIALLY IMPLEMENTED | Three.js has Draco and Meshopt decoders. `optimize-models.mjs` runs Meshopt during dev/start/build and checks that output is smaller, but it rewrites the source GLB. It does not report geometry/texture statistics or preserve original source files. Textures are left as-is. |
| Vehicle LOD | NOT IMPLEMENTED | Car prototypes are reused, but the same full-detail prototype is drawn at every distance. No medium/low vehicle variants are present. Player and opponent vehicles are built through the same rig path. |
| Environment LOD and visibility | PARTIALLY IMPLEMENTED | Repeated scenery uses `InstancedMesh`, and Three.js frustum culling is enabled at object level. There is no car-distance visibility/LOD or spatial chunking; a track-wide instanced batch can remain visible when only a small part is near camera. |
| Draw calls and materials | PARTIALLY IMPLEMENTED | Environment prototypes share geometry/material resources and repeated props are instanced. There is no renderer-stat baseline, static mesh joining, or measured draw-call budget. |
| Lighting and shadows | PARTIALLY IMPLEMENTED | A single directional key light casts a 1024×1024 PCF shadow map on non-software renderers. Sakura currently has track-specific shadow and pixel-ratio changes, but there are no consistent quality profiles. |
| Adaptive graphics | PARTIALLY IMPLEMENTED | A software-renderer fallback and a few track-specific settings exist. There are no LOW/MEDIUM/HIGH/ULTRA/AUTO profiles, persisted user settings, or sustained-FPS adaptation. |
| Adaptive render resolution | PARTIALLY IMPLEMENTED | Pixel ratio is fixed at construction, with a Sakura-specific cap. There is no time-window controller or hysteresis. React UI is rendered outside the WebGL canvas. |
| Physics | PARTIALLY IMPLEMENTED | Physics uses compiled tracks, clamped frame deltas, and simple pairwise racer collision checks. Pairwise collision is O(n²), but current races are capped at six racers. Track projection and collision costs need profiling before changing simulation behavior. |
| Game loop | PARTIALLY IMPLEMENTED | The engine uses one `requestAnimationFrame` loop, reuses scratch vectors, pools particles/rain, and throttles HUD updates. Bot/title input spreading and other per-frame work remain; there is no fixed-step client simulation or profiler. |
| Object pooling | PARTIALLY IMPLEMENTED | Particle and rain meshes are pooled. No other frequently created visual object pool was found. |
| Asset loading | PARTIALLY IMPLEMENTED | Car buffers use browser Cache API/IndexedDB and model requests are deduplicated. Startup currently loads the entire environment asset catalog and every car model; environment GLBs do not have the same persistent cache path. |
| Resource lifecycle | PARTIALLY IMPLEMENTED | Track disposal releases owned geometry/materials/textures and avoids disposing marked shared environment resources. There is no cache eviction/reference count, and WebGL context restoration is missing. |
| Multiplayer | PARTIALLY IMPLEMENTED | The server is authoritative and simulates/broadcasts rooms at 30 Hz. Snapshots are JSON strings, with full room state broadcast to every player. Racer count is small; network changes need multi-client testing. |
| Mobile | PARTIALLY IMPLEMENTED | Touch controls, software-GL detection, and a DPR cap exist. There are no device-specific graphics profiles or tested mobile texture budgets. |
| WebGL recovery | NOT IMPLEMENTED | No `webglcontextlost`/`webglcontextrestored` handling was found. |
| Automated verification | PARTIALLY IMPLEMENTED | Physics tests exist; `lint` and `build` scripts exist. There is no rendering, multi-client, low-end-device, or memory soak test. |

## Existing asset optimization result

The previous Meshopt batch pass processed 64 GLBs: 51 became smaller and the reported saving was 52.54 MB. Current model files total about 111.25 MB, and the Sakura asset folder totals about 44.89 MB. This is a file-size result only; it is not an FPS result. Because the old automation rewrote source files, original source versions are recoverable only from Git history for tracked assets. New automation must preserve originals as requested in the performance plan.

## Baseline measurements

| Metric | Baseline |
|---|---|
| Average/minimum/maximum FPS | NEEDS VERIFICATION in a browser on named hardware |
| Average frame time / CPU update time | NEEDS VERIFICATION |
| Draw calls / triangles | Not currently sampled; add renderer instrumentation |
| Geometry / texture counts | Not currently sampled; add renderer instrumentation |
| GPU memory | Not reliably exposed by Three.js; report unavailable/estimated only |
| Initial download / playable time | NEEDS browser network timing; current startup eagerly loads all cars and environment assets |
| GLB library size | About 111.25 MB on disk after the existing optimization pass |

## Implementation order

1. Add low-overhead renderer/frame telemetry and a development-only overlay so later work has evidence.
2. Add centralized graphics profiles and car-relative environment distance visibility/LOD while preserving player-car quality.
3. Stop loading every environment and garage vehicle before the first playable screen; load active-track and player-critical assets first, then stream the rest.
4. Preserve source GLBs in the optimizer workflow and generate optimized counterparts/reports without silently overwriting originals.
5. Review physics, network, disposal, and WebGL recovery after profiling; retain the authoritative simulation and test behavior before changing it.

## Risks and limits

- LOD needs distance checks around the player's car/camera and must be updated without traversing the whole scene each frame.
- Mesh simplification and texture transcoding are lossy; retain originals and make optimized output reversible.
- Runtime FPS depends on browser, GPU, resolution, and device thermal state. No target should be claimed until benchmarked on equivalent hardware.
- Multiplayer timing/physics should not be changed based on client render FPS.

## Implemented in this pass

- Added a development-only overlay for FPS, frame time, CPU-side render submission time, draw calls, triangles, active scene objects, geometry/texture counts, and GLB load telemetry. GPU memory remains unavailable through the selected Three.js counters.
- Added persisted LOW/MEDIUM/HIGH/ULTRA/AUTO graphics profiles. AUTO uses sustained 2.5-second FPS windows and cooldowns before changing level; it adjusts render pixel ratio, shadows, and pooled particle counts.
- Added car-relative spatial chunks for repeated scenery. The player's car remains visible and unchanged; scenery farther than the active profile's radius is hidden, with checks throttled as the car moves. Opponent rigs are also hidden past the profile distance. Sakura's physics and handling were not modified.
- Startup now prioritizes the selected track theme and initial race cars; other car models stream in the background and pause during a race. Track environment assets are loaded on demand. Optimized model URLs fall back to source GLBs.
- Reworked `optimize-models.mjs` to preserve source files, write ignored optimized copies, report geometry/texture inspection data and size comparisons, and retry failed cached entries.
- Verification completed: `npm run lint`, `npm run build`, and all 17 existing physics/asset tests passed. The build emitted a large JavaScript chunk warning. A browser FPS comparison and mobile run remain unverified.

The optimizer report is generated at `performance-model-report.md`. The current source models had already been processed by the earlier Meshopt pass, so this preservation-first pass produced negligible additional size reduction. A follow-up fixed two tooling issues: optimization now uses the glTF Transform API in-process instead of spawning a child Node process, and model discovery follows Windows/OneDrive reparse-point files. The latest run analyzed all 64 GLBs without optimizer errors. This pass does not implement vehicle mesh LOD variants, KTX2 texture conversion, or WebGL context recovery because suitable car LOD assets and runtime validation are not present.
