# Architecture Overview

This document outlines the architecture for **Mountain Model Generator**, a web application that generates and exports 3D mountain range models.

## 1. Technology Stack

- **Frontend**: HTML, CSS and JavaScript using [Three.js](https://threejs.org) for 3D rendering.
- **Build Tool**: Vite or a simple local dev server (no build step required for minimal demo).
- **State Management**: Basic JavaScript objects stored in `localStorage` for persisting user models.

## 2. Application Layers

1. **UI Layer**
   - Responsive `canvas` for 3D view (touch and mouse support via Three.js orbit controls).
   - Compact parameters panel anchored at the bottom of the screen with sliders/inputs for real‑time control of mountain properties (dimensions and 10 style parameters).
   - Checkbox option to force a flat back side for easier 3D printing.
   - Buttons for saving/loading models and for exporting to STL.

2. **Rendering Layer**
   - Scene setup with camera, lights, and orbit controls.
   - Mountain mesh generated procedurally based on parameter values. Geometry updates when parameters change.
   - STL export implemented with Three.js `STLExporter`.

3. **Persistence Layer**
   - Models serialized to JSON and stored in `localStorage` under a unique key.
   - Ability to load saved models on demand and update the UI/scene.

## 3. File Structure

```
root/
├── docs/
│   └── architecture.md
├── public/
│   └── index.html
├── src/
│   ├── main.js
│   └── model.js
└── package.json
```

- `public/index.html` – HTML shell including the canvas and control panel.
- `src/main.js` – App entry point, scene setup and UI wiring.
- `src/model.js` – Functions for creating/updating the mountain mesh and handling exports.

## 4. Future Improvements

- Replace vanilla JavaScript with a framework (React/Vue) for more complex UIs.
- Implement a full build step and testing pipeline.
- Add additional export formats or texture support.

