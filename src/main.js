import { initScene, updateMountain, exportSTL, saveModel, loadModel } from './model.js';

const canvas = document.getElementById('viewer');
const params = {
  width: document.getElementById('width'),
  height: document.getElementById('height'),
  param1: document.getElementById('param1'),
  flatBack: document.getElementById('flatBack'),
  // ... other params
};

const { scene, controls } = initScene(canvas);


function collectConfig() {
  return {
    width: +params.width.value,
    height: +params.height.value,
    param1: +params.param1.value,
    flatBack: params.flatBack.checked,
    // ... collect other params
  };
}

function refresh() {
  updateMountain(collectConfig());
}

Object.values(params).forEach(input => input.addEventListener('input', refresh));

document.getElementById('exportBtn').addEventListener('click', () => exportSTL());
document.getElementById('saveBtn').addEventListener('click', () => saveModel());
document.getElementById('loadBtn').addEventListener('click', () => {
  const config = loadModel();
  if (config) {
    params.width.value = config.width;
    params.height.value = config.height;
    params.param1.value = config.param1;
    params.flatBack.checked = config.flatBack;
    // ... update other params
    refresh();
  }
});

refresh();
