import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

const seedChip = document.getElementById('seedChip');
const controlChip = document.getElementById('controlChip');
const modeChip = document.getElementById('modeChip');
const inventoryChip = document.getElementById('inventoryChip');
const miningChip = document.getElementById('miningChip');
const testChip = document.getElementById('testChip');
const hotbar = document.getElementById('hotbar');
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
const inventoryLayout = document.getElementById('inventoryLayout');
const inventoryItemGrid = document.getElementById('inventoryItemGrid');
const inventoryHeadSlot = document.getElementById('inventoryHeadSlot');
const inventoryPreviewCanvas = document.getElementById('inventoryPreviewCanvas');
const inventoryInfoText = document.getElementById('inventoryInfoText');
const inventoryCloseButton = document.getElementById('inventoryCloseButton');
const chestPanel = document.getElementById('chestPanel');
const chestGrid = document.getElementById('chestGrid');
const chestStorageGrid = document.getElementById('chestStorageGrid');
const transferAllButton = document.getElementById('transferAllButton');
const chestCloseButton = document.getElementById('chestCloseButton');
const upgradePanel = document.getElementById('upgradePanel');
const upgradeWorkbenchSlot = document.getElementById('upgradeWorkbenchSlot');
const upgradeSelectedKind = document.getElementById('upgradeSelectedKind');
const upgradeSelectedName = document.getElementById('upgradeSelectedName');
const upgradeSelectedStats = document.getElementById('upgradeSelectedStats');
const upgradeSelectedItemButton = document.getElementById('upgradeSelectedItemButton');
const upgradeSelectedHint = document.getElementById('upgradeSelectedHint');
const upgradeInventoryGrid = document.getElementById('upgradeInventoryGrid');
const upgradeHeadSlot = document.getElementById('upgradeHeadSlot');
const upgradeResourceGrid = document.getElementById('upgradeResourceGrid');
const upgradeCloseButton = document.getElementById('upgradeCloseButton');
const optionsPanel = document.getElementById('optionsPanel');
const optionsCloseButton = document.getElementById('optionsCloseButton');
const controlsMenuButton = document.getElementById('controlsMenuButton');
const controlsDetails = document.getElementById('controlsDetails');
const buildPanel = document.getElementById('buildPanel');
const buildCloseButton = document.getElementById('buildCloseButton');
const buildSelectionInfo = document.getElementById('buildSelectionInfo');
const buildMoveButton = document.getElementById('buildMoveButton');
const buildRotateButton = document.getElementById('buildRotateButton');
const buildScaleButton = document.getElementById('buildScaleButton');
const buildLightingButton = document.getElementById('buildLightingButton');
const buildRotationSlider = document.getElementById('buildRotationSlider');
const buildRotationValue = document.getElementById('buildRotationValue');
const buildScaleSlider = document.getElementById('buildScaleSlider');
const buildScaleValue = document.getElementById('buildScaleValue');
const buildResetSelectedButton = document.getElementById('buildResetSelectedButton');
const buildResetAllButton = document.getElementById('buildResetAllButton');
const devPanel = document.getElementById('devPanel');
const devCloseButton = document.getElementById('devCloseButton');
const devSectionNav = document.getElementById('devSectionNav');
const devWeaponWorkspace = document.getElementById('devWeaponWorkspace');
const devItemSelect = document.getElementById('devItemSelect');
const devTargetSelect = document.getElementById('devTargetSelect');
const devTransformModeSelect = document.getElementById('devTransformModeSelect');
const devSimulationSelect = document.getElementById('devSimulationSelect');
const devKeyframeSelect = document.getElementById('devKeyframeSelect');
const devKeyframeTimeInput = document.getElementById('devKeyframeTimeInput');
const devPlayPauseButton = document.getElementById('devPlayPauseButton');
const devCaptureKeyframeButton = document.getElementById('devCaptureKeyframeButton');
const devAddKeyframeButton = document.getElementById('devAddKeyframeButton');
const devRemoveKeyframeButton = document.getElementById('devRemoveKeyframeButton');
const devSaveButton = document.getElementById('devSaveButton');
const devGameplayResetButton = document.getElementById('devGameplayResetButton');
const devResetItemButton = document.getElementById('devResetItemButton');
const devResetAllButton = document.getElementById('devResetAllButton');
const devControls = document.getElementById('devControls');
const devHitboxWorkspace = document.getElementById('devHitboxWorkspace');
const devHitboxObjectSelect = document.getElementById('devHitboxObjectSelect');
const devHitboxTransformModeSelect = document.getElementById('devHitboxTransformModeSelect');
const devHitboxResetButton = document.getElementById('devHitboxResetButton');
const devHitboxInfo = document.getElementById('devHitboxInfo');
const devGameplaySection = document.getElementById('devGameplaySection');
const devMonsterToolbar = document.getElementById('devMonsterToolbar');
const devMonsterSelect = document.getElementById('devMonsterSelect');
const devGameplayControls = document.getElementById('devGameplayControls');
const devBalanceSection = document.getElementById('devBalanceSection');
const devBalanceItemSelect = document.getElementById('devBalanceItemSelect');
const devBalanceLevelSelect = document.getElementById('devBalanceLevelSelect');
const devBalanceResetButton = document.getElementById('devBalanceResetButton');
const devBalanceControls = document.getElementById('devBalanceControls');
const devStatus = document.getElementById('devStatus');
const pickaxeLevelValue = document.getElementById('pickaxeLevelValue');
const pickaxeDamageValue = document.getElementById('pickaxeDamageValue');
const flashlightLevelValue = document.getElementById('flashlightLevelValue');
const flashlightPowerValue = document.getElementById('flashlightPowerValue');
const swordLevelValue = document.getElementById('swordLevelValue');
const swordDamageValue = document.getElementById('swordDamageValue');
const crossbowLevelValue = document.getElementById('crossbowLevelValue');
const crossbowDamageValue = document.getElementById('crossbowDamageValue');
const upgradeHint = document.getElementById('upgradeHint');
const combatHud = document.getElementById('combatHud');
const healthFill = document.getElementById('healthFill');
const healthText = document.getElementById('healthText');
const swordHudText = document.getElementById('swordHudText');
const worldUiLayer = document.getElementById('worldUiLayer');
const interactionPrompt = document.getElementById('interactionPrompt');
const interactionKeyBadge = document.getElementById('interactionKeyBadge');
const interactionPickaxeBadge = document.getElementById('interactionPickaxeBadge');
const monsterBarsLayer = document.getElementById('monsterBarsLayer');
const oreBarsLayer = document.getElementById('oreBarsLayer');
const damageNumbersLayer = document.getElementById('damageNumbersLayer');
const itemDragGhost = document.getElementById('itemDragGhost');
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
  options: optionsPanel,
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

const playerRoot = new THREE.Group();
const cameraPivot = new THREE.Group();
playerRoot.add(cameraPivot);
scene.add(playerRoot);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 220);
    camera.position.set(0.24, 0.08, 2.78);
    cameraPivot.add(camera);

const devOrbitControls = new OrbitControls(camera, renderer.domElement);
    devOrbitControls.enabled = false;
    devOrbitControls.enableDamping = true;
    devOrbitControls.dampingFactor = 0.08;
    devOrbitControls.enablePan = true;
    devOrbitControls.screenSpacePanning = true;
    devOrbitControls.enableZoom = true;
    devOrbitControls.rotateSpeed = 0.92;
    devOrbitControls.zoomSpeed = 1.35;
    devOrbitControls.panSpeed = 1.2;
    devOrbitControls.minDistance = 0.42;
    devOrbitControls.maxDistance = 15;
    devOrbitControls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    devOrbitControls.target.set(0, 1.1, 0);

const devTransformControls = new TransformControls(camera, renderer.domElement);
const devTransformHelper = typeof devTransformControls.getHelper === 'function' ? devTransformControls.getHelper() : devTransformControls;
    devTransformControls.enabled = false;
    devTransformHelper.visible = false;
    scene.add(devTransformHelper);

const devStudioGroup = new THREE.Group();

let inventoryPreviewRenderer = null;
let inventoryPreviewScene = null;
let inventoryPreviewCamera = null;
let inventoryPreviewControls = null;
let inventoryPreviewCharacter = null;
let inventoryPreviewPlatform = null;
    devStudioGroup.visible = false;
    scene.add(devStudioGroup);

const devHitboxPreviewGroup = new THREE.Group();
    devHitboxPreviewGroup.visible = false;
    devStudioGroup.add(devHitboxPreviewGroup);

const devHitboxPreviewAnchor = new THREE.Group();
    devHitboxPreviewGroup.add(devHitboxPreviewAnchor);

const devHitboxBox = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x7affd5,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      })
    );
    devHitboxBox.renderOrder = 24;
    devHitboxPreviewAnchor.add(devHitboxBox);

const devHitboxWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
      new THREE.LineBasicMaterial({ color: 0x7affd5, transparent: true, opacity: 0.9 })
    );
    devHitboxWire.renderOrder = 25;
    devHitboxBox.add(devHitboxWire);

const devStudioFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0 })
    );
    devStudioFloor.rotation.x = -Math.PI / 2;
    devStudioFloor.receiveShadow = true;
    devStudioGroup.add(devStudioFloor);

const devStudioGrid = new THREE.GridHelper(8, 16, 0xd7dce5, 0xebedf2);
    devStudioGrid.position.y = 0.003;
    devStudioGroup.add(devStudioGrid);

const devStudioLight = new THREE.HemisphereLight(0xffffff, 0xdde3ec, 2.2);
    devStudioGroup.add(devStudioLight);

const devStudioKeyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    devStudioKeyLight.position.set(3.5, 4.2, 2.8);
    devStudioKeyLight.castShadow = true;
    devStudioGroup.add(devStudioKeyLight);

const buildLightGroup = new THREE.Group();
    buildLightGroup.visible = false;
    scene.add(buildLightGroup);

const buildLightHemisphere = new THREE.HemisphereLight(0xffffff, 0xf0f3ff, 2.6);
    buildLightGroup.add(buildLightHemisphere);

const buildLightKey = new THREE.DirectionalLight(0xffffff, 2.9);
    buildLightKey.position.set(4.6, 6.2, 3.1);
    buildLightKey.castShadow = true;
    buildLightGroup.add(buildLightKey);

const buildLightFill = new THREE.DirectionalLight(0xd9ebff, 1.7);
    buildLightFill.position.set(-4.2, 4.1, -2.6);
    buildLightGroup.add(buildLightFill);

const buildLightTop = new THREE.PointLight(0xffffff, 3.6, 18, 2);
    buildLightTop.position.set(0, 4.2, 0);
    buildLightGroup.add(buildLightTop);

const clock = new THREE.Clock();
const up = new THREE.Vector3(0, 1, 0);
const forward = new THREE.Vector3();
const right = new THREE.Vector3();
const tempVec = new THREE.Vector3();
const interactionOrigin = new THREE.Vector3();
const cameraWorldPosition = new THREE.Vector3();
const combatForward = new THREE.Vector3();
const combatDelta = new THREE.Vector3();
const monsterMoveVector = new THREE.Vector3();
const monsterTargetVector = new THREE.Vector3();
const uiWorldPosition = new THREE.Vector3();
const uiScreenPosition = new THREE.Vector3();
const uiWorldScale = new THREE.Vector3();
const projectileStartPosition = new THREE.Vector3();
const projectileNextPosition = new THREE.Vector3();
const projectileDirection = new THREE.Vector3();
const projectileImpactPosition = new THREE.Vector3();
const projectileClosestPoint = new THREE.Vector3();
const projectileHitCenter = new THREE.Vector3();
const crossbowAimPoint = new THREE.Vector3();
const crossbowAimOrigin = new THREE.Vector3();
const monsterForwardVector = new THREE.Vector3();
const projectileLine = new THREE.Line3();
const projectileHitSphere = new THREE.Sphere();
const devCameraForward = new THREE.Vector3();
const devCameraRight = new THREE.Vector3();
const devCameraOffset = new THREE.Vector3();
const devCameraView = new THREE.Vector3();
const devCameraUp = new THREE.Vector3();
const hitboxOffsetVector = new THREE.Vector3();
const buildFocusVector = new THREE.Vector3();

function getPlayerX() {
  return playerRoot.position.x;
}

function getPlayerZ() {
  return playerRoot.position.z;
}

function getPlayerInteractionOrigin(target = new THREE.Vector3()) {
  return target.set(
    getPlayerX(),
    playerRoot.position.y + world.playerHeight * 0.72,
    getPlayerZ()
  );
}

const lookState = {
      yaw: 0,
      pitch: 0,
      sensitivity: 0.0024,
      dragSensitivity: 0.0052,
      isDragging: false,
      pointerLockActive: false,
      pointerLockPending: false,
      preferPointerLock: true,
      fallbackOnly: false,
      lastPointerError: '',
      recaptureQueued: false,
      lastRequestAt: -10,
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
      lastActionTouchAt: -1000,
    };

const itemState = {
      equippedSlot: -1,
      flashlightOn: true,
      mapOpen: false,
      inventoryOpen: false,
      gameActive: false,
    };

const workbenchState = {
  item: null,
};

const itemDragState = {
  active: false,
  pointerId: null,
  source: null,
  target: null,
  item: null,
  offsetX: 0,
  offsetY: 0,
  startClientX: 0,
  startClientY: 0,
  moved: false,
  suppressClickUntil: 0,
};

const uiState = {
  activePanel: null,
  nextMiningHudScanAt: 0,
  hoveredObject: null,
  targetOreHit: null,
  actionState: { type: 'mine', label: 'Picareta', note: 'acao' },
};

const worldUiState = {
  damageTexts: [],
};

const areaState = {
  currentArea: 'home',
  caveSeed: null,
  homeSeed: 91357,
};

const HOME_BUILD_SCALE_MIN = 0.5;
const HOME_BUILD_SCALE_MAX = 1.5;

const homeBuildLayoutState = {
  placements: {},
};

const raycaster = new THREE.Raycaster();
const raycastHits = [];
const screenCenter = new THREE.Vector2(0, 0);
const screenPointer = new THREE.Vector2(0, 0);
const pointerAimSamples = [screenPointer];
const miningAimSamples = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.026, 0),
      new THREE.Vector2(-0.026, 0),
      new THREE.Vector2(0, 0.026),
      new THREE.Vector2(0, -0.026),
    ];

const interactionState = {
  range: 7.5,
};

const worldPromptState = {
  interactRange: 3.6,
  oreRange: 3.9,
};

const monsterUiState = {
  barRange: 10.5,
};

const desktopPointerState = {
  overCanvas: false,
  hasPosition: false,
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
      { id: 'aurio', short: 'Au', label: 'Áurio', level: 5, color: 0xffe87a, emissive: 0x9a7315, hits: 11, dropMin: 3, dropMax: 6, clusterMin: 7, clusterMax: 11, rarity: 0.08 },
    ];

const inventoryState = {
      totals: Object.fromEntries(oreDefinitions.map((definition) => [definition.id, 0])),
      itemSlots: Array.from({ length: 21 }, () => null),
      equipment: {
        head: null,
      },
    };

const chestState = {
  totals: Object.fromEntries(oreDefinitions.map((definition) => [definition.id, 0])),
  itemSlots: Array.from({ length: 21 }, () => null),
};

const INVENTORY_SLOT_COUNT = 21;
const CHEST_SLOT_COUNT = 21;
const HOTBAR_SLOT_COUNT = 5;
const ORE_STACK_LIMIT = 999;
const equipmentSlotDefinitions = {
  head: {
    label: 'Cabeca',
    accepts: ['flashlight'],
  },
};

const itemKindLabels = {
  ore: 'Minerio',
  pickaxe: 'Picareta',
  sword: 'Espada',
  crossbow: 'Crossbow',
  flashlight: 'Lanterna',
};

const itemKindEmptyHints = {
  inventory: 'Arraste itens entre slots',
  head: 'Slot de cabeca',
  workbench: 'Solte o item aqui',
};

let nextInventoryItemId = 1;

const pickaxeDefinitions = [
  { level: 1, name: 'Pedra e Madeira Basica', damage: 1, handle: 0x5c4033, head: 0x888888, metal: 0.1, rough: 0.9, emissive: 0x000000, size: 1, cost: null },
  { level: 2, name: 'Picareta de Cobre', damage: 2, handle: 0x4a3219, head: 0xb87333, metal: 0.6, rough: 0.4, emissive: 0x000000, size: 1.05, cost: { ferrita: 3 } },
  { level: 3, name: 'Picareta de Ferro', damage: 3, handle: 0x3d2314, head: 0x7a7a7a, metal: 0.8, rough: 0.6, emissive: 0x000000, size: 1.1, cost: { ferrita: 5, cobre: 1 } },
  { level: 4, name: 'Picareta de Aco Polido', damage: 4, handle: 0x111111, head: 0xaaaaaa, metal: 1, rough: 0.2, emissive: 0x000000, size: 1.15, cost: { ferrita: 6, cobre: 3 } },
  { level: 5, name: 'Picareta de Ouro', damage: 5, handle: 0x222222, head: 0xffd700, metal: 1, rough: 0.1, emissive: 0x221100, size: 1.2, cost: { ferrita: 7, cobre: 4, ametista: 1 } },
  { level: 6, name: 'Picareta de Platina e Esmeralda', damage: 6, handle: 0xe5e4e2, head: 0x50c878, metal: 0.9, rough: 0.1, emissive: 0x003300, size: 1.25, hasGem: true, cost: { ferrita: 8, cobre: 5, ametista: 2 } },
  { level: 7, name: 'Picareta de Cristal Ametista', damage: 7, handle: 0x1a1a1a, head: 0x9966cc, metal: 0.3, rough: 0, emissive: 0x331155, size: 1.3, hasGem: true, cost: { ferrita: 9, cobre: 5, ametista: 3, safira: 1 } },
  { level: 8, name: 'Picareta de Obsidiana e Magma', damage: 8, handle: 0x0a0a0a, head: 0xff4500, metal: 0.5, rough: 0.8, emissive: 0xaa1100, size: 1.4, hasSpikes: true, cost: { ferrita: 10, cobre: 6, ametista: 4, safira: 2 } },
  { level: 9, name: 'Picareta de Plasma', damage: 9, handle: 0x000000, head: 0x00ffff, metal: 1, rough: 0.1, emissive: 0x0088bb, size: 1.5, hasSpikes: true, hasAura: true, cost: { ferrita: 12, cobre: 7, ametista: 5, safira: 3, aurio: 1 } },
  { level: 10, name: 'Picareta Fragmento do Vazio', damage: 10, handle: 0x200030, head: 0xff00ff, metal: 1, rough: 0, emissive: 0x880088, size: 1.6, hasSpikes: true, hasGem: true, hasAura: true, cost: { ferrita: 14, cobre: 8, ametista: 6, safira: 4, aurio: 2 } },
];

const swordDefinitions = [
  { level: 1, name: 'Espada de Madeira', damage: 6, cost: null },
  { level: 2, name: 'Espada de Pedra', damage: 9, cost: { ferrita: 3 } },
  { level: 3, name: 'Espada de Ferro', damage: 12, cost: { ferrita: 5, cobre: 2 } },
  { level: 4, name: 'Espada de Aco', damage: 15, cost: { ferrita: 7, cobre: 3 } },
  { level: 5, name: 'Espada de Ouro', damage: 18, cost: { ferrita: 8, cobre: 4, ametista: 2 } },
  { level: 6, name: 'Espada de Diamante', damage: 21, cost: { ferrita: 10, cobre: 5, ametista: 3 } },
  { level: 7, name: 'Espada de Fogo', damage: 25, cost: { ferrita: 11, cobre: 6, ametista: 4, safira: 2 } },
  { level: 8, name: 'Espada do Vazio', damage: 29, cost: { ferrita: 12, cobre: 7, ametista: 5, safira: 3 } },
  { level: 9, name: 'Espada de Plasma', damage: 34, cost: { ferrita: 14, cobre: 8, ametista: 6, safira: 4, aurio: 2 } },
  { level: 10, name: 'Espada Divina Cosmica', damage: 40, cost: { ferrita: 16, cobre: 9, ametista: 7, safira: 5, aurio: 3 } },
];

const crossbowDefinitions = [
  { level: 1, name: 'Rusty Wooden Crossbow', damage: 14, range: 25, projectileSpeed: 22, cooldown: 0.58, cost: null },
  { level: 2, name: 'Reinforced Steel Crossbow', damage: 17, range: 26, projectileSpeed: 23, cooldown: 0.56, cost: { ferrita: 3 } },
  { level: 3, name: 'Dwarven Bronze Crossbow', damage: 20, range: 27, projectileSpeed: 24, cooldown: 0.54, cost: { ferrita: 5, cobre: 2 } },
  { level: 4, name: 'Tactical Hunter Crossbow', damage: 24, range: 29, projectileSpeed: 25, cooldown: 0.52, cost: { ferrita: 6, cobre: 3 } },
  { level: 5, name: 'Elite Golden Twin-Bow', damage: 28, range: 30, projectileSpeed: 26, cooldown: 0.5, cost: { ferrita: 7, cobre: 4, ametista: 1 } },
  { level: 6, name: 'Amethyst Infused Crossbow', damage: 33, range: 32, projectileSpeed: 27, cooldown: 0.48, cost: { ferrita: 8, cobre: 5, ametista: 2 } },
  { level: 7, name: 'Toxic Mutant Crossbow', damage: 38, range: 34, projectileSpeed: 28, cooldown: 0.46, cost: { ferrita: 9, cobre: 6, ametista: 3, safira: 1 } },
  { level: 8, name: 'Plasma Compound Bow', damage: 44, range: 36, projectileSpeed: 30, cooldown: 0.44, cost: { ferrita: 10, cobre: 7, ametista: 4, safira: 2 } },
  { level: 9, name: 'Void Energy Arbalest', damage: 51, range: 39, projectileSpeed: 32, cooldown: 0.42, cost: { ferrita: 12, cobre: 8, ametista: 5, safira: 3, aurio: 1 } },
  { level: 10, name: 'Dragons Fury Crossbow', damage: 60, range: 42, projectileSpeed: 34, cooldown: 0.4, cost: { ferrita: 14, cobre: 9, ametista: 6, safira: 4, aurio: 2 } },
];

const playerStats = {
  pickaxeDamage: 1,
  flashlightLevel: 1,
  swordLevel: 1,
  crossbowLevel: 1,
  health: 100,
  maxHealth: 100,
};

const combatState = {
  attackTimer: 0,
  attackDuration: 0.44,
  attackHitWindow: 0.48,
  attackHitDone: false,
  attackComboIndex: 0,
  comboResetWindow: 0.95,
  holdActive: false,
  lastAttackAt: -10,
  attackCooldown: 0.42,
  range: 2.85,
  arcDot: 0.22,
  invulnerableUntil: -10,
  damageFlashTimer: 0,
};

const crossbowState = {
  holdActive: false,
  shotTimer: 0,
  shotDuration: 0.22,
  lastShotAt: -10,
  cooldown: 0.56,
};

const monsterState = {
  nextSpawnAt: 0,
  minSpawnDelay: 11,
  maxSpawnDelay: 19,
  maxMonsters: 6,
};

const monsterDefinitions = [
  {
    id: 'monster1',
    label: 'Monstro 1',
    health: 24,
    damage: 12,
    radius: 0.58,
    chaseRange: 11,
    attackRange: 1.45,
    attackHitDistance: 1.65,
    chaseStopDistance: 1.25,
    chaseSpeed: 1.65,
    wanderSpeed: 0.72,
    attackDuration: 0.62,
    attackCooldown: 1.2,
    spawnWeight: 1,
    modelFactory: createCaveMonsterModel,
  },
  {
    id: 'goblin_fujao',
    label: 'Goblin Fujao',
    health: 18,
    damage: 4,
    radius: 0.46,
    chaseRange: 8.5,
    attackRange: 0,
    attackHitDistance: 0,
    chaseStopDistance: 0,
    chaseSpeed: 5.1,
    wanderSpeed: 0.88,
    attackDuration: 0,
    attackCooldown: 0,
    spawnWeight: 0.42,
    behavior: 'flee',
    fleeTriggerRange: 7.6,
    fleeEscapeRange: 12.5,
    fleeForgetTime: 1.8,
    spotConeDot: -0.2,
    cargoMin: 10,
    cargoMax: 25,
    uiHeadHeight: 1.82,
    modelFactory: createGoblinFujaoModel,
  },
];

const SAVE_KEY = 'hohlen-save-v1';
const WEAPON_DEV_CONFIG_KEY = 'hohlen-weapon-dev-config-v1';
const UPGRADE_BALANCE_KEY = 'hohlen-upgrade-balance-config-v1';
const GAMEPLAY_BALANCE_KEY = 'hohlen-gameplay-balance-config-v1';
const HITBOX_DEV_CONFIG_KEY = 'hohlen-hitbox-dev-config-v1';
const FILE_STORAGE_ENDPOINT = '/api/storage/';
const FLASHLIGHT_MAX_LEVEL = 10;
const DEV_SECTION_ORDER = ['animations', 'player', 'weapons', 'monsters', 'ores', 'upgrades', 'hitboxes'];
const DEV_GAMEPLAY_SECTIONS = new Set(['player', 'weapons', 'monsters', 'ores']);

let upgradeBalanceDefaults = null;
let upgradeBalanceConfig = null;
let gameplayBalanceDefaults = null;
let gameplayBalanceConfig = null;

const homeHitboxDefaults = {
  chest: {
    label: 'Baú',
    offset: { x: 0, y: 0.39, z: 0 },
    size: { x: 0.9, y: 0.78, z: 0.9 },
  },
  upgradeTable: {
    label: 'Mesa de trabalho',
    offset: { x: 0, y: 0.39, z: 0 },
    size: { x: 1.35, y: 0.78, z: 1.35 },
  },
  homeDoor: {
    label: 'Portal',
    offset: { x: 0, y: 0.98, z: 0 },
    size: { x: 1.45, y: 1.96, z: 0.9 },
  },
};

let homeHitboxConfig = null;

const persistenceState = {
  fileStorageAvailable: null,
};

function storageEndpointForKey(key) {
  return `${FILE_STORAGE_ENDPOINT}${encodeURIComponent(key)}`;
}

function getLocalStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function storageBodyFromString(value) {
  try {
    return JSON.stringify({ data: JSON.parse(value) });
  } catch (error) {
    return JSON.stringify({ data: value });
  }
}

function storageStringFromPayload(payload) {
  if (!payload?.found) return null;
  if ('data' in payload) return JSON.stringify(payload.data);
  if (typeof payload.value === 'string') return payload.value;
  return null;
}

function readPersistentStorage(key) {
  const localValue = getLocalStorageItem(key);

  try {
    const request = new XMLHttpRequest();
    request.open('GET', storageEndpointForKey(key), false);
    request.setRequestHeader('Accept', 'application/json');
    request.send();

    if (request.status >= 200 && request.status < 300) {
      persistenceState.fileStorageAvailable = true;
      const value = storageStringFromPayload(JSON.parse(request.responseText));
      if (value !== null) {
        setLocalStorageItem(key, value);
        return value;
      }
      if (localValue !== null) {
        writePersistentStorage(key, localValue, { sync: true });
      }
    }
  } catch (error) {
    persistenceState.fileStorageAvailable = false;
  }

  return localValue;
}

function writePersistentStorage(key, value, { sync = false, beacon = false } = {}) {
  const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
  const localSaved = setLocalStorageItem(key, serializedValue);
  const body = storageBodyFromString(serializedValue);
  const url = storageEndpointForKey(key);

  if (sync) {
    try {
      const request = new XMLHttpRequest();
      request.open('POST', url, false);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.send(body);
      const fileSaved = request.status >= 200 && request.status < 300;
      persistenceState.fileStorageAvailable = fileSaved;
      return fileSaved || localSaved;
    } catch (error) {
      persistenceState.fileStorageAvailable = false;
      return localSaved;
    }
  }

  if (beacon) {
    try {
      const payload = new Blob([body], { type: 'application/json; charset=utf-8' });
      if (navigator.sendBeacon?.(url, payload)) {
        persistenceState.fileStorageAvailable = true;
        return true;
      }
    } catch (error) {
      persistenceState.fileStorageAvailable = false;
    }
  }

  try {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
      keepalive: true,
    }).then((response) => {
      persistenceState.fileStorageAvailable = response.ok;
    }).catch(() => {
      persistenceState.fileStorageAvailable = false;
    });
  } catch (error) {
    persistenceState.fileStorageAvailable = false;
  }

  return localSaved;
}

const weaponDevDefaults = {
  pickaxe: {
    grip: {
      position: { x: -0.015, y: -0.29, z: 0.055 },
      rotation: { x: -0.18, y: 0.12, z: 0.18 },
      scale: 1,
    },
    model: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: Math.PI / 4, z: -Math.PI / 4 },
      scale: 1,
    },
    upperArmIdle: {
      rotation: { x: -1.05, y: 0.14, z: 0.18 },
    },
    forearmIdle: {
      rotation: { x: 0.08, y: 0, z: 0 },
    },
    attack: {
      speed: 1,
      keyframes: [
        { time: 0, upperArm: { rotation: { x: -1.05, y: 0.14, z: 0.18 } }, forearm: { rotation: { x: 0.08, y: 0, z: 0 } }, grip: { position: { x: -0.015, y: -0.29, z: 0.055 }, rotation: { x: -0.18, y: 0.12, z: 0.18 }, scale: 1 } },
        { time: 0.38, upperArm: { rotation: { x: -2.32, y: 0.14, z: 0.2 } }, forearm: { rotation: { x: 0.46, y: 0, z: 0 } }, grip: { position: { x: -0.015, y: -0.29, z: 0.055 }, rotation: { x: -0.74, y: 0.1, z: 0.22 }, scale: 1 } },
        { time: 0.72, upperArm: { rotation: { x: -0.38, y: 0.02, z: 0.08 } }, forearm: { rotation: { x: -0.08, y: 0, z: 0 } }, grip: { position: { x: -0.015, y: -0.29, z: 0.055 }, rotation: { x: 0.74, y: 0.12, z: 0 }, scale: 1 } },
        { time: 1, upperArm: { rotation: { x: -1.05, y: 0.14, z: 0.18 } }, forearm: { rotation: { x: 0.08, y: 0, z: 0 } }, grip: { position: { x: -0.015, y: -0.29, z: 0.055 }, rotation: { x: -0.18, y: 0.12, z: 0.18 }, scale: 1 } },
      ],
    },
  },
  sword: {
    grip: {
      position: { x: -0.02, y: -0.29, z: 0.045 },
      rotation: { x: 0.08, y: 0.12, z: Math.PI + 0.04 },
      scale: 1,
    },
    model: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    },
    upperArmIdle: {
      rotation: { x: 0.06, y: 0.02, z: 0.12 },
    },
    forearmIdle: {
      rotation: { x: 0.04, y: 0, z: 0 },
    },
    attack: {
      speed: 1,
      keyframes: [
        { time: 0, upperArm: { rotation: { x: -1.22, y: 0.72, z: 0.58 } }, forearm: { rotation: { x: 0.28, y: 0.06, z: 0 } }, grip: { position: { x: -0.02, y: -0.29, z: 0.045 }, rotation: { x: -0.28, y: 0.18, z: Math.PI + 0.86 }, scale: 1 } },
        { time: 0.52, upperArm: { rotation: { x: 0.18, y: -0.64, z: -0.16 } }, forearm: { rotation: { x: 0.62, y: -0.08, z: 0 } }, grip: { position: { x: -0.02, y: -0.29, z: 0.045 }, rotation: { x: 0.36, y: 0.32, z: Math.PI - 0.82 }, scale: 1 } },
        { time: 1, upperArm: { rotation: { x: 0.06, y: 0.02, z: 0.12 } }, forearm: { rotation: { x: 0.04, y: 0, z: 0 } }, grip: { position: { x: -0.02, y: -0.29, z: 0.045 }, rotation: { x: 0.08, y: 0.12, z: Math.PI + 0.04 }, scale: 1 } },
      ],
    },
  },
  crossbow: {
    grip: {
      position: { x: 0.018, y: -0.18, z: 0.06 },
      rotation: { x: 0.08, y: 0.12, z: -1.54 },
      scale: 1,
    },
    model: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
    },
    upperArmIdle: {
      rotation: { x: -1.08, y: -0.12, z: -0.42 },
    },
    forearmIdle: {
      rotation: { x: 0.44, y: 0.02, z: 0.06 },
    },
    attack: {
      speed: 1,
      keyframes: [
        {
          time: 0,
          upperArm: { rotation: { x: -1.08, y: -0.12, z: -0.42 } },
          forearm: { rotation: { x: 0.44, y: 0.02, z: 0.06 } },
          grip: { position: { x: 0.018, y: -0.18, z: 0.06 }, rotation: { x: 0.08, y: 0.12, z: -1.54 }, scale: 1 },
        },
        {
          time: 0.22,
          upperArm: { rotation: { x: -1.24, y: -0.18, z: -0.5 } },
          forearm: { rotation: { x: 0.56, y: 0.04, z: 0.08 } },
          grip: { position: { x: 0.02, y: -0.17, z: 0.02 }, rotation: { x: 0.04, y: 0.14, z: -1.56 }, scale: 1 } ,
        },
        {
          time: 0.5,
          upperArm: { rotation: { x: -1.02, y: -0.06, z: -0.34 } },
          forearm: { rotation: { x: 0.34, y: 0.01, z: 0.03 } },
          grip: { position: { x: 0.018, y: -0.18, z: -0.1 }, rotation: { x: -0.04, y: 0.15, z: -1.5 }, scale: 1 },
        },
        {
          time: 1,
          upperArm: { rotation: { x: -1.08, y: -0.12, z: -0.42 } },
          forearm: { rotation: { x: 0.44, y: 0.02, z: 0.06 } },
          grip: { position: { x: 0.018, y: -0.18, z: 0.06 }, rotation: { x: 0.08, y: 0.12, z: -1.54 }, scale: 1 },
        },
      ],
    },
  },
};

const devControlSchema = [
  {
    title: 'Mao / ponto de encaixe',
    fields: [
      ['Pos X', 'grip.position.x', 'unit'], ['Pos Y', 'grip.position.y', 'unit'], ['Pos Z', 'grip.position.z', 'unit'],
      ['Rot X', 'grip.rotation.x', 'deg'], ['Rot Y', 'grip.rotation.y', 'deg'], ['Rot Z', 'grip.rotation.z', 'deg'],
      ['Escala', 'grip.scale', 'scale'],
    ],
  },
  {
    title: 'Item em relacao a mao',
    fields: [
      ['Pos X', 'model.position.x', 'unit'], ['Pos Y', 'model.position.y', 'unit'], ['Pos Z', 'model.position.z', 'unit'],
      ['Rot X', 'model.rotation.x', 'deg'], ['Rot Y', 'model.rotation.y', 'deg'], ['Rot Z', 'model.rotation.z', 'deg'],
      ['Escala', 'model.scale', 'scale'],
    ],
  },
  {
    title: 'Braco parado / idle',
    fields: [
      ['Braco X', 'upperArmIdle.rotation.x', 'deg'], ['Braco Y', 'upperArmIdle.rotation.y', 'deg'], ['Braco Z', 'upperArmIdle.rotation.z', 'deg'],
      ['Antebraco X', 'forearmIdle.rotation.x', 'deg'], ['Antebraco Y', 'forearmIdle.rotation.y', 'deg'], ['Antebraco Z', 'forearmIdle.rotation.z', 'deg'],
    ],
  },
  {
    title: 'Animacao',
    fields: [
      ['Velocidade', 'attack.speed', 'scale'],
    ],
  },
];

const devModeState = {
  enabled: false,
  section: 'animations',
  workspace: 'weapons',
  selectedMonsterId: monsterDefinitions[0]?.id ?? '',
  selectedItem: 'pickaxe',
  target: 'model',
  transformMode: 'translate',
  simulation: 'pickaxe',
  simulationTime: 0,
  playing: false,
  selectedKeyframe: 0,
  lastSavedAt: 0,
  snapshot: null,
  transformDragging: false,
  ignoreObjectChangeUntil: 0,
};

const buildModeState = {
  enabled: false,
  selectedObjectId: '',
  transformMode: 'translate',
  snapshot: null,
  transformDragging: false,
  dirty: false,
  fullBright: false,
};

const devHitboxState = {
  selectedObjectId: 'chest',
  transformMode: 'translate',
  previewModel: null,
};

const devCameraState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  zoomIn: false,
  zoomOut: false,
  fast: false,
};

const buildCameraInputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  up: false,
  down: false,
  zoomIn: false,
  zoomOut: false,
  fast: false,
};

const devStudioCameraState = {
  target: new THREE.Vector3(0, 0.98, 0),
  yaw: 0,
  pitch: 0,
  distance: 3.2,
  minDistance: 0.08,
  maxDistance: 18,
  dragging: false,
  dragMode: '',
  pointerId: null,
  lastX: 0,
  lastY: 0,
};

const buildCameraState = {
  target: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  distance: 7.2,
  minDistance: 0.28,
  maxDistance: 18,
  dragging: false,
  dragMode: '',
  pointerId: null,
  lastX: 0,
  lastY: 0,
};

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function cloneNumericExtras(source) {
  if (typeof source === 'number') return Number.isFinite(source) ? source : undefined;
  if (!source || typeof source !== 'object') return undefined;

  if (Array.isArray(source)) {
    const result = [];
    source.forEach((entry, index) => {
      const cloned = cloneNumericExtras(entry);
      if (cloned !== undefined) result[index] = cloned;
    });
    return result.length ? result : undefined;
  }

  const result = {};
  for (const key of Object.keys(source)) {
    const cloned = cloneNumericExtras(source[key]);
    if (cloned !== undefined) result[key] = cloned;
  }
  return Object.keys(result).length ? result : undefined;
}

function mergeNumericConfig(template, source) {
  if (typeof template === 'number') {
    const value = Number(source);
    return Number.isFinite(value) ? value : template;
  }
  if (!template || typeof template !== 'object') return template;

  if (Array.isArray(template)) {
    const sourceArray = Array.isArray(source) ? source : [];
    const result = [];
    const length = Math.max(template.length, sourceArray.length);
    for (let i = 0; i < length; i++) {
      const templateItem = template[i] ?? template[template.length - 1];
      result[i] = mergeNumericConfig(templateItem, sourceArray[i]);
    }
    return result;
  }

  const result = {};
  for (const key of Object.keys(template)) {
    result[key] = mergeNumericConfig(template[key], source?.[key]);
  }
  if (source && typeof source === 'object' && !Array.isArray(source)) {
    for (const key of Object.keys(source)) {
      if (key in result) continue;
      const extraValue = cloneNumericExtras(source[key]);
      if (extraValue !== undefined) result[key] = extraValue;
    }
  }
  return result;
}

let weaponDevConfig = clonePlain(weaponDevDefaults);

function loadWeaponDevConfig() {
  try {
    const raw = readPersistentStorage(WEAPON_DEV_CONFIG_KEY);
    if (!raw) return;
    weaponDevConfig = mergeNumericConfig(weaponDevDefaults, JSON.parse(raw));
    normalizeWeaponDevConfig();
  } catch (error) {
    console.warn('Falha ao carregar configuracao de armas:', error);
    weaponDevConfig = clonePlain(weaponDevDefaults);
  }
}

function saveWeaponDevConfig() {
  try {
    normalizeWeaponDevConfig();
    const saved = writePersistentStorage(WEAPON_DEV_CONFIG_KEY, JSON.stringify(weaponDevConfig), { sync: true });
    JSON.parse(getLocalStorageItem(WEAPON_DEV_CONFIG_KEY) ?? '{}');
    devModeState.lastSavedAt = performance.now();
    return saved;
  } catch (error) {
    console.warn('Falha ao salvar configuracao de armas:', error);
    return false;
  }
}

function getPathValue(target, path) {
  return path.split('.').reduce((cursor, key) => cursor?.[key], target);
}

function setPathValue(target, path, value) {
  const parts = path.split('.');
  let cursor = target;
  for (let i = 0; i < parts.length - 1; i++) cursor = cursor[parts[i]];
  cursor[parts.at(-1)] = value;
}

function applyPositionConfig(object, position) {
  object.position.set(position.x, position.y, position.z);
}

function applyRotationConfig(object, rotation) {
  object.rotation.set(rotation.x, rotation.y, rotation.z);
}

function applyTransformConfig(object, transform) {
  applyPositionConfig(object, transform.position);
  applyRotationConfig(object, transform.rotation);
  object.scale.setScalar(Math.max(0.05, transform.scale ?? 1));
}

function formatDevControlValue(value, type) {
  if (type === 'deg') return (THREE.MathUtils.radToDeg(value) || 0).toFixed(1);
  if (type === 'scale') return (value || 1).toFixed(3);
  return (value || 0).toFixed(3);
}

function parseDevControlValue(value, type, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  if (type === 'deg') return THREE.MathUtils.degToRad(numericValue);
  if (type === 'scale') return Math.max(0.05, numericValue);
  return numericValue;
}

function cloneRotationConfig(rotation) {
  return { x: rotation.x, y: rotation.y, z: rotation.z };
}

function clonePositionConfig(position) {
  return { x: position.x, y: position.y, z: position.z };
}

function cloneObjectTransformConfig(object) {
  return {
    position: clonePositionConfig(object.position),
    rotation: cloneRotationConfig(object.rotation),
    scale: object.scale.x,
  };
}

function clonePoseFromObjects(objects) {
  return {
    upperArm: { rotation: cloneRotationConfig(objects.upperArm.rotation) },
    forearm: { rotation: cloneRotationConfig(objects.forearm.rotation) },
    grip: cloneObjectTransformConfig(objects.grip),
    model: cloneObjectTransformConfig(objects.model),
  };
}

function lerpConfig(a, b, alpha) {
  return a + (b - a) * alpha;
}

function lerpVectorConfig(a, b, alpha) {
  return {
    x: lerpConfig(a.x, b.x, alpha),
    y: lerpConfig(a.y, b.y, alpha),
    z: lerpConfig(a.z, b.z, alpha),
  };
}

function lerpTransformConfig(a, b, alpha) {
  return {
    position: lerpVectorConfig(a.position, b.position, alpha),
    rotation: lerpVectorConfig(a.rotation, b.rotation, alpha),
    scale: lerpConfig(a.scale ?? 1, b.scale ?? 1, alpha),
  };
}

function getWeaponAttackDuration(item) {
  const speed = Math.max(0.05, weaponDevConfig[item]?.attack?.speed ?? 1);
  const baseDuration = item === 'pickaxe'
    ? 0.82
    : item === 'crossbow'
      ? 0.72
      : 0.66;
  return baseDuration / speed;
}

function ensureAttackKeyframeConfig(item, keyframe, index = 0) {
  const itemConfig = weaponDevConfig[item] ?? weaponDevDefaults[item];
  const fallbackFrame = weaponDevDefaults[item].attack.keyframes[index] ?? weaponDevDefaults[item].attack.keyframes.at(-1);
  keyframe.time = Number.isFinite(Number(keyframe.time)) ? Number(keyframe.time) : fallbackFrame.time;
  keyframe.upperArm ??= clonePlain(fallbackFrame.upperArm ?? itemConfig.upperArmIdle);
  keyframe.forearm ??= clonePlain(fallbackFrame.forearm ?? itemConfig.forearmIdle);
  keyframe.grip ??= clonePlain(fallbackFrame.grip ?? itemConfig.grip);
  keyframe.model ??= clonePlain(itemConfig.model);
  return keyframe;
}

function sampleWeaponAttackPose(item, progress) {
  const keyframes = weaponDevConfig[item]?.attack?.keyframes ?? weaponDevDefaults[item].attack.keyframes;
  const safeProgress = THREE.MathUtils.clamp(progress, 0, 1);
  let start = keyframes[0];
  let end = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (safeProgress >= keyframes[i].time && safeProgress <= keyframes[i + 1].time) {
      start = keyframes[i];
      end = keyframes[i + 1];
      break;
    }
  }

  const span = Math.max(0.0001, end.time - start.time);
  const alpha = THREE.MathUtils.smoothstep((safeProgress - start.time) / span, 0, 1);
  start = ensureAttackKeyframeConfig(item, start);
  end = ensureAttackKeyframeConfig(item, end, keyframes.indexOf(end));
  return {
    upperArm: { rotation: lerpVectorConfig(start.upperArm.rotation, end.upperArm.rotation, alpha) },
    forearm: { rotation: lerpVectorConfig(start.forearm.rotation, end.forearm.rotation, alpha) },
    grip: lerpTransformConfig(start.grip, end.grip, alpha),
    model: lerpTransformConfig(start.model, end.model, alpha),
  };
}

function setAttackKeyframe(item, keyframeIndex, pose) {
  const keyframes = weaponDevConfig[item].attack.keyframes;
  const fallbackTime = keyframes[keyframeIndex]?.time ?? weaponDevDefaults[item].attack.keyframes[keyframeIndex]?.time ?? 0;
  keyframes[keyframeIndex] = {
    time: fallbackTime,
    upperArm: { rotation: clonePlain(pose.upperArm.rotation) },
    forearm: { rotation: clonePlain(pose.forearm.rotation) },
    grip: clonePlain(pose.grip),
    model: clonePlain(pose.model ?? weaponDevConfig[item].model),
  };
}

function normalizeWeaponDevKeyframes(item) {
  const itemConfig = weaponDevConfig[item];
  const defaultConfig = weaponDevDefaults[item];
  itemConfig.attack ??= clonePlain(defaultConfig.attack);
  if (!Array.isArray(itemConfig.attack.keyframes) || !itemConfig.attack.keyframes.length) {
    itemConfig.attack.keyframes = clonePlain(defaultConfig.attack.keyframes);
  }

  itemConfig.attack.keyframes.forEach((keyframe, index) => ensureAttackKeyframeConfig(item, keyframe, index));
  itemConfig.attack.keyframes.sort((a, b) => a.time - b.time);
  if (itemConfig.attack.keyframes.length === 1) {
    itemConfig.attack.keyframes.push(clonePlain(itemConfig.attack.keyframes[0]));
  }

  itemConfig.attack.keyframes[0].time = 0;
  itemConfig.attack.keyframes[itemConfig.attack.keyframes.length - 1].time = 1;
  for (let i = 1; i < itemConfig.attack.keyframes.length - 1; i++) {
    const minTime = itemConfig.attack.keyframes[i - 1].time + 0.01;
    const maxTime = itemConfig.attack.keyframes[i + 1].time - 0.01;
    itemConfig.attack.keyframes[i].time = THREE.MathUtils.clamp(itemConfig.attack.keyframes[i].time, minTime, maxTime);
  }
}

function normalizeWeaponDevConfig() {
  for (const item of Object.keys(weaponDevDefaults)) {
    weaponDevConfig[item] ??= clonePlain(weaponDevDefaults[item]);
    normalizeWeaponDevKeyframes(item);
  }
}

loadWeaponDevConfig();

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

function getMaxLevelForItemKind(kind) {
  switch (kind) {
    case 'pickaxe': return pickaxeDefinitions.length;
    case 'sword': return swordDefinitions.length;
    case 'crossbow': return crossbowDefinitions.length;
    case 'flashlight': return getUpgradeBalanceMaxLevel('flashlight');
    default: return 1;
  }
}

function clampItemLevel(kind, level = 1) {
  const numericLevel = Math.floor(Number(level));
  if (!Number.isFinite(numericLevel)) return 1;
  return THREE.MathUtils.clamp(numericLevel, 1, getMaxLevelForItemKind(kind));
}

function createInventoryItem(kind, level = 1, explicitId = null) {
  const id = explicitId ?? `item-${nextInventoryItemId++}`;
  return {
    id,
    kind,
    level: clampItemLevel(kind, level),
  };
}

function clampOreStackAmount(amount) {
  const numericAmount = Math.floor(Number(amount));
  if (!Number.isFinite(numericAmount)) return 1;
  return THREE.MathUtils.clamp(numericAmount, 1, ORE_STACK_LIMIT);
}

function createOreStackItem(oreId, amount = 1, explicitId = null) {
  const definition = oreDefinitions.find((ore) => ore.id === oreId);
  if (!definition) return null;
  const id = explicitId ?? `item-${nextInventoryItemId++}`;
  return {
    id,
    kind: 'ore',
    oreId,
    amount: clampOreStackAmount(amount),
  };
}

function serializeInventoryItem(item) {
  if (!item?.kind) return null;
  if (item.kind === 'ore') {
    return {
      id: String(item.id ?? `item-${nextInventoryItemId++}`),
      kind: 'ore',
      oreId: item.oreId,
      amount: clampOreStackAmount(item.amount),
    };
  }
  return {
    id: String(item.id ?? `item-${nextInventoryItemId++}`),
    kind: item.kind,
    level: clampItemLevel(item.kind, item.level),
  };
}

function sanitizeInventoryItem(item) {
  const kind = typeof item?.kind === 'string' ? item.kind : null;
  if (!kind || !itemKindLabels[kind]) return null;
  const id = String(item.id ?? `item-${nextInventoryItemId++}`);
  const numericIdPart = Number(id.match(/(\d+)$/)?.[1]);
  if (Number.isFinite(numericIdPart)) {
    nextInventoryItemId = Math.max(nextInventoryItemId, numericIdPart + 1);
  }
  if (kind === 'ore') {
    const oreId = typeof item.oreId === 'string' ? item.oreId : null;
    if (!oreDefinitions.some((ore) => ore.id === oreId)) return null;
    return {
      id,
      kind: 'ore',
      oreId,
      amount: clampOreStackAmount(item.amount),
    };
  }
  return {
    id,
    kind,
    level: clampItemLevel(kind, item.level),
  };
}

function createDefaultItemInventory(levels = {}, fallbackTotals = {}) {
  const itemSlots = [
    createInventoryItem('pickaxe', levels.pickaxe ?? 1),
    createInventoryItem('sword', levels.sword ?? 1),
    createInventoryItem('crossbow', levels.crossbow ?? 1),
    ...Array.from({ length: INVENTORY_SLOT_COUNT - 3 }, () => null),
  ];
  const totals = sanitizeTotals(fallbackTotals);
  let writeIndex = 3;
  for (const definition of oreDefinitions) {
    let remaining = totals[definition.id];
    while (remaining > 0 && writeIndex < itemSlots.length) {
      const chunk = Math.min(ORE_STACK_LIMIT, remaining);
      itemSlots[writeIndex++] = createOreStackItem(definition.id, chunk);
      remaining -= chunk;
    }
  }
  return {
    itemSlots,
    equipment: {
      head: createInventoryItem('flashlight', levels.flashlight ?? 1),
    },
    workbenchItem: null,
  };
}

function createDefaultChestInventory() {
  return Array.from({ length: CHEST_SLOT_COUNT }, () => null);
}

function getAllInventoryItemsSnapshot(state = inventoryState, workbenchItem = workbenchState.item) {
  return [
    ...state.itemSlots.filter(Boolean),
    ...Object.values(state.equipment).filter(Boolean),
    ...(workbenchItem ? [workbenchItem] : []),
  ];
}

function ensureCoreItemsPresent(inventoryData, fallbackLevels = {}) {
  const requiredKinds = ['pickaxe', 'sword', 'crossbow', 'flashlight'];
  const existingKinds = new Set(getAllInventoryItemsSnapshot({
    itemSlots: inventoryData.itemSlots,
    equipment: inventoryData.equipment,
  }, inventoryData.workbenchItem).map((item) => item.kind));

  for (const kind of requiredKinds) {
    if (existingKinds.has(kind)) continue;
    const item = createInventoryItem(kind, fallbackLevels[kind] ?? 1);
    if (kind === 'flashlight' && !inventoryData.equipment.head) {
      inventoryData.equipment.head = item;
    } else {
      const emptyIndex = inventoryData.itemSlots.findIndex((entry) => !entry);
      if (emptyIndex !== -1) inventoryData.itemSlots[emptyIndex] = item;
    }
  }
}

function normalizeItemInventoryData(rawData, fallbackLevels = {}, fallbackTotals = {}) {
  const defaultInventory = createDefaultItemInventory(fallbackLevels, fallbackTotals);
  const normalized = {
    itemSlots: Array.from({ length: INVENTORY_SLOT_COUNT }, (_, index) => sanitizeInventoryItem(rawData?.itemSlots?.[index]) ?? null),
    equipment: {
      head: sanitizeInventoryItem(rawData?.equipment?.head) ?? null,
    },
    workbenchItem: sanitizeInventoryItem(rawData?.workbenchItem) ?? null,
  };

  if (!rawData) {
    return defaultInventory;
  }

  ensureCoreItemsPresent(normalized, fallbackLevels);
  return normalized;
}

function applyNormalizedItemInventory(normalized) {
  inventoryState.itemSlots = normalized.itemSlots.map((item) => item ? { ...item } : null);
  inventoryState.equipment = {
    head: normalized.equipment.head ? { ...normalized.equipment.head } : null,
  };
  workbenchState.item = normalized.workbenchItem ? { ...normalized.workbenchItem } : null;
}

function normalizeChestInventoryData(rawData, fallbackChestTotals = {}) {
  const normalized = Array.from({ length: CHEST_SLOT_COUNT }, (_, index) => sanitizeInventoryItem(rawData?.[index]) ?? null);
  if (rawData) return normalized;
  const slots = createDefaultChestInventory();
  let writeIndex = 0;
  for (const definition of oreDefinitions) {
    let remaining = sanitizeTotals(fallbackChestTotals)[definition.id];
    while (remaining > 0 && writeIndex < slots.length) {
      const chunk = Math.min(ORE_STACK_LIMIT, remaining);
      slots[writeIndex++] = createOreStackItem(definition.id, chunk);
      remaining -= chunk;
    }
  }
  return slots;
}

function applyNormalizedChestInventory(normalized) {
  chestState.itemSlots = normalized.map((item) => item ? { ...item } : null);
}

function serializeItemInventoryState() {
  return {
    itemSlots: inventoryState.itemSlots.map((item) => serializeInventoryItem(item)),
    equipment: {
      head: serializeInventoryItem(inventoryState.equipment.head),
    },
    workbenchItem: serializeInventoryItem(workbenchState.item),
  };
}

function serializeChestInventoryState() {
  return chestState.itemSlots.map((item) => serializeInventoryItem(item));
}

function findFirstItemByKind(kind) {
  for (const item of inventoryState.itemSlots) {
    if (item?.kind === kind) return item;
  }
  for (const item of Object.values(inventoryState.equipment)) {
    if (item?.kind === kind) return item;
  }
  if (workbenchState.item?.kind === kind) return workbenchState.item;
  return null;
}

function syncItemLevelsToPlayerStats() {
  playerStats.pickaxeDamage = findFirstItemByKind('pickaxe')?.level ?? 1;
  playerStats.swordLevel = findFirstItemByKind('sword')?.level ?? 1;
  playerStats.crossbowLevel = findFirstItemByKind('crossbow')?.level ?? 1;
  playerStats.flashlightLevel = findFirstItemByKind('flashlight')?.level ?? 1;
}

function applyItemLevelsToVisuals() {
  syncItemLevelsToPlayerStats();
  minerCharacter.setPickaxeLevel(playerStats.pickaxeDamage);
  setFirstPersonPickaxeLevel(playerStats.pickaxeDamage);
  minerCharacter.setSwordLevel(playerStats.swordLevel);
  minerCharacter.setCrossbowLevel(playerStats.crossbowLevel);
  minerCharacter.setHeadLampVisible(hasHeadFlashlightEquipped());
  if (!hasHeadFlashlightEquipped()) itemState.flashlightOn = false;
  if (inventoryPreviewCharacter) {
    inventoryPreviewCharacter.setPickaxeLevel(playerStats.pickaxeDamage);
    inventoryPreviewCharacter.setSwordLevel(playerStats.swordLevel);
    inventoryPreviewCharacter.setCrossbowLevel(playerStats.crossbowLevel);
    inventoryPreviewCharacter.setHeadLampVisible(hasHeadFlashlightEquipped());
  }
  setFirstPersonCrossbowLevel(playerStats.crossbowLevel);
}

function recalculateResourceTotals() {
  inventoryState.totals = makeEmptyTotals();
  chestState.totals = makeEmptyTotals();
  for (const item of inventoryState.itemSlots) {
    if (item?.kind === 'ore' && item.oreId) {
      inventoryState.totals[item.oreId] += item.amount;
    }
  }
  for (const item of chestState.itemSlots) {
    if (item?.kind === 'ore' && item.oreId) {
      chestState.totals[item.oreId] += item.amount;
    }
  }
}

function hasHeadFlashlightEquipped() {
  return inventoryState.equipment.head?.kind === 'flashlight';
}

function getHotbarItem(index = itemState.equippedSlot) {
  if (!Number.isInteger(index) || index < 0 || index >= HOTBAR_SLOT_COUNT) return null;
  return inventoryState.itemSlots[index] ?? null;
}

function getEquippedHotbarItem() {
  return getHotbarItem(itemState.equippedSlot);
}

function getEquippedItemKind() {
  return getEquippedHotbarItem()?.kind ?? null;
}

function isItemKindEquipped(kind) {
  return getEquippedItemKind() === kind;
}

function findHotbarSlotByKind(kind) {
  for (let index = 0; index < HOTBAR_SLOT_COUNT; index++) {
    if (inventoryState.itemSlots[index]?.kind === kind) return index;
  }
  return -1;
}

function clampEquippedSlot(slotIndex) {
  const numericSlot = Math.floor(Number(slotIndex));
  if (!Number.isFinite(numericSlot)) return -1;
  return numericSlot >= 0 && numericSlot < HOTBAR_SLOT_COUNT ? numericSlot : -1;
}

function getLocationKey(location) {
  if (!location) return '';
  if (location.type === 'inventory') return `inventory:${location.index}`;
  if (location.type === 'chest') return `chest:${location.index}`;
  if (location.type === 'equipment') return `equipment:${location.slot}`;
  if (location.type === 'workbench') return 'workbench';
  return '';
}

function parseSlotLocationFromElement(element) {
  const slotElement = element?.closest?.('[data-location-type]');
  if (!slotElement) return null;
  const type = slotElement.dataset.locationType;
  if (type === 'inventory') {
    return {
      type: 'inventory',
      index: Math.max(0, Math.min(INVENTORY_SLOT_COUNT - 1, Math.floor(Number(slotElement.dataset.slotIndex)) || 0)),
    };
  }
  if (type === 'chest') {
    return {
      type: 'chest',
      index: Math.max(0, Math.min(CHEST_SLOT_COUNT - 1, Math.floor(Number(slotElement.dataset.slotIndex)) || 0)),
    };
  }
  if (type === 'equipment') {
    return {
      type: 'equipment',
      slot: slotElement.dataset.equipmentSlot,
    };
  }
  if (type === 'workbench') {
    return { type: 'workbench' };
  }
  return null;
}

function getItemAtLocation(location) {
  if (!location) return null;
  if (location.type === 'inventory') return inventoryState.itemSlots[location.index] ?? null;
  if (location.type === 'chest') return chestState.itemSlots[location.index] ?? null;
  if (location.type === 'equipment') return inventoryState.equipment[location.slot] ?? null;
  if (location.type === 'workbench') return workbenchState.item ?? null;
  return null;
}

function setItemAtLocation(location, item) {
  if (!location) return;
  if (location.type === 'inventory') {
    inventoryState.itemSlots[location.index] = item;
    return;
  }
  if (location.type === 'chest') {
    chestState.itemSlots[location.index] = item;
    return;
  }
  if (location.type === 'equipment') {
    inventoryState.equipment[location.slot] = item;
    return;
  }
  if (location.type === 'workbench') {
    workbenchState.item = item;
  }
}

function canPlaceItemAtLocation(item, location) {
  if (!location) return false;
  if (!item) return true;
  if (location.type === 'inventory') return location.index >= 0 && location.index < INVENTORY_SLOT_COUNT;
  if (location.type === 'chest') return location.index >= 0 && location.index < CHEST_SLOT_COUNT;
  if (location.type === 'equipment') {
    const slotDefinition = equipmentSlotDefinitions[location.slot];
    return !!slotDefinition && slotDefinition.accepts.includes(item.kind);
  }
  if (location.type === 'workbench') {
    return ['pickaxe', 'sword', 'crossbow', 'flashlight'].includes(item.kind);
  }
  return false;
}

function canStackItemsTogether(targetItem, sourceItem) {
  return Boolean(
    targetItem
    && sourceItem
    && targetItem.kind === 'ore'
    && sourceItem.kind === 'ore'
    && targetItem.oreId === sourceItem.oreId
    && targetItem.amount < ORE_STACK_LIMIT
  );
}

function mergeOreStacksIntoLocation(source, target) {
  const sourceItem = getItemAtLocation(source);
  const targetItem = getItemAtLocation(target);
  if (!canStackItemsTogether(targetItem, sourceItem)) return false;
  const transferAmount = Math.min(ORE_STACK_LIMIT - targetItem.amount, sourceItem.amount);
  if (transferAmount <= 0) return false;
  targetItem.amount += transferAmount;
  sourceItem.amount -= transferAmount;
  if (sourceItem.amount <= 0) {
    setItemAtLocation(source, null);
  }
  return true;
}

function swapItemsBetweenLocations(source, target) {
  const sourceItem = getItemAtLocation(source);
  const targetItem = getItemAtLocation(target);
  if (mergeOreStacksIntoLocation(source, target)) {
    recalculateResourceTotals();
    applyItemLevelsToVisuals();
    if (itemState.equippedSlot >= HOTBAR_SLOT_COUNT || itemState.equippedSlot < 0 || !getHotbarItem(itemState.equippedSlot)) {
      itemState.equippedSlot = -1;
    }
    return true;
  }
  if (!canPlaceItemAtLocation(sourceItem, target) || !canPlaceItemAtLocation(targetItem, source)) return false;
  setItemAtLocation(source, targetItem ? { ...targetItem } : null);
  setItemAtLocation(target, sourceItem ? { ...sourceItem } : null);
  recalculateResourceTotals();
  applyItemLevelsToVisuals();
  if (itemState.equippedSlot >= HOTBAR_SLOT_COUNT || itemState.equippedSlot < 0 || !getHotbarItem(itemState.equippedSlot)) {
    itemState.equippedSlot = -1;
  }
  return true;
}

applyNormalizedItemInventory(createDefaultItemInventory());
applyNormalizedChestInventory(createDefaultChestInventory());
recalculateResourceTotals();

function getSwordDefinition(level = playerStats.swordLevel) {
  const numericLevel = Math.floor(Number(level));
  const safeLevel = Number.isFinite(numericLevel) ? THREE.MathUtils.clamp(numericLevel, 1, swordDefinitions.length) : 1;
  const index = safeLevel - 1;
  return swordDefinitions[index];
}

function getSwordUpgradeDefinition() {
  if (playerStats.swordLevel >= swordDefinitions.length) return null;
  return getSwordDefinition(playerStats.swordLevel + 1);
}

function getCrossbowDefinition(level = playerStats.crossbowLevel) {
  const fallbackLevel = playerStats.crossbowLevel ?? 1;
  const numericLevel = Math.floor(Number(level));
  const safeLevel = Number.isFinite(numericLevel) ? THREE.MathUtils.clamp(numericLevel, 1, crossbowDefinitions.length) : fallbackLevel;
  return crossbowDefinitions[safeLevel - 1];
}

function getCrossbowUpgradeDefinition() {
  if (playerStats.crossbowLevel >= crossbowDefinitions.length) return null;
  return getCrossbowDefinition(playerStats.crossbowLevel + 1);
}

function getResourceTotal(oreId) {
  return (inventoryState.totals[oreId] ?? 0) + (chestState.totals[oreId] ?? 0);
}

function addOreToSlotCollection(slotCollection, oreId, amount) {
  let remaining = Math.max(0, Math.floor(Number(amount)) || 0);
  if (remaining <= 0) return 0;

  for (let index = 0; index < slotCollection.length && remaining > 0; index++) {
    const item = slotCollection[index];
    if (item?.kind !== 'ore' || item.oreId !== oreId || item.amount >= ORE_STACK_LIMIT) continue;
    const moved = Math.min(ORE_STACK_LIMIT - item.amount, remaining);
    item.amount += moved;
    remaining -= moved;
  }

  for (let index = 0; index < slotCollection.length && remaining > 0; index++) {
    if (slotCollection[index]) continue;
    const moved = Math.min(ORE_STACK_LIMIT, remaining);
    slotCollection[index] = createOreStackItem(oreId, moved);
    remaining -= moved;
  }

  const added = Math.max(0, amount - remaining);
  if (added > 0) recalculateResourceTotals();
  return added;
}

function addOreToInventoryItems(oreId, amount) {
  return addOreToSlotCollection(inventoryState.itemSlots, oreId, amount);
}

function addOreToChestItems(oreId, amount) {
  return addOreToSlotCollection(chestState.itemSlots, oreId, amount);
}

function spendOreFromSlotCollection(slotCollection, oreId, amount) {
  let remaining = Math.max(0, Math.floor(Number(amount)) || 0);
  if (remaining <= 0) return true;
  for (let index = 0; index < slotCollection.length && remaining > 0; index++) {
    const item = slotCollection[index];
    if (item?.kind !== 'ore' || item.oreId !== oreId) continue;
    const spent = Math.min(item.amount, remaining);
    item.amount -= spent;
    remaining -= spent;
    if (item.amount <= 0) {
      slotCollection[index] = null;
    }
  }
  recalculateResourceTotals();
  return remaining <= 0;
}

function canSpendCost(cost = {}) {
  return Object.entries(cost ?? {}).every(([oreId, amount]) => getResourceTotal(oreId) >= amount);
}

function formatCost(cost = {}) {
  const entries = Object.entries(cost ?? {}).filter(([, amount]) => amount > 0);
  if (!entries.length) return 'gratis';
  return entries
    .map(([oreId, amount]) => {
      const definition = oreDefinitions.find((ore) => ore.id === oreId);
      return `${amount} ${definition?.short ?? oreId}`;
    })
    .join(' | ');
}

function sanitizeUpgradeCost(cost = {}) {
  const result = {};
  for (const ore of oreDefinitions) {
    const amount = Math.max(0, Math.floor(Number(cost?.[ore.id] ?? 0)));
    if (amount > 0) result[ore.id] = amount;
  }
  return result;
}

function createDefaultUpgradeBalanceConfig() {
  const levelsFromDefinitions = (definitions) => {
    const levels = {};
    for (const definition of definitions) {
      if (definition.level <= 1) continue;
      levels[String(definition.level)] = sanitizeUpgradeCost(definition.cost);
    }
    return levels;
  };

  const flashlightLevels = {};
  for (let level = 2; level <= FLASHLIGHT_MAX_LEVEL; level++) {
    flashlightLevels[String(level)] = { cobre: 5 };
  }

  return {
    pickaxe: {
      label: 'Picareta',
      maxLevel: pickaxeDefinitions.length,
      levels: levelsFromDefinitions(pickaxeDefinitions),
    },
    sword: {
      label: 'Espada',
      maxLevel: swordDefinitions.length,
      levels: levelsFromDefinitions(swordDefinitions),
    },
    crossbow: {
      label: 'Crossbow',
      maxLevel: crossbowDefinitions.length,
      levels: levelsFromDefinitions(crossbowDefinitions),
    },
    flashlight: {
      label: 'Lanterna',
      maxLevel: FLASHLIGHT_MAX_LEVEL,
      levels: flashlightLevels,
    },
  };
}

function normalizeUpgradeBalanceConfig(source = {}) {
  const defaults = upgradeBalanceDefaults ?? createDefaultUpgradeBalanceConfig();
  const result = {};

  for (const [itemId, defaultItem] of Object.entries(defaults)) {
    const sourceItem = source?.[itemId] ?? {};
    const maxLevel = defaultItem.maxLevel;
    result[itemId] = {
      label: defaultItem.label,
      maxLevel,
      levels: {},
    };

    for (let level = 2; level <= maxLevel; level++) {
      const key = String(level);
      result[itemId].levels[key] = sanitizeUpgradeCost(sourceItem.levels?.[key] ?? defaultItem.levels[key] ?? {});
    }
  }

  return result;
}

function getUpgradeBalanceItem(itemId) {
  return upgradeBalanceConfig?.[itemId] ?? upgradeBalanceDefaults?.[itemId];
}

function getUpgradeBalanceCost(itemId, targetLevel) {
  return sanitizeUpgradeCost(getUpgradeBalanceItem(itemId)?.levels?.[String(targetLevel)] ?? {});
}

function getUpgradeBalanceMaxLevel(itemId) {
  return Math.max(1, Math.floor(Number(getUpgradeBalanceItem(itemId)?.maxLevel ?? 1)) || 1);
}

function applyUpgradeBalanceConfig() {
  if (!upgradeBalanceConfig) return;
  for (const definition of pickaxeDefinitions) {
    if (definition.level > 1) Object.assign(definition, { cost: getUpgradeBalanceCost('pickaxe', definition.level) });
  }
  for (const definition of swordDefinitions) {
    if (definition.level > 1) Object.assign(definition, { cost: getUpgradeBalanceCost('sword', definition.level) });
  }
  for (const definition of crossbowDefinitions) {
    if (definition.level > 1) Object.assign(definition, { cost: getUpgradeBalanceCost('crossbow', definition.level) });
  }
}

function loadUpgradeBalanceConfig() {
  try {
    upgradeBalanceDefaults = createDefaultUpgradeBalanceConfig();
    const raw = readPersistentStorage(UPGRADE_BALANCE_KEY);
    upgradeBalanceConfig = normalizeUpgradeBalanceConfig(raw ? JSON.parse(raw) : upgradeBalanceDefaults);
    applyUpgradeBalanceConfig();
  } catch (error) {
    console.warn('Falha ao carregar balanceamento de melhorias:', error);
    upgradeBalanceDefaults = createDefaultUpgradeBalanceConfig();
    upgradeBalanceConfig = clonePlain(upgradeBalanceDefaults);
    applyUpgradeBalanceConfig();
  }
}

function saveUpgradeBalanceConfig() {
  try {
    upgradeBalanceConfig = normalizeUpgradeBalanceConfig(upgradeBalanceConfig);
    applyUpgradeBalanceConfig();
    const saved = writePersistentStorage(UPGRADE_BALANCE_KEY, JSON.stringify(upgradeBalanceConfig), { sync: true });
    JSON.parse(getLocalStorageItem(UPGRADE_BALANCE_KEY) ?? '{}');
    return saved;
  } catch (error) {
    console.warn('Falha ao salvar balanceamento de melhorias:', error);
    return false;
  }
}

function getFlashlightUpgradeLevel() {
  const maxLevel = getUpgradeBalanceMaxLevel('flashlight');
  const currentLevel = Math.max(1, Math.floor(Number(playerStats.flashlightLevel)) || 1);
  return currentLevel >= maxLevel ? null : currentLevel + 1;
}

function getFlashlightUpgradeCost() {
  const nextLevel = getFlashlightUpgradeLevel();
  return nextLevel ? getUpgradeBalanceCost('flashlight', nextLevel) : null;
}

function getFlashlightStats(level = playerStats.flashlightLevel) {
  const safeLevel = THREE.MathUtils.clamp(Math.floor(Number(level)) || 1, 1, FLASHLIGHT_MAX_LEVEL);
  const levelOffset = safeLevel - 1;
  return {
    level: safeLevel,
    distance: 42 + levelOffset * 8,
    angle: Math.min(Math.PI / 4.8, Math.PI / 11 + levelOffset * 0.04),
    beamIntensity: 23 + levelOffset * 3.2,
    lampIntensity: 0.42 + levelOffset * 0.05,
    lampDistance: 8 + levelOffset * 1.15,
    penumbra: Math.min(0.58, 0.34 + levelOffset * 0.022),
  };
}

loadUpgradeBalanceConfig();

function sanitizePositiveInteger(value, fallback, min = 1, max = 9999) {
  const numericValue = Math.floor(Number(value));
  if (!Number.isFinite(numericValue)) return fallback;
  return THREE.MathUtils.clamp(numericValue, min, max);
}

function sanitizeNumberValue(value, fallback, min = -9999, max = 9999, precision = 2) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  const factor = 10 ** precision;
  return Math.round(THREE.MathUtils.clamp(numericValue, min, max) * factor) / factor;
}

function formatDevNumber(value, precision = 2) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return '0';
  const factor = 10 ** precision;
  const rounded = Math.round(numericValue * factor) / factor;
  if (Math.abs(rounded - Math.round(rounded)) < 0.000001) return String(Math.round(rounded));
  return rounded.toFixed(precision).replace(/\.?0+$/, '');
}

function createDefaultMonsterBalanceEntry(definition) {
  const entry = {
    label: definition.label,
    health: sanitizePositiveInteger(definition.health, 1, 1, 9999),
    damage: sanitizePositiveInteger(definition.damage, 1, 1, 9999),
  };

  if (definition.behavior === 'flee') {
    entry.speed = sanitizeNumberValue(definition.chaseSpeed, 1, 0.1, 99, 2);
    entry.wanderSpeed = sanitizeNumberValue(definition.wanderSpeed, 0.5, 0, 99, 2);
    entry.fleeTriggerRange = sanitizeNumberValue(definition.fleeTriggerRange ?? definition.chaseRange, 6, 0.5, 99, 2);
    entry.fleeEscapeRange = sanitizeNumberValue(definition.fleeEscapeRange ?? 12, 12, 1, 120, 2);
    entry.fleeForgetTime = sanitizeNumberValue(definition.fleeForgetTime ?? 2, 2, 0.1, 60, 2);
    entry.spotConeDot = sanitizeNumberValue(definition.spotConeDot ?? -0.2, -0.2, -1, 1, 2);
    entry.spawnWeight = sanitizeNumberValue(definition.spawnWeight ?? 1, 1, 0, 100, 2);
    entry.cargoMin = sanitizePositiveInteger(definition.cargoMin ?? 10, 10, 1, 999);
    entry.cargoMax = sanitizePositiveInteger(definition.cargoMax ?? 25, 25, entry.cargoMin, 999);
    entry.cargoWeights = Object.fromEntries(
      oreDefinitions.map((ore) => [ore.id, sanitizeNumberValue(definition.cargoWeights?.[ore.id] ?? ore.rarity, ore.rarity, 0, 100, 2)])
    );
  }

  return entry;
}

function createDefaultGameplayBalanceConfig() {
  const pickaxeLevels = {};
  const swordLevels = {};
  const crossbowLevels = {};
  const oreHealth = {};
  const monsters = {};

  for (const definition of pickaxeDefinitions) {
    pickaxeLevels[String(definition.level)] = sanitizePositiveInteger(definition.damage, 1, 1, 999);
  }
  for (const definition of swordDefinitions) {
    swordLevels[String(definition.level)] = sanitizePositiveInteger(definition.damage, 1, 1, 9999);
  }
  for (const definition of crossbowDefinitions) {
    crossbowLevels[String(definition.level)] = sanitizePositiveInteger(definition.damage, 1, 1, 9999);
  }
  for (const definition of oreDefinitions) {
    oreHealth[definition.id] = {
      label: definition.label,
      health: sanitizePositiveInteger(definition.hits, 1, 1, 999),
    };
  }
  for (const definition of monsterDefinitions) {
    monsters[definition.id] = createDefaultMonsterBalanceEntry(definition);
  }

  return {
    player: {
      maxHealth: sanitizePositiveInteger(playerStats.maxHealth, 100, 1, 9999),
    },
    pickaxe: pickaxeLevels,
    sword: swordLevels,
    crossbow: crossbowLevels,
    ores: oreHealth,
    monsters,
  };
}

function normalizeGameplayBalanceConfig(source = {}) {
  const defaults = gameplayBalanceDefaults ?? createDefaultGameplayBalanceConfig();
  const normalized = {
    player: {
      maxHealth: sanitizePositiveInteger(source?.player?.maxHealth, defaults.player.maxHealth, 1, 9999),
    },
    pickaxe: {},
    sword: {},
    crossbow: {},
    ores: {},
    monsters: {},
  };

  for (const definition of pickaxeDefinitions) {
    const key = String(definition.level);
    normalized.pickaxe[key] = sanitizePositiveInteger(source?.pickaxe?.[key], defaults.pickaxe[key], 1, 999);
  }
  for (const definition of swordDefinitions) {
    const key = String(definition.level);
    normalized.sword[key] = sanitizePositiveInteger(source?.sword?.[key], defaults.sword[key], 1, 9999);
  }
  for (const definition of crossbowDefinitions) {
    const key = String(definition.level);
    normalized.crossbow[key] = sanitizePositiveInteger(source?.crossbow?.[key], defaults.crossbow[key], 1, 9999);
  }
  for (const definition of oreDefinitions) {
    const sourceOre = source?.ores?.[definition.id];
    normalized.ores[definition.id] = {
      label: defaults.ores[definition.id]?.label ?? definition.label,
      health: sanitizePositiveInteger(
        sourceOre?.health ?? sourceOre,
        defaults.ores[definition.id]?.health ?? definition.hits,
        1,
        999
      ),
    };
  }
  for (const definition of monsterDefinitions) {
    const sourceMonster = source?.monsters?.[definition.id];
    const normalizedMonster = {
      label: defaults.monsters[definition.id]?.label ?? definition.label,
      health: sanitizePositiveInteger(
        sourceMonster?.health,
        defaults.monsters[definition.id]?.health ?? definition.health,
        1,
        9999
      ),
      damage: sanitizePositiveInteger(
        sourceMonster?.damage,
        defaults.monsters[definition.id]?.damage ?? definition.damage,
        1,
        9999
      ),
    };
    if (definition.behavior === 'flee') {
      const defaultMonster = defaults.monsters[definition.id] ?? createDefaultMonsterBalanceEntry(definition);
      normalizedMonster.speed = sanitizeNumberValue(
        sourceMonster?.speed,
        defaultMonster.speed ?? definition.chaseSpeed,
        0.1,
        99,
        2
      );
      normalizedMonster.wanderSpeed = sanitizeNumberValue(
        sourceMonster?.wanderSpeed,
        defaultMonster.wanderSpeed ?? definition.wanderSpeed,
        0,
        99,
        2
      );
      normalizedMonster.fleeTriggerRange = sanitizeNumberValue(
        sourceMonster?.fleeTriggerRange,
        defaultMonster.fleeTriggerRange ?? definition.fleeTriggerRange ?? definition.chaseRange,
        0.5,
        99,
        2
      );
      normalizedMonster.fleeEscapeRange = sanitizeNumberValue(
        sourceMonster?.fleeEscapeRange,
        defaultMonster.fleeEscapeRange ?? definition.fleeEscapeRange ?? 12,
        1,
        120,
        2
      );
      normalizedMonster.fleeForgetTime = sanitizeNumberValue(
        sourceMonster?.fleeForgetTime,
        defaultMonster.fleeForgetTime ?? definition.fleeForgetTime ?? 2,
        0.1,
        60,
        2
      );
      normalizedMonster.spotConeDot = sanitizeNumberValue(
        sourceMonster?.spotConeDot,
        defaultMonster.spotConeDot ?? definition.spotConeDot ?? -0.2,
        -1,
        1,
        2
      );
      normalizedMonster.spawnWeight = sanitizeNumberValue(
        sourceMonster?.spawnWeight,
        defaultMonster.spawnWeight ?? definition.spawnWeight ?? 1,
        0,
        100,
        2
      );
      normalizedMonster.cargoMin = sanitizePositiveInteger(
        sourceMonster?.cargoMin,
        defaultMonster.cargoMin ?? definition.cargoMin ?? 10,
        1,
        999
      );
      normalizedMonster.cargoMax = sanitizePositiveInteger(
        sourceMonster?.cargoMax,
        defaultMonster.cargoMax ?? definition.cargoMax ?? 25,
        normalizedMonster.cargoMin,
        999
      );
      normalizedMonster.cargoWeights = {};
      for (const ore of oreDefinitions) {
        normalizedMonster.cargoWeights[ore.id] = sanitizeNumberValue(
          sourceMonster?.cargoWeights?.[ore.id],
          defaultMonster.cargoWeights?.[ore.id] ?? ore.rarity,
          0,
          100,
          2
        );
      }
    }
    normalized.monsters[definition.id] = normalizedMonster;
  }

  return normalized;
}

function applyGameplayBalanceConfig() {
  if (!gameplayBalanceConfig) return;

  playerStats.maxHealth = sanitizePositiveInteger(gameplayBalanceConfig.player.maxHealth, playerStats.maxHealth, 1, 9999);
  playerStats.health = THREE.MathUtils.clamp(
    sanitizePositiveInteger(playerStats.health, playerStats.maxHealth, 1, playerStats.maxHealth),
    1,
    playerStats.maxHealth
  );

  for (const definition of pickaxeDefinitions) {
    definition.damage = sanitizePositiveInteger(
      gameplayBalanceConfig.pickaxe[String(definition.level)],
      definition.damage,
      1,
      999
    );
  }
  for (const definition of swordDefinitions) {
    definition.damage = sanitizePositiveInteger(
      gameplayBalanceConfig.sword[String(definition.level)],
      definition.damage,
      1,
      9999
    );
  }
  for (const definition of crossbowDefinitions) {
    definition.damage = sanitizePositiveInteger(
      gameplayBalanceConfig.crossbow[String(definition.level)],
      definition.damage,
      1,
      9999
    );
  }
  for (const definition of oreDefinitions) {
    definition.hits = sanitizePositiveInteger(
      gameplayBalanceConfig.ores[definition.id]?.health,
      definition.hits,
      1,
      999
    );
  }
  for (const definition of monsterDefinitions) {
    definition.health = sanitizePositiveInteger(
      gameplayBalanceConfig.monsters[definition.id]?.health,
      definition.health,
      1,
      9999
    );
    definition.damage = sanitizePositiveInteger(
      gameplayBalanceConfig.monsters[definition.id]?.damage,
      definition.damage,
      1,
      9999
    );
    if (definition.behavior === 'flee') {
      definition.chaseSpeed = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.speed,
        definition.chaseSpeed,
        0.1,
        99,
        2
      );
      definition.wanderSpeed = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.wanderSpeed,
        definition.wanderSpeed,
        0,
        99,
        2
      );
      definition.fleeTriggerRange = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.fleeTriggerRange,
        definition.fleeTriggerRange ?? definition.chaseRange,
        0.5,
        99,
        2
      );
      definition.fleeEscapeRange = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.fleeEscapeRange,
        definition.fleeEscapeRange ?? 12,
        1,
        120,
        2
      );
      definition.fleeForgetTime = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.fleeForgetTime,
        definition.fleeForgetTime ?? 2,
        0.1,
        60,
        2
      );
      definition.spotConeDot = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.spotConeDot,
        definition.spotConeDot ?? -0.2,
        -1,
        1,
        2
      );
      definition.spawnWeight = sanitizeNumberValue(
        gameplayBalanceConfig.monsters[definition.id]?.spawnWeight,
        definition.spawnWeight ?? 1,
        0,
        100,
        2
      );
      definition.cargoMin = sanitizePositiveInteger(
        gameplayBalanceConfig.monsters[definition.id]?.cargoMin,
        definition.cargoMin ?? 10,
        1,
        999
      );
      definition.cargoMax = sanitizePositiveInteger(
        gameplayBalanceConfig.monsters[definition.id]?.cargoMax,
        definition.cargoMax ?? 25,
        definition.cargoMin,
        999
      );
      definition.cargoWeights = Object.fromEntries(
        oreDefinitions.map((ore) => [
          ore.id,
          sanitizeNumberValue(
            gameplayBalanceConfig.monsters[definition.id]?.cargoWeights?.[ore.id],
            definition.cargoWeights?.[ore.id] ?? ore.rarity,
            0,
            100,
            2
          ),
        ])
      );
    }
  }

  if (Array.isArray(world?.oreNodes)) {
    for (const node of world.oreNodes) {
      if (!node?.definition) continue;
      const nextMaxHp = sanitizePositiveInteger(node.definition.hits, node.maxHp, 1, 999);
      const ratio = node.maxHp > 0 ? THREE.MathUtils.clamp(node.hp / node.maxHp, 0, 1) : 1;
      node.maxHp = nextMaxHp;
      node.hp = THREE.MathUtils.clamp(Math.round(nextMaxHp * ratio) || nextMaxHp, 1, nextMaxHp);
    }
  }

  if (Array.isArray(world?.monsters)) {
    for (const monster of world.monsters) {
      if (!monster?.definition) continue;
      const nextMaxHp = sanitizePositiveInteger(monster.definition.health, monster.maxHp, 1, 9999);
      const ratio = monster.maxHp > 0 ? THREE.MathUtils.clamp(monster.hp / monster.maxHp, 0, 1) : 1;
      monster.maxHp = nextMaxHp;
      monster.hp = THREE.MathUtils.clamp(Math.round(nextMaxHp * ratio) || nextMaxHp, 1, nextMaxHp);
    }
  }
}

function loadGameplayBalanceConfig() {
  try {
    gameplayBalanceDefaults = createDefaultGameplayBalanceConfig();
    const raw = readPersistentStorage(GAMEPLAY_BALANCE_KEY);
    gameplayBalanceConfig = normalizeGameplayBalanceConfig(raw ? JSON.parse(raw) : gameplayBalanceDefaults);
    applyGameplayBalanceConfig();
  } catch (error) {
    console.warn('Falha ao carregar balanceamento geral:', error);
    gameplayBalanceDefaults = createDefaultGameplayBalanceConfig();
    gameplayBalanceConfig = clonePlain(gameplayBalanceDefaults);
    applyGameplayBalanceConfig();
  }
}

function saveGameplayBalanceConfig() {
  try {
    gameplayBalanceConfig = normalizeGameplayBalanceConfig(gameplayBalanceConfig);
    applyGameplayBalanceConfig();
    return writePersistentStorage(GAMEPLAY_BALANCE_KEY, JSON.stringify(gameplayBalanceConfig), { sync: true });
  } catch (error) {
    console.warn('Falha ao salvar balanceamento geral:', error);
    return false;
  }
}

function createDefaultHomeHitboxConfig() {
  return clonePlain(homeHitboxDefaults);
}

function normalizeHomeHitboxConfig(source = {}) {
  const defaults = createDefaultHomeHitboxConfig();
  const normalized = {};
  for (const [objectId, defaultConfig] of Object.entries(defaults)) {
    const current = source?.[objectId] ?? {};
    normalized[objectId] = {
      label: defaultConfig.label,
      offset: {
        x: Number.isFinite(Number(current.offset?.x)) ? Number(current.offset.x) : defaultConfig.offset.x,
        y: Number.isFinite(Number(current.offset?.y)) ? Number(current.offset.y) : defaultConfig.offset.y,
        z: Number.isFinite(Number(current.offset?.z)) ? Number(current.offset.z) : defaultConfig.offset.z,
      },
      size: {
        x: THREE.MathUtils.clamp(Number(current.size?.x) || defaultConfig.size.x, 0.05, 8),
        y: THREE.MathUtils.clamp(Number(current.size?.y) || defaultConfig.size.y, 0.05, 8),
        z: THREE.MathUtils.clamp(Number(current.size?.z) || defaultConfig.size.z, 0.05, 8),
      },
    };
  }
  return normalized;
}

function getHomeHitboxConfig(objectId) {
  return homeHitboxConfig?.[objectId] ?? homeHitboxDefaults[objectId] ?? null;
}

function loadHomeHitboxConfig() {
  try {
    const raw = readPersistentStorage(HITBOX_DEV_CONFIG_KEY);
    homeHitboxConfig = normalizeHomeHitboxConfig(raw ? JSON.parse(raw) : createDefaultHomeHitboxConfig());
  } catch (error) {
    console.warn('Falha ao carregar hitboxes:', error);
    homeHitboxConfig = createDefaultHomeHitboxConfig();
  }
}

function saveHomeHitboxConfig() {
  try {
    homeHitboxConfig = normalizeHomeHitboxConfig(homeHitboxConfig);
    return writePersistentStorage(HITBOX_DEV_CONFIG_KEY, JSON.stringify(homeHitboxConfig), { sync: true });
  } catch (error) {
    console.warn('Falha ao salvar hitboxes:', error);
    return false;
  }
}

function getPickaxeDefinition(level = playerStats.pickaxeDamage) {
  const numericLevel = Math.floor(Number(level));
  const safeLevel = Number.isFinite(numericLevel) ? THREE.MathUtils.clamp(numericLevel, 1, pickaxeDefinitions.length) : 1;
  return pickaxeDefinitions[safeLevel - 1];
}

function getPickaxeUpgradeDefinition() {
  const currentLevel = getPickaxeDefinition().level;
  if (currentLevel >= pickaxeDefinitions.length) return null;
  return getPickaxeDefinition(currentLevel + 1);
}

function getSaveData() {
  recalculateResourceTotals();
  return {
    inventoryTotals: { ...inventoryState.totals },
    chestTotals: { ...chestState.totals },
    itemInventory: serializeItemInventoryState(),
    chestInventory: serializeChestInventoryState(),
    playerStats: {
      pickaxeDamage: getPickaxeDefinition().level,
      flashlightLevel: Math.max(1, Math.floor(playerStats.flashlightLevel)),
      swordLevel: getSwordDefinition().level,
      crossbowLevel: getCrossbowDefinition().level,
      health: Number.isFinite(playerStats.health) ? THREE.MathUtils.clamp(Math.floor(playerStats.health), 1, playerStats.maxHealth) : playerStats.maxHealth,
    },
    itemState: {
      flashlightOn: !!itemState.flashlightOn,
      equippedSlot: getHotbarItem(itemState.equippedSlot) ? clampEquippedSlot(itemState.equippedSlot) : -1,
    },
    areaState: {
      currentArea: areaState.currentArea === 'cave' ? 'cave' : 'home',
      caveSeed: Number.isFinite(areaState.caveSeed) ? areaState.caveSeed : null,
    },
    homeBuildLayout: clonePlain(homeBuildLayoutState.placements),
  };
}

function saveGame({ sync = false } = {}) {
  try {
    writePersistentStorage(SAVE_KEY, JSON.stringify(getSaveData()), { sync });
  } catch (error) {
    console.warn('Falha ao salvar o jogo:', error);
  }
}

function loadGame() {
  try {
    const raw = readPersistentStorage(SAVE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    inventoryState.totals = sanitizeTotals(data.inventoryTotals);
    chestState.totals = sanitizeTotals(data.chestTotals);

    const savedPickaxeLevel = Math.floor(Number(data.playerStats?.pickaxeDamage ?? 1));
    const savedFlashlightLevel = Math.floor(Number(data.playerStats?.flashlightLevel ?? 1));
    const savedSwordLevel = Math.floor(Number(data.playerStats?.swordLevel ?? 1));
    const savedCrossbowLevel = Math.floor(Number(data.playerStats?.crossbowLevel ?? 1));
    const savedHealth = Math.floor(Number(data.playerStats?.health ?? playerStats.maxHealth));
    const fallbackLevels = {
      pickaxe: Number.isFinite(savedPickaxeLevel) ? THREE.MathUtils.clamp(savedPickaxeLevel, 1, pickaxeDefinitions.length) : 1,
      flashlight: Number.isFinite(savedFlashlightLevel)
        ? THREE.MathUtils.clamp(savedFlashlightLevel, 1, getUpgradeBalanceMaxLevel('flashlight'))
        : 1,
      sword: Number.isFinite(savedSwordLevel) ? THREE.MathUtils.clamp(savedSwordLevel, 1, swordDefinitions.length) : 1,
      crossbow: Number.isFinite(savedCrossbowLevel) ? THREE.MathUtils.clamp(savedCrossbowLevel, 1, crossbowDefinitions.length) : 1,
    };
    applyNormalizedItemInventory(normalizeItemInventoryData(data.itemInventory, fallbackLevels, data.inventoryTotals));
    applyNormalizedChestInventory(normalizeChestInventoryData(data.chestInventory, data.chestTotals));
    recalculateResourceTotals();
    applyItemLevelsToVisuals();
    playerStats.health = Number.isFinite(savedHealth) ? THREE.MathUtils.clamp(savedHealth, 1, playerStats.maxHealth) : playerStats.maxHealth;

    itemState.flashlightOn = (data.itemState?.flashlightOn ?? true) && hasHeadFlashlightEquipped();
    const savedEquippedSlot = clampEquippedSlot(data.itemState?.equippedSlot);
    itemState.equippedSlot = savedEquippedSlot !== -1 && getHotbarItem(savedEquippedSlot) ? savedEquippedSlot : -1;

    const savedArea = data.areaState?.currentArea;
    areaState.currentArea = savedArea === 'cave' ? 'cave' : 'home';
    const savedCaveSeed = Math.floor(Number(data.areaState?.caveSeed));
    areaState.caveSeed = areaState.currentArea === 'cave' && Number.isFinite(savedCaveSeed)
      ? savedCaveSeed
      : null;
    homeBuildLayoutState.placements = sanitizeHomeBuildLayout(data.homeBuildLayout);
  } catch (error) {
    console.warn('Falha ao carregar save:', error);
    homeBuildLayoutState.placements = {};
  }
}

function sanitizeHomeBuildLayout(source = {}) {
  const result = {};
  for (const objectId of ['chest', 'upgradeTable', 'homeDoor']) {
    const placement = source?.[objectId];
    if (!placement || typeof placement !== 'object') continue;
    const x = Number(placement.x);
    const z = Number(placement.z);
    const rotationY = Number(placement.rotationY);
    const scale = Number(placement.scale);
    if (!Number.isFinite(x) || !Number.isFinite(z) || !Number.isFinite(rotationY)) continue;
    result[objectId] = {
      x,
      z,
      rotationY,
      scale: Number.isFinite(scale) ? THREE.MathUtils.clamp(scale, HOME_BUILD_SCALE_MIN, HOME_BUILD_SCALE_MAX) : 1,
    };
  }
  return result;
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

function createItemIconMarkup(itemOrKind) {
  const kind = typeof itemOrKind === 'string' ? itemOrKind : itemOrKind?.kind;
  switch (kind) {
    case 'ore': {
      const oreId = typeof itemOrKind === 'string' ? oreDefinitions[0]?.id : itemOrKind?.oreId;
      const oreDefinition = oreDefinitions.find((ore) => ore.id === oreId);
      return oreDefinition ? createOreIconMarkup(oreDefinition) : '';
    }
    case 'pickaxe':
      return `
        <svg viewBox="0 0 64 64" class="slot-icon slot-icon-pickaxe" aria-hidden="true">
          <path class="pickaxe-shadow" d="M20.5 34.7 47.8 62a4.2 4.2 0 0 0 6-6L26.4 28.6Z"/>
          <path class="pickaxe-handle" d="M23.6 31.2 51.7 59.3a2.2 2.2 0 0 0 3.1-3.1L26.7 28.1Z"/>
          <path class="pickaxe-handle-tip" d="M18.8 35.9 22.4 32.3 31.7 41.6 28.1 45.2Z"/>
          <path class="pickaxe-head" d="M8.2 18.8C20 8 37.9 7.5 52.9 17.1l-4.8 7.5c-9-5.4-20.7-4.7-29 1.9l9.7 1.7 7.9 7.9-6.5 6.5-7.8-7.8-1.8-9.8c-3.2 2.5-5.8 5.7-7.7 9.2Z"/>
          <path class="pickaxe-highlight" d="M20.4 18.3c7.1-4.2 15.9-4.6 24.2-1.2-8.2-.6-15.4 1.2-21.3 5.4Z"/>
        </svg>
      `;
    case 'sword':
      return `
        <svg viewBox="0 0 64 64" class="slot-icon slot-icon-sword" aria-hidden="true">
          <path class="sword-shadow" d="M16 52 46.5 21.5 42.5 17.5 12 48Z"/>
          <path class="sword-blade" d="M29 12 54 4 46 29 24 51 7 57 13 40Z"/>
          <path class="sword-core" d="M34 18 47 11 40 24 19 45 15 49 19 39Z"/>
          <path class="sword-guard" d="M17 38 26 47 21.5 51.5 12.5 42.5Z"/>
          <path class="sword-handle" d="M12.8 45.8 18.2 51.2 11.8 57.6 6.4 52.2Z"/>
          <path class="sword-pommel" d="M6 53.5a4.2 4.2 0 1 0 5.9 5.9 4.2 4.2 0 0 0-5.9-5.9Z"/>
        </svg>
      `;
    case 'crossbow':
      return `
        <svg viewBox="0 0 64 64" class="slot-icon slot-icon-crossbow" aria-hidden="true">
          <path class="crossbow-shadow" d="M10 43.5c7.8 6 18.4 9.2 29.4 9.2 7.8 0 14.6-1.7 18.6-3.5-3.7 5.9-12 9.7-21.7 9.7-12.7 0-23.5-6.5-26.3-15.4Z"/>
          <path class="crossbow-limb" d="M9 23.5c6.5-6.6 14.7-10 23-10s16.5 3.4 23 10l-4.8 4.8c-5.2-5.2-11.6-7.8-18.2-7.8s-13 2.6-18.2 7.8Z"/>
          <path class="crossbow-string" d="M13.8 28.2 31.8 40.2 50.2 28.2 47.8 24.7 31.8 35.2 16.2 24.7Z"/>
          <path class="crossbow-stock" d="M28.6 18h6.4v26.4l8.2 8.1c1.5 1.5 1.5 4 0 5.5s-4 1.5-5.5 0l-9.1-9.1V18Z"/>
          <path class="crossbow-grip" d="M24.6 34.4h10.8v5.2H24.6Z"/>
          <path class="crossbow-bolt" d="M31.1 9.8h1.8v25.6h-1.8Z"/>
          <path class="crossbow-tip" d="M32 4l4.4 7h-8.8Z"/>
        </svg>
      `;
    case 'flashlight':
      return `
        <svg viewBox="0 0 64 64" class="slot-icon slot-icon-flashlight" aria-hidden="true">
          <path d="M18 18h20l6 8v14l-6 6H18a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6Z" fill="#5a6880"/>
          <path d="M38 20h10l8 8-8 8H38Z" fill="#dfe9ff"/>
          <rect x="20" y="26" width="10" height="20" rx="4" fill="#232b37"/>
          <circle cx="48" cy="28" r="6" fill="#fff4b2"/>
          <path d="M52 22 60 16 54 28 60 40 52 34Z" fill="rgba(255,235,150,0.7)"/>
        </svg>
      `;
    default:
      return '';
  }
}

function getItemDefinition(item) {
  if (!item) return null;
  switch (item.kind) {
    case 'ore': return oreDefinitions.find((ore) => ore.id === item.oreId) ?? null;
    case 'pickaxe': return getPickaxeDefinition(item.level);
    case 'sword': return getSwordDefinition(item.level);
    case 'crossbow': return getCrossbowDefinition(item.level);
    case 'flashlight': return getFlashlightStats(item.level);
    default: return null;
  }
}

function getItemDisplayName(item) {
  if (item?.kind === 'ore') {
    return oreDefinitions.find((ore) => ore.id === item.oreId)?.label ?? 'Minerio';
  }
  const definition = getItemDefinition(item);
  if (!definition) return itemKindLabels[item?.kind] ?? 'Item';
  return definition.name ?? itemKindLabels[item.kind] ?? 'Item';
}

function getItemDisplayMeta(item) {
  const definition = getItemDefinition(item);
  if (!definition) return '';
  switch (item.kind) {
    case 'ore':
      return `${definition.short} | Raridade ${Math.round(definition.rarity * 100)}%`;
    case 'pickaxe':
      return `Dano ${definition.damage}`;
    case 'sword':
      return `Dano ${definition.damage}`;
    case 'crossbow':
      return `Dano ${definition.damage} | Alc ${definition.range}`;
    case 'flashlight':
      return `Alc ${definition.distance.toFixed(0)} | Feixe ${(definition.angle * 180 / Math.PI).toFixed(0)} deg`;
    default:
      return '';
  }
}

function getNextUpgradeForItem(item) {
  if (!item) return null;
  switch (item.kind) {
    case 'pickaxe': return item.level >= pickaxeDefinitions.length ? null : getPickaxeDefinition(item.level + 1);
    case 'sword': return item.level >= swordDefinitions.length ? null : getSwordDefinition(item.level + 1);
    case 'crossbow': return item.level >= crossbowDefinitions.length ? null : getCrossbowDefinition(item.level + 1);
    case 'flashlight': {
      const nextLevel = item.level >= getUpgradeBalanceMaxLevel('flashlight') ? null : item.level + 1;
      return nextLevel ? { level: nextLevel, cost: getUpgradeBalanceCost('flashlight', nextLevel), ...getFlashlightStats(nextLevel) } : null;
    }
    default:
      return null;
  }
}

const miningState = {
      swingProgress: Math.PI,
      swinging: false,
      lastHitAt: -10,
      hitCooldown: 0.52,
      range: 7,
      targetNode: null,
      pendingHit: null,
      hitApplied: false,
      impactProgress: 0.66,
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
      homeBuildObjects: [],
      homeBuildSelectables: [],
      oreNodes: [],
      oreHitMeshes: [],
      monsters: [],
      dropItems: [],
      projectiles: [],
      animatedModels: [],
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

    loadGameplayBalanceConfig();
    loadHomeHitboxConfig();

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

    function createGamePickaxe(level = 1, gripOrigin = false) {
      const config = getPickaxeDefinition(level);
      const pickaxe = new THREE.Group();
      const handleMat = new THREE.MeshStandardMaterial({
        color: config.handle,
        roughness: 0.7,
        metalness: 0.1,
      });
      const headMat = new THREE.MeshStandardMaterial({
        color: config.head,
        roughness: config.rough,
        metalness: config.metal,
        emissive: config.emissive,
        emissiveIntensity: 0.8,
      });

      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05 * config.size, 0.04 * config.size, 2.5 * config.size, 12),
        handleMat
      );
      pickaxe.add(handle);

      const headGroup = new THREE.Group();
      headGroup.position.y = 1.0 * config.size;
      const centerBlock = new THREE.Mesh(
        new THREE.BoxGeometry(0.2 * config.size, 0.2 * config.size, 0.2 * config.size),
        headMat
      );
      headGroup.add(centerBlock);

      const bladeGeo = new THREE.ConeGeometry(0.08 * config.size, 1.2 * config.size, 4);
      bladeGeo.translate(0, 0.6 * config.size, 0);
      const leftBlade = new THREE.Mesh(bladeGeo, headMat);
      leftBlade.rotation.z = Math.PI / 2.2;
      headGroup.add(leftBlade);
      const rightBlade = new THREE.Mesh(bladeGeo.clone(), headMat);
      rightBlade.rotation.z = -Math.PI / 2.2;
      headGroup.add(rightBlade);

      if (config.hasGem) {
        const gem = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.15 * config.size, 0),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.1,
            emissive: config.head,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.8,
          })
        );
        gem.position.y = 0.25 * config.size;
        headGroup.add(gem);
      }

      if (config.hasSpikes) {
        for (let i = 0; i < 4; i++) {
          const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03 * config.size, 0.2 * config.size, 4), headMat);
          spike.position.y = (-0.5 + i * 0.4) * config.size;
          spike.rotation.x = Math.PI / 2;
          if (i % 2 === 0) spike.rotation.z = Math.PI;
          handle.add(spike);
        }
      }

      const auras = [];
      if (config.hasAura) {
        for (let i = 0; i < 2; i++) {
          const aura = new THREE.Mesh(
            new THREE.TorusGeometry((0.3 + i * 0.1) * config.size, 0.02, 12, 56),
            new THREE.MeshBasicMaterial({
              color: config.head,
              transparent: true,
              opacity: i === 0 ? 0.5 : 0.3,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          aura.rotation.x = Math.PI / 2;
          aura.userData.reverse = i === 1;
          auras.push(aura);
          headGroup.add(aura);
        }
      }

      pickaxe.add(headGroup);
      pickaxe.rotation.z = -Math.PI / 6;
      if (gripOrigin) {
        const handleBottom = new THREE.Vector3(0, -1.25 * config.size, 0).applyEuler(pickaxe.rotation);
        pickaxe.position.copy(handleBottom).multiplyScalar(-1);
      }
      pickaxe.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      const wrapper = new THREE.Group();
      wrapper.add(pickaxe);
      wrapper.scale.setScalar(0.24);
      wrapper.userData.auras = auras;
      return wrapper;
    }

    function createGameSword(level = 1) {
      const numericLevel = Math.floor(Number(level));
      const safeLevel = Number.isFinite(numericLevel) ? THREE.MathUtils.clamp(numericLevel, 1, 10) : 1;
      const swordModel = new THREE.Group();

      let handleLength = 0.8;
      let guardWidth = 1.2;
      let bladeLength = 3.0;
      let bladeWidth = 0.4;
      let handleColor = 0x5c3a21;
      let guardColor = 0x6e4729;
      let bladeColor = 0x8b5a2b;
      let pommelColor = 0x5c3a21;
      let bladeRoughness = 0.8;
      let bladeMetalness = 0.1;
      let isEmissive = false;
      let emissiveColor = 0x000000;
      let emissiveIntensity = 0;
      let isTransparent = false;
      let opacity = 1;
      let transmission = 0;
      let hasCore = false;
      let coreColor = 0xffffff;

      switch (safeLevel) {
        case 2:
          handleColor = 0x2c2c2c; guardColor = 0x4a4a4a; bladeColor = 0x7a7a7a; pommelColor = 0x2c2c2c;
          bladeRoughness = 0.9; bladeMetalness = 0; bladeWidth = 0.45;
          break;
        case 3:
          handleColor = 0x4a2a11; guardColor = 0x4a4a4a; bladeColor = 0x999999; pommelColor = 0x4a4a4a;
          bladeRoughness = 0.4; bladeMetalness = 0.8;
          break;
        case 4:
          handleColor = 0x1a1a1a; guardColor = 0x888888; bladeColor = 0xdddddd; pommelColor = 0x888888;
          bladeRoughness = 0.2; bladeMetalness = 1; bladeLength = 3.4; guardWidth = 1.4;
          break;
        case 5:
          handleColor = 0x4a0000; guardColor = 0xffd700; bladeColor = 0xffcc00; pommelColor = 0xff0000;
          bladeRoughness = 0.2; bladeMetalness = 1; bladeLength = 3.4; guardWidth = 1.5;
          break;
        case 6:
          handleColor = 0xeeeeee; guardColor = 0x0088ff; bladeColor = 0x00ffff; pommelColor = 0x0088ff;
          bladeRoughness = 0.1; bladeMetalness = 0.2; isTransparent = true; transmission = 0.9; opacity = 0.8;
          bladeWidth = 0.5; bladeLength = 3.6;
          break;
        case 7:
          handleColor = 0x111111; guardColor = 0x550000; bladeColor = 0xff4500; pommelColor = 0xffa500;
          bladeRoughness = 0.4; bladeMetalness = 0.4; isEmissive = true; emissiveColor = 0xff2200; emissiveIntensity = 1.5;
          hasCore = true; coreColor = 0xffffff; bladeLength = 3.8; guardWidth = 1.6;
          break;
        case 8:
          handleColor = 0x000000; guardColor = 0x2b00ff; bladeColor = 0x110033; pommelColor = 0xaa00ff;
          bladeRoughness = 0.3; bladeMetalness = 0.6; isEmissive = true; emissiveColor = 0x6a0dad; emissiveIntensity = 2;
          hasCore = true; coreColor = 0x000000; bladeLength = 4; guardWidth = 1.8; bladeWidth = 0.55;
          break;
        case 9:
          handleColor = 0x222222; guardColor = 0x00ffcc; bladeColor = 0x00ffcc; pommelColor = 0xffffff;
          bladeRoughness = 0.1; bladeMetalness = 0.1; isEmissive = true; emissiveColor = 0x00ffcc; emissiveIntensity = 2.5;
          hasCore = true; coreColor = 0xffffff; bladeLength = 4.2; guardWidth = 2;
          break;
        case 10:
          handleColor = 0xffffff; guardColor = 0xffd700; bladeColor = 0xffffff; pommelColor = 0x00ffff;
          bladeRoughness = 0; bladeMetalness = 1; isEmissive = true; emissiveColor = 0xaaaaff; emissiveIntensity = 1.5;
          hasCore = true; coreColor = 0xffd700; bladeLength = 4.8; guardWidth = 2.4; bladeWidth = 0.65;
          break;
      }

      const pommelMat = new THREE.MeshStandardMaterial({ color: pommelColor, roughness: 0.3, metalness: 0.8 });
      if (safeLevel >= 7) {
        pommelMat.emissive = new THREE.Color(pommelColor);
        pommelMat.emissiveIntensity = 1.5;
      }
      const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), pommelMat);
      swordModel.add(pommel);

      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, handleLength, 12),
        new THREE.MeshStandardMaterial({ color: handleColor, roughness: 0.8, metalness: 0.1 })
      );
      handle.position.y = handleLength / 2;
      swordModel.add(handle);

      const guardMat = new THREE.MeshStandardMaterial({ color: guardColor, roughness: 0.4, metalness: 0.8 });
      if (safeLevel >= 8) {
        guardMat.emissive = new THREE.Color(guardColor);
        guardMat.emissiveIntensity = 1;
      }

      let guard;
      if (safeLevel >= 8) {
        guard = new THREE.Group();
        guard.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.4), guardMat));
        const sideLength = guardWidth / 2;
        const leftSide = new THREE.Mesh(new THREE.ConeGeometry(0.15, sideLength, 4), guardMat);
        leftSide.rotation.z = Math.PI / 2.5;
        leftSide.position.set(-sideLength / 2, 0.1, 0);
        guard.add(leftSide);
        const rightSide = new THREE.Mesh(new THREE.ConeGeometry(0.15, sideLength, 4), guardMat);
        rightSide.rotation.z = -Math.PI / 2.5;
        rightSide.position.set(sideLength / 2, 0.1, 0);
        guard.add(rightSide);
      } else {
        guard = new THREE.Mesh(new THREE.BoxGeometry(guardWidth, 0.2, 0.3), guardMat);
      }
      guard.position.y = handleLength;
      swordModel.add(guard);

      const bladeProps = { color: bladeColor, roughness: bladeRoughness, metalness: bladeMetalness };
      if (isEmissive) {
        bladeProps.emissive = new THREE.Color(emissiveColor);
        bladeProps.emissiveIntensity = emissiveIntensity;
      }
      if (isTransparent) {
        bladeProps.transparent = true;
        bladeProps.opacity = opacity;
        bladeProps.transmission = transmission;
        bladeProps.ior = 1.5;
      }
      const bladeMat = isTransparent ? new THREE.MeshPhysicalMaterial(bladeProps) : new THREE.MeshStandardMaterial(bladeProps);
      const bladeGroup = new THREE.Group();
      const straightLength = bladeLength * 0.8;
      const tipLength = bladeLength * 0.2;
      const bladeRadius = bladeWidth / 1.414;
      const straightGeo = new THREE.CylinderGeometry(bladeRadius, bladeRadius, straightLength, 4);
      straightGeo.rotateY(Math.PI / 4);
      const straightBlade = new THREE.Mesh(straightGeo, bladeMat);
      straightBlade.position.y = straightLength / 2;
      straightBlade.scale.set(1, 1, 0.3);
      bladeGroup.add(straightBlade);

      const tipGeo = new THREE.CylinderGeometry(0.001, bladeRadius, tipLength, 4);
      tipGeo.rotateY(Math.PI / 4);
      const tipBlade = new THREE.Mesh(tipGeo, bladeMat);
      tipBlade.position.y = straightLength + tipLength / 2;
      tipBlade.scale.set(1, 1, 0.3);
      bladeGroup.add(tipBlade);

      if (hasCore) {
        const coreMat = new THREE.MeshBasicMaterial({ color: coreColor });
        const coreGeo = new THREE.CylinderGeometry(bladeRadius * 0.2, bladeRadius * 0.2, straightLength, 4);
        coreGeo.rotateY(Math.PI / 4);
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.y = straightLength / 2;
        core.scale.set(1, 1, 0.4);
        bladeGroup.add(core);

        const coreTipGeo = new THREE.CylinderGeometry(0.001, bladeRadius * 0.2, tipLength, 4);
        coreTipGeo.rotateY(Math.PI / 4);
        const coreTip = new THREE.Mesh(coreTipGeo, coreMat);
        coreTip.position.y = straightLength + tipLength / 2;
        coreTip.scale.set(1, 1, 0.4);
        bladeGroup.add(coreTip);
      }

      bladeGroup.position.y = handleLength + 0.1;
      swordModel.add(bladeGroup);

      const rings = [];
      if (safeLevel === 10) {
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffd700, emissiveIntensity: 2 });
        for (let i = 0; i < 2; i++) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.03, 12, 28), ringMat);
          ring.position.y = handleLength + (i === 0 ? 1.5 : 3);
          ring.rotation.x = Math.PI / 2;
          ring.userData.reverse = i === 1;
          rings.push(ring);
          swordModel.add(ring);
        }
      }

      swordModel.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      const wrapper = new THREE.Group();
      wrapper.add(swordModel);
      wrapper.scale.setScalar(0.16);
      wrapper.userData.rings = rings;
      return wrapper;
    }

    function getCrossbowVisualConfig(level = 1) {
      const safeLevel = THREE.MathUtils.clamp(Math.floor(Number(level)) || 1, 1, 10);
      const configs = [
        { stockColor: 0x5c4033, stockRoughness: 0.9, stockMetalness: 0.1, bowColor: 0x808080, bowRoughness: 0.7, bowMetalness: 0.5, bowWidth: 1.5, bowThickness: 0.05, glowColor: null, doubleBow: false },
        { stockColor: 0x3b2818, stockRoughness: 0.8, stockMetalness: 0.2, bowColor: 0xaaaaaa, bowRoughness: 0.5, bowMetalness: 0.8, bowWidth: 1.6, bowThickness: 0.06, glowColor: null, doubleBow: false },
        { stockColor: 0x2c1e16, stockRoughness: 0.8, stockMetalness: 0.2, bowColor: 0xcd7f32, bowRoughness: 0.3, bowMetalness: 0.9, bowWidth: 1.7, bowThickness: 0.07, glowColor: null, doubleBow: false },
        { stockColor: 0x222222, stockRoughness: 0.6, stockMetalness: 0.4, bowColor: 0xdddddd, bowRoughness: 0.2, bowMetalness: 0.9, bowWidth: 1.7, bowThickness: 0.08, glowColor: null, doubleBow: false },
        { stockColor: 0x111111, stockRoughness: 0.5, stockMetalness: 0.5, bowColor: 0xffd700, bowRoughness: 0.2, bowMetalness: 1.0, bowWidth: 1.8, bowThickness: 0.07, glowColor: null, doubleBow: true },
        { stockColor: 0x2a2a35, stockRoughness: 0.7, stockMetalness: 0.3, bowColor: 0x1a1a1a, bowRoughness: 0.5, bowMetalness: 0.8, bowWidth: 1.8, bowThickness: 0.08, glowColor: 0x8a2be2, doubleBow: false },
        { stockColor: 0x1f2e1f, stockRoughness: 0.7, stockMetalness: 0.3, bowColor: 0x4a3c20, bowRoughness: 0.6, bowMetalness: 0.6, bowWidth: 1.9, bowThickness: 0.09, glowColor: 0x39ff14, doubleBow: true },
        { stockColor: 0xffffff, stockRoughness: 0.2, stockMetalness: 0.1, bowColor: 0x222222, bowRoughness: 0.4, bowMetalness: 0.9, bowWidth: 2.0, bowThickness: 0.1, glowColor: 0x00ffff, doubleBow: false },
        { stockColor: 0x050505, stockRoughness: 0.4, stockMetalness: 0.6, bowColor: 0x2a004d, bowRoughness: 0.2, bowMetalness: 0.9, bowWidth: 2.1, bowThickness: 0.12, glowColor: 0xff00ff, doubleBow: true },
        { stockColor: 0x1a0505, stockRoughness: 0.9, stockMetalness: 0.2, bowColor: 0x330000, bowRoughness: 0.5, bowMetalness: 0.8, bowWidth: 2.5, bowThickness: 0.15, glowColor: 0xff4500, doubleBow: true },
      ];
      return configs[safeLevel - 1];
    }

    function updateCrossbowLoadedVisual(model, progress = 0) {
      if (!model?.userData?.stringLine) return;
      const safeProgress = THREE.MathUtils.clamp(progress, 0, 1);
      const pull = safeProgress < 0.08
        ? 0
        : safeProgress < 0.28
          ? THREE.MathUtils.smoothstep((safeProgress - 0.08) / 0.2, 0, 1)
          : safeProgress < 0.55
            ? 1
            : 1 - THREE.MathUtils.smoothstep((safeProgress - 0.55) / 0.45, 0, 1);
      const stringLine = model.userData.stringLine;
      const positions = stringLine.geometry.attributes.position.array;
      positions[5] = THREE.MathUtils.lerp(model.userData.defaultStringZ, model.userData.releasedStringZ, pull);
      stringLine.geometry.attributes.position.needsUpdate = true;
      if (model.userData.loadedArrow) {
        const arrowVisible = safeProgress < 0.52 || safeProgress > 0.94;
        model.userData.loadedArrow.visible = arrowVisible;
        model.userData.loadedArrow.position.z = THREE.MathUtils.lerp(0, -0.65, Math.min(1, pull * 1.08));
      }
    }

    function createGameCrossbow(level = 1) {
      const definition = getCrossbowDefinition(level);
      const safeLevel = definition.level;
      const cfg = getCrossbowVisualConfig(safeLevel);
      const group = new THREE.Group();

      const stockMat = new THREE.MeshStandardMaterial({ color: cfg.stockColor, roughness: cfg.stockRoughness, metalness: cfg.stockMetalness });
      const bowMat = new THREE.MeshStandardMaterial({ color: cfg.bowColor, roughness: cfg.bowRoughness, metalness: cfg.bowMetalness });
      const emissiveMat = cfg.glowColor
        ? new THREE.MeshStandardMaterial({ color: cfg.glowColor, emissive: cfg.glowColor, emissiveIntensity: 2.2, roughness: 0.16, metalness: 0.55 })
        : null;
      const darkMetal = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.3 });
      const stringMat = cfg.glowColor
        ? new THREE.LineBasicMaterial({ color: cfg.glowColor })
        : new THREE.LineBasicMaterial({ color: 0xffffff });

      const frontStock = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 2), stockMat);
      frontStock.position.set(0, 0, -1);
      group.add(frontStock);

      const rearStock = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 2), stockMat);
      rearStock.position.set(0, 0, 1);
      group.add(rearStock);

      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.6, 0.35), stockMat);
      grip.position.set(0, -0.3, 1.2);
      grip.rotation.x = Math.PI / 6;
      group.add(grip);

      const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.1), darkMetal);
      trigger.position.set(0, -0.15, 1.0);
      group.add(trigger);

      const track = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 3.8), darkMetal);
      track.position.set(0, 0.18, 0);
      group.add(track);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-cfg.bowWidth, 0, -1),
        new THREE.Vector3(0, 0, -2.5),
        new THREE.Vector3(cfg.bowWidth, 0, -1)
      );
      const bowGeo = new THREE.TubeGeometry(curve, 32, cfg.bowThickness, 8, false);
      const bow = new THREE.Mesh(bowGeo, bowMat);
      group.add(bow);

      if (cfg.doubleBow) {
        const bow2 = new THREE.Mesh(bowGeo, bowMat);
        bow2.position.y = 0.15;
        bow2.position.z = -0.1;
        bow2.scale.set(0.9, 1, 0.9);
        group.add(bow2);
      }

      const stringZDefault = 1.3;
      const stringZRelease = -1.0;
      const stringPoints = [
        new THREE.Vector3(-cfg.bowWidth, 0, -1),
        new THREE.Vector3(0, 0, stringZDefault),
        new THREE.Vector3(cfg.bowWidth, 0, -1),
      ];
      const stringGeo = new THREE.BufferGeometry().setFromPoints(stringPoints);
      const stringLine = new THREE.Line(stringGeo, stringMat);
      stringLine.position.y = 0.2;
      group.add(stringLine);

      if (safeLevel >= 4) {
        const scopeGroup = new THREE.Group();
        const scopeMain = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 16), darkMetal);
        scopeMain.rotation.x = Math.PI / 2;
        scopeGroup.add(scopeMain);
        const mount1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.05), darkMetal);
        mount1.position.set(0, -0.1, -0.2);
        scopeGroup.add(mount1);
        const mount2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.05), darkMetal);
        mount2.position.set(0, -0.1, 0.2);
        scopeGroup.add(mount2);
        scopeGroup.position.set(0, 0.4, 0.5);
        group.add(scopeGroup);
      }

      if (cfg.glowColor && emissiveMat && (safeLevel === 6 || safeLevel === 7)) {
        for (let i = 1; i <= 4; i++) {
          const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.12), emissiveMat);
          const t = i / 5;
          const pos = curve.getPoint(t);
          crystal.position.copy(pos);
          crystal.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), 0);
          group.add(crystal);
        }
      }

      if (safeLevel >= 8) {
        const pulleyGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 16);
        pulleyGeo.rotateZ(Math.PI / 2);
        const p1 = new THREE.Mesh(pulleyGeo, darkMetal);
        p1.position.set(-cfg.bowWidth, 0, -1);
        group.add(p1);
        const p2 = new THREE.Mesh(pulleyGeo, darkMetal);
        p2.position.set(cfg.bowWidth, 0, -1);
        group.add(p2);
        if (emissiveMat) {
          const ringGeo = new THREE.TorusGeometry(0.1, 0.02, 8, 16);
          ringGeo.rotateY(Math.PI / 2);
          const r1 = new THREE.Mesh(ringGeo, emissiveMat);
          r1.position.set(-cfg.bowWidth - 0.1, 0, -1);
          group.add(r1);
          const r2 = new THREE.Mesh(ringGeo, emissiveMat);
          r2.position.set(cfg.bowWidth + 0.1, 0, -1);
          group.add(r2);
        }
      }

      if (safeLevel === 9 && emissiveMat) {
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 32), emissiveMat);
          ring.position.set(0, 0, -0.5 + i * 0.4);
          group.add(ring);
        }
      }

      if (safeLevel === 10 && emissiveMat) {
        for (let i = 0; i < 6; i++) {
          const spike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 4), emissiveMat);
          spike.position.set(0, 0.3, -1.5 + i * 0.5);
          spike.rotation.x = Math.PI / 2;
          group.add(spike);
          const s1 = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.3, 4), emissiveMat);
          s1.position.set(-0.2, 0.1, -1.5 + i * 0.5);
          s1.rotation.z = Math.PI / 2;
          group.add(s1);
          const s2 = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.3, 4), emissiveMat);
          s2.position.set(0.2, 0.1, -1.5 + i * 0.5);
          s2.rotation.z = -Math.PI / 2;
          group.add(s2);
        }
      }

      const loadedArrow = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3, 8), darkMetal);
      shaft.rotation.x = Math.PI / 2;
      loadedArrow.add(shaft);
      const headMat = cfg.glowColor && safeLevel >= 6
        ? emissiveMat
        : new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.22 });
      const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 8), headMat);
      head.rotation.x = -Math.PI / 2;
      head.position.set(0, 0, -1.6);
      loadedArrow.add(head);
      const fletchMat = cfg.glowColor && safeLevel >= 8
        ? emissiveMat
        : new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0.1 });
      const fletchGeo = new THREE.BoxGeometry(0.02, 0.15, 0.3);
      const f1 = new THREE.Mesh(fletchGeo, fletchMat); f1.position.set(0, 0.075, 1.35); loadedArrow.add(f1);
      const f2 = new THREE.Mesh(fletchGeo, fletchMat); f2.position.set(0, -0.075, 1.35); loadedArrow.add(f2);
      const f3 = new THREE.Mesh(fletchGeo, fletchMat); f3.rotation.z = Math.PI / 2; f3.position.set(0.075, 0, 1.35); loadedArrow.add(f3);
      const f4 = new THREE.Mesh(fletchGeo, fletchMat); f4.rotation.z = Math.PI / 2; f4.position.set(-0.075, 0, 1.35); loadedArrow.add(f4);
      loadedArrow.position.set(0, 0.25, 0);
      group.add(loadedArrow);

      group.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });

      group.rotation.z = -Math.PI / 2;
      group.rotation.x = 0.08;
      group.position.set(0, -0.26, 0);

      const wrapper = new THREE.Group();
      wrapper.add(group);
      wrapper.scale.setScalar(0.125);
      wrapper.userData.definition = definition;
      wrapper.userData.stringLine = stringLine;
      wrapper.userData.loadedArrow = loadedArrow;
      wrapper.userData.defaultStringZ = stringZDefault;
      wrapper.userData.releasedStringZ = stringZRelease;
      updateCrossbowLoadedVisual(wrapper, 0);
      return wrapper;
    }

    const pickaxePivot = new THREE.Group();
    pickaxePivot.position.set(0.5, -0.5, -0.8);
    camera.add(pickaxePivot);

    let pickaxeModel = createGamePickaxe(playerStats.pickaxeDamage);
    pickaxeModel.visible = false;
    pickaxeModel.position.set(0, -0.14, 0);
    pickaxeModel.rotation.set(0.18, 1.42, 0.18);
    pickaxePivot.add(pickaxeModel);

    function setFirstPersonPickaxeLevel(level) {
      if (pickaxeModel) {
        pickaxePivot.remove(pickaxeModel);
        disposeGroup(pickaxeModel);
      }
      pickaxeModel = createGamePickaxe(level);
      pickaxeModel.visible = false;
      pickaxeModel.position.set(0, -0.14, 0);
      pickaxeModel.rotation.set(0.18, 1.42, 0.18);
      pickaxePivot.add(pickaxeModel);
    }

    const crossbowPivot = new THREE.Group();
    crossbowPivot.position.set(0.48, -0.38, -0.7);
    camera.add(crossbowPivot);

    let crossbowModel = createGameCrossbow(1);
    crossbowModel.visible = false;
    crossbowModel.position.set(0.08, -0.12, 0);
    crossbowModel.rotation.set(0.06, 1.04, -0.1);
    crossbowPivot.add(crossbowModel);

    function setFirstPersonCrossbowLevel(level = 1) {
      if (crossbowModel) {
        crossbowPivot.remove(crossbowModel);
        disposeGroup(crossbowModel);
      }
      crossbowModel = createGameCrossbow(level);
      crossbowModel.visible = false;
      crossbowModel.position.set(0.08, -0.12, 0);
      crossbowModel.rotation.set(0.06, 1.04, -0.1);
      crossbowPivot.add(crossbowModel);
    }

    function createMinerCharacter() {
      const materialSet = {
        skin: new THREE.MeshStandardMaterial({ color: 0xd4956a, roughness: 0.82 }),
        hair: new THREE.MeshStandardMaterial({ color: 0x2a1a08, roughness: 1 }),
        beard: new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 1 }),
        shirt: new THREE.MeshStandardMaterial({ color: 0x3a2a50, roughness: 0.86 }),
        pants: new THREE.MeshStandardMaterial({ color: 0x1e1428, roughness: 0.92 }),
        boots: new THREE.MeshStandardMaterial({ color: 0x1a0e06, roughness: 0.92 }),
        belt: new THREE.MeshStandardMaterial({ color: 0x2a1a08, roughness: 0.75, metalness: 0.25 }),
        buckle: new THREE.MeshStandardMaterial({ color: 0xd4aa00, roughness: 0.3, metalness: 0.88, emissive: 0xd4aa00, emissiveIntensity: 0.14 }),
        helmet: new THREE.MeshStandardMaterial({ color: 0x4a3a20, roughness: 0.72, metalness: 0.48 }),
        helmetRim: new THREE.MeshStandardMaterial({ color: 0xd4aa00, roughness: 0.3, metalness: 0.9, emissive: 0xd4aa00, emissiveIntensity: 0.24 }),
        lamp: new THREE.MeshStandardMaterial({ color: 0xffee88, emissive: 0xffee88, emissiveIntensity: 1.1, roughness: 0.2 }),
        pickaxeHandle: new THREE.MeshStandardMaterial({ color: 0x2a1a08, roughness: 0.9 }),
        pickaxeBlade: new THREE.MeshStandardMaterial({ color: 0x888899, roughness: 0.3, metalness: 0.95, emissive: 0x334466, emissiveIntensity: 0.12 }),
        eye: new THREE.MeshStandardMaterial({ color: 0x1a0a00, roughness: 1 }),
        eyeWhite: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }),
        bag: new THREE.MeshStandardMaterial({ color: 0x2d1a08, roughness: 0.96 }),
        bagStrap: new THREE.MeshStandardMaterial({ color: 0x1a0e04, roughness: 0.9 }),
        gemA: new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x00ffcc, emissiveIntensity: 0.6, roughness: 0.1, metalness: 0.8 }),
        gemB: new THREE.MeshStandardMaterial({ color: 0xff44aa, emissive: 0xff44aa, emissiveIntensity: 0.55, roughness: 0.1, metalness: 0.8 }),
        kneePad: new THREE.MeshStandardMaterial({ color: 0x252030, roughness: 0.82, metalness: 0.2 }),
      };

      const container = new THREE.Group();
      container.position.y = -0.26;
      container.rotation.y = Math.PI;

      const model = new THREE.Group();
      container.add(model);

      const box = (w, h, d, material, px, py, pz, rx = 0, ry = 0, rz = 0) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
        mesh.position.set(px, py, pz);
        mesh.rotation.set(rx, ry, rz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      };

      const sphere = (radius, material, px, py, pz) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 8), material);
        mesh.position.set(px, py, pz);
        mesh.castShadow = true;
        return mesh;
      };

      const cylinder = (rTop, rBottom, height, segments, material, px, py, pz, rx = 0, ry = 0, rz = 0) => {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, segments), material);
        mesh.position.set(px, py, pz);
        mesh.rotation.set(rx, ry, rz);
        mesh.castShadow = true;
        return mesh;
      };

      const headGroup = new THREE.Group();
      headGroup.position.set(0, 1.55, 0);
      headGroup.add(box(0.28, 0.3, 0.26, materialSet.skin, 0, 0, 0));
      headGroup.add(sphere(0.08, materialSet.skin, -0.1, -0.05, 0.1));
      headGroup.add(sphere(0.08, materialSet.skin, 0.1, -0.05, 0.1));
      const eyeL = new THREE.Group();
      eyeL.position.set(-0.085, 0.04, 0.13);
      eyeL.add(sphere(0.032, materialSet.eyeWhite, 0, 0, 0));
      eyeL.add(sphere(0.018, materialSet.eye, 0, 0, 0.02));
      headGroup.add(eyeL);
      const eyeR = new THREE.Group();
      eyeR.position.set(0.085, 0.04, 0.13);
      eyeR.add(sphere(0.032, materialSet.eyeWhite, 0, 0, 0));
      eyeR.add(sphere(0.018, materialSet.eye, 0, 0, 0.02));
      headGroup.add(eyeR);
      headGroup.add(box(0.06, 0.015, 0.01, materialSet.hair, -0.085, 0.095, 0.135, 0, 0, 0.15));
      headGroup.add(box(0.06, 0.015, 0.01, materialSet.hair, 0.085, 0.095, 0.135, 0, 0, -0.15));
      headGroup.add(box(0.04, 0.025, 0.04, materialSet.skin, 0, -0.01, 0.145));
      headGroup.add(box(0.08, 0.018, 0.01, materialSet.beard, 0, -0.06, 0.136));
      const beard = box(0.22, 0.1, 0.18, materialSet.beard, 0, -0.11, 0.02);
      beard.scale.set(1, 1, 0.6);
      headGroup.add(beard);
      headGroup.add(box(0.3, 0.1, 0.28, materialSet.hair, 0, 0.13, -0.01));
      headGroup.add(box(0.08, 0.16, 0.1, materialSet.hair, -0.145, 0.04, -0.02));
      headGroup.add(box(0.08, 0.16, 0.1, materialSet.hair, 0.145, 0.04, -0.02));
      headGroup.add(box(0.32, 0.14, 0.3, materialSet.helmet, 0, 0.17, 0));
      headGroup.add(box(0.38, 0.04, 0.34, materialSet.helmet, 0, 0.11, 0));
      headGroup.add(box(0.34, 0.025, 0.005, materialSet.helmetRim, 0, 0.17, 0.155));
      const lampGroup = new THREE.Group();
      lampGroup.position.set(0, 0.19, 0.16);
      lampGroup.add(box(0.06, 0.05, 0.04, materialSet.helmet, 0, 0, 0));
      lampGroup.add(sphere(0.028, materialSet.lamp, 0, 0, 0.03));
      headGroup.add(lampGroup);
      model.add(headGroup);

      const torsoGroup = new THREE.Group();
      torsoGroup.position.set(0, 1.05, 0);
      torsoGroup.add(box(0.32, 0.38, 0.22, materialSet.shirt, 0, 0, 0));
      torsoGroup.add(box(0.03, 0.35, 0.005, materialSet.belt, -0.07, 0, 0.112, 0, 0, 0.12));
      torsoGroup.add(box(0.03, 0.35, 0.005, materialSet.belt, 0.07, 0, 0.112, 0, 0, -0.12));
      torsoGroup.add(box(0.34, 0.045, 0.24, materialSet.belt, 0, -0.175, 0));
      torsoGroup.add(box(0.04, 0.055, 0.012, materialSet.buckle, 0, -0.175, 0.125));
      const pocketGroup = new THREE.Group();
      pocketGroup.position.set(-0.1, 0.05, 0.112);
      pocketGroup.add(box(0.09, 0.07, 0.01, materialSet.belt, 0, 0, 0));
      pocketGroup.add(sphere(0.022, materialSet.gemA, 0, 0.01, 0.02));
      torsoGroup.add(pocketGroup);
      model.add(torsoGroup);

      const bagGroup = new THREE.Group();
      bagGroup.position.set(0, 1.08, -0.2);
      bagGroup.add(box(0.22, 0.28, 0.14, materialSet.bag, 0, 0, 0));
      bagGroup.add(box(0.04, 0.34, 0.02, materialSet.bagStrap, -0.08, 0.02, 0.08));
      bagGroup.add(box(0.04, 0.34, 0.02, materialSet.bagStrap, 0.08, 0.02, 0.08));
      bagGroup.add(sphere(0.022, materialSet.gemA, 0.04, 0.04, 0.08));
      bagGroup.add(sphere(0.018, materialSet.gemB, -0.04, -0.02, 0.08));
      model.add(bagGroup);

      const armLGroup = new THREE.Group();
      armLGroup.position.set(-0.2, 1.22, 0);
      armLGroup.add(box(0.1, 0.22, 0.12, materialSet.shirt, 0, -0.11, 0));
      const foreArmLGroup = new THREE.Group();
      foreArmLGroup.position.set(0, -0.22, 0);
      foreArmLGroup.add(box(0.09, 0.2, 0.1, materialSet.skin, 0, -0.1, 0));
      foreArmLGroup.add(sphere(0.06, materialSet.skin, 0, -0.22, 0));
      const characterPickaxeGroup = new THREE.Group();
      applyTransformConfig(characterPickaxeGroup, weaponDevConfig.pickaxe.grip);
      let characterPickaxeModel = null;
      foreArmLGroup.add(characterPickaxeGroup);
      const characterSwordGroup = new THREE.Group();
      applyTransformConfig(characterSwordGroup, weaponDevConfig.sword.grip);
      const characterCrossbowGroup = new THREE.Group();
      applyTransformConfig(characterCrossbowGroup, weaponDevConfig.crossbow.grip);
      let characterCrossbowModel = null;
      const swordTrailGroup = new THREE.Group();
      swordTrailGroup.visible = false;
      swordTrailGroup.position.set(0, 0.46, 0.02);
      const swordTrailMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xd9fff8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x62fff0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
      ];
      const swordTrailMain = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.42, 30, 1, -1.08, 2.16), swordTrailMaterials[0]);
      swordTrailMain.scale.set(0.55, 0.9, 1);
      swordTrailGroup.add(swordTrailMain);
      const swordTrailEdge = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.46, 30, 1, -1.02, 2.04), swordTrailMaterials[1]);
      swordTrailEdge.scale.set(0.58, 0.94, 1);
      swordTrailGroup.add(swordTrailEdge);
      characterSwordGroup.add(swordTrailGroup);
      foreArmLGroup.add(characterSwordGroup);
      foreArmLGroup.add(characterCrossbowGroup);
      let characterSwordModel = null;
      armLGroup.add(foreArmLGroup);
      model.add(armLGroup);

      const armRGroup = new THREE.Group();
      armRGroup.position.set(0.2, 1.22, 0);
      armRGroup.add(box(0.1, 0.22, 0.12, materialSet.shirt, 0, -0.11, 0));
      const foreArmRGroup = new THREE.Group();
      foreArmRGroup.position.set(0, -0.22, 0);
      foreArmRGroup.add(box(0.09, 0.2, 0.1, materialSet.skin, 0, -0.1, 0));
      foreArmRGroup.add(sphere(0.06, materialSet.skin, 0, -0.22, 0));
      armRGroup.add(foreArmRGroup);
      model.add(armRGroup);

      const legLGroup = new THREE.Group();
      legLGroup.position.set(-0.085, 0.86, 0);
      legLGroup.add(box(0.13, 0.24, 0.14, materialSet.pants, 0, -0.12, 0));
      const lowerLegLGroup = new THREE.Group();
      lowerLegLGroup.position.set(0, -0.24, 0);
      lowerLegLGroup.add(box(0.11, 0.24, 0.12, materialSet.pants, 0, -0.12, 0));
      lowerLegLGroup.add(box(0.135, 0.06, 0.015, materialSet.kneePad, 0, -0.02, 0.065));
      const bootL = new THREE.Group();
      bootL.position.set(0, -0.26, 0.03);
      bootL.add(box(0.12, 0.1, 0.18, materialSet.boots, 0, -0.05, 0.02));
      lowerLegLGroup.add(bootL);
      legLGroup.add(lowerLegLGroup);
      model.add(legLGroup);

      const legRGroup = new THREE.Group();
      legRGroup.position.set(0.085, 0.86, 0);
      legRGroup.add(box(0.13, 0.24, 0.14, materialSet.pants, 0, -0.12, 0));
      const lowerLegRGroup = new THREE.Group();
      lowerLegRGroup.position.set(0, -0.24, 0);
      lowerLegRGroup.add(box(0.11, 0.24, 0.12, materialSet.pants, 0, -0.12, 0));
      lowerLegRGroup.add(box(0.135, 0.06, 0.015, materialSet.kneePad, 0, -0.02, 0.065));
      const bootR = new THREE.Group();
      bootR.position.set(0, -0.26, 0.03);
      bootR.add(box(0.12, 0.1, 0.18, materialSet.boots, 0, -0.05, 0.02));
      lowerLegRGroup.add(bootR);
      legRGroup.add(lowerLegRGroup);
      model.add(legRGroup);

      const state = {
        mode: 'idle',
        time: 0,
      };

      function resetPose() {
        model.position.y = 0;
        model.rotation.x = 0;
        headGroup.rotation.set(0, 0, 0);
        torsoGroup.rotation.set(0, 0, 0);
        armLGroup.rotation.set(0, 0, 0.12);
        armRGroup.rotation.set(0, 0, -0.12);
        foreArmLGroup.rotation.set(0.12, 0, 0);
        foreArmRGroup.rotation.set(0.12, 0, 0);
        legLGroup.rotation.set(0, 0, 0);
        legRGroup.rotation.set(0, 0, 0);
        lowerLegLGroup.rotation.set(0, 0, 0);
        lowerLegRGroup.rotation.set(0, 0, 0);
        applyTransformConfig(characterPickaxeGroup, weaponDevConfig.pickaxe.grip);
        applyTransformConfig(characterSwordGroup, weaponDevConfig.sword.grip);
        applyTransformConfig(characterCrossbowGroup, weaponDevConfig.crossbow.grip);
        if (characterPickaxeModel) applyTransformConfig(characterPickaxeModel, weaponDevConfig.pickaxe.model);
        if (characterSwordModel) applyTransformConfig(characterSwordModel, weaponDevConfig.sword.model);
        if (characterCrossbowModel) {
          applyTransformConfig(characterCrossbowModel, weaponDevConfig.crossbow.model);
          updateCrossbowLoadedVisual(characterCrossbowModel, 0);
        }
        swordTrailGroup.visible = false;
        swordTrailGroup.scale.set(1, 1, 1);
        swordTrailMaterials[0].opacity = 0;
        swordTrailMaterials[1].opacity = 0;
      }

      function animateIdle(t) {
        const s = Math.sin(t * 1.8);
        model.position.y = s * 0.018;
        headGroup.rotation.y = Math.sin(t * 0.4) * 0.08;
        headGroup.rotation.z = Math.sin(t * 0.7) * 0.02;
        torsoGroup.rotation.z = s * 0.015;
        armLGroup.rotation.x = s * 0.04;
        armLGroup.rotation.z = 0.12 + s * 0.05;
        armRGroup.rotation.x = -s * 0.04;
        armRGroup.rotation.z = -0.12 - s * 0.05;
        foreArmLGroup.rotation.x = 0.15 + s * 0.03;
        foreArmRGroup.rotation.x = 0.12 - s * 0.03;
      }

      function animateWalk(t) {
        const speed = 3.5;
        const s = Math.sin(t * speed);
        const c = Math.cos(t * speed);
        model.position.y = Math.abs(Math.sin(t * speed * 2)) * 0.04;
        headGroup.rotation.x = c * 0.04;
        headGroup.rotation.y = s * 0.06;
        torsoGroup.rotation.z = s * 0.04;
        torsoGroup.rotation.x = c * 0.03;
        armLGroup.rotation.x = c * 0.5;
        armRGroup.rotation.x = -c * 0.5;
        foreArmLGroup.rotation.x = Math.max(0, c * 0.3) + 0.1;
        foreArmRGroup.rotation.x = Math.max(0, -c * 0.3) + 0.1;
        legLGroup.rotation.x = c * 0.55;
        legRGroup.rotation.x = -c * 0.55;
        lowerLegLGroup.rotation.x = Math.max(0, -s * 0.6);
        lowerLegRGroup.rotation.x = Math.max(0, s * 0.6);
        characterPickaxeGroup.rotation.x = -c * 0.3;
      }

      function animateRun(t) {
        const speed = 5.5;
        const s = Math.sin(t * speed);
        const c = Math.cos(t * speed);
        model.position.y = Math.abs(Math.sin(t * speed * 2)) * 0.07;
        model.rotation.x = -0.12;
        headGroup.rotation.x = 0.08 + c * 0.06;
        torsoGroup.rotation.z = s * 0.06;
        torsoGroup.rotation.x = -0.1 + c * 0.04;
        armLGroup.rotation.x = c * 0.85;
        armLGroup.rotation.z = 0.25;
        armRGroup.rotation.x = -c * 0.85;
        armRGroup.rotation.z = -0.25;
        foreArmLGroup.rotation.x = Math.max(0, c * 0.5) + 0.2;
        foreArmRGroup.rotation.x = Math.max(0, -c * 0.5) + 0.2;
        legLGroup.rotation.x = c * 0.9;
        legRGroup.rotation.x = -c * 0.9;
        lowerLegLGroup.rotation.x = Math.max(0, -s * 0.9);
        lowerLegRGroup.rotation.x = Math.max(0, s * 0.9);
        characterPickaxeGroup.rotation.x = -c * 0.5;
      }

      function animateMine() {
        const progress = THREE.MathUtils.clamp(miningState.swingProgress / Math.PI, 0, 1);
        const strike = THREE.MathUtils.smoothstep(progress, 0.34, 0.74);
        const recover = THREE.MathUtils.smoothstep(progress, 0.74, 1);
        const swing = Math.sin(progress * Math.PI);
        const pose = sampleWeaponAttackPose('pickaxe', progress);

        headGroup.rotation.x = 0.05 + swing * 0.12;
        torsoGroup.rotation.x = -0.05 + swing * 0.18;
        torsoGroup.rotation.y = 0.12 - strike * 0.24 + recover * 0.12;
        applyRotationConfig(armLGroup, pose.upperArm.rotation);
        applyRotationConfig(foreArmLGroup, pose.forearm.rotation);
        applyTransformConfig(characterPickaxeGroup, pose.grip);
        if (characterPickaxeModel && pose.model) applyTransformConfig(characterPickaxeModel, pose.model);
        armRGroup.rotation.x = 0.08 + swing * 0.06;
        armRGroup.rotation.z = -0.18;
        foreArmRGroup.rotation.x = 0.14 + swing * 0.05;
        legLGroup.rotation.x = 0.08;
        legRGroup.rotation.x = -0.08;
        lowerLegLGroup.rotation.x = 0.1;
        lowerLegRGroup.rotation.x = 0.1;
      }

      function animatePickup(t) {
        const d = Math.sin(t * 2);
        const bend = Math.max(0, d) * 0.4;
        torsoGroup.rotation.x = bend;
        headGroup.rotation.x = bend * 0.5;
        armRGroup.rotation.x = 0.3 + bend;
        armRGroup.rotation.z = -0.2 - bend * 0.2;
        foreArmRGroup.rotation.x = 0.4 + bend * 0.5;
        armLGroup.rotation.x = 0.2 + bend * 0.5;
        armLGroup.rotation.z = 0.3;
        foreArmLGroup.rotation.x = 0.3 + bend * 0.4;
        legLGroup.rotation.x = bend * 0.2;
        lowerLegLGroup.rotation.x = 0.1 + bend * 0.3;
        lowerLegRGroup.rotation.x = 0.1;
      }

      function animateSwordAttack() {
        const progress = THREE.MathUtils.clamp(1 - combatState.attackTimer / combatState.attackDuration, 0, 1);
        const swing = Math.sin(progress * Math.PI);
        const raise = THREE.MathUtils.smoothstep(progress, 0, 0.2);
        const cut = THREE.MathUtils.smoothstep(progress, 0.2, 0.58);
        const recover = THREE.MathUtils.smoothstep(progress, 0.62, 1);
        const swordIdleGrip = weaponDevConfig.sword.grip;

        const upperArmPrep = { x: -2.16, y: -0.2, z: -0.78 };
        const upperArmImpact = { x: -0.56, y: 0.18, z: 0.58 };
        const forearmPrep = { x: 0.18, y: -0.08, z: -0.08 };
        const forearmImpact = { x: 0.82, y: 0.08, z: 0.16 };
        const gripPrep = {
          position: {
            x: swordIdleGrip.position.x,
            y: swordIdleGrip.position.y + 0.012,
            z: swordIdleGrip.position.z,
          },
          rotation: { x: -0.12, y: 0.14, z: Math.PI - 0.72 },
          scale: swordIdleGrip.scale,
        };
        const gripImpact = {
          position: {
            x: swordIdleGrip.position.x,
            y: swordIdleGrip.position.y - 0.008,
            z: swordIdleGrip.position.z,
          },
          rotation: { x: 0.28, y: 0.2, z: Math.PI + 0.7 },
          scale: swordIdleGrip.scale,
        };
        const prepToImpact = {
          upperArm: { rotation: lerpVectorConfig(upperArmPrep, upperArmImpact, cut) },
          forearm: { rotation: lerpVectorConfig(forearmPrep, forearmImpact, cut) },
          grip: lerpTransformConfig(gripPrep, gripImpact, cut),
        };
        const pose = {
          upperArm: {
            rotation: {
              x: lerpConfig(prepToImpact.upperArm.rotation.x, weaponDevConfig.sword.upperArmIdle.rotation.x, recover),
              y: lerpConfig(prepToImpact.upperArm.rotation.y, weaponDevConfig.sword.upperArmIdle.rotation.y, recover),
              z: lerpConfig(prepToImpact.upperArm.rotation.z, weaponDevConfig.sword.upperArmIdle.rotation.z, recover),
            },
          },
          forearm: {
            rotation: {
              x: lerpConfig(prepToImpact.forearm.rotation.x, weaponDevConfig.sword.forearmIdle.rotation.x, recover),
              y: lerpConfig(prepToImpact.forearm.rotation.y, weaponDevConfig.sword.forearmIdle.rotation.y, recover),
              z: lerpConfig(prepToImpact.forearm.rotation.z, weaponDevConfig.sword.forearmIdle.rotation.z, recover),
            },
          },
          grip: lerpTransformConfig(prepToImpact.grip, swordIdleGrip, recover),
        };

        if (progress < 0.2) {
          pose.upperArm.rotation = lerpVectorConfig(weaponDevConfig.sword.upperArmIdle.rotation, upperArmPrep, raise);
          pose.forearm.rotation = lerpVectorConfig(weaponDevConfig.sword.forearmIdle.rotation, forearmPrep, raise);
          pose.grip = lerpTransformConfig(swordIdleGrip, gripPrep, raise);
        }

        model.rotation.y = -0.18 + cut * 0.42 - recover * 0.24;
        torsoGroup.rotation.y = -0.28 + cut * 0.62 - recover * 0.34;
        torsoGroup.rotation.x = -0.06 + swing * 0.18;
        headGroup.rotation.y = -0.14 + cut * 0.3 - recover * 0.16;
        applyRotationConfig(armLGroup, pose.upperArm.rotation);
        applyRotationConfig(foreArmLGroup, pose.forearm.rotation);
        applyTransformConfig(characterSwordGroup, pose.grip);
        armRGroup.rotation.x = 0.2 - swing * 0.18;
        armRGroup.rotation.z = -0.22;
        foreArmRGroup.rotation.x = 0.22;
        legLGroup.rotation.x = 0.16;
        legRGroup.rotation.x = -0.16;

        const trailOpacity = Math.max(0, Math.sin(cut * Math.PI)) * (1 - recover * 0.7) * 0.38;
        swordTrailGroup.visible = trailOpacity > 0.035;
        swordTrailGroup.rotation.set(0, 0, -0.84 + cut * 1.68);
        swordTrailGroup.scale.set(0.82, 1.0, 1);
        swordTrailMaterials[0].opacity = trailOpacity * 0.45;
        swordTrailMaterials[1].opacity = trailOpacity * 0.8;
      }

      function animateCrossbowFire() {
        const progress = THREE.MathUtils.clamp(1 - crossbowState.shotTimer / crossbowState.shotDuration, 0, 1);
        const raise = THREE.MathUtils.smoothstep(progress, 0, 0.24);
        const fire = THREE.MathUtils.smoothstep(progress, 0.24, 0.56);
        const recover = THREE.MathUtils.smoothstep(progress, 0.56, 1);
        const recoil = Math.sin(Math.min(1, progress * 1.1) * Math.PI);
        const pose = sampleWeaponAttackPose('crossbow', progress);
        model.rotation.y = -0.08 + raise * 0.12 - recover * 0.04;
        torsoGroup.rotation.y = -0.16 + raise * 0.22 - recover * 0.06;
        torsoGroup.rotation.x = -0.05 + fire * 0.08 - recover * 0.03;
        headGroup.rotation.y = -0.08 + raise * 0.16 - recover * 0.05;
        headGroup.rotation.x = fire * 0.04;
        applyRotationConfig(armLGroup, pose.upperArm.rotation);
        applyRotationConfig(foreArmLGroup, pose.forearm.rotation);
        applyTransformConfig(characterCrossbowGroup, pose.grip);
        if (characterCrossbowModel && pose.model) {
          applyTransformConfig(characterCrossbowModel, pose.model);
          updateCrossbowLoadedVisual(characterCrossbowModel, progress);
        }
        characterCrossbowGroup.position.z -= recoil * 0.04;
        characterCrossbowGroup.position.y += recoil * 0.012;
        armRGroup.rotation.set(0.18, 0.04, -0.18);
        foreArmRGroup.rotation.set(0.3, 0, 0);
        legLGroup.rotation.x = 0.08;
        legRGroup.rotation.x = -0.08;
      }

      function applyWeaponRestPose(mode, pickaxeVisible, swordVisible, crossbowVisible) {
        if (mode === 'mine' || mode === 'attack' || mode === 'pickup' || mode === 'shoot') return;

        if (pickaxeVisible) {
          const pickaxeArm = weaponDevConfig.pickaxe.upperArmIdle.rotation;
          const pickaxeForearm = weaponDevConfig.pickaxe.forearmIdle.rotation;
          const pickaxeGrip = weaponDevConfig.pickaxe.grip.rotation;
          const sway = Math.sin(state.time * 1.8) * 0.035;
          armLGroup.rotation.x = pickaxeArm.x + sway;
          armLGroup.rotation.y = pickaxeArm.y;
          armLGroup.rotation.z = pickaxeArm.z;
          foreArmLGroup.rotation.x = pickaxeForearm.x + sway * 0.35;
          foreArmLGroup.rotation.y = pickaxeForearm.y;
          foreArmLGroup.rotation.z = pickaxeForearm.z;
          characterPickaxeGroup.rotation.set(pickaxeGrip.x + sway * 0.5, pickaxeGrip.y, pickaxeGrip.z);
          return;
        }

        if (swordVisible) {
          const swordArm = weaponDevConfig.sword.upperArmIdle.rotation;
          const swordForearm = weaponDevConfig.sword.forearmIdle.rotation;
          const sway = Math.sin(state.time * 1.6) * 0.025;
          armLGroup.rotation.x = swordArm.x + sway;
          armLGroup.rotation.y = swordArm.y;
          armLGroup.rotation.z = swordArm.z;
          foreArmLGroup.rotation.x = swordForearm.x;
          foreArmLGroup.rotation.y = swordForearm.y;
          foreArmLGroup.rotation.z = swordForearm.z;
          applyTransformConfig(characterSwordGroup, weaponDevConfig.sword.grip);
          characterSwordGroup.rotation.x += sway * 0.35;
          return;
        }

        if (crossbowVisible) {
          const crossbowArm = weaponDevConfig.crossbow.upperArmIdle.rotation;
          const crossbowForearm = weaponDevConfig.crossbow.forearmIdle.rotation;
          const sway = Math.sin(state.time * 1.35) * 0.022;
          armLGroup.rotation.set(crossbowArm.x + sway * 0.1, crossbowArm.y, crossbowArm.z + sway * 0.08);
          foreArmLGroup.rotation.set(crossbowForearm.x + sway * 0.04, crossbowForearm.y, crossbowForearm.z);
          armRGroup.rotation.set(0.12, 0.02, -0.16);
          foreArmRGroup.rotation.set(0.26, 0, 0);
          applyTransformConfig(characterCrossbowGroup, weaponDevConfig.crossbow.grip);
          characterCrossbowGroup.position.z -= 0.05 + sway * 0.02;
          characterCrossbowGroup.position.y += sway * 0.015;
          if (characterCrossbowModel) {
            applyTransformConfig(characterCrossbowModel, weaponDevConfig.crossbow.model);
            updateCrossbowLoadedVisual(characterCrossbowModel, 0);
          }
        }
      }

      function setSwordLevel(level) {
        if (characterSwordModel) {
          characterSwordGroup.remove(characterSwordModel);
          disposeGroup(characterSwordModel);
        }
        characterSwordModel = createGameSword(level);
        const safeLevel = THREE.MathUtils.clamp(Math.floor(Number(level)) || 1, 1, swordDefinitions.length);
        const trailColor = safeLevel >= 9 ? 0x42fff7 : safeLevel >= 7 ? 0xff7a35 : safeLevel >= 5 ? 0xffd76a : 0xcfe8ff;
        swordTrailMaterials.forEach((material) => material.color.setHex(trailColor));
        applyTransformConfig(characterSwordModel, weaponDevConfig.sword.model);
        characterSwordGroup.add(characterSwordModel);
      }

      function setPickaxeLevel(level) {
        if (characterPickaxeModel) {
          characterPickaxeGroup.remove(characterPickaxeModel);
          disposeGroup(characterPickaxeModel);
        }
        characterPickaxeModel = createGamePickaxe(level, true);
        applyTransformConfig(characterPickaxeModel, weaponDevConfig.pickaxe.model);
        characterPickaxeGroup.add(characterPickaxeModel);
      }

      function setCrossbowLevel(level = 1) {
        if (characterCrossbowModel) {
          characterCrossbowGroup.remove(characterCrossbowModel);
          disposeGroup(characterCrossbowModel);
        }
        characterCrossbowModel = createGameCrossbow(level);
        applyTransformConfig(characterCrossbowModel, weaponDevConfig.crossbow.model);
        updateCrossbowLoadedVisual(characterCrossbowModel, 0);
        characterCrossbowGroup.add(characterCrossbowModel);
      }

      function applyWeaponDevConfig() {
        applyTransformConfig(characterPickaxeGroup, weaponDevConfig.pickaxe.grip);
        applyTransformConfig(characterSwordGroup, weaponDevConfig.sword.grip);
        applyTransformConfig(characterCrossbowGroup, weaponDevConfig.crossbow.grip);
        if (characterPickaxeModel) applyTransformConfig(characterPickaxeModel, weaponDevConfig.pickaxe.model);
        if (characterSwordModel) applyTransformConfig(characterSwordModel, weaponDevConfig.sword.model);
        if (characterCrossbowModel) {
          applyTransformConfig(characterCrossbowModel, weaponDevConfig.crossbow.model);
          updateCrossbowLoadedVisual(characterCrossbowModel, 0);
        }
      }

      function getWeaponDevObjects() {
        return {
          pickaxe: {
            grip: characterPickaxeGroup,
            model: characterPickaxeModel,
            upperArm: armLGroup,
            forearm: foreArmLGroup,
          },
          sword: {
            grip: characterSwordGroup,
            model: characterSwordModel,
            upperArm: armLGroup,
            forearm: foreArmLGroup,
          },
          crossbow: {
            grip: characterCrossbowGroup,
            model: characterCrossbowModel,
            upperArm: armLGroup,
            forearm: foreArmLGroup,
          },
        };
      }

      function setHeadLampVisible(visible) {
        lampGroup.visible = !!visible;
      }

      setPickaxeLevel(playerStats.pickaxeDamage);
      setSwordLevel(playerStats.swordLevel);
      setCrossbowLevel(playerStats.crossbowLevel);
      setHeadLampVisible(hasHeadFlashlightEquipped());

      return {
        group: container,
        applyWeaponDevConfig,
        getWeaponDevObjects,
        setPickaxeLevel,
        setSwordLevel,
        setCrossbowLevel,
        setHeadLampVisible,
        update(delta, mode, pickaxeVisible, swordVisible, crossbowVisible = false) {
          if (state.mode !== mode) {
            state.mode = mode;
            state.time = 0;
          } else {
            state.time += delta;
          }

          characterPickaxeGroup.visible = pickaxeVisible && mode !== 'attack' && mode !== 'shoot';
          characterSwordGroup.visible = swordVisible || mode === 'attack';
          characterCrossbowGroup.visible = crossbowVisible || mode === 'shoot';
          if (characterPickaxeModel?.userData?.auras) {
            for (const aura of characterPickaxeModel.userData.auras) {
              aura.rotation.z += delta * (aura.userData.reverse ? -2.6 : 2.6);
            }
          }
          if (characterSwordModel?.userData?.rings) {
            for (const ring of characterSwordModel.userData.rings) {
              ring.rotation.z += delta * (ring.userData.reverse ? -2.2 : 2.2);
            }
          }
          resetPose();

          switch (mode) {
            case 'walk':
              animateWalk(state.time);
              break;
            case 'run':
              animateRun(state.time);
              break;
            case 'mine':
              animateMine();
              break;
            case 'pickup':
              animatePickup(state.time);
              break;
            case 'attack':
              animateSwordAttack();
              break;
            case 'shoot':
              animateCrossbowFire();
              break;
            default:
              animateIdle(state.time);
              break;
          }
          applyWeaponRestPose(mode, pickaxeVisible, swordVisible, crossbowVisible);
        },
      };
    }

    const minerCharacter = createMinerCharacter();
    playerRoot.add(minerCharacter.group);

    function ensureInventoryPreviewReady() {
      if (!inventoryPreviewCanvas || inventoryPreviewRenderer) return;
      inventoryPreviewRenderer = new THREE.WebGLRenderer({
        canvas: inventoryPreviewCanvas,
        alpha: true,
        antialias: true,
      });
      inventoryPreviewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      inventoryPreviewRenderer.outputColorSpace = THREE.SRGBColorSpace;
      inventoryPreviewRenderer.shadowMap.enabled = true;
      inventoryPreviewRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

      inventoryPreviewScene = new THREE.Scene();
      inventoryPreviewCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
      inventoryPreviewCamera.position.set(0.1, 1.55, 5.4);

      inventoryPreviewControls = new OrbitControls(inventoryPreviewCamera, inventoryPreviewCanvas);
      inventoryPreviewControls.enableDamping = true;
      inventoryPreviewControls.dampingFactor = 0.08;
      inventoryPreviewControls.enablePan = false;
      inventoryPreviewControls.minDistance = 3.8;
      inventoryPreviewControls.maxDistance = 8.2;
      inventoryPreviewControls.target.set(0, 1.15, 0);

      inventoryPreviewScene.add(new THREE.HemisphereLight(0xffffff, 0x41546b, 1.6));
      const previewKeyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      previewKeyLight.position.set(4.4, 6.2, 5.2);
      previewKeyLight.castShadow = true;
      inventoryPreviewScene.add(previewKeyLight);
      const previewFillLight = new THREE.DirectionalLight(0x6fa3d4, 0.55);
      previewFillLight.position.set(-4.5, 3.8, -3.4);
      inventoryPreviewScene.add(previewFillLight);

      inventoryPreviewPlatform = new THREE.Group();
      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(1.9, 2.1, 0.2, 32),
        new THREE.MeshStandardMaterial({ color: 0x252a3c, metalness: 0.45, roughness: 0.58 })
      );
      platform.position.y = -0.08;
      platform.receiveShadow = true;
      inventoryPreviewPlatform.add(platform);
      const platformGlow = new THREE.Mesh(
        new THREE.TorusGeometry(1.94, 0.04, 12, 56),
        new THREE.MeshBasicMaterial({ color: 0x4a90a4, transparent: true, opacity: 0.44 })
      );
      platformGlow.position.y = 0.03;
      platformGlow.rotation.x = Math.PI / 2;
      inventoryPreviewPlatform.add(platformGlow);
      inventoryPreviewScene.add(inventoryPreviewPlatform);

      inventoryPreviewCharacter = createMinerCharacter();
      inventoryPreviewScene.add(inventoryPreviewCharacter.group);
      inventoryPreviewCharacter.group.position.y = 0;
      inventoryPreviewCharacter.group.rotation.y = 0;
    }

    function resizeInventoryPreviewRenderer() {
      if (!inventoryPreviewRenderer || !inventoryPreviewCanvas) return;
      const width = Math.max(1, Math.floor(inventoryPreviewCanvas.clientWidth));
      const height = Math.max(1, Math.floor(inventoryPreviewCanvas.clientHeight));
      if (inventoryPreviewCanvas.width !== width || inventoryPreviewCanvas.height !== height) {
        inventoryPreviewRenderer.setSize(width, height, false);
        inventoryPreviewCamera.aspect = width / height;
        inventoryPreviewCamera.updateProjectionMatrix();
      }
    }

    function syncInventoryPreviewCharacter() {
      ensureInventoryPreviewReady();
      if (!inventoryPreviewCharacter) return;
      inventoryPreviewCharacter.setPickaxeLevel(playerStats.pickaxeDamage);
      inventoryPreviewCharacter.setSwordLevel(playerStats.swordLevel);
      inventoryPreviewCharacter.setCrossbowLevel(playerStats.crossbowLevel);
      inventoryPreviewCharacter.setHeadLampVisible(hasHeadFlashlightEquipped());
    }

    function updateInventoryPreview(delta) {
      if (!inventoryPreviewCanvas || uiState.activePanel !== 'inventory') return;
      ensureInventoryPreviewReady();
      resizeInventoryPreviewRenderer();
      syncInventoryPreviewCharacter();
      if (!inventoryPreviewRenderer || !inventoryPreviewCharacter || !inventoryPreviewControls) return;
      inventoryPreviewControls.enabled = uiState.activePanel === 'inventory';
      inventoryPreviewControls.update();
      const equippedKind = getEquippedItemKind();
      inventoryPreviewCharacter.update(
        delta,
        'idle',
        equippedKind === 'pickaxe',
        equippedKind === 'sword',
        equippedKind === 'crossbow'
      );
      if (inventoryPreviewPlatform?.children?.[1]) {
        inventoryPreviewPlatform.children[1].material.opacity = 0.34 + Math.sin(clock.elapsedTime * 2.2) * 0.08;
      }
      inventoryPreviewRenderer.render(inventoryPreviewScene, inventoryPreviewCamera);
    }

    function getWeaponDevItemConfig() {
      return weaponDevConfig[devModeState.selectedItem];
    }

    function isEditingAttackKeyframe() {
      return !devModeState.playing && devModeState.simulation === devModeState.selectedItem;
    }

    function getDevDisplayConfig() {
      const itemConfig = getWeaponDevItemConfig();
      if (!isEditingAttackKeyframe()) return itemConfig;

      const keyframe = weaponDevConfig[devModeState.selectedItem].attack.keyframes[devModeState.selectedKeyframe];
      if (!keyframe) return itemConfig;
      ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, devModeState.selectedKeyframe);

      const displayConfig = clonePlain(itemConfig);
      displayConfig.model = clonePlain(keyframe.model);
      displayConfig.grip = clonePlain(keyframe.grip);
      displayConfig.upperArmIdle = clonePlain(keyframe.upperArm);
      displayConfig.forearmIdle = clonePlain(keyframe.forearm);
      return displayConfig;
    }

    function setDevControlPathValue(path, value) {
      if (isEditingAttackKeyframe()) {
        const keyframe = weaponDevConfig[devModeState.selectedItem].attack.keyframes[devModeState.selectedKeyframe];
        ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, devModeState.selectedKeyframe);
        if (path.startsWith('model.')) {
          setPathValue(keyframe, path, value);
          return;
        }
        if (path.startsWith('grip.')) {
          setPathValue(keyframe, path, value);
          return;
        }
        if (path.startsWith('upperArmIdle.')) {
          setPathValue(keyframe, path.replace('upperArmIdle.', 'upperArm.'), value);
          return;
        }
        if (path.startsWith('forearmIdle.')) {
          setPathValue(keyframe, path.replace('forearmIdle.', 'forearm.'), value);
          return;
        }
      }

      setPathValue(getWeaponDevItemConfig(), path, value);
      mirrorIdleEditToFirstKeyframe(path, value);
    }

    function mirrorIdleEditToFirstKeyframe(path, value) {
      if (devModeState.simulation !== 'idle' || devModeState.selectedKeyframe !== 0) return;
      if (!path.startsWith('model.') && !path.startsWith('grip.') && !path.startsWith('upperArmIdle.') && !path.startsWith('forearmIdle.')) return;

      const keyframe = weaponDevConfig[devModeState.selectedItem].attack.keyframes[0];
      ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, 0);
      if (path.startsWith('model.')) {
        setPathValue(keyframe, path, value);
      } else if (path.startsWith('grip.')) {
        setPathValue(keyframe, path, value);
      } else if (path.startsWith('upperArmIdle.')) {
        setPathValue(keyframe, path.replace('upperArmIdle.', 'upperArm.'), value);
      } else if (path.startsWith('forearmIdle.')) {
        setPathValue(keyframe, path.replace('forearmIdle.', 'forearm.'), value);
      }
    }

    function setDevStatus(message) {
      devStatus.textContent = message;
    }

    function normalizeDevSection(section) {
      return DEV_SECTION_ORDER.includes(section) ? section : 'animations';
    }

    function getDevActiveWorkspace(section = devModeState.section) {
      const safeSection = normalizeDevSection(section);
      if (safeSection === 'animations') return 'weapons';
      if (safeSection === 'hitboxes') return 'hitboxes';
      return 'overview';
    }

    function isDevAnimationSection() {
      return normalizeDevSection(devModeState.section) === 'animations';
    }

    function isDevHitboxSection() {
      return normalizeDevSection(devModeState.section) === 'hitboxes';
    }

    function isDevGameplaySectionActive() {
      return DEV_GAMEPLAY_SECTIONS.has(normalizeDevSection(devModeState.section));
    }

    function getDevSectionStatusMessage(section = devModeState.section) {
      const safeSection = normalizeDevSection(section);
      if (safeSection === 'animations') {
        return 'Editor de animacoes ativo. Ajuste o item, os keyframes e clique em Salvar configuracao.';
      }
      if (safeSection === 'player') {
        return 'Valores do jogador ativos. Ajuste os numeros e salve para persistir.';
      }
      if (safeSection === 'weapons') {
        return 'Valores das armas ativos. Ajuste dano por nivel e salve para persistir.';
      }
      if (safeSection === 'monsters') {
        return 'Valores dos monstros ativos. Ajuste vida, dano e parametros do Goblin Fujao e salve.';
      }
      if (safeSection === 'ores') {
        return 'Valores dos minerios ativos. Ajuste a vida dos nodes e salve para persistir.';
      }
      if (safeSection === 'upgrades') {
        return 'Custos de upgrade ativos. Ajuste os custos por nivel e salve para persistir.';
      }
      if (safeSection === 'hitboxes') {
        return 'Editor de hitbox ativo. Ajuste a caixa 3D e clique em Salvar configuracao.';
      }
      return 'Ajuste os valores; clique em Salvar configuracao para persistir.';
    }

    function updateDevSectionNav() {
      devSectionNav?.querySelectorAll('[data-dev-section]').forEach((button) => {
        const active = button.dataset.devSection === devModeState.section;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function getSelectedMonsterDefinition() {
      const fallback = monsterDefinitions[0] ?? null;
      const selected = monsterDefinitions.find((definition) => definition.id === devModeState.selectedMonsterId) ?? fallback;
      if (selected) devModeState.selectedMonsterId = selected.id;
      return selected;
    }

    function updateDevMonsterOptions() {
      if (!devMonsterSelect) return;
      const selectedMonster = getSelectedMonsterDefinition();
      devMonsterSelect.innerHTML = '';
      for (const definition of monsterDefinitions) {
        const option = document.createElement('option');
        option.value = definition.id;
        option.textContent = definition.label;
        devMonsterSelect.append(option);
      }
      if (selectedMonster) devMonsterSelect.value = selectedMonster.id;
    }

    function updateDevWorkspaceVisibility() {
      const activeSection = normalizeDevSection(devModeState.section);
      const hitboxMode = activeSection === 'hitboxes';
      const animationMode = activeSection === 'animations';
      devWeaponWorkspace.hidden = !animationMode;
      devHitboxWorkspace.hidden = !hitboxMode;
      devGameplaySection.hidden = !isDevGameplaySectionActive();
      if (devMonsterToolbar) devMonsterToolbar.hidden = activeSection !== 'monsters';
      devBalanceSection.hidden = activeSection !== 'upgrades';
      devResetItemButton.hidden = !animationMode;
      minerCharacter.group.visible = !hitboxMode;
      devHitboxPreviewGroup.visible = hitboxMode;
      updateDevSectionNav();
    }

    function getDevHitboxConfig() {
      return getHomeHitboxConfig(devHitboxState.selectedObjectId);
    }

    function getHomeObjectDefinitionById(objectId) {
      return getHomeObjectDefinitions().find((definition) => definition.id === objectId) ?? null;
    }

    function disposeDevHitboxPreviewModel() {
      if (!devHitboxState.previewModel) return;
      devHitboxPreviewAnchor.remove(devHitboxState.previewModel);
      disposeGroup(devHitboxState.previewModel);
      devHitboxState.previewModel = null;
    }

    function createHomeObjectPreviewModel(definition) {
      if (!definition) return null;
      let visualRoot = null;
      if (definition.modelFactory) {
        visualRoot = definition.modelFactory();
        visualRoot.scale.setScalar(definition.visualScale);
        visualRoot.traverse((object) => {
          if (object.isLight && Number.isFinite(object.distance) && object.distance > 0) {
            object.userData.baseHomeBuildDistance = object.distance;
          }
        });
      } else {
        visualRoot = new THREE.Mesh(
          makeRoughBoxGeometry(definition.size.x, definition.size.y, definition.size.z, world.seed * 0.004 + definition.offsetSide),
          new THREE.MeshStandardMaterial({
            color: definition.color,
            emissive: definition.emissive,
            emissiveIntensity: 0.55,
            roughness: 0.82,
            metalness: definition.type === 'upgradeTable' ? 0.18 : 0.06,
          })
        );
        visualRoot.position.y = definition.size.y * 0.5;
        visualRoot.castShadow = true;
        visualRoot.receiveShadow = true;
      }
      applyModelShadows(visualRoot);
      return visualRoot;
    }

    function updateDevHitboxOptions() {
      const current = devHitboxState.selectedObjectId;
      devHitboxObjectSelect.innerHTML = '';
      for (const [objectId, config] of Object.entries(homeHitboxConfig ?? homeHitboxDefaults)) {
        const option = document.createElement('option');
        option.value = objectId;
        option.textContent = config.label ?? objectId;
        devHitboxObjectSelect.append(option);
      }
      devHitboxState.selectedObjectId = homeHitboxConfig?.[current] ? current : (Object.keys(homeHitboxConfig ?? homeHitboxDefaults)[0] ?? 'chest');
      devHitboxObjectSelect.value = devHitboxState.selectedObjectId;
      devHitboxTransformModeSelect.value = devHitboxState.transformMode;
    }

    function updateDevHitboxInfo() {
      const config = getDevHitboxConfig();
      if (!config) {
        devHitboxInfo.textContent = 'Nenhum hitbox selecionado.';
        return;
      }
      devHitboxInfo.textContent =
        `${config.label}: offset (${config.offset.x.toFixed(2)}, ${config.offset.y.toFixed(2)}, ${config.offset.z.toFixed(2)}) | ` +
        `tamanho (${config.size.x.toFixed(2)}, ${config.size.y.toFixed(2)}, ${config.size.z.toFixed(2)})`;
    }

    function applyHomeHitboxConfigToWorld(objectId = '') {
      for (const entry of world.homeBuildObjects) {
        if (objectId && entry.id !== objectId) continue;
        applyHomeBuildEntryTransform(entry);
      }
      if (buildModeState.enabled) updateBuildModeUi();
      updateMiningHud();
    }

    function refreshDevHitboxPreview() {
      updateDevHitboxOptions();
      disposeDevHitboxPreviewModel();
      const definition = getHomeObjectDefinitionById(devHitboxState.selectedObjectId);
      const config = getDevHitboxConfig();
      if (!definition || !config) {
        updateDevHitboxInfo();
        return;
      }

      const previewModel = createHomeObjectPreviewModel(definition);
      if (previewModel) {
        devHitboxPreviewAnchor.add(previewModel);
        devHitboxState.previewModel = previewModel;
      }
      devHitboxBox.position.set(config.offset.x, config.offset.y, config.offset.z);
      devHitboxBox.scale.set(config.size.x, config.size.y, config.size.z);
      updateDevHitboxInfo();
    }

    function resetSelectedHomeHitboxConfig() {
      const objectId = devHitboxState.selectedObjectId;
      if (!homeHitboxDefaults[objectId]) return;
      homeHitboxConfig[objectId] = clonePlain(homeHitboxDefaults[objectId]);
      refreshDevHitboxPreview();
      applyHomeHitboxConfigToWorld(objectId);
      setDevStatus(`Hitbox de ${homeHitboxConfig[objectId].label} resetado. Clique em Salvar configuracao para persistir.`);
    }

    function createDevGameplayRow(title, note, value, dataset, options = {}) {
      const row = document.createElement('label');
      row.className = 'dev-gameplay-row';

      const copy = document.createElement('span');
      const strong = document.createElement('strong');
      const small = document.createElement('small');
      strong.textContent = title;
      small.textContent = note;
      copy.append(strong, small);

      const input = document.createElement('input');
      input.type = 'number';
      input.min = String(options.min ?? 1);
      if (options.max !== undefined) input.max = String(options.max);
      input.step = String(options.step ?? 1);
      if (options.precision !== undefined) input.dataset.precision = String(options.precision);
      if (options.valueType) input.dataset.valueType = options.valueType;
      input.value = options.valueType === 'float'
        ? formatDevNumber(value, options.precision ?? 2)
        : String(value);
      Object.entries(dataset).forEach(([key, datasetValue]) => {
        input.dataset[key] = String(datasetValue);
      });

      row.append(copy, input);
      return row;
    }

    function createDevGameplayCard(title, category) {
      const card = document.createElement('section');
      card.className = 'dev-gameplay-card';
      card.dataset.devSection = category;
      const heading = document.createElement('h3');
      heading.textContent = title;
      const grid = document.createElement('div');
      grid.className = 'dev-gameplay-grid';
      card.append(heading, grid);
      return { card, grid };
    }

    function ensureGameplayMonsterConfig(monsterId) {
      const definition = monsterDefinitions.find((entry) => entry.id === monsterId);
      gameplayBalanceConfig.monsters[monsterId] ??= createDefaultMonsterBalanceEntry(definition ?? { id: monsterId, label: monsterId, health: 1, damage: 1 });
      return gameplayBalanceConfig.monsters[monsterId];
    }

    function getGameplayBalanceInputCurrentValue(input) {
      const gameplayKind = input.dataset.gameplayKind;
      if (gameplayKind === 'player') return gameplayBalanceConfig.player.maxHealth;
      if (gameplayKind === 'pickaxe') return gameplayBalanceConfig.pickaxe[String(input.dataset.level)];
      if (gameplayKind === 'sword') return gameplayBalanceConfig.sword[String(input.dataset.level)];
      if (gameplayKind === 'crossbow') return gameplayBalanceConfig.crossbow[String(input.dataset.level)];
      if (gameplayKind === 'ore') return gameplayBalanceConfig.ores[input.dataset.oreId]?.health ?? 1;
      if (gameplayKind === 'monster') return gameplayBalanceConfig.monsters[input.dataset.monsterId]?.[input.dataset.field] ?? 1;
      if (gameplayKind === 'monsterExtra') return gameplayBalanceConfig.monsters[input.dataset.monsterId]?.[input.dataset.field] ?? 0;
      if (gameplayKind === 'monsterCargoWeight') {
        return gameplayBalanceConfig.monsters[input.dataset.monsterId]?.cargoWeights?.[input.dataset.oreId] ?? 0;
      }
      return Number(input.value) || 0;
    }

    function renderDevGameplayEditor() {
      if (!devGameplayControls || !gameplayBalanceConfig) return;
      devGameplayControls.innerHTML = '';

      if (devModeState.section === 'player') {
        const playerCard = createDevGameplayCard('Jogador', 'player');
        playerCard.grid.append(
          createDevGameplayRow(
            'Vida maxima',
            'Vida total do personagem',
            gameplayBalanceConfig.player.maxHealth,
            { gameplayKind: 'player', field: 'maxHealth' }
          )
        );
        devGameplayControls.append(playerCard.card);
      }

      if (devModeState.section === 'weapons') {
        const pickaxeCard = createDevGameplayCard('Picareta: dano por nivel', 'weapons');
        for (const definition of pickaxeDefinitions) {
          pickaxeCard.grid.append(
            createDevGameplayRow(
              `Nivel ${definition.level}`,
              definition.name,
              gameplayBalanceConfig.pickaxe[String(definition.level)],
              { gameplayKind: 'pickaxe', level: definition.level }
            )
          );
        }
        devGameplayControls.append(pickaxeCard.card);

        const swordCard = createDevGameplayCard('Espada: dano por nivel', 'weapons');
        for (const definition of swordDefinitions) {
          swordCard.grid.append(
            createDevGameplayRow(
              `Nivel ${definition.level}`,
              definition.name,
              gameplayBalanceConfig.sword[String(definition.level)],
              { gameplayKind: 'sword', level: definition.level }
            )
          );
        }
        devGameplayControls.append(swordCard.card);

        const crossbowCard = createDevGameplayCard('Crossbow: dano por nivel', 'weapons');
        for (const definition of crossbowDefinitions) {
          crossbowCard.grid.append(
            createDevGameplayRow(
              `Nivel ${definition.level}`,
              definition.name,
              gameplayBalanceConfig.crossbow[String(definition.level)],
              { gameplayKind: 'crossbow', level: definition.level }
            )
          );
        }
        devGameplayControls.append(crossbowCard.card);
      }

      if (devModeState.section === 'ores') {
        const oreCard = createDevGameplayCard('Nodes de minerio: vida', 'ores');
        for (const definition of oreDefinitions) {
          oreCard.grid.append(
            createDevGameplayRow(
              definition.label,
              definition.short,
              gameplayBalanceConfig.ores[definition.id]?.health ?? definition.hits,
              { gameplayKind: 'ore', oreId: definition.id }
            )
          );
        }
        devGameplayControls.append(oreCard.card);
      }

      if (devModeState.section === 'monsters') {
        updateDevMonsterOptions();
        const definition = getSelectedMonsterDefinition();
        if (!definition) return;
        const monsterConfig = ensureGameplayMonsterConfig(definition.id);

        const monsterCard = createDevGameplayCard(`${definition.label}: propriedades`, 'monsters');
        monsterCard.grid.append(
          createDevGameplayRow(
            'Vida',
            definition.id,
            monsterConfig.health ?? definition.health,
            { gameplayKind: 'monster', monsterId: definition.id, field: 'health' }
          ),
          createDevGameplayRow(
            'Dano',
            definition.id,
            monsterConfig.damage ?? definition.damage,
            { gameplayKind: 'monster', monsterId: definition.id, field: 'damage' }
          )
        );

        if (definition.behavior === 'flee') {
          monsterCard.grid.append(
            createDevGameplayRow(
              'Velocidade de fuga',
              'Velocidade corrida ao detectar o jogador',
              monsterConfig.speed ?? definition.chaseSpeed,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'speed', valueType: 'float' },
              { min: 0.1, max: 99, step: 0.05, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Velocidade de passeio',
              'Velocidade quando nao esta fugindo',
              monsterConfig.wanderSpeed ?? definition.wanderSpeed,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'wanderSpeed', valueType: 'float' },
              { min: 0, max: 99, step: 0.05, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Raio para assustar',
              'Distancia para comecar a fugir',
              monsterConfig.fleeTriggerRange ?? definition.fleeTriggerRange,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'fleeTriggerRange', valueType: 'float' },
              { min: 0.5, max: 99, step: 0.1, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Distancia para escapar',
              'Distancia em que ele volta a ficar calmo',
              monsterConfig.fleeEscapeRange ?? definition.fleeEscapeRange,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'fleeEscapeRange', valueType: 'float' },
              { min: 1, max: 120, step: 0.1, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Memoria de fuga',
              'Tempo fugindo apos perder visao do jogador',
              monsterConfig.fleeForgetTime ?? definition.fleeForgetTime,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'fleeForgetTime', valueType: 'float' },
              { min: 0.1, max: 60, step: 0.1, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Deteccao frontal',
              'Mais alto = percebe mais facil mesmo de lado',
              monsterConfig.spotConeDot ?? definition.spotConeDot,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'spotConeDot', valueType: 'float' },
              { min: -1, max: 1, step: 0.05, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Frequencia de spawn',
              'Peso usado no sorteio de spawn',
              monsterConfig.spawnWeight ?? definition.spawnWeight,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'spawnWeight', valueType: 'float' },
              { min: 0, max: 100, step: 0.05, precision: 2, valueType: 'float' }
            ),
            createDevGameplayRow(
              'Drop minimo',
              'Minimo total de minerios nas costas',
              monsterConfig.cargoMin ?? definition.cargoMin,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'cargoMin' },
              { min: 1, max: 999, step: 1 }
            ),
            createDevGameplayRow(
              'Drop maximo',
              'Maximo total de minerios nas costas',
              monsterConfig.cargoMax ?? definition.cargoMax,
              { gameplayKind: 'monsterExtra', monsterId: definition.id, field: 'cargoMax' },
              { min: 1, max: 999, step: 1 }
            )
          );
        }

        devGameplayControls.append(monsterCard.card);

        if (definition.behavior === 'flee') {
          const cargoCard = createDevGameplayCard(`${definition.label}: pesos de drop`, 'monsters');
          for (const ore of oreDefinitions) {
            cargoCard.grid.append(
              createDevGameplayRow(
                ore.label,
                '0 remove | maior = mais comum',
                monsterConfig.cargoWeights?.[ore.id] ?? ore.rarity,
                { gameplayKind: 'monsterCargoWeight', monsterId: definition.id, oreId: ore.id, valueType: 'float' },
                { min: 0, max: 100, step: 0.05, precision: 2, valueType: 'float' }
              )
            );
          }
          devGameplayControls.append(cargoCard.card);
        }
      }
    }

    function setGameplayBalanceValue(input) {
      const min = input.min === '' ? undefined : Number(input.min);
      const max = input.max === '' ? undefined : Number(input.max);
      const precision = sanitizePositiveInteger(input.dataset.precision, 2, 0, 4);
      const valueType = input.dataset.valueType === 'float' ? 'float' : 'int';
      const value = valueType === 'float'
        ? sanitizeNumberValue(input.value, Number(input.value) || 0, Number.isFinite(min) ? min : -9999, Number.isFinite(max) ? max : 9999, precision)
        : sanitizePositiveInteger(input.value, 1, Number.isFinite(min) ? min : 1, Number.isFinite(max) ? max : 9999);

      if (input.dataset.gameplayKind === 'player') {
        gameplayBalanceConfig.player.maxHealth = value;
      } else if (input.dataset.gameplayKind === 'pickaxe') {
        gameplayBalanceConfig.pickaxe[String(input.dataset.level)] = THREE.MathUtils.clamp(value, 1, 999);
      } else if (input.dataset.gameplayKind === 'sword') {
        gameplayBalanceConfig.sword[String(input.dataset.level)] = value;
      } else if (input.dataset.gameplayKind === 'crossbow') {
        gameplayBalanceConfig.crossbow[String(input.dataset.level)] = value;
      } else if (input.dataset.gameplayKind === 'ore') {
        const oreId = input.dataset.oreId;
        gameplayBalanceConfig.ores[oreId] ??= { label: oreId, health: 1 };
        gameplayBalanceConfig.ores[oreId].health = THREE.MathUtils.clamp(value, 1, 999);
      } else if (input.dataset.gameplayKind === 'monster') {
        const monsterId = input.dataset.monsterId;
        const monsterConfig = ensureGameplayMonsterConfig(monsterId);
        monsterConfig[input.dataset.field] = value;
      } else if (input.dataset.gameplayKind === 'monsterExtra') {
        const monsterId = input.dataset.monsterId;
        const monsterConfig = ensureGameplayMonsterConfig(monsterId);
        monsterConfig[input.dataset.field] = value;
      } else if (input.dataset.gameplayKind === 'monsterCargoWeight') {
        const monsterId = input.dataset.monsterId;
        const monsterConfig = ensureGameplayMonsterConfig(monsterId);
        monsterConfig.cargoWeights ??= {};
        monsterConfig.cargoWeights[input.dataset.oreId] = value;
      }

      gameplayBalanceConfig = normalizeGameplayBalanceConfig(gameplayBalanceConfig);
      applyGameplayBalanceConfig();
      refreshResourceUi();
      updateMiningHud();
      const appliedValue = getGameplayBalanceInputCurrentValue(input);
      input.value = valueType === 'float'
        ? formatDevNumber(appliedValue, precision)
        : String(appliedValue);
      setDevStatus('Valor atualizado em tempo real. Clique em Salvar configuracao para persistir.');
    }

    function resetGameplayBalanceConfig() {
      gameplayBalanceConfig = clonePlain(gameplayBalanceDefaults);
      applyGameplayBalanceConfig();
      renderDevGameplayEditor();
      refreshResourceUi();
      updateMiningHud();
      setDevStatus('Valores do jogo resetados. Clique em Salvar configuracao para persistir.');
    }

    function getDevBalanceItemId() {
      return devBalanceItemSelect?.value || 'pickaxe';
    }

    function getDevBalanceLevel() {
      const itemId = getDevBalanceItemId();
      const level = Math.floor(Number(devBalanceLevelSelect?.value ?? 2)) || 2;
      return THREE.MathUtils.clamp(level, 2, getUpgradeBalanceMaxLevel(itemId));
    }

    function updateDevBalanceItemOptions() {
      const selectedItem = getDevBalanceItemId();
      devBalanceItemSelect.innerHTML = '';
      for (const [itemId, itemConfig] of Object.entries(upgradeBalanceConfig ?? {})) {
        const option = document.createElement('option');
        option.value = itemId;
        option.textContent = itemConfig.label ?? itemId;
        devBalanceItemSelect.append(option);
      }
      if (upgradeBalanceConfig?.[selectedItem]) devBalanceItemSelect.value = selectedItem;
      else devBalanceItemSelect.value = Object.keys(upgradeBalanceConfig ?? {})[0] ?? 'pickaxe';
    }

    function updateDevBalanceLevelOptions() {
      const itemId = getDevBalanceItemId();
      const selectedLevel = getDevBalanceLevel();
      const maxLevel = getUpgradeBalanceMaxLevel(itemId);
      devBalanceLevelSelect.innerHTML = '';
      for (let level = 2; level <= maxLevel; level++) {
        const option = document.createElement('option');
        option.value = String(level);
        option.textContent = `Nivel ${level}`;
        devBalanceLevelSelect.append(option);
      }
      devBalanceLevelSelect.value = String(THREE.MathUtils.clamp(selectedLevel, 2, maxLevel));
    }

    function renderDevBalanceEditor() {
      if (!devBalanceControls || !upgradeBalanceConfig) return;
      updateDevBalanceItemOptions();
      updateDevBalanceLevelOptions();

      const itemId = getDevBalanceItemId();
      const level = getDevBalanceLevel();
      const cost = getUpgradeBalanceCost(itemId, level);
      devBalanceControls.innerHTML = '';

      for (const ore of oreDefinitions) {
        const row = document.createElement('label');
        row.className = 'dev-balance-row';

        const label = document.createElement('span');
        const title = document.createElement('strong');
        const note = document.createElement('small');
        title.textContent = ore.label;
        note.textContent = ore.short;
        label.append(title, note);

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.step = '1';
        input.value = String(cost[ore.id] ?? 0);
        input.dataset.oreId = ore.id;

        row.append(label, input);
        devBalanceControls.append(row);
      }
    }

    function setDevBalanceCostAmount(oreId, amount) {
      const itemId = getDevBalanceItemId();
      const level = getDevBalanceLevel();
      const itemConfig = upgradeBalanceConfig[itemId];
      if (!itemConfig) return;
      const levelKey = String(level);
      itemConfig.levels[levelKey] ??= {};

      const safeAmount = Math.max(0, Math.floor(Number(amount) || 0));
      if (safeAmount > 0) itemConfig.levels[levelKey][oreId] = safeAmount;
      else delete itemConfig.levels[levelKey][oreId];

      itemConfig.levels[levelKey] = sanitizeUpgradeCost(itemConfig.levels[levelKey]);
      applyUpgradeBalanceConfig();
      refreshResourceUi();
      setDevStatus(`Custo atualizado: ${itemConfig.label} nivel ${level}. Clique em Salvar configuracao para persistir.`);
    }

    function resetSelectedDevBalanceCosts() {
      const itemId = getDevBalanceItemId();
      upgradeBalanceConfig[itemId] = clonePlain(upgradeBalanceDefaults[itemId]);
      applyUpgradeBalanceConfig();
      renderDevBalanceEditor();
      refreshResourceUi();
      setDevStatus(`Custos de ${upgradeBalanceConfig[itemId].label} resetados. Clique em Salvar configuracao para persistir.`);
    }

    function renderDevControls() {
      const itemConfig = getDevDisplayConfig();
      devControls.innerHTML = '';

      for (const section of devControlSchema) {
        const sectionElement = document.createElement('section');
        sectionElement.className = 'dev-section';

        const title = document.createElement('div');
        title.className = 'dev-section-title';
        title.textContent = section.title;
        sectionElement.append(title);

        const grid = document.createElement('div');
        grid.className = 'dev-control-grid';

        for (const [label, path, type] of section.fields) {
          const field = document.createElement('label');
          const input = document.createElement('input');
          const value = getPathValue(itemConfig, path);
          input.type = 'number';
          input.step = type === 'deg' ? '1' : type === 'scale' ? '0.01' : '0.005';
          input.value = formatDevControlValue(value, type);
          input.dataset.path = path;
          input.dataset.type = type;
          field.textContent = label;
          field.append(input);
          grid.append(field);
        }

        sectionElement.append(grid);
        devControls.append(sectionElement);
      }
    }

    function syncDevControlInputs() {
      const itemConfig = getDevDisplayConfig();
      for (const input of devControls.querySelectorAll('input[data-path]')) {
        if (document.activeElement === input) continue;
        input.value = formatDevControlValue(getPathValue(itemConfig, input.dataset.path), input.dataset.type);
      }
    }

    function applyWeaponDevConfigToCharacter() {
      minerCharacter.applyWeaponDevConfig();
    }

    function markDevProgrammaticTransform() {
      devModeState.ignoreObjectChangeUntil = performance.now() + 80;
    }

    function applyDevSelectedKeyframePose() {
      if (!isEditingAttackKeyframe()) return;
      const objects = getDevObjects();
      const keyframe = weaponDevConfig[devModeState.selectedItem].attack.keyframes[devModeState.selectedKeyframe];
      if (!objects || !keyframe) return;
      ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, devModeState.selectedKeyframe);
      markDevProgrammaticTransform();
      applyRotationConfig(objects.upperArm, keyframe.upperArm.rotation);
      applyRotationConfig(objects.forearm, keyframe.forearm.rotation);
      applyTransformConfig(objects.grip, keyframe.grip);
      if (objects.model) applyTransformConfig(objects.model, keyframe.model);
    }

    function getDevObjects() {
      return minerCharacter.getWeaponDevObjects()[devModeState.selectedItem];
    }

    function getDevTargetObject() {
      const objects = getDevObjects();
      return objects?.[devModeState.target] ?? null;
    }

    function getDevKeyframes() {
      return weaponDevConfig[devModeState.selectedItem].attack.keyframes;
    }

    function normalizeDevKeyframes(item = devModeState.selectedItem) {
      const keyframes = weaponDevConfig[item].attack.keyframes;
      keyframes.forEach((keyframe, index) => ensureAttackKeyframeConfig(item, keyframe, index));
      keyframes.sort((a, b) => a.time - b.time);
      if (keyframes.length === 1) {
        keyframes.push(clonePlain(keyframes[0]));
      }
      keyframes[0].time = 0;
      keyframes[keyframes.length - 1].time = 1;
      for (let i = 1; i < keyframes.length - 1; i++) {
        const minTime = keyframes[i - 1].time + 0.01;
        const maxTime = keyframes[i + 1].time - 0.01;
        keyframes[i].time = THREE.MathUtils.clamp(keyframes[i].time, minTime, maxTime);
      }
    }

    function updateDevKeyframeTimeInput() {
      const keyframes = getDevKeyframes();
      const selected = keyframes[devModeState.selectedKeyframe];
      const isEndpoint = devModeState.selectedKeyframe === 0 || devModeState.selectedKeyframe === keyframes.length - 1;
      devKeyframeTimeInput.value = selected ? (selected.time * 100).toFixed(0) : '0';
      devKeyframeTimeInput.disabled = isEndpoint;
      devRemoveKeyframeButton.disabled = isEndpoint || keyframes.length <= 2;
    }

    function updateDevKeyframeOptions() {
      const keyframes = getDevKeyframes();
      normalizeDevKeyframes();
      if (devModeState.selectedKeyframe >= keyframes.length) {
        devModeState.selectedKeyframe = Math.max(0, keyframes.length - 1);
      }
      devKeyframeSelect.innerHTML = '';
      keyframes.forEach((keyframe, index) => {
        const option = document.createElement('option');
        option.value = String(index);
        const name = index === 0 ? 'Inicio' : index === keyframes.length - 1 ? 'Fim' : `Ponto ${index + 1}`;
        option.textContent = `${name} | ${(keyframe.time * 100).toFixed(0)}%`;
        devKeyframeSelect.append(option);
      });
      devKeyframeSelect.value = String(devModeState.selectedKeyframe);
      updateDevKeyframeTimeInput();
    }

    function setSelectedDevKeyframeTime(percentValue) {
      const keyframes = getDevKeyframes();
      const index = devModeState.selectedKeyframe;
      if (index <= 0 || index >= keyframes.length - 1) {
        updateDevKeyframeTimeInput();
        return;
      }

      const minPercent = keyframes[index - 1].time * 100 + 1;
      const maxPercent = keyframes[index + 1].time * 100 - 1;
      const time = THREE.MathUtils.clamp((Number(percentValue) || 0) / 100, minPercent / 100, maxPercent / 100);
      keyframes[index].time = time;
      updateDevKeyframeOptions();
    }

    function addDevKeyframeFromCurrentPose() {
      const keyframes = getDevKeyframes();
      const objects = getDevObjects();
      if (!objects) return;

      const selected = THREE.MathUtils.clamp(devModeState.selectedKeyframe, 0, keyframes.length - 1);
      const next = Math.min(selected + 1, keyframes.length - 1);
      const previousTime = keyframes[selected]?.time ?? 0;
      const nextTime = keyframes[next]?.time ?? 1;
      const insertTime = selected === next
        ? THREE.MathUtils.clamp(previousTime + 0.12, 0.01, 0.99)
        : (previousTime + nextTime) / 2;
      const newKeyframe = {
        time: insertTime,
        ...clonePoseFromObjects(objects),
      };

      keyframes.push(newKeyframe);
      normalizeDevKeyframes();
      devModeState.selectedKeyframe = keyframes.indexOf(newKeyframe);
      devModeState.playing = false;
      if (devModeState.simulation === 'idle') devModeState.simulation = devModeState.selectedItem;
      updateDevModeUi();
      setDevStatus('Novo keyframe adicionado. Ajuste com o gizmo e clique em Salvar configuracao.');
    }

    function removeSelectedDevKeyframe() {
      const keyframes = getDevKeyframes();
      const index = devModeState.selectedKeyframe;
      if (keyframes.length <= 2 || index <= 0 || index >= keyframes.length - 1) {
        setDevStatus('Inicio e fim do movimento sao obrigatorios; remova apenas pontos intermediarios.');
        updateDevKeyframeTimeInput();
        return;
      }

      keyframes.splice(index, 1);
      devModeState.selectedKeyframe = Math.min(index, keyframes.length - 1);
      normalizeDevKeyframes();
      updateDevModeUi();
      setDevStatus('Keyframe removido. Clique em Salvar configuracao para persistir.');
    }

    function updateDevTransformTarget() {
      if (!devModeState.enabled || devModeState.playing) {
        devTransformControls.detach();
        devTransformControls.enabled = false;
        devTransformHelper.visible = false;
        return;
      }

      const activeWorkspace = getDevActiveWorkspace();
      if (activeWorkspace === 'hitboxes') {
        devTransformControls.setSpace('local');
        devTransformControls.setMode(devHitboxState.transformMode);
        devTransformControls.showX = true;
        devTransformControls.showY = true;
        devTransformControls.showZ = true;
        devTransformControls.attach(devHitboxBox);
        devTransformControls.enabled = true;
        devTransformHelper.visible = true;
        return;
      }

      if (!isDevAnimationSection()) {
        devTransformControls.detach();
        devTransformControls.enabled = false;
        devTransformHelper.visible = false;
        return;
      }

      const targetObject = getDevTargetObject();
      if (!targetObject) return;
      const armTarget = devModeState.target === 'upperArm' || devModeState.target === 'forearm';
      const mode = armTarget ? 'rotate' : devModeState.transformMode;
      devTransformControls.showX = true;
      devTransformControls.showY = true;
      devTransformControls.showZ = true;
      devTransformControls.setMode(mode);
      devTransformControls.attach(targetObject);
      devTransformControls.enabled = true;
      devTransformHelper.visible = true;
    }

    function updateDevModeUi() {
      devModeState.section = normalizeDevSection(devModeState.section);
      devModeState.workspace = getDevActiveWorkspace();
      devItemSelect.value = devModeState.selectedItem;
      devTargetSelect.value = devModeState.target;
      devTransformModeSelect.value = devModeState.transformMode;
      devSimulationSelect.value = devModeState.simulation;
      updateDevWorkspaceVisibility();
      markDevProgrammaticTransform();
      devTransformControls.detach();
      updateDevKeyframeOptions();
      devPlayPauseButton.textContent = devModeState.playing ? 'Pausar' : 'Play';
      if (isDevAnimationSection()) renderDevControls();
      renderDevGameplayEditor();
      renderDevBalanceEditor();
      if (getDevActiveWorkspace() === 'weapons') {
        applyWeaponDevConfigToCharacter();
      }
      if (isDevHitboxSection()) refreshDevHitboxPreview();
      if (isDevAnimationSection() && isEditingAttackKeyframe() && !devModeState.playing) {
        const preview = getDevCharacterOverride(0);
        if (preview) minerCharacter.update(0, preview.mode, preview.pickaxeVisible, preview.swordVisible, preview.crossbowVisible);
      }
      if (isDevAnimationSection()) applyDevSelectedKeyframePose();
      updateDevTransformTarget();
    }

    function syncDevConfigFromTransformTarget() {
      const activeWorkspace = getDevActiveWorkspace();
      if (activeWorkspace === 'hitboxes') {
        const config = getDevHitboxConfig();
        if (!config) return;
        config.offset = clonePositionConfig(devHitboxBox.position);
        config.size = {
          x: THREE.MathUtils.clamp(Math.abs(devHitboxBox.scale.x), 0.05, 8),
          y: THREE.MathUtils.clamp(Math.abs(devHitboxBox.scale.y), 0.05, 8),
          z: THREE.MathUtils.clamp(Math.abs(devHitboxBox.scale.z), 0.05, 8),
        };
        devHitboxBox.scale.set(config.size.x, config.size.y, config.size.z);
        updateDevHitboxInfo();
        applyHomeHitboxConfigToWorld(devHitboxState.selectedObjectId);
        return;
      }

      if (!isDevAnimationSection()) return;

      const objects = getDevObjects();
      const itemConfig = getWeaponDevItemConfig();
      if (!objects) return;
      const editingAttackFrame = !devModeState.playing && devModeState.simulation === devModeState.selectedItem;
      const keyframe = editingAttackFrame
        ? weaponDevConfig[devModeState.selectedItem].attack.keyframes[devModeState.selectedKeyframe]
        : null;
      if (keyframe) ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, devModeState.selectedKeyframe);

      if (devModeState.target === 'model') {
        if (editingAttackFrame) keyframe.model = cloneObjectTransformConfig(objects.model);
        else {
          itemConfig.model = cloneObjectTransformConfig(objects.model);
          mirrorIdleTargetToFirstKeyframe('model', itemConfig.model);
        }
      } else if (devModeState.target === 'grip') {
        if (editingAttackFrame) keyframe.grip = cloneObjectTransformConfig(objects.grip);
        else {
          itemConfig.grip = cloneObjectTransformConfig(objects.grip);
          mirrorIdleTargetToFirstKeyframe('grip', itemConfig.grip);
        }
      } else if (devModeState.target === 'upperArm') {
        if (editingAttackFrame) keyframe.upperArm.rotation = cloneRotationConfig(objects.upperArm.rotation);
        else {
          itemConfig.upperArmIdle.rotation = cloneRotationConfig(objects.upperArm.rotation);
          mirrorIdleTargetToFirstKeyframe('upperArm', itemConfig.upperArmIdle.rotation);
        }
      } else if (devModeState.target === 'forearm') {
        if (editingAttackFrame) keyframe.forearm.rotation = cloneRotationConfig(objects.forearm.rotation);
        else {
          itemConfig.forearmIdle.rotation = cloneRotationConfig(objects.forearm.rotation);
          mirrorIdleTargetToFirstKeyframe('forearm', itemConfig.forearmIdle.rotation);
        }
      }

      syncDevControlInputs();
    }

    function mirrorIdleTargetToFirstKeyframe(target, value) {
      if (devModeState.simulation !== 'idle' || devModeState.selectedKeyframe !== 0) return;
      const keyframe = weaponDevConfig[devModeState.selectedItem].attack.keyframes[0];
      ensureAttackKeyframeConfig(devModeState.selectedItem, keyframe, 0);

      if (target === 'model') keyframe.model = clonePlain(value);
      else if (target === 'grip') keyframe.grip = clonePlain(value);
      else if (target === 'upperArm') keyframe.upperArm.rotation = clonePlain(value);
      else if (target === 'forearm') keyframe.forearm.rotation = clonePlain(value);
    }

    function commitCurrentDevTransform() {
      if (!devModeState.enabled || devModeState.playing) return;
      syncDevConfigFromTransformTarget();
    }

    function clearDevSimulationState() {
      miningState.swinging = false;
      miningState.swingProgress = Math.PI;
      miningState.pendingHit = null;
      miningState.hitApplied = false;
      combatState.attackTimer = 0;
      combatState.attackHitDone = false;
      crossbowState.holdActive = false;
      crossbowState.shotTimer = 0;
    }

    function clearDevCameraState() {
      devCameraState.forward = false;
      devCameraState.backward = false;
      devCameraState.left = false;
      devCameraState.right = false;
      devCameraState.up = false;
      devCameraState.down = false;
      devCameraState.zoomIn = false;
      devCameraState.zoomOut = false;
      devCameraState.fast = false;
    }

    function clearDevStudioCameraDrag() {
      devStudioCameraState.dragging = false;
      devStudioCameraState.dragMode = '';
      devStudioCameraState.pointerId = null;
    }

    function clampDevStudioPitch(value) {
      return THREE.MathUtils.clamp(value, -Math.PI / 2 + 0.05, Math.PI / 2 - 0.05);
    }

    function syncDevStudioCameraAngles() {
      devCameraView.subVectors(camera.position, devStudioCameraState.target);
      const distance = Math.max(devStudioCameraState.minDistance, devCameraView.length());
      const horizontal = Math.max(0.0001, Math.hypot(devCameraView.x, devCameraView.z));
      devStudioCameraState.distance = THREE.MathUtils.clamp(distance, devStudioCameraState.minDistance, devStudioCameraState.maxDistance);
      devStudioCameraState.yaw = Math.atan2(devCameraView.x, devCameraView.z);
      devStudioCameraState.pitch = clampDevStudioPitch(Math.atan2(devCameraView.y, horizontal));
    }

    function applyDevStudioCamera() {
      const pitch = clampDevStudioPitch(devStudioCameraState.pitch);
      const distance = THREE.MathUtils.clamp(devStudioCameraState.distance, devStudioCameraState.minDistance, devStudioCameraState.maxDistance);
      const cosPitch = Math.cos(pitch);
      camera.position.set(
        devStudioCameraState.target.x + Math.sin(devStudioCameraState.yaw) * cosPitch * distance,
        devStudioCameraState.target.y + Math.sin(pitch) * distance,
        devStudioCameraState.target.z + Math.cos(devStudioCameraState.yaw) * cosPitch * distance
      );
      camera.lookAt(devStudioCameraState.target);
    }

    function resetDevStudioCamera() {
      if (isDevHitboxSection()) {
        const config = getDevHitboxConfig();
        const focus = config
          ? new THREE.Vector3(config.offset.x, config.offset.y, config.offset.z)
          : new THREE.Vector3(0, 0.9, 0);
        devStudioCameraState.target.copy(focus);
        camera.position.set(focus.x + 0.72, focus.y + 0.9, focus.z + 2.7);
      } else {
        devStudioCameraState.target.set(0, 0.98, 0);
        camera.position.set(0.35, 1.15, 3.2);
      }
      syncDevStudioCameraAngles();
      applyDevStudioCamera();
    }

    function panDevStudioCamera(deltaX, deltaY) {
      camera.getWorldDirection(devCameraForward);
      devCameraRight.crossVectors(devCameraForward, up).normalize();
      devCameraUp.crossVectors(devCameraRight, devCameraForward).normalize();
      const panScale = Math.max(0.0012, devStudioCameraState.distance * 0.0015);
      devStudioCameraState.target.addScaledVector(devCameraRight, -deltaX * panScale);
      devStudioCameraState.target.addScaledVector(devCameraUp, -deltaY * panScale);
      applyDevStudioCamera();
    }

    function orbitDevStudioCamera(deltaX, deltaY) {
      devStudioCameraState.yaw -= deltaX * 0.0085;
      devStudioCameraState.pitch = clampDevStudioPitch(devStudioCameraState.pitch + deltaY * 0.0075);
      applyDevStudioCamera();
    }

    function zoomDevStudioCamera(deltaAmount) {
      const factor = Math.exp(deltaAmount * 0.0012);
      devStudioCameraState.distance = THREE.MathUtils.clamp(
        devStudioCameraState.distance * factor,
        devStudioCameraState.minDistance,
        devStudioCameraState.maxDistance
      );
      applyDevStudioCamera();
    }

    function updateDevCameraNavigation(delta) {
      if (!devModeState.enabled) return;

      const moveInputX = (devCameraState.right ? 1 : 0) - (devCameraState.left ? 1 : 0);
      const moveInputZ = (devCameraState.forward ? 1 : 0) - (devCameraState.backward ? 1 : 0);
      const moveInputY = (devCameraState.up ? 1 : 0) - (devCameraState.down ? 1 : 0);
      const zoomInput = (devCameraState.zoomOut ? 1 : 0) - (devCameraState.zoomIn ? 1 : 0);
      const moveSpeed = delta * (devCameraState.fast ? 7.8 : 4.2) * Math.max(0.65, devStudioCameraState.distance * 0.75);

      if (moveInputX || moveInputY || moveInputZ) {
        camera.getWorldDirection(devCameraForward);
        devCameraForward.y = 0;
        if (devCameraForward.lengthSq() < 0.0001) devCameraForward.set(0, 0, -1);
        else devCameraForward.normalize();
        devCameraRight.crossVectors(devCameraForward, up).normalize();

        devCameraOffset.set(0, 0, 0);
        if (moveInputZ) devCameraOffset.addScaledVector(devCameraForward, moveInputZ);
        if (moveInputX) devCameraOffset.addScaledVector(devCameraRight, moveInputX);
        devCameraOffset.y += moveInputY;
        if (devCameraOffset.lengthSq() > 0.0001) {
          devCameraOffset.normalize().multiplyScalar(moveSpeed);
          devStudioCameraState.target.add(devCameraOffset);
          applyDevStudioCamera();
        }
      }

      if (zoomInput) {
        zoomDevStudioCamera(zoomInput * delta * (devCameraState.fast ? 900 : 520));
      }
    }

    function isPointerOverDevUi(target) {
      return Boolean(target?.closest?.('#devPanel'));
    }

    function beginDevStudioPointerDrag(event) {
      if (!devModeState.enabled || devModeState.transformDragging) return;
      if (isPointerOverDevUi(event.target)) return;
      if (devTransformControls.axis) return;

      let dragMode = '';
      if (event.button === 0) dragMode = event.shiftKey ? 'pan' : 'orbit';
      else if (event.button === 1 || event.button === 2) dragMode = 'pan';
      if (!dragMode) return;

      devStudioCameraState.dragging = true;
      devStudioCameraState.dragMode = dragMode;
      devStudioCameraState.pointerId = event.pointerId;
      devStudioCameraState.lastX = event.clientX;
      devStudioCameraState.lastY = event.clientY;
      renderer.domElement.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    }

    function updateDevStudioPointerDrag(event) {
      if (!devStudioCameraState.dragging || event.pointerId !== devStudioCameraState.pointerId) return;

      const deltaX = event.clientX - devStudioCameraState.lastX;
      const deltaY = event.clientY - devStudioCameraState.lastY;
      devStudioCameraState.lastX = event.clientX;
      devStudioCameraState.lastY = event.clientY;

      if (devStudioCameraState.dragMode === 'orbit') orbitDevStudioCamera(deltaX, deltaY);
      else if (devStudioCameraState.dragMode === 'pan') panDevStudioCamera(deltaX, deltaY);
      event.preventDefault();
    }

    function endDevStudioPointerDrag(event) {
      if (!devStudioCameraState.dragging || event.pointerId !== devStudioCameraState.pointerId) return;
      renderer.domElement.releasePointerCapture?.(event.pointerId);
      clearDevStudioCameraDrag();
      event.preventDefault();
    }

    function enterDevStudio() {
      devModeState.snapshot = {
        background: scene.background?.clone?.() ?? scene.background,
        fog: scene.fog,
        worldVisible: world.group.visible,
        playerPosition: playerRoot.position.clone(),
        playerRotation: playerRoot.rotation.clone(),
        cameraPivotPosition: cameraPivot.position.clone(),
        cameraPivotRotation: cameraPivot.rotation.clone(),
        cameraPosition: camera.position.clone(),
        cameraRotation: camera.rotation.clone(),
        lookYaw: lookState.yaw,
        lookPitch: lookState.pitch,
      };

      world.group.visible = false;
      devStudioGroup.visible = true;
      scene.background = new THREE.Color(0xffffff);
      scene.fog = null;
      playerRoot.position.set(0, 0, 0);
      playerRoot.rotation.set(0, Math.PI, 0);
      cameraPivot.position.set(0, 0, 0);
      cameraPivot.rotation.set(0, 0, 0);
      clearDevCameraState();
      clearDevStudioCameraDrag();
      resetDevStudioCamera();
      devOrbitControls.enabled = false;
    }

    function exitDevStudio() {
      const snapshot = devModeState.snapshot;
      if (!snapshot) return;

      world.group.visible = snapshot.worldVisible;
      devStudioGroup.visible = false;
      scene.background = snapshot.background;
      scene.fog = snapshot.fog;
      playerRoot.position.copy(snapshot.playerPosition);
      playerRoot.rotation.copy(snapshot.playerRotation);
      cameraPivot.position.copy(snapshot.cameraPivotPosition);
      cameraPivot.rotation.copy(snapshot.cameraPivotRotation);
      camera.position.copy(snapshot.cameraPosition);
      camera.rotation.copy(snapshot.cameraRotation);
      lookState.yaw = snapshot.lookYaw;
      lookState.pitch = snapshot.lookPitch;
      clearDevCameraState();
      clearDevStudioCameraDrag();
      devOrbitControls.enabled = false;
      devTransformControls.detach();
      devTransformControls.enabled = false;
      devTransformHelper.visible = false;
      minerCharacter.group.visible = true;
      devHitboxPreviewGroup.visible = false;
      devModeState.snapshot = null;
      applyLook();
    }

    function setDevModeEnabled(enabled) {
      if (devModeState.enabled === enabled) return;
      devModeState.enabled = enabled;
      devModeState.simulationTime = 0;

      if (enabled) {
        if (devModeState.simulation === 'idle') devModeState.simulation = devModeState.selectedItem;
        if (uiState.activePanel) setActivePanel(null);
        if (itemState.mapOpen) toggleBigMap();
        clearMovementState();
        resetMobileControls();
        miningState.holdActive = false;
        combatState.holdActive = false;
        crossbowState.holdActive = false;
        crossbowState.shotTimer = 0;
        if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
        itemState.gameActive = false;
        enterDevStudio();
        document.body.classList.add('dev-mode');
        devPanel.classList.add('visible');
        devPanel.setAttribute('aria-hidden', 'false');
        updateDevModeUi();
        setDevStatus(getDevSectionStatusMessage());
      } else {
        document.body.classList.remove('dev-mode');
        devPanel.classList.remove('visible');
        devPanel.setAttribute('aria-hidden', 'true');
        clearDevSimulationState();
        exitDevStudio();
        itemState.gameActive = true;
        queuePointerRecapture();
        updateMiningHud();
      }

      updateModeChip();
    }

    function toggleDevMode() {
      setDevModeEnabled(!devModeState.enabled);
    }

    function clearBuildCameraInputState() {
      buildCameraInputState.forward = false;
      buildCameraInputState.backward = false;
      buildCameraInputState.left = false;
      buildCameraInputState.right = false;
      buildCameraInputState.up = false;
      buildCameraInputState.down = false;
      buildCameraInputState.zoomIn = false;
      buildCameraInputState.zoomOut = false;
      buildCameraInputState.fast = false;
    }

    function clearBuildCameraDrag() {
      buildCameraState.dragging = false;
      buildCameraState.dragMode = '';
      buildCameraState.pointerId = null;
    }

    function focusBuildCameraOnEntry(entry, { snapDistance = false } = {}) {
      if (!entry) return;
      getHomeBuildFocusPoint(entry, buildFocusVector);
      buildCameraState.target.copy(buildFocusVector);
      if (snapDistance) {
        const hitbox = getHomeHitboxConfig(entry.id) ?? homeHitboxDefaults[entry.id];
        const largestSize = hitbox ? Math.max(hitbox.size.x, hitbox.size.y, hitbox.size.z) * entry.placement.scale : 1.4;
        buildCameraState.distance = THREE.MathUtils.clamp(largestSize * 2.6, buildCameraState.minDistance, buildCameraState.maxDistance);
      }
      applyBuildCamera();
    }

    function focusBuildCameraOnSelection(options) {
      focusBuildCameraOnEntry(getSelectedHomeBuildObject(), options);
    }

    function isBuildRotationCameraLockActive() {
      return false;
    }

    function updateBuildLightingState() {
      buildLightGroup.visible = buildModeState.enabled && buildModeState.fullBright;
      buildLightingButton.classList.toggle('active', buildModeState.fullBright);
      buildLightingButton.textContent = buildModeState.fullBright ? 'Luz total: ligada' : 'Luz total: desligada';
    }

    function syncBuildCameraAngles() {
      devCameraView.subVectors(camera.position, buildCameraState.target);
      const distance = Math.max(buildCameraState.minDistance, devCameraView.length());
      const horizontal = Math.max(0.0001, Math.hypot(devCameraView.x, devCameraView.z));
      buildCameraState.distance = THREE.MathUtils.clamp(distance, buildCameraState.minDistance, buildCameraState.maxDistance);
      buildCameraState.yaw = Math.atan2(devCameraView.x, devCameraView.z);
      buildCameraState.pitch = clampDevStudioPitch(Math.atan2(devCameraView.y, horizontal));
    }

    function applyBuildCamera() {
      const pitch = clampDevStudioPitch(buildCameraState.pitch);
      const distance = THREE.MathUtils.clamp(buildCameraState.distance, buildCameraState.minDistance, buildCameraState.maxDistance);
      const cosPitch = Math.cos(pitch);
      camera.position.set(
        buildCameraState.target.x + Math.sin(buildCameraState.yaw) * cosPitch * distance,
        buildCameraState.target.y + Math.sin(pitch) * distance,
        buildCameraState.target.z + Math.cos(buildCameraState.yaw) * cosPitch * distance
      );
      camera.lookAt(buildCameraState.target);
    }

    function resetBuildCamera() {
      const selectedEntry = getSelectedHomeBuildObject();
      if (selectedEntry) {
        const focusPoint = getHomeBuildFocusPoint(selectedEntry, buildFocusVector);
        buildCameraState.target.copy(focusPoint);
        camera.position.set(focusPoint.x + 0.92, focusPoint.y + 1.46, focusPoint.z + 3.3);
      } else {
        const floor = floorHeightAt(world.spawn.x, world.spawn.z);
        buildCameraState.target.set(world.spawn.x, floor + 1.08, world.spawn.z);
        camera.position.set(world.spawn.x + 0.6, floor + 3.25, world.spawn.z + 7.1);
      }
      syncBuildCameraAngles();
      applyBuildCamera();
    }

    function panBuildCamera(deltaX, deltaY) {
      camera.getWorldDirection(devCameraForward);
      devCameraRight.crossVectors(devCameraForward, up).normalize();
      devCameraUp.crossVectors(devCameraRight, devCameraForward).normalize();
      const panScale = Math.max(0.0012, buildCameraState.distance * 0.0017);
      buildCameraState.target.addScaledVector(devCameraRight, -deltaX * panScale);
      buildCameraState.target.addScaledVector(devCameraUp, -deltaY * panScale);
      applyBuildCamera();
    }

    function orbitBuildCamera(deltaX, deltaY) {
      buildCameraState.yaw -= deltaX * 0.0085;
      buildCameraState.pitch = clampDevStudioPitch(buildCameraState.pitch + deltaY * 0.0075);
      applyBuildCamera();
    }

    function zoomBuildCamera(deltaAmount) {
      if (getSelectedHomeBuildObject()) {
        getHomeBuildFocusPoint(getSelectedHomeBuildObject(), buildFocusVector);
        buildCameraState.target.copy(buildFocusVector);
      }
      const factor = Math.exp(deltaAmount * 0.0016);
      buildCameraState.distance = THREE.MathUtils.clamp(
        buildCameraState.distance * factor,
        buildCameraState.minDistance,
        buildCameraState.maxDistance
      );
      applyBuildCamera();
    }

    function updateBuildCameraNavigation(delta) {
      if (!buildModeState.enabled) return;
      if (isBuildRotationCameraLockActive()) return;

      const moveInputX = (buildCameraInputState.right ? 1 : 0) - (buildCameraInputState.left ? 1 : 0);
      const moveInputZ = (buildCameraInputState.forward ? 1 : 0) - (buildCameraInputState.backward ? 1 : 0);
      const moveInputY = (buildCameraInputState.up ? 1 : 0) - (buildCameraInputState.down ? 1 : 0);
      const zoomInput = (buildCameraInputState.zoomOut ? 1 : 0) - (buildCameraInputState.zoomIn ? 1 : 0);
      const moveSpeed = delta * (buildCameraInputState.fast ? 8.6 : 4.8) * Math.max(0.75, buildCameraState.distance * 0.72);

      if (moveInputX || moveInputY || moveInputZ) {
        camera.getWorldDirection(devCameraForward);
        devCameraForward.y = 0;
        if (devCameraForward.lengthSq() < 0.0001) devCameraForward.set(0, 0, -1);
        else devCameraForward.normalize();
        devCameraRight.crossVectors(devCameraForward, up).normalize();

        devCameraOffset.set(0, 0, 0);
        if (moveInputZ) devCameraOffset.addScaledVector(devCameraForward, moveInputZ);
        if (moveInputX) devCameraOffset.addScaledVector(devCameraRight, moveInputX);
        devCameraOffset.y += moveInputY;
        if (devCameraOffset.lengthSq() > 0.0001) {
          devCameraOffset.normalize().multiplyScalar(moveSpeed);
          buildCameraState.target.add(devCameraOffset);
          applyBuildCamera();
        }
      }

      if (zoomInput) {
        zoomBuildCamera(zoomInput * delta * (buildCameraInputState.fast ? 900 : 520));
      }
    }

    function isPointerOverBuildUi(target) {
      return Boolean(target?.closest?.('#buildPanel'));
    }

    function beginBuildPointerDrag(event) {
      if (!buildModeState.enabled || buildModeState.transformDragging) return;
      if (isPointerOverBuildUi(event.target)) return;
      if (devTransformControls.axis) return;
      if (isBuildRotationCameraLockActive()) return;

      let dragMode = '';
      if (event.button === 0) dragMode = event.shiftKey ? 'pan' : 'orbit';
      else if (event.button === 1 || event.button === 2) dragMode = 'pan';
      if (!dragMode) return;

      if (dragMode === 'orbit') focusBuildCameraOnSelection();

      buildCameraState.dragging = true;
      buildCameraState.dragMode = dragMode;
      buildCameraState.pointerId = event.pointerId;
      buildCameraState.lastX = event.clientX;
      buildCameraState.lastY = event.clientY;
      renderer.domElement.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    }

    function updateBuildPointerDrag(event) {
      if (!buildCameraState.dragging || event.pointerId !== buildCameraState.pointerId) return;
      const deltaX = event.clientX - buildCameraState.lastX;
      const deltaY = event.clientY - buildCameraState.lastY;
      buildCameraState.lastX = event.clientX;
      buildCameraState.lastY = event.clientY;
      if (buildCameraState.dragMode === 'orbit') orbitBuildCamera(deltaX, deltaY);
      else if (buildCameraState.dragMode === 'pan') panBuildCamera(deltaX, deltaY);
      event.preventDefault();
    }

    function endBuildPointerDrag(event) {
      if (!buildCameraState.dragging || event.pointerId !== buildCameraState.pointerId) return;
      renderer.domElement.releasePointerCapture?.(event.pointerId);
      clearBuildCameraDrag();
      event.preventDefault();
    }

    function getSelectedHomeBuildObject() {
      return getHomeBuildObjectById(buildModeState.selectedObjectId);
    }

    function normalizeDegrees(value) {
      let degrees = Number(value) || 0;
      degrees = ((degrees + 180) % 360 + 360) % 360 - 180;
      return degrees;
    }

    function updateBuildSliderUi() {
      const entry = getSelectedHomeBuildObject();
      const hasEntry = Boolean(entry);
      buildRotationSlider.disabled = !hasEntry;
      buildScaleSlider.disabled = !hasEntry;
      if (!hasEntry) {
        buildRotationSlider.value = '0';
        buildScaleSlider.value = '100';
        buildRotationValue.textContent = '0°';
        buildScaleValue.textContent = '100%';
        return;
      }

      const rotationDegrees = normalizeDegrees(THREE.MathUtils.radToDeg(entry.placement.rotationY));
      const scalePercent = Math.round(entry.placement.scale * 100);
      buildRotationSlider.value = String(rotationDegrees);
      buildScaleSlider.value = String(scalePercent);
      buildRotationValue.textContent = `${Math.round(rotationDegrees)}°`;
      buildScaleValue.textContent = `${scalePercent}%`;
    }

    function applyBuildRotationFromSlider(degreesValue, { persist = false } = {}) {
      const entry = getSelectedHomeBuildObject();
      if (!entry) return;
      entry.placement.rotationY = THREE.MathUtils.degToRad(normalizeDegrees(degreesValue));
      applyHomeBuildEntryTransform(entry);
      homeBuildLayoutState.placements[entry.id] = clonePlain(entry.placement);
      buildModeState.dirty = true;
      focusBuildCameraOnEntry(entry);
      updateBuildSliderUi();
      if (persist) saveGame();
    }

    function applyBuildScaleFromSlider(percentValue, { persist = false } = {}) {
      const entry = getSelectedHomeBuildObject();
      if (!entry) return;
      entry.placement.scale = THREE.MathUtils.clamp(Number(percentValue) / 100, HOME_BUILD_SCALE_MIN, HOME_BUILD_SCALE_MAX);
      applyHomeBuildEntryTransform(entry);
      homeBuildLayoutState.placements[entry.id] = clonePlain(entry.placement);
      buildModeState.dirty = true;
      focusBuildCameraOnEntry(entry);
      updateBuildSliderUi();
      if (persist) saveGame();
    }

    function updateBuildTransformTarget() {
      if (!buildModeState.enabled) return;
      const entry = getSelectedHomeBuildObject();
      buildMoveButton.classList.toggle('active', buildModeState.transformMode === 'translate');
      buildRotateButton.classList.toggle('active', buildModeState.transformMode === 'rotate');
      buildScaleButton.classList.toggle('active', buildModeState.transformMode === 'scale');
      updateBuildLightingState();

      if (!entry) {
        devTransformControls.detach();
        devTransformControls.enabled = false;
        devTransformHelper.visible = false;
        updateBuildSliderUi();
        return;
      }
      updateBuildSliderUi();

      if (buildModeState.transformMode !== 'translate') {
        devTransformControls.detach();
        devTransformControls.enabled = false;
        devTransformHelper.visible = false;
        return;
      }

      devTransformControls.setSpace('world');
      devTransformControls.setMode('translate');
      devTransformControls.size = 0.92;
      devTransformControls.showX = true;
      devTransformControls.showY = false;
      devTransformControls.showZ = true;
      devTransformControls.attach(entry.root);
      devTransformControls.enabled = true;
      devTransformHelper.visible = true;
    }

    function updateBuildModeUi() {
      buildPanel.classList.toggle('visible', buildModeState.enabled);
      buildPanel.setAttribute('aria-hidden', String(!buildModeState.enabled));
      const entry = getSelectedHomeBuildObject();
      if (entry) {
        buildSelectionInfo.textContent = `${entry.definition.label} selecionado | Mover usa gizmo | Girar e escalar usam os sliders abaixo.`;
      } else {
        buildSelectionInfo.textContent = 'Clique num item do quarto para selecionar.';
      }
      for (const object of world.homeBuildObjects) updateHomeBuildEntryVisual(object);
      updateBuildTransformTarget();
    }

    function setBuildTransformMode(mode) {
      buildModeState.transformMode = mode;
      updateBuildModeUi();
    }

    function selectHomeBuildObject(objectId) {
      buildModeState.selectedObjectId = objectId;
      updateBuildModeUi();
      if (objectId) focusBuildCameraOnSelection({ snapDistance: true });
    }

    function getBuildModeRaycastHit(clientX, clientY) {
      if (!world.homeBuildSelectables.length) return null;
      const rect = renderer.domElement.getBoundingClientRect();
      screenPointer.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.near = 0;
      raycaster.far = camera.far;
      raycaster.setFromCamera(screenPointer, camera);
      raycastHits.length = 0;
      raycaster.intersectObjects(world.homeBuildSelectables, false, raycastHits);
      return raycastHits[0] ?? null;
    }

    function handleBuildSelectionClick(event) {
      if (!buildModeState.enabled || buildModeState.transformDragging) return;
      if (isPointerOverBuildUi(event.target)) return;
      if (devTransformControls.axis) return;
      const hit = getBuildModeRaycastHit(event.clientX, event.clientY);
      if (!hit && isBuildRotationCameraLockActive()) return;
      selectHomeBuildObject(hit?.object?.userData?.homeBuildId ?? '');
    }

    function enterBuildMode() {
      buildModeState.snapshot = {
        playerPosition: playerRoot.position.clone(),
        playerRotation: playerRoot.rotation.clone(),
        cameraPivotPosition: cameraPivot.position.clone(),
        cameraPivotRotation: cameraPivot.rotation.clone(),
        cameraPosition: camera.position.clone(),
        cameraRotation: camera.rotation.clone(),
        lookYaw: lookState.yaw,
        lookPitch: lookState.pitch,
      };
      clearMovementState();
      resetMobileControls();
      clearBuildCameraInputState();
      clearBuildCameraDrag();
      const homeFloor = floorHeightAt(world.spawn.x, world.spawn.z);
      buildLightGroup.position.set(world.spawn.x, homeFloor, world.spawn.z);
      document.body.classList.add('build-mode');
      buildModeState.dirty = false;
      if (!getSelectedHomeBuildObject() && world.homeBuildObjects.length) {
        buildModeState.selectedObjectId = world.homeBuildObjects[0].id;
      }
      resetBuildCamera();
      updateBuildModeUi();
    }

    function exitBuildMode() {
      const snapshot = buildModeState.snapshot;
      devTransformControls.detach();
      devTransformControls.enabled = false;
      devTransformHelper.visible = false;
      if (snapshot) {
        playerRoot.position.copy(snapshot.playerPosition);
        playerRoot.rotation.copy(snapshot.playerRotation);
        cameraPivot.position.copy(snapshot.cameraPivotPosition);
        cameraPivot.rotation.copy(snapshot.cameraPivotRotation);
        camera.position.copy(snapshot.cameraPosition);
        camera.rotation.copy(snapshot.cameraRotation);
        lookState.yaw = snapshot.lookYaw;
        lookState.pitch = snapshot.lookPitch;
        applyLook();
      }
      buildModeState.snapshot = null;
      clearBuildCameraInputState();
      clearBuildCameraDrag();
      document.body.classList.remove('build-mode');
      buildLightGroup.visible = false;
      buildPanel.classList.remove('visible');
      buildPanel.setAttribute('aria-hidden', 'true');
      for (const object of world.homeBuildObjects) updateHomeBuildEntryVisual(object);
      if (buildModeState.dirty) {
        saveGame({ sync: true });
      }
      buildModeState.dirty = false;
    }

    function setBuildModeEnabled(enabled) {
      if (buildModeState.enabled === enabled) return;
      if (enabled) {
        if (mobileState.enabled || areaState.currentArea !== 'home') return;
        if (devModeState.enabled) setDevModeEnabled(false);
        if (uiState.activePanel) closeActivePanel();
        if (itemState.mapOpen) toggleBigMap();
        miningState.holdActive = false;
        miningState.swinging = false;
        combatState.holdActive = false;
        crossbowState.holdActive = false;
        crossbowState.shotTimer = 0;
        if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
        itemState.gameActive = false;
        buildModeState.enabled = true;
        enterBuildMode();
      } else {
        buildModeState.enabled = false;
        exitBuildMode();
        itemState.gameActive = true;
        queuePointerRecapture();
        updateMiningHud();
      }
      updateModeChip();
    }

    function toggleBuildMode() {
      setBuildModeEnabled(!buildModeState.enabled);
    }

    function getDevCharacterOverride(delta) {
      if (!devModeState.enabled) return null;

      if (devModeState.simulation === 'pickaxe') {
        const keyframes = weaponDevConfig.pickaxe.attack.keyframes;
        if (devModeState.playing) devModeState.simulationTime += delta;
        const duration = getWeaponAttackDuration('pickaxe');
        const progress = devModeState.playing
          ? (devModeState.simulationTime % duration) / duration
          : keyframes[devModeState.selectedKeyframe % keyframes.length]?.time ?? 0;
        miningState.swingProgress = progress * Math.PI;
        return { mode: 'mine', pickaxeVisible: true, swordVisible: false, crossbowVisible: false };
      }

      if (devModeState.simulation === 'sword') {
        const keyframes = weaponDevConfig.sword.attack.keyframes;
        if (devModeState.playing) devModeState.simulationTime += delta;
        combatState.attackDuration = 1;
        const cycleDuration = 1.12 / Math.max(0.05, weaponDevConfig.sword.attack.speed);
        const cycleProgress = devModeState.playing
          ? (devModeState.simulationTime % cycleDuration) / cycleDuration
          : keyframes[devModeState.selectedKeyframe % keyframes.length]?.time ?? 0;
        const progress = THREE.MathUtils.clamp(cycleProgress, 0, 1);
        combatState.attackTimer = 1 - progress;
        combatState.attackComboIndex = 0;
        return { mode: 'attack', pickaxeVisible: false, swordVisible: true, crossbowVisible: false };
      }

      if (devModeState.simulation === 'crossbow') {
        const keyframes = weaponDevConfig.crossbow.attack.keyframes;
        if (devModeState.playing) devModeState.simulationTime += delta;
        crossbowState.shotDuration = getWeaponAttackDuration('crossbow');
        const progress = devModeState.playing
          ? (devModeState.simulationTime % crossbowState.shotDuration) / crossbowState.shotDuration
          : keyframes[devModeState.selectedKeyframe % keyframes.length]?.time ?? 0;
        crossbowState.shotTimer = (1 - THREE.MathUtils.clamp(progress, 0, 1)) * crossbowState.shotDuration;
        return { mode: 'shoot', pickaxeVisible: false, swordVisible: false, crossbowVisible: true };
      }

      return {
        mode: 'idle',
        pickaxeVisible: devModeState.selectedItem === 'pickaxe',
        swordVisible: devModeState.selectedItem === 'sword',
        crossbowVisible: devModeState.selectedItem === 'crossbow',
      };
    }

    devControls.addEventListener('input', (event) => {
      const input = event.target.closest('input[data-path]');
      if (!input) return;
      const itemConfig = getWeaponDevItemConfig();
      const path = input.dataset.path;
      const type = input.dataset.type;
      const fallback = getPathValue(getDevDisplayConfig(), path);
      setDevControlPathValue(path, parseDevControlValue(input.value, type, fallback));
      if (isEditingAttackKeyframe()) {
        applyDevSelectedKeyframePose();
      } else {
        applyWeaponDevConfigToCharacter();
      }
      setDevStatus('Alteracao aplicada em tempo real. Clique em Salvar configuracao para persistir.');
    });

    devItemSelect.addEventListener('change', () => {
      commitCurrentDevTransform();
      devModeState.selectedItem = devItemSelect.value;
      if (devModeState.simulation !== 'idle') devModeState.simulation = devModeState.selectedItem;
      devModeState.simulationTime = 0;
      updateDevModeUi();
    });

    devTargetSelect.addEventListener('change', () => {
      commitCurrentDevTransform();
      devModeState.target = devTargetSelect.value;
      updateDevTransformTarget();
      setDevStatus(devModeState.target === 'upperArm' || devModeState.target === 'forearm'
        ? 'Alvo de braco usa gizmo de rotacao. Grave o keyframe se estiver criando animacao.'
        : 'Gizmo conectado ao alvo selecionado.');
    });

    devSectionNav?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-dev-section]');
      if (!button) return;
      const nextSection = normalizeDevSection(button.dataset.devSection);
      if (nextSection === devModeState.section) return;
      commitCurrentDevTransform();
      devModeState.section = nextSection;
      devModeState.workspace = getDevActiveWorkspace(nextSection);
      devModeState.playing = false;
      devModeState.simulationTime = 0;
      updateDevModeUi();
      resetDevStudioCamera();
      setDevStatus(getDevSectionStatusMessage(nextSection));
    });

    devTransformModeSelect.addEventListener('change', () => {
      commitCurrentDevTransform();
      devModeState.transformMode = devTransformModeSelect.value;
      updateDevTransformTarget();
    });

    devSimulationSelect.addEventListener('change', () => {
      commitCurrentDevTransform();
      devModeState.simulation = devSimulationSelect.value;
      if (devModeState.simulation === 'pickaxe' || devModeState.simulation === 'sword' || devModeState.simulation === 'crossbow') {
        devModeState.selectedItem = devModeState.simulation;
      }
      devModeState.simulationTime = 0;
      clearDevSimulationState();
      updateDevModeUi();
    });

    devKeyframeSelect.addEventListener('change', () => {
      commitCurrentDevTransform();
      devModeState.selectedKeyframe = Number(devKeyframeSelect.value) || 0;
      devModeState.playing = false;
      if (devModeState.simulation === 'idle') devModeState.simulation = devModeState.selectedItem;
      devModeState.simulationTime = 0;
      updateDevModeUi();
      setDevStatus('Keyframe selecionado. Pause, ajuste com o gizmo e clique em Gravar keyframe.');
    });

    devKeyframeTimeInput.addEventListener('change', () => {
      commitCurrentDevTransform();
      setSelectedDevKeyframeTime(devKeyframeTimeInput.value);
      setDevStatus('Tempo do keyframe atualizado. Clique em Salvar configuracao para persistir.');
    });

    devPlayPauseButton.addEventListener('click', () => {
      commitCurrentDevTransform();
      if (devModeState.simulation === 'idle') devModeState.simulation = devModeState.selectedItem;
      devModeState.playing = !devModeState.playing;
      devModeState.simulationTime = 0;
      updateDevModeUi();
    });

    devCaptureKeyframeButton.addEventListener('click', () => {
      const objects = getDevObjects();
      setAttackKeyframe(devModeState.selectedItem, devModeState.selectedKeyframe, clonePoseFromObjects(objects));
      devModeState.playing = false;
      updateDevModeUi();
      setDevStatus('Keyframe gravado. Clique em Play para testar ou Salvar configuracao para persistir.');
    });

    devAddKeyframeButton.addEventListener('click', addDevKeyframeFromCurrentPose);

    devRemoveKeyframeButton.addEventListener('click', removeSelectedDevKeyframe);

    devBalanceItemSelect.addEventListener('change', () => {
      renderDevBalanceEditor();
      setDevStatus('Selecione o nivel e ajuste os custos. Clique em Salvar configuracao para persistir.');
    });

    devBalanceLevelSelect.addEventListener('change', () => {
      renderDevBalanceEditor();
    });

    devBalanceControls.addEventListener('input', (event) => {
      const input = event.target.closest('input[data-ore-id]');
      if (!input) return;
      setDevBalanceCostAmount(input.dataset.oreId, input.value);
    });

    devBalanceResetButton.addEventListener('click', resetSelectedDevBalanceCosts);

    devGameplayControls.addEventListener('input', (event) => {
      const input = event.target.closest('input[data-gameplay-kind]');
      if (!input) return;
      setGameplayBalanceValue(input);
    });

    devMonsterSelect?.addEventListener('change', () => {
      devModeState.selectedMonsterId = devMonsterSelect.value;
      renderDevGameplayEditor();
      const selectedMonster = getSelectedMonsterDefinition();
      setDevStatus(selectedMonster
        ? `Monstro selecionado: ${selectedMonster.label}. Ajuste as propriedades e clique em Salvar configuracao para persistir.`
        : 'Selecione um monstro para editar suas propriedades.');
    });

    devGameplayResetButton.addEventListener('click', resetGameplayBalanceConfig);

    devHitboxObjectSelect.addEventListener('change', () => {
      devHitboxState.selectedObjectId = devHitboxObjectSelect.value;
      refreshDevHitboxPreview();
      updateDevTransformTarget();
      resetDevStudioCamera();
      setDevStatus('Elemento selecionado. Ajuste a caixa 3D e clique em Salvar configuracao para persistir.');
    });

    devHitboxTransformModeSelect.addEventListener('change', () => {
      devHitboxState.transformMode = devHitboxTransformModeSelect.value === 'scale' ? 'scale' : 'translate';
      updateDevTransformTarget();
    });

    devHitboxResetButton.addEventListener('click', resetSelectedHomeHitboxConfig);

    devSaveButton.addEventListener('click', () => {
      commitCurrentDevTransform();
      const weaponSaved = saveWeaponDevConfig();
      const balanceSaved = saveUpgradeBalanceConfig();
      const gameplaySaved = saveGameplayBalanceConfig();
      const hitboxSaved = saveHomeHitboxConfig();
      saveGame({ sync: true });
      const saved = weaponSaved && balanceSaved && gameplaySaved && hitboxSaved;
      setDevStatus(saved
        ? 'Configuracao salva e conferida no armazenamento persistente.'
        : 'Falha ao salvar. Veja o console do navegador para detalhes.');
    });

    devResetItemButton.addEventListener('click', () => {
      weaponDevConfig[devModeState.selectedItem] = clonePlain(weaponDevDefaults[devModeState.selectedItem]);
      updateDevModeUi();
      setDevStatus('Item resetado em tempo real. Clique em Salvar configuracao para persistir o reset.');
    });

    devResetAllButton.addEventListener('click', () => {
      weaponDevConfig = clonePlain(weaponDevDefaults);
      upgradeBalanceConfig = clonePlain(upgradeBalanceDefaults);
      gameplayBalanceConfig = clonePlain(gameplayBalanceDefaults);
      homeHitboxConfig = createDefaultHomeHitboxConfig();
      applyUpgradeBalanceConfig();
      applyGameplayBalanceConfig();
      applyHomeHitboxConfigToWorld();
      updateDevModeUi();
      refreshResourceUi();
      updateMiningHud();
      setDevStatus('Tudo resetado em tempo real, incluindo custos, valores e hitboxes. Clique em Salvar configuracao para persistir o reset.');
    });

    devCloseButton.addEventListener('click', () => {
      setDevModeEnabled(false);
    });

    buildCloseButton.addEventListener('click', () => {
      setBuildModeEnabled(false);
    });

    buildMoveButton.addEventListener('click', () => {
      setBuildTransformMode('translate');
    });

    buildRotateButton.addEventListener('click', () => {
      setBuildTransformMode('rotate');
      buildRotationSlider.focus();
    });

    buildScaleButton.addEventListener('click', () => {
      setBuildTransformMode('scale');
      buildScaleSlider.focus();
    });

    buildLightingButton.addEventListener('click', () => {
      buildModeState.fullBright = !buildModeState.fullBright;
      updateBuildLightingState();
    });

    buildRotationSlider.addEventListener('input', () => {
      applyBuildRotationFromSlider(buildRotationSlider.value);
    });

    buildRotationSlider.addEventListener('change', () => {
      applyBuildRotationFromSlider(buildRotationSlider.value, { persist: true });
    });

    buildScaleSlider.addEventListener('input', () => {
      applyBuildScaleFromSlider(buildScaleSlider.value);
    });

    buildScaleSlider.addEventListener('change', () => {
      applyBuildScaleFromSlider(buildScaleSlider.value, { persist: true });
    });

    buildResetSelectedButton.addEventListener('click', () => {
      resetHomeBuildObjectPlacement(getSelectedHomeBuildObject());
      updateBuildModeUi();
      saveGame();
    });

    buildResetAllButton.addEventListener('click', () => {
      resetAllHomeBuildPlacements();
      updateBuildModeUi();
      saveGame();
    });

    devTransformControls.addEventListener('dragging-changed', (event) => {
      if (devModeState.enabled) {
        devModeState.transformDragging = event.value;
        devOrbitControls.enabled = false;
        if (event.value) clearDevStudioCameraDrag();
        if (!event.value) {
          syncDevConfigFromTransformTarget();
          syncDevControlInputs();
        }
      }
      if (buildModeState.enabled) {
        buildModeState.transformDragging = event.value;
        if (event.value) clearBuildCameraDrag();
        if (!event.value) {
          syncHomeBuildPlacementFromRoot(getSelectedHomeBuildObject());
          updateBuildModeUi();
          saveGame();
        }
      }
    });

    devTransformControls.addEventListener('objectChange', () => {
      if (devModeState.enabled) {
        if (devModeState.playing) return;
        if (!devModeState.transformDragging && performance.now() < devModeState.ignoreObjectChangeUntil) return;
        syncDevConfigFromTransformTarget();
        setDevStatus('Gizmo aplicado em tempo real. Clique em Salvar configuracao para persistir.');
        return;
      }
      if (buildModeState.enabled) {
        syncHomeBuildPlacementFromRoot(getSelectedHomeBuildObject());
        updateBuildModeUi();
      }
    });

    renderer.domElement.addEventListener('contextmenu', (event) => {
      if (!devModeState.enabled && !buildModeState.enabled) return;
      event.preventDefault();
    });

    renderer.domElement.addEventListener('pointerdown', (event) => {
      if (devModeState.enabled) beginDevStudioPointerDrag(event);
      else if (buildModeState.enabled) beginBuildPointerDrag(event);
    });

    renderer.domElement.addEventListener('pointermove', (event) => {
      if (devModeState.enabled) updateDevStudioPointerDrag(event);
      else if (buildModeState.enabled) updateBuildPointerDrag(event);
    });

    renderer.domElement.addEventListener('pointerup', (event) => {
      if (devModeState.enabled) endDevStudioPointerDrag(event);
      else if (buildModeState.enabled) endBuildPointerDrag(event);
    });

    renderer.domElement.addEventListener('pointercancel', (event) => {
      if (devModeState.enabled) endDevStudioPointerDrag(event);
      else if (buildModeState.enabled) endBuildPointerDrag(event);
    });

    renderer.domElement.addEventListener('wheel', (event) => {
      if (devModeState.enabled) {
        if (devModeState.transformDragging) return;
        if (isPointerOverDevUi(event.target)) return;
        zoomDevStudioCamera(event.deltaY);
        event.preventDefault();
        return;
      }
      if (buildModeState.enabled) {
        if (buildModeState.transformDragging) return;
        if (isPointerOverBuildUi(event.target)) return;
        if (isBuildRotationCameraLockActive()) return;
        zoomBuildCamera(event.deltaY);
        event.preventDefault();
      }
    }, { passive: false });

    renderer.domElement.addEventListener('dblclick', (event) => {
      if (devModeState.enabled) {
        if (isPointerOverDevUi(event.target)) return;
        resetDevStudioCamera();
        setDevStatus('Camera do estudio centralizada no personagem.');
        event.preventDefault();
        return;
      }
      if (buildModeState.enabled) {
        if (isPointerOverBuildUi(event.target)) return;
        if (isBuildRotationCameraLockActive()) return;
        resetBuildCamera();
        event.preventDefault();
      }
    });

    const characterAnimState = {
      collectTimer: 0,
    };

    function clampPitch(value) {
      const limit = Math.PI / 2 - 0.2;
      return THREE.MathUtils.clamp(value, -limit, limit);
    }

    function applyLook() {
      playerRoot.rotation.y = lookState.yaw;
      cameraPivot.rotation.order = 'YXZ';
      cameraPivot.rotation.x = lookState.pitch;
      cameraPivot.rotation.y = 0;
      cameraPivot.rotation.z = 0;
      camera.rotation.set(0, 0, 0);
    }

    function updateControlChip() {
      if (mobileState.enabled) {
        controlChip.innerHTML = '<span class="muted">Controles:</span> move | olha | acao | inv | mapa';
        return;
      }
      controlChip.innerHTML = '<span class="muted">Controles:</span> WASD | mouse | Shift | Espaco | L | 1/2/3 | clique/segurar | E | I | M';
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
        '#mobileInventoryButton, #mobileActionButton, #mobileRightPad, #hotbar, #minimapShell, #minimapLabel, #bigMap, #devPanel, .modal-window, .modal-header, .modal-toolbar, .panel-close-button'
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
        if (document.pointerLockElement === renderer.domElement) {
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
      if (devModeState.enabled) {
        modeChip.textContent = 'Modo: desenvolvedor F2';
        return;
      }
      if (buildModeState.enabled) {
        modeChip.textContent = 'Modo: construcao C';
        return;
      }
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
      if (uiState.activePanel === 'options') {
        modeChip.textContent = 'Modo: menu de opcoes';
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
      if (!renderer.domElement.requestPointerLock) {
        lookState.lastPointerError = 'API de pointer lock indisponivel';
        lookState.fallbackOnly = true;
        lookState.pointerLockPending = false;
        updateModeChip();
        return false;
      }

      try {
        lookState.lastPointerError = '';
        lookState.pointerLockPending = true;
        lookState.lastRequestAt = performance.now();
        renderer.domElement.requestPointerLock();
        return true;
      } catch (error) {
        lookState.lastPointerError = error?.message || 'Pointer lock bloqueado';
        lookState.pointerLockPending = false;
        updateModeChip();
        return false;
      }
    }

    function canRecapturePointerLock() {
      return (
        lookState.preferPointerLock
        && !lookState.fallbackOnly
        && !mobileState.enabled
        && itemState.gameActive
        && !itemState.inventoryOpen
        && !itemState.mapOpen
        && !devModeState.enabled
        && !buildModeState.enabled
      );
    }

    function queuePointerRecapture() {
      if (!lookState.preferPointerLock) return;
      lookState.recaptureQueued = true;
    }

    function maybeRecapturePointerLock() {
      if (!canRecapturePointerLock() || lookState.pointerLockActive || lookState.pointerLockPending) return false;
      const now = performance.now();
      if (now - lookState.lastRequestAt < 120) return false;
      return tryRequestPointerLock();
    }

    document.addEventListener('pointerlockchange', () => {
      lookState.pointerLockActive = document.pointerLockElement === renderer.domElement;
      lookState.pointerLockPending = false;
      if (lookState.pointerLockActive) {
        lookState.lastPointerError = '';
        lookState.recaptureQueued = false;
      }
      updateModeChip();
    });

    document.addEventListener('pointerlockerror', () => {
      lookState.lastPointerError = 'Pointer lock bloqueado pelo ambiente';
      lookState.pointerLockPending = false;
      lookState.pointerLockActive = false;
      updateModeChip();
    });

    window.addEventListener('blur', () => {
      lookState.isDragging = false;
      if (itemState.gameActive) queuePointerRecapture();
    });

    window.addEventListener('focus', () => {
      if (itemState.gameActive) queuePointerRecapture();
    });

    document.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      if (!canRecapturePointerLock()) return;
      if (lookState.recaptureQueued || document.hasFocus()) {
        maybeRecapturePointerLock();
      }
    }, true);

    document.addEventListener('mousedown', (event) => {
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      if (event.button !== 0) return;

      const equippedKind = getEquippedItemKind();
      if (equippedKind === 'pickaxe') {
        miningState.holdActive = true;
        tryMineWithPickaxe();
      } else if (equippedKind === 'sword') {
        combatState.holdActive = true;
        tryAttackWithSword();
      } else if (equippedKind === 'crossbow') {
        crossbowState.holdActive = true;
        tryFireCrossbow();
      }

      if (!lookState.pointerLockActive && !lookState.pointerLockPending) {
        lookState.isDragging = true;
      }
    });

    document.addEventListener('mouseup', (event) => {
      if (mobileState.enabled) return;
      if (event.button === 0) miningState.holdActive = false;
      if (event.button === 0) combatState.holdActive = false;
      if (event.button === 0) crossbowState.holdActive = false;
      lookState.isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
      if (mobileState.enabled) return;
      miningState.holdActive = false;
      combatState.holdActive = false;
      lookState.isDragging = false;
    });

    document.addEventListener('mousemove', (event) => {
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      const shouldApply = lookState.pointerLockActive || lookState.isDragging;
      if (!shouldApply) return;

      const sensitivity = lookState.pointerLockActive ? lookState.sensitivity : lookState.dragSensitivity;
      applyLookDelta(event.movementX, event.movementY, sensitivity);
    });

    renderer.domElement.addEventListener('mouseenter', (event) => {
      if (mobileState.enabled) return;
      desktopPointerState.overCanvas = true;
      updateScreenPointerFromClient(event.clientX, event.clientY);
      updateMiningHud();
    });

    renderer.domElement.addEventListener('mousemove', (event) => {
      if (mobileState.enabled || lookState.pointerLockActive) return;
      desktopPointerState.overCanvas = true;
      updateScreenPointerFromClient(event.clientX, event.clientY);
      uiState.nextMiningHudScanAt = 0;
    });

    renderer.domElement.addEventListener('mouseleave', () => {
      if (mobileState.enabled) return;
      desktopPointerState.overCanvas = false;
      uiState.hoveredObject = null;
      uiState.targetOreHit = null;
      uiState.actionState = { type: 'mine', label: 'Picareta', note: 'acao' };
      hideInteractionPrompt();
      updateMiningHud();
    });
    function updateHotbar() {
      hotbarSlots.forEach((slot, index) => {
        const item = getHotbarItem(index);
        const location = { type: 'inventory', index };
        const iconShell = slot.querySelector('.slot-icon-shell') ?? (() => {
          const shell = document.createElement('span');
          shell.className = 'slot-icon-shell';
          shell.setAttribute('aria-hidden', 'true');
          slot.insertBefore(shell, slot.querySelector('.slot-label') ?? null);
          return shell;
        })();
        const label = slot.querySelector('.slot-label') ?? (() => {
          const span = document.createElement('span');
          span.className = 'slot-label';
          slot.append(span);
          return span;
        })();
        const isDragSource = itemDragState.active && getLocationKey(itemDragState.source) === getLocationKey(location);
        const isDragTarget = itemDragState.active && getLocationKey(itemDragState.target) === getLocationKey(location);
        const canSwapHere = canPlaceItemAtLocation(itemDragState.item, location) && canPlaceItemAtLocation(item, itemDragState.source);
        slot.dataset.locationType = 'inventory';
        slot.dataset.slotIndex = String(index);
        slot.classList.toggle('selected', itemState.equippedSlot === index);
        slot.classList.toggle('slot-empty', !item);
        slot.classList.toggle('is-drag-source', isDragSource);
        slot.classList.toggle('can-drop', isDragTarget && canSwapHere);
        slot.classList.toggle('blocked-drop', isDragTarget && !canSwapHere);
        if (item) {
          iconShell.innerHTML = createItemIconMarkup(item);
          label.textContent = item.kind === 'ore'
            ? `${getItemDisplayName(item)} | x${item.amount}`
            : `${getItemDisplayName(item)} | Nv. ${item.level}`;
        } else {
          iconShell.innerHTML = '';
          label.textContent = 'Vazio';
        }
      });
    }

    function updateCombatHud() {
      const equippedItem = getEquippedHotbarItem();
      const swordDefinition = getSwordDefinition();
      const crossbowDefinition = getCrossbowDefinition();
      const healthRatio = THREE.MathUtils.clamp(playerStats.health / playerStats.maxHealth, 0, 1);
      healthFill.style.width = `${(healthRatio * 100).toFixed(0)}%`;
      healthText.textContent = `${Math.ceil(playerStats.health)}/${playerStats.maxHealth}`;
      if (equippedItem?.kind === 'crossbow') {
        swordHudText.textContent = `Crossbow Nv. ${crossbowDefinition.level} | Dano ${crossbowDefinition.damage} | Alcance ${crossbowDefinition.range}`;
      } else if (equippedItem?.kind === 'sword') {
        swordHudText.textContent = `Espada Nv. ${swordDefinition.level} | Dano ${swordDefinition.damage}`;
      } else if (equippedItem?.kind === 'pickaxe') {
        swordHudText.textContent = `Picareta Nv. ${getPickaxeDefinition().level} | Dano ${getPickaxeDefinition().damage}`;
      } else if (equippedItem?.kind === 'ore') {
        swordHudText.textContent = `${getItemDisplayName(equippedItem)} | x${equippedItem.amount}`;
      } else if (equippedItem?.kind === 'flashlight') {
        const flashlightStats = getFlashlightStats();
        swordHudText.textContent = `Lanterna Nv. ${playerStats.flashlightLevel} | Alcance ${flashlightStats.distance.toFixed(0)}`;
      } else {
        swordHudText.textContent = 'Nenhum item selecionado na barra';
      }
      updateHotbar();
    }

    function shouldSuppressWorldUi() {
      return (
        !itemState.gameActive
        || itemState.inventoryOpen
        || itemState.mapOpen
        || devModeState.enabled
        || buildModeState.enabled
      );
    }

    function shouldHideInteractionWorldUi() {
      return shouldSuppressWorldUi() || mobileState.enabled;
    }

    function projectWorldToScreen(worldPosition, margin = 96) {
      uiScreenPosition.copy(worldPosition).project(camera);
      if (uiScreenPosition.z <= -1 || uiScreenPosition.z >= 1) return null;

      const x = (uiScreenPosition.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-uiScreenPosition.y * 0.5 + 0.5) * window.innerHeight;
      if (
        x < -margin
        || y < -margin
        || x > window.innerWidth + margin
        || y > window.innerHeight + margin
      ) {
        return null;
      }

      return { x, y };
    }

    function placeWorldUiElement(element, worldPosition, margin = 96) {
      const screenPosition = projectWorldToScreen(worldPosition, margin);
      if (!screenPosition) {
        element.hidden = true;
        return false;
      }
      element.hidden = false;
      element.style.left = `${screenPosition.x.toFixed(1)}px`;
      element.style.top = `${screenPosition.y.toFixed(1)}px`;
      return true;
    }

    function hideInteractionPrompt() {
      interactionPrompt.hidden = true;
      interactionPrompt.style.display = 'none';
      interactionPrompt.style.visibility = 'hidden';
      interactionPrompt.style.opacity = '0';
      interactionKeyBadge.hidden = true;
      interactionPickaxeBadge.hidden = true;
      interactionKeyBadge.style.left = '-9999px';
      interactionKeyBadge.style.top = '-9999px';
      interactionPickaxeBadge.style.left = '-9999px';
      interactionPickaxeBadge.style.top = '-9999px';
    }

    function showInteractionPromptBadge(badgeElement, worldPosition, margin = 96) {
      interactionPrompt.hidden = false;
      interactionPrompt.style.display = 'block';
      interactionPrompt.style.visibility = 'visible';
      interactionPrompt.style.opacity = '1';
      badgeElement.hidden = false;
      if (!placeWorldUiElement(badgeElement, worldPosition, margin)) {
        hideInteractionPrompt();
        return false;
      }
      return true;
    }

    function isValidPromptHoveredObject(hoveredObject) {
      return Boolean(
        hoveredObject?.object
        && world.interactables.includes(hoveredObject.object)
        && hoveredObject.object.parent
      );
    }

    function isValidPromptOreTarget(targetOreHit) {
      return Boolean(
        targetOreHit?.node
        && world.oreNodes.includes(targetOreHit.node)
        && targetOreHit.node.hp > 0
        && targetOreHit.node.group?.parent
      );
    }

    function getPromptAimSamples() {
      if (mobileState.enabled) return null;
      if (lookState.pointerLockActive) return [screenCenter];
      if (!desktopPointerState.overCanvas || !desktopPointerState.hasPosition) return null;
      return pointerAimSamples;
    }

    function getTargetOreNodeFromSamples(aimSamples, range = miningState.range) {
      if (!isItemKindEquipped('pickaxe') || world.oreHitMeshes.length === 0 || !aimSamples?.length) return null;

      let bestHit = null;
      const origin = getPlayerInteractionOrigin(interactionOrigin);
      const maxDistanceSq = range * range;
      raycaster.near = 0;
      raycaster.far = getRaycastReach(range);

      for (const sample of aimSamples) {
        raycaster.setFromCamera(sample, camera);
        raycastHits.length = 0;
        raycaster.intersectObjects(world.oreHitMeshes, false, raycastHits);
        for (const hit of raycastHits) {
          const distanceSq = origin.distanceToSquared(hit.point);
          if (distanceSq > maxDistanceSq) continue;
          const node = hit.object.userData.oreNodeRef;
          if (!node) continue;
          const playerDistance = Math.sqrt(distanceSq);
          const worldNormal = hit.face?.normal
            ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
            : node.normal.clone();

          if (!bestHit || playerDistance < bestHit.distance) {
            bestHit = {
              node,
              point: hit.point.clone(),
              normal: worldNormal,
              distance: playerDistance,
            };
          }
          break;
        }
      }

      return bestHit;
    }

    function getHoveredObjectFromSamples(aimSamples, range = interactionState.range) {
      if (!itemState.gameActive || world.interactables.length === 0 || !aimSamples?.length) return null;

      let bestHit = null;
      const origin = getPlayerInteractionOrigin(interactionOrigin);
      const maxDistanceSq = range * range;
      raycaster.near = 0;
      raycaster.far = getRaycastReach(range);

      for (const sample of aimSamples) {
        raycaster.setFromCamera(sample, camera);
        raycastHits.length = 0;
        raycaster.intersectObjects(world.interactables, false, raycastHits);
        for (const hit of raycastHits) {
          const distanceSq = origin.distanceToSquared(hit.point);
          if (distanceSq > maxDistanceSq) continue;
          if (!bestHit || distanceSq < bestHit.playerDistanceSq) {
            bestHit = {
              ...hit,
              playerDistanceSq: distanceSq,
            };
          }
          break;
        }
      }

      return bestHit;
    }

    function resolveWorldUiTargets() {
      return {
        hoveredObject: getHoveredObjectFromSamples(getPromptAimSamples(), worldPromptState.interactRange),
        targetOreHit: getTargetOreNodeFromSamples(getPromptAimSamples(), worldPromptState.oreRange),
      };
    }

    function updateInteractionPrompt({ hoveredObject, targetOreHit }) {
      if (shouldHideInteractionWorldUi()) {
        hideInteractionPrompt();
        return;
      }

      const safeHoveredObject = isValidPromptHoveredObject(hoveredObject) ? hoveredObject : null;
      const safeTargetOreHit = isValidPromptOreTarget(targetOreHit) ? targetOreHit : null;

      const actionState = getPrimaryActionState({ hoveredObject: safeHoveredObject, targetOreHit: safeTargetOreHit });
      const hoveredDistance = Math.sqrt(safeHoveredObject?.playerDistanceSq ?? Infinity);
      if (
        actionState?.type === 'interact'
        && safeHoveredObject?.object
        && hoveredDistance <= worldPromptState.interactRange
      ) {
        safeHoveredObject.object.getWorldPosition(uiWorldPosition);
        safeHoveredObject.object.getWorldScale(uiWorldScale);
        uiWorldPosition.y += Math.max(0.22, uiWorldScale.y * 0.62);
        interactionKeyBadge.hidden = false;
        interactionPickaxeBadge.hidden = true;
        showInteractionPromptBadge(interactionKeyBadge, uiWorldPosition);
        return;
      }

      if (
        safeTargetOreHit?.node
        && isItemKindEquipped('pickaxe')
        && safeTargetOreHit.distance <= worldPromptState.oreRange
      ) {
        uiWorldPosition.copy(safeTargetOreHit.point ?? safeTargetOreHit.node.position);
        if (safeTargetOreHit.normal) {
          uiWorldPosition.addScaledVector(safeTargetOreHit.normal, 0.18);
        } else {
          uiWorldPosition.y += 0.18;
        }
        interactionKeyBadge.hidden = true;
        interactionPickaxeBadge.hidden = false;
        showInteractionPromptBadge(interactionPickaxeBadge, uiWorldPosition);
        return;
      }

      hideInteractionPrompt();
    }

    function createMonsterHealthBar(monster) {
      const bar = document.createElement('div');
      bar.className = 'monster-health-bar';
      bar.hidden = true;

      const track = document.createElement('div');
      track.className = 'monster-health-track';
      const lagFill = document.createElement('span');
      lagFill.className = 'monster-health-lag';
      const fill = document.createElement('span');
      fill.className = 'monster-health-fill';
      track.append(lagFill);
      track.append(fill);
      bar.append(track);
      monsterBarsLayer.append(bar);

      monster.uiHealthBar = bar;
      monster.uiHealthLagFill = lagFill;
      monster.uiHealthFill = fill;
      monster.uiLagHealthRatio = THREE.MathUtils.clamp(monster.hp / monster.maxHp, 0, 1);
    }

    function ensureMonsterHealthBar(monster) {
      if (!monster?.uiHealthBar || !monster?.uiHealthFill) createMonsterHealthBar(monster);
    }

    function destroyMonsterHealthBar(monster) {
      if (!monster?.uiHealthBar) return;
      monster.uiHealthBar.remove();
      monster.uiHealthBar = null;
      monster.uiHealthLagFill = null;
      monster.uiHealthFill = null;
    }

    function clearMonsterHealthBars() {
      for (const monster of world.monsters) destroyMonsterHealthBar(monster);
      if (monsterBarsLayer) monsterBarsLayer.innerHTML = '';
    }

    function createOreHealthBar(node) {
      const bar = document.createElement('div');
      bar.className = 'ore-health-bar';
      bar.hidden = true;
      const oreColor = new THREE.Color(node.definition.color);
      bar.style.setProperty('--ore-health-color', oreColor.getStyle());
      bar.style.setProperty('--ore-health-glow', `rgba(${Math.round(oreColor.r * 255)}, ${Math.round(oreColor.g * 255)}, ${Math.round(oreColor.b * 255)}, 0.5)`);

      const track = document.createElement('div');
      track.className = 'ore-health-track';
      const lagFill = document.createElement('span');
      lagFill.className = 'ore-health-lag';
      const fill = document.createElement('span');
      fill.className = 'ore-health-fill';
      track.append(lagFill);
      track.append(fill);
      bar.append(track);
      oreBarsLayer.append(bar);

      node.uiHealthBar = bar;
      node.uiHealthLagFill = lagFill;
      node.uiHealthFill = fill;
      node.uiLagHealthRatio = THREE.MathUtils.clamp(node.hp / node.maxHp, 0, 1);
    }

    function ensureOreHealthBar(node) {
      if (!node?.uiHealthBar || !node?.uiHealthFill) createOreHealthBar(node);
    }

    function destroyOreHealthBar(node) {
      if (!node?.uiHealthBar) return;
      node.uiHealthBar.remove();
      node.uiHealthBar = null;
      node.uiHealthLagFill = null;
      node.uiHealthFill = null;
    }

    function clearOreHealthBars() {
      for (const node of world.oreNodes) destroyOreHealthBar(node);
      if (oreBarsLayer) oreBarsLayer.innerHTML = '';
    }

    function spawnFloatingUiText(position, text, type = 'monster-hit', life = 1.05) {
      if (!text || !damageNumbersLayer) return;
      const element = document.createElement('div');
      element.className = `damage-number ${type}`;
      element.textContent = String(text);
      damageNumbersLayer.append(element);

      worldUiState.damageTexts.push({
        element,
        position: position.clone(),
        velocity: new THREE.Vector3(
          randomRange(-0.16, 0.16),
          randomRange(0.88, 1.26),
          randomRange(-0.16, 0.16)
        ),
        age: 0,
        life,
      });
    }

    function spawnFloatingDamageText(position, amount, type = 'monster-hit') {
      if (!Number.isFinite(amount)) return;
      spawnFloatingUiText(position, `${Math.round(amount)}`, type, 1.05);
    }

    function clearFloatingDamageTexts() {
      for (const entry of worldUiState.damageTexts) {
        entry.element.remove();
      }
      worldUiState.damageTexts.length = 0;
      if (damageNumbersLayer) damageNumbersLayer.innerHTML = '';
    }

    function updateMonsterHealthBars(delta) {
      const hidden = shouldSuppressWorldUi();
      const maxDistanceSq = monsterUiState.barRange * monsterUiState.barRange;
      const playerX = getPlayerX();
      const playerZ = getPlayerZ();
      for (const monster of world.monsters) {
        ensureMonsterHealthBar(monster);
        if (!monster.uiHealthBar || !monster.uiHealthFill || !monster.uiHealthLagFill) continue;
        const dx = monster.group.position.x - playerX;
        const dz = monster.group.position.z - playerZ;
        const visibleByDistance = dx * dx + dz * dz <= maxDistanceSq;
        const visibleBySight = visibleByDistance && hasWorldLineOfSight(monster.group.position.x, monster.group.position.z);
        if (hidden || monster.dead || monster.hp <= 0 || !visibleBySight) {
          monster.uiHealthBar.hidden = true;
          continue;
        }

        uiWorldPosition.copy(monster.group.position);
        uiWorldPosition.y += monster.definition.uiHeadHeight ?? Math.max(1.5, monster.radius * 3.4);
        if (!placeWorldUiElement(monster.uiHealthBar, uiWorldPosition, 120)) continue;

        const ratio = THREE.MathUtils.clamp(monster.hp / monster.maxHp, 0, 1);
        if (!Number.isFinite(monster.uiLagHealthRatio)) {
          monster.uiLagHealthRatio = ratio;
        } else if (ratio >= monster.uiLagHealthRatio) {
          monster.uiLagHealthRatio = ratio;
        } else {
          monster.uiLagHealthRatio = damp(monster.uiLagHealthRatio, ratio, 7.5, delta);
          if (Math.abs(monster.uiLagHealthRatio - ratio) < 0.002) {
            monster.uiLagHealthRatio = ratio;
          }
        }
        monster.uiHealthLagFill.style.transform = `scaleX(${monster.uiLagHealthRatio.toFixed(3)})`;
        monster.uiHealthFill.style.transform = `scaleX(${ratio.toFixed(3)})`;
      }
    }

    function updateOreHealthBars(delta, targetOreHit) {
      const hidden = shouldSuppressWorldUi();
      for (const node of world.oreNodes) {
        ensureOreHealthBar(node);
        if (!node.uiHealthBar || !node.uiHealthFill || !node.uiHealthLagFill) continue;

        node.uiVisibleTimer = Math.max(0, (node.uiVisibleTimer ?? 0) - delta);
        const isTarget = targetOreHit?.node === node;
        if (hidden || node.hp <= 0 || (!isTarget && node.uiVisibleTimer <= 0)) {
          node.uiHealthBar.hidden = true;
          continue;
        }

        uiWorldPosition.copy(isTarget && targetOreHit?.point ? targetOreHit.point : node.position);
        if (node.normal.y > 0.45) {
          uiWorldPosition.y += 0.52;
        } else {
          uiWorldPosition.y += 0.22;
          uiWorldPosition.addScaledVector(node.normal, 0.1);
        }
        if (!placeWorldUiElement(node.uiHealthBar, uiWorldPosition, 120)) continue;

        const ratio = THREE.MathUtils.clamp(node.hp / node.maxHp, 0, 1);
        if (!Number.isFinite(node.uiLagHealthRatio)) {
          node.uiLagHealthRatio = ratio;
        } else if (ratio >= node.uiLagHealthRatio) {
          node.uiLagHealthRatio = ratio;
        } else {
          node.uiLagHealthRatio = damp(node.uiLagHealthRatio, ratio, 9, delta);
          if (Math.abs(node.uiLagHealthRatio - ratio) < 0.002) {
            node.uiLagHealthRatio = ratio;
          }
        }
        node.uiHealthLagFill.style.transform = `scaleX(${node.uiLagHealthRatio.toFixed(3)})`;
        node.uiHealthFill.style.transform = `scaleX(${ratio.toFixed(3)})`;
      }
    }

    function updateFloatingDamageTexts(delta) {
      let writeIndex = 0;
      for (const entry of worldUiState.damageTexts) {
        entry.age += delta;
        if (entry.age >= entry.life) {
          entry.element.remove();
          continue;
        }

        entry.position.addScaledVector(entry.velocity, delta);
        entry.velocity.y += delta * 0.18;
        const screenPosition = projectWorldToScreen(entry.position, 140);
        if (!screenPosition) {
          entry.element.hidden = true;
        } else {
          const fade = 1 - entry.age / entry.life;
          const appear = THREE.MathUtils.clamp(entry.age / 0.16, 0, 1);
          const pop = Math.sin(appear * Math.PI);
          const scale = 1.02 + pop * 0.56 + (1 - fade) * 0.22;
          entry.element.hidden = false;
          entry.element.style.left = `${screenPosition.x.toFixed(1)}px`;
          entry.element.style.top = `${screenPosition.y.toFixed(1)}px`;
          entry.element.style.opacity = fade.toFixed(3);
          entry.element.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        }

        worldUiState.damageTexts[writeIndex++] = entry;
      }
      worldUiState.damageTexts.length = writeIndex;
    }

    function updateWorldUi(delta) {
      if (worldUiLayer) worldUiLayer.hidden = false;
      const targets = resolveWorldUiTargets();
      updateInteractionPrompt(targets);
      updateMonsterHealthBars(delta);
      updateOreHealthBars(delta, targets.targetOreHit);
      updateFloatingDamageTexts(delta);
    }

    function updateScreenPointerFromClient(clientX, clientY) {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      screenPointer.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      desktopPointerState.hasPosition = true;
    }

    function getActiveAimSamples() {
      if (mobileState.enabled || lookState.pointerLockActive) return miningAimSamples;
      if (!desktopPointerState.overCanvas || !desktopPointerState.hasPosition) return null;
      return pointerAimSamples;
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
      const equippedKind = getEquippedItemKind();
      if (equippedKind === 'sword') {
        const targetMonster = getSwordAttackTarget();
        return targetMonster
          ? { type: 'attack', label: 'Atacar', note: 'monstro' }
          : { type: 'attack', label: 'Espada', note: 'ataque' };
      }
      if (equippedKind === 'crossbow') {
        const targetMonster = getCrossbowTarget();
        return targetMonster
          ? { type: 'shoot', label: 'Disparar', note: 'alvo' }
          : { type: 'shoot', label: 'Crossbow', note: 'distancia' };
      }
      if (equippedKind !== 'pickaxe') {
        const pickaxeSlot = findHotbarSlotByKind('pickaxe');
        if (pickaxeSlot !== -1) {
          return { type: 'equip-pickaxe', label: 'Picareta', note: 'equipar' };
        }
        return { type: 'none', label: itemKindLabels[equippedKind] ?? 'Sem item', note: 'barra' };
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
      miningState.holdActive = false;
      miningState.swinging = false;
      miningState.swingProgress = Math.PI;
      miningState.pendingHit = null;
      miningState.hitApplied = false;
      combatState.holdActive = false;
      crossbowState.holdActive = false;
      crossbowState.shotTimer = 0;
      const safeSlotIndex = clampEquippedSlot(slotIndex);
      const hasItem = getHotbarItem(safeSlotIndex);
      itemState.equippedSlot = hasItem
        ? (itemState.equippedSlot === safeSlotIndex ? -1 : safeSlotIndex)
        : -1;
      updateHotbar();
      updateCombatHud();
      updateUpgradePanel();
      saveGame();
    }

    hotbarSlots.forEach((slot, index) => {
      slot.addEventListener('click', () => {
        if (performance.now() < itemDragState.suppressClickUntil) return;
        equipSlot(index);
        updateMiningHud();
      });
    });

    function updateItemDragGhostPosition(clientX, clientY) {
      if (!itemDragGhost || itemDragGhost.hidden) return;
      itemDragGhost.style.transform = `translate(${Math.round(clientX + 18)}px, ${Math.round(clientY + 18)}px)`;
    }

    function clearItemDragState() {
      itemDragState.active = false;
      itemDragState.pointerId = null;
      itemDragState.source = null;
      itemDragState.target = null;
      itemDragState.item = null;
      itemDragState.startClientX = 0;
      itemDragState.startClientY = 0;
      itemDragState.moved = false;
      if (itemDragGhost) {
        itemDragGhost.hidden = true;
        itemDragGhost.innerHTML = '';
        itemDragGhost.style.transform = 'translate(-9999px, -9999px)';
      }
      renderInventoryPanels();
    }

    function handleInventorySlotClick(event) {
      if (performance.now() < itemDragState.suppressClickUntil) return;
      const slotLocation = parseSlotLocationFromElement(event.target);
      if (!slotLocation || slotLocation.type !== 'inventory') return;
      if (slotLocation.index < HOTBAR_SLOT_COUNT) {
        equipSlot(slotLocation.index);
        updateMiningHud();
      }
    }

    function beginItemDrag(event) {
      if (event.button !== 0 || !uiState.activePanel) return;
      if (!event.target.closest('#inventoryLayout, #upgradePanel, #chestPanel, #hotbar')) return;
      const slotLocation = parseSlotLocationFromElement(event.target);
      if (!slotLocation) return;
      const item = getItemAtLocation(slotLocation);
      if (!item) {
        handleInventorySlotClick(event);
        return;
      }
      event.preventDefault();
      itemDragState.active = true;
      itemDragState.pointerId = event.pointerId;
      itemDragState.source = slotLocation;
      itemDragState.target = slotLocation;
      itemDragState.item = { ...item };
      itemDragState.startClientX = event.clientX;
      itemDragState.startClientY = event.clientY;
      itemDragState.moved = false;
      if (itemDragGhost) {
        itemDragGhost.hidden = false;
        itemDragGhost.innerHTML = buildItemSlotMarkup(slotLocation, item, {
          shortcutLabel: slotLocation.type === 'inventory' && slotLocation.index < HOTBAR_SLOT_COUNT ? String(slotLocation.index + 1) : '',
          selected: slotLocation.type === 'inventory' && slotLocation.index === itemState.equippedSlot,
        });
      }
      updateItemDragGhostPosition(event.clientX, event.clientY);
      renderInventoryPanels();
    }

    function updateItemDragTarget(clientX, clientY) {
      if (!itemDragState.active) return;
      if (!itemDragState.moved) {
        const dx = clientX - itemDragState.startClientX;
        const dy = clientY - itemDragState.startClientY;
        if ((dx * dx + dy * dy) >= 36) itemDragState.moved = true;
      }
      const targetElement = document.elementFromPoint(clientX, clientY)?.closest?.('[data-location-type]');
      itemDragState.target = parseSlotLocationFromElement(targetElement) ?? null;
      updateItemDragGhostPosition(clientX, clientY);
      renderInventoryPanels();
    }

    function endItemDrag(event) {
      if (!itemDragState.active) return;
      if (itemDragState.pointerId !== null && event.pointerId !== itemDragState.pointerId) return;
      const source = itemDragState.source;
      const target = itemDragState.target;
      let changed = false;
      if (source && target && getLocationKey(source) !== getLocationKey(target)) {
        changed = swapItemsBetweenLocations(source, target);
      }
      if (itemDragState.moved || changed) {
        itemDragState.suppressClickUntil = performance.now() + 140;
      }
      clearItemDragState();
      if (changed) {
        refreshResourceUi();
        updateMiningHud();
        saveGame();
      }
    }

    inventoryPanel.addEventListener('pointerdown', beginItemDrag);
    upgradePanel.addEventListener('pointerdown', beginItemDrag);
    chestPanel.addEventListener('pointerdown', beginItemDrag);
    if (hotbar) hotbar.addEventListener('pointerdown', beginItemDrag);
    inventoryPanel.addEventListener('click', (event) => {
      if (itemDragState.active) return;
      handleInventorySlotClick(event);
    });
    upgradePanel.addEventListener('click', (event) => {
      if (itemDragState.active) return;
      handleInventorySlotClick(event);
    });
    chestPanel.addEventListener('click', (event) => {
      if (itemDragState.active) return;
      handleInventorySlotClick(event);
    });
    window.addEventListener('pointermove', (event) => {
      updateItemDragTarget(event.clientX, event.clientY);
    });
    window.addEventListener('pointerup', endItemDrag);
    window.addEventListener('pointercancel', endItemDrag);
    window.addEventListener('blur', () => {
      if (itemDragState.active) clearItemDragState();
    });

    function updateInventoryChip() {
      inventoryChip.textContent = `Inventario: ${oreDefinitions.map((definition) => `${definition.short} ${inventoryState.totals[definition.id]}`).join(' | ')}`;
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

    function buildResourceMiniCardMarkup(definition, amount) {
      return `
        <article class="resource-mini-card ${amount > 0 ? 'has-stock' : ''}">
          <div class="inventory-icon-shell">
            ${createOreIconMarkup(definition)}
          </div>
          <div class="resource-mini-copy">
            <strong class="inventory-name">${definition.label}</strong>
            <span class="inventory-meta">${definition.short} | Nivel ${definition.level}</span>
          </div>
          <strong class="resource-mini-count">${amount}</strong>
        </article>
      `;
    }

    function getItemSlotPlaceholder(location) {
      if (location.type === 'equipment') {
        return {
          label: equipmentSlotDefinitions[location.slot]?.label ?? 'Equipamento',
          hint: itemKindEmptyHints[location.slot] ?? 'Slot vazio',
        };
      }
      if (location.type === 'chest') {
        return {
          label: 'Bau',
          hint: 'Solte itens aqui',
        };
      }
      if (location.type === 'workbench') {
        return {
          label: 'Bancada',
          hint: itemKindEmptyHints.workbench,
        };
      }
      return {
        label: 'Vazio',
        hint: itemKindEmptyHints.inventory,
      };
    }

    function buildItemSlotMarkup(location, item, { shortcutLabel = '', selected = false } = {}) {
      const key = getLocationKey(location);
      const isDragSource = itemDragState.active && getLocationKey(itemDragState.source) === key;
      const isDragTarget = itemDragState.active && getLocationKey(itemDragState.target) === key;
      const dragClass = isDragTarget
        ? (canPlaceItemAtLocation(itemDragState.item, location) && canPlaceItemAtLocation(item, itemDragState.source) ? ' can-drop' : ' blocked-drop')
        : '';
      const placeholder = getItemSlotPlaceholder(location);
      const dataset = location.type === 'inventory'
        ? `data-location-type="inventory" data-slot-index="${location.index}"`
        : location.type === 'chest'
          ? `data-location-type="chest" data-slot-index="${location.index}"`
          : location.type === 'equipment'
            ? `data-location-type="equipment" data-equipment-slot="${location.slot}"`
            : 'data-location-type="workbench"';
      const classes = [
        'item-slot',
        item ? '' : 'slot-empty-state',
        selected ? 'is-selected' : '',
        isDragSource ? 'is-drag-source' : '',
        dragClass.trim(),
      ].filter(Boolean).join(' ');
      if (!item) {
        return `
          <div class="${classes}" ${dataset}>
            <div class="item-slot-inner">
              <div class="item-slot-topline">
                <span class="item-slot-shortcut">${shortcutLabel}</span>
              </div>
              <div class="item-slot-icon-shell"></div>
              <div class="item-slot-copy">
                <strong class="item-slot-empty-label">${placeholder.label}</strong>
                <span class="item-slot-empty-hint">${placeholder.hint}</span>
              </div>
            </div>
          </div>
        `;
      }
      return `
        <div class="${classes}" ${dataset}>
          <div class="item-slot-inner">
            <div class="item-slot-topline">
              <span class="item-slot-shortcut">${shortcutLabel}</span>
              <span class="item-slot-level ${item.kind === 'ore' ? 'item-stack-count' : ''}">${item.kind === 'ore' ? `x${item.amount}` : `Nv. ${item.level}`}</span>
            </div>
            <div class="item-slot-icon-shell">
              ${createItemIconMarkup(item)}
            </div>
            <div class="item-slot-copy">
              <strong class="item-slot-name">${getItemDisplayName(item)}</strong>
              <span class="item-slot-meta">${getItemDisplayMeta(item)}</span>
            </div>
          </div>
        </div>
      `;
    }

    function applyMarkupToExistingSlotElement(element, location, item, { shortcutLabel = '', selected = false } = {}) {
      if (!element) return;
      const key = getLocationKey(location);
      const isDragSource = itemDragState.active && getLocationKey(itemDragState.source) === key;
      const isDragTarget = itemDragState.active && getLocationKey(itemDragState.target) === key;
      const canSwapHere = canPlaceItemAtLocation(itemDragState.item, location) && canPlaceItemAtLocation(item, itemDragState.source);
      const classes = [
        'item-slot',
        item ? '' : 'slot-empty-state',
        selected ? 'is-selected' : '',
        isDragSource ? 'is-drag-source' : '',
        isDragTarget ? (canSwapHere ? 'can-drop' : 'blocked-drop') : '',
        element.classList.contains('equipment-slot') ? 'equipment-slot' : '',
        element.classList.contains('workbench-slot') ? 'workbench-slot' : '',
      ].filter(Boolean).join(' ');
      const placeholder = getItemSlotPlaceholder(location);
      element.className = classes;
      element.dataset.locationType = location.type;
      if (location.type === 'inventory') {
        element.dataset.slotIndex = String(location.index);
        delete element.dataset.equipmentSlot;
      } else if (location.type === 'chest') {
        element.dataset.slotIndex = String(location.index);
        delete element.dataset.equipmentSlot;
      } else if (location.type === 'equipment') {
        element.dataset.equipmentSlot = location.slot;
        delete element.dataset.slotIndex;
      } else {
        delete element.dataset.slotIndex;
        delete element.dataset.equipmentSlot;
      }
      element.innerHTML = item ? `
        <div class="item-slot-inner">
          <div class="item-slot-topline">
            <span class="item-slot-shortcut">${shortcutLabel}</span>
            <span class="item-slot-level ${item.kind === 'ore' ? 'item-stack-count' : ''}">${item.kind === 'ore' ? `x${item.amount}` : `Nv. ${item.level}`}</span>
          </div>
          <div class="item-slot-icon-shell">
            ${createItemIconMarkup(item)}
          </div>
          <div class="item-slot-copy">
            <strong class="item-slot-name">${getItemDisplayName(item)}</strong>
            <span class="item-slot-meta">${getItemDisplayMeta(item)}</span>
          </div>
        </div>
      ` : `
        <div class="item-slot-inner">
          <div class="item-slot-topline">
            <span class="item-slot-shortcut">${shortcutLabel}</span>
          </div>
          <div class="item-slot-icon-shell"></div>
          <div class="item-slot-copy">
            <strong class="item-slot-empty-label">${placeholder.label}</strong>
            <span class="item-slot-empty-hint">${placeholder.hint}</span>
          </div>
        </div>
      `;
    }

    function renderInventoryPanels() {
      if (inventoryGrid) {
        inventoryGrid.innerHTML = '';
        inventoryGrid.hidden = true;
      }
      const upgradeResourceMarkup = oreDefinitions
        .map((definition) => buildResourceMiniCardMarkup(definition, getResourceTotal(definition.id)))
        .join('');

      if (upgradeResourceGrid) upgradeResourceGrid.innerHTML = upgradeResourceMarkup;
      if (inventoryInfoText) {
        const equippedItem = getEquippedHotbarItem();
        inventoryInfoText.textContent = equippedItem
          ? `${getItemDisplayName(equippedItem)} selecionado no slot ${itemState.equippedSlot + 1}. Arraste itens para os slots 1-5 para mudar as teclas numericas.`
          : 'Arraste itens entre slots. Os slots 1-5 correspondem as teclas 1-5. A lanterna vai no slot acima da cabeca.';
      }

      if (inventoryItemGrid) {
        inventoryItemGrid.innerHTML = inventoryState.itemSlots.map((item, index) => buildItemSlotMarkup(
          { type: 'inventory', index },
          item,
          {
            shortcutLabel: index < HOTBAR_SLOT_COUNT ? String(index + 1) : '',
            selected: index === itemState.equippedSlot,
          }
        )).join('');
      }
      if (upgradeInventoryGrid) {
        upgradeInventoryGrid.innerHTML = inventoryState.itemSlots.map((item, index) => buildItemSlotMarkup(
          { type: 'inventory', index },
          item,
          {
            shortcutLabel: index < HOTBAR_SLOT_COUNT ? String(index + 1) : '',
            selected: index === itemState.equippedSlot,
          }
        )).join('');
      }

      applyMarkupToExistingSlotElement(inventoryHeadSlot, { type: 'equipment', slot: 'head' }, inventoryState.equipment.head);
      applyMarkupToExistingSlotElement(upgradeHeadSlot, { type: 'equipment', slot: 'head' }, inventoryState.equipment.head);
      applyMarkupToExistingSlotElement(upgradeWorkbenchSlot, { type: 'workbench' }, workbenchState.item);
      if (chestGrid || chestStorageGrid) {
        updateChestGrid();
      }
      updateHotbar();
    }

    function buildChestGrid() {
      updateChestGrid();
    }

    function updateChestGrid() {
      if (chestGrid) {
        chestGrid.innerHTML = inventoryState.itemSlots.map((item, index) => buildItemSlotMarkup(
          { type: 'inventory', index },
          item,
          {
            shortcutLabel: index < HOTBAR_SLOT_COUNT ? String(index + 1) : '',
            selected: index === itemState.equippedSlot,
          }
        )).join('');
      }
      if (chestStorageGrid) {
        chestStorageGrid.innerHTML = chestState.itemSlots.map((item, index) => buildItemSlotMarkup(
          { type: 'chest', index },
          item
        )).join('');
      }
      transferAllButton.disabled = !inventoryState.itemSlots.some(Boolean);
    }

    function updateUpgradePanel() {
      renderInventoryPanels();
      const item = workbenchState.item;
      if (!item) {
        if (upgradeSelectedKind) upgradeSelectedKind.textContent = 'Sem item';
        if (upgradeSelectedName) upgradeSelectedName.textContent = 'Arraste um item para comecar';
        if (upgradeSelectedStats) upgradeSelectedStats.textContent = 'Picareta, espada, crossbow e lanterna podem subir de nivel aqui.';
        if (upgradeSelectedItemButton) {
          upgradeSelectedItemButton.disabled = true;
          upgradeSelectedItemButton.textContent = 'Selecione um item';
        }
      } else {
        const currentDefinition = getItemDefinition(item);
        const nextUpgrade = getNextUpgradeForItem(item);
        if (upgradeSelectedKind) upgradeSelectedKind.textContent = itemKindLabels[item.kind];
        if (upgradeSelectedName) upgradeSelectedName.textContent = `${getItemDisplayName(item)} | Nv. ${item.level}`;
        if (upgradeSelectedStats) {
          const currentInfo = getItemDisplayMeta(item);
          const nextInfo = nextUpgrade
            ? `Proximo: Nv. ${nextUpgrade.level} | ${item.kind === 'flashlight'
              ? `Alc ${nextUpgrade.distance.toFixed(0)} | Feixe ${(nextUpgrade.angle * 180 / Math.PI).toFixed(0)} deg`
              : `Dano ${nextUpgrade.damage}${nextUpgrade.range ? ` | Alc ${nextUpgrade.range}` : ''}`}`
            : 'Nivel maximo atingido';
          upgradeSelectedStats.textContent = `${currentInfo} | ${nextInfo}`;
        }
        if (upgradeSelectedItemButton) {
          if (!nextUpgrade) {
            upgradeSelectedItemButton.disabled = true;
            upgradeSelectedItemButton.textContent = `${itemKindLabels[item.kind]} no nivel maximo`;
          } else {
            upgradeSelectedItemButton.disabled = !canSpendCost(nextUpgrade.cost);
            upgradeSelectedItemButton.textContent = `Melhorar para Nv. ${nextUpgrade.level} (Custo: ${formatCost(nextUpgrade.cost)})`;
          }
        }
      }
      if (upgradeSelectedHint) {
        upgradeSelectedHint.textContent = `Disponivel: Fe ${getResourceTotal('ferrita')} | Cu ${getResourceTotal('cobre')} | Am ${getResourceTotal('ametista')} | Sa ${getResourceTotal('safira')} | Au ${getResourceTotal('aurio')}`;
      }
    }

    function refreshResourceUi() {
      updateInventoryChip();
      renderInventoryPanels();
      updateChestGrid();
      updateUpgradePanel();
      updateCombatHud();
    }

    function transferOreToChest(oreId, amount) {
      const desired = amount === Infinity ? getResourceTotal(oreId) : amount;
      const takenFromInventory = Math.max(0, Math.min(inventoryState.totals[oreId], desired));
      if (takenFromInventory <= 0) return false;
      const moved = addOreToChestItems(oreId, takenFromInventory);
      if (moved <= 0) return false;
      spendOreFromSlotCollection(inventoryState.itemSlots, oreId, moved);
      refreshResourceUi();
      saveGame();
      return true;
    }

    function transferAllToChest() {
      let movedAny = false;
      for (let index = 0; index < inventoryState.itemSlots.length; index++) {
        const item = inventoryState.itemSlots[index];
        if (!item) continue;
        if (item.kind === 'ore') {
          const moved = addOreToChestItems(item.oreId, item.amount);
          if (moved > 0) {
            spendOreFromSlotCollection(inventoryState.itemSlots, item.oreId, moved);
            movedAny = true;
          }
          continue;
        }
        const emptyChestIndex = chestState.itemSlots.findIndex((entry) => !entry);
        if (emptyChestIndex === -1) continue;
        chestState.itemSlots[emptyChestIndex] = { ...item };
        inventoryState.itemSlots[index] = null;
        movedAny = true;
      }
      if (movedAny) {
        recalculateResourceTotals();
        applyItemLevelsToVisuals();
        refreshResourceUi();
        saveGame();
      }
      return movedAny;
    }

    function spendResource(oreId, amount) {
      if (getResourceTotal(oreId) < amount) return false;
      let remaining = amount;
      const spendFromInventory = Math.min(inventoryState.totals[oreId], remaining);
      if (spendFromInventory > 0) {
        spendOreFromSlotCollection(inventoryState.itemSlots, oreId, spendFromInventory);
        remaining -= spendFromInventory;
      }
      if (remaining > 0) {
        spendOreFromSlotCollection(chestState.itemSlots, oreId, remaining);
      }
      recalculateResourceTotals();
      return true;
    }

    function spendCost(cost = {}) {
      if (!canSpendCost(cost)) return false;
      for (const [oreId, amount] of Object.entries(cost ?? {})) {
        spendResource(oreId, amount);
      }
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
      miningState.swinging = false;
      miningState.swingProgress = Math.PI;
      miningState.pendingHit = null;
      miningState.hitApplied = false;
      combatState.holdActive = false;
      crossbowState.holdActive = false;
      crossbowState.shotTimer = 0;
      clearMovementState();
      resetMobileControls();
      lookState.isDragging = false;
      if (itemState.mapOpen) toggleBigMap();
      if (document.pointerLockElement === renderer.domElement) {
        document.exitPointerLock();
      }
      setActivePanel(panelName);
      itemState.gameActive = false;
      if (panelName === 'inventory' || panelName === 'upgrades') {
        renderInventoryPanels();
        updateUpgradePanel();
      }
      updateModeChip();
    }

    function openOptionsMenu() {
      controlsDetails.hidden = true;
      controlsMenuButton.classList.remove('active');
      openPanel('options');
    }

    function closeActivePanel() {
      if (!uiState.activePanel) return;
      if (itemDragState.active) clearItemDragState();
      setActivePanel(null);
      itemState.gameActive = true;
      queuePointerRecapture();
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
        saveGame();
      } else if (type === 'returnPortal') {
        areaState.currentArea = 'home';
        rebuildWorld();
        saveGame();
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
        const pickaxeSlot = findHotbarSlotByKind('pickaxe');
        if (pickaxeSlot !== -1) equipSlot(pickaxeSlot);
        updateMiningHud();
        return;
      }
      if (actionState.type === 'none') {
        updateMiningHud();
        return;
      }
      if (actionState.type === 'attack') {
        tryAttackWithSword();
        updateMiningHud();
        return;
      }
      if (actionState.type === 'shoot') {
        tryFireCrossbow();
        updateMiningHud();
        return;
      }
      tryMineWithPickaxe();
      updateMiningHud();
    }

    function upgradeWorkbenchItem() {
      const item = workbenchState.item;
      const nextUpgrade = getNextUpgradeForItem(item);
      if (!item || !nextUpgrade || !spendCost(nextUpgrade.cost)) return false;
      item.level = nextUpgrade.level;
      applyItemLevelsToVisuals();
      refreshResourceUi();
      saveGame();
      return true;
    }

    transferAllButton.addEventListener('click', () => {
      transferAllToChest();
    });

    upgradeSelectedItemButton.addEventListener('click', () => {
      upgradeWorkbenchItem();
    });

    mobileInventoryButton.addEventListener('click', () => {
      if (!mobileState.enabled) return;
      toggleInventory();
    });

    bigMapCloseButton.addEventListener('click', () => {
      if (itemState.mapOpen) toggleBigMap();
    });

    for (const closeButton of [inventoryCloseButton, chestCloseButton, upgradeCloseButton, optionsCloseButton]) {
      closeButton.addEventListener('click', () => {
        closeActivePanel();
      });
    }

    controlsMenuButton.addEventListener('click', () => {
      controlsDetails.hidden = !controlsDetails.hidden;
      controlsMenuButton.classList.toggle('active', !controlsDetails.hidden);
    });

    for (const mapTrigger of [minimapShell, minimapLabel]) {
      mapTrigger.addEventListener('click', () => {
        if (!mobileState.enabled) return;
        toggleBigMap();
      });
    }

    mobileActionButton.addEventListener('click', (event) => {
      if (!mobileState.enabled) return;
      if (performance.now() - mobileState.lastActionTouchAt > 350) {
        triggerPrimaryAction();
      }
      event.preventDefault();
    });

    mobileActionButton.addEventListener('touchstart', (event) => {
      if (!mobileState.enabled) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      mobileState.actionTouchId = touch.identifier;
      mobileState.actionHeld = true;
      mobileState.lastActionTouchAt = performance.now();
      triggerPrimaryAction();
      event.preventDefault();
    }, { passive: false });

    function releaseMobileActionTouches(changedTouches) {
      for (let index = 0; index < changedTouches.length; index++) {
        const touch = changedTouches[index];
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

      for (let index = 0; index < event.changedTouches.length; index++) {
        const touch = event.changedTouches[index];
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

      for (let index = 0; index < event.changedTouches.length; index++) {
        const touch = event.changedTouches[index];
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

      for (let index = 0; index < event.changedTouches.length; index++) {
        const touch = event.changedTouches[index];
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

      for (let index = 0; index < event.changedTouches.length; index++) {
        const touch = event.changedTouches[index];
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

    function createCaveMonsterModel() {
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.85,
        metalness: 0.1,
        emissive: new THREE.Color(0x000820),
        emissiveIntensity: 0.5,
      });
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0x003322,
        emissive: new THREE.Color(0x00ffaa),
        emissiveIntensity: 2.2,
        roughness: 0.3,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9,
      });
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0x050000,
        emissive: new THREE.Color(0xff2200),
        emissiveIntensity: 5.4,
        roughness: 0.1,
        metalness: 0.7,
      });
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0x2a2030,
        roughness: 0.9,
        metalness: 0.05,
        emissive: new THREE.Color(0x100020),
        emissiveIntensity: 0.3,
      });
      const clawMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a12,
        roughness: 0.4,
        metalness: 0.6,
        emissive: new THREE.Color(0x00ffaa),
        emissiveIntensity: 0.4,
      });

      const monster = new THREE.Group();
      monster.scale.setScalar(0.46);
      const bodyGroup = new THREE.Group();
      monster.add(bodyGroup);

      const addMesh = (mesh, parent = bodyGroup) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };

      const torso = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.4, 6, 12), skinMat));
      torso.position.set(0, 2.2, 0);
      torso.rotation.x = 0.3;

      for (let i = 0; i < 6; i++) {
        const bubble = addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.08 + (i % 3) * 0.025, 7, 7), glowMat));
        const angle = (i / 6) * Math.PI * 2;
        bubble.position.set(Math.cos(angle) * 0.38, 1.72 + i * 0.14, Math.sin(angle) * 0.22 + 0.2);
      }

      for (let i = 0; i < 5; i++) {
        const rib = addMesh(new THREE.Mesh(new THREE.TorusGeometry(0.48 - i * 0.03, 0.035, 5, 10, Math.PI), boneMat));
        rib.position.set(0, 1.7 + i * 0.22, 0.1);
        rib.rotation.y = Math.PI / 2;
        rib.rotation.z = -0.2 + i * 0.05;
      }

      const neckGroup = new THREE.Group();
      neckGroup.position.set(0, 3.1, -0.05);
      bodyGroup.add(neckGroup);
      addMesh(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 0.7, 8), skinMat), neckGroup);

      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.6, 0);
      neckGroup.add(headGroup);
      const head = addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.52, 10, 8), skinMat), headGroup);
      head.scale.set(1, 1.1, 0.85);
      const jaw = addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.38, 8, 6, 0, Math.PI * 2, Math.PI * 0.4, Math.PI * 0.5), skinMat), headGroup);
      jaw.position.set(0, -0.22, 0.15);
      jaw.rotation.x = 0.4;

      function makeEye(ox, oy, oz, size = 0.09) {
        const eyeGroup = new THREE.Group();
        const socket = addMesh(new THREE.Mesh(new THREE.SphereGeometry(size * 1.4, 7, 7), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 1 })), eyeGroup);
        socket.castShadow = false;
        const eye = addMesh(new THREE.Mesh(new THREE.SphereGeometry(size, 7, 7), eyeMat), eyeGroup);
        eye.position.z = size * 0.5;
        const halo = addMesh(new THREE.Mesh(
          new THREE.SphereGeometry(size * 1.8, 7, 7),
          new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff1100, emissiveIntensity: 2, transparent: true, opacity: 0.15, depthWrite: false })
        ), eyeGroup);
        halo.castShadow = false;
        eyeGroup.position.set(ox, oy, oz);
        return eyeGroup;
      }
      headGroup.add(makeEye(-0.2, 0.12, 0.38));
      headGroup.add(makeEye(0.2, 0.12, 0.38));
      headGroup.add(makeEye(0, 0.26, 0.42, 0.055));
      headGroup.add(makeEye(-0.32, 0.28, 0.28, 0.045));
      headGroup.add(makeEye(0.32, 0.28, 0.28, 0.045));

      for (let i = 0; i < 5; i++) {
        const spine = addMesh(new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.3 + i * 0.05, 5), boneMat), headGroup);
        const angle = ((i - 2) / 5) * Math.PI * 0.6;
        spine.position.set(Math.sin(angle) * 0.3, 0.4, Math.cos(angle) * 0.1 - 0.15);
        spine.rotation.z = angle * 0.5;
        spine.rotation.x = -0.3;
      }

      const antennae = [];
      for (let side = -1; side <= 1; side += 2) {
        const antenna = new THREE.Group();
        antenna.position.set(side * 0.28, 0.38, -0.1);
        for (let segment = 0; segment < 6; segment++) {
          const mesh = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.025 - segment * 0.003, 0.18, 4, 5), glowMat), antenna);
          mesh.position.y = segment * 0.2;
          mesh.position.x = Math.sin(segment * 0.5) * 0.05 * side;
          mesh.position.z = -segment * 0.04;
        }
        antennae.push(antenna);
        headGroup.add(antenna);
      }

      function makeLongArm(side, yOffset, zOffset, length = 1.8, isFront = true) {
        const armGroup = new THREE.Group();
        armGroup.position.set(side * 0.55, yOffset, zOffset);
        addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.14, 7, 7), boneMat), armGroup);
        const upperPivot = new THREE.Group();
        upperPivot.position.set(side * 0.1, -0.1, 0);
        upperPivot.rotation.z = side * (0.6 + (isFront ? 0 : 0.3));
        upperPivot.rotation.x = isFront ? 0.2 : -0.5;
        const upper = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, length * 0.45, 5, 7), skinMat), upperPivot);
        upper.position.y = -(length * 0.45) / 2;
        armGroup.add(upperPivot);
        const elbow = addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 6), boneMat), upperPivot);
        elbow.position.set(side * 0.18, -(length * 0.45 + 0.05), 0.05);
        const forePivot = new THREE.Group();
        forePivot.position.set(side * 0.07, -(length * 0.45 + 0.05), 0.05);
        forePivot.rotation.z = side * 0.3;
        forePivot.rotation.x = 0.4;
        const fore = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.08, length * 0.55, 5, 7), skinMat), forePivot);
        fore.position.y = -(length * 0.55) / 2;
        upperPivot.add(forePivot);
        const clawGroup = new THREE.Group();
        clawGroup.position.set(side * 0.2, -(length * 1.02), 0.2);
        clawGroup.rotation.x = 0.3;
        for (let finger = 0; finger < 3; finger++) {
          const fingerAngle = ((finger - 1) / 2) * 0.5;
          const claw = addMesh(new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.34, 5), clawMat), clawGroup);
          claw.position.set(Math.sin(fingerAngle) * 0.22 * side, -0.14, 0.16 + finger * 0.02);
          claw.rotation.x = 0.65;
          claw.rotation.z = fingerAngle * side;
        }
        upperPivot.add(clawGroup);
        bodyGroup.add(armGroup);
        return { armGroup, upperPivot, forePivot, clawGroup, side, isFront };
      }

      const armFL = makeLongArm(-1, 2.6, 0.3, 2.0, true);
      const armFR = makeLongArm(1, 2.6, 0.3, 2.0, true);
      const armBL = makeLongArm(-1, 1.8, -0.3, 1.7, false);
      const armBR = makeLongArm(1, 1.8, -0.3, 1.7, false);

      function makeLeg(side) {
        const legGroup = new THREE.Group();
        legGroup.position.set(side * 0.38, 1.2, 0.05);
        const thighPivot = new THREE.Group();
        thighPivot.rotation.z = side * 0.15;
        thighPivot.rotation.x = 0.1;
        const thigh = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.9, 5, 7), skinMat), thighPivot);
        thigh.position.y = -0.5;
        legGroup.add(thighPivot);
        const knee = addMesh(new THREE.Mesh(new THREE.SphereGeometry(0.13, 6, 6), boneMat), thighPivot);
        knee.position.set(side * 0.06, -1.05, 0.08);
        const shinPivot = new THREE.Group();
        shinPivot.position.set(side * 0.06, -1.05, 0.08);
        shinPivot.rotation.x = -0.7;
        shinPivot.rotation.z = side * 0.1;
        const shin = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.95, 5, 7), skinMat), shinPivot);
        shin.position.y = -0.5;
        thighPivot.add(shinPivot);
        const foot = addMesh(new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 5), clawMat), shinPivot);
        foot.rotation.x = 1.2;
        foot.position.set(0, -1.0, 0.3);
        bodyGroup.add(legGroup);
        return { legGroup, thighPivot, shinPivot, side };
      }

      const legL = makeLeg(-1);
      const legR = makeLeg(1);
      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 1.8, -0.5);
      bodyGroup.add(tailGroup);
      const tailSegs = [];
      for (let i = 0; i < 8; i++) {
        const tail = addMesh(new THREE.Mesh(new THREE.CapsuleGeometry(0.15 - i * 0.012, 0.28, 5, 7), i % 2 === 0 ? skinMat : glowMat), tailGroup);
        tail.position.y = -(i * 0.28);
        tail.position.z = -(i * i * 0.015);
        tail.position.x = Math.sin(i * 0.6) * 0.12;
        tailSegs.push(tail);
      }
      const stinger = addMesh(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 6), clawMat), tailGroup);
      stinger.position.set(0, -(8 * 0.28 + 0.2), -(8 * 8 * 0.015));
      stinger.rotation.x = -0.8;

      function resetPose() {
        torso.scale.set(1, 1, 1);
        bodyGroup.position.set(0, 0, 0);
        bodyGroup.rotation.set(0, 0, 0);
        neckGroup.rotation.set(0, 0, 0);
        headGroup.rotation.set(0, 0, 0);
        jaw.rotation.x = 0.4;
        armFL.upperPivot.rotation.set(0.2, 0, -0.6);
        armFR.upperPivot.rotation.set(0.2, 0, 0.6);
        armBL.upperPivot.rotation.set(-0.5, 0, -0.9);
        armBR.upperPivot.rotation.set(-0.5, 0, 0.9);
        legL.thighPivot.rotation.set(0.1, 0, -0.15);
        legR.thighPivot.rotation.set(0.1, 0, 0.15);
        legL.shinPivot.rotation.set(-0.7, 0, -0.1);
        legR.shinPivot.rotation.set(-0.7, 0, 0.1);
      }

      function update(delta, mode, phase = 0, attackProgress = 0, hitFlash = 0) {
        resetPose();
        skinMat.emissiveIntensity = 0.5 + hitFlash * 1.5;
        glowMat.emissiveIntensity = 2.2 + Math.sin(phase * 3.7) * 0.35 + hitFlash * 1.2;
        eyeMat.emissiveIntensity = 5.4 + hitFlash * 5;

        for (let i = 0; i < antennae.length; i++) {
          antennae[i].rotation.x = Math.sin(phase * 2.3 + i) * 0.15;
          antennae[i].rotation.z = Math.sin(phase * 1.7 + i) * 0.1 * (i === 0 ? -1 : 1);
        }
        tailGroup.rotation.x = Math.sin(phase * 1.2) * 0.3;
        tailGroup.rotation.z = Math.sin(phase * 0.9) * 0.25;
        tailSegs.forEach((segment, index) => {
          segment.rotation.z = Math.sin(phase * 1.5 + index * 0.4) * 0.15;
          segment.rotation.x = Math.sin(phase * 1.1 + index * 0.3) * 0.1;
        });

        if (mode === 'walk') {
          const speed = phase * 2.8;
          bodyGroup.position.y = Math.sin(phase * 5.6) * 0.12;
          bodyGroup.rotation.y = Math.sin(phase * 2.8) * 0.12;
          bodyGroup.position.z = Math.sin(phase * 2.8) * 0.15;
          legL.thighPivot.rotation.x = Math.sin(speed) * 0.45;
          legL.shinPivot.rotation.x = -0.7 + Math.sin(speed) * 0.3;
          legR.thighPivot.rotation.x = Math.sin(speed + Math.PI) * 0.45;
          legR.shinPivot.rotation.x = -0.7 + Math.sin(speed + Math.PI) * 0.3;
          armFL.upperPivot.rotation.x = Math.sin(speed + Math.PI) * 0.4;
          armFR.upperPivot.rotation.x = Math.sin(speed) * 0.4;
          armBL.upperPivot.rotation.x = Math.sin(speed) * 0.3;
          armBR.upperPivot.rotation.x = Math.sin(speed + Math.PI) * 0.3;
          neckGroup.rotation.x = Math.sin(speed * 0.5) * 0.1 - 0.1;
          headGroup.rotation.y = Math.sin(speed * 0.5) * 0.15;
          return;
        }

        if (mode === 'attack') {
          const swing = Math.sin(attackProgress * Math.PI);
          bodyGroup.position.y = swing * 0.15;
          bodyGroup.position.z = swing * 0.3;
          bodyGroup.rotation.x = 0.25 + swing * 0.12;
          armFL.upperPivot.rotation.z = -0.3 + swing * 0.6;
          armFL.upperPivot.rotation.x = -0.8 + swing * 0.5;
          armFR.upperPivot.rotation.z = 0.3 - swing * 0.6;
          armFR.upperPivot.rotation.x = -0.8 + swing * 0.5;
          armBL.upperPivot.rotation.z = -1.2;
          armBR.upperPivot.rotation.z = 1.2;
          headGroup.rotation.x = 0.2 + swing * 0.25;
          jaw.rotation.x = 0.4 + swing * 0.44;
          eyeMat.emissiveIntensity = 7 + swing * 4 + hitFlash * 5;
          legL.thighPivot.rotation.x = -0.2;
          legR.thighPivot.rotation.x = -0.2;
          return;
        }

        if (mode === 'alert') {
          const speed = phase * 2;
          bodyGroup.rotation.y = Math.sin(speed * 0.6) * 0.5;
          bodyGroup.position.y = 0.15;
          bodyGroup.rotation.x = -0.15;
          headGroup.rotation.y = Math.sin(speed * 0.8) * 0.6;
          headGroup.rotation.x = Math.sin(speed * 0.5) * 0.2 - 0.1;
          armFL.upperPivot.rotation.z = -0.5;
          armFR.upperPivot.rotation.z = 0.5;
          armBL.upperPivot.rotation.z = -1;
          armBR.upperPivot.rotation.z = 1;
          return;
        }

        const breath = Math.sin(phase * 0.9) * 0.03;
        torso.scale.set(1 + breath, 1 - breath * 0.5, 1 + breath);
        bodyGroup.position.y = Math.sin(phase * 0.9) * 0.06;
        bodyGroup.rotation.y = Math.sin(phase * 0.4) * 0.05;
        armFL.upperPivot.rotation.z = -0.6 + Math.sin(phase * 0.8) * 0.1;
        armFR.upperPivot.rotation.z = 0.6 + Math.sin(phase * 0.8 + 1) * 0.1;
        armBL.upperPivot.rotation.z = -0.9 + Math.sin(phase * 0.7) * 0.08;
        armBR.upperPivot.rotation.z = 0.9 + Math.sin(phase * 0.7 + 1) * 0.08;
        neckGroup.rotation.x = Math.sin(phase * 0.6) * 0.08;
        headGroup.rotation.y = Math.sin(phase * 0.5) * 0.1;
        headGroup.rotation.x = Math.sin(phase * 0.7) * 0.06;
      }

      return { group: monster, update };
    }

    function createGoblinFujaoModel({ cargoTotals = null } = {}) {
      const skinMat = new THREE.MeshStandardMaterial({
        color: 0x6ebd5a,
        roughness: 0.78,
        emissive: new THREE.Color(0x14330c),
        emissiveIntensity: 0.12,
      });
      const clothMat = new THREE.MeshStandardMaterial({ color: 0x5d3b21, roughness: 0.92 });
      const darkClothMat = new THREE.MeshStandardMaterial({ color: 0x342010, roughness: 0.95 });
      const beltMat = new THREE.MeshStandardMaterial({ color: 0x8d6c3d, roughness: 0.7, metalness: 0.18 });
      const bagMat = new THREE.MeshStandardMaterial({ color: 0x6c4b2f, roughness: 0.94 });
      const strapMat = new THREE.MeshStandardMaterial({ color: 0x2c1b10, roughness: 0.96 });
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0xffa933,
        emissive: new THREE.Color(0xff7a18),
        emissiveIntensity: 2.8,
        roughness: 0.05,
        metalness: 0.15,
      });
      const auraMat = new THREE.MeshBasicMaterial({
        color: 0x72eaff,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const root = new THREE.Group();
      root.scale.setScalar(0.56);
      const bodyGroup = new THREE.Group();
      root.add(bodyGroup);

      const addMesh = (mesh, parent = bodyGroup) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
      };
      const box = (w, h, d, mat, px, py, pz, rx = 0, ry = 0, rz = 0, parent = bodyGroup) => {
        const mesh = addMesh(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat), parent);
        mesh.position.set(px, py, pz);
        mesh.rotation.set(rx, ry, rz);
        return mesh;
      };
      const sphere = (r, mat, px, py, pz, parent = bodyGroup) => {
        const mesh = addMesh(new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), mat), parent);
        mesh.position.set(px, py, pz);
        return mesh;
      };
      const cyl = (rt, rb, h, mat, px, py, pz, rx = 0, ry = 0, rz = 0, parent = bodyGroup, segments = 12) => {
        const mesh = addMesh(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), mat), parent);
        mesh.position.set(px, py, pz);
        mesh.rotation.set(rx, ry, rz);
        return mesh;
      };

      const torsoGroup = new THREE.Group();
      torsoGroup.position.set(0, 1.15, 0);
      bodyGroup.add(torsoGroup);
      box(0.66, 0.78, 0.42, clothMat, 0, 0, 0, 0, 0, 0, torsoGroup);
      box(0.58, 0.14, 0.38, beltMat, 0, -0.22, 0.02, 0, 0, 0, torsoGroup);
      box(0.2, 0.18, 0.14, darkClothMat, 0, -0.06, 0.19, 0, 0, 0, torsoGroup);

      const headGroup = new THREE.Group();
      headGroup.position.set(0, 1.76, 0.08);
      bodyGroup.add(headGroup);
      box(0.52, 0.46, 0.44, skinMat, 0, 0, 0, 0, 0, 0, headGroup);
      box(0.18, 0.12, 0.18, skinMat, 0, -0.04, 0.28, 0.1, 0, 0, headGroup);
      box(0.12, 0.2, 0.1, skinMat, -0.3, 0.07, -0.02, 0.1, 0, 0.7, headGroup);
      box(0.12, 0.2, 0.1, skinMat, 0.3, 0.07, -0.02, 0.1, 0, -0.7, headGroup);
      sphere(0.06, eyeMat, -0.11, 0.08, 0.23, headGroup);
      sphere(0.06, eyeMat, 0.11, 0.08, 0.23, headGroup);
      box(0.06, 0.04, 0.08, darkClothMat, -0.11, -0.11, 0.22, 0.1, 0, 0.24, headGroup);
      box(0.06, 0.04, 0.08, darkClothMat, 0.11, -0.11, 0.22, 0.1, 0, -0.24, headGroup);

      const armLGroup = new THREE.Group();
      armLGroup.position.set(-0.42, 1.42, 0.04);
      bodyGroup.add(armLGroup);
      box(0.18, 0.38, 0.18, clothMat, 0, -0.18, 0, 0, 0, 0, armLGroup);
      const foreArmLGroup = new THREE.Group();
      foreArmLGroup.position.set(0, -0.38, 0);
      armLGroup.add(foreArmLGroup);
      box(0.16, 0.34, 0.16, skinMat, 0, -0.17, 0, 0, 0, 0, foreArmLGroup);
      sphere(0.08, skinMat, 0, -0.38, 0.02, foreArmLGroup);

      const armRGroup = new THREE.Group();
      armRGroup.position.set(0.42, 1.42, 0.04);
      bodyGroup.add(armRGroup);
      box(0.18, 0.38, 0.18, clothMat, 0, -0.18, 0, 0, 0, 0, armRGroup);
      const foreArmRGroup = new THREE.Group();
      foreArmRGroup.position.set(0, -0.38, 0);
      armRGroup.add(foreArmRGroup);
      box(0.16, 0.34, 0.16, skinMat, 0, -0.17, 0, 0, 0, 0, foreArmRGroup);
      sphere(0.08, skinMat, 0, -0.38, 0.02, foreArmRGroup);

      const legLGroup = new THREE.Group();
      legLGroup.position.set(-0.16, 0.74, 0);
      bodyGroup.add(legLGroup);
      box(0.2, 0.42, 0.22, darkClothMat, 0, -0.21, 0, 0, 0, 0, legLGroup);
      const shinLGroup = new THREE.Group();
      shinLGroup.position.set(0, -0.42, 0);
      legLGroup.add(shinLGroup);
      box(0.18, 0.4, 0.18, skinMat, 0, -0.2, 0, 0, 0, 0, shinLGroup);
      box(0.24, 0.1, 0.38, darkClothMat, 0, -0.42, 0.08, 0, 0, 0, shinLGroup);

      const legRGroup = new THREE.Group();
      legRGroup.position.set(0.16, 0.74, 0);
      bodyGroup.add(legRGroup);
      box(0.2, 0.42, 0.22, darkClothMat, 0, -0.21, 0, 0, 0, 0, legRGroup);
      const shinRGroup = new THREE.Group();
      shinRGroup.position.set(0, -0.42, 0);
      legRGroup.add(shinRGroup);
      box(0.18, 0.4, 0.18, skinMat, 0, -0.2, 0, 0, 0, 0, shinRGroup);
      box(0.24, 0.1, 0.38, darkClothMat, 0, -0.42, 0.08, 0, 0, 0, shinRGroup);

      const sackGroup = new THREE.Group();
      sackGroup.position.set(0, 1.36, -0.34);
      bodyGroup.add(sackGroup);
      sphere(0.32, bagMat, 0, 0, 0, sackGroup);
      sphere(0.28, bagMat, 0.08, 0.2, -0.06, sackGroup);
      box(0.08, 0.74, 0.08, strapMat, -0.2, 0.1, 0.18, 0.2, 0, 0.36, sackGroup);
      box(0.08, 0.74, 0.08, strapMat, 0.2, 0.1, 0.18, 0.2, 0, -0.36, sackGroup);

      const cargoEntries = oreDefinitions
        .map((definition) => ({ definition, amount: Math.max(0, Math.floor(Number(cargoTotals?.[definition.id] ?? 0))) }))
        .filter((entry) => entry.amount > 0);
      const cargoPieces = [];
      const cargoVisualCount = THREE.MathUtils.clamp(
        cargoEntries.reduce((sum, entry) => sum + Math.min(4, entry.amount), 0),
        6,
        14
      );
      for (let i = 0; i < cargoVisualCount; i++) {
        const entry = cargoEntries.length
          ? cargoEntries[i % cargoEntries.length]
          : { definition: randomFrom(oreDefinitions) ?? oreDefinitions[0], amount: 1 };
        const piece = addMesh(new THREE.Mesh(
          new THREE.IcosahedronGeometry(randomRange(0.045, 0.08), 0),
          new THREE.MeshStandardMaterial({
            color: entry.definition.color,
            emissive: entry.definition.emissive,
            emissiveIntensity: 0.95,
            roughness: 0.18,
            metalness: 0.22,
          })
        ), sackGroup);
        piece.position.set(randomRange(-0.16, 0.18), randomRange(0.02, 0.3), randomRange(0.08, 0.24));
        piece.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
        piece.userData.baseY = piece.position.y;
        piece.userData.phase = world.rng() * Math.PI * 2;
        cargoPieces.push(piece);
      }

      const aura = new THREE.Mesh(new THREE.SphereGeometry(0.84, 14, 12), auraMat);
      aura.scale.set(1, 1.18, 1);
      aura.position.set(0, 1.28, -0.04);
      aura.castShadow = false;
      aura.receiveShadow = false;
      bodyGroup.add(aura);

      const auraParticles = [];
      for (let i = 0; i < 7; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.03 + (i % 3) * 0.008, 8, 8),
          new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x76f7ff : 0x7dff8a,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        particle.castShadow = false;
        particle.userData.angle = (i / 7) * Math.PI * 2;
        particle.userData.radius = 0.58 + (i % 2) * 0.09;
        particle.userData.height = 1.08 + (i % 3) * 0.18;
        bodyGroup.add(particle);
        auraParticles.push(particle);
      }

      function resetPose() {
        bodyGroup.position.set(0, 0, 0);
        bodyGroup.rotation.set(0, 0, 0);
        torsoGroup.rotation.set(-0.08, 0, 0);
        headGroup.rotation.set(0, 0, 0);
        armLGroup.rotation.set(-0.18, 0, 0.15);
        armRGroup.rotation.set(-0.18, 0, -0.15);
        foreArmLGroup.rotation.set(0.2, 0, 0);
        foreArmRGroup.rotation.set(0.2, 0, 0);
        legLGroup.rotation.set(0, 0, 0);
        legRGroup.rotation.set(0, 0, 0);
        shinLGroup.rotation.set(0, 0, 0);
        shinRGroup.rotation.set(0, 0, 0);
        sackGroup.rotation.set(0.15, 0, 0);
      }

      function update(delta, mode = 'idle', phase = 0, attackProgress = 0, hitFlash = 0) {
        resetPose();
        skinMat.emissiveIntensity = 0.12 + hitFlash * 1.45;
        eyeMat.emissiveIntensity = 2.8 + Math.sin(phase * 6) * 0.45 + hitFlash * 3.5;
        aura.material.opacity = 0.05 + Math.sin(phase * 2.2) * 0.015 + hitFlash * 0.12;
        aura.rotation.y += delta * 0.45;

        cargoPieces.forEach((piece, index) => {
          piece.position.y = piece.userData.baseY + Math.sin(phase * 2.4 + piece.userData.phase) * 0.015;
          piece.rotation.x += delta * (0.8 + index * 0.05);
          piece.rotation.y += delta * (1.2 + index * 0.08);
        });
        auraParticles.forEach((particle, index) => {
          const angle = particle.userData.angle + phase * (0.8 + index * 0.05);
          particle.position.set(
            Math.cos(angle) * particle.userData.radius,
            particle.userData.height + Math.sin(phase * 1.7 + index) * 0.05,
            Math.sin(angle) * particle.userData.radius * 0.7
          );
        });

        if (mode === 'run') {
          const speed = phase * 7.4;
          bodyGroup.position.y = Math.abs(Math.sin(speed * 2)) * 0.09;
          bodyGroup.rotation.z = Math.sin(speed) * 0.08;
          torsoGroup.rotation.x = -0.3 + Math.cos(speed) * 0.05;
          headGroup.rotation.x = 0.16 + Math.sin(speed + 0.5) * 0.06;
          headGroup.rotation.z = Math.sin(speed * 0.5) * 0.04;
          armLGroup.rotation.x = Math.sin(speed + Math.PI) * 0.95 - 0.18;
          armRGroup.rotation.x = Math.sin(speed) * 0.95 - 0.18;
          foreArmLGroup.rotation.x = Math.max(0.08, Math.sin(speed + Math.PI) * 0.35 + 0.34);
          foreArmRGroup.rotation.x = Math.max(0.08, Math.sin(speed) * 0.35 + 0.34);
          legLGroup.rotation.x = Math.sin(speed) * 1.05;
          legRGroup.rotation.x = Math.sin(speed + Math.PI) * 1.05;
          shinLGroup.rotation.x = Math.max(-0.2, Math.sin(speed + 0.8) * 0.72 - 0.18);
          shinRGroup.rotation.x = Math.max(-0.2, Math.sin(speed + Math.PI + 0.8) * 0.72 - 0.18);
          sackGroup.position.y = 1.36 + Math.sin(speed * 2 + 0.8) * 0.06;
          sackGroup.rotation.x = 0.24 + Math.sin(speed + 0.7) * 0.1;
          sackGroup.rotation.z = Math.sin(speed) * 0.16;
          return;
        }

        if (mode === 'walk') {
          const speed = phase * 3.4;
          bodyGroup.position.y = Math.abs(Math.sin(speed * 2)) * 0.04;
          torsoGroup.rotation.x = -0.12 + Math.cos(speed) * 0.03;
          headGroup.rotation.y = Math.sin(speed * 0.5) * 0.12;
          armLGroup.rotation.x = Math.sin(speed + Math.PI) * 0.34 - 0.18;
          armRGroup.rotation.x = Math.sin(speed) * 0.34 - 0.18;
          legLGroup.rotation.x = Math.sin(speed) * 0.46;
          legRGroup.rotation.x = Math.sin(speed + Math.PI) * 0.46;
          shinLGroup.rotation.x = Math.max(-0.12, Math.sin(speed + 0.8) * 0.26 - 0.12);
          shinRGroup.rotation.x = Math.max(-0.12, Math.sin(speed + Math.PI + 0.8) * 0.26 - 0.12);
          sackGroup.rotation.z = Math.sin(speed) * 0.08;
          return;
        }

        if (mode === 'alert') {
          bodyGroup.position.y = 0.06;
          torsoGroup.rotation.x = -0.2;
          headGroup.rotation.y = Math.sin(phase * 4.5) * 0.34;
          headGroup.rotation.x = 0.08;
          armLGroup.rotation.x = -0.32;
          armRGroup.rotation.x = -0.32;
          sackGroup.rotation.x = 0.22;
          return;
        }

        const breath = Math.sin(phase * 1.3) * 0.03;
        bodyGroup.position.y = breath;
        torsoGroup.rotation.x = -0.08 + breath * 0.4;
        headGroup.rotation.y = Math.sin(phase * 0.7) * 0.1;
        headGroup.rotation.x = Math.sin(phase * 0.9) * 0.04;
        armLGroup.rotation.x = -0.18 + Math.sin(phase * 0.9) * 0.08;
        armRGroup.rotation.x = -0.18 + Math.sin(phase * 0.9 + 1.2) * 0.08;
        sackGroup.rotation.z = Math.sin(phase * 0.8) * 0.04;
      }

      return { group: root, update };
    }

    function scheduleNextMonsterSpawn() {
      monsterState.nextSpawnAt = clock.elapsedTime + randomRange(monsterState.minSpawnDelay, monsterState.maxSpawnDelay);
    }

    function findMonsterSpawnPosition(monsterRadius = 0.58) {
      if (areaState.currentArea !== 'cave') return null;
      const playerX = getPlayerX();
      const playerZ = getPlayerZ();
      const minPlayerDistanceSq = 9 * 9;

      for (let attempt = 0; attempt < 80; attempt++) {
        let x;
        let z;
        if (world.oreNodes.length && world.rng() < 0.72) {
          const node = randomFrom(world.oreNodes);
          const angle = randomRange(0, Math.PI * 2);
          const distance = randomRange(1.8, 3.8);
          x = node.position.x + Math.cos(angle) * distance;
          z = node.position.z + Math.sin(angle) * distance;
        } else {
          const cellX = randInt(2, world.width - 3);
          const cellY = randInt(2, world.height - 3);
          if (isWall(cellX, cellY)) continue;
          x = cellToWorldX(cellX) + randomRange(-0.4, 0.4);
          z = cellToWorldZ(cellY) + randomRange(-0.4, 0.4);
        }

        const dx = x - playerX;
        const dz = z - playerZ;
        if (dx * dx + dz * dz < minPlayerDistanceSq) continue;
        if (blockedAt(x, z, monsterRadius)) continue;
        return new THREE.Vector3(x, floorHeightAt(x, z), z);
      }

      return null;
    }

    function getRandomMonsterDefinition() {
      if (!monsterDefinitions.length) return null;
      let totalWeight = 0;
      for (const definition of monsterDefinitions) {
        totalWeight += Math.max(0.01, Number(definition.spawnWeight) || 1);
      }
      let roll = world.rng() * totalWeight;
      for (const definition of monsterDefinitions) {
        roll -= Math.max(0.01, Number(definition.spawnWeight) || 1);
        if (roll <= 0) return definition;
      }
      return monsterDefinitions[monsterDefinitions.length - 1];
    }

    function createGoblinCargoTotals(definition) {
      const totals = Object.fromEntries(oreDefinitions.map((ore) => [ore.id, 0]));
      const weightedOres = oreDefinitions
        .map((ore) => ({
          ore,
          weight: sanitizeNumberValue(definition.cargoWeights?.[ore.id] ?? ore.rarity, ore.rarity, 0, 100, 2),
        }))
        .filter((entry) => entry.weight > 0);
      if (!weightedOres.length) return totals;

      const totalCount = randInt(definition.cargoMin ?? 10, definition.cargoMax ?? 25);
      const totalWeight = weightedOres.reduce((sum, entry) => sum + entry.weight, 0);
      for (let i = 0; i < totalCount; i++) {
        let roll = world.rng() * totalWeight;
        let chosen = weightedOres[0].ore;
        for (const entry of weightedOres) {
          roll -= entry.weight;
          if (roll <= 0) {
            chosen = entry.ore;
            break;
          }
        }
        totals[chosen.id] += 1;
      }
      return totals;
    }

    function spawnMonster() {
      const definition = getRandomMonsterDefinition();
      if (!definition) return false;
      const position = findMonsterSpawnPosition(definition.radius);
      if (!position) return false;
      const cargoTotals = definition.behavior === 'flee' ? createGoblinCargoTotals(definition) : null;
      const model = definition.modelFactory({ cargoTotals });
      model.group.position.copy(position);
      model.group.rotation.y = randomRange(0, Math.PI * 2);
      world.group.add(model.group);

      const monster = {
        id: `monster-${Math.round(world.rng() * 1e9)}`,
        definition,
        group: model.group,
        model,
        hp: definition.health,
        maxHp: definition.health,
        radius: definition.radius,
        mode: 'idle',
        aiTimer: randomRange(1.4, 3.2),
        phase: randomRange(0, Math.PI * 2),
        wanderAngle: randomRange(0, Math.PI * 2),
        attackTimer: 0,
        attackDuration: definition.attackDuration,
        attackHitDone: false,
        attackCooldown: randomRange(0.2, 0.9),
        hitFlash: 0,
        alerted: false,
        cargoTotals,
        fleeMemory: 0,
        path: [],
        pathIndex: 0,
        pathRepathTimer: 0,
        stuckTimer: 0,
        dead: false,
      };
      createMonsterHealthBar(monster);
      world.monsters.push(monster);
      return true;
    }

    function buildInitialMonsters() {
      if (areaState.currentArea !== 'cave') return;
      const targetCount = Math.min(3, Math.max(1, Math.floor(world.oreNodes.length / 12)));
      for (let i = 0; i < targetCount; i++) {
        spawnMonster();
      }
      scheduleNextMonsterSpawn();
    }

    function removeMonster(monster) {
      monster.dead = true;
      if (monster.cargoTotals) {
        spawnOreDropsFromTotals(monster.cargoTotals, monster.group.position, 0.34);
      }
      destroyMonsterHealthBar(monster);
      removeArrayValueInPlace(world.monsters, monster);
      world.group.remove(monster.group);
      disposeGroup(monster.group);
    }

    function getSwordAttackTarget() {
      if (!world.monsters.length) return null;
      getForwardDirection(combatForward);
      combatForward.y = 0;
      if (combatForward.lengthSq() < 0.001) return null;
      combatForward.normalize();

      let bestMonster = null;
      let bestScore = -Infinity;
      const rangeSq = combatState.range * combatState.range;
      for (const monster of world.monsters) {
        if (monster.dead || monster.hp <= 0) continue;
        combatDelta.set(monster.group.position.x - getPlayerX(), 0, monster.group.position.z - getPlayerZ());
        const distanceSq = combatDelta.lengthSq();
        if (distanceSq > rangeSq || distanceSq <= 0.0001) continue;
        const distance = Math.sqrt(distanceSq);
        combatDelta.multiplyScalar(1 / distance);
        const dot = combatDelta.dot(combatForward);
        if (dot < combatState.arcDot) continue;
        const score = dot * 2 - distance / combatState.range;
        if (score > bestScore) {
          bestScore = score;
          bestMonster = monster;
        }
      }
      return bestMonster;
    }

    function spawnMonsterHitSparks(monster) {
      const count = 8;
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(randomRange(0.035, 0.07), 0),
          new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xff4a4a : 0x00ffaa,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        mesh.position.set(
          monster.group.position.x + randomRange(-0.28, 0.28),
          monster.group.position.y + randomRange(0.65, 1.45),
          monster.group.position.z + randomRange(-0.28, 0.28)
        );
        world.group.add(mesh);
        const life = randomRange(0.2, 0.34);
        world.sparkParticles.push({
          mesh,
          velocity: new THREE.Vector3(randomRange(-1.8, 1.8), randomRange(1.4, 3), randomRange(-1.8, 1.8)),
          life,
          maxLife: life,
          spin: new THREE.Vector3(randomRange(-12, 12), randomRange(-12, 12), randomRange(-12, 12)),
        });
      }
    }

    function damageMonster(monster, amount, hitPosition = null) {
      if (!monster || monster.dead || monster.hp <= 0) return false;
      monster.hp = Math.max(0, monster.hp - amount);
      monster.hitFlash = 1;
      if (monster.definition.behavior === 'flee') {
        monster.alerted = true;
        monster.fleeMemory = monster.definition.fleeForgetTime ?? 1.8;
      }
      if (hitPosition) {
        uiWorldPosition.copy(hitPosition);
      } else {
        uiWorldPosition.copy(monster.group.position);
        uiWorldPosition.y += monster.definition.uiHeadHeight ?? Math.max(1.5, monster.radius * 3.4);
      }
      uiWorldPosition.x += randomRange(-0.18, 0.18);
      uiWorldPosition.z += randomRange(-0.18, 0.18);
      spawnFloatingDamageText(uiWorldPosition, amount, 'monster-hit');
      spawnMonsterHitSparks(monster);
      if (monster.hp <= 0) removeMonster(monster);
      updateMiningHud();
      return true;
    }

    function getCrossbowTarget(aimSamples = getActiveAimSamples(), range = getCrossbowDefinition().range) {
      if (!itemState.gameActive || !isItemKindEquipped('crossbow') || !aimSamples?.length || !world.monsters.length) return null;
      let bestTarget = null;
      let bestScore = Infinity;
      raycaster.near = 0;
      raycaster.far = getRaycastReach(range);
      for (let sampleIndex = 0; sampleIndex < aimSamples.length; sampleIndex++) {
        raycaster.setFromCamera(aimSamples[sampleIndex], camera);
        for (const monster of world.monsters) {
          if (monster.dead || monster.hp <= 0) continue;
          if (!hasWorldLineOfSight(monster.group.position.x, monster.group.position.z)) continue;
          projectileHitSphere.center.copy(monster.group.position);
          projectileHitSphere.center.y += (monster.definition.uiHeadHeight ?? Math.max(1.4, monster.radius * 3.2)) * 0.46;
          projectileHitSphere.radius = Math.max(0.36, monster.radius * 1.18);
          const hitPoint = raycaster.ray.intersectSphere(projectileHitSphere, projectileImpactPosition);
          if (!hitPoint) continue;
          const rayDistance = raycaster.ray.origin.distanceTo(hitPoint);
          if (rayDistance > raycaster.far) continue;
          const score = rayDistance + sampleIndex * 0.24;
          if (score < bestScore) {
            bestScore = score;
            bestTarget = monster;
          }
        }
      }
      return bestTarget;
    }

    function tryFireCrossbow() {
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen || !isItemKindEquipped('crossbow')) return false;
      const definition = getCrossbowDefinition();
      const now = clock.elapsedTime;
      crossbowState.shotDuration = getWeaponAttackDuration('crossbow');
      crossbowState.cooldown = definition.cooldown;
      if (now - crossbowState.lastShotAt < crossbowState.cooldown) return false;
      crossbowState.lastShotAt = now;
      crossbowState.shotTimer = crossbowState.shotDuration;

      const targetMonster = getCrossbowTarget();
      const aimSamples = getActiveAimSamples();
      const aimSample = aimSamples?.[0] ?? screenCenter;
      raycaster.near = 0;
      raycaster.far = getRaycastReach(definition.range);
      raycaster.setFromCamera(aimSample, camera);
      crossbowAimOrigin.copy(raycaster.ray.origin);
      if (targetMonster) {
        crossbowAimPoint.copy(targetMonster.group.position);
        crossbowAimPoint.y += (targetMonster.definition.uiHeadHeight ?? Math.max(1.4, targetMonster.radius * 3.2)) * 0.46;
      } else {
        raycaster.ray.at(raycaster.far, crossbowAimPoint);
      }

      getPlayerInteractionOrigin(projectileStartPosition);
      getForwardDirection(projectileDirection);
      projectileStartPosition.addScaledVector(projectileDirection, 0.48);
      projectileStartPosition.y -= 0.08;
      projectileDirection.copy(crossbowAimPoint).sub(projectileStartPosition);
      if (projectileDirection.lengthSq() < 0.0001) {
        getForwardDirection(projectileDirection);
      } else {
        projectileDirection.normalize();
      }

      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.62, 8),
        new THREE.MeshStandardMaterial({
          color: 0xdfefff,
          emissive: 0x6aeaff,
          emissiveIntensity: 0.55,
          roughness: 0.18,
          metalness: 0.34,
        })
      );
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.065, 0.18, 5),
        new THREE.MeshStandardMaterial({ color: 0x8fd8ff, emissive: 0x5bd6ff, emissiveIntensity: 0.45, roughness: 0.18, metalness: 0.86 })
      );
      tip.position.y = 0.34;
      mesh.add(tip);
      mesh.position.copy(projectileStartPosition);
      mesh.quaternion.setFromUnitVectors(up, projectileDirection.clone().normalize());
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      world.group.add(mesh);
      world.projectiles.push({
        mesh,
        position: projectileStartPosition.clone(),
        direction: projectileDirection.clone(),
        speed: definition.projectileSpeed,
        rangeLeft: definition.range,
        damage: definition.damage,
      });
      updateMiningHud();
      return true;
    }

    function tryAttackWithSword() {
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen || !isItemKindEquipped('sword')) return;
      const now = clock.elapsedTime;
      if (now - combatState.lastAttackAt < combatState.attackCooldown) return;
      combatState.attackDuration = getWeaponAttackDuration('sword');
      combatState.attackCooldown = Math.max(0.3, combatState.attackDuration * 0.95);
      combatState.attackComboIndex = 0;
      combatState.lastAttackAt = now;
      combatState.attackTimer = combatState.attackDuration;
      combatState.attackHitDone = false;
    }

    function damagePlayer(amount) {
      if (clock.elapsedTime < combatState.invulnerableUntil || playerStats.health <= 0) return;
      combatState.invulnerableUntil = clock.elapsedTime + 0.85;
      combatState.damageFlashTimer = 0.18;
      playerStats.health = Math.max(0, playerStats.health - amount);
      getPlayerInteractionOrigin(uiWorldPosition);
      uiWorldPosition.y += 0.42;
      uiWorldPosition.x += randomRange(-0.14, 0.14);
      uiWorldPosition.z += randomRange(-0.14, 0.14);
      spawnFloatingDamageText(uiWorldPosition, amount, 'player-hit');
      document.body.classList.add('player-hit');
      updateCombatHud();
      saveGame();

      if (playerStats.health <= 0) {
        playerStats.health = playerStats.maxHealth;
        areaState.currentArea = 'home';
        areaState.caveSeed = null;
        rebuildWorld();
        updateCombatHud();
        saveGame();
      }
    }

    function updateCombatState(delta) {
      if (combatState.damageFlashTimer > 0) {
        combatState.damageFlashTimer = Math.max(0, combatState.damageFlashTimer - delta);
        if (combatState.damageFlashTimer === 0) document.body.classList.remove('player-hit');
      }

      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      if (combatState.attackTimer <= 0) return;
      combatState.attackTimer = Math.max(0, combatState.attackTimer - delta);
      const progress = 1 - combatState.attackTimer / combatState.attackDuration;
      if (!combatState.attackHitDone && progress >= combatState.attackHitWindow) {
        combatState.attackHitDone = true;
        const target = getSwordAttackTarget();
        if (target) {
          const swordDefinition = getSwordDefinition();
          uiWorldPosition.copy(target.group.position);
          uiWorldPosition.y += target.definition.uiHeadHeight ?? Math.max(1.5, target.radius * 3.4);
          damageMonster(target, swordDefinition.damage, uiWorldPosition);
        }
      }
    }

    function updateCrossbowState(delta) {
      if (crossbowState.shotTimer > 0) {
        crossbowState.shotTimer = Math.max(0, crossbowState.shotTimer - delta);
      }
    }

    function clearProjectiles() {
      for (const projectile of world.projectiles) {
        world.group.remove(projectile.mesh);
        disposeGroup(projectile.mesh);
      }
      world.projectiles.length = 0;
    }

    function updateProjectiles(delta) {
      if (!world.projectiles.length) return;
      let writeIndex = 0;
      for (const projectile of world.projectiles) {
        let remainingTravel = Math.min(projectile.rangeLeft, projectile.speed * delta);
        let destroyed = false;
        while (remainingTravel > 0 && !destroyed) {
          const step = Math.min(0.34, remainingTravel);
          projectileStartPosition.copy(projectile.position);
          projectileNextPosition.copy(projectile.position).addScaledVector(projectile.direction, step);
          projectileLine.start.copy(projectileStartPosition);
          projectileLine.end.copy(projectileNextPosition);

          let bestTarget = null;
          let bestDistance = Infinity;
          for (const monster of world.monsters) {
            if (monster.dead || monster.hp <= 0) continue;
            projectileHitCenter.copy(monster.group.position);
            projectileHitCenter.y += (monster.definition.uiHeadHeight ?? Math.max(1.4, monster.radius * 3.2)) * 0.46;
            projectileLine.closestPointToPoint(projectileHitCenter, true, projectileClosestPoint);
            const distanceSq = projectileClosestPoint.distanceToSquared(projectileHitCenter);
            const hitRadius = Math.max(0.34, monster.radius * 1.12);
            if (distanceSq <= hitRadius * hitRadius) {
              const distanceAlong = projectileStartPosition.distanceToSquared(projectileClosestPoint);
              if (distanceAlong < bestDistance) {
                bestDistance = distanceAlong;
                bestTarget = monster;
                projectileImpactPosition.copy(projectileClosestPoint);
              }
            }
          }

          if (bestTarget) {
            damageMonster(bestTarget, projectile.damage, projectileImpactPosition);
            world.group.remove(projectile.mesh);
            disposeGroup(projectile.mesh);
            destroyed = true;
            break;
          }

          if (blockedAt(projectileNextPosition.x, projectileNextPosition.z, 0.05)) {
            world.group.remove(projectile.mesh);
            disposeGroup(projectile.mesh);
            destroyed = true;
            break;
          }

          projectile.position.copy(projectileNextPosition);
          projectile.mesh.position.copy(projectile.position);
          projectile.rangeLeft -= step;
          remainingTravel -= step;

          if (projectile.rangeLeft <= 0) {
            world.group.remove(projectile.mesh);
            disposeGroup(projectile.mesh);
            destroyed = true;
            break;
          }
        }

        if (destroyed) continue;
        world.projectiles[writeIndex++] = projectile;
      }
      world.projectiles.length = writeIndex;
    }

    function rotateMonsterToward(monster, x, z, delta) {
      const dx = x - monster.group.position.x;
      const dz = z - monster.group.position.z;
      if (dx * dx + dz * dz < 0.0001) return;
      const targetYaw = Math.atan2(dx, dz);
      const diff = THREE.MathUtils.euclideanModulo(targetYaw - monster.group.rotation.y + Math.PI, Math.PI * 2) - Math.PI;
      monster.group.rotation.y += diff * Math.min(1, delta * 7);
    }

    function tryMoveMonster(monster, dx, dz) {
      const nextX = monster.group.position.x + dx;
      if (!blockedAt(nextX, monster.group.position.z, monster.radius)) monster.group.position.x = nextX;
      const nextZ = monster.group.position.z + dz;
      if (!blockedAt(monster.group.position.x, nextZ, monster.radius)) monster.group.position.z = nextZ;
      monster.group.position.y = floorHeightAt(monster.group.position.x, monster.group.position.z);
    }

    function isMonsterNavCellOpen(cellX, cellY, monsterRadius) {
      if (!insideMap(cellX, cellY) || world.map[cellY][cellX] !== 0) return false;
      return !blockedAt(cellToWorldX(cellX), cellToWorldZ(cellY), Math.max(0.14, monsterRadius * 0.72));
    }

    function countMonsterNavNeighbors(cellX, cellY, monsterRadius) {
      let count = 0;
      for (const dir of DIRS) {
        if (isMonsterNavCellOpen(cellX + dir.x, cellY + dir.y, monsterRadius)) count++;
      }
      return count;
    }

    function rebuildFleePath(monster, playerX, playerZ) {
      const startCellX = worldToCellX(monster.group.position.x);
      const startCellY = worldToCellY(monster.group.position.z);
      if (!isMonsterNavCellOpen(startCellX, startCellY, monster.radius)) {
        monster.path = [];
        monster.pathIndex = 0;
        return false;
      }

      const playerCellX = worldToCellX(playerX);
      const playerCellY = worldToCellY(playerZ);
      const width = world.width;
      const height = world.height;
      const totalCells = width * height;
      const parents = new Int32Array(totalCells);
      const steps = new Int16Array(totalCells);
      parents.fill(-1);
      steps.fill(-1);

      const queueX = [];
      const queueY = [];
      const startIndex = startCellY * width + startCellX;
      const maxSteps = Math.max(12, Math.ceil((monster.definition.fleeEscapeRange ?? 12.5) / world.cellSize) + 7);
      const minDesiredPlayerDistance = Math.max(4, Math.ceil((monster.definition.fleeEscapeRange ?? 12.5) / world.cellSize * 0.7));
      let bestIndex = startIndex;
      let bestScore = -Infinity;
      let readIndex = 0;

      queueX.push(startCellX);
      queueY.push(startCellY);
      parents[startIndex] = startIndex;
      steps[startIndex] = 0;

      while (readIndex < queueX.length) {
        const cellX = queueX[readIndex];
        const cellY = queueY[readIndex];
        readIndex++;
        const cellIndex = cellY * width + cellX;
        const step = steps[cellIndex];

        if (step > 0) {
          const playerDx = cellX - playerCellX;
          const playerDy = cellY - playerCellY;
          const playerDistanceSq = playerDx * playerDx + playerDy * playerDy;
          const openBonus = countMonsterNavNeighbors(cellX, cellY, monster.radius) * 0.35;
          const score = playerDistanceSq * 6 + openBonus - step * 0.4;
          if (
            playerDistanceSq >= minDesiredPlayerDistance * minDesiredPlayerDistance
            ? score > bestScore
            : bestIndex === startIndex && score > bestScore
          ) {
            bestScore = score;
            bestIndex = cellIndex;
          }
        }

        if (step >= maxSteps) continue;

        for (const dir of DIRS) {
          const nextX = cellX + dir.x;
          const nextY = cellY + dir.y;
          if (!isMonsterNavCellOpen(nextX, nextY, monster.radius)) continue;
          const nextIndex = nextY * width + nextX;
          if (steps[nextIndex] !== -1) continue;
          steps[nextIndex] = step + 1;
          parents[nextIndex] = cellIndex;
          queueX.push(nextX);
          queueY.push(nextY);
        }
      }

      if (bestIndex === startIndex || parents[bestIndex] === -1) {
        monster.path = [];
        monster.pathIndex = 0;
        return false;
      }

      const path = [];
      let cursor = bestIndex;
      while (cursor !== startIndex && cursor !== -1) {
        const cellY = Math.floor(cursor / width);
        const cellX = cursor - cellY * width;
        path.push({
          cellX,
          cellY,
          x: cellToWorldX(cellX),
          z: cellToWorldZ(cellY),
        });
        cursor = parents[cursor];
      }

      path.reverse();
      monster.path = path;
      monster.pathIndex = 0;
      monster.pathRepathTimer = randomRange(0.22, 0.38);
      monster.stuckTimer = 0;
      return path.length > 0;
    }

    function moveMonsterAlongPath(monster, speed, delta) {
      if (!monster.path?.length) return false;

      let moved = false;
      while (monster.pathIndex < monster.path.length) {
        const waypoint = monster.path[monster.pathIndex];
        const dx = waypoint.x - monster.group.position.x;
        const dz = waypoint.z - monster.group.position.z;
        const distance = Math.hypot(dx, dz);
        if (distance <= 0.18) {
          monster.pathIndex++;
          continue;
        }

        const step = Math.min(speed * delta, distance);
        const dirX = dx / distance;
        const dirZ = dz / distance;
        const startX = monster.group.position.x;
        const startZ = monster.group.position.z;
        tryMoveMonster(monster, dirX * step, dirZ * step);
        rotateMonsterToward(monster, waypoint.x, waypoint.z, delta);
        moved = Math.hypot(monster.group.position.x - startX, monster.group.position.z - startZ) > 0.002;
        if (distance - step <= 0.18) {
          monster.pathIndex++;
        }
        break;
      }

      if (!moved && monster.pathIndex < monster.path.length) {
        monster.stuckTimer += delta;
      } else {
        monster.stuckTimer = Math.max(0, monster.stuckTimer - delta * 3);
      }

      if (monster.pathIndex >= monster.path.length) {
        monster.path.length = 0;
        monster.pathIndex = 0;
      }

      return moved;
    }

    function updateMonsters(delta) {
      if (areaState.currentArea !== 'cave') return;
      if (!itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      const maxMonsters = mobileState.enabled ? Math.min(4, monsterState.maxMonsters) : monsterState.maxMonsters;
      if (world.monsters.length < maxMonsters && clock.elapsedTime >= monsterState.nextSpawnAt) {
        spawnMonster();
        scheduleNextMonsterSpawn();
      }

      let writeIndex = 0;
      for (const monster of world.monsters) {
        if (monster.dead) continue;
        monster.phase += delta;
        monster.hitFlash = damp(monster.hitFlash, 0, 9, delta);
        monster.attackCooldown = Math.max(0, monster.attackCooldown - delta);
        combatDelta.set(getPlayerX() - monster.group.position.x, 0, getPlayerZ() - monster.group.position.z);
        const distanceToPlayer = combatDelta.length();
        let mode = 'idle';

        if (monster.definition.behavior === 'flee') {
          monster.fleeMemory = Math.max(0, monster.fleeMemory - delta);
          const hasSight = distanceToPlayer <= (monster.definition.fleeTriggerRange ?? monster.definition.chaseRange)
            && hasWorldLineOfSight(monster.group.position.x, monster.group.position.z);
          if (distanceToPlayer > 0.0001) {
            monsterTargetVector.copy(combatDelta).multiplyScalar(1 / distanceToPlayer);
          } else {
            monsterTargetVector.set(0, 0, 1);
          }
          monsterForwardVector.set(Math.sin(monster.group.rotation.y), 0, Math.cos(monster.group.rotation.y));
          const approachDot = monsterForwardVector.dot(monsterTargetVector);
          const playerBehind = approachDot <= (monster.definition.spotConeDot ?? -0.2);

          if (hasSight && !playerBehind) {
            monster.alerted = true;
            monster.fleeMemory = monster.definition.fleeForgetTime ?? 1.8;
          }

          if (monster.alerted) {
            mode = 'run';
            monster.pathRepathTimer = Math.max(0, (monster.pathRepathTimer ?? 0) - delta);
            const shouldRepath = (
              !monster.path?.length
              || monster.pathIndex >= monster.path.length
              || monster.pathRepathTimer <= 0
              || monster.stuckTimer > 0.24
            );
            if (shouldRepath) {
              rebuildFleePath(monster, getPlayerX(), getPlayerZ());
            }

            const movedByPath = moveMonsterAlongPath(monster, monster.definition.chaseSpeed, delta);
            if (!movedByPath) {
              if (distanceToPlayer > 0.0001) {
                monsterTargetVector.copy(combatDelta).normalize().multiplyScalar(-1);
              } else {
                monsterTargetVector.set(Math.sin(monster.group.rotation.y + Math.PI), 0, Math.cos(monster.group.rotation.y + Math.PI));
              }
              const beforeX = monster.group.position.x;
              const beforeZ = monster.group.position.z;
              tryMoveMonster(
                monster,
                monsterTargetVector.x * monster.definition.chaseSpeed * delta,
                monsterTargetVector.z * monster.definition.chaseSpeed * delta
              );
              rotateMonsterToward(
                monster,
                monster.group.position.x + monsterTargetVector.x * 2,
                monster.group.position.z + monsterTargetVector.z * 2,
                delta
              );
              if (Math.hypot(monster.group.position.x - beforeX, monster.group.position.z - beforeZ) <= 0.002) {
                monster.stuckTimer += delta;
                monster.pathRepathTimer = 0;
              }
            }

            if (distanceToPlayer >= (monster.definition.fleeEscapeRange ?? 12) && monster.fleeMemory <= 0) {
              monster.alerted = false;
              monster.mode = 'walk';
              monster.aiTimer = randomRange(0.8, 2.2);
              monster.path = [];
              monster.pathIndex = 0;
              monster.pathRepathTimer = 0;
              monster.stuckTimer = 0;
            }
          } else {
            monster.path = [];
            monster.pathIndex = 0;
            monster.pathRepathTimer = 0;
            monster.stuckTimer = 0;
            monster.aiTimer -= delta;
            if (monster.aiTimer <= 0) {
              monster.aiTimer = randomRange(1.2, 3.4);
              monster.mode = world.rng() < 0.5 ? 'idle' : 'walk';
              monster.wanderAngle = randomRange(0, Math.PI * 2);
            }
            mode = distanceToPlayer < 2.4 && hasSight && !playerBehind ? 'alert' : monster.mode;
            if (monster.mode === 'walk') {
              monsterMoveVector.set(Math.cos(monster.wanderAngle), 0, Math.sin(monster.wanderAngle));
              tryMoveMonster(monster, monsterMoveVector.x * monster.definition.wanderSpeed * delta, monsterMoveVector.z * monster.definition.wanderSpeed * delta);
              rotateMonsterToward(monster, monster.group.position.x + monsterMoveVector.x, monster.group.position.z + monsterMoveVector.z, delta);
            }
          }

          monster.model.update(delta, mode, monster.phase, 0, monster.hitFlash);
          world.monsters[writeIndex++] = monster;
          continue;
        }

        if (monster.attackTimer > 0) {
          monster.attackTimer = Math.max(0, monster.attackTimer - delta);
          const progress = 1 - monster.attackTimer / monster.attackDuration;
          mode = 'attack';
          rotateMonsterToward(monster, getPlayerX(), getPlayerZ(), delta);
          if (!monster.attackHitDone && progress > 0.42) {
            monster.attackHitDone = true;
            if (distanceToPlayer < monster.definition.attackHitDistance) damagePlayer(monster.definition.damage);
            if (areaState.currentArea !== 'cave') return;
          }
          monster.model.update(delta, mode, monster.phase, progress, monster.hitFlash);
          world.monsters[writeIndex++] = monster;
          continue;
        }

        if (distanceToPlayer < monster.definition.attackRange && monster.attackCooldown <= 0) {
          monster.attackTimer = monster.attackDuration;
          monster.attackHitDone = false;
          monster.attackCooldown = monster.definition.attackCooldown;
          mode = 'attack';
          rotateMonsterToward(monster, getPlayerX(), getPlayerZ(), delta);
          monster.model.update(delta, mode, monster.phase, 0, monster.hitFlash);
          world.monsters[writeIndex++] = monster;
          continue;
        }

        if (distanceToPlayer < monster.definition.chaseRange) {
          mode = distanceToPlayer < 2.5 ? 'alert' : 'walk';
          if (distanceToPlayer > monster.definition.chaseStopDistance) {
            monsterTargetVector.copy(combatDelta).normalize();
            tryMoveMonster(monster, monsterTargetVector.x * monster.definition.chaseSpeed * delta, monsterTargetVector.z * monster.definition.chaseSpeed * delta);
          }
          rotateMonsterToward(monster, getPlayerX(), getPlayerZ(), delta);
        } else {
          monster.aiTimer -= delta;
          if (monster.aiTimer <= 0) {
            monster.aiTimer = randomRange(1.4, 4.2);
            monster.mode = world.rng() < 0.58 ? 'idle' : 'walk';
            monster.wanderAngle = randomRange(0, Math.PI * 2);
          }
          mode = monster.mode;
          if (mode === 'walk') {
            monsterMoveVector.set(Math.cos(monster.wanderAngle), 0, Math.sin(monster.wanderAngle));
            tryMoveMonster(monster, monsterMoveVector.x * monster.definition.wanderSpeed * delta, monsterMoveVector.z * monster.definition.wanderSpeed * delta);
            rotateMonsterToward(monster, monster.group.position.x + monsterMoveVector.x, monster.group.position.z + monsterMoveVector.z, delta);
          }
        }

        monster.model.update(delta, mode, monster.phase, 0, monster.hitFlash);
        world.monsters[writeIndex++] = monster;
      }
      world.monsters.length = writeIndex;
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

    function applyModelShadows(group) {
      group.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }

    function createGameChestModel() {
      const chest = new THREE.Group();
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3318, roughness: 0.88, metalness: 0.05 });
      const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2f1a0c, roughness: 0.92, metalness: 0.03 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0xc08a32, roughness: 0.28, metalness: 0.9 });
      const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x2a2119, roughness: 0.45, metalness: 0.82 });
      const lockMat = new THREE.MeshStandardMaterial({ color: 0xffd36a, emissive: 0x332000, emissiveIntensity: 0.2, roughness: 0.22, metalness: 1 });
      const gemMat = new THREE.MeshStandardMaterial({ color: 0x39e6ff, emissive: 0x116f88, emissiveIntensity: 0.65, roughness: 0.12, metalness: 0.15 });

      function addBox(parent, size, position, material) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
        mesh.position.copy(position);
        parent.add(mesh);
        return mesh;
      }

      function addCylinder(parent, radiusTop, radiusBottom, height, position, rotation, material, segments = 18) {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
        mesh.position.copy(position);
        mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        parent.add(mesh);
        return mesh;
      }

      const base = new THREE.Group();
      chest.add(base);
      addBox(base, new THREE.Vector3(2.4, 1.08, 1.55), new THREE.Vector3(0, 0.54, 0), woodMat);
      addBox(base, new THREE.Vector3(2.52, 0.12, 1.66), new THREE.Vector3(0, 0.1, 0), darkWoodMat);
      addBox(base, new THREE.Vector3(2.54, 0.1, 0.08), new THREE.Vector3(0, 0.35, 0.82), metalMat);
      addBox(base, new THREE.Vector3(2.54, 0.1, 0.08), new THREE.Vector3(0, 0.82, 0.82), metalMat);
      addBox(base, new THREE.Vector3(2.54, 0.1, 0.08), new THREE.Vector3(0, 0.35, -0.82), metalMat);
      addBox(base, new THREE.Vector3(2.54, 0.1, 0.08), new THREE.Vector3(0, 0.82, -0.82), metalMat);
      for (const x of [-1.24, -0.42, 0.42, 1.24]) {
        addBox(base, new THREE.Vector3(0.11, 1.18, 0.09), new THREE.Vector3(x, 0.6, 0.83), metalMat);
        addBox(base, new THREE.Vector3(0.11, 1.18, 0.09), new THREE.Vector3(x, 0.6, -0.83), metalMat);
      }
      for (const x of [-0.82, 0.82]) {
        addBox(base, new THREE.Vector3(0.1, 1.08, 1.68), new THREE.Vector3(x, 0.58, 0), darkMetalMat);
      }
      for (const x of [-0.82, 0.82]) {
        for (const z of [-0.54, 0.54]) {
          addCylinder(base, 0.13, 0.13, 0.14, new THREE.Vector3(x, 0.08, z), new THREE.Vector3(0, 0, 0), darkWoodMat, 12);
        }
      }

      const lid = new THREE.Group();
      lid.position.set(0, 1.08, -0.78);
      chest.add(lid);
      addBox(lid, new THREE.Vector3(2.4, 0.5, 1.55), new THREE.Vector3(0, 0.25, 0.78), woodMat);
      const arch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 2.42, 24, 1, false, 0, Math.PI),
        woodMat
      );
      arch.position.set(0, 0.52, 0.78);
      arch.rotation.z = Math.PI / 2;
      lid.add(arch);
      addBox(lid, new THREE.Vector3(2.58, 0.1, 0.09), new THREE.Vector3(0, 0.28, 1.58), metalMat);
      addBox(lid, new THREE.Vector3(2.58, 0.1, 0.09), new THREE.Vector3(0, 0.28, -0.02), metalMat);
      for (const x of [-0.78, 0.78]) {
        addBox(lid, new THREE.Vector3(0.12, 0.62, 1.62), new THREE.Vector3(x, 0.36, 0.78), metalMat);
      }

      const lock = new THREE.Group();
      lock.position.set(0, 0.04, 1.65);
      lid.add(lock);
      addBox(lock, new THREE.Vector3(0.5, 0.42, 0.12), new THREE.Vector3(0, -0.05, 0), lockMat);
      addCylinder(lock, 0.16, 0.16, 0.1, new THREE.Vector3(0, 0.2, 0.02), new THREE.Vector3(Math.PI / 2, 0, 0), lockMat, 18);
      const lockGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), gemMat);
      lockGem.position.set(0, -0.06, 0.08);
      lock.add(lockGem);

      for (const x of [-0.8, 0.8]) {
        addCylinder(chest, 0.11, 0.11, 0.3, new THREE.Vector3(x, 1.18, -0.9), new THREE.Vector3(Math.PI / 2, 0, 0), darkMetalMat, 16);
      }

      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 10, 22, Math.PI), darkMetalMat);
      handle.position.set(0, 0.7, 0.86);
      handle.rotation.x = Math.PI / 2;
      chest.add(handle);

      applyModelShadows(chest);
      return chest;
    }

    function createGameWorkbenchModel() {
      const root = new THREE.Group();

      const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.9 });
      const matGold = new THREE.MeshStandardMaterial({ color: 0xd4a520, roughness: 0.2, metalness: 1.0 });
      const matWood = new THREE.MeshStandardMaterial({ color: 0x5a3010, roughness: 0.95 });
      const matDarkWood = new THREE.MeshStandardMaterial({ color: 0x2a1505, roughness: 0.95 });
      const matStone = new THREE.MeshStandardMaterial({ color: 0x666050, roughness: 1.0 });
      const matEmber = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, emissiveIntensity: 2.5, roughness: 0.8 });
      const matRune = new THREE.MeshStandardMaterial({ color: 0x44aaff, emissive: 0x2266ff, emissiveIntensity: 1.5, roughness: 0.4 });
      const matRed = new THREE.MeshStandardMaterial({ color: 0x991111, roughness: 0.8 });
      const matLeather = new THREE.MeshStandardMaterial({ color: 0x4a2a0a, roughness: 0.95 });

      function box(w, h, d, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        return mesh;
      }

      function sphere(r, mat, x = 0, y = 0, z = 0) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), mat);
        mesh.position.set(x, y, z);
        return mesh;
      }

      function cyl(rt, rb, h, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, seg = 16) {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        return mesh;
      }

      const bench = new THREE.Group();
      bench.position.set(0, 0, -1.1);
      root.add(bench);

      const tabletop = box(3.4, 0.14, 1.3, matWood, 0, 1.12, 0);
      bench.add(tabletop);
      bench.add(box(3.44, 0.08, 0.06, matDarkWood, 0, 1.12, 0.68));
      bench.add(box(3.44, 0.08, 0.06, matDarkWood, 0, 1.12, -0.68));
      bench.add(box(0.06, 0.08, 1.3, matDarkWood, -1.73, 1.12, 0));
      bench.add(box(0.06, 0.08, 1.3, matDarkWood, 1.73, 1.12, 0));
      bench.add(box(3.2, 0.08, 1.1, matDarkWood, 0, 0.42, 0));

      for (const [x, z] of [[-1.55, -0.55], [-1.55, 0.55], [1.55, -0.55], [1.55, 0.55]]) {
        bench.add(box(0.12, 1.1, 0.12, matDarkWood, x, 0.55, z));
      }
      bench.add(box(3.1, 0.08, 0.08, matDarkWood, 0, 0.68, 0.55));
      bench.add(box(3.1, 0.08, 0.08, matDarkWood, 0, 0.68, -0.55));

      const anvil = new THREE.Group();
      anvil.add(box(0.52, 0.1, 0.32, matMetal, 0, 0, 0));
      anvil.add(box(0.44, 0.28, 0.28, matMetal, 0, 0.19, 0));
      anvil.add(box(0.58, 0.08, 0.28, matMetal, 0, 0.36, 0));
      anvil.add(cyl(0.03, 0.1, 0.28, matMetal, 0.36, 0.34, 0, 0, 0, Math.PI / 2));
      anvil.position.set(-1.1, 1.19, 0);
      bench.add(anvil);

      const hotBladeMat = new THREE.MeshStandardMaterial({
        color: 0xff8800,
        emissive: 0xff4400,
        emissiveIntensity: 1.8,
        roughness: 0.5,
        metalness: 0.5,
      });
      const swordForge = new THREE.Group();
      const blade = box(0.06, 0.58, 0.03, hotBladeMat, 0, 0.3, 0);
      swordForge.add(blade);
      swordForge.add(box(0.22, 0.04, 0.04, matGold, 0, 0.03, 0));
      swordForge.add(box(0.05, 0.22, 0.05, matDarkWood, 0, -0.12, 0));
      swordForge.add(sphere(0.06, matGold, 0, -0.25, 0));
      swordForge.position.set(-1.05, 1.58, 0.05);
      swordForge.rotation.z = 0.15;
      bench.add(swordForge);

      const sparkGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.08 + Math.random() * 0.1;
        const sparkMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xff8800, emissiveIntensity: 4 });
        const spark = sphere(
          0.012 + Math.random() * 0.016,
          sparkMaterial,
          Math.cos(angle) * radius,
          Math.random() * 0.18,
          Math.sin(angle) * radius * 0.5
        );
        sparkGroup.add(spark);
      }
      sparkGroup.position.copy(swordForge.position);
      sparkGroup.position.y += 0.3;
      bench.add(sparkGroup);

      const book = new THREE.Group();
      const pageMat1 = new THREE.MeshStandardMaterial({ color: 0xf5e9c8, roughness: 0.9 });
      const pageMat2 = new THREE.MeshStandardMaterial({ color: 0xf0e4c0, roughness: 0.9 });
      book.add(box(0.28, 0.04, 0.36, matRed, -0.14, 0, 0, 0, 0, -0.12));
      book.add(box(0.28, 0.04, 0.36, matRed, 0.14, 0, 0, 0, 0, 0.12));
      book.add(box(0.25, 0.02, 0.32, pageMat1, -0.12, 0.03, 0, 0, 0, -0.1));
      book.add(box(0.25, 0.02, 0.32, pageMat2, 0.12, 0.03, 0, 0, 0, 0.1));
      const runeGlyphs = [];
      for (let i = -1; i <= 1; i++) {
        const leftRune = box(0.04, 0.01, 0.04, matRune, i * 0.08 - 0.12, 0.045, i * 0.08, 0, 0, -0.1);
        const rightRune = box(0.04, 0.01, 0.04, matRune, i * 0.08 + 0.12, 0.045, i * 0.08, 0, 0, 0.1);
        runeGlyphs.push(leftRune, rightRune);
        book.add(leftRune, rightRune);
      }
      book.position.set(0.2, 1.19, 0.18);
      book.rotation.y = 0.3;
      bench.add(book);

      function makePotion(color, emissiveColor, x, z) {
        const potion = new THREE.Group();
        const potionMat = new THREE.MeshStandardMaterial({
          color,
          emissive: emissiveColor,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.1,
          transparent: true,
          opacity: 0.85,
        });
        potion.add(cyl(0.07, 0.08, 0.22, potionMat, 0, 0, 0));
        potion.add(cyl(0.03, 0.07, 0.1, matMetal, 0, 0.16, 0));
        potion.add(cyl(0.035, 0.035, 0.05, matDarkWood, 0, 0.22, 0));
        const glow = new THREE.PointLight(emissiveColor, 0.6, 0.5);
        glow.position.set(0, 0, 0);
        potion.add(glow);
        potion.position.set(x, 1.22, z);
        return potion;
      }

      const potionBlue = makePotion(0x3366ff, 0x0033ff, 0.9, 0.1);
      const potionRed = makePotion(0xcc2222, 0x880000, 1.1, 0.25);
      const potionGreen = makePotion(0x22cc66, 0x006633, 1.25, 0.08);
      bench.add(potionBlue, potionRed, potionGreen);

      const scrollGroup = new THREE.Group();
      const scrollMat = new THREE.MeshStandardMaterial({ color: 0xd4b87a, roughness: 0.9 });
      scrollGroup.add(cyl(0.055, 0.055, 0.38, scrollMat, 0, 0, 0, 0, 0, Math.PI / 2));
      scrollGroup.add(cyl(0.07, 0.07, 0.04, matDarkWood, -0.21, 0, 0, 0, 0, Math.PI / 2));
      scrollGroup.add(cyl(0.07, 0.07, 0.04, matDarkWood, 0.21, 0, 0, 0, 0, Math.PI / 2));
      scrollGroup.position.set(0.7, 1.22, -0.18);
      scrollGroup.rotation.y = 0.4;
      bench.add(scrollGroup);

      const pliers = new THREE.Group();
      pliers.add(box(0.04, 0.3, 0.04, matMetal, -0.03, 0, 0, 0, 0, 0.2));
      pliers.add(box(0.04, 0.3, 0.04, matMetal, 0.03, 0, 0, 0, 0, -0.2));
      pliers.add(box(0.1, 0.06, 0.04, matMetal, 0, 0.18, 0));
      pliers.position.set(-0.5, 1.08, 0.7);
      pliers.rotation.z = 0.8;
      bench.add(pliers);

      const wrench = new THREE.Group();
      wrench.add(box(0.04, 0.35, 0.04, matMetal, 0, 0, 0));
      wrench.add(box(0.14, 0.06, 0.04, matMetal, 0, 0.2, 0));
      wrench.position.set(-0.2, 1.08, 0.7);
      wrench.rotation.z = -0.5;
      bench.add(wrench);

      const torch = new THREE.Group();
      const torchStick = cyl(0.025, 0.03, 0.3, matDarkWood, 0, 0, 0);
      const torchFire = sphere(0.07, matEmber, 0, 0.2, 0);
      const torchGlow = new THREE.PointLight(0xff6600, 3.5, 2.5);
      torchGlow.position.set(0, 0.25, 0);
      torch.add(torchStick, torchFire, torchGlow);
      torch.position.set(-1.55, 1.26, -0.4);
      bench.add(torch);

      const emberGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const emberMaterial = new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xff4400, emissiveIntensity: 3.5 });
        const ember = sphere(
          0.018 + Math.random() * 0.022,
          emberMaterial,
          (Math.random() - 0.5) * 0.12,
          Math.random() * 0.14,
          (Math.random() - 0.5) * 0.1
        );
        emberGroup.add(ember);
      }
      emberGroup.position.copy(torch.position);
      emberGroup.position.y += 0.22;
      bench.add(emberGroup);

      bench.add(box(0.3, 0.06, 0.12, matStone, 0.5, 1.19, -0.28));

      for (let i = -1; i <= 1; i++) {
        bench.add(box(0.14, 0.07, 0.3, i === 0 ? matGold : matMetal, i * 0.2, 0.46, -0.05));
      }

      bench.add(box(0.5, 0.22, 0.38, matWood, 1.3, 0.53, 0));
      bench.add(box(0.5, 0.04, 0.38, matDarkWood, 1.3, 0.65, 0));

      const hammerInBox = new THREE.Group();
      hammerInBox.add(cyl(0.03, 0.035, 0.45, matDarkWood, 0, 0, 0));
      hammerInBox.add(box(0.12, 0.14, 0.1, matMetal, 0, 0.26, 0, 0, 0, Math.PI / 2));
      hammerInBox.position.set(1.3, 0.72, 0);
      hammerInBox.rotation.z = 0.4;
      bench.add(hammerInBox);

      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x88ddff,
        emissive: 0x4499ff,
        emissiveIntensity: 2.0,
        roughness: 0.05,
        metalness: 0.2,
        transparent: true,
        opacity: 0.78,
      });
      const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.13), crystalMat);
      crystal.position.set(0.55, 1.36, -0.12);
      bench.add(crystal);
      bench.add(cyl(0.06, 0.09, 0.08, matDarkWood, 0.55, 1.19, -0.12));
      const crystalLight = new THREE.PointLight(0x4499ff, 3.0, 1.5);
      crystalLight.position.set(0.55, 1.36, -1.22);
      bench.add(crystalLight);

      const lanternGroup = new THREE.Group();
      const lanternBodyMat = new THREE.MeshStandardMaterial({
        color: 0xffa500,
        emissive: 0xff6600,
        emissiveIntensity: 1.6,
        transparent: true,
        opacity: 0.5,
      });
      lanternGroup.add(box(0.14, 0.2, 0.14, lanternBodyMat, 0, 0, 0));
      lanternGroup.add(box(0.02, 0.22, 0.02, matMetal, -0.08, 0, -0.08));
      lanternGroup.add(box(0.02, 0.22, 0.02, matMetal, 0.08, 0, -0.08));
      lanternGroup.add(box(0.02, 0.22, 0.02, matMetal, -0.08, 0, 0.08));
      lanternGroup.add(box(0.02, 0.22, 0.02, matMetal, 0.08, 0, 0.08));
      lanternGroup.add(box(0.18, 0.04, 0.18, matMetal, 0, 0.12, 0));
      lanternGroup.add(box(0.18, 0.04, 0.18, matMetal, 0, -0.12, 0));
      const lanternLight = new THREE.PointLight(0xffaa44, 3.5, 2.2);
      lanternGroup.add(lanternLight);
      lanternGroup.position.set(-1.55, 1.32, -0.42);
      bench.add(lanternGroup);

      const coinMat = new THREE.MeshStandardMaterial({ color: 0xd4a520, roughness: 0.2, metalness: 1.0 });
      const coinPositions = [
        [0.88, 1.196, -0.35, 0.3],
        [0.75, 1.196, -0.28, -0.5],
        [1.0, 1.196, -0.42, 0.8],
        [0.6, 1.196, -0.42, 0.1],
      ];
      for (const [cx, cy, cz, ry] of coinPositions) {
        bench.add(cyl(0.055, 0.055, 0.01, coinMat, cx, cy, cz, 0, ry, 0, 20));
      }

      const gobletGroup = new THREE.Group();
      gobletGroup.add(cyl(0.09, 0.06, 0.18, matGold, 0, 0, 0, 0, 0, 0, 12));
      gobletGroup.add(cyl(0.02, 0.02, 0.1, matGold, 0, -0.14, 0));
      gobletGroup.add(cyl(0.07, 0.07, 0.02, matGold, 0, -0.2, 0, 0, 0, 0, 12));
      const gobletLiquid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.078, 0.05, 0.08, 12),
        new THREE.MeshStandardMaterial({ color: 0xaa2200, emissive: 0x440000, emissiveIntensity: 0.3, transparent: true, opacity: 0.85 })
      );
      gobletLiquid.position.set(0, 0.05, 0);
      gobletGroup.add(gobletLiquid);
      gobletGroup.position.set(-0.3, 1.22, -0.32);
      bench.add(gobletGroup);

      const bagGroup = new THREE.Group();
      bagGroup.add(sphere(0.12, matLeather, 0, 0, 0));
      bagGroup.add(sphere(0.09, matLeather, 0, 0.14, 0));
      bagGroup.add(cyl(0.025, 0.025, 0.08, matLeather, 0, 0.24, 0));
      bagGroup.position.set(-0.75, 1.18, 0.28);
      bench.add(bagGroup);
      for (let i = 0; i < 3; i++) {
        bench.add(cyl(0.045, 0.045, 0.01, coinMat, -0.75 + (i - 1) * 0.09, 1.196, 0.38 + i * 0.04, 0, i * 0.5, 0, 16));
      }

      root.userData.workbenchAnim = {
        blade,
        runeGlyphs,
        torchFire,
        torchGlow,
        forgeLight: new THREE.PointLight(0xff4400, 10, 6),
        emberGroup,
        sparkGroup,
        potions: [potionBlue, potionRed, potionGreen],
        crystal,
        crystalLight,
        lanternLight,
      };
      root.userData.workbenchAnim.forgeLight.position.set(-1.5, 1.5, -0.5);
      root.add(root.userData.workbenchAnim.forgeLight);

      root.userData.update = (elapsedTime) => {
        const anim = root.userData.workbenchAnim;
        anim.crystal.position.y = 1.36 + Math.sin(elapsedTime * 1.8) * 0.05;
        anim.crystal.rotation.y = elapsedTime * 0.9;
        anim.crystal.rotation.x = Math.sin(elapsedTime * 0.7) * 0.2;
        anim.crystalLight.position.y = anim.crystal.position.y;
        anim.crystalLight.intensity = 2.5 + Math.sin(elapsedTime * 3.5) * 1.0;

        anim.runeGlyphs.forEach((rune, index) => {
          rune.material.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 2 + index * 0.8) * 0.7;
        });

        anim.torchFire.scale.set(
          1 + Math.sin(elapsedTime * 9) * 0.18,
          1 + Math.sin(elapsedTime * 7 + 1) * 0.25,
          1 + Math.sin(elapsedTime * 11 + 2) * 0.18
        );
        anim.torchGlow.intensity = 3.0 + Math.sin(elapsedTime * 7) * 1.2;
        anim.lanternLight.intensity = 3.2 + Math.sin(elapsedTime * 5.5 + 1) * 1.0;
        anim.forgeLight.intensity = 9 + Math.sin(elapsedTime * 3.5) * 2.5;

        anim.emberGroup.children.forEach((ember, index) => {
          ember.position.y = Math.sin(elapsedTime * (2.5 + index * 0.4) + index * 1.2) * 0.08 + 0.07;
          ember.position.x = Math.sin(elapsedTime * (1.5 + index * 0.3) + index) * 0.05;
          ember.scale.setScalar(0.7 + Math.sin(elapsedTime * 6 + index) * 0.35);
        });

        anim.sparkGroup.children.forEach((spark, index) => {
          spark.position.y = Math.sin(elapsedTime * (3 + index * 0.6) + index * 1.5) * 0.1 + 0.05;
          spark.position.x = Math.cos(elapsedTime * (2 + index * 0.4) + index) * (0.06 + index * 0.01);
          spark.scale.setScalar(0.5 + Math.sin(elapsedTime * 8 + index * 2) * 0.5);
          spark.material.emissiveIntensity = 2 + Math.sin(elapsedTime * 10 + index) * 2;
        });

        anim.potions.forEach((potion, index) => {
          const light = potion.children.find((child) => child.isLight);
          if (light) light.intensity = 0.5 + Math.sin(elapsedTime * 2 + index * 1.2) * 0.3;
        });

        anim.blade.material.emissiveIntensity = 1.5 + Math.sin(elapsedTime * 4) * 0.8;
      };

      applyModelShadows(root);
      return root;
    }

    function getPortalParticleTexture() {
      if (createGamePortalModel.particleTexture) return createGamePortalModel.particleTexture;
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d');
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(132, 255, 234, 0.95)');
      gradient.addColorStop(0.45, 'rgba(0, 204, 255, 0.55)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
      createGamePortalModel.particleTexture = new THREE.CanvasTexture(canvas);
      return createGamePortalModel.particleTexture;
    }

    function createGamePortalModel() {
      const root = new THREE.Group();
      const portalCore = new THREE.Group();
      portalCore.position.y = 1.08;
      root.add(portalCore);

      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x31363d,
        emissive: 0x0f1923,
        emissiveIntensity: 0.32,
        roughness: 0.9,
        metalness: 0.24,
      });
      const detailMaterial = new THREE.MeshStandardMaterial({
        color: 0x171b22,
        emissive: 0x08131e,
        emissiveIntensity: 0.24,
        roughness: 0.95,
        metalness: 0.12,
      });
      const runeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8ef7ff,
        emissive: 0x2ac8ff,
        emissiveIntensity: 1.3,
        roughness: 0.12,
        metalness: 0.05,
      });

      const portalVertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const portalFragmentShader = `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
          return res * res;
        }

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          if (dist > 0.5) discard;

          vec2 offset = vUv - center;
          float angle = atan(offset.y, offset.x);
          float radius = length(offset);
          angle += time * 1.45 - radius * 12.0;

          vec2 swirlUv = center + radius * vec2(cos(angle), sin(angle));
          float n = noise(swirlUv * 5.3 + time * 0.5);
          float edgeGlow = smoothstep(0.28, 0.5, dist);
          float centerGlow = 1.0 - smoothstep(0.0, 0.2, dist);

          vec3 finalColor = mix(color1, color2, clamp(n + radius, 0.0, 1.0));
          finalColor += color2 * edgeGlow * 2.4;
          finalColor += vec3(1.0) * centerGlow * 1.45;

          gl_FragColor = vec4(finalColor, 0.8 + 0.2 * n);
        }
      `;

      const ringGroup = new THREE.Group();
      portalCore.add(ringGroup);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.92, 0.15, 18, 72),
        ringMaterial
      );
      ringGroup.add(ring);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const detail = new THREE.Mesh(
          new THREE.BoxGeometry(0.48, 0.26, 0.18),
          detailMaterial
        );
        detail.position.set(Math.cos(angle) * 0.92, Math.sin(angle) * 0.92, 0);
        detail.rotation.z = angle;
        ringGroup.add(detail);

        const rune = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.04, 0.06),
          runeMaterial
        );
        rune.position.set(Math.cos(angle) * 0.78, Math.sin(angle) * 0.78, 0.11);
        rune.lookAt(0, 0, 0.4);
        ringGroup.add(rune);
      }

      const portalMaterial = new THREE.ShaderMaterial({
        vertexShader: portalVertexShader,
        fragmentShader: portalFragmentShader,
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x1ff7d9) },
          color2: { value: new THREE.Color(0x1f4fff) },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const portalSurface = new THREE.Mesh(new THREE.CircleGeometry(0.82, 64), portalMaterial);
      portalSurface.renderOrder = 2;
      portalCore.add(portalSurface);

      const particleCount = 220;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleVelocities = new Float32Array(particleCount * 4);

      function resetParticle(index, randomLife = true) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * 0.74;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const i3 = index * 3;
        const i4 = index * 4;
        particlePositions[i3] = Math.cos(angle) * radius;
        particlePositions[i3 + 1] = Math.sin(angle) * radius;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 0.18;
        particleVelocities[i4] = (Math.random() - 0.5) * 0.2;
        particleVelocities[i4 + 1] = (Math.random() - 0.5) * 0.2;
        particleVelocities[i4 + 2] = direction * (0.45 + Math.random() * 0.8);
        particleVelocities[i4 + 3] = randomLife ? Math.random() * 1.6 : 1.6;
      }

      for (let i = 0; i < particleCount; i++) resetParticle(i);

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.11,
        map: getPortalParticleTexture(),
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.frustumCulled = false;
      portalCore.add(particles);

      const frontLight = new THREE.PointLight(0x24ffe0, 4.2, 5.2, 2);
      frontLight.position.set(0, 0, 0.46);
      portalCore.add(frontLight);

      const backLight = new THREE.PointLight(0x2450ff, 3.4, 5.2, 2);
      backLight.position.set(0, 0, -0.46);
      portalCore.add(backLight);

      const floorGlow = new THREE.Mesh(
        new THREE.CircleGeometry(0.86, 40),
        new THREE.MeshBasicMaterial({
          color: 0x30dfff,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      floorGlow.rotation.x = -Math.PI / 2;
      floorGlow.position.y = -1.02;
      floorGlow.scale.set(1.16, 1.16, 1);
      root.add(floorGlow);

      root.userData.portalAnim = {
        ringGroup,
        portalMaterial,
        particles,
        particlePositions,
        particleVelocities,
        frontLight,
        backLight,
        floorGlow,
        lastTime: null,
        resetParticle,
      };

      root.userData.update = (elapsedTime) => {
        const anim = root.userData.portalAnim;
        const delta = anim.lastTime == null ? 0.016 : Math.min(Math.max(elapsedTime - anim.lastTime, 0.001), 0.05);
        anim.lastTime = elapsedTime;

        anim.portalMaterial.uniforms.time.value = elapsedTime;
        anim.ringGroup.rotation.z = elapsedTime * 0.32;
        anim.ringGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.06;

        const frontPulse = 3.5 + Math.sin(elapsedTime * 3.4) * 0.8;
        const backPulse = 2.8 + Math.sin(elapsedTime * 3.4 + 1.2) * 0.7;
        anim.frontLight.intensity = frontPulse;
        anim.backLight.intensity = backPulse;
        anim.floorGlow.material.opacity = 0.14 + Math.sin(elapsedTime * 2.8) * 0.04;

        const positions = anim.particlePositions;
        const velocities = anim.particleVelocities;
        for (let i = 0; i < velocities.length / 4; i++) {
          const i3 = i * 3;
          const i4 = i * 4;
          velocities[i4 + 3] -= delta;
          positions[i3] += velocities[i4] * delta;
          positions[i3 + 1] += velocities[i4 + 1] * delta;
          positions[i3 + 2] += velocities[i4 + 2] * delta;

          if (
            velocities[i4 + 3] <= 0
            || positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1] > 1.08
            || Math.abs(positions[i3 + 2]) > 1.0
          ) {
            anim.resetParticle(i, false);
          }
        }
        anim.particles.geometry.attributes.position.needsUpdate = true;
      };

      applyModelShadows(root);
      portalSurface.castShadow = false;
      portalSurface.receiveShadow = false;
      particles.castShadow = false;
      particles.receiveShadow = false;
      floorGlow.castShadow = false;
      floorGlow.receiveShadow = false;
      return root;
    }

    function getHomeObjectDefinitions() {
      const roomHalfSize = world.homeRoom?.halfSize ?? 4;
      return [
        {
          id: 'chest',
          type: 'chest',
          label: 'Baú',
          size: new THREE.Vector3(0.9, 0.78, 0.9),
          offsetSide: -1.1,
          offsetForward: -0.55,
          modelFactory: createGameChestModel,
          visualScale: 0.42,
          blocksMovement: true,
        },
        {
          id: 'upgradeTable',
          type: 'upgradeTable',
          label: 'Mesa de trabalho',
          size: new THREE.Vector3(1.35, 0.78, 1.35),
          offsetSide: 1.15,
          offsetForward: -0.42,
          modelFactory: createGameWorkbenchModel,
          visualScale: 0.45,
          blocksMovement: true,
        },
        {
          id: 'homeDoor',
          type: 'homeDoor',
          label: 'Portal',
          size: new THREE.Vector3(1.45, 1.96, 0.9),
          offsetSide: 0,
          offsetForward: roomHalfSize * world.cellSize - 0.58,
          modelFactory: createGamePortalModel,
          visualScale: 0.88,
          blocksMovement: false,
        },
      ];
    }

    function createDefaultHomeBuildPlacement(definition, forwardDir, sideDir) {
      const position = new THREE.Vector3(world.spawn.x, 0, world.spawn.z)
        .addScaledVector(sideDir, definition.offsetSide)
        .addScaledVector(forwardDir, definition.offsetForward);
      const rotationY = definition.type === 'homeDoor'
        ? Math.atan2(forwardDir.x, forwardDir.z)
        : Math.atan2(forwardDir.x, forwardDir.z) + Math.PI;
      return {
        x: position.x,
        z: position.z,
        rotationY,
        scale: 1,
      };
    }

    function clampHomeBuildPlacement(entry, placement) {
      const roomHalfExtent = world.homeRoom ? world.homeRoom.halfSize * world.cellSize - 0.36 : 7.5;
      const scale = THREE.MathUtils.clamp(Number(placement.scale) || 1, HOME_BUILD_SCALE_MIN, HOME_BUILD_SCALE_MAX);
      const halfWidth = entry.definition.size.x * scale * 0.5;
      const halfDepth = entry.definition.size.z * scale * 0.5;
      const minX = world.spawn.x - roomHalfExtent + halfWidth;
      const maxX = world.spawn.x + roomHalfExtent - halfWidth;
      const minZ = world.spawn.z - roomHalfExtent + halfDepth;
      const maxZ = world.spawn.z + roomHalfExtent - halfDepth;
      placement.x = THREE.MathUtils.clamp(Number(placement.x) || world.spawn.x, minX, maxX);
      placement.z = THREE.MathUtils.clamp(Number(placement.z) || world.spawn.z, minZ, maxZ);
      placement.rotationY = Number.isFinite(Number(placement.rotationY)) ? Number(placement.rotationY) : 0;
      placement.scale = scale;
      return placement;
    }

    function updateHomeBuildEntryVisual(entry) {
      const active = buildModeState.enabled;
      const selected = active && buildModeState.selectedObjectId === entry.id;
      entry.proxy.material.color.set(selected ? 0xffd27a : 0x8ec5ff);
      entry.proxy.material.opacity = active ? (selected ? 0.26 : 0.12) : 0;
      entry.proxy.material.colorWrite = active;
    }

    function getHomeBuildFocusPoint(entry, target = new THREE.Vector3()) {
      const hitbox = getHomeHitboxConfig(entry?.id);
      if (!entry || !hitbox) return target.copy(entry?.root?.position ?? new THREE.Vector3());
      hitboxOffsetVector.set(hitbox.offset.x, hitbox.offset.y, hitbox.offset.z)
        .multiplyScalar(entry.placement.scale)
        .applyAxisAngle(up, entry.placement.rotationY);
      return target.copy(entry.root.position).add(hitboxOffsetVector);
    }

    function applyHomeHitboxToEntry(entry) {
      const hitbox = getHomeHitboxConfig(entry.id) ?? homeHitboxDefaults[entry.id];
      if (!hitbox) return;
      entry.proxy.position.set(hitbox.offset.x, hitbox.offset.y, hitbox.offset.z);
      entry.proxy.scale.set(hitbox.size.x, hitbox.size.y, hitbox.size.z);
      if (!entry.collider) return;

      hitboxOffsetVector.set(hitbox.offset.x, 0, hitbox.offset.z)
        .multiplyScalar(entry.placement.scale)
        .applyAxisAngle(up, entry.placement.rotationY);
      entry.collider.type = 'box';
      entry.collider.position.set(
        entry.root.position.x + hitboxOffsetVector.x,
        0,
        entry.root.position.z + hitboxOffsetVector.z
      );
      entry.collider.rotationY = entry.placement.rotationY;
      entry.collider.halfSize.set(
        hitbox.size.x * entry.placement.scale * 0.5,
        hitbox.size.y * entry.placement.scale * 0.5,
        hitbox.size.z * entry.placement.scale * 0.5
      );
    }

    function applyHomeBuildEntryTransform(entry) {
      clampHomeBuildPlacement(entry, entry.placement);
      const floor = floorHeightAt(entry.placement.x, entry.placement.z);
      entry.root.position.set(entry.placement.x, floor, entry.placement.z);
      entry.root.rotation.set(0, entry.placement.rotationY, 0);
      entry.root.scale.setScalar(entry.placement.scale);
      applyHomeHitboxToEntry(entry);
      entry.root.traverse((object) => {
        if (object.isLight && Number.isFinite(object.userData.baseHomeBuildDistance)) {
          object.distance = object.userData.baseHomeBuildDistance * entry.placement.scale;
        }
      });
      updateHomeBuildEntryVisual(entry);
    }

    function getHomeBuildObjectById(objectId) {
      return world.homeBuildObjects.find((entry) => entry.id === objectId) ?? null;
    }

    function syncHomeBuildPlacementFromRoot(entry) {
      if (!entry) return;
      entry.placement.x = entry.root.position.x;
      entry.placement.z = entry.root.position.z;
      entry.placement.rotationY = entry.root.rotation.y;
      entry.placement.scale = THREE.MathUtils.clamp(
        (Math.abs(entry.root.scale.x) + Math.abs(entry.root.scale.y) + Math.abs(entry.root.scale.z)) / 3,
        HOME_BUILD_SCALE_MIN,
        HOME_BUILD_SCALE_MAX
      );
      applyHomeBuildEntryTransform(entry);
      homeBuildLayoutState.placements[entry.id] = clonePlain(entry.placement);
      buildModeState.dirty = true;
      if (buildModeState.selectedObjectId === entry.id) focusBuildCameraOnEntry(entry);
    }

    function resetHomeBuildObjectPlacement(entry) {
      if (!entry) return;
      entry.placement = clonePlain(entry.defaultPlacement);
      applyHomeBuildEntryTransform(entry);
      homeBuildLayoutState.placements[entry.id] = clonePlain(entry.placement);
      buildModeState.dirty = true;
    }

    function resetAllHomeBuildPlacements() {
      for (const entry of world.homeBuildObjects) {
        entry.placement = clonePlain(entry.defaultPlacement);
        applyHomeBuildEntryTransform(entry);
        homeBuildLayoutState.placements[entry.id] = clonePlain(entry.placement);
      }
      buildModeState.dirty = true;
    }

    function buildHomeObjects() {
      const forwardDir = new THREE.Vector3(world.spawnDir.x, 0, world.spawnDir.z).normalize();
      const sideDir = new THREE.Vector3(-forwardDir.z, 0, forwardDir.x).normalize();

      for (const definition of getHomeObjectDefinitions()) {
        const defaultPlacement = createDefaultHomeBuildPlacement(definition, forwardDir, sideDir);
        const savedPlacement = homeBuildLayoutState.placements[definition.id];
        const placement = clonePlain(savedPlacement ?? defaultPlacement);

        const root = new THREE.Group();
        root.userData.type = definition.type;
        root.userData.homeBuildId = definition.id;

        let visualRoot = null;
        if (definition.modelFactory) {
          visualRoot = definition.modelFactory();
          visualRoot.scale.setScalar(definition.visualScale);
          visualRoot.traverse((object) => {
            if (object.isLight && Number.isFinite(object.distance) && object.distance > 0) {
              object.distance *= definition.visualScale;
              object.userData.baseHomeBuildDistance = object.distance;
            }
          });
          root.add(visualRoot);
          if (typeof visualRoot.userData.update === 'function') {
            world.animatedModels.push(visualRoot);
          }
        } else {
          visualRoot = new THREE.Mesh(
            makeRoughBoxGeometry(definition.size.x, definition.size.y, definition.size.z, world.seed * 0.004 + definition.offsetSide),
            new THREE.MeshStandardMaterial({
              color: definition.color,
              emissive: definition.emissive,
              emissiveIntensity: 0.55,
              roughness: 0.82,
              metalness: definition.type === 'upgradeTable' ? 0.18 : 0.06,
            })
          );
          visualRoot.position.y = definition.size.y * 0.5;
          visualRoot.castShadow = true;
          visualRoot.receiveShadow = true;
          root.add(visualRoot);
        }

        const proxyMaterial = new THREE.MeshBasicMaterial({
          color: 0x8ec5ff,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        proxyMaterial.colorWrite = false;
        proxyMaterial.depthTest = false;
        const proxy = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), proxyMaterial);
        proxy.renderOrder = 20;
        proxy.userData.type = definition.type;
        proxy.userData.homeBuildId = definition.id;
        root.add(proxy);

        world.group.add(root);
        world.interactables.push(proxy);
        world.homeBuildSelectables.push(proxy);

        const entry = {
          id: definition.id,
          definition,
          root,
          visualRoot,
          proxy,
          collider: definition.blocksMovement
            ? { type: 'box', position: new THREE.Vector3(), halfSize: new THREE.Vector3(), rotationY: 0 }
            : null,
          defaultPlacement,
          placement,
        };
        world.homeBuildObjects.push(entry);
        if (entry.collider) world.rockColliders.push(entry.collider);
        applyHomeBuildEntryTransform(entry);
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

        const root = new THREE.Group();
        root.position.set(x, floor, z);
        root.userData.type = 'returnPortal';

        const visualRoot = createGamePortalModel();
        visualRoot.scale.setScalar(0.96);
        root.add(visualRoot);
        if (typeof visualRoot.userData.update === 'function') {
          world.animatedModels.push(visualRoot);
        }

        const proxyMaterial = new THREE.MeshBasicMaterial({
          color: 0x8ec5ff,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        proxyMaterial.colorWrite = false;
        proxyMaterial.depthTest = false;
        const proxy = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.05, 0.9), proxyMaterial);
        proxy.position.set(0, 0.98, 0);
        proxy.renderOrder = 20;
        proxy.userData.type = 'returnPortal';
        root.add(proxy);

        world.group.add(root);
        world.interactables.push(proxy);
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
        uiVisibleTimer: 0,
        uiHealthBar: null,
        uiHealthLagFill: null,
        uiHealthFill: null,
        uiLagHealthRatio: 1,
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

    function spawnDropStack(definition, amount, origin, scatterRadius = 0.22) {
      const total = Math.max(1, Math.floor(Number(amount)) || 0);
      if (total <= 0 || !definition || !origin) return;
      const radius = 0.1 + definition.level * 0.012 + Math.min(total, 6) * 0.018;
      const mesh = acquireDropMesh(definition);
      const angle = randomRange(0, Math.PI * 2);
      const distance = randomRange(0, scatterRadius);
      const px = origin.x + Math.cos(angle) * distance;
      const pz = origin.z + Math.sin(angle) * distance;
      const baseY = floorHeightAt(px, pz) + 0.18;
      mesh.visible = true;
      mesh.scale.setScalar(radius);
      mesh.position.set(px, baseY, pz);
      mesh.rotation.set(randomRange(0, Math.PI), randomRange(0, Math.PI), randomRange(0, Math.PI));
      world.group.add(mesh);

      world.dropItems.push({
        definition,
        amount: total,
        mesh,
        baseY,
        bobOffset: world.rng() * Math.PI * 2,
      });
    }

    function spawnOreDropsFromTotals(totals, origin, scatterRadius = 0.32) {
      if (!totals || !origin) return;
      for (const definition of oreDefinitions) {
        const amount = Math.max(0, Math.floor(Number(totals[definition.id] ?? 0)));
        if (amount <= 0) continue;
        spawnDropStack(definition, amount, origin, scatterRadius);
      }
    }

    function spawnDropsFromOre(node) {
      const total = randInt(node.definition.dropMin, node.definition.dropMax);
      spawnDropStack(node.definition, total, node.position, 0.22);
    }

    function breakOreNode(node) {
      destroyOreHealthBar(node);
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

    function getRaycastReach(range) {
      const origin = getPlayerInteractionOrigin(interactionOrigin);
      camera.getWorldPosition(cameraWorldPosition);
      return range + cameraWorldPosition.distanceTo(origin) + 0.75;
    }

    function getTargetOreNode() {
      return getTargetOreNodeFromSamples(getActiveAimSamples(), miningState.range);
    }

    function getHoveredObject() {
      return getHoveredObjectFromSamples(getActiveAimSamples(), interactionState.range);
    }

    function tryMineWithPickaxe() {
      if (!itemState.gameActive || itemState.inventoryOpen || !isItemKindEquipped('pickaxe')) return;
      if (miningState.swinging) return;
      const now = clock.elapsedTime;
      const pickaxeAttackDuration = getWeaponAttackDuration('pickaxe');
      if (now - miningState.lastHitAt < pickaxeAttackDuration * 0.86) return;
      miningState.lastHitAt = now;
      miningState.swinging = true;
      miningState.swingProgress = 0;
      miningState.hitApplied = false;

      const hit = getTargetOreNode();
      miningState.targetNode = hit ? hit.node : null;
      miningState.pendingHit = hit;
    }

    function applyPendingPickaxeHit(hit) {
      if (!hit?.node || hit.node.hp <= 0 || !world.oreNodes.includes(hit.node)) return;
      const node = hit.node;
      node.hp = Math.max(0, node.hp - getPickaxeDefinition().damage);
      node.hitFlash = 1;
      node.uiVisibleTimer = 1.35;
      uiWorldPosition.copy(hit.point ?? node.position);
      if (hit.normal) uiWorldPosition.addScaledVector(hit.normal, 0.12);
      else uiWorldPosition.y += 0.16;
      spawnFloatingDamageText(uiWorldPosition, getPickaxeDefinition().damage, 'ore-hit');
      spawnHitSparks(hit);
      if (node.hp <= 0) breakOreNode(node);
      updateMiningHud();
    }

    function collectNearbyDrops() {
      let writeIndex = 0;
      let inventoryChanged = false;
      const collectedTotals = new Map();
      for (const drop of world.dropItems) {
        const dx = getPlayerX() - drop.mesh.position.x;
        const dz = getPlayerZ() - drop.mesh.position.z;
        if (dx * dx + dz * dz <= 0.85 * 0.85) {
          const collectedAmount = addOreToInventoryItems(drop.definition.id, drop.amount);
          if (collectedAmount > 0) {
            collectedTotals.set(drop.definition.id, (collectedTotals.get(drop.definition.id) ?? 0) + collectedAmount);
            inventoryChanged = true;
          }
          const leftover = drop.amount - collectedAmount;
          if (leftover <= 0) {
            releaseDropMesh(drop);
            continue;
          }
          drop.amount = leftover;
        }

        world.dropItems[writeIndex] = drop;
        writeIndex++;
      }

      world.dropItems.length = writeIndex;

      if (inventoryChanged) {
        characterAnimState.collectTimer = Math.max(characterAnimState.collectTimer, 0.42);
        let noticeIndex = 0;
        for (const [oreId, amount] of collectedTotals.entries()) {
          const definition = oreDefinitions.find((ore) => ore.id === oreId);
          getPlayerInteractionOrigin(uiWorldPosition);
          uiWorldPosition.y += 0.34 + noticeIndex * 0.11;
          uiWorldPosition.x += randomRange(-0.1, 0.1);
          uiWorldPosition.z += randomRange(-0.1, 0.1);
          spawnFloatingUiText(uiWorldPosition, `+${amount} ${definition?.label ?? oreId}`, 'pickup-note', 1.2);
          noticeIndex++;
        }
        refreshResourceUi();
        saveGame();
      }
    }

    function updateMiningHud() {
      const hit = getTargetOreNode();
      const hoveredObject = getHoveredObject();
      const actionState = getPrimaryActionState({ hoveredObject, targetOreHit: hit });
      const interactHint = mobileState.enabled ? 'use o botao de acao' : 'pressione E';
      const mineHint = mobileState.enabled ? 'use o botao Picareta' : 'clique';
      uiState.targetOreHit = hit;
      uiState.hoveredObject = hoveredObject;
      uiState.actionState = actionState;
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
      if (isItemKindEquipped('sword')) {
        const targetMonster = getSwordAttackTarget();
        miningChip.textContent = targetMonster
          ? `Combate: ${mobileState.enabled ? 'botao de acao' : 'clique'} para atacar monstro (${targetMonster.hp}/${targetMonster.maxHp})`
          : `Combate: espada nivel ${playerStats.swordLevel} equipada`;
        return;
      }
      if (isItemKindEquipped('crossbow')) {
        const targetMonster = getCrossbowTarget();
        const crossbowDefinition = getCrossbowDefinition();
        miningChip.textContent = targetMonster
          ? `Combate: ${mobileState.enabled ? 'botao de acao' : 'clique'} para disparar no monstro (${targetMonster.hp}/${targetMonster.maxHp})`
          : `Combate: crossbow nivel ${crossbowDefinition.level} equipado | dano ${crossbowDefinition.damage}`;
        return;
      }
      if (!isItemKindEquipped('pickaxe')) {
        const pickaxeHotbarSlot = findHotbarSlotByKind('pickaxe');
        miningChip.textContent = pickaxeHotbarSlot !== -1
          ? (mobileState.enabled
            ? 'Mineracao: toque na Picareta para equipar'
            : `Mineracao: equipe a picareta no ${pickaxeHotbarSlot + 1}`)
          : 'Mineracao: mova a picareta para um dos slots 1-5';
        return;
      }
      if (!miningState.targetNode) {
        miningChip.textContent = `Mineracao: mire num node e ${mineHint} para bater`;
        return;
      }
      const node = miningState.targetNode;
      miningChip.textContent = `Mineracao: ${node.definition.label} | ${node.hp}/${node.maxHp} batidas restantes`;
    }

    function updateAnimatedModels() {
      for (const model of world.animatedModels) {
        model.userData.update?.(clock.elapsedTime);
      }
    }

    function updateOreAndDrops(delta) {
      updateAnimatedModels();
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
      if (clock.elapsedTime >= uiState.nextMiningHudScanAt) {
        uiState.nextMiningHudScanAt = clock.elapsedTime + (mobileState.enabled ? 0.08 : 0.05);
        updateMiningHud();
      }
    }

    function createDiscoveryArrays() {
      world.discovery = Array.from({ length: world.height }, () => Array(world.width).fill(false));
      world.visited = Array.from({ length: world.height }, () => Array(world.width).fill(false));
      world.lastVisitedCell = null;
    }

    function rebuildWorld(seed = null) {
      miningState.holdActive = false;
      miningState.swinging = false;
      miningState.swingProgress = Math.PI;
      miningState.pendingHit = null;
      miningState.hitApplied = false;
      combatState.holdActive = false;
      combatState.attackTimer = 0;
      combatState.attackHitDone = false;
      combatState.attackComboIndex = 0;
      crossbowState.holdActive = false;
      crossbowState.shotTimer = 0;
      clearSparkParticles();
      hideInteractionPrompt();
      clearFloatingDamageTexts();
      clearMonsterHealthBars();
      clearOreHealthBars();
      clearProjectiles();
      disposeGroup(world.group);
      resetDropCaches();
      scene.remove(world.group);
      world.group = new THREE.Group();
      scene.add(world.group);
      world.rockColliders = [];
      world.interactables = [];
      world.homeBuildObjects = [];
      world.homeBuildSelectables = [];
      world.oreNodes = [];
      world.oreHitMeshes = [];
      world.monsters = [];
      world.dropItems = [];
      world.projectiles = [];
      world.animatedModels = [];
      world.nodes = [];

      if (areaState.currentArea === 'home') {
        generateHomeRoom(areaState.homeSeed);
        playerStats.health = playerStats.maxHealth;
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
        buildInitialMonsters();
        buildReturnPortal();
        warmDropPools();
        seedChip.textContent = `Area: caverna | Seed: ${world.seed}`;
      }

      resetPlayer();
      updateCombatHud();
    }

    function resetPlayer() {
      const spawnYaw = directionToYaw(world.spawnDir);
      const spawnFloor = floorHeightAt(world.spawn.x, world.spawn.z);
      playerState.bodyY = spawnFloor + world.playerHeight;
      playerState.verticalVelocity = 0;
      playerState.grounded = true;
      playerState.jumpQueued = false;
      playerRoot.position.set(world.spawn.x, spawnFloor, world.spawn.z);
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
        if (rock?.type === 'box') {
          const cos = Math.cos(-rock.rotationY);
          const sin = Math.sin(-rock.rotationY);
          const localX = (x - rock.position.x) * cos - (z - rock.position.z) * sin;
          const localZ = (x - rock.position.x) * sin + (z - rock.position.z) * cos;
          const nearestX = THREE.MathUtils.clamp(localX, -rock.halfSize.x, rock.halfSize.x);
          const nearestZ = THREE.MathUtils.clamp(localZ, -rock.halfSize.z, rock.halfSize.z);
          const diffX = localX - nearestX;
          const diffZ = localZ - nearestZ;
          if (diffX * diffX + diffZ * diffZ < radius * radius) return true;
          continue;
        }

        const dx = x - rock.position.x;
        const dz = z - rock.position.z;
        const minDist = radius + rock.radius;
        if (dx * dx + dz * dz < minDist * minDist) return true;
      }

      return false;
    }

    function hasWorldLineOfSight(targetX, targetZ) {
      const startX = worldToCellX(getPlayerX());
      const startY = worldToCellY(getPlayerZ());
      const endX = worldToCellX(targetX);
      const endY = worldToCellY(targetZ);
      if (!insideMap(startX, startY) || !insideMap(endX, endY)) return false;

      let x = startX;
      let y = startY;
      const dx = Math.abs(endX - startX);
      const dy = Math.abs(endY - startY);
      const sx = startX < endX ? 1 : -1;
      const sy = startY < endY ? 1 : -1;
      let err = dx - dy;

      while (true) {
        if (!(x === startX && y === startY) && !(x === endX && y === endY) && isWall(x, y)) {
          return false;
        }
        if (x === endX && y === endY) break;
        const e2 = err * 2;
        if (e2 > -dy) {
          err -= dy;
          x += sx;
        }
        if (e2 < dx) {
          err += dx;
          y += sy;
        }
      }

      return true;
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
      const cellX = worldToCellX(getPlayerX());
      const cellY = worldToCellY(getPlayerZ());
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

    function getPortalMapMarkers() {
      const markers = [];

      if (areaState.currentArea === 'home') {
        const homePortal = world.homeBuildObjects.find((entry) => entry.id === 'homeDoor');
        if (homePortal) {
          const cellX = worldToCellX(homePortal.root.position.x);
          const cellY = worldToCellY(homePortal.root.position.z);
          if (insideMap(cellX, cellY) && world.discovery[cellY][cellX]) {
            markers.push({ x: homePortal.root.position.x, z: homePortal.root.position.z });
          }
        }
        return markers;
      }

      for (const object of world.interactables) {
        if (object.userData.type !== 'returnPortal') continue;
        object.getWorldPosition(tempVec);
        const cellX = worldToCellX(tempVec.x);
        const cellY = worldToCellY(tempVec.z);
        if (!insideMap(cellX, cellY) || !world.discovery[cellY][cellX]) continue;
        markers.push({ x: tempVec.x, z: tempVec.z });
      }
      return markers;
    }

    function drawPortalMarker(ctx, x, y, size) {
      const glow = size * 1.35;
      ctx.save();
      ctx.translate(x, y);

      ctx.beginPath();
      ctx.arc(0, 0, glow, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(36, 234, 255, 0.16)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = '#13253d';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.strokeStyle = '#86f5ff';
      ctx.lineWidth = Math.max(2, size * 0.26);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.56, 0, Math.PI * 2);
      ctx.fillStyle = '#2d75ff';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = '#d7ffff';
      ctx.fill();

      ctx.restore();
    }

    function getForwardDirection(out) {
      camera.getWorldDirection(out);
      return out.normalize();
    }

    function renderMiniMap() {
      const ctx = minimapCtx;
      const w = minimapCanvas.width;
      const h = minimapCanvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(5, 7, 10, 0.9)';
      ctx.fillRect(0, 0, w, h);

      const playerX = worldToMapFloatX(getPlayerX());
      const playerY = worldToMapFloatY(getPlayerZ());
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

      for (const marker of getPortalMapMarkers()) {
        drawPortalMarker(
          ctx,
          offsetX + worldToMapFloatX(marker.x) * scale + scale * 0.5,
          offsetY + worldToMapFloatY(marker.z) * scale + scale * 0.5,
          Math.max(4.4, scale * 0.42)
        );
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

      for (const marker of getPortalMapMarkers()) {
        drawPortalMarker(
          ctx,
          offsetX + worldToMapFloatX(marker.x) * scale + scale * 0.5,
          offsetY + worldToMapFloatY(marker.z) * scale + scale * 0.5,
          Math.max(5.5, scale * 0.56)
        );
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX, offsetY, world.width * scale, world.height * scale);

      const playerX = offsetX + worldToMapFloatX(getPlayerX()) * scale;
      const playerY = offsetY + worldToMapFloatY(getPlayerZ()) * scale;
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
      const nextX = getPlayerX() + dx;
      if (!blockedAt(nextX, getPlayerZ(), world.playerRadius)) playerRoot.position.x = nextX;
      const nextZ = getPlayerZ() + dz;
      if (!blockedAt(getPlayerX(), nextZ, world.playerRadius)) playerRoot.position.z = nextZ;
    }

    function handleDevModeKeyChange(event, value) {
      switch (event.code) {
        case 'F2':
          if (value && !event.repeat) toggleDevMode();
          return true;
        case 'KeyW': devCameraState.forward = value; return true;
        case 'KeyS': devCameraState.backward = value; return true;
        case 'KeyA': devCameraState.left = value; return true;
        case 'KeyD': devCameraState.right = value; return true;
        case 'KeyQ': devCameraState.down = value; return true;
        case 'KeyE': devCameraState.up = value; return true;
        case 'KeyR': devCameraState.zoomIn = value; return true;
        case 'KeyF': devCameraState.zoomOut = value; return true;
        case 'ShiftLeft':
        case 'ShiftRight': devCameraState.fast = value; return true;
        case 'Home':
          if (value && !event.repeat) {
            resetDevStudioCamera();
            setDevStatus('Camera do estudio reposicionada.');
          }
          return true;
        default:
          return false;
      }
    }

    function handleBuildModeKeyChange(event, value) {
      switch (event.code) {
        case 'KeyC':
          if (value && !event.repeat) toggleBuildMode();
          return true;
        case 'Digit1':
          if (value && !event.repeat) setBuildTransformMode('translate');
          return true;
        case 'Digit2':
          if (value && !event.repeat) setBuildTransformMode('rotate');
          return true;
        case 'Digit3':
          if (value && !event.repeat) setBuildTransformMode('scale');
          return true;
        case 'Delete':
        case 'Backspace':
          if (value && !event.repeat) {
            resetHomeBuildObjectPlacement(getSelectedHomeBuildObject());
            updateBuildModeUi();
            saveGame();
          }
          return true;
        case 'KeyW': buildCameraInputState.forward = value; return true;
        case 'KeyS': buildCameraInputState.backward = value; return true;
        case 'KeyA': buildCameraInputState.left = value; return true;
        case 'KeyD': buildCameraInputState.right = value; return true;
        case 'KeyQ': buildCameraInputState.down = value; return true;
        case 'KeyE': buildCameraInputState.up = value; return true;
        case 'KeyR': buildCameraInputState.zoomIn = value; return true;
        case 'KeyF': buildCameraInputState.zoomOut = value; return true;
        case 'ShiftLeft':
        case 'ShiftRight': buildCameraInputState.fast = value; return true;
        case 'Home':
          if (value && !event.repeat) resetBuildCamera();
          return true;
        default:
          return false;
      }
    }

    function onKeyChange(event, value) {
      if (buildModeState.enabled && event.code === 'Escape') {
        if (value && !event.repeat) setBuildModeEnabled(false);
        event.preventDefault();
        return;
      }
      if (buildModeState.enabled && event.target?.closest('#buildPanel') && event.code !== 'KeyC') return;
      if (buildModeState.enabled && handleBuildModeKeyChange(event, value)) {
        event.preventDefault();
        return;
      }
      if (buildModeState.enabled && event.code !== 'KeyC') {
        event.preventDefault();
        return;
      }
      if (devModeState.enabled && event.code === 'Escape') {
        if (value && !event.repeat) setDevModeEnabled(false);
        event.preventDefault();
        return;
      }
      if (devModeState.enabled && event.target?.closest('#devPanel') && event.code !== 'F2') return;
      if (devModeState.enabled && handleDevModeKeyChange(event, value)) {
        event.preventDefault();
        return;
      }
      if (devModeState.enabled && event.code !== 'F2') {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case 'F2':
          if (value && !event.repeat) toggleDevMode();
          break;
        case 'KeyC':
          if (value && !event.repeat) toggleBuildMode();
          break;
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
            if (hasHeadFlashlightEquipped()) {
              itemState.flashlightOn = !itemState.flashlightOn;
            } else {
              itemState.flashlightOn = false;
            }
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
            } else {
              openOptionsMenu();
            }
          }
          break;
      }

      if (['Space', 'KeyE', 'KeyL', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'KeyI', 'KeyM', 'Escape', 'F2', 'KeyC'].includes(event.code)) {
        event.preventDefault();
      }
    }

    document.addEventListener('keydown', (event) => onKeyChange(event, true));
    document.addEventListener('keyup', (event) => onKeyChange(event, false));

    window.addEventListener('beforeunload', () => saveGame({ sync: true }));

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveGame({ sync: true });
      }
    });

    renderer.domElement.addEventListener('click', (event) => {
      if (buildModeState.enabled) {
        handleBuildSelectionClick(event);
        return;
      }
      if (mobileState.enabled || !itemState.gameActive || itemState.inventoryOpen || itemState.mapOpen) return;
      if (lookState.preferPointerLock && !lookState.pointerLockActive && !lookState.fallbackOnly) {
        maybeRecapturePointerLock();
      }
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      resizeInventoryPreviewRenderer();
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
      const oldHomeBuildObjects = world.homeBuildObjects;
      const oldHomeBuildSelectables = world.homeBuildSelectables;
      const oldOreNodes = world.oreNodes;
      const oldOreHitMeshes = world.oreHitMeshes;
      const oldMonsters = world.monsters;
      const oldDropItems = world.dropItems;
      const oldProjectiles = world.projectiles;
      const oldAnimatedModels = world.animatedModels;
      const oldGroup = world.group;
      const tempGroup = new THREE.Group();

      try {
        world.group = tempGroup;
        world.rockColliders = [];
        world.interactables = [];
        world.homeBuildObjects = [];
        world.homeBuildSelectables = [];
        world.oreNodes = [];
        world.oreHitMeshes = [];
        world.monsters = [];
        world.dropItems = [];
        world.projectiles = [];
        world.animatedModels = [];

        generateHomeRoom(111);
        assert(Array.isArray(world.map) && world.map.length === world.height, 'mapa não foi gerado com altura correta');
        assert(Array.isArray(world.map[0]) && world.map[0].length === world.width, 'mapa não foi gerado com largura correta');
        assert(world.spawn && world.map[world.spawn.cellY][world.spawn.cellX] === 0, 'spawn da casa não está em célula aberta');
        assert(world.homeRoom && world.homeRoom.halfSize >= 3, 'quarto da casa não foi configurado');

        const homeRegions = floodOpenRegions(world.map);
        const expectedHomeCells = (world.homeRoom.halfSize * 2 + 1) * (world.homeRoom.halfSize * 2 + 1);
        assert(homeRegions.length === 1, 'casa deveria ter uma única região aberta');
        assert(homeRegions[0].length === expectedHomeCells, 'casa não está fechada como quarto isolado');
        buildHomeObjects();
        assert(getRaycastReach(interactionState.range) > interactionState.range, 'interação não considera o offset da câmera');
        assert(getRaycastReach(miningState.range) > miningState.range, 'mineração não considera o offset da câmera');
        assert(world.interactables.some((object) => object.userData.type === 'homeDoor'), 'porta da casa não foi criada');
        assert(world.interactables.some((object) => object.userData.type === 'chest'), 'baú da casa não foi criado');
        assert(world.interactables.some((object) => object.userData.type === 'upgradeTable'), 'mesa da casa não foi criada');

        world.rockColliders = [];
        world.interactables = [];
        world.homeBuildObjects = [];
        world.homeBuildSelectables = [];
        world.oreNodes = [];
        world.oreHitMeshes = [];
        world.monsters = [];
        world.dropItems = [];
        world.projectiles = [];
        world.animatedModels = [];
        disposeGroup(tempGroup);
        world.group = new THREE.Group();

        generateCaveMap(12345);
        assert(world.spawn && world.map[world.spawn.cellY][world.spawn.cellX] === 0, 'spawn da caverna não está em célula aberta');
        assert(oreDefinitions.length === 5, 'devem existir cinco tipos de minério');
        assert(world.nodes.length >= 4, 'geração da caverna criou poucos nós');

        const caveRegions = floodOpenRegions(world.map);
        assert(caveRegions.length >= 1, 'não há região aberta na caverna');
        assert(caveRegions[0].length > 120, 'região principal da caverna muito pequena');

        buildReturnPortal();
        assert(world.interactables.some((object) => object.userData.type === 'returnPortal'), 'portal de retorno não foi criado na caverna');

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
        world.homeBuildObjects = oldHomeBuildObjects;
        world.homeBuildSelectables = oldHomeBuildSelectables;
        world.oreNodes = oldOreNodes;
        world.oreHitMeshes = oldOreHitMeshes;
        world.monsters = oldMonsters;
        world.dropItems = oldDropItems;
        world.projectiles = oldProjectiles;
        world.animatedModels = oldAnimatedModels;
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
    applyItemLevelsToVisuals();
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
        if (combatState.holdActive) {
          tryAttackWithSword();
        }
        if (crossbowState.holdActive) {
          tryFireCrossbow();
        }
        if (mobileState.actionHeld) {
          triggerPrimaryAction();
        }
      } else {
        velocityForward = damp(velocityForward, 0, 12, delta);
        velocityRight = damp(velocityRight, 0, 12, delta);
        playerState.jumpQueued = false;
      }

      updateCombatState(delta);
      updateCrossbowState(delta);

      const horizontalSpeed = Math.hypot(velocityForward, velocityRight);
      const bobSpeed = Math.min(1, horizontalSpeed / 7.5);
      const floor = floorHeightAt(getPlayerX(), getPlayerZ());
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
      playerRoot.position.y = playerState.bodyY - world.playerHeight;
      cameraPivot.position.set(0, world.playerHeight - 0.22 + bob, 0);

      const flashlightStats = getFlashlightStats();
      const flashlightEnabled = hasHeadFlashlightEquipped() && itemState.flashlightOn;
      flashlightModel.visible = false;
      playerLamp.intensity = damp(playerLamp.intensity, flashlightEnabled ? flashlightStats.lampIntensity : 0, 11, delta);
      playerLamp.distance = flashlightStats.lampDistance;
      flashlightBeam.intensity = damp(flashlightBeam.intensity, flashlightEnabled ? flashlightStats.beamIntensity : 0, 14, delta);
      if (
        Math.abs(flashlightBeam.distance - flashlightStats.distance) > 0.001
        || Math.abs(flashlightBeam.angle - flashlightStats.angle) > 0.0001
        || Math.abs(flashlightBeam.penumbra - flashlightStats.penumbra) > 0.0001
      ) {
        flashlightBeam.distance = flashlightStats.distance;
        flashlightBeam.shadow.camera.far = flashlightStats.distance;
        flashlightBeam.angle = flashlightStats.angle;
        flashlightBeam.penumbra = flashlightStats.penumbra;
        flashlightBeam.shadow.camera.updateProjectionMatrix();
      }
      flashlightPivot.position.set(0, 0.02, 0.04);
      flashlightPivot.rotation.set(0, 0, 0);

      const pickaxeActive = isItemKindEquipped('pickaxe');
      const crossbowActive = isItemKindEquipped('crossbow');
      pickaxeModel.visible = false;
      crossbowModel.visible = false;
      const pickaxeRestRotation = new THREE.Euler(0.18, 1.42, 0.18);
      const pickaxeSwingSpeed = Math.PI / getWeaponAttackDuration('pickaxe');
      const pickaxeSwingArc = -1.2;

      if (miningState.swinging) {
        miningState.swingProgress += delta * pickaxeSwingSpeed;
        pickaxeModel.rotation.x = pickaxeRestRotation.x + Math.sin(miningState.swingProgress) * pickaxeSwingArc;
        if (!miningState.hitApplied && miningState.swingProgress / Math.PI >= miningState.impactProgress) {
          miningState.hitApplied = true;
          applyPendingPickaxeHit(miningState.pendingHit);
        }

        if (miningState.swingProgress >= Math.PI) {
          if (!miningState.hitApplied) {
            miningState.hitApplied = true;
            applyPendingPickaxeHit(miningState.pendingHit);
          }
          miningState.swinging = false;
          miningState.swingProgress = Math.PI;
          miningState.pendingHit = null;
          pickaxeModel.rotation.x = pickaxeRestRotation.x;
        }
      } else {
        pickaxeModel.rotation.x = THREE.MathUtils.lerp(pickaxeModel.rotation.x, pickaxeRestRotation.x, 0.22);
      }

      pickaxeModel.rotation.y = pickaxeRestRotation.y;
      pickaxeModel.rotation.z = pickaxeRestRotation.z;
      pickaxePivot.position.set(0.5 + Math.sin(clock.elapsedTime * 7.2) * 0.012 * bobSpeed, -0.5 - bob * 0.34, -0.8);
      pickaxePivot.rotation.set(-0.22, -0.08, 0.08);

      updateCrossbowLoadedVisual(crossbowModel, 0);

      if (characterAnimState.collectTimer > 0) {
        characterAnimState.collectTimer = Math.max(0, characterAnimState.collectTimer - delta);
      }

      let characterMode = 'idle';
      if (combatState.attackTimer > 0) {
        characterMode = 'attack';
      } else if (crossbowState.shotTimer > 0) {
        characterMode = 'shoot';
      } else if (miningState.swinging) {
        characterMode = 'mine';
      } else if (characterAnimState.collectTimer > 0) {
        characterMode = 'pickup';
      } else if (horizontalSpeed > 6.3) {
        characterMode = 'run';
      } else if (horizontalSpeed > 0.25) {
        characterMode = 'walk';
      }

      let pickaxeVisible = pickaxeActive;
      let swordActive = isItemKindEquipped('sword');
      let crossbowVisible = crossbowActive;
      const devCharacterOverride = getDevCharacterOverride(delta);
      if (devCharacterOverride) {
        characterMode = devCharacterOverride.mode;
        pickaxeVisible = devCharacterOverride.pickaxeVisible;
        swordActive = devCharacterOverride.swordVisible;
        crossbowVisible = devCharacterOverride.crossbowVisible;
      }
      const freezeDevKeyframePose = devModeState.enabled && isEditingAttackKeyframe() && !devModeState.playing;
      if (!freezeDevKeyframePose) {
        minerCharacter.update(delta, characterMode, pickaxeVisible, swordActive, crossbowVisible);
      }
      if (freezeDevKeyframePose && !devModeState.transformDragging) {
        applyDevSelectedKeyframePose();
      }

      revealAroundPlayer();
      updateProjectiles(delta);
      updateMonsters(delta);
      updateOreAndDrops(delta);
      updateWorldUi(delta);
      renderMaps();
      updateInventoryPreview(delta);
      if (devModeState.enabled) {
        updateDevCameraNavigation(delta);
      } else if (buildModeState.enabled) {
        updateBuildCameraNavigation(delta);
      }
      renderer.render(scene, camera);
    }

    animate();
