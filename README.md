<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9710eadd-c322-4e44-904f-22313a523fe4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 3D model optimization

The `dev`, `start`, and `build` scripts automatically optimize every `.glb` file under `public/models`. Newly added or changed models are processed the next time one of those commands runs. You can also run `npm run optimize:models` directly.

The optimizer uses high-precision Meshopt, does not simplify meshes, and leaves embedded textures unchanged. It writes copies to the ignored `public/models-optimized/` directory and never overwrites source files. If a model would not get smaller, its source is copied unchanged. The first run takes longer; later runs skip unchanged models. A geometry and texture inspection report is written to `performance-model-report.md`.

"# car-game" 
