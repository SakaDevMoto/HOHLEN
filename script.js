import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

const seedChip = document.getElementById('seedChip');
const controlChip = document.getElementById('controlChip');
const modeChip = document.getElementById('modeChip');
const inventoryChip = document.getElementById('inventoryChip');
const miningChip = document.getElementById('miningChip');
const testChip = document.getElementById('testChip');
const hotbarSlots = [...document.querySelectorAll('#hotbar .slot')];
const minimapShell = document.getElementById('minimapShell');
const minimapCanvas = document.getElementById('minimapCanvas');
const minimapCtx = minimapCanvas.getContext('2d');
const minimapLabel = document.getElementById('minimapLabel');
const bigMap = document.getElementById('bigMap');
const bigMapCanvas = document.getElementById('bigMapCanvas');
const bigMapCtx = bigMapCanvas.getContext('2d');
const bigMapCloseButton = document.getElementById('bigMapCloseButton');
const inventoryPanel = document.getElementById('inventoryPanel');
const inventoryGrid = document.getElementById('inventoryGrid');
const inventoryCloseButton = document.getElementById('inventoryCloseButton');
const chestPanel = document.getElementById('chestPanel');
const chestGrid = document.getElementById('chestGrid');
const transferAllButton = document.getElementById('transferAllButton');
const chestCloseButton = document.getElementById('chestCloseButton');
const upgradePanel = document.getElementById('upgradePanel');
const upgradePickaxeButton = document.getElementById('upgradePickaxeButton');
const upgradeFlashlightButton = document.getElementById('upgradeFlashlightButton');
const upgradeCloseButton = document.getElementById('upgradeCloseButton');
const pickaxeLevelValue = document.getElementById('pickaxeLevelValue');
const pickaxeDamageValue = document.getElementById('pickaxeDamageValue');
const flashlightLevelValue = document.getElementById('flashlightLevelValue');
const flashlightPowerValue = document.getElementById('flashlightPowerValue');
const upgradeHint = document.getElementById('upgradeHint');
const mobileHud = document.getElementById('mobileHud');
const mobileInventoryButton = document.getElementById('mobileInventoryButton');
const mobileLeftPad = document.getElementById('mobileLeftPad');
const mobileRightPad = document.getElementById('mobileRightPad');
const mobileActionButton = document.getElementById('mobileActionButton');
const mobileActionLabel = mobileActionButton.querySelector('.action-label');
const mobileActionNote = mobileActionButton.querySelector('.action-note');
const mobileLeftKnob = mobileLeftPad.querySelector('.mobile-stick-knob');
const mobileRightKnob = mobileRightPad.querySelector('.mobile-stick-knob');
const panelMap = {
  inventory: inventoryPanel,
  chest: chestPanel,
  upgrades: upgradePanel,
};
const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07090c);
    scene.fog = new THREE.FogExp2(0x07090c, 0.043);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 220);
    camera.position.set(0, 1.7, 0);
    scene.add(camera);

const clock = new THREE.Clock();
const up = new THREE.Vector3(0, 1, 0);
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const tempVec = new THREE.Vector3();

const lookState = {
      yaw: 0,
      pitch: 0,
      sensitivity: 0.0024,
      dragSensitivity: 0.0052,
      isDragging: false,
      pointerLockActive: false,
      preferPointerLock: true,
      fallbackOnly: false,
      lastPointerError: '',
    };

const keyState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      sprint: false,
    };

const mobileState = {
      enabled: false,
      lookSensitivity: 0.0092,
      dragSensitivity: 0.0072,
      left: {
        active: false,
        id: null,
        centerX: 0,
        centerY: 0,
        maxRadius: 44,
        x: 0,
        y: 0,
      },
      right: {
        active: false,
        id: null,
        centerX: 0,
        centerY: 0,
        maxRadius: 42,
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
      },
      drag: {
        active: false,
        id: null,
        lastX: 0,
        lastY: 0,
      },
      actionTouchId: null,
      actionHeld: false,
    };

const itemState = {
      equippedSlot: -1,
      flashlightOn: true,
      mapOpen: false,
      inventoryOpen: false,
      gameActive: false,
    };

const uiState = {
  activePanel: null,
};

const areaState = {
  currentArea: 'home',
  caveSeed: null,
  homeSeed: 91357,
};

const raycaster = new THREE.Raycaster();
const screenCenter = new THREE.Vector2(0, 0);
const miningAimSamples = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.026, 0),
      new THREE.Vector2(-0.026, 0),
      new THREE.Vector2(0, 0.026),
      new THREE.Vector2(0, -0.026),
    ];

const interactionState = {
  range: 3.2,
};

const playerState = {
      bodyY: 0,
      verticalVelocity: 0,
      grounded: true,
      jumpQueued: false,
    };

const oreDefinitions = [
      { id: 'ferrita', short: 'Fe', label: 'Ferrita', level: 1, color: 0xb8c6df, emissive: 0x4a6f9f, hits: 2, dropMin: 1, dropMax: 2, clusterMin: 5, clusterMax: 8, rarity: 0.34 },
      { id: 'cobre', short: 'Cu', label: 'Cobre vivo', level: 2, color: 0xff9966, emissive: 0x8a3f1a, hits: 4, dropMin: 1, dropMax: 3, clusterMin: 5, clusterMax: 9, rarity: 0.26 },
      { id: 'ametista', short: 'Am', label: 'Ametista', level: 3, color: 0xc28cff, emissive: 0x5b2b9d, hits: 6, dropMin: 2, dropMax: 4, clusterMin: 6, clusterMax: 10, rarity: 0.18 },
      { id: 'safira', short: 'Sa', label: 'Safira fria', level: 4, color: 0x5dc6ff, emissive: 0x114f83, hits: 8, dropMin: 2, dropMax: 5, clusterMin: 6, clusterMax: 10, rarity: 0.14 },
      { id: 'aurio', short: 'Au', label: 'Ãurio', level: 5, color: 0xffe87a, emissive: 0x9a7315, hits: 11, dropMin: 3, dropMax: 6, clusterMin: 7, clusterMax: 11, rarity: 0.08 },
    ];

const inventoryState = {
      totals: Object.fromEntries(oreDefinitions.map((definition) => [definition.id, 0])),
    };

const chestState = {
  totals: Object.fromEntries(oreDefinitions.map((definition) => [definition.id, 0])),
};

const playerStats = {
  pickaxeDamage: 1,
  flashlightLevel: 1,
};

const SAVE_KEY = 'hohlen-save-v1';

function makeEmptyTotals() {
  return Object.fromEntries(oreDefinitions.map((definition) => [definition.id, 0]));
}

function sanitizeTotals(source = {}) {
  const totals = makeEmptyTotals();
  for (const definition of oreDefinitions) {
    const value = Number(source[definition.id]);
    totals[definition.id] = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  }
  return totals;
}

function getSaveData() {
  return {
    inventoryTotals: { ...inventoryState.totals },
    chestTotals: { ...chestState.totals },
    playerStats: {
      pickaxeDamage: Math.max(1, Math.floor(playerStats.pickaxeDamage)),
      flashlightLevel: Math.max(1, Math.floor(playerStats.flashlightLevel)),
    },
    itemState: {
      flashlightOn: !!itemState.flashlightOn,
      equippedSlot: Number.isInteger(itemState.equippedSlot) ? itemState.equippedSlot : -1,
    },
  };
}

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(getSaveData()));
  } catch (error) {
    console.warn('Falha ao salvar o jogo:', error);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    inventoryState.totals = sanitizeTotals(data.inventoryTotals);
    chestState.totals = sanitizeTotals(data.chestTotals);

    playerStats.pickaxeDamage = Math.max(1, Math.floor(data.playerStats?.pickaxeDamage ?? 1));
    playerStats.flashlightLevel = Math.max(1, Math.floor(data.playerStats?.flashlightLevel ?? 1));

    itemState.flashlightOn = data.itemState?.flashlightOn ?? true;
    itemState.equippedSlot = Number.isInteger(data.itemState?.equippedSlot) ? data.itemState.equippedSlot : -1;
  } catch (error) {
    console.warn('Falha ao carregar save:', error);
  }
}

const oreVisuals = {
      ferrita: {
        primary: '#dbe7ff',
        secondary: '#88b0ff',
        border: '#425a83',
        glow: 'rgba(136, 176, 255, 0.18)',
        outerPath: 'M32 4L50 18L45 42L23 58L8 32L16 12Z',
        innerPath: 'M31 14L40 21L36 35L24 45L18 28L24 18Z',
      },
      cobre: {
        primary: '#ffc6a3',
        secondary: '#ff8f59',
        border: '#7f4324',
        glow: 'rgba(255, 143, 89, 0.19)',
        outerPath: 'M30 5L52 16L47 39L28 59L10 35L15 14Z',
        innerPath: 'M30 15L40 20L37 34L27 45L18 31L22 18Z',
      },
      ametista: {
        primary: '#e7c8ff',
        secondary: '#b76dff',
        border: '#65329b',
        glow: 'rgba(183, 109, 255, 0.19)',
        outerPath: 'M32 3L47 12L51 30L40 56L19 58L10 30L17 11Z',
        innerPath: 'M32 13L39 19L41 31L35 45L24 46L18 30L23 18Z',
      },
      safira: {
        primary: '#bcf0ff',
        secondary: '#49bfff',
        border: '#195678',
        glow: 'rgba(73, 191, 255, 0.19)',
        outerPath: 'M32 4L49 13L54 28L44 50L24 60L10 40L12 18Z',
        innerPath: 'M32 14L40 20L43 31L37 43L25 49L18 35L20 21Z',
      },
      aurio: {
        primary: '#fff0ad',
        secondary: '#f1c451',
        border: '#8b6b1f',
        glow: 'rgba(241, 196, 81, 0.2)',
        outerPath: 'M31 4L48 10L56 29L46 51L24 59L9 41L13 16Z',
        innerPath: 'M31 14L39 18L44 30L38 43L25 48L17 35L19 21Z',
      },
    };

const inventoryEntries = new Map();
const chestEntries = new Map();
const dropAssetCache = new Map();
const dropMeshPools = new Map();

const miningState = {
      swingProgress: Math.PI,
      swinging: false,
      lastHitAt: -10,
      hitCooldown: 0.22,
      range: 3.95,
      targetNode: null,
      holdActive: false,
    };

const world = {
      seed: 0,
      rng: null,
      map: [],
      discovery: [],
      visited: [],
      lastVisitedCell: null,
      nodes: [],
      homeRoom: null,
      spawn: null,
      spawnDir: { x: 0, z: -1 },
      group: new THREE.Group(),
      rockColliders: [],
      interactables: [],
      oreNodes: [],
      oreHitMeshes: [],
      dropItems: [],
      sparkParticles: [],
      cellSize: 2.35,
      width: 63,
      height: 63,
      playerRadius: 0.48,
      playerHeight: 1.68,
      floorNoise: null,
      ceilingNoise: null,
    };

    scene.add(world.group);

    const ambient = new THREE.AmbientLight(0x5d6572, 0.11);
    scene.add(ambient);

    const playerLamp = new THREE.PointLight(0xffd9a6, 0, 8, 2);
    playerLamp.position.set(0, 0.08, 0);
    camera.add(playerLamp);

    const softFill = new THREE.PointLight(0x8ba8ff, 0.04, 6, 2);
    softFill.position.set(0, -0.35, 0);
    camera.add(softFill);

    const flashlightPivot = new THREE.Group();
    flashlightPivot.position.set(0, 0.02, 0.04);
    camera.add(flashlightPivot);

    const flashlightModel = new THREE.Group();
    flashlightModel.visible = false;
    flashlightPivot.add(flashlightModel);

    const flashlightBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.065, 0.42, 14, 1),
      new THREE.MeshStandardMaterial({ color: 0x242a32, roughness: 0.78, metalness: 0.22 })
    );
    flashlightBody.rotation.z = Math.PI / 2;
    flashlightBody.castShadow = true;
    flashlightModel.add(flashlightBody);

    const flashlightHead = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.078, 0.1, 16, 1),
      new THREE.MeshStandardMaterial({ color: 0x3b434f, roughness: 0.62, metalness: 0.28 })
    );
    flashlightHead.position.x = 0.22;
    flashlightHead.rotation.z = Math.PI / 2;
    flashlightHead.castShadow = true;
    flashlightModel.add(flashlightHead);

    const flashlightLens = new THREE.Mesh(
      new THREE.CircleGeometry(0.062, 20),
      new THREE.MeshStandardMaterial({ color: 0xe6edf7, emissive: 0xffe4aa, emissiveIntensity: 0.25, roughness: 0.2, metalness: 0.05 })
    );
    flashlightLens.position.set(0.275, 0, 0);
    flashlightLens.rotation.y = -Math.PI / 2;
    flashlightModel.add(flashlightLens);

    const flashlightBeam = new THREE.SpotLight(0xffefc2, 0, 42, Math.PI / 11, 0.34, 2);
    flashlightBeam.position.set(0, 0, 0);
    flashlightBeam.castShadow = true;
    flashlightBeam.shadow.mapSize.set(512, 512);
    flashlightBeam.shadow.bias = -0.0007;
    flashlightBeam.shadow.camera.near = 0.1;
    flashlightBeam.shadow.camera.far = 42;
    flashlightBeam.target.position.set(0, 0, -12);
    flashlightPivot.add(flashlightBeam);
    flashlightPivot.add(flashlightBeam.target);

    function criarPicareta() {
      const picareta = new THREE.Group();

      const materialCabo = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 });
      const materialLamina = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.8, roughness: 0.3 });

      const geometriaCabo = new THREE.CylinderGeometry(0.04, 0.04, 1.28, 8);
      const cabo = new THREE.Mesh(geometriaCabo, materialCabo);
      cabo.position.y = 0.64;
      cabo.castShadow = true;
      picareta.add(cabo);

      const geometriaEncaixe = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const encaixe = new THREE.Mesh(geometriaEncaixe, materialLamina);
      encaixe.position.y = 1.16;
      encaixe.castShadow = true;
      picareta.add(encaixe);

      const geometriaPonta = new THREE.CylinderGeometry(0.01, 0.06, 0.8, 8);

      const pontaDireita = new THREE.Mesh(geometriaPonta, materialLamina);
      pontaDireita.position.set(0.34, 1.13, 0);
      pontaDireita.rotation.z = (Math.PI / 2) + 0.2;
      pontaDireita.castShadow = true;
      picareta.add(pontaDireita);

      const pontaEsquerda = new THREE.Mesh(geometriaPonta, materialLamina);
      pontaEsquerda.position.set(-0.34, 1.13, 0);
      pontaEsquerda.rotation.z = (Math.PI / 2) - 0.2;
      pontaEsquerda.castShadow = true;
      picareta.add(pontaEsquerda);

      return picareta;
    }

    const pickaxePivot = new THREE.Group();
    pickaxePivot.position.set(0.5, -0.5, -0.8);
    camera.add(pickaxePivot);

    const pickaxeModel = criarPicareta();
    pickaxeModel.visible = false;
    pickaxeModel.position.set(0, -0.14, 0);
    pickaxeModel.rotation.set(0.18, 1.42, 0.18);
    pickaxePivot.add(pickaxeModel);

    function clampPitch(value) {
      const limit = Math.PI / 2 - 0.2;
      return THREE.MathUtils.clamp(value, -limit, limit);
    }

    function applyLook() {
      camera.rotation.order = 'YXZ';
      camera.rotation.y = lookState.yaw;
      camera.rotation.x = lookState.pitch;
      camera.rotation.z = 0;
    }

    function updateControlChip() {
      if (mobileState.enabled) {
        controlChip.innerHTML = '<span class="muted">Controles:</span> move | olha | acao | inv | mapa';
        return;
      }
      controlChip.innerHTML = '<span class="muted">Controles:</span> WASD | mouse | Shift | Espaco | L | 1 | clique | E | I | M';
    }

    function applyLookDelta(deltaX, deltaY, sensitivity) {
      lookState.yaw -= deltaX * sensitivity;
      lookState.pitch = clampPitch(lookState.pitch - deltaY * sensitivity);
      applyLook();
    }

    function setStickKnob(knobElement, x, y) {
      knobElement.style.setProperty('--knob-x', `${x.toFixed(1)}px`);
      knobElement.style.setProperty('--knob-y', `${y.toFixed(1)}px`);
    }

    function resetMobileLeftStick() {
      mobileState.left.active = false;
      mobileState.left.id = null;
      mobileState.left.x = 0;
      mobileState.left.y = 0;
      setStickKnob(mobileLeftKnob, 0, 0);
      mobileLeftPad.classList.remove('active');
      mobileLeftPad.setAttribute('aria-hidden', 'true');
      mobileLeftPad.style.setProperty('--pad-x', '-999px');
      mobileLeftPad.style.setProperty('--pad-y', '-999px');
    }

    function resetMobileRightStick() {
      mobileState.right.active = false;
      mobileState.right.id = null;
      mobileState.right.x = 0;
      mobileState.right.y = 0;
      setStickKnob(mobileRightKnob, 0, 0);
      mobileRightPad.classList.remove('active');
      mobileRightPad.setAttribute('aria-hidden', 'true');
    }

    function resetMobileControls() {
      resetMobileLeftStick();
      resetMobileRightStick();
      resetMobileLookDrag();
      mobileState.actionTouchId = null;
      mobileState.actionHeld = false;
    }

    function resetMobileLookDrag() {
      mobileState.drag.active = false;
      mobileState.drag.id = null;
      mobileState.drag.lastX = 0;
      mobileState.drag.lastY = 0;
    }

    function getStickRadius(stickElement) {
      const rect = stickElement.getBoundingClientRect();
      return Math.max(28, rect.width * 0.34);
    }

    function updateLeftStickPosition(clientX, clientY) {
      const dx = clientX - mobileState.left.centerX;
      const dy = clientY - mobileState.left.centerY;
      const distance = Math.hypot(dx, dy);
      const clampedDistance = Math.min(distance, mobileState.left.maxRadius);
      const factor = distance > 0 ? clampedDistance / distance : 0;
      mobileState.left.x = dx * factor;
      mobileState.left.y = dy * factor;
      setStickKnob(mobileLeftKnob, mobileState.left.x, mobileState.left.y);
    }

    function beginMobileLeftStick(touch) {
      mobileState.left.active = true;
      mobileState.left.id = touch.identifier;
      mobileState.left.centerX = touch.clientX;
      mobileState.left.centerY = touch.clientY;
      mobileState.left.maxRadius = getStickRadius(mobileLeftPad);
      mobileLeftPad.style.setProperty('--pad-x', `${touch.clientX}px`);
      mobileLeftPad.style.setProperty('--pad-y', `${touch.clientY}px`);
      mobileLeftPad.classList.add('active');
      mobileLeftPad.setAttribute('aria-hidden', 'false');
      updateLeftStickPosition(touch.clientX, touch.clientY);
    }

    function beginMobileRightStick(touch) {
      const rect = mobileRightPad.getBoundingClientRect();
      mobileState.right.active = true;
      mobileState.right.id = touch.identifier;
      mobileState.right.centerX = rect.left + rect.width / 2;
      mobileState.right.centerY = rect.top + rect.height / 2;
      mobileState.right.lastX = touch.clientX;
      mobileState.right.lastY = touch.clientY;
      mobileState.right.maxRadius = getStickRadius(mobileRightPad);
      mobileRightPad.classList.add('active');
      mobileRightPad.setAttribute('aria-hidden', 'false');
      updateMobileRightStick(touch);
    }

    function beginMobileLookDrag(touch) {
      mobileState.drag.active = true;
      mobileState.drag.id = touch.identifier;
      mobileState.drag.lastX = touch.clientX;
      mobileState.drag.lastY = touch.clientY;
    }

    function updateMobileRightStick(touch) {
      const dx = touch.clientX - mobileState.right.centerX;
      const dy = touch.clientY - mobileState.right.centerY;
      const distance = Math.hypot(dx, dy);
      const clampedDistance = Math.min(distance, mobileState.right.maxRadius);
      const factor = distance > 0 ? clampedDistance / distance : 0;
      mobileState.right.x = dx * factor;
      mobileState.right.y = dy * factor;
      setStickKnob(mobileRightKnob, mobileState.right.x, mobileState.right.y);

      if (itemState.gameActive && !itemState.inventoryOpen && !itemState.mapOpen) {
        applyLookDelta(
          touch.clientX - mobileState.right.lastX,
          touch.clientY - mobileState.right.lastY,
          mobileState.lookSensitivity
        );
      }

      mobileState.right.lastX = touch.clientX;
      mobileState.right.lastY = touch.clientY;
    }

    function updateMobileLookDrag(touch) {
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      applyLookDelta(
        touch.clientX - mobileState.drag.lastX,
        touch.clientY - mobileState.drag.lastY,
        mobileState.dragSensitivity
      );
      mobileState.drag.lastX = touch.clientX;
      mobileState.drag.lastY = touch.clientY;
    }

    function shouldUseMobileLayout() {
      const hasTouch = coarsePointerQuery.matches || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
      return hasTouch && window.innerWidth <= 1024;
    }

    function isTouchOverInteractiveUi(target) {
      return Boolean(target?.closest(
        '#mobileInventoryButton, #mobileActionButton, #mobileRightPad, #hotbar, #minimapShell, #minimapLabel, #bigMap, .modal-window, .modal-header, .modal-toolbar, .panel-close-button'
      ));
    }

    function canStartMobileLeftStick(touch) {
      if (!mobileState.enabled || mobileState.left.active) return false;
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return false;
      if (touch.clientX > window.innerWidth * 0.58) return false;
      if (touch.clientY < window.innerHeight * 0.16) return false;
      if (isTouchOverInteractiveUi(touch.target)) return false;
      return true;
    }

    function canStartMobileLookDrag(touch) {
      if (!mobileState.enabled || mobileState.drag.active) return false;
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return false;
      if (isTouchOverInteractiveUi(touch.target)) return false;
      return true;
    }

    function updateResponsiveLayout() {
      const enabled = shouldUseMobileLayout();
      mobileState.enabled = enabled;
      document.body.classList.toggle('mobile-layout', enabled);
      mobileHud.setAttribute('aria-hidden', String(!enabled));
      resetMobileControls();

      if (enabled) {
        lookState.preferPointerLock = false;
        lookState.fallbackOnly = true;
        lookState.lastPointerError = '';
        if (document.pointerLockElement === document.body) {
          document.exitPointerLock();
        }
      } else {
        lookState.preferPointerLock = true;
        lookState.fallbackOnly = false;
      }

      updateControlChip();
      updateModeChip();
      updateMiningHud();
    }

    function updateModeChip() {
      if (uiState.activePanel === 'inventory') {
        modeChip.textContent = 'Modo: inventario aberto';
        return;
      }
      if (uiState.activePanel === 'chest') {
        modeChip.textContent = 'Modo: bau aberto';
        return;
      }
      if (uiState.activePanel === 'upgrades') {
        modeChip.textContent = 'Modo: melhorias abertas';
        return;
      }
      if (!itemState.gameActive) {
        modeChip.textContent = 'Modo: pausa';
        return;
      }
      if (mobileState.enabled) {
        modeChip.textContent = 'Modo: controle touch';
        return;
      }
      if (lookState.pointerLockActive) {
        modeChip.textContent = 'Modo: pointer lock ativo';
        return;
      }
      if (lookState.fallbackOnly || lookState.lastPointerError) {
        modeChip.textContent = 'Modo: arrastar mouse para olhar';
        return;
      }
      modeChip.textContent = 'Modo: clique para travar a camera';
    }

    function tryRequestPointerLock() {
      if (!document.body.requestPointerLock) {
        lookState.lastPointerError = 'API de pointer lock indisponivel';
        lookState.fallbackOnly = true;
        updateModeChip();
        return false;
      }

      try {
        document.body.requestPointerLock();
        return true;
      } catch (error) {
        lookState.lastPointerError = error?.message || 'Pointer lock bloqueado';
        lookState.fallbackOnly = true;
        updateModeChip();
        return false;
      }
    }

    document.addEventListener('pointerlockchange', () => {
      lookState.pointerLockActive = document.pointerLockElement === document.body;
      updateModeChip();
    });

    document.addEventListener('pointerlockerror', () => {
      lookState.lastPointerError = 'Pointer lock bloqueado pelo ambiente';
      lookState.fallbackOnly = true;
      lookState.pointerLockActive = false;
      updateModeChip();
    });

    document.addEventListener('mousedown', (event) => {
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen) return;
      if (event.button !== 0) return;

      const hoveredObject = getHoveredObject();
      const hoveredType = hoveredObject?.object?.userData?.type;
      if (hoveredType === 'homeDoor' || hoveredType === 'returnPortal' || hoveredType === 'chest' || hoveredType === 'upgradeTable') {
        handleInteractAction();
        return;
      }

      miningState.holdActive = true;
      if (!lookState.pointerLockActive) {
        lookState.isDragging = true;
      }
      tryMineWithPickaxe();
    });

    document.addEventListener('mouseup', (event) => {
      if (mobileState.enabled) return;
      if (event.button === 0) miningState.holdActive = false;
      lookState.isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
      if (mobileState.enabled) return;
      miningState.holdActive = false;
      lookState.isDragging = false;
    });

    document.addEventListener('mousemove', (event) => {
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen) return;
      const shouldApply = lookState.pointerLockActive || lookState.isDragging;
      if (!shouldApply) return;

      const sensitivity = lookState.pointerLockActive ? lookState.sensitivity : lookState.dragSensitivity;
      applyLookDelta(event.movementX, event.movementY, sensitivity);
    });
    function updateHotbar() {
      hotbarSlots.forEach((slot, index) => {
        slot.classList.toggle('selected', itemState.equippedSlot === index);
      });
    }

    function getPrimaryActionState({ hoveredObject = getHoveredObject(), targetOreHit = getTargetOreNode() } = {}) {
      const hoveredType = hoveredObject?.object?.userData?.type;

      if (hoveredType === 'homeDoor') {
        return { type: 'interact', label: 'Entrar', note: 'caverna' };
      }
      if (hoveredType === 'returnPortal') {
        return { type: 'interact', label: 'Voltar', note: 'base' };
      }
      if (hoveredType === 'chest') {
        return { type: 'interact', label: 'Abrir bau', note: 'guardar' };
      }
      if (hoveredType === 'upgradeTable') {
        return { type: 'interact', label: 'Usar bancada', note: 'melhorar' };
      }
      if (itemState.equippedSlot !== 0) {
        return { type: 'equip-pickaxe', label: 'Picareta', note: 'equipar' };
      }
      if (targetOreHit?.node) {
        return { type: 'mine', label: 'Minerar', note: targetOreHit.node.definition.short };
      }
      return { type: 'mine', label: 'Picareta', note: 'acao' };
    }

    function updateMobileActionButton(actionState = getPrimaryActionState()) {
      mobileActionLabel.textContent = actionState.label;
      mobileActionNote.textContent = actionState.note;
      mobileActionButton.setAttribute('aria-label', actionState.label);
    }

    function equipSlot(slotIndex) {
      if (slotIndex === 0) {
        itemState.equippedSlot = itemState.equippedSlot === slotIndex ? -1 : slotIndex;
      } else {
        itemState.equippedSlot = -1;
      }
      updateHotbar();
      saveGame();
    }

    hotbarSlots.forEach((slot, index) => {
      slot.addEventListener('click', () => {
        equipSlot(index);
        updateMiningHud();
      });
    });

    function updateInventoryChip() {
      inventoryChip.textContent = `Inventario: ${oreDefinitions.map((definition) => `${definition.short} ${inventoryState.totals[definition.id]}`).join(' | ')}`;
      for (const definition of oreDefinitions) {
        const entry = inventoryEntries.get(definition.id);
        if (!entry) continue;
        const amount = inventoryState.totals[definition.id];
        entry.count.textContent = String(amount);
        entry.card.classList.toggle('has-stock', amount > 0);
      }
    }

    function createOreIconMarkup(definition) {
      const visual = oreVisuals[definition.id];
      return `
        <svg viewBox="0 0 64 64" class="inventory-icon" aria-hidden="true">
          <defs>
            <linearGradient id="ore-grad-${definition.id}" x1="10%" y1="8%" x2="88%" y2="92%">
              <stop offset="0%" stop-color="${visual.primary}" />
              <stop offset="100%" stop-color="${visual.secondary}" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="24" fill="${visual.glow}" />
          <path d="${visual.outerPath}" fill="url(#ore-grad-${definition.id})" stroke="${visual.border}" stroke-width="3" stroke-linejoin="round" />
          <path d="${visual.innerPath}" fill="rgba(255,255,255,0.35)" />
        </svg>
      `;
    }

    function buildInventoryGrid() {
      inventoryEntries.clear();
      inventoryGrid.innerHTML = '';

      for (const definition of oreDefinitions) {
        const card = document.createElement('article');
        card.className = 'inventory-card';
        card.innerHTML = `
          <div class="inventory-icon-shell">
            ${createOreIconMarkup(definition)}
          </div>
          <div class="inventory-copy">
            <strong class="inventory-name">${definition.label}</strong>
            <span class="inventory-meta">${definition.short} | Nivel ${definition.level}</span>
          </div>
          <div class="inventory-count-shell">
            <span class="inventory-count-label">Qtd</span>
            <strong class="inventory-count">0</strong>
          </div>
        `;
        inventoryGrid.append(card);
        inventoryEntries.set(definition.id, {
          card,
          count: card.querySelector('.inventory-count'),
        });
      }
    }

    function buildChestGrid() {
      chestEntries.clear();
      chestGrid.innerHTML = '';

      for (const definition of oreDefinitions) {
        const row = document.createElement('article');
        row.className = 'storage-row';
        row.innerHTML = `
          <div class="inventory-icon-shell">
            ${createOreIconMarkup(definition)}
          </div>
          <div class="inventory-copy">
            <strong class="inventory-name">${definition.label}</strong>
            <div class="storage-totals">
              <span>Mochila: <strong data-role="inventory">0</strong></span>
              <span>Bau: <strong data-role="chest">0</strong></span>
            </div>
          </div>
          <div class="storage-actions">
            <button class="mini-button" data-ore-id="${definition.id}" data-amount="1">+1</button>
            <button class="mini-button" data-ore-id="${definition.id}" data-amount="5">+5</button>
            <button class="mini-button" data-ore-id="${definition.id}" data-amount="all">Tudo</button>
          </div>
        `;
        chestGrid.append(row);
        chestEntries.set(definition.id, {
          row,
          inventoryCount: row.querySelector('[data-role="inventory"]'),
          chestCount: row.querySelector('[data-role="chest"]'),
          buttons: [...row.querySelectorAll('.mini-button')],
        });
      }
    }

    function updateChestGrid() {
      let totalCarried = 0;
      for (const definition of oreDefinitions) {
        const entry = chestEntries.get(definition.id);
        if (!entry) continue;
        const inventoryAmount = inventoryState.totals[definition.id];
        const chestAmount = chestState.totals[definition.id];
        totalCarried += inventoryAmount;
        entry.inventoryCount.textContent = String(inventoryAmount);
        entry.chestCount.textContent = String(chestAmount);
        entry.row.classList.toggle('has-stock', inventoryAmount > 0 || chestAmount > 0);
        for (const button of entry.buttons) {
          button.disabled = inventoryAmount <= 0;
        }
      }
      transferAllButton.disabled = totalCarried <= 0;
    }

    function updateUpgradePanel() {
      const flashlightLevelOffset = playerStats.flashlightLevel - 1;
      const flashlightDistance = 42 + flashlightLevelOffset * 8;
      const flashlightAngle = Math.min(Math.PI / 6.2, Math.PI / 11 + flashlightLevelOffset * 0.05);

      pickaxeLevelValue.textContent = `Nivel ${playerStats.pickaxeDamage}`;
      pickaxeDamageValue.textContent = `Dano ${playerStats.pickaxeDamage}`;
      flashlightLevelValue.textContent = `Nivel ${playerStats.flashlightLevel}`;
      flashlightPowerValue.textContent = `Area maior | Alcance ${flashlightDistance.toFixed(0)} | Abertura ${(flashlightAngle * 180 / Math.PI).toFixed(0)}°`;

      const ferritaTotal = inventoryState.totals.ferrita + chestState.totals.ferrita;
      const cobreTotal = inventoryState.totals.cobre + chestState.totals.cobre;
      upgradePickaxeButton.disabled = ferritaTotal < 10;
      upgradeFlashlightButton.disabled = cobreTotal < 5;
      upgradeHint.textContent = `Disponivel: ${ferritaTotal} ferrita | ${cobreTotal} cobre vivo`;
    }

    function refreshResourceUi() {
      updateInventoryChip();
      updateChestGrid();
      updateUpgradePanel();
    }

    function transferOreToChest(oreId, amount) {
      const available = inventoryState.totals[oreId];
      const desired = amount === Infinity ? available : amount;
      const moved = Math.max(0, Math.min(available, desired));
      if (moved <= 0) return false;
      inventoryState.totals[oreId] -= moved;
      chestState.totals[oreId] += moved;
      refreshResourceUi();
      saveGame();
      return true;
    }

    function transferAllToChest() {
      let movedAny = false;
      for (const definition of oreDefinitions) {
        movedAny = transferOreToChest(definition.id, Infinity) || movedAny;
      }
      return movedAny;
    }

    function spendResource(oreId, amount) {
      const total = inventoryState.totals[oreId] + chestState.totals[oreId];
      if (total < amount) return false;

      const spendFromInventory = Math.min(inventoryState.totals[oreId], amount);
      inventoryState.totals[oreId] -= spendFromInventory;
      chestState.totals[oreId] -= amount - spendFromInventory;
      return true;
    }

    function clearMovementState() {
      keyState.forward = false;
      keyState.backward = false;
      keyState.left = false;
      keyState.right = false;
      keyState.sprint = false;
      playerState.jumpQueued = false;
      velocityForward = 0;
      velocityRight = 0;
    }

    function toggleBigMap() {
      if (!itemState.gameActive && !itemState.mapOpen) return;
      if (!itemState.mapOpen && itemState.inventoryOpen) {
        closeActivePanel();
      }
      if (!itemState.mapOpen) {
        clearMovementState();
        resetMobileControls();
      }
      itemState.mapOpen = !itemState.mapOpen;
      document.body.classList.toggle('map-open', itemState.mapOpen);
      bigMap.classList.toggle('visible', itemState.mapOpen);
      bigMap.setAttribute('aria-hidden', String(!itemState.mapOpen));
      updateMiningHud();
    }

    function setActivePanel(panelName) {
      uiState.activePanel = panelName;
      itemState.inventoryOpen = Boolean(panelName);
      document.body.classList.toggle('inventory-open', Boolean(panelName));

      for (const [name, panel] of Object.entries(panelMap)) {
        const visible = name === panelName;
        panel.classList.toggle('visible', visible);
        panel.setAttribute('aria-hidden', String(!visible));
      }
    }

    function openPanel(panelName) {
      if (!panelMap[panelName]) return;
      miningState.holdActive = false;
      clearMovementState();
      resetMobileControls();
      lookState.isDragging = false;
      if (itemState.mapOpen) toggleBigMap();
      if (document.pointerLockElement === document.body) {
        document.exitPointerLock();
      }
      setActivePanel(panelName);
      itemState.gameActive = false;
      updateModeChip();
    }

    function closeActivePanel() {
      if (!uiState.activePanel) return;
      setActivePanel(null);
      itemState.gameActive = true;
      updateModeChip();
      updateMiningHud();
    }

    function toggleInventory() {
      if (!itemState.gameActive && uiState.activePanel !== 'inventory') return;
      if (uiState.activePanel === 'inventory') {
        closeActivePanel();
        return;
      }
      openPanel('inventory');
    }

    function handleInteractAction() {
      if (uiState.activePanel === 'chest' || uiState.activePanel === 'upgrades') {
        closeActivePanel();
        return;
      }
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;

      const hovered = getHoveredObject();
      const type = hovered?.object?.userData?.type;
      if (type === 'chest') {
        openPanel('chest');
      } else if (type === 'upgradeTable') {
        openPanel('upgrades');
      } else if (type === 'homeDoor') {
        areaState.currentArea = 'cave';
        areaState.caveSeed = Math.floor(Math.random() * 2147483647);
        rebuildWorld(areaState.caveSeed);
      } else if (type === 'returnPortal') {
        areaState.currentArea = 'home';
        rebuildWorld();
      }
    }

    function triggerPrimaryAction() {
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      const actionState = getPrimaryActionState();
      if (actionState.type === 'interact') {
        handleInteractAction();
        return;
      }
      if (actionState.type === 'equip-pickaxe') {
        equipSlot(0);
        updateMiningHud();
        return;
      }
      tryMineWithPickaxe();
      updateMiningHud();
    }

    function upgradePickaxe() {
      if (!spendResource('ferrita', 10)) return false;
      playerStats.pickaxeDamage += 1;
      refreshResourceUi();
      saveGame();
      return true;
    }

    function upgradeFlashlight() {
      if (!spendResource('cobre', 5)) return false;
      playerStats.flashlightLevel += 1;
      refreshResourceUi();
      saveGame();
      return true;
    }

    chestGrid.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-ore-id]');
      if (!button) return;
      const amount = button.dataset.amount === 'all' ? Infinity : Number(button.dataset.amount);
      transferOreToChest(button.dataset.oreId, amount);
    });

    transferAllButton.addEventListener('click', () => {
      transferAllToChest();
    });

    upgradePickaxeButton.addEventListener('click', () => {
      upgradePickaxe();
    });

    upgradeFlashlightButton.addEventListener('click', () => {
      upgradeFlashlight();
    });

    mobileInventoryButton.addEventListener('click', () => {
      if (!mobileState.enabled) return;
      toggleInventory();
    });

    bigMapCloseButton.addEventListener('click', () => {
      if (itemState.mapOpen) toggleBigMap();
    });

    for (const closeButton of [inventoryCloseButton, chestCloseButton, upgradeCloseButton]) {
      closeButton.addEventListener('click', () => {
        closeActivePanel();
      });
    }

    for (const mapTrigger of [minimapShell, minimapLabel]) {
      mapTrigger.addEventListener('click', () => {
        if (!mobileState.enabled) return;
        toggleBigMap();
      });
    }

    mobileActionButton.addEventListener('click', (event) => {
      if (!mobileState.enabled) return;
      event.preventDefault();
    });

    mobileActionButton.addEventListener('touchstart', (event) => {
      if (!mobileState.enabled) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      mobileState.actionTouchId = touch.identifier;
      mobileState.actionHeld = true;
      triggerPrimaryAction();
      event.preventDefault();
    }, { passive: false });

    function releaseMobileActionTouches(changedTouches) {
      for (const touch of Array.from(changedTouches)) {
        if (touch.identifier === mobileState.actionTouchId) {
          mobileState.actionTouchId = null;
          mobileState.actionHeld = false;
          return true;
        }
      }
      return false;
    }

    mobileRightPad.addEventListener('touchstart', (event) => {
      if (!mobileState.enabled || mobileState.right.active) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      beginMobileRightStick(touch);
      event.preventDefault();
    }, { passive: false });

    document.addEventListener('touchstart', (event) => {
      if (!mobileState.enabled) return;
      let handled = false;

      for (const touch of Array.from(event.changedTouches)) {
        if (canStartMobileLeftStick(touch)) {
          beginMobileLeftStick(touch);
          handled = true;
        } else if (canStartMobileLookDrag(touch)) {
          beginMobileLookDrag(touch);
          handled = true;
        }
      }

      if (handled) event.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (event) => {
      if (!mobileState.enabled) return;
      let handled = false;

      for (const touch of Array.from(event.changedTouches)) {
        if (touch.identifier === mobileState.left.id) {
          updateLeftStickPosition(touch.clientX, touch.clientY);
          handled = true;
        } else if (touch.identifier === mobileState.right.id) {
          updateMobileRightStick(touch);
          handled = true;
        } else if (touch.identifier === mobileState.drag.id) {
          updateMobileLookDrag(touch);
          handled = true;
        }
      }

      if (handled) event.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', (event) => {
      if (!mobileState.enabled) return;
      let handled = releaseMobileActionTouches(event.changedTouches);

      for (const touch of Array.from(event.changedTouches)) {
        if (touch.identifier === mobileState.left.id) {
          resetMobileLeftStick();
          handled = true;
        }
        if (touch.identifier === mobileState.right.id) {
          resetMobileRightStick();
          handled = true;
        }
        if (touch.identifier === mobileState.drag.id) {
          resetMobileLookDrag();
          handled = true;
        }
      }

      if (handled) event.preventDefault();
    }, { passive: false });

    document.addEventListener('touchcancel', (event) => {
      if (!mobileState.enabled) return;
      let handled = releaseMobileActionTouches(event.changedTouches);

      for (const touch of Array.from(event.changedTouches)) {
        if (touch.identifier === mobileState.left.id) {
          resetMobileLeftStick();
          handled = true;
        }
        if (touch.identifier === mobileState.right.id) {
          resetMobileRightStick();
          handled = true;
        }
        if (touch.identifier === mobileState.drag.id) {
          resetMobileLookDrag();
          handled = true;
        }
      }

      if (handled) event.preventDefault();
    }, { passive: false });

    function getDropPool(definition) {
      let pool = dropMeshPools.get(definition.id);
      if (!pool) {
        pool = [];
        dropMeshPools.set(definition.id, pool);
      }
      return pool;
    }

    function getDropAsset(definition) {
      let asset = dropAssetCache.get(definition.id);
      if (asset) return asset;

      asset = {
        geometry: new THREE.OctahedronGeometry(1, 0),
        material: new THREE.MeshStandardMaterial({
          color: definition.color,
          emissive: definition.emissive,
          emissiveIntensity: 0.95,
          roughness: 0.34,
          metalness: 0.1,
          flatShading: true,
        }),
      };
      dropAssetCache.set(definition.id, asset);
      return asset;
    }

    function createDropMesh(definition) {
      const asset = getDropAsset(definition);
      const mesh = new THREE.Mesh(asset.geometry, asset.material);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.visible = false;
      return mesh;
    }

    function acquireDropMesh(definition) {
      const pool = getDropPool(definition);
      return pool.length ? pool.pop() : createDropMesh(definition);
    }

    function releaseDropMesh(drop) {
      world.group.remove(drop.mesh);
      drop.mesh.visible = false;
      drop.mesh.scale.setScalar(1);
      getDropPool(drop.definition).push(drop.mesh);
    }

    function resetDropCaches() {
      for (const asset of dropAssetCache.values()) {
        asset.geometry.dispose();
        asset.material.dispose();
      }
      dropAssetCache.clear();
      dropMeshPools.clear();
    }

    function warmDropPools() {
      for (const definition of oreDefinitions) {
        const pool = getDropPool(definition);
        if (pool.length === 0) {
          pool.push(createDropMesh(definition));
        }
      }
    }

    function removeArrayValueInPlace(array, value) {
      const index = array.indexOf(value);
      if (index === -1) return false;
      const lastIndex = array.length - 1;
      if (index !== lastIndex) {
        array[index] = array[lastIndex];
      }
      array.pop();
      return true;
    }

    function createSparkParticle(position, definition) {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(randomRange(0.038, 0.078), 0),
        new THREE.MeshBasicMaterial({
          color: definition.color,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      mesh.position.copy(position);
      mesh.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
      world.group.add(mesh);

      const velocity = new THREE.Vector3(
        randomRange(-2.4, 2.4),
        randomRange(1.2, 3.4),
        randomRange(-2.4, 2.4)
      );

      world.sparkParticles.push({
        mesh,
        velocity,
        life: randomRange(0.22, 0.36),
        maxLife: randomRange(0.22, 0.36),
        spin: new THREE.Vector3(
          randomRange(-14, 14),
          randomRange(-14, 14),
          randomRange(-14, 14)
        ),
      });
    }

    function spawnHitSparks(hit) {
      const node = hit.node;
      const normal = hit.normal ? hit.normal.clone() : node.normal.clone();
      const origin = hit.point ? hit.point.clone().add(normal.clone().multiplyScalar(0.03)) : node.position.clone().add(normal.clone().multiplyScalar(0.14));
      const count = 10 + randInt(0, 5);
      for (let i = 0; i < count; i++) {
        const offset = normal.clone().multiplyScalar(randomRange(0.01, 0.11));
        offset.x += randomRange(-0.12, 0.12);
        offset.y += randomRange(-0.08, 0.08);
        offset.z += randomRange(-0.12, 0.12);
        createSparkParticle(origin.clone().add(offset), node.definition);
      }
    }

    function clearSparkParticles() {
      for (const spark of world.sparkParticles) {
        world.group.remove(spark.mesh);
        spark.mesh.geometry.dispose();
        spark.mesh.material.dispose();
      }
      world.sparkParticles.length = 0;
    }

    function mulberry32(seed) {
      let t = seed >>> 0;
      return function () {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), t | 1);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    }

    function randomRange(min, max) {
      return min + (max - min) * world.rng();
    }

    function randInt(min, max) {
      return Math.floor(randomRange(min, max + 1));
    }

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(world.rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function damp(current, target, smoothing, delta) {
      const t = 1 - Math.exp(-smoothing * delta);
      return THREE.MathUtils.lerp(current, target, t);
    }

    function pickWeightedOreDefinition() {
      let total = 0;
      for (const definition of oreDefinitions) total += definition.rarity;
      let roll = world.rng() * total;
      for (const definition of oreDefinitions) {
        roll -= definition.rarity;
        if (roll <= 0) return definition;
      }
      return oreDefinitions[oreDefinitions.length - 1];
    }

    function randomFrom(array) {
      return array[Math.floor(world.rng() * array.length)];
    }

    function splitAmount(total) {
      const chunks = [];
      let remaining = total;
      while (remaining > 0) {
        const piece = remaining <= 2 ? 1 : Math.min(remaining - 1, randInt(1, 2));
        chunks.push(piece);
        remaining -= piece;
      }
      return shuffle(chunks);
    }

    function cellToWorldX(x) {
      return (x - world.width / 2 + 0.5) * world.cellSize;
    }

    function cellToWorldZ(y) {
      return (y - world.height / 2 + 0.5) * world.cellSize;
    }

    function worldToCellX(x) {
      return Math.floor((x + (world.width * world.cellSize) / 2) / world.cellSize);
    }

    function worldToCellY(z) {
      return Math.floor((z + (world.height * world.cellSize) / 2) / world.cellSize);
    }

    function worldToMapFloatX(x) {
      return (x + (world.width * world.cellSize) / 2) / world.cellSize;
    }

    function worldToMapFloatY(z) {
      return (z + (world.height * world.cellSize) / 2) / world.cellSize;
    }

    function insideMap(x, y) {
      return x >= 0 && y >= 0 && x < world.width && y < world.height;
    }

    function insideMargin(x, y, margin = 1) {
      return x >= margin && y >= margin && x < world.width - margin && y < world.height - margin;
    }

    function isWall(x, y) {
      if (!insideMap(x, y)) return true;
      return world.map[y][x] === 1;
    }

    function createSolidMap() {
      return Array.from({ length: world.height }, () => Array(world.width).fill(1));
    }

    function carveDisc(map, cx, cy, radius = 1) {
      for (let y = cy - radius; y <= cy + radius; y++) {
        for (let x = cx - radius; x <= cx + radius; x++) {
          if (!insideMap(x, y)) continue;
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= radius * radius + 0.25) {
            map[y][x] = 0;
          }
        }
      }
    }

    function carveRect(map, centerX, centerY, halfWidth = 2, halfHeight = halfWidth) {
      for (let y = centerY - halfHeight; y <= centerY + halfHeight; y++) {
        for (let x = centerX - halfWidth; x <= centerX + halfWidth; x++) {
          if (!insideMap(x, y)) continue;
          map[y][x] = 0;
        }
      }
    }

    function carveSpawnExit(map, spawnX, spawnY, dirIndex, startStep = 3, endStep = 8, radius = 1) {
      const dir = DIRS[dirIndex];
      let exitX = spawnX;
      let exitY = spawnY;

      for (let step = startStep; step <= endStep; step++) {
        exitX = spawnX + dir.x * step;
        exitY = spawnY + dir.y * step;
        carveDisc(map, exitX, exitY, radius);
      }

      return { x: exitX, y: exitY };
    }

    function directionToYaw(dir) {
      return Math.atan2(-dir.x, -dir.z);
    }

    const DIRS = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];

    function turnLeft(dirIndex) {
      return (dirIndex + 3) % 4;
    }

    function turnRight(dirIndex) {
      return (dirIndex + 1) % 4;
    }

    function tryCarveStraight(map, sx, sy, dirIndex, length, radius = 1, endBulge = false) {
      const dir = DIRS[dirIndex];
      const cells = [];
      let x = sx;
      let y = sy;

      for (let i = 1; i <= length; i++) {
        x += dir.x;
        y += dir.y;

        if (!insideMargin(x, y, 4)) return null;

        for (let yy = y - radius - 1; yy <= y + radius + 1; yy++) {
          for (let xx = x - radius - 1; xx <= x + radius + 1; xx++) {
            if (!insideMargin(xx, yy, 2)) return null;
            if (map[yy][xx] === 0) {
              const nearStart = Math.abs(xx - sx) + Math.abs(yy - sy) <= radius + 2;
              if (!nearStart) return null;
            }
          }
        }

        cells.push([x, y]);
      }

      for (const [cx, cy] of cells) {
        carveDisc(map, cx, cy, radius);
      }

      if (endBulge) {
        carveDisc(map, x, y, radius + 1);
      }

      return { x, y, dirIndex };
    }

    function buildConnectorPath(a, b, horizontalFirst) {
      const cells = [];
      let x = a.x;
      let y = a.y;
      const corner = horizontalFirst ? { x: b.x, y: a.y } : { x: a.x, y: b.y };

      while (x !== corner.x) {
        x += Math.sign(corner.x - x);
        cells.push([x, y]);
      }
      while (y !== corner.y) {
        y += Math.sign(corner.y - y);
        cells.push([x, y]);
      }
      while (x !== b.x) {
        x += Math.sign(b.x - x);
        cells.push([x, y]);
      }
      while (y !== b.y) {
        y += Math.sign(b.y - y);
        cells.push([x, y]);
      }

      return cells;
    }

    function canCarveConnector(map, cells, ax, ay, bx, by, radius = 1) {
      for (const [x, y] of cells) {
        if (!insideMargin(x, y, 3)) return false;
        for (let yy = y - radius; yy <= y + radius; yy++) {
          for (let xx = x - radius; xx <= x + radius; xx++) {
            if (!insideMargin(xx, yy, 2)) return false;
            if (map[yy][xx] === 0) {
              const nearA = Math.abs(xx - ax) + Math.abs(yy - ay) <= 2;
              const nearB = Math.abs(xx - bx) + Math.abs(yy - by) <= 2;
              if (!nearA && !nearB) return false;
            }
          }
        }
      }
      return true;
    }

    function carveConnector(map, cells, radius = 1) {
      for (const [x, y] of cells) {
        carveDisc(map, x, y, radius);
      }
    }

    function floodOpenRegions(map) {
      const visited = Array.from({ length: world.height }, () => Array(world.width).fill(false));
      const regions = [];

      for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
          if (visited[y][x] || map[y][x] === 1) continue;
          const queue = [[x, y]];
          const region = [];
          visited[y][x] = true;

          while (queue.length) {
            const [cx, cy] = queue.shift();
            region.push([cx, cy]);
            const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
            for (const [nx, ny] of neighbors) {
              if (!insideMap(nx, ny)) continue;
              if (visited[ny][nx] || map[ny][nx] === 1) continue;
              visited[ny][nx] = true;
              queue.push([nx, ny]);
            }
          }
          regions.push(region);
        }
      }

      return regions.sort((a, b) => b.length - a.length);
    }

    function generateHomeRoom(seed = areaState.homeSeed) {
      world.seed = seed;
      world.rng = mulberry32(seed);
      world.floorNoise = new ImprovedNoise();
      world.ceilingNoise = new ImprovedNoise();
      world.nodes = [];

      const map = createSolidMap();
      const centerX = Math.floor(world.width / 2);
      const centerY = Math.floor(world.height / 2);
      const roomHalfSize = 4;
      const doorDirIndex = 3;

      carveRect(map, centerX, centerY, roomHalfSize, roomHalfSize);

      world.map = map;
      world.homeRoom = {
        centerX,
        centerY,
        halfSize: roomHalfSize,
        doorDirIndex,
      };
      world.spawnDir = { x: DIRS[doorDirIndex].x, z: DIRS[doorDirIndex].y };
      world.spawn = {
        cellX: centerX,
        cellY: centerY,
        x: cellToWorldX(centerX),
        z: cellToWorldZ(centerY),
      };
    }

    function generateCaveMap(seed) {
      world.seed = seed;
      world.rng = mulberry32(seed);
      world.floorNoise = new ImprovedNoise();
      world.ceilingNoise = new ImprovedNoise();
      world.homeRoom = null;

      let bestMap = null;
      let bestNodes = [];
      let bestSpawnDir = { x: 0, z: -1 };
      let bestScore = -Infinity;

      for (let attempt = 0; attempt < 10; attempt++) {
        const map = createSolidMap();
        const nodes = [];
        const spawnX = Math.floor(world.width / 2);
        const spawnY = Math.floor(world.height / 2);
        carveDisc(map, spawnX, spawnY, 4);

        const startDirIndex = randInt(0, 3);
        const entry = carveSpawnExit(map, spawnX, spawnY, startDirIndex, 3, 5, 1);
        const trunk = tryCarveStraight(map, entry.x, entry.y, startDirIndex, randInt(7, 10), 1, true);
        if (!trunk) continue;

        nodes.push({ x: entry.x, y: entry.y, dirIndex: startDirIndex, depth: -1 });
        let frontier = [{ x: trunk.x, y: trunk.y, dirIndex: startDirIndex, depth: 0 }];
        nodes.push(...frontier);

        const maxDepth = 3;
        for (let depth = 0; depth < maxDepth; depth++) {
          const next = [];
          for (const node of frontier) {
            const preference = depth === 0
              ? [turnLeft(node.dirIndex), turnRight(node.dirIndex), node.dirIndex]
              : shuffle([turnLeft(node.dirIndex), turnRight(node.dirIndex), node.dirIndex]);

            const targetBranches = depth < 2 ? 2 : (world.rng() < 0.55 ? 2 : 1);
            let created = 0;

            for (const dirIndex of preference) {
              if (created >= targetBranches) break;
              const length = randInt(depth === 0 ? 8 : 6, depth === 0 ? 12 : 10);
              const radius = world.rng() < 0.18 ? 2 : 1;
              const segment = tryCarveStraight(map, node.x, node.y, dirIndex, length, radius, world.rng() < 0.4);
              if (!segment) continue;

              const child = { x: segment.x, y: segment.y, dirIndex, depth: node.depth + 1 };
              next.push(child);
              nodes.push(child);
              created++;
            }

            if (!created && depth > 0) {
              const fallback = tryCarveStraight(map, node.x, node.y, node.dirIndex, randInt(5, 7), 1, false);
              if (fallback) {
                const child = { x: fallback.x, y: fallback.y, dirIndex: node.dirIndex, depth: node.depth + 1 };
                next.push(child);
                nodes.push(child);
              }
            }
          }
          frontier = next;
        }

        let loopsAdded = 0;
        for (let i = 0; i < 140 && loopsAdded < 5; i++) {
          if (nodes.length < 2) break;
          const a = nodes[randInt(0, nodes.length - 1)];
          const b = nodes[randInt(0, nodes.length - 1)];
          if (a === b) continue;
          const manhattan = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
          if (manhattan < 10 || manhattan > 26) continue;

          const pathA = buildConnectorPath(a, b, true);
          const pathB = buildConnectorPath(a, b, false);
          const path = world.rng() < 0.5 ? pathA : pathB;
          if (!canCarveConnector(map, path, a.x, a.y, b.x, b.y, 1)) continue;

          carveConnector(map, path, 1);
          loopsAdded++;
        }

        const regions = floodOpenRegions(map);
        if (!regions.length) continue;
        const mainRegion = regions[0];
        for (let i = 1; i < regions.length; i++) {
          for (const [x, y] of regions[i]) map[y][x] = 1;
        }

        const score = mainRegion.length + nodes.length * 18;
        if (score > bestScore) {
          bestScore = score;
          bestMap = map;
          bestNodes = nodes;
          bestSpawnDir = { x: DIRS[startDirIndex].x, z: DIRS[startDirIndex].y };
        }
      }

      if (!bestMap) {
        bestMap = createSolidMap();
        const cx = Math.floor(world.width / 2);
        const cy = Math.floor(world.height / 2);
        const fallbackDirIndex = 3;
        carveDisc(bestMap, cx, cy, 4);
        const entry = carveSpawnExit(bestMap, cx, cy, fallbackDirIndex, 3, 5, 1);
        tryCarveStraight(bestMap, entry.x, entry.y, fallbackDirIndex, 8, 1, true);
        bestNodes = [{ x: entry.x, y: entry.y, dirIndex: fallbackDirIndex, depth: -1 }];
        bestSpawnDir = { x: DIRS[fallbackDirIndex].x, z: DIRS[fallbackDirIndex].y };
      }

      world.map = bestMap;
      world.nodes = bestNodes;
      world.spawnDir = bestSpawnDir;
      world.spawn = {
        cellX: Math.floor(world.width / 2),
        cellY: Math.floor(world.height / 2),
        x: cellToWorldX(Math.floor(world.width / 2)),
        z: cellToWorldZ(Math.floor(world.height / 2)),
      };
      carveDisc(world.map, world.spawn.cellX, world.spawn.cellY, 4);
    }

    function floorHeightAt(x, z) {
      const a = world.floorNoise.noise(x * 0.09, 11.4, z * 0.09) * 0.38;
      const b = world.floorNoise.noise(x * 0.18, 41.8, z * 0.18) * 0.16;
      return a + b - 0.42;
    }

    function ceilingHeightAt(x, z) {
      const a = world.ceilingNoise.noise(x * 0.06, 81.1, z * 0.06) * 0.34;
      const b = world.ceilingNoise.noise(x * 0.14, 103.7, z * 0.14) * 0.14;
      return 4.45 + a + b;
    }

    function makeRoughBoxGeometry(width, height, depth, seedOffset = 0) {
      const geometry = new THREE.BoxGeometry(width, height, depth, 2, 5, 2);
      const pos = geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const nx = v.x / Math.max(0.001, width);
        const ny = v.y / Math.max(0.001, height);
        const nz = v.z / Math.max(0.001, depth);
        const n = world.floorNoise.noise(seedOffset + nx * 2.7, ny * 2.2 + 30.0, nz * 2.7) * 0.5 + 0.5;
        v.x += Math.sign(v.x || 1) * (n - 0.5) * width * 0.22;
        v.z += Math.sign(v.z || 1) * (n - 0.5) * depth * 0.22;
        v.y += (n - 0.5) * height * 0.12;
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      geometry.computeVertexNormals();
      return geometry;
    }

    function makeRockGeometry(radius, detail = 1, seedOffset = 0) {
      const geometry = new THREE.IcosahedronGeometry(radius, detail);
      const pos = geometry.attributes.position;
      const v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i);
        const dir = v.clone().normalize();
        const n = world.ceilingNoise.noise(dir.x * 2.3 + seedOffset, dir.y * 2.3 + 7.3, dir.z * 2.3 - seedOffset) * 0.5 + 0.5;
        const scale = radius * (0.78 + n * 0.38);
        v.copy(dir.multiplyScalar(scale));
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      geometry.computeVertexNormals();
      return geometry;
    }

    function disposeGroup(group) {
      group.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
          else object.material.dispose();
        }
      });
    }

    function buildFloorAndCeiling() {
      const worldWidth = world.width * world.cellSize;
      const worldHeight = world.height * world.cellSize;
      const segmentsX = world.width * 3;
      const segmentsY = world.height * 3;

      const floorGeometry = new THREE.PlaneGeometry(worldWidth, worldHeight, segmentsX, segmentsY);
      floorGeometry.rotateX(-Math.PI / 2);
      const floorPos = floorGeometry.attributes.position;
      for (let i = 0; i < floorPos.count; i++) {
        floorPos.setY(i, floorHeightAt(floorPos.getX(i), floorPos.getZ(i)));
      }
      floorGeometry.computeVertexNormals();
      const floor = new THREE.Mesh(
        floorGeometry,
        new THREE.MeshStandardMaterial({ color: 0x272522, roughness: 1, metalness: 0.02, flatShading: true })
      );
      floor.receiveShadow = true;
      world.group.add(floor);

      const ceilingGeometry = new THREE.PlaneGeometry(worldWidth, worldHeight, segmentsX, segmentsY);
      ceilingGeometry.rotateX(Math.PI / 2);
      const ceilingPos = ceilingGeometry.attributes.position;
      for (let i = 0; i < ceilingPos.count; i++) {
        ceilingPos.setY(i, ceilingHeightAt(ceilingPos.getX(i), ceilingPos.getZ(i)));
      }
      ceilingGeometry.computeVertexNormals();
      const ceiling = new THREE.Mesh(
        ceilingGeometry,
        new THREE.MeshStandardMaterial({ color: 0x1b1c1e, roughness: 1, metalness: 0.01, flatShading: true, side: THREE.DoubleSide })
      );
      world.group.add(ceiling);
    }

    function buildWalls() {
      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x3b3835, roughness: 1, metalness: 0.04, flatShading: true });
      for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
          if (!isWall(x, y)) continue;
          const exposed = !isWall(x + 1, y) || !isWall(x - 1, y) || !isWall(x, y + 1) || !isWall(x, y - 1);
          if (!exposed) continue;

          const wx = cellToWorldX(x);
          const wz = cellToWorldZ(y);
          const floor = floorHeightAt(wx, wz) - 0.55;
          const ceiling = ceilingHeightAt(wx, wz) + 0.18;
          const height = Math.max(3.8, ceiling - floor);
          const width = world.cellSize * randomRange(1.02, 1.14);
          const depth = world.cellSize * randomRange(1.02, 1.14);
          const geometry = makeRoughBoxGeometry(width, height, depth, world.seed * 0.001 + x * 0.17 + y * 0.29);
          const wall = new THREE.Mesh(geometry, wallMaterial);
          wall.position.set(wx + randomRange(-0.1, 0.1), floor + height / 2, wz + randomRange(-0.1, 0.1));
          wall.rotation.y = randomRange(-0.09, 0.09);
          wall.castShadow = true;
          wall.receiveShadow = true;
          world.group.add(wall);
        }
      }
    }

    function buildRocks() {
      const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x4b4a48, roughness: 1, metalness: 0.02, flatShading: true });
      const safeRadius = 7;

      for (let y = 2; y < world.height - 2; y++) {
        for (let x = 2; x < world.width - 2; x++) {
          if (isWall(x, y)) continue;
          if (Math.abs(x - world.spawn.cellX) + Math.abs(y - world.spawn.cellY) < safeRadius) continue;
          if (world.rng() > 0.024) continue;

          const wallCount = [isWall(x + 1, y), isWall(x - 1, y), isWall(x, y + 1), isWall(x, y - 1)].filter(Boolean).length;
          if (wallCount !== 1) continue;

          const wx = cellToWorldX(x) + randomRange(-0.28, 0.28);
          const wz = cellToWorldZ(y) + randomRange(-0.28, 0.28);
          const floor = floorHeightAt(wx, wz);
          const radius = randomRange(0.28, 0.52);

          if (world.rockColliders.some((rock) => rock.position.distanceToSquared(new THREE.Vector3(wx, 0, wz)) < 1.8)) continue;

          const rock = new THREE.Mesh(
            makeRockGeometry(radius, 1, world.seed * 0.002 + x * 0.33 + y * 0.51),
            rockMaterial
          );
          rock.position.set(wx, floor + radius * 0.72, wz);
          rock.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
          rock.castShadow = true;
          rock.receiveShadow = true;
          world.group.add(rock);

          world.rockColliders.push({ position: new THREE.Vector3(wx, 0, wz), radius: radius * 0.68 });
        }
      }
    }

    function buildHomeObjects() {
      const forwardDir = new THREE.Vector3(world.spawnDir.x, 0, world.spawnDir.z).normalize();
      const sideDir = new THREE.Vector3(-forwardDir.z, 0, forwardDir.x).normalize();

      const homeObjects = [
        {
          type: 'chest',
          size: new THREE.Vector3(0.9, 0.78, 0.9),
          offsetSide: -1.1,
          offsetForward: -0.55,
          color: 0x6d4a2d,
          emissive: 0x1c120a,
        },
        {
          type: 'upgradeTable',
          size: new THREE.Vector3(1.08, 0.62, 1.08),
          offsetSide: 1.15,
          offsetForward: -0.42,
          color: 0x58616d,
          emissive: 0x161c24,
        },
        {
          type: 'homeDoor',
          size: new THREE.Vector3(1.15, 2.05, 0.26),
          offsetSide: 0,
          offsetForward: world.homeRoom.halfSize * world.cellSize - 0.58,
          color: 0x7a6750,
          emissive: 0x21170f,
        },
      ];

      for (const definition of homeObjects) {
        const position = new THREE.Vector3(world.spawn.x, 0, world.spawn.z)
          .addScaledVector(sideDir, definition.offsetSide)
          .addScaledVector(forwardDir, definition.offsetForward);
        const floor = floorHeightAt(position.x, position.z);
        const mesh = new THREE.Mesh(
          makeRoughBoxGeometry(definition.size.x, definition.size.y, definition.size.z, world.seed * 0.004 + definition.offsetSide),
          new THREE.MeshStandardMaterial({
            color: definition.color,
            emissive: definition.emissive,
            emissiveIntensity: 0.55,
            roughness: 0.82,
            metalness: definition.type === 'upgradeTable' ? 0.18 : 0.06,
          })
        );
        mesh.position.set(position.x, floor + definition.size.y * 0.5, position.z);
        if (definition.type === 'homeDoor') {
          mesh.rotation.y = Math.atan2(forwardDir.x, forwardDir.z);
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.type = definition.type;
        world.group.add(mesh);
        world.interactables.push(mesh);
        if (definition.type !== 'homeDoor') {
          world.rockColliders.push({
            position: new THREE.Vector3(position.x, 0, position.z),
            radius: Math.max(definition.size.x, definition.size.z) * 0.32,
          });
        }
      }
    }

    function buildReturnPortal() {
      const minDistance = 12;

      for (let attempt = 0; attempt < 600; attempt++) {
        const cellX = randInt(2, world.width - 3);
        const cellY = randInt(2, world.height - 3);
        if (isWall(cellX, cellY)) continue;
        if (Math.abs(cellX - world.spawn.cellX) + Math.abs(cellY - world.spawn.cellY) < minDistance) continue;

        const x = cellToWorldX(cellX);
        const z = cellToWorldZ(cellY);
        const floor = floorHeightAt(x, z);

        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.72, 0.72, 0.16, 24),
          new THREE.MeshStandardMaterial({
            color: 0x2a425a,
            emissive: 0x5ab4ff,
            emissiveIntensity: 0.9,
            roughness: 0.3,
            metalness: 0.22,
          })
        );
        base.position.set(x, floor + 0.08, z);
        base.receiveShadow = true;
        base.castShadow = true;
        base.userData.type = 'returnPortal';
        world.group.add(base);
        world.interactables.push(base);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.86, 0.11, 14, 32),
          new THREE.MeshStandardMaterial({
            color: 0xbce8ff,
            emissive: 0x56c0ff,
            emissiveIntensity: 1.05,
            roughness: 0.26,
            metalness: 0.16,
          })
        );
        ring.position.set(x, floor + 0.54, z);
        ring.rotation.x = Math.PI / 2;
        ring.castShadow = true;
        ring.userData.type = 'returnPortal';
        world.group.add(ring);
        world.interactables.push(ring);
        return;
      }
    }

    function buildGlowCrystals() {
      const crystalGeometry = new THREE.OctahedronGeometry(0.16, 0);
      const crystalMaterial = new THREE.MeshStandardMaterial({
        color: 0x9bc3ff,
        emissive: 0x274577,
        emissiveIntensity: 1.2,
        roughness: 0.35,
        metalness: 0.06,
      });
      const safeRadius = 6;

      let placed = 0;
      for (let i = 0; i < 260 && placed < 9; i++) {
        const x = randInt(2, world.width - 3);
        const y = randInt(2, world.height - 3);
        if (isWall(x, y)) continue;
        if (Math.abs(x - world.spawn.cellX) + Math.abs(y - world.spawn.cellY) < safeRadius) continue;

        const wx = cellToWorldX(x) + randomRange(-0.45, 0.45);
        const wz = cellToWorldZ(y) + randomRange(-0.45, 0.45);
        const floor = floorHeightAt(wx, wz);

        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        crystal.position.set(wx, floor + 0.24, wz);
        crystal.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
        world.group.add(crystal);

        const light = new THREE.PointLight(0x7fa5ff, 0.28, 4.5, 2);
        light.position.copy(crystal.position).add(new THREE.Vector3(0, 0.08, 0));
        world.group.add(light);
        placed++;
      }
    }

    function createOreNode(definition, placement) {
      const group = new THREE.Group();
      group.position.copy(placement.position);

      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x292522, roughness: 1, metalness: 0.03, flatShading: true });
      const oreMaterial = new THREE.MeshStandardMaterial({
        color: definition.color,
        emissive: definition.emissive,
        emissiveIntensity: 1.45 + definition.level * 0.2,
        roughness: 0.32,
        metalness: 0.16,
        flatShading: true,
      });

      const normal = placement.normal.clone().normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      group.quaternion.copy(quaternion);

      const tangentA = new THREE.Vector3(1, 0, 0);
      if (Math.abs(normal.dot(tangentA)) > 0.9) tangentA.set(0, 0, 1);
      tangentA.crossVectors(normal, tangentA).normalize();
      const tangentB = new THREE.Vector3().crossVectors(normal, tangentA).normalize();

      const base = new THREE.Mesh(
        makeRockGeometry(0.36 + definition.level * 0.03, 1, world.seed * 0.003 + placement.position.x * 0.2 + placement.position.z * 0.1),
        baseMaterial
      );
      base.position.copy(normal.clone().multiplyScalar(0.08));
      base.scale.set(1.38, 1.05, 1.32);
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      const hitProxy = new THREE.Mesh(
        new THREE.SphereGeometry(0.48 + definition.level * 0.02, 10, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hitProxy.position.copy(base.position).add(normal.clone().multiplyScalar(0.05));
      group.add(hitProxy);

      const pieces = [];
      const pieceCount = randInt(Math.max(4, definition.clusterMin - 1), Math.max(6, definition.clusterMax - 1));
      for (let i = 0; i < pieceCount; i++) {
        const radius = randomRange(0.045, 0.11 + definition.level * 0.01);
        const crystal = new THREE.Mesh(
          new THREE.OctahedronGeometry(radius, 0),
          oreMaterial
        );
        const spreadA = randomRange(-0.2, 0.2);
        const spreadB = randomRange(-0.2, 0.2);
        const out = randomRange(0.03, 0.14 + definition.level * 0.016);
        crystal.position.copy(normal.clone().multiplyScalar(out))
          .add(tangentA.clone().multiplyScalar(spreadA))
          .add(tangentB.clone().multiplyScalar(spreadB));
        crystal.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
        crystal.castShadow = true;
        crystal.receiveShadow = true;
        crystal.scale.set(randomRange(0.75, 1.22), randomRange(0.8, 1.35), randomRange(0.75, 1.18));
        crystal.userData.baseScale = crystal.scale.clone();
        group.add(crystal);
        pieces.push(crystal);
      }

      const node = {
        id: `${definition.id}-${Math.round(world.rng() * 1e9)}`,
        definition,
        position: placement.position.clone(),
        normal: normal.clone(),
        group,
        hitProxy,
        pieces,
        hp: definition.hits,
        maxHp: definition.hits,
        pulseOffset: world.rng() * Math.PI * 2,
        hitFlash: 0,
      };

      hitProxy.userData.oreNodeRef = node;
      for (const piece of pieces) piece.userData.oreNodeRef = node;
      return node;
    }

    function buildOreNodes() {
      const safeRadius = 9;

      const desiredCount = 20 + randInt(10, 18);
      let placed = 0;

      for (let attempt = 0; attempt < 1200 && placed < desiredCount; attempt++) {
        const cellX = randInt(2, world.width - 3);
        const cellY = randInt(2, world.height - 3);
        if (isWall(cellX, cellY)) continue;
        if (Math.abs(cellX - world.spawn.cellX) + Math.abs(cellY - world.spawn.cellY) < safeRadius) continue;

        const wx = cellToWorldX(cellX);
        const wz = cellToWorldZ(cellY);
        const adjacentWalls = [];
        if (isWall(cellX + 1, cellY)) adjacentWalls.push({ offsetX: world.cellSize * 0.38, offsetZ: 0, normal: new THREE.Vector3(-1, 0, 0) });
        if (isWall(cellX - 1, cellY)) adjacentWalls.push({ offsetX: -world.cellSize * 0.38, offsetZ: 0, normal: new THREE.Vector3(1, 0, 0) });
        if (isWall(cellX, cellY + 1)) adjacentWalls.push({ offsetX: 0, offsetZ: world.cellSize * 0.38, normal: new THREE.Vector3(0, 0, -1) });
        if (isWall(cellX, cellY - 1)) adjacentWalls.push({ offsetX: 0, offsetZ: -world.cellSize * 0.38, normal: new THREE.Vector3(0, 0, 1) });

        const placeOnWall = adjacentWalls.length > 0 && world.rng() < 0.62;
        let position;
        let normal;

        if (placeOnWall) {
          const chosenWall = randomFrom(adjacentWalls);
          const px = wx + chosenWall.offsetX + randomRange(-0.16, 0.16);
          const pz = wz + chosenWall.offsetZ + randomRange(-0.16, 0.16);
          const py = floorHeightAt(px, pz) + randomRange(0.8, 1.85);
          position = new THREE.Vector3(px, py, pz);
          normal = chosenWall.normal;
        } else {
          const px = wx + randomRange(-0.45, 0.45);
          const pz = wz + randomRange(-0.45, 0.45);
          const py = floorHeightAt(px, pz) + randomRange(0.12, 0.24);
          position = new THREE.Vector3(px, py, pz);
          normal = new THREE.Vector3(0, 1, 0);
        }

        if (world.oreNodes.some((node) => node.position.distanceToSquared(position) < 4.8)) continue;

        const definition = pickWeightedOreDefinition();
        const node = createOreNode(definition, { position, normal });
        world.oreNodes.push(node);
        world.group.add(node.group);
        world.oreHitMeshes.push(node.hitProxy, ...node.pieces);
        placed++;
      }
    }

    function spawnDropsFromOre(node) {
      const total = randInt(node.definition.dropMin, node.definition.dropMax);
      const radius = 0.1 + node.definition.level * 0.012 + Math.min(total, 4) * 0.018;
      const mesh = acquireDropMesh(node.definition);
      const px = node.position.x + randomRange(-0.22, 0.22);
      const pz = node.position.z + randomRange(-0.22, 0.22);
      const baseY = floorHeightAt(px, pz) + 0.18;
      mesh.visible = true;
      mesh.scale.setScalar(radius);
      mesh.position.set(px, baseY, pz);
      mesh.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
      world.group.add(mesh);

      world.dropItems.push({
        definition: node.definition,
        amount: total,
        mesh,
        baseY,
        bobOffset: world.rng() * Math.PI * 2,
      });
    }

    function breakOreNode(node) {
      spawnDropsFromOre(node);
      world.group.remove(node.group);
      removeArrayValueInPlace(world.oreNodes, node);
      node.hitProxy.userData.oreNodeRef = null;
      removeArrayValueInPlace(world.oreHitMeshes, node.hitProxy);
      for (const piece of node.pieces) {
        piece.userData.oreNodeRef = null;
        removeArrayValueInPlace(world.oreHitMeshes, piece);
      }
      if (miningState.targetNode === node) miningState.targetNode = null;
    }

    function getTargetOreNode() {
      if (itemState.equippedSlot !== 0 || world.oreHitMeshes.length === 0) return null;

      let bestHit = null;
      raycaster.near = 0;
      raycaster.far = miningState.range;

      for (const sample of miningAimSamples) {
        raycaster.setFromCamera(sample, camera);
        const intersections = raycaster.intersectObjects(world.oreHitMeshes, false);
        for (const hit of intersections) {
          if (hit.distance > miningState.range) break;
          const node = hit.object.userData.oreNodeRef;
          if (!node) continue;

          const worldNormal = hit.face?.normal
            ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
            : node.normal.clone();

          if (!bestHit || hit.distance < bestHit.distance) {
            bestHit = {
              node,
              point: hit.point.clone(),
              normal: worldNormal,
              distance: hit.distance,
            };
          }
          break;
        }
      }

      return bestHit;
    }

    function getHoveredObject() {
      if (!itemState.gameActive || world.interactables.length === 0) return null;

      let bestHit = null;
      raycaster.near = 0;
      raycaster.far = interactionState.range;

      for (const sample of miningAimSamples) {
        raycaster.setFromCamera(sample, camera);
        const intersections = raycaster.intersectObjects(world.interactables, false);
        for (const hit of intersections) {
          if (hit.distance > interactionState.range) break;
          if (!bestHit || hit.distance < bestHit.distance) {
            bestHit = hit;
          }
          break;
        }
      }

      return bestHit;
    }

    function tryMineWithPickaxe() {
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.equippedSlot !== 0) return;
      const now = clock.elapsedTime;
      if (now - miningState.lastHitAt < miningState.hitCooldown) return;
      miningState.lastHitAt = now;
      miningState.swinging = true;
      miningState.swingProgress = 0;

      const hit = getTargetOreNode();
      miningState.targetNode = hit ? hit.node : null;
      if (!hit) return;

      const node = hit.node;
      node.hp = Math.max(0, node.hp - playerStats.pickaxeDamage);
      node.hitFlash = 1;
      spawnHitSparks(hit);
      if (node.hp <= 0) breakOreNode(node);
    }

    function collectNearbyDrops() {
      let writeIndex = 0;
      let inventoryChanged = false;
      for (const drop of world.dropItems) {
        const dx = camera.position.x - drop.mesh.position.x;
        const dz = camera.position.z - drop.mesh.position.z;
        if (dx * dx + dz * dz <= 0.85 * 0.85) {
          inventoryState.totals[drop.definition.id] += drop.amount;
          releaseDropMesh(drop);
          inventoryChanged = true;
          continue;
        }

        world.dropItems[writeIndex] = drop;
        writeIndex++;
      }

      world.dropItems.length = writeIndex;

      if (inventoryChanged) {
        refreshResourceUi();
        saveGame();
      }
    }

    function updateMiningHud() {
      const hit = getTargetOreNode();
      const hoveredObject = getHoveredObject();
      const actionState = getPrimaryActionState({ hoveredObject, targetOreHit: hit });
      const interactHint = mobileState.enabled ? 'use o botao de acao' : 'clique ou pressione E';
      const mineHint = mobileState.enabled ? 'use o botao Picareta' : 'clique';
      miningState.targetNode = hit ? hit.node : null;
      updateMobileActionButton(actionState);
      if (hoveredObject?.object?.userData?.type === 'homeDoor') {
        miningChip.textContent = `Interacao: ${interactHint} para entrar na caverna`;
        return;
      }
      if (hoveredObject?.object?.userData?.type === 'returnPortal') {
        miningChip.textContent = `Interacao: ${interactHint} para voltar para casa`;
        return;
      }
      if (hoveredObject?.object?.userData?.type === 'chest') {
        miningChip.textContent = `Interacao: ${interactHint} para abrir o bau`;
        return;
      }
      if (hoveredObject?.object?.userData?.type === 'upgradeTable') {
        miningChip.textContent = `Interacao: ${interactHint} para usar a mesa de melhorias`;
        return;
      }
      if (itemState.equippedSlot !== 0) {
        miningChip.textContent = mobileState.enabled
          ? 'Mineracao: toque na Picareta para equipar'
          : 'Mineracao: equipe a picareta no 1';
        return;
      }
      if (!miningState.targetNode) {
        miningChip.textContent = `Mineracao: mire num node e ${mineHint} para bater`;
        return;
      }
      const node = miningState.targetNode;
      miningChip.textContent = `Mineracao: ${node.definition.label} | ${node.hp}/${node.maxHp} batidas restantes`;
    }

    function updateOreAndDrops(delta) {
      for (const node of world.oreNodes) {
        node.hitFlash = damp(node.hitFlash, 0, 9, delta);
        const pulse = 1 + Math.sin(clock.elapsedTime * (1.4 + node.definition.level * 0.12) + node.pulseOffset) * 0.16 + node.hitFlash * 0.35;
        for (const piece of node.pieces) {
          piece.material.emissiveIntensity = (1.2 + node.definition.level * 0.22) * pulse;
          const flashScale = 1 + node.hitFlash * 0.18;
          const baseScale = piece.userData.baseScale;
          piece.scale.set(
            baseScale.x * flashScale,
            baseScale.y * flashScale,
            baseScale.z * flashScale
          );
        }
      }

      for (const drop of world.dropItems) {
        drop.mesh.rotation.y += delta * 1.8;
        drop.mesh.position.y = drop.baseY + Math.sin(clock.elapsedTime * 3.4 + drop.bobOffset) * 0.08;
      }

      let sparkWriteIndex = 0;
      for (const spark of world.sparkParticles) {
        spark.life -= delta;
        if (spark.life <= 0) {
          world.group.remove(spark.mesh);
          spark.mesh.geometry.dispose();
          spark.mesh.material.dispose();
          continue;
        }

        spark.velocity.y -= delta * 5.8;
        spark.mesh.position.addScaledVector(spark.velocity, delta);
        spark.mesh.rotation.x += spark.spin.x * delta;
        spark.mesh.rotation.y += spark.spin.y * delta;
        spark.mesh.rotation.z += spark.spin.z * delta;
        spark.mesh.material.opacity = spark.life / spark.maxLife;
        world.sparkParticles[sparkWriteIndex] = spark;
        sparkWriteIndex++;
      }
      world.sparkParticles.length = sparkWriteIndex;

      collectNearbyDrops();
      updateMiningHud();
    }

    function createDiscoveryArrays() {
      world.discovery = Array.from({ length: world.height }, () => Array(world.width).fill(false));
      world.visited = Array.from({ length: world.height }, () => Array(world.width).fill(false));
      world.lastVisitedCell = null;
    }

    function rebuildWorld(seed = null) {
      miningState.holdActive = false;
      clearSparkParticles();
      disposeGroup(world.group);
      resetDropCaches();
      scene.remove(world.group);
      world.group = new THREE.Group();
      scene.add(world.group);
      world.rockColliders = [];
      world.interactables = [];
      world.oreNodes = [];
      world.oreHitMeshes = [];
      world.dropItems = [];
      world.nodes = [];

      if (areaState.currentArea === 'home') {
        generateHomeRoom(areaState.homeSeed);
      } else {
        const caveSeed = seed ?? areaState.caveSeed ?? Math.floor(Math.random() * 2147483647);
        areaState.caveSeed = caveSeed;
        generateCaveMap(caveSeed);
      }
      createDiscoveryArrays();
      buildFloorAndCeiling();
      buildWalls();

      if (areaState.currentArea === 'home') {
        buildHomeObjects();
        seedChip.textContent = 'Area: casa';
      } else {
        buildRocks();
        buildGlowCrystals();
        buildOreNodes();
        buildReturnPortal();
        warmDropPools();
        seedChip.textContent = `Area: caverna | Seed: ${world.seed}`;
      }

      resetPlayer();
    }

    function resetPlayer() {
      const spawnYaw = directionToYaw(world.spawnDir);
      playerState.bodyY = floorHeightAt(world.spawn.x, world.spawn.z) + world.playerHeight;
      playerState.verticalVelocity = 0;
      playerState.grounded = true;
      playerState.jumpQueued = false;
      camera.position.set(world.spawn.x, playerState.bodyY, world.spawn.z);
      lookState.yaw = spawnYaw;
      lookState.pitch = 0;
      applyLook();
      velocityForward = 0;
      velocityRight = 0;
      revealAroundPlayer();
      renderMaps();
    }

    function blockedAt(x, z, radius) {
      const samples = [
        [0, 0], [radius, 0], [-radius, 0], [0, radius], [0, -radius],
        [radius * 0.707, radius * 0.707], [-radius * 0.707, radius * 0.707],
        [radius * 0.707, -radius * 0.707], [-radius * 0.707, -radius * 0.707],
      ];

      for (const [sx, sz] of samples) {
        const cx = worldToCellX(x + sx);
        const cy = worldToCellY(z + sz);
        if (isWall(cx, cy)) return true;
      }

      for (const rock of world.rockColliders) {
        const dx = x - rock.position.x;
        const dz = z - rock.position.z;
        const minDist = radius + rock.radius;
        if (dx * dx + dz * dz < minDist * minDist) return true;
      }

      return false;
    }

    function markVisitedLine(x0, y0, x1, y1) {
      let dx = Math.abs(x1 - x0);
      let dy = Math.abs(y1 - y0);
      let sx = x0 < x1 ? 1 : -1;
      let sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        if (insideMap(x0, y0) && world.map[y0][x0] === 0) world.visited[y0][x0] = true;
        if (x0 === x1 && y0 === y1) break;
        const e2 = err * 2;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
      }
    }

    function revealAroundPlayer() {
      const cellX = worldToCellX(camera.position.x);
      const cellY = worldToCellY(camera.position.z);
      const revealRadius = 5;

      for (let y = cellY - revealRadius; y <= cellY + revealRadius; y++) {
        for (let x = cellX - revealRadius; x <= cellX + revealRadius; x++) {
          if (!insideMap(x, y)) continue;
          const dx = x - cellX;
          const dy = y - cellY;
          if (dx * dx + dy * dy > revealRadius * revealRadius) continue;
          world.discovery[y][x] = true;
        }
      }

      if (world.lastVisitedCell) {
        markVisitedLine(world.lastVisitedCell.x, world.lastVisitedCell.y, cellX, cellY);
      } else if (insideMap(cellX, cellY) && world.map[cellY][cellX] === 0) {
        world.visited[cellY][cellX] = true;
      }

      world.lastVisitedCell = { x: cellX, y: cellY };
    }

    function drawPlayerArrow(ctx, x, y, angle, size) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.68, size * 0.82);
      ctx.lineTo(0, size * 0.38);
      ctx.lineTo(-size * 0.68, size * 0.82);
      ctx.closePath();
      ctx.fillStyle = '#ffd77a';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    function getForwardDirection(out) {
      out.set(0, 0, -1).applyEuler(camera.rotation);
      return out.normalize();
    }

    function renderMiniMap() {
      const ctx = minimapCtx;
      const w = minimapCanvas.width;
      const h = minimapCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(5, 7, 10, 0.9)';
      ctx.fillRect(0, 0, w, h);

      const playerX = worldToMapFloatX(camera.position.x);
      const playerY = worldToMapFloatY(camera.position.z);
      const scale = 11.5;
      const offsetX = w / 2 - playerX * scale;
      const offsetY = h / 2 - playerY * scale;

      for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
          if (!world.discovery[y][x]) continue;
          ctx.fillStyle = world.map[y][x] === 0
            ? (world.visited[y][x] ? '#d8e6ff' : '#7d8ba2')
            : 'rgba(95, 103, 116, 0.35)';
          ctx.fillRect(offsetX + x * scale, offsetY + y * scale, scale, scale);
        }
      }

      const pulse = 2 + Math.sin(clock.elapsedTime * 4.3) * 0.6;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 5 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 122, 0.18)';
      ctx.fill();

      getForwardDirection(tempVec);
      const angle = Math.atan2(tempVec.x, -tempVec.z);
      drawPlayerArrow(ctx, w / 2, h / 2, angle, 9);
    }

    function renderBigMap() {
      const ctx = bigMapCtx;
      const w = bigMapCanvas.width;
      const h = bigMapCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(8, 10, 14, 0.96)';
      ctx.fillRect(0, 0, w, h);

      const pad = 24;
      const scale = Math.min((w - pad * 2) / world.width, (h - pad * 2) / world.height);
      const offsetX = (w - world.width * scale) / 2;
      const offsetY = (h - world.height * scale) / 2;

      for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) {
          const px = offsetX + x * scale;
          const py = offsetY + y * scale;
          if (!world.discovery[y][x]) {
            ctx.fillStyle = '#0b0e14';
            ctx.fillRect(px, py, scale, scale);
            continue;
          }
          ctx.fillStyle = world.map[y][x] === 0
            ? (world.visited[y][x] ? '#e7f0ff' : '#7c8ba3')
            : '#333a46';
          ctx.fillRect(px, py, scale, scale);
        }
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX, offsetY, world.width * scale, world.height * scale);

      const playerX = offsetX + worldToMapFloatX(camera.position.x) * scale;
      const playerY = offsetY + worldToMapFloatY(camera.position.z) * scale;
      getForwardDirection(tempVec);
      const angle = Math.atan2(tempVec.x, -tempVec.z);
      drawPlayerArrow(ctx, playerX, playerY, angle, Math.max(8, scale * 0.8));
    }

    function renderMaps() {
      renderMiniMap();
      renderBigMap();
    }

    let velocityForward = 0;
    let velocityRight = 0;

    function tryMove(dx, dz) {
      const nextX = camera.position.x + dx;
      if (!blockedAt(nextX, camera.position.z, world.playerRadius)) camera.position.x = nextX;
      const nextZ = camera.position.z + dz;
      if (!blockedAt(camera.position.x, nextZ, world.playerRadius)) camera.position.z = nextZ;
    }

    function onKeyChange(event, value) {
      switch (event.code) {
        case 'KeyW': keyState.forward = value; break;
        case 'KeyS': keyState.backward = value; break;
        case 'KeyA': keyState.left = value; break;
        case 'KeyD': keyState.right = value; break;
        case 'ShiftLeft':
        case 'ShiftRight': keyState.sprint = value; break;
        case 'Digit1': if (value && !event.repeat) equipSlot(0); break;
        case 'Digit2': if (value && !event.repeat) equipSlot(1); break;
        case 'Digit3': if (value && !event.repeat) equipSlot(2); break;
        case 'Digit4': if (value && !event.repeat) equipSlot(3); break;
        case 'Digit5': if (value && !event.repeat) equipSlot(4); break;
        case 'KeyL':
          if (value && !event.repeat && itemState.gameActive) {
            itemState.flashlightOn = !itemState.flashlightOn;
            saveGame();
          }
          break;
        case 'Space':
          if (value && !event.repeat && itemState.gameActive && !itemState.inventoryOpen && !itemState.mapOpen) {
            playerState.jumpQueued = true;
          }
          break;
        case 'KeyE':
          if (value && !event.repeat) handleInteractAction();
          break;
        case 'KeyI': if (value && !event.repeat) toggleInventory(); break;
        case 'KeyM': if (value && !event.repeat) toggleBigMap(); break;
        case 'Escape':
          if (value) {
            if (itemState.inventoryOpen) {
              closeActivePanel();
            } else if (itemState.mapOpen) {
              toggleBigMap();
            } else if (document.pointerLockElement === document.body) {
              document.exitPointerLock();
            }
          }
          break;
      }

      if (['Space', 'KeyE', 'KeyL', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'KeyI', 'KeyM'].includes(event.code)) {
        event.preventDefault();
      }
    }

    document.addEventListener('keydown', (event) => onKeyChange(event, true));
    document.addEventListener('keyup', (event) => onKeyChange(event, false));

    window.addEventListener('beforeunload', saveGame);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveGame();
      }
    });

    renderer.domElement.addEventListener('click', () => {
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen) return;
      if (lookState.preferPointerLock && !lookState.pointerLockActive && !lookState.fallbackOnly) {
        tryRequestPointerLock();
      }
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateResponsiveLayout();
    });

    if (typeof coarsePointerQuery.addEventListener === 'function') {
      coarsePointerQuery.addEventListener('change', updateResponsiveLayout);
    }

    function runSelfTests() {
      const failures = [];
      const assert = (condition, message) => {
        if (!condition) failures.push(message);
      };
      const oldArea = areaState.currentArea;
      const oldCaveSeed = areaState.caveSeed;
      const oldSeed = world.seed;
      const oldRng = world.rng;
      const oldFloorNoise = world.floorNoise;
      const oldCeilingNoise = world.ceilingNoise;
      const oldMap = world.map;
      const oldNodes = world.nodes;
      const oldHomeRoom = world.homeRoom;
      const oldSpawn = world.spawn;
      const oldSpawnDir = world.spawnDir;
      const oldRockColliders = world.rockColliders;
      const oldInteractables = world.interactables;
      const oldOreNodes = world.oreNodes;
      const oldOreHitMeshes = world.oreHitMeshes;
      const oldDropItems = world.dropItems;
      const oldGroup = world.group;
      const tempGroup = new THREE.Group();

      try {
        world.group = tempGroup;
        world.rockColliders = [];
        world.interactables = [];
        world.oreNodes = [];
        world.oreHitMeshes = [];
        world.dropItems = [];

        generateHomeRoom(111);
        assert(Array.isArray(world.map) && world.map.length === world.height, 'mapa nÃ£o foi gerado com altura correta');
        assert(Array.isArray(world.map[0]) && world.map[0].length === world.width, 'mapa nÃ£o foi gerado com largura correta');
        assert(world.spawn && world.map[world.spawn.cellY][world.spawn.cellX] === 0, 'spawn da casa nÃ£o estÃ¡ em cÃ©lula aberta');
        assert(world.homeRoom && world.homeRoom.halfSize >= 3, 'quarto da casa nÃ£o foi configurado');

        const homeRegions = floodOpenRegions(world.map);
        const expectedHomeCells = (world.homeRoom.halfSize * 2 + 1) * (world.homeRoom.halfSize * 2 + 1);
        assert(homeRegions.length === 1, 'casa deveria ter uma Ãºnica regiÃ£o aberta');
        assert(homeRegions[0].length === expectedHomeCells, 'casa nÃ£o estÃ¡ fechada como quarto isolado');
        buildHomeObjects();
        assert(world.interactables.some((object) => object.userData.type === 'homeDoor'), 'porta da casa nÃ£o foi criada');
        assert(world.interactables.some((object) => object.userData.type === 'chest'), 'baÃº da casa nÃ£o foi criado');
        assert(world.interactables.some((object) => object.userData.type === 'upgradeTable'), 'mesa da casa nÃ£o foi criada');

        world.rockColliders = [];
        world.interactables = [];
        world.oreNodes = [];
        world.oreHitMeshes = [];
        world.dropItems = [];
        disposeGroup(tempGroup);
        world.group = new THREE.Group();

        generateCaveMap(12345);
        assert(world.spawn && world.map[world.spawn.cellY][world.spawn.cellX] === 0, 'spawn da caverna nÃ£o estÃ¡ em cÃ©lula aberta');
        assert(oreDefinitions.length === 5, 'devem existir cinco tipos de minÃ©rio');
        assert(world.nodes.length >= 4, 'geraÃ§Ã£o da caverna criou poucos nÃ³s');

        const caveRegions = floodOpenRegions(world.map);
        assert(caveRegions.length >= 1, 'nÃ£o hÃ¡ regiÃ£o aberta na caverna');
        assert(caveRegions[0].length > 120, 'regiÃ£o principal da caverna muito pequena');

        buildReturnPortal();
        assert(world.interactables.some((object) => object.userData.type === 'returnPortal'), 'portal de retorno nÃ£o foi criado na caverna');

      } catch (error) {
        failures.push(`erro nos autotestes: ${error.message}`);
      } finally {
        disposeGroup(world.group);
        world.group = oldGroup;
        areaState.currentArea = oldArea;
        areaState.caveSeed = oldCaveSeed;
        world.seed = oldSeed;
        world.rng = oldRng;
        world.floorNoise = oldFloorNoise;
        world.ceilingNoise = oldCeilingNoise;
        world.map = oldMap;
        world.nodes = oldNodes;
        world.homeRoom = oldHomeRoom;
        world.spawn = oldSpawn;
        world.spawnDir = oldSpawnDir;
        world.rockColliders = oldRockColliders;
        world.interactables = oldInteractables;
        world.oreNodes = oldOreNodes;
        world.oreHitMeshes = oldOreHitMeshes;
        world.dropItems = oldDropItems;
      }

      if (failures.length) {
        console.error('Autotestes falharam:', failures);
        testChip.textContent = `Autotestes: falha (${failures[0]})`;
      } else {
        testChip.textContent = 'Autotestes: ok';
      }
    }

    function scheduleSelfTests() {
      testChip.textContent = 'Autotestes: em fila';
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => runSelfTests(), { timeout: 1200 });
        return;
      }
      window.setTimeout(runSelfTests, 400);
    }

    loadGame();
    buildInventoryGrid();
    buildChestGrid();
    refreshResourceUi();
    updateHotbar();
    rebuildWorld();
    applyLook();
    itemState.gameActive = true;
    updateControlChip();
    updateResponsiveLayout();
    updateModeChip();
    updateMiningHud();
    scheduleSelfTests();

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);

      if (itemState.gameActive && !itemState.inventoryOpen) {
        const moveSpeed = keyState.sprint ? 8.6 : 5.6;
        const mobileForward = mobileState.left.maxRadius > 0 ? -mobileState.left.y / mobileState.left.maxRadius : 0;
        const mobileRight = mobileState.left.maxRadius > 0 ? mobileState.left.x / mobileState.left.maxRadius : 0;
        const inputForward = THREE.MathUtils.clamp(((keyState.forward ? 1 : 0) - (keyState.backward ? 1 : 0)) + mobileForward, -1, 1);
        const inputRight = THREE.MathUtils.clamp(((keyState.right ? 1 : 0) - (keyState.left ? 1 : 0)) + mobileRight, -1, 1);
        const length = Math.hypot(inputForward, inputRight);
        const normalizedForward = length > 0 ? inputForward / length : 0;
        const normalizedRight = length > 0 ? inputRight / length : 0;

        velocityForward = damp(velocityForward, normalizedForward * moveSpeed, 10, delta);
        velocityRight = damp(velocityRight, normalizedRight * moveSpeed, 10, delta);

        getForwardDirection(forward);
        forward.y = 0;
        forward.normalize();
        right.crossVectors(forward, up).normalize();

        const dx = (forward.x * velocityForward + right.x * velocityRight) * delta;
        const dz = (forward.z * velocityForward + right.z * velocityRight) * delta;
        tryMove(dx, dz);

        if (playerState.jumpQueued && playerState.grounded) {
          playerState.verticalVelocity = 6.1;
          playerState.grounded = false;
        }
        playerState.jumpQueued = false;

        if (miningState.holdActive) {
          tryMineWithPickaxe();
        }
        if (mobileState.actionHeld) {
          triggerPrimaryAction();
        }
      } else {
        velocityForward = damp(velocityForward, 0, 12, delta);
        velocityRight = damp(velocityRight, 0, 12, delta);
        playerState.jumpQueued = false;
      }

      const bobSpeed = Math.min(1, Math.hypot(velocityForward, velocityRight) / 7.5);
      const floor = floorHeightAt(camera.position.x, camera.position.z);
      const groundedHeight = floor + world.playerHeight;
      if (playerState.grounded && playerState.bodyY <= groundedHeight + 0.001 && playerState.verticalVelocity <= 0) {
        playerState.bodyY = groundedHeight;
      } else {
        playerState.grounded = false;
        playerState.verticalVelocity -= 16.5 * delta;
        playerState.bodyY += playerState.verticalVelocity * delta;
        if (playerState.bodyY <= groundedHeight) {
          playerState.bodyY = groundedHeight;
          playerState.verticalVelocity = 0;
          playerState.grounded = true;
        }
      }
      const bob = playerState.grounded ? Math.sin(clock.elapsedTime * 9.5) * 0.022 * bobSpeed : 0;
      camera.position.y = playerState.bodyY + bob;

      const flashlightLevelOffset = playerStats.flashlightLevel - 1;
      const flashlightDistance = 42 + flashlightLevelOffset * 8;
      const flashlightAngle = Math.min(Math.PI / 6.2, Math.PI / 11 + flashlightLevelOffset * 0.05);
      flashlightModel.visible = false;
      playerLamp.intensity = damp(playerLamp.intensity, itemState.flashlightOn ? 0.42 : 0, 11, delta);
      flashlightBeam.intensity = damp(flashlightBeam.intensity, itemState.flashlightOn ? 23 : 0, 14, delta);
      if (Math.abs(flashlightBeam.distance - flashlightDistance) > 0.001 || Math.abs(flashlightBeam.angle - flashlightAngle) > 0.0001) {
        flashlightBeam.distance = flashlightDistance;
        flashlightBeam.shadow.camera.far = flashlightDistance;
        flashlightBeam.angle = flashlightAngle;
        flashlightBeam.shadow.camera.updateProjectionMatrix();
      }
      flashlightPivot.position.set(0, 0.02 - bob * 0.12, 0.04);
      flashlightPivot.rotation.set(0, 0, 0);

      const pickaxeActive = itemState.equippedSlot === 0;
      pickaxeModel.visible = pickaxeActive;
      const pickaxeRestRotation = new THREE.Euler(0.18, 1.42, 0.18);
      const pickaxeSwingSpeed = 11.2;
      const pickaxeSwingArc = -1.2;

      if (miningState.swinging) {
        miningState.swingProgress += delta * pickaxeSwingSpeed;
        pickaxeModel.rotation.x = pickaxeRestRotation.x + Math.sin(miningState.swingProgress) * pickaxeSwingArc;

        if (miningState.swingProgress >= Math.PI) {
          miningState.swinging = false;
          miningState.swingProgress = Math.PI;
          pickaxeModel.rotation.x = pickaxeRestRotation.x;
        }
      } else {
        pickaxeModel.rotation.x = THREE.MathUtils.lerp(pickaxeModel.rotation.x, pickaxeRestRotation.x, 0.22);
      }

      pickaxeModel.rotation.y = pickaxeRestRotation.y;
      pickaxeModel.rotation.z = pickaxeRestRotation.z;
      pickaxePivot.position.set(0.5 + Math.sin(clock.elapsedTime * 7.2) * 0.012 * bobSpeed, -0.5 - bob * 0.34, -0.8);
      pickaxePivot.rotation.set(-0.22, -0.08, 0.08);

      revealAroundPlayer();
      updateOreAndDrops(delta);
      renderMaps();
      renderer.render(scene, camera);
    }

    animate();
