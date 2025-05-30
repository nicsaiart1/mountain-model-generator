import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { STLExporter } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/exporters/STLExporter.js';

let scene, camera, renderer, controls, mountain;
let currentConfig = {};

export function initScene(canvas) {
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 50, 100);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  updateMountain({ width: 100, height: 100, param1: 0.5, flatBack: false });

  animate();
  return { scene, controls };
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

export function updateMountain(config) {
  currentConfig = { ...config };
  if (mountain) scene.remove(mountain);
  const geometry = new THREE.PlaneGeometry(config.width, config.height, 64, 64);
  // Simple vertex displacement using param1
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    let y = Math.sin(i + config.param1 * 10) * config.height * 0.05;
    if (config.flatBack && y < 0) y = 0;
    position.setZ(i, y);
  }
  geometry.computeVertexNormals();
  mountain = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x5566aa, side: THREE.DoubleSide, flatShading: true }));
  mountain.rotateX(-Math.PI / 2);
  scene.add(mountain);
}

export function exportSTL() {
  const exporter = new STLExporter();
  const stlString = exporter.parse(mountain);
  const blob = new Blob([stlString], { type: 'model/stl' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mountain.stl';
  a.click();
  URL.revokeObjectURL(url);
}

export function saveModel() {
  localStorage.setItem('mountainModel', JSON.stringify(currentConfig));
}

export function loadModel() {
  const json = localStorage.getItem('mountainModel');
  currentConfig = json ? JSON.parse(json) : null;
  return currentConfig;
}
