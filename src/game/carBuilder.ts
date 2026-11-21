import * as THREE from 'three';
import type { ChassisId, VehicleConfig, WheelId, WingId } from '../shared/types';

export interface CarRig {
  root: THREE.Group;
  bodyGroup: THREE.Group;
  fallbackGroup: THREE.Group;
  glbHolder: THREE.Group;
  attachedModelKey: string | null;
  frontWheelPivots: THREE.Group[];
  fallbackFrontWheelPivots: THREE.Group[];
  wheelMeshes: THREE.Object3D[];
  fallbackWheelMeshes: THREE.Object3D[];
  bodyMaterials: THREE.MeshPhysicalMaterial[];
  accentMaterials: THREE.MeshStandardMaterial[];
  taillightMaterial: THREE.MeshStandardMaterial;
  dispose: () => void;
}

function createExtrudedProfile(
  points: Array<[number, number]>,
  width: number,
  bevelSize = 0.06,
  bevelSegments = 3,
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: bevelSize,
    bevelSize,
    bevelSegments,
  });
  geo.translate(0, 0, -width * 0.5);
  geo.rotateY(-Math.PI * 0.5);
  geo.computeVertexNormals();
  return geo;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
  grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.3)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let sharedShadowTex: THREE.CanvasTexture | null = null;

function createLatheTireGeometry(radius: number, width: number): THREE.BufferGeometry {
  const hw = width * 0.5;
  const innerR = radius * 0.63;
  const pts = [
    new THREE.Vector2(innerR, -hw * 0.92),
    new THREE.Vector2(radius * 0.88, -hw),
    new THREE.Vector2(radius, -hw * 0.86),
    new THREE.Vector2(radius, hw * 0.86),
    new THREE.Vector2(radius * 0.88, hw),
    new THREE.Vector2(innerR, hw * 0.92),
  ];
  const geo = new THREE.LatheGeometry(pts, 24);
  geo.rotateZ(Math.PI * 0.5);
  geo.computeVertexNormals();
  return geo;
}

function buildWheelMesh(
  style: WheelId,
  rimMat: THREE.MeshStandardMaterial,
  tireMat: THREE.MeshStandardMaterial,
  accentMat: THREE.MeshStandardMaterial,
  caliperMat: THREE.MeshStandardMaterial,
): THREE.Group {
  const wheel = new THREE.Group();
  const radius = 0.37;
  const width = style === 'deep_dish' ? 0.35 : 0.29;

  const tire = new THREE.Mesh(createLatheTireGeometry(radius, width), tireMat);
  tire.castShadow = true;
  wheel.add(tire);

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.64, radius * 0.64, width * 0.86, 20),
    rimMat,
  );
  barrel.rotation.z = Math.PI * 0.5;
  wheel.add(barrel);

  const rotor = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.48, radius * 0.48, 0.04, 18),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.35 }),
  );
  rotor.rotation.z = Math.PI * 0.5;
  wheel.add(rotor);

  const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.16, 0.12), caliperMat);
  caliper.position.set(0, 0.08, 0.13);
  wheel.add(caliper);

  const centerCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.075, width + 0.03, 12),
    accentMat,
  );
  centerCap.rotation.z = Math.PI * 0.5;
  wheel.add(centerCap);

  if (style === 'alloy_5') {
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const spoke = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.02, 0.042, radius * 0.56),
        rimMat,
      );
      spoke.position.set(0, Math.cos(angle) * radius * 0.3, Math.sin(angle) * radius * 0.3);
      spoke.rotation.x = angle;
      wheel.add(spoke);
    }
  } else if (style === 'aero_disc') {
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.61, radius * 0.61, width + 0.025, 20),
      accentMat,
    );
    disc.rotation.z = Math.PI * 0.5;
    wheel.add(disc);
  } else {
    const lip = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.57, 0.035, 10, 20),
      accentMat,
    );
    lip.rotation.y = Math.PI * 0.5;
    const lipL = lip.clone();
    lip.position.x = width * 0.44;
    lipL.position.x = -width * 0.44;
    wheel.add(lip, lipL);
  }

  return wheel;
}

function buildWingMesh(
  wing: WingId,
  chassis: ChassisId,
  carbonMat: THREE.MeshStandardMaterial,
  accentMat: THREE.MeshStandardMaterial,
): THREE.Group | null {
  if (wing === 'none') return null;
  const g = new THREE.Group();
  const baseY = chassis === 'wedge' ? 0.72 : chassis === 'bruiser' ? 0.92 : 0.82;
  const rearZ = -1.96;

  if (wing === 'ducktail') {
    const lip = new THREE.Mesh(
      createExtrudedProfile(
        [
          [rearZ + 0.24, baseY - 0.02],
          [rearZ - 0.14, baseY + 0.18],
          [rearZ - 0.22, baseY + 0.12],
          [rearZ + 0.14, baseY - 0.06],
        ],
        1.78,
        0.02,
        2,
      ),
      accentMat,
    );
    lip.castShadow = true;
    g.add(lip);
  } else if (wing === 'gt_wing') {
    for (const sx of [-0.5, 0.5]) {
      const pylon = new THREE.Mesh(
        createExtrudedProfile(
          [
            [rearZ + 0.16, baseY - 0.02],
            [rearZ + 0.02, baseY + 0.39],
            [rearZ - 0.12, baseY + 0.39],
            [rearZ + 0.02, baseY - 0.02],
          ],
          0.05,
          0.01,
          1,
        ),
        carbonMat,
      );
      pylon.position.x = sx;
      g.add(pylon);
    }
    const mainFoil = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.055, 0.34), accentMat);
    mainFoil.position.set(0, baseY + 0.36, rearZ - 0.08);
    mainFoil.rotation.x = -0.16;
    mainFoil.castShadow = true;
    g.add(mainFoil);

    const upperFlap = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.035, 0.14), carbonMat);
    upperFlap.position.set(0, baseY + 0.42, rearZ - 0.22);
    upperFlap.rotation.x = -0.28;
    g.add(upperFlap);

    for (const sx of [-1.02, 1.02]) {
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.26, 0.48), carbonMat);
      endplate.position.set(sx, baseY + 0.36, rearZ - 0.12);
      g.add(endplate);
    }
  } else if (wing === 'twin_fin') {
    for (const sx of [-0.62, 0.62]) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.54), accentMat);
      fin.position.set(sx, baseY + 0.2, rearZ + 0.02);
      fin.rotation.z = sx > 0 ? -0.22 : 0.22;
      fin.castShadow = true;
      g.add(fin);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.05, 0.26), carbonMat);
    bridge.position.set(0, baseY + 0.35, rearZ - 0.06);
    g.add(bridge);
  }

  return g;
}

function disposeGroupMeshes(group: THREE.Object3D): void {
  group.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      if (!mesh.userData.sharedCustomGeo) {
        mesh.geometry?.dispose();
      }
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => {
          if (m && !m.userData?.sharedCustomMat) m.dispose();
        });
      } else if (mesh.material && !mesh.material.userData?.sharedCustomMat) {
        mesh.material.dispose();
      }
    }
  });
}

export function clearGlbFromCarRig(rig: CarRig): void {
  if (rig.glbHolder.children.length > 0) {
    disposeGroupMeshes(rig.glbHolder);
    rig.glbHolder.clear();
  }
  rig.glbHolder.userData.clonedFlashMats = false;
  rig.glbHolder.visible = false;
  rig.fallbackGroup.visible = true;
  rig.attachedModelKey = null;
  rig.frontWheelPivots = rig.fallbackFrontWheelPivots;
  rig.wheelMeshes = rig.fallbackWheelMeshes;
}

const _wheelCenter = new THREE.Vector3();

export function attachGlbToCarRig(rig: CarRig, proto: THREE.Group, modelKey: string): void {
  if (rig.attachedModelKey === modelKey) return;

  if (rig.glbHolder.children.length > 0) {
    disposeGroupMeshes(rig.glbHolder);
    rig.glbHolder.clear();
  }
  rig.glbHolder.userData.clonedFlashMats = false;

  const cloned = proto.clone(true);
  const glbWheels: THREE.Object3D[] = [];

  cloned.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      m.userData.sharedCustomGeo = true;
      // Reuse prototype materials directly (marked sharedCustomMat) so attaching/switching cars never triggers shader recompiles
      if (/wheel|tire|rim/i.test(m.name) && m.geometry) {
        if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
        if (m.geometry.boundingBox) {
          m.geometry.boundingBox.getCenter(_wheelCenter);
          if (_wheelCenter.length() < 0.25) {
            glbWheels.push(m);
          }
        }
      }
    }
  });

  rig.glbHolder.add(cloned);
  rig.glbHolder.visible = true;
  rig.fallbackGroup.visible = false;
  rig.attachedModelKey = modelKey;
  rig.frontWheelPivots = [];
  rig.wheelMeshes = glbWheels;
}

export function buildCarRig(config: VehicleConfig): CarRig {
  const root = new THREE.Group();
  const bodyGroup = new THREE.Group();
  const fallbackGroup = new THREE.Group();
  const glbHolder = new THREE.Group();
  glbHolder.visible = false;

  root.add(bodyGroup);
  bodyGroup.add(fallbackGroup);
  bodyGroup.add(glbHolder);

  if (!sharedShadowTex) {
    sharedShadowTex = createContactShadowTexture();
  }

  const isMetallic = config.finish === 'metallic';
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.primaryColor),
    metalness: isMetallic ? 0.72 : 0.14,
    roughness: isMetallic ? 0.22 : 0.65,
    clearcoat: isMetallic ? 1.0 : 0.12,
    clearcoatRoughness: 0.1,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.accentColor),
    metalness: 0.48,
    roughness: 0.28,
  });

  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x1a1f28,
    metalness: 0.28,
    roughness: 0.68,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0d1522,
    metalness: 0.25,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xfff5d6,
    emissiveIntensity: 1.55,
    roughness: 0.12,
  });

  const taillightMat = new THREE.MeshStandardMaterial({
    color: 0xff2222,
    emissive: 0xff2618,
    emissiveIntensity: 1.25,
    roughness: 0.18,
  });

  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x16181c,
    metalness: 0.05,
    roughness: 0.88,
  });

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd9e1ec,
    metalness: 0.9,
    roughness: 0.18,
  });

  const caliperMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.32,
    metalness: 0.4,
  });

  let hullProfile: Array<[number, number]>;
  let hullWidth = 1.84;
  if (config.chassis === 'bruiser') {
    hullWidth = 1.98;
    hullProfile = [
      [-2.14, 0.28],
      [2.10, 0.30],
      [2.22, 0.48],
      [2.05, 0.72],
      [1.08, 0.80],
      [0.45, 0.86],
      [-1.40, 0.88],
      [-2.14, 0.82],
    ];
  } else if (config.chassis === 'wedge') {
    hullWidth = 1.88;
    hullProfile = [
      [-2.24, 0.20],
      [2.32, 0.22],
      [2.36, 0.34],
      [1.60, 0.50],
      [0.80, 0.62],
      [-0.45, 0.68],
      [-1.78, 0.70],
      [-2.24, 0.62],
    ];
  } else {
    hullWidth = 1.84;
    hullProfile = [
      [-2.16, 0.24],
      [2.18, 0.26],
      [2.26, 0.42],
      [1.75, 0.58],
      [1.02, 0.70],
      [0.15, 0.75],
      [-1.50, 0.78],
      [-2.14, 0.72],
    ];
  }

  const hullGeo = createExtrudedProfile(hullProfile, hullWidth * 0.88, 0.08, 3);
  const hullMesh = new THREE.Mesh(hullGeo, bodyMat);
  hullMesh.castShadow = true;
  hullMesh.receiveShadow = true;
  fallbackGroup.add(hullMesh);

  const archShape = new THREE.Shape();
  archShape.absarc(0, 0, 0.50, 0, Math.PI, false);
  archShape.lineTo(-0.41, 0);
  archShape.absarc(0, 0, 0.41, Math.PI, 0, true);
  archShape.closePath();
  const fenderGeo = new THREE.ExtrudeGeometry(archShape, {
    depth: 0.20,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  fenderGeo.translate(0, 0, -0.10);
  fenderGeo.rotateY(-Math.PI * 0.5);
  fenderGeo.computeVertexNormals();

  for (const sx of [-1, 1]) {
    for (const wz of [1.38, -1.35]) {
      const arch = new THREE.Mesh(fenderGeo, bodyMat);
      arch.position.set(sx * (hullWidth * 0.47), 0.37, wz);
      arch.castShadow = true;
      fallbackGroup.add(arch);
    }
    const sidePod = new THREE.Mesh(
      createExtrudedProfile(
        [
          [-1.02, 0.26],
          [1.02, 0.26],
          [0.92, 0.60],
          [-0.96, 0.64],
        ],
        0.24,
        0.04,
        2,
      ),
      bodyMat,
    );
    sidePod.position.x = sx * (hullWidth * 0.45);
    sidePod.castShadow = true;
    fallbackGroup.add(sidePod);
  }

  const cabinProfile: Array<[number, number]> =
    config.chassis === 'bruiser'
      ? [[-1.18, 0.82], [0.58, 0.80], [0.16, 1.19], [-0.96, 1.18]]
      : config.chassis === 'wedge'
        ? [[-1.34, 0.66], [0.64, 0.61], [0.02, 0.96], [-1.06, 0.93]]
        : [[-1.26, 0.72], [0.62, 0.67], [0.10, 1.09], [-0.98, 1.07]];

  const glassGeo = createExtrudedProfile(cabinProfile, hullWidth * 0.68, 0.04, 2);
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.castShadow = true;
  fallbackGroup.add(glassMesh);

  const roofY = config.chassis === 'bruiser' ? 1.20 : config.chassis === 'wedge' ? 0.96 : 1.10;
  const roofPanel = new THREE.Mesh(
    new THREE.BoxGeometry(hullWidth * 0.62, 0.06, 0.98),
    bodyMat,
  );
  roofPanel.position.set(0, roofY, -0.44);
  fallbackGroup.add(roofPanel);

  if (config.chassis !== 'bruiser') {
    const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.68), carbonMat);
    scoop.position.set(0, roofY + 0.07, -0.62);
    fallbackGroup.add(scoop);
  }

  for (const sx of [-1, 1]) {
    const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.06), carbonMat);
    stalk.position.set(sx * (hullWidth * 0.46), roofY - 0.25, 0.48);
    const mirrorCap = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.09, 0.18), bodyMat);
    mirrorCap.position.set(sx * (hullWidth * 0.54), roofY - 0.23, 0.46);
    fallbackGroup.add(stalk, mirrorCap);
  }

  const hoodStripe = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.03, 1.18), accentMat);
  hoodStripe.position.set(
    0,
    config.chassis === 'bruiser' ? 0.78 : config.chassis === 'wedge' ? 0.55 : 0.66,
    1.36,
  );
  hoodStripe.rotation.x = config.chassis === 'bruiser' ? 0.10 : 0.17;
  fallbackGroup.add(hoodStripe);

  const roofStripe = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.03, 0.98), accentMat);
  roofStripe.position.set(0, roofY + 0.03, -0.44);
  fallbackGroup.add(roofStripe);

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(hullWidth + 0.18, 0.08, 0.48), carbonMat);
  splitter.position.set(0, 0.22, 2.12);
  fallbackGroup.add(splitter);
  for (const sx of [-1, 1]) {
    const canard = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.36), carbonMat);
    canard.position.set(sx * (hullWidth * 0.5 + 0.08), 0.28, 2.08);
    fallbackGroup.add(canard);

    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 2.2), carbonMat);
    skirt.position.set(sx * (hullWidth * 0.5 + 0.06), 0.24, 0.02);
    fallbackGroup.add(skirt);
  }

  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(hullWidth * 0.78, 0.14, 0.36), carbonMat);
  diffuser.position.set(0, 0.26, -2.08);
  fallbackGroup.add(diffuser);
  for (const fx of [-0.46, -0.15, 0.15, 0.46]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.38), carbonMat);
    fin.position.set(fx, 0.24, -2.10);
    fallbackGroup.add(fin);
  }

  if (config.chassis === 'bruiser') {
    const bullBar = new THREE.Mesh(new THREE.BoxGeometry(hullWidth + 0.22, 0.24, 0.24), accentMat);
    bullBar.position.set(0, 0.46, 2.24);
    fallbackGroup.add(bullBar);
    for (const sx of [-1, 1]) {
      const sideGuard = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 1.75), accentMat);
      sideGuard.position.set(sx * (hullWidth * 0.5 + 0.12), 0.44, 0);
      fallbackGroup.add(sideGuard);
    }
  }

  for (const sx of [-0.62, 0.62]) {
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.12), carbonMat);
    housing.position.set(sx, config.chassis === 'wedge' ? 0.38 : 0.49, 2.16);
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.09), headlightMat);
    hl.position.set(sx, config.chassis === 'wedge' ? 0.38 : 0.49, 2.19);
    fallbackGroup.add(housing, hl);
  }

  const tailHousing = new THREE.Mesh(new THREE.BoxGeometry(hullWidth * 0.86, 0.16, 0.1), carbonMat);
  tailHousing.position.set(0, config.chassis === 'wedge' ? 0.54 : 0.66, -2.13);
  const tailBar = new THREE.Mesh(new THREE.BoxGeometry(hullWidth * 0.80, 0.08, 0.09), taillightMat);
  tailBar.position.set(0, config.chassis === 'wedge' ? 0.54 : 0.66, -2.16);
  fallbackGroup.add(tailHousing, tailBar);

  for (const sx of [-0.38, 0.38]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.26, 14), rimMat);
    pipe.rotation.x = Math.PI * 0.5;
    pipe.position.set(sx, 0.31, -2.18);
    fallbackGroup.add(pipe);
  }

  const wingGroup = buildWingMesh(config.wing, config.chassis, carbonMat, accentMat);
  if (wingGroup) fallbackGroup.add(wingGroup);

  const fallbackFrontWheelPivots: THREE.Group[] = [];
  const fallbackWheelMeshes: THREE.Object3D[] = [];
  const wheelX = hullWidth * 0.5 + 0.04;
  const wheelPositions: Array<{ x: number; z: number; front: boolean }> = [
    { x: -wheelX, z: 1.38, front: true },
    { x: wheelX, z: 1.38, front: true },
    { x: -wheelX, z: -1.35, front: false },
    { x: wheelX, z: -1.35, front: false },
  ];

  for (const wp of wheelPositions) {
    const wheel = buildWheelMesh(config.wheels, rimMat, tireMat, accentMat, caliperMat);
    fallbackWheelMeshes.push(wheel);
    if (wp.front) {
      const pivot = new THREE.Group();
      pivot.position.set(wp.x, 0.37, wp.z);
      pivot.add(wheel);
      fallbackGroup.add(pivot);
      fallbackFrontWheelPivots.push(pivot);
    } else {
      wheel.position.set(wp.x, 0.37, wp.z);
      fallbackGroup.add(wheel);
    }
  }

  const shadowDisc = new THREE.Mesh(
    new THREE.PlaneGeometry(hullWidth + 1.2, 5.2),
    new THREE.MeshBasicMaterial({
      map: sharedShadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.72,
    }),
  );
  shadowDisc.rotation.x = -Math.PI * 0.5;
  shadowDisc.position.y = 0.035;
  root.add(shadowDisc);

  const dispose = () => {
    disposeGroupMeshes(root);
  };

  return {
    root,
    bodyGroup,
    fallbackGroup,
    glbHolder,
    attachedModelKey: null,
    frontWheelPivots: fallbackFrontWheelPivots,
    fallbackFrontWheelPivots,
    wheelMeshes: fallbackWheelMeshes,
    fallbackWheelMeshes,
    bodyMaterials: [bodyMat],
    accentMaterials: [accentMat],
    taillightMaterial: taillightMat,
    dispose,
  };
}

export function setCarHitFlash(rig: CarRig, active: boolean): void {
  for (const mat of rig.bodyMaterials) {
    mat.emissive.setHex(active ? 0xffffff : 0x000000);
    mat.emissiveIntensity = active ? 0.65 : 0;
  }

  if (rig.glbHolder.visible) {
    if (active && !rig.glbHolder.userData.clonedFlashMats) {
      rig.glbHolder.userData.clonedFlashMats = true;
      const cloneMat = (mat: THREE.Material) => {
        const cloned = mat.clone();
        cloned.userData = { ...cloned.userData, sharedCustomMat: false };
        return cloned;
      };
      rig.glbHolder.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.material) {
            mesh.material = Array.isArray(mesh.material)
              ? mesh.material.map(cloneMat)
              : cloneMat(mesh.material);
          }
        }
      });
    }
    if (!rig.glbHolder.userData.clonedFlashMats) return;

    rig.glbHolder.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          if (!m || !('emissive' in m)) continue;
          const std = m as THREE.MeshStandardMaterial;
          if (active) {
            if (!std.userData._flashSaved) {
              std.userData._flashSaved = true;
              std.userData._origEmissive = std.emissive.getHex();
              std.userData._origEmissiveInt = std.emissiveIntensity;
            }
            std.emissive.setHex(0xffffff);
            std.emissiveIntensity = 0.55;
          } else if (std.userData._flashSaved) {
            std.emissive.setHex(std.userData._origEmissive ?? 0x000000);
            std.emissiveIntensity = std.userData._origEmissiveInt ?? 0;
          }
        }
      }
    });
  }
}
