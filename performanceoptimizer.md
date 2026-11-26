# MASTER TASK: COMPLETE 3D WEB RACING GAME PERFORMANCE OPTIMIZATION

Act as a Senior Three.js Performance Engineer, WebGL Optimization Specialist, Game Engine Architect, and Multiplayer Game Developer.

Your task is to thoroughly inspect, audit, optimize, and improve my existing multiplayer 3D car racing game.

## 1. PROJECT CONTEXT

- Framework: React + TypeScript
- 3D Engine: Three.js
- 3D Asset Format: GLB / glTF
- Multiplayer: WebSocket-based architecture
- Physics: Existing custom racing physics and server-side simulation
- Development: VS Code, Node.js, Vite
- Deployment: Web application
- Target devices: Desktop, laptop, tablets, and mobile browsers.

My project contains approximately 30 GLB models with an average file size of 25 MB each.

The game must maintain high visual quality while achieving smooth gameplay, reduced loading times, low memory consumption, and stable performance on different hardware.

## 2. MOST IMPORTANT INSTRUCTIONS

Before making any changes:

1. Inspect the complete project structure.
2. Understand the existing rendering architecture.
3. Inspect the existing RaceEngine and game loop.
4. Inspect the GLB model loading and caching architecture.
5. Inspect all existing optimization implementations.
6. Inspect the physics and multiplayer synchronization systems.
7. Inspect the environment, track, vehicle, weather, lighting, and camera systems.
8. Identify existing implementations, partially implemented features, missing features, and incorrectly implemented optimizations.

Create a detailed audit report.

For every optimization, assign one of these statuses:

- IMPLEMENTED: Already working correctly.
- PARTIALLY IMPLEMENTED: Exists but needs improvement.
- NOT IMPLEMENTED: Needs to be developed.
- NEEDS VERIFICATION: Code exists, but actual functionality or performance benefit is unverified.

IMPORTANT:

Do not duplicate features that already work correctly.

Do not replace existing implementations unnecessarily.

Improve existing code wherever possible.

Preserve all existing game functionality and visual features.

Do not start rewriting the game engine.

After the audit, proceed with implementing all missing and incomplete optimizations.

Do not stop after producing the audit report.

## 3. PHASE 1 — PERFORMANCE MONITORING AND PROFILING

Implement a complete performance monitoring system.

Measure:

- Real-time FPS.
- Average FPS.
- Minimum FPS.
- Maximum FPS.
- Frame time in milliseconds.
- CPU-side frame processing time.
- Draw calls.
- Rendered triangles.
- Geometries.
- Textures.
- Active objects.
- Loaded GLB models.
- Asset loading time.
- Model download size.
- WebGL renderer information where available.

Requirements:

1. Create a performance monitoring utility.
2. Integrate it with the existing RaceEngine.
3. Display a development-only performance overlay.
4. Add the ability to enable and disable the overlay.
5. Ensure monitoring does not create significant overhead.
6. Record baseline performance before optimization.
7. Provide performance reports before and after changes.

Use Three.js renderer.info wherever applicable.

Do not confuse renderer statistics with actual GPU memory measurements. Clearly label estimated or unavailable metrics.

## 4. PHASE 2 — GLB MODEL OPTIMIZATION

Audit all approximately 30 GLB models.

Analyze:

- File size.
- Number of vertices.
- Number of triangles.
- Mesh count.
- Material count.
- Texture dimensions.
- Texture formats.
- Embedded textures.
- Animation data.
- Duplicate geometry.
- Unused materials.
- Unnecessary hidden geometry.

Implement:

### Geometry compression
- Draco compression where appropriate.
- Meshopt compression where appropriate.
- Remove redundant geometry.
- Remove unused attributes.
- Preserve important geometry details.

### Texture optimization
- Integrate KTX2 / Basis Universal.
- Use appropriate compression for base-color textures.
- Preserve normal-map quality.
- Preserve roughness and metallic maps.
- Generate mipmaps.
- Use sensible texture resolutions.
- Avoid unnecessary duplicate textures.

### Quality preservation
- Preserve PBR materials.
- Preserve UV mappings.
- Preserve animations.
- Preserve model orientation and scale.
- Preserve transparency.
- Preserve reflections and material appearance.
- Avoid visible degradation.

### Batch optimization

Create or improve an automation script named:

optimize-models.mjs

It should:

1. Find all GLB files in configured asset directories.
2. Analyze each model.
3. Generate optimized versions.
4. Preserve original files.
5. Report original and optimized file sizes.
6. Report percentage reduction.
7. Report geometry and texture statistics.
8. Identify models that fail to reach the target.
9. Never overwrite originals automatically.
10. Produce a summary report.

Target: Ideally 5–10 MB per model where achievable without noticeable visual degradation.

Do not force every model below 10 MB if doing so would significantly damage its appearance.

## 5. PHASE 3 — VEHICLE LEVEL OF DETAIL (LOD)

Implement a proper vehicle LOD architecture.

Create three detail levels:

LOD 0: HIGH
- Full-detail player vehicle.
- High-quality materials.
- Full visual details.
- High-resolution textures.

LOD 1: MEDIUM
- Simplified geometry.
- Reduced material complexity.
- Reduced small details.

LOD 2: LOW
- Simplified geometry.
- Reduced texture resolution.
- Minimal material complexity.

Distance-based switching must be configurable.

Initial example distances:

- 0–20 metres: High.
- 20–60 metres: Medium.
- 60–150 metres: Low.
- Beyond 150 metres: Hide or use a simplified representation where appropriate.

These values must be tested and adjusted according to camera perspective and gameplay.

Requirements:

- Never reduce the player's vehicle quality unnecessarily.
- Apply LOD to opponent vehicles.
- Avoid visible popping between LOD levels.
- Use appropriate transition techniques.
- Avoid repeatedly loading duplicate models.
- Reuse existing model caches.
- Support all vehicle types.
- Ensure multiplayer car positioning remains correct.

If suitable low-detail assets do not exist, create a clear asset-generation workflow rather than silently substituting unrelated models.

## 6. PHASE 4 — ENVIRONMENT LOD AND SPATIAL OPTIMIZATION

Optimize:

- Buildings.
- Trees.
- Streetlights.
- Roadside objects.
- Barriers.
- Spectators.
- Track decorations.
- Environmental structures.

Implement:

1. Distance-based visibility.
2. Environment LOD.
3. Spatial chunking.
4. Frustum culling.
5. Distance culling.
6. Occlusion culling where beneficial and feasible.
7. Efficient static geometry grouping.
8. InstancedMesh for repeated objects.
9. Reuse existing instancing implementations.

Important:

Do not combine unrelated dynamic objects into one mesh.

Preserve independent object movement, collision, and interaction.

Avoid rendering unnecessary objects far outside the player's relevant viewing area.

Ensure optimization works with different track configurations and weather presets.

## 7. PHASE 5 — DRAW CALL OPTIMIZATION

Audit all scene objects and materials.

Implement improvements such as:

- InstancedMesh.
- Shared materials.
- Shared geometries.
- Static mesh merging where appropriate.
- Texture atlases where beneficial.
- Efficient object grouping.
- Material reuse.
- Reduction of unnecessary render passes.

Pay particular attention to repeated:

- Trees.
- Roadside barriers.
- Streetlights.
- Track decorations.
- Spectators.
- Environmental props.

Measure draw calls before and after.

Do not sacrifice important material differences or dynamic object behavior.

## 8. PHASE 6 — LIGHTING AND SHADOW OPTIMIZATION

Audit the existing lighting architecture.

Optimize:

- Directional lighting.
- Ambient lighting.
- Environment lighting.
- Real-time shadows.
- Shadow map resolution.
- Shadow camera bounds.
- Reflection processing.
- Material complexity.
- Weather-dependent lighting.

Requirements:

1. Avoid unnecessary dynamic lights.
2. Use baked lighting where suitable.
3. Limit real-time shadow casting.
4. Use lower-cost shadows for distant objects.
5. Adjust shadow quality according to hardware.
6. Preserve realistic vehicle lighting.
7. Preserve day/night and weather appearance.
8. Avoid breaking headlights and other important dynamic lighting.

Implement configurable shadow-quality profiles.

## 9. PHASE 7 — ADAPTIVE GRAPHICS QUALITY

Create a centralized adaptive graphics quality system.

Support:

- LOW.
- MEDIUM.
- HIGH.
- ULTRA.
- AUTO.

The AUTO profile should monitor performance and adjust graphics settings.

Adjustable settings:

- Render resolution.
- Device pixel ratio.
- Shadow quality.
- Shadow resolution.
- Antialiasing where supported.
- Reflection quality.
- LOD distances.
- Particle density.
- Environment visibility.
- Texture quality.
- Post-processing quality.

Requirements:

1. Monitor FPS over a time window.
2. Avoid reacting to every individual FPS fluctuation.
3. Reduce graphics quality gradually when performance degrades.
4. Restore quality gradually when performance improves.
5. Prevent rapid quality switching.
6. Allow manual graphics settings.
7. Persist user preferences where appropriate.
8. Use sensible mobile defaults.

Example performance targets:

- Desktop: Stable 60 FPS.
- Mobile: Stable 30–60 FPS depending on device capabilities.

Never claim these targets are achieved without testing.

## 10. PHASE 8 — ADAPTIVE RENDER RESOLUTION

Implement dynamic rendering resolution.

Requirements:

- Monitor average frame time.
- Adjust render resolution based on performance.
- Set safe minimum and maximum pixel ratios.
- Account for device pixel ratio.
- Avoid abrupt visual changes.
- Avoid changing resolution every frame.
- Preserve correct camera aspect ratio.
- Preserve UI resolution and sharpness.
- Ensure resize handling works.

Do not reduce the actual game viewport or distort the camera.

## 11. PHASE 9 — PHYSICS OPTIMIZATION

Thoroughly inspect the existing physics implementation.

Optimize:

- Collision calculations.
- Track sampling.
- Repeated mathematical operations.
- Temporary allocations.
- Vector and matrix reuse.
- Spatial queries.
- Physics update scheduling.
- Collision geometry.

Use simplified collision geometry instead of detailed visual meshes.

Consider spatial partitioning where the current number of objects justifies it.

Preserve:

- Existing car handling.
- Acceleration.
- Braking.
- Steering.
- Drifting.
- Collision behavior.
- Track boundaries.
- Multiplayer synchronization.
- Server-authoritative state.

Do not change physics constants or handling characteristics without testing.

## 12. PHASE 10 — GAME LOOP OPTIMIZATION

Inspect the complete rendering and simulation loop.

Implement improvements:

- Avoid unnecessary allocations per frame.
- Reuse vectors, matrices, and temporary objects.
- Avoid unnecessary React state updates.
- Keep high-frequency game state outside React rendering.
- Avoid repeated expensive calculations.
- Avoid redundant scene traversals.
- Avoid duplicate animation loops.
- Use requestAnimationFrame appropriately.
- Use a fixed timestep for physics where appropriate.
- Use interpolation for visual rendering.
- Prevent unnecessary work when the game is paused.

Preserve multiplayer timing and synchronization.

## 13. PHASE 11 — OBJECT POOLING

Audit all frequently created and destroyed objects.

Use pooling for:

- Particles.
- Rain.
- Smoke.
- Tire marks.
- Collision effects.
- Temporary obstacles.
- Repeated visual effects.

Reuse existing pools.

Avoid creating unnecessary Three.js objects during every frame.

Ensure pooled objects are correctly reset before reuse.

## 14. PHASE 12 — ASSET LOADING ARCHITECTURE

Improve the existing asset loading system.

Implement or improve:

- Lazy loading.
- Progressive loading.
- Background loading.
- Priority-based loading.
- GLB caching.
- Texture caching.
- IndexedDB persistence.
- Duplicate request prevention.
- Network-aware loading.
- CDN-compatible loading.
- Loading progress.
- Retry handling.
- Failed asset recovery.

Recommended loading priority:

1. Player vehicle.
2. Current track and essential track objects.
3. Nearby opponents.
4. Nearby environment objects.
5. Distant environment assets.
6. Remaining optional assets.

Do not download all 30 GLB models immediately when the game starts.

Support cancellation or ignoring obsolete requests when switching tracks or game sessions.

Preserve existing caching behavior and avoid memory duplication.

## 15. PHASE 13 — MEMORY MANAGEMENT

Audit the complete Three.js resource lifecycle.

Prevent:

- Geometry memory leaks.
- Material memory leaks.
- Texture memory leaks.
- Duplicate GLB instances.
- Unnecessary renderer creation.
- Unreleased event listeners.
- Unreleased WebSocket resources.
- Unnecessary background asset retention.

Ensure correct use of:

- geometry.dispose()
- material.dispose()
- texture.dispose()
- renderer.dispose()

Be careful with shared resources.

Never dispose of a texture, material, or geometry while another active model is using it.

Implement reference-aware resource management if necessary.

Test scene switching, track switching, game restart, and component unmounting.

## 16. PHASE 14 — MULTIPLAYER OPTIMIZATION

This is a multiplayer racing game, so performance improvements must not break multiplayer.

Audit:

- WebSocket communication.
- Player state synchronization.
- Server-side simulation.
- Update frequency.
- Network message size.
- Interpolation.
- Prediction if already supported.
- Reconnection handling.
- Player join and leave behavior.

Optimize unnecessary network traffic.

Avoid transmitting data that can be calculated locally.

Preserve server-authoritative gameplay and existing room functionality.

Do not compromise game fairness or synchronization for performance.

Test with multiple simultaneous players.

## 17. PHASE 15 — MOBILE OPTIMIZATION

Ensure the game works smoothly on mobile browsers.

Implement:

- Adaptive pixel ratio.
- Lower-cost shadows.
- Reduced particle density.
- Appropriate LOD distances.
- Texture memory limits.
- Efficient touch input.
- Mobile graphics profiles.
- Responsive rendering.
- Proper handling of device orientation.
- Efficient asset downloads.

Handle browser WebGL limitations gracefully.

Do not assume every mobile device supports the same texture compression formats.

Provide fallback formats where necessary.

## 18. PHASE 16 — WEBGL AND BROWSER OPTIMIZATION

Audit:

- WebGL context creation.
- Renderer configuration.
- GPU resource management.
- Shader compilation.
- Shader reuse.
- Material variants.
- Context loss and restoration.
- Browser compatibility.

Implement appropriate WebGL context-lost handling.

Avoid compiling large numbers of shaders during active racing where possible.

Use supported rendering features based on detected hardware.

## 19. PHASE 17 — FINAL TESTING

Test all major game scenarios:

1. Initial application loading.
2. First-time model downloads.
3. Repeat visits with cached assets.
4. Player vehicle selection.
5. Multiplayer room creation.
6. Multiplayer room joining.
7. Multiple cars on the track.
8. Different environments.
9. Different weather conditions.
10. Camera movement.
11. Collisions.
12. Drifting.
13. Track switching.
14. Restarting the game.
15. Switching graphics quality.
16. Desktop browser.
17. Mobile browser.
18. Low-end hardware.
19. Long gameplay sessions.

Check for:

- FPS drops.
- Frame-time spikes.
- Memory growth.
- GPU resource leaks.
- Failed asset requests.
- Visual glitches.
- LOD popping.
- Missing textures.
- Incorrect shadows.
- Broken physics.
- Multiplayer desynchronization.
- WebSocket disconnections.

## 20. BENCHMARKING AND REPORTING

Create a before-and-after performance report.

Measure:

- Average FPS.
- Minimum FPS.
- Frame time.
- Draw calls.
- Triangle count.
- Geometry count.
- Texture count.
- Approximate GPU resource usage where available.
- Total GLB library size.
- Initial asset download.
- Time to playable state.
- Memory consumption where measurable.
- Network traffic.

Compare results on equivalent devices and test scenarios.

Do not fabricate performance improvements.

If a metric cannot be measured reliably, clearly state that.

## 21. CODE QUALITY AND SAFETY RULES

Follow these rules throughout the implementation:

1. Inspect before modifying.
2. Preserve existing architecture.
3. Avoid unnecessary dependencies.
4. Use TypeScript types properly.
5. Avoid `any` unless absolutely necessary.
6. Avoid duplicated functionality.
7. Avoid unnecessary code abstractions.
8. Keep optimizations configurable.
9. Keep desktop and mobile behavior compatible.
10. Preserve existing visual quality.
11. Preserve all game features.
12. Do not remove working functionality.
13. Do not introduce placeholder implementations.
14. Do not claim features are implemented if they are not.
15. Do not silently ignore failed operations.
16. Do not overwrite original GLB assets.
17. Keep changes organized and maintainable.

Before making substantial changes, explain which files will be modified and why.

## 22. IMPLEMENTATION STRATEGY

Follow this sequence:

Phase A: Full project audit and baseline measurements.

Phase B: GLB geometry and texture optimization.

Phase C: Vehicle and environment LOD.

Phase D: Draw-call and instancing improvements.

Phase E: Lighting, shadows, and adaptive graphics.

Phase F: Rendering resolution optimization.

Phase G: Physics and game-loop optimization.

Phase H: Asset loading and caching improvements.

Phase I: Memory management.

Phase J: Multiplayer and network optimization.

Phase K: Mobile and browser optimization.

Phase L: Final testing and benchmarking.

For each phase:

1. Inspect existing implementation.
2. Identify what already works.
3. Identify what is missing.
4. Implement only necessary changes.
5. Run TypeScript checks.
6. Run tests.
7. Run the production build.
8. Verify existing functionality.
9. Document modified files.
10. Record measurable performance differences.
11. Move to the next phase.

If one optimization cannot be completed because of missing assets, unsupported hardware, or missing infrastructure, document the exact blocker and continue with independent optimizations.

Do not stop after the audit. Continue implementation through all feasible phases.

## 23. FINAL DELIVERABLES

At completion, provide:

1. Complete project optimization audit.
2. List of existing optimizations preserved.
3. List of previously incomplete features fixed.
4. List of newly implemented optimizations.
5. List of modified and created files.
6. New dependencies and their purpose.
7. GLB optimization report.
8. Before-and-after performance report.
9. Desktop testing results.
10. Mobile testing results.
11. Remaining performance bottlenecks.
12. Any features that require manual testing.

## FINAL OBJECTIVE

Transform the existing project into a highly optimized, visually rich, responsive multiplayer 3D car racing web game.

Prioritize:

- High visual quality.
- Smooth gameplay.
- Stable frame rates.
- Fast initial loading.
- Low GPU and CPU overhead.
- Efficient memory consumption.
- Optimized GLB assets.
- Reliable multiplayer synchronization.
- Excellent desktop and mobile compatibility.

Do not optimize only for benchmark numbers.

The final result must remain visually attractive, playable, stable, and maintainable.

Start by auditing the entire existing repository. Then proceed systematically with the complete implementation.